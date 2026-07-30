import express from "express";
import Stripe from "stripe";
import { createCheckoutSession, getPaymentPlans, verifySession } from "../controllers/paymentController.js";
import {protect} from "../middlewares/authMiddleware.js"

const router = express.Router();

router.get("/plans", getPaymentPlans);
router.post("/create-checkout-session", protect, createCheckoutSession);
router.get("/verify", protect, verifySession);

export default router;
