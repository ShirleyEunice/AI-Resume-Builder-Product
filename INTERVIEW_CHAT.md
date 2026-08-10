# Interview Chat — Feature Documentation

A resume-aware interview-prep chat. The user starts a session by picking a saved
resume **or** uploading a new one, optionally adds a target role + job
description, then chats in one of two modes:

- **Mock Interview** — the AI acts as a recruiter/interviewer: asks one question
  at a time (grounded in the user's real resume), probes follow-ups, and gives
  feedback after each answer.
- **Ask a Coach** — free-form, resume-aware Q&A (STAR help, explaining technical
  concepts, rewriting bullets, salary/career advice).

The mode is chosen at setup and stored on the session. Sessions can be managed
from the **Interview History** library, started directly from **Resume Manager**
("Interview Prep"), and answered by **typing or speaking**.

---

## User flow

```
Sidebar → Interview Chat            (or Resume Manager → ⋮ → Interview Prep)
   ↓
Setup screen
   1. Choose mode:  [ Mock Interview | Ask a Coach ]
   2. Pick a saved resume  OR  upload a PDF (auto-saved to Resume Manager)
      (arriving from Resume Manager pre-selects that resume)
   3. (optional) target role + job description
   ↓  Start
Session begins → AI sends the opening message
   ↓
Turn loop:  user TYPES or SPEAKS → AI replies (feedback + next Q, or coach answer)
            (optional "Read aloud" speaks the AI's replies)
   ↓
Manage sessions from Interview History (open / delete)
```

---

## Request flow

```
Start:   POST /api/agent/interview/session   (resumeId OR file, +mode/role/JD)
             → parse+save (if upload) → snapshot resume → generateOpeningMessage()
             → create Chat → { chatId, firstMessage, ... }

Turn:    POST /api/agent/interview           ({ chatId, message })
             → load Chat → runInterviewAgent(snapshot + history + message)
             → append 2 messages → { reply }

Library: GET    /api/agent/chats             → list (title, mode, dates)
         GET    /api/agent/chats/:id         → full session (messages + context)
         DELETE /api/agent/chats/:id         → delete a session
```

The resume is stored as a **snapshot** on the chat, so the session stays
consistent even if the underlying resume is later edited or deleted.

---

## Files changed / added

### Backend (`Resume/backend`)

| File | Change | What it does |
|------|--------|--------------|
| `models/Chat.js` | **modified** | Added `mode` (`interview`/`coach`), `resumeId` (ref), `resumeSnapshot` (Mixed — the resume JSON injected into prompts), `targetRole`, `jobDescription`. |
| `services/agents/interviewAgent.js` | **rewritten** | Resume-aware agent. `buildResumeSummary()` turns the snapshot into compact text; `buildSystemPrompt()` branches on mode; `runInterviewAgent()` handles a turn; `generateOpeningMessage()` produces the first message. **Removed the buggy Redis cache** (it was keyed on the raw question and returned stale, context-blind replies). |
| `routes/agentRoutes.js` | **modified** | Added `POST /interview/session`, `GET /chats/:id`, `DELETE /chats/:id`; rewrote `POST /interview` to require a `chatId` and use stored context; switched `/interview` + `/chats` from `mockAuth` to real `protect`. |

### Frontend (`Resume/frontend/src`)

| File | Change | What it does |
|------|--------|--------------|
| `services/interviewService.js` | **new** | API helpers: `startInterviewSession`, `sendInterviewMessage`, `getChats`, `getChatById`, `deleteChat`. |
| `hooks/useSpeechRecognition.js` | **new** | Web Speech API wrapper (speech-to-text) → `{ listening, supported, start, stop, toggle }`. |
| `components/interview/InterviewSetup.jsx` | **new** | Setup screen: mode cards, resume picker (`GET /resume`) + PDF upload, optional role/JD, Start. Accepts `initialResumeId` to pre-select a resume. |
| `pages/InterviewChat.jsx` | **rewritten** | Brand-styled chat. Setup ↔ chat views, history sidebar, resume-on-resume loading, optimistic send. **Voice input** (mic), **read-aloud** (TTS) toggle, and URL deep-links (`?chatId=`, `?resumeId=`). |
| `pages/interview/InterviewHistory.jsx` | **new** | The Interview Library — lists sessions with Open / Delete. |
| `components/resume/manager/ResumeManagerTable.jsx` | **modified** | Fixed the existing "Interview Prep" action to navigate to `/interview-chat?resumeId=…` (it pointed at a non-existent `/interview`). |
| `constants/sidebarLinks.js` | **modified** | Added "Interview History" under the **Library** section. |
| `App.jsx` | **modified** | Registered `/interview-chat` (was missing) and `/interview-history`. |

---

## Feature 1 — Interview Library (`/interview-history`)

A Library page (next to Resume Manager / Scan History / Letter History) listing
all of the user's sessions. Each row shows the title, a mode badge, and last
updated; actions are **Open** (deep-links to `/interview-chat?chatId=…`) and
**Delete** (`DELETE /api/agent/chats/:id`). Added to the sidebar under Library.

## Feature 2 — "Interview Prep" from Resume Manager

Resume Manager's row menu (⋮) already had an **Interview Prep** item; it was
pointing at a dead `/interview` route. It now navigates to
`/interview-chat?resumeId=<id>`. `InterviewChat` reads `?resumeId=` and passes it
to `InterviewSetup` as `initialResumeId`, which **pre-selects that resume** — the
user just picks a mode (and optional JD) and starts.

## Feature 3 — Voice: speak or type

- **Speech-to-text (input):** a mic button next to the composer. Click to start
  dictating; finalized transcript is appended to the text box (you can still
  edit/type). Uses `hooks/useSpeechRecognition.js` (Web Speech API). The button
  is hidden automatically in browsers that don't support it (best in Chrome/Edge).
- **Read-aloud (output, optional):** a "Read aloud" toggle in the chat header.
  When on, the AI's replies are spoken via `window.speechSynthesis` (markdown is
  stripped first). Off by default; toggling off cancels any in-progress speech.

---

## How the chat interview works (under the hood)

### 1. Starting a session — `POST /api/agent/interview/session`
1. `protect` verifies the JWT and loads the user.
2. The resume is resolved into a **snapshot** (a plain JSON copy):
   - **Uploaded PDF** → `parsePDF()` (pdf-parse) extracts raw text →
     `parseResumeToJSON()` (a `gpt-4o-mini` call at `temperature 0.2`) converts
     that text into the structured `Resume` shape → saved to MongoDB with
     `Resume.create()` → the parsed object becomes the snapshot.
   - **Saved `resumeId`** → `Resume.findById()` (ownership checked) →
     `resume.toObject()` becomes the snapshot.
3. `generateOpeningMessage()` produces the first assistant message (a greeting +
   first question, or a coach greeting).
4. A `Chat` document is created holding `mode`, `resumeId`, `resumeSnapshot`,
   `targetRole`, `jobDescription`, and `messages: [{ assistant, firstMessage }]`.
5. Credits are deducted (5 saved / 10 upload) and `{ chatId, firstMessage }` returned.

### 2. Prompt assembly (the heart of it)
Every model call rebuilds the prompt from the stored snapshot:
- **`buildResumeSummary(snapshot)`** compresses the resume JSON into a compact
  text block — name, title, summary, a single skills line, each job with up to
  **4 highlights**, projects, education, certifications. Compression keeps token
  cost low *and* focuses the model on what matters.
- **`buildContextBlock()`** appends `TARGET ROLE` and `JOB DESCRIPTION` when present.
- **`buildSystemPrompt({ mode, ... })`** branches:
  - **interview** → "realistic senior interviewer… ask ONE question at a time…
    base questions on the ACTUAL resume… (if a JD is present) target the
    resume↔JD gap… after each answer give feedback, then ask the next question."
  - **coach** → "senior career & technical coach… answer anything… grounded in
    the resume."

### 3. A conversation turn — `POST /api/agent/interview`
1. Load the `Chat` by `chatId` (ownership checked).
2. `runInterviewAgent()` rebuilds the system prompt from the **stored** snapshot +
   JD + mode, then assembles the OpenAI message array as
   `[ system, ...chat.messages, { role: "user", content: message } ]`.
3. One `chat.completions.create()` call (`gpt-4o` premium / `gpt-4o-mini` free,
   `temperature 0.7`) returns the reply.
4. The user message **and** the reply are appended to `chat.messages` and saved;
   5 credits deducted.

### Why it behaves the way it does
- **Stateless model, stateful DB.** OpenAI chat completions keep no memory, so
  every turn resends the system prompt + the *entire* stored transcript. The
  `Chat` document is the single source of truth; context grows with the chat.
- **Snapshot immutability.** The resume is frozen at session start — editing or
  deleting the original resume never changes an in-progress interview.
- **No cache.** The old Redis cache (keyed on the raw question) was removed
  because it returned stale, context-blind replies — fatal for a real interview.
- **Frontend loop.** Setup collects mode + resume + optional role/JD → the user
  message is appended optimistically → on error it's rolled back and restored to
  the input box. `?resumeId=` pre-selects a resume; `?chatId=` re-opens a session.

## How speech recognition works (under the hood)

### Speech-to-text (mic) — `hooks/useSpeechRecognition.js`
1. **Feature detection:** `window.SpeechRecognition || window.webkitSpeechRecognition`.
   If neither exists, `supported = false` and the UI hides the mic button.
2. **Configuration:** the recognition instance runs with
   `continuous = true` (keeps listening across pauses),
   `interimResults = true` (fires partial results while you speak),
   `lang = "en-US"`.
3. **Events:**
   - `onresult` — iterates `event.results` from `event.resultIndex` and
     accumulates only the chunks where `isFinal === true`, then calls
     `onResult(finalText)`. (Interim results are ignored so text isn't duplicated.)
   - `onend` / `onerror` — set `listening = false`.
4. **Controls:** `start()`, `stop()`, `toggle()`; the `listening` flag drives the
   red pulsing mic. Recognition is stopped on unmount.
5. **In the page:** `onResult` appends the finalized transcript to the composer
   (with a leading space) so you can keep typing/editing; sending stops the mic.

**What actually happens:** in Chrome/Edge the browser captures microphone audio
and streams it to Google's speech service, which returns transcripts. That's why
it needs a **real microphone + network + a Chromium browser** — and why it can't
be exercised by headless automation (no mic, no recognition engine).

### Read-aloud (text-to-speech) — in `InterviewChat.jsx`
- `speakText(raw)` strips markdown characters, turns newlines into ". ", cancels
  any in-progress speech, then speaks via a `SpeechSynthesisUtterance`
  (`window.speechSynthesis`).
- Gated by the `speakOn` toggle; turning it off (or starting a new chat) cancels
  speech. Runs after each assistant reply (and the opening message if enabled).
- `speechSynthesis` is broadly supported, unlike recognition.

### Browser support
| Capability | Chrome/Edge | Safari | Firefox |
|-----------|-------------|--------|---------|
| Speech-to-text (mic) | ✅ | ⚠️ partial (`webkit` prefix) | ❌ (button hidden) |
| Read-aloud (TTS) | ✅ | ✅ | ✅ |

---

## API reference

### `POST /api/agent/interview/session`  *(auth, multipart)*
Start a session. Send **either** `resumeId` **or** `file`.

| field | type | notes |
|-------|------|-------|
| `mode` | string | `"interview"` (default) or `"coach"` |
| `resumeId` | string | use a saved resume |
| `file` | file (PDF) | upload; parsed and **saved** to Resume Manager |
| `targetRole` | string | optional |
| `jobDescription` | string | optional |

**Response:** `{ chatId, mode, title, resumeId, resumeTitle, firstMessage, credits }`

### `POST /api/agent/interview`  *(auth)*
Body: `{ chatId, message }` → **Response:** `{ reply, chatId, credits }`

### `GET /api/agent/chats`  *(auth)*
List sessions → `[{ _id, title, mode, targetRole, createdAt, updatedAt }]`

### `GET /api/agent/chats/:id`  *(auth)*
Full session (messages + snapshot + context).

### `DELETE /api/agent/chats/:id`  *(auth)*
Delete a session → `{ message }`.

---

## Data model — `Chat`

```js
{
  userId: String,
  title: String,
  mode: "interview" | "coach",     // default "interview"
  resumeId: ObjectId(ref Resume),  // provenance
  resumeSnapshot: Mixed,           // resume JSON injected into prompts
  targetRole: String,
  jobDescription: String,
  messages: [{ role, content }],
  timestamps: true,
}
```

---

## Credits

`TURN_COST = 5` per model call.

| Action | Cost |
|--------|------|
| Start with a **saved** resume | 5 (opening message) |
| Start with an **uploaded** resume | 10 (5 parse + 5 opening) |
| Each answer / question | 5 |

Change `TURN_COST` in `agentRoutes.js` to adjust.

---

## Model

Uses OpenAI (existing project stack): `gpt-4o` for premium users,
`gpt-4o-mini` otherwise. `temperature: 0.7`.

---

## Example questions the feature asks

Actual questions are **personalised to each resume** (and to the JD when
provided), but they're drawn from these archetypes. Bracketed parts are filled
in from the candidate's resume/JD at runtime.

1. "Walk me through your most impactful project — the problem, your specific role, and the measurable outcome." *(resume-grounded, behavioral)*
2. "You list **[skill/tech]** as a core strength — describe the hardest bug you debugged with it and how you found the root cause." *(technical)*
3. "Tell me about a time you disagreed with a teammate or manager on a technical decision. How did you resolve it?" *(behavioral / STAR)*
4. "I notice **[a gap / short tenure]** between **[role A]** and **[role B]** — can you tell me about that period?" *(probing, resume-specific)*
5. "How would you design **[a system relevant to the target role]**? Walk me through your approach and the trade-offs." *(system design)*
6. "The role needs **[skill from the JD]**, which isn't prominent on your resume — how have you used it, or how would you ramp up?" *(JD-gap targeting)*
7. "Describe delivering under a tight deadline with incomplete requirements — what did you prioritise and what did you cut?" *(situational)*
8. "What's a technical decision you'd make differently today, and why?" *(reflection / seniority)*
9. "Tell me about a time you improved performance or reliability — what did you measure, and what was the before/after?" *(quantified impact)*
10. "Why this role, and where do you see yourself in the next 2–3 years?" *(motivation / closing)*

---

## Deferred (fast-follow ideas)

- Token **streaming** (SSE) instead of a blocking "typing" indicator.
- Numeric **scoring panel** + charts and an **end-of-session report** / study plan.
- Difficulty / interviewer-persona selector.
- Voice **auto-send** (submit when the user stops speaking) and voice selection.

---

## How to test manually

1. Start backend (`npm run dev` in `backend`) and frontend (`npm run dev` in `frontend`).
2. Log in (the interview routes now use real JWT auth, not the mock user).
3. **From the sidebar:** Interview Chat → try a saved resume and separately an
   upload (confirm the upload then appears in Resume Manager).
4. **From Resume Manager:** row menu (⋮) → Interview Prep → confirm the setup
   opens with that resume pre-selected.
5. **Voice:** in a session, click the mic and speak — text should appear in the
   box; toggle "Read aloud" and confirm replies are spoken (Chrome/Edge).
6. **Library:** open Interview History, confirm sessions list, Open re-enters a
   session, Delete removes it.
