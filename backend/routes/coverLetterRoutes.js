import express from 'express';
import multer from 'multer';
import { protect } from '../middlewares/authMiddleware.js';
import { rateLimiter } from '../middlewares/rateLimiter.js';
import { checkCredits } from '../middlewares/creditCheck.js';
import { deleteCoverLetter, generateCoverLetterController, getCoverLetterById, getCoverLetterHistory, parseResumeController } from '../controllers/coverLetterController.js';

const router = express.Router();
const upload = multer();

router.post("/generate", protect, rateLimiter, checkCredits(10), generateCoverLetterController);
router.post("/parse-resume", protect, upload.single("file"), parseResumeController);
router.get("/history", protect, getCoverLetterHistory);
router.get("/:id", protect, getCoverLetterById);
router.delete("/:id", protect, deleteCoverLetter);

export default router;