import ATSAnalysis from "../models/ATSAnalysis.js";
import { analyzeATS } from "../services/agents/analyzeATS.js";
import { parsePDF } from "../services/parser/pdfParser.js";

export const analyzeATSController = async (req, res) => {
  try {
    const { jdText } = req.body;

    // VALIDATION
    if (!req.file) {
      return res.status(400).json({
        error: "Resume PDF required",
      });
    }

    if (!jdText) {
      return res.status(400).json({
        error: "Job description required",
      });
    }

    // 1. EXTRACT PDF TEXT
    const resumeText = await parsePDF(req.file.buffer);

    // 2. AI ANALYSIS
    const result = await analyzeATS(resumeText, jdText);

    // 3. CREDIT DEDUCTION
    req.user.credits -= 5;

    await req.user.save();
    
    await ATSAnalysis.create({

  userId: req.user._id,

  resumeName:
    req.file.originalname,

  resumeText,

  jdText,

  score:
    result.score,

  missingSkills:
    result.missingSkills,

  strengths:
    result.strengths,

  suggestions:
    result.suggestions,

  summary:
    result.summary,
});
    res.json(result);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: error.message,
    });
  }
};
