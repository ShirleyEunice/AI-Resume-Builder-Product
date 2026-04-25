import express from 'express';
import multer from 'multer';
import { parsePDF } from '../services/parser/pdfParser.js';
import { analyseResume } from '../services/agents/resumeAnalyzer.js';
import { jdMatcher } from '../services/agents/jdMatcher.js';
import { generateCoverLetter } from '../services/agents/coverLetter.js';
import { checkCredits } from '../middlewares/creditCheck.js';
import { mockAuth } from '../middlewares/mockAuth.js';
import User from '../models/User.js';
import Chat from '../models/Chat.js';
import { runInterviewAgent } from '../services/agents/interviewAgent.js';


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

router.post('/match', async (req, res)=>{
    try {
        const {resumeText, jdText} = req.body;
        const result = await jdMatcher(resumeText, jdText);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

router.post('/cover-letter',mockAuth, checkCredits(10), async (req, res)=>{
    try {
        const {resumeText, jdText, tone} = req.body;
        const result = await generateCoverLetter(resumeText, jdText, tone);
        req.user.credits -= 10;
        await req.user.save();
        res.json({coverLetter: result});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

router.post("/interview", mockAuth, checkCredits(5), async (req, res)=>{
    const {message, chatId} = req.body;
    const user = req.user;

    let chat;
    if(chatId){
        chat = await Chat.findById(chatId);
    }else{
        chat = new Chat({
            userId:user._id,
            title:message.substring(0, 30),
            messages:[]
        })
    }

    const reply = await runInterviewAgent(user, chat.messages, message);

    chat.messages.push({role:"user", content:message});
    chat.messages.push({role:"assistant", content:reply});
    await chat.save();

    user.credits -=5;
    await user.save();

    res.json({
        reply,
        chatId: chat._id,
    })
})

router.get("/chats", mockAuth, async(req, res)=>{
    try {
        const chats = (await Chat.find({ userId: req.user._id }).sort({ createdAt: -1 }));
        res.json(chats);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})
export default router;