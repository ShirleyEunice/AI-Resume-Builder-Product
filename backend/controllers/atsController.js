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

export const getATSHistory = async(req, res)=>{
    try {
        const analyses = await ATSAnalysis.find({
            userId: req.user._id,
        })
        .sort({createdAt: -1});
        res.json(analyses);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

export const getATSById = async (req, res)=>{
    try {
        const analysis = await ATSAnalysis.findById({
            _id: req.params.id,
            userId: req.user._id,
        });

        if(!analysis){
            return res.status(404).json({error: "Analysis not found"});
        }
        res.json(analysis);
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

export const deleteATSAnalysis =
  async (req, res) => {

  try {

    await ATSAnalysis.findOneAndDelete({

      _id:
        req.params.id,

      userId:
        req.user._id,
    });

    res.json({
      message:
        "Deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      error:
        error.message,
    });
  }
};
