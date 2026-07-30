import Stripe from "stripe";
import Payment from "../../models/Payment.js";
import { getPlan } from "../../config/creditPlans.js";
import User from "../../models/User.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

//Grants a checkout session credits to the user exactly once.
export const fulfillCheckout = async (sessionId)=>{
    if(!sessionId) throw new Error("Missing sessionId");

    //1. Already fulfilled
    const exisiting = await Payment.findOne({stripeSessionId: sessionId});
    if(exisiting){
        return { alreadyFulfilled: true, credits: exisiting.credits};
    }

    //2. Pull the Authoritative session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    //3. Only fulfill fully-paid sessions.
    if(session.payment_status !== "paid"){
        return {alreadyFulfilled: false, paid: false};
    }

    //4. Recover who + what from the metadata we set at checkout time.
    const userId = session.metadata?.userId || session.client_reference_id;
    const plan = getPlan(session.metadata?.planId);

    if(!userId || !plan){
        throw new Error(`Cannot fulfill ${sessionId}: missing user or unkown plan`);
    }

    //5. CLAIM fulfillment by inserting the Payment record first.
    try {
        await Payment.create({
            userId,
            stripeSessionId: sessionId,
            planId: plan.id,
            credits:plan.credits,
            amount: plan.amount,
            currency: plan.currency,
            status: "paid",
        });
    } catch (error) {
        if(error.code === 11000){
            return {alreadyFulfilled: true, credits: plan.credits};
        }
        throw error;
    }

//6. We own it - grant the credits atomically, and mark the buyer premium.
const user = await User.findByIdAndUpdate(
    userId,
    {$inc: {credits: plan.credits}, $set: {isPremium: true}},
    {new: true}
);
return {
    alreadyFulfilled: false,
    paid: true,
    creditsAdded: plan.credits,
    credits: user?.credits,
}
}