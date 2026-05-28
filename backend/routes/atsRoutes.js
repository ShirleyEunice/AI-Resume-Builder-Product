import express from "express";
import { mockAuth } from "../middlewares/mockAuth.js";
import { rateLimiter } from "../middlewares/rateLimiter.js";
import { checkCredits } from "../middlewares/creditCheck.js";
import { analyzeATSController, deleteATSAnalysis, getATSById, getATSHistory } from "../controllers/atsController.js";
import multer from "multer";
import { protect } from "../middlewares/authMiddleware.js";

const upload = multer(); // for parsing multipart/form-data, which is used for file uploads

const router = express.Router();

router.post('/analyze-ats', protect, rateLimiter, checkCredits(5), upload.single('file'), analyzeATSController);
router.get("/history", protect, getATSHistory);
router.get("/:id", protect, getATSById);
router.delete("/:id", protect, deleteATSAnalysis);


export default router;