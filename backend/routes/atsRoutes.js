import express from "express";
import { calculateATSScore } from "../services/ats/scorer.js";

const router = express.Router();

router.post("/", (req, res)=>{
    const score = calculateATSScore(req.body);
    res.json({score});
})

export default router;