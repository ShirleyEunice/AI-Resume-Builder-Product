import express from 'express';
import multer from 'multer';
import { parsePDF } from '../services/parser/pdfParser.js';
import { jdMatcher } from '../services/agents/jdMatcher.js';
import { generateCoverLetter } from '../services/agents/coverLetter.js';
import { checkCredits } from '../middlewares/creditCheck.js';
import { mockAuth } from '../middlewares/mockAuth.js';
import User from '../models/User.js';
import Chat from '../models/Chat.js';
import { runInterviewAgent } from '../services/agents/interviewAgent.js';
import { rateLimiter } from '../middlewares/rateLimiter.js';
import { generateSummary } from '../services/agents/summaryGenerator.js';
import { enhanceBullet } from '../services/agents/bulletEnhancer.js';
import {atsScore} from '../services/agents/atsAnalyzer.js';


const router = express.Router();
const upload = multer();

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

router.post("/interview", mockAuth, rateLimiter, checkCredits(5), async (req, res)=>{
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

router.post('/generate-summary', mockAuth, checkCredits(3), async(req, res)=>{
    try {
        const {role, skills, experienceLevel} = req.body;
        const summary = await generateSummary(role, skills, experienceLevel);
        //deduct credits
        req.user.credits -=3;
        await req.user.save();
        res.json({summary});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
})

router.post('/enhance-bullet', mockAuth, checkCredits(2), async (req, res)=>{
    try {
        const {bullet, role} = req.body;
        const enhanced = await enhanceBullet(bullet, role);
        req.user.credits -=2;
        await req.user.save();
        res.json({enhancedBullet: enhanced});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

router.post('/ats-score', mockAuth, checkCredits(5), async(req, res)=>{
    try {
        const {resumeData, jdText} = req.body;

        const result = await atsScore(resumeData, jdText);

        req.user.credits -=5;
        await req.user.save();
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).message({error: error.message});
    }
})
export default router;