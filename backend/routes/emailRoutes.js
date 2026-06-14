import express from "express";
import { sendResumeMail } from "../controllers/emailController.js";
import {
  protect,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/send-resume", protect, sendResumeMail);

export default router;