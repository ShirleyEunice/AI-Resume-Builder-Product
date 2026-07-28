import CoverLetter from "../models/CoverLetter.js";
import Resume from "../models/Resume.js"
import { generateCoverLetter } from "../services/agents/coverLetter.js";
import { resumeToText } from "../utils/resumeToText.js";
import { parsePDF } from "../services/parser/pdfParser.js";

const COVER_LETTER_COST = 10;

export const generateCoverLetterController = async (req, res)=>{
    try {
        let {resumeId, resumeText, jdText, tone, title} = req.body;

        if(!jdText || !jdText.trim()){
            return res.status(400).json({error: "Job description required"});
        }

        //Prefer a saved resume when resumeId is provided
        if(resumeId){
            const resume = await Resume.findOne({_id: resumeId, userId: req.user._id});
            if(!resume){
                return res.status(404).json({error: "Resume not found."});
            }
            resumeText = resumeToText(resume);
            if(!title) title = resume.title;
        }

        if(!resumeText || !resumeText.trim()){
            return res.status(400).json({error: "Resume content required."});
        }

        //1. AI generation
        const content = await generateCoverLetter(resumeText, jdText, tone);

        //2. Deduct credits
        req.user.credits -= COVER_LETTER_COST;
        await req.user.save();

        //3. Persist
        const coverLetter = await CoverLetter.create({
            userId: req.user._id,
            resumeId: resumeId || null,
            title: title || "Untitled Cover Letter",
            resumeText,
            jdText,
            tone: tone || "professional",
            content,
        });

        res.json(coverLetter);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: error.message});
        
    }
};

export const getCoverLetterHistory = async (req, res)=>{
    try {
        const letters = await CoverLetter.find({userId: req.user._id}).sort({createdAt: -1});
        res.json(letters);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

export const getCoverLetterById = async (req, res)=>{
    try {
        const letter = await CoverLetter.findOne({_id: req.params.id, userId: req.user._id});
        if(!letter){
            return res.status(404).json({error: "Cover letter not found"});
        }
        res.json(letter);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

export const deleteCoverLetter = async (req, res)=>{
    try {
        await CoverLetter.findOneAndDelete({_id: req.params.id, userId: req.user._id});
        res.json({message: "Deleted successfully"});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

export const parseResumeController = async (req, res)=>{
    try {
        if(!req.file){
            return res.status(400).json({error: "Resume PDF required"});
        }
        const resumeText = await parsePDF(req.file.buffer);
        if(!resumeText || !resumeText.trim()){
            return res.status(422).json({
                error: "Could not read text from this PDF (it may be scanned/image-based).",
            });
        }
        res.json({resumeText});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};