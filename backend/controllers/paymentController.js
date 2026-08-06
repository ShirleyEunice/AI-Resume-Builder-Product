import { getPlan, listPlans } from "../config/creditPlans.js"
import Stripe from "stripe";
import { fulfillCheckout } from "../services/payment/fulfillCheckout.js";
import User from "../models/User.js";


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const CLIENT_URL = process.env.CLIENT_URL?.replace(/\/$/, "");

//GET /api/payment/plans - public pricing catlog for the Upgrade page.
export const getPaymentPlans = (req, res)=>{
    res.json({plans: listPlans()})
};

//POST /api/payment/create-checkout-session {planId} - protected
export const createCheckoutSession = async (req, res)=>{
    try {
        const plan = getPlan(req.body.planId);
        if(!plan) return res.status(400).json({message: "Invalid Plan"});

        const user = req.user; //set protected middleware

        const session = await stripe.checkout.sessions.create({
            mode: "payment",
            payment_method_types:["card"],
            customer: user.stripeCustomerId || undefined,
            customer_email: user.stripeCustomerId ? undefined : user.email,
            client_reference_id: user._id.toString(),
            metadata: {userId: user._id.toString(), planId: plan.id},
            line_items:[
                {
                    quantity: 1,
                    price_data: {
                        currency: plan.currency,
                        unit_amount: plan.amount,
                        product_data: {
                            name: `${plan.name} - ${plan.credits} credits`,
                            description: plan.description,
                        }
                    }
                }
            ],
            success_url: `${CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${CLIENT_URL}/failed`,
        });
        res.json({url: session.url});
    } catch (error) {
        console.error("Create Checkout Session:", error.message);
        res.status(500).json({message: error.message});
        
    }
}


//GET /api/payment/verify?session_id= , protected
export const verifySession = async (req, res)=>{
    try {
        const sessionId = req.query.session_id;
        if(!sessionId) return res.status(400).json({message: "Missing session_id"});

        const result = await fulfillCheckout(sessionId);
        if(result.paid === false){
            return res.status(402).json({success: false, message: "Payment not completed"});
        }

        const fresh = await User.findById(req.user._id).select("credits creditsGranted isPremium");
        res.json({
            success:true,
            creditsAdded: result.creditsAdded ?? 0,
            credits: fresh?.credits ?? req.user.credits,
            creditsGranted: fresh?.creditsGranted ?? req.user.creditsGranted,
            isPremium: fresh?.isPremium ?? req.user.isPremium,
            alreadyFulfilled: !!result.alreadyFulfilled,
        });
    } catch (error) {
        console.error("verify:", error.message);
        res.status(500).json({ message: error.message });
    }
}