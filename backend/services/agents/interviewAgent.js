import OpenAI from "openai";

const getClient = () => new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const pickModel = (user) => (user?.isPremium ? "gpt-4o" : "gpt-4o-mini");

// ---- Resume snapshot -> compact, promptable text ---------------------------
const joinList = (arr) =>
  Array.isArray(arr) ? arr.filter(Boolean).join(", ") : "";

const buildResumeSummary = (resume) => {
  if (!resume || typeof resume !== "object") {
    return "No resume was provided for this session.";
  }

  const p = resume.personalInfo || {};
  const lines = [];

  lines.push(`Name: ${p.fullName || "N/A"}`);
  if (p.jobTitle) lines.push(`Current/Target Title: ${p.jobTitle}`);
  if (p.summary) lines.push(`Summary: ${p.summary}`);

  const skills = resume.skills || {};
  const skillLine = [
    joinList(skills.technical),
    joinList(skills.tools),
    joinList(skills.soft),
  ]
    .filter(Boolean)
    .join(" | ");
  if (skillLine) lines.push(`Skills: ${skillLine}`);

  if (Array.isArray(resume.experience) && resume.experience.length) {
    lines.push("Experience:");
    resume.experience.forEach((exp) => {
      const period = `${exp.startDate || "?"} - ${
        exp.current ? "Present" : exp.endDate || "?"
      }`;
      lines.push(
        `- ${exp.jobTitle || "Role"} at ${exp.employer || "Company"} (${period})`,
      );
      if (exp.summary) lines.push(`  ${exp.summary}`);
      (exp.highlights || []).slice(0, 4).forEach((h) => lines.push(`  • ${h}`));
    });
  }

  if (Array.isArray(resume.projects) && resume.projects.length) {
    lines.push("Projects:");
    resume.projects.forEach((proj) => {
      const tech = joinList(proj.techStack);
      lines.push(`- ${proj.title || "Project"}${tech ? ` (${tech})` : ""}`);
      if (proj.description) lines.push(`  ${proj.description}`);
    });
  }

  if (Array.isArray(resume.education) && resume.education.length) {
    lines.push("Education:");
    resume.education.forEach((edu) => {
      lines.push(
        `- ${edu.degreeType || ""} ${
          edu.areaOfStudy ? `in ${edu.areaOfStudy}` : ""
        } — ${edu.institution || ""}`.trim(),
      );
    });
  }

  if (Array.isArray(resume.certifications) && resume.certifications.length) {
    lines.push(
      `Certifications: ${resume.certifications
        .map((c) => c.name)
        .filter(Boolean)
        .join(", ")}`,
    );
  }

  return lines.join("\n");
};

// ---- Prompt building --------------------------------------------------------
const FORMATTING_RULES = `
FORMATTING:
- Use markdown. Keep it clean and easy to read in a chat UI.
- Prefer short paragraphs and bullet points (- or •) over long blocks.
- Use **bold** for small headings.`;

const buildContextBlock = ({ resumeSummary, targetRole, jobDescription }) => {
  let block = `CANDIDATE RESUME:\n${resumeSummary}\n`;
  if (targetRole) block += `\nTARGET ROLE: ${targetRole}\n`;
  if (jobDescription) block += `\nJOB DESCRIPTION:\n${jobDescription}\n`;
  return block;
};

const buildSystemPrompt = ({ mode, resumeSummary, targetRole, jobDescription }) => {
  const context = buildContextBlock({ resumeSummary, targetRole, jobDescription });

  if (mode === "coach") {
    return `
You are a senior career and technical coach for this specific candidate.
You know their resume in detail and give practical, honest, actionable advice.

You can help with ANYTHING the candidate asks, for example:
- Answering interview questions (behavioral, technical, situational)
- Explaining technical concepts they may be asked about
- Improving resume bullets, summaries, or wording
- Career strategy, salary negotiation, and job-search tactics

Ground your advice in their actual resume below. Be specific — refer to their
real experience, projects, and skills instead of generic tips.
${jobDescription ? "When useful, relate your advice to the target job description." : ""}

${context}
${FORMATTING_RULES}`.trim();
  }

  // default: interview mode
  return `
You are a realistic, senior interviewer conducting a mock interview with this
candidate${targetRole ? ` for the role of ${targetRole}` : ""}.

HOW TO CONDUCT THE INTERVIEW:
- Ask ONE question at a time. Never dump a list of questions.
- Base your questions on the candidate's ACTUAL resume — their real roles,
  projects, and skills below. Reference specifics ("You mentioned X at Y...").
${jobDescription ? "- Target the gap between their resume and the job description — probe the skills the role needs.\n" : ""}- Mix behavioral, technical, and situational questions appropriate to their level.
- If an answer is vague or shallow, ask a probing follow-up (e.g. "Can you
  quantify that impact?") before moving on.

AFTER EACH CANDIDATE ANSWER:
1. Give brief, honest feedback — what was strong, what to improve.
2. Optionally give a short improved/sample answer.
3. Then ask the next question.

Stay in character as the interviewer. Be professional, encouraging, but candid.

${context}
${FORMATTING_RULES}`.trim();
};

// ---- Public API -------------------------------------------------------------

// A normal conversation turn.
export const runInterviewAgent = async ({
  user,
  mode = "interview",
  resumeSnapshot,
  targetRole,
  jobDescription,
  chatHistory = [],
  userMessage,
}) => {
  const client = getClient();
  const resumeSummary = buildResumeSummary(resumeSnapshot);
  const systemPrompt = buildSystemPrompt({
    mode,
    resumeSummary,
    targetRole,
    jobDescription,
  });

  const response = await client.chat.completions.create({
    model: pickModel(user),
    temperature: 0.7,
    messages: [
      { role: "system", content: systemPrompt },
      ...chatHistory,
      { role: "user", content: userMessage },
    ],
  });

  return response.choices[0].message.content;
};

// The very first assistant message when a session starts.
export const generateOpeningMessage = async ({
  user,
  mode = "interview",
  resumeSnapshot,
  targetRole,
  jobDescription,
}) => {
  const client = getClient();
  const resumeSummary = buildResumeSummary(resumeSnapshot);
  const systemPrompt = buildSystemPrompt({
    mode,
    resumeSummary,
    targetRole,
    jobDescription,
  });

  const kickoff =
    mode === "coach"
      ? "Introduce yourself in 1-2 sentences as their personal career coach, mention you've reviewed their resume, and invite them to ask anything."
      : "Start the interview: greet the candidate in 1-2 sentences, then ask your first question based on their resume.";

  const response = await client.chat.completions.create({
    model: pickModel(user),
    temperature: 0.7,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: kickoff },
    ],
  });

  return response.choices[0].message.content;
};
