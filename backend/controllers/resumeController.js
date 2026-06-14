import Resume from "../models/Resume.js";
import { fetchResumes, invalidateResumeCache } from "../services/resume/resumeService.js";
// Route -> POST -> /api/resume
// Create Resume
export const createResume = async (req, res) => {
  try {
    //FIRST create
    const resumeData = {
      ...req.body,
      title: req.body.title?.trim() || "Untitled Resume",
    };

    delete resumeData._id;

    const resume = new Resume(resumeData);
    const saved = await resume.save();

    await invalidateResumeCache(saved.userId);
    res.status(201).json(saved);
  } catch (error) {
    console.error(error);
    console.error("CREATE RESUME ERROR:", error);
    res.status(500).json({ message: "Error creating resume" });
  }
};


//Route -> GET -> /api/resume/
// Get all resumes
export const getResumes = async(req, res)=>{
    try {
        const page = Math.max(1, parseInt(req.query.page) || 1);
        const limit = Math.min(50, Math.max(1, parseInt(req.query.limit) || 10));
        const sort = ["createdAt", "updatedAt", "title", "atsScore"].includes(req.query.sort)
        ? req.query.sort : "updatedAt";
        const order = req.query.order === "asc" ? "asc" : "desc";
        const search = req.query.search?.trim() || "";
        const userId = req.user?._id || req.query.userId;
        if(!userId) return res.status(400).json({message: "userId is Required"});

        const result = await fetchResumes(userId, {page, limit, sort, order, search});
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching resumes" });
    }
}

//Route -> GET-> /api/resume/:id
// Get resume by ID
export const getResumeById = async(req, res)=>{
    try {
        const resume = await Resume.findById(req.params.id);
        if(!resume){
            return res.status(404).json({message: "Resume not found"});
        }
        res.json(resume);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching resume" });
    }
}


//Route -> PUT -> /api/resume/:id
//Update Resume
export const updateResume = async(req, res)=>{
    try {
        const resume = await Resume.findByIdAndUpdate(req.params.id, req.body, {new:true});
        if(!resume){
            return res.status(404).json({message: "Resume not found"});
        }
        await invalidateResumeCache(resume.userId);
        res.json(resume);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating resume" });
    }
}

//Route -> DELETE ->api/resume/:id
//Delete Resume
export const deleteResume = async(req, res)=>{
    try {
        const resume = await Resume.findByIdAndDelete(req.params.id);
        if(!resume){
            return res.status(404).json({message: "Resume not found"});
        }
        await invalidateResumeCache(resume.userId);
        res.json({message: "Resume deleted successfully"});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting resume" });
    }
}