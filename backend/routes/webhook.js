import express from "express";
import Stripe from "stripe";
import { fulfillCheckout } from "../services/payment/fulfillCheckout.js";

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post("/", async (req, res)=>{
    const signature = req.header['stripe-signature'];
    let event;

    //1. Verify this really came from stripe (needs RAW body)
    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (error) {
        console.error("Webhook signature failed:", err.message);
        return res.sendStatus(400);
    }

    //2. React to the event we care about
    try {
        if(event.type === "checkout.session.completed"){
            await fulfillCheckout(event.data.object.id);
        }
    } catch (error) {
        console.error("Webhook fulfillment error:", err.message);
      return res.sendStatus(500);
    }

    //3. Acknowledge receipt
    res.sendStatus(200);
});

export default router;