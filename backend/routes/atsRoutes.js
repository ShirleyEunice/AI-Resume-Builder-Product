import express from "express";
import { calculateATSScore } from "../services/ats/scorer.js";
import { mockAuth } from "../middlewares/mockAuth.js";
import { rateLimiter } from "../middlewares/rateLimiter.js";
import { checkCredits } from "../middlewares/creditCheck.js";
import { analyzeATSController } from "../controllers/atsController.js";
import multer from "multer";
import { protect } from "../middlewares/authMiddleware.js";

const upload = multer(); // for parsing multipart/form-data, which is used for file uploads

const router = express.Router();

router.post("/", (req, res)=>{
    const score = calculateATSScore(req.body);
    res.json({score});
})

router.post('/analyze-ats', protect, rateLimiter, checkCredits(5), upload.single('file'), analyzeATSController);

export default router;