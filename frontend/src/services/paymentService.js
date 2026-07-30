import API from "@/api/axios";

//Public catalog for the pricing page
export const getPlans = async ()=>{
    const res = await API.get("/payment/plans");
    return res.data;
}

//Ask the backend to create a checkout session
export const createCheckoutSession = async (planId) =>{
    const res = await API.post("/payment/create-checkout-session", {planId});
    return res.data;
}

// Confirm + Fulfil after stripe redirects back; returns {success, creditsAdded, credits}
export const verifySession = async (sessionId) =>{
    const res = await API.get(`/payment/verify?session_id=${sessionId}`);
    return res.data;
}