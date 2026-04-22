import express from 'express';
import multer from 'multer';
import { parsePDF } from '../services/parser/pdfParser.js';
import { analyseResume } from '../services/agents/resumeAnalyzer.js';


const router = express.Router();
const upload = multer();

router.post('/analyze', upload.single('file'), async (req, res)=>{
    try {
        const text = await parsePDF(req.file.buffer);
        const result = await analyseResume(text);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

export default router;