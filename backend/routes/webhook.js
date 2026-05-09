import express from "express";
import Stripe from "stripe";
import User from "../models/User.js";

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post('/', async (req, res)=>{
    console.log("🔥 Webhook route hit");
    const signature = req.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET
        )
    } catch (error) {
        console.error("Wehook error", error.message);
        return res.sendStatus(400);
    }

    if(event.type === 'checkout.session.completed'){
        const session = event.data.object;
        console.log("Payment successful");
        
        const email = session.customer_details.email;

        //Update User
        const user = await User.findOne({email});
        if(user){
            // Update user properties as needed
            user.isPremium = true;
            user.credits +=1000;
            await user.save();

            console.log("User upgraded to premium:", user.email);
        }
    }
    res.sendStatus(200);
})
export default router;