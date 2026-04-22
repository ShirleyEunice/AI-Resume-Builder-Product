import Resume from "../models/Resume.js";
// Route -> POST -> /api/resume
// Create Resume
export const createResume = async (req, res) => {
  try {

    const count = await Resume.countDocuments();
    if(count >= 5){
        return res.status(403).json({message: "Resume limit Reached. Upgrade Required"});
    }

    //FIRST create
    const resume = new Resume(req.body);

    //THEN use it
    console.log("Before save:", resume);

    const saved = await resume.save();

    console.log("After save:", saved);

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
        const resumes = await Resume.find().sort({createdAt:-1});
        res.json(resumes);
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
        res.json({message: "Resume deleted successfully"});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting resume" });
    }
}