import express from 'express';
import multer from 'multer';
import { parsePDF } from '../services/parser/pdfParser.js';
import { checkCredits } from '../middlewares/creditCheck.js';
import { mockAuth } from '../middlewares/mockAuth.js';
import Chat from '../models/Chat.js';
import Resume from '../models/Resume.js';
import {
  runInterviewAgent,
  generateOpeningMessage,
} from '../services/agents/interviewAgent.js';
import { rateLimiter } from '../middlewares/rateLimiter.js';
import { generateSummary } from '../services/agents/summaryGenerator.js';
import { enhanceBullet } from '../services/agents/bulletEnhancer.js';
import { parseResumeToJSON } from '../services/agents/resumeParser.js';
import { invalidateResumeCache } from '../services/resume/resumeService.js';
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();
const upload = multer();

// Cost, in credits, of a single interview/coach turn (also the opening message).
const TURN_COST = 5;

router.post('/match', async (req, res) => {
  try {
    const { resumeText, jdText } = req.body;
    const result = await jdMatcher(resumeText, jdText);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Start a new interview/coach session.
 * Accepts EITHER an uploaded PDF (multipart `file`) OR a saved `resumeId`.
 * Uploaded resumes are parsed and saved to Resume Manager, then used as the
 * chat's resume snapshot. Generates the opening assistant message.
 */
router.post(
  "/interview/session",
  protect,
  upload.single("file"),
  async (req, res) => {
    try {
      const user = req.user;
      const { resumeId, jobDescription, targetRole } = req.body;
      const mode = req.body.mode === "coach" ? "coach" : "interview";

      let snapshot;
      let usedResumeId;

      if (req.file) {
        // --- Uploaded PDF: parse -> save -> snapshot -----------------------
        if (user.credits < TURN_COST) {
          return res
            .status(403)
            .json({ message: "Not enough credits. Upgrade required" });
        }

        const resumeText = await parsePDF(req.file.buffer);
        if (!resumeText || !resumeText.trim()) {
          return res.status(422).json({
            error:
              "Could not read text from this PDF (it may be scanned/image-based).",
          });
        }

        const parsed = await parseResumeToJSON(resumeText, "resume");

        // "Always save" — persist the uploaded resume to Resume Manager.
        const fallbackTitle = parsed?.personalInfo?.fullName
          ? `${parsed.personalInfo.fullName}'s Resume`
          : "Imported Resume";
        const savedResume = await Resume.create({
          ...parsed,
          title: (parsed?.title && parsed.title.trim()) || fallbackTitle,
          userId: user._id,
        });
        await invalidateResumeCache(user._id);

        user.credits -= TURN_COST; // charge for the parse
        snapshot = parsed;
        usedResumeId = savedResume._id;
      } else if (resumeId) {
        // --- Saved resume --------------------------------------------------
        const resume = await Resume.findById(resumeId);
        if (!resume) return res.status(404).json({ error: "Resume not found" });
        if (String(resume.userId) !== String(user._id)) {
          return res.status(403).json({ error: "Not your resume" });
        }
        snapshot = resume.toObject();
        usedResumeId = resume._id;
      } else {
        return res
          .status(400)
          .json({ error: "A resume is required to start a session." });
      }

      // Opening message = one turn.
      if (user.credits < TURN_COST) {
        return res
          .status(403)
          .json({ message: "Not enough credits. Upgrade required" });
      }

      const firstMessage = await generateOpeningMessage({
        user,
        mode,
        resumeSnapshot: snapshot,
        targetRole,
        jobDescription,
      });
      user.credits -= TURN_COST;

      const resumeTitle =
        snapshot?.title || snapshot?.personalInfo?.fullName || "Resume";
      const label = mode === "coach" ? "Coaching" : "Interview";
      const title = `${label} – ${targetRole || resumeTitle}`.substring(0, 60);

      const chat = await Chat.create({
        userId: user._id,
        title,
        mode,
        resumeId: usedResumeId,
        resumeSnapshot: snapshot,
        targetRole: targetRole || "",
        jobDescription: jobDescription || "",
        messages: [{ role: "assistant", content: firstMessage }],
      });

      await user.save();

      res.json({
        chatId: chat._id,
        mode: chat.mode,
        title: chat.title,
        resumeId: usedResumeId,
        resumeTitle,
        firstMessage,
        credits: user.credits,
      });
    } catch (error) {
      console.error("INTERVIEW SESSION ERROR:", error);
      res.status(500).json({ error: error.message });
    }
  },
);

/**
 * Send a message in an existing session. Requires a `chatId` (create the
 * session first via /interview/session). Runs the resume-aware agent using the
 * chat's stored mode, resume snapshot, and job description.
 */
router.post(
  "/interview",
  protect,
  rateLimiter,
  checkCredits(TURN_COST),
  async (req, res) => {
    try {
      const { message, chatId } = req.body;
      const user = req.user;

      if (!chatId) {
        return res
          .status(400)
          .json({ error: "chatId is required. Start a session first." });
      }
      if (!message || !message.trim()) {
        return res.status(400).json({ error: "Message is required." });
      }

      const chat = await Chat.findById(chatId);
      if (!chat) return res.status(404).json({ error: "Chat not found" });
      if (String(chat.userId) !== String(user._id)) {
        return res.status(403).json({ error: "Not your chat" });
      }

      const reply = await runInterviewAgent({
        user,
        mode: chat.mode,
        resumeSnapshot: chat.resumeSnapshot,
        targetRole: chat.targetRole,
        jobDescription: chat.jobDescription,
        chatHistory: chat.messages.map((m) => ({
          role: m.role,
          content: m.content,
        })),
        userMessage: message,
      });

      chat.messages.push({ role: "user", content: message });
      chat.messages.push({ role: "assistant", content: reply });
      await chat.save();

      user.credits -= TURN_COST;
      await user.save();

      res.json({ reply, chatId: chat._id, credits: user.credits });
    } catch (error) {
      console.error("INTERVIEW ERROR:", error);
      res.status(500).json({ error: error.message });
    }
  },
);

// List the current user's sessions (lightweight — no snapshot/messages).
router.get("/chats", protect, async (req, res) => {
  try {
    const chats = await Chat.find({ userId: req.user._id })
      .select("title mode targetRole createdAt updatedAt")
      .sort({ createdAt: -1 });
    res.json(chats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Load a single session (full messages + context) to resume it.
router.get("/chats/:id", protect, async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.id);
    if (!chat) return res.status(404).json({ error: "Chat not found" });
    if (String(chat.userId) !== String(req.user._id)) {
      return res.status(403).json({ error: "Not your chat" });
    }
    res.json(chat);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a session (used by the Interview Library).
router.delete("/chats/:id", protect, async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.id);
    if (!chat) return res.status(404).json({ error: "Chat not found" });
    if (String(chat.userId) !== String(req.user._id)) {
      return res.status(403).json({ error: "Not your chat" });
    }
    await chat.deleteOne();
    res.json({ message: "Chat deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/generate-summary', mockAuth, checkCredits(3), async (req, res) => {
  try {
    const { role, skills, experienceLevel } = req.body;
    const summary = await generateSummary(role, skills, experienceLevel);
    req.user.credits -= 3;
    await req.user.save();
    res.json({ summary });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

router.post('/enhance-bullet', mockAuth, checkCredits(2), async (req, res) => {
  try {
    const { bullet, role } = req.body;
    const enhanced = await enhanceBullet(bullet, role);
    req.user.credits -= 2;
    await req.user.save();
    res.json({ enhancedBullet: enhanced });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post(
  "/import-resume", protect,
  checkCredits(5),
  upload.single("file"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "Resume PDF Required" });
      }
      const resumeText = await parsePDF(req.file.buffer);

      if (!resumeText || !resumeText.trim()) {
        return res.status(422).json({
          error: "Could not read text from this PDF (it may be scanned/image-based).",
        });
      }

      const source = req.body.source === "linkedin" ? "linkedin" : "resume";
      const parsed = await parseResumeToJSON(resumeText, source);
      req.user.credits -= 5;
      await req.user.save();
      res.json(parsed);
    } catch (error) {
      console.error("IMPORT RESUME ERROR:", error);
      res.status(500).json({ error: error.message });
    }
  },
);
export default router;
