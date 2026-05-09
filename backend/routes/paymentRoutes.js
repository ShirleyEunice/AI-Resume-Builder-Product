import express from "express";
import Stripe from "stripe";

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post("/create-checkout-session", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",

      customer_email: "test@test.com",

      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: "AI Resume Builder Premium",
            },
            unit_amount: 5000, // Amount in paise (₹50.00)
          },
          quantity: 1,
        },
      ],

      success_url: `${process.env.CLIENT_URL}/success`,
      cancel_url: `${process.env.CLIENT_URL}/failed`,
    });

    res.json({ url: session.url });

  } catch (err) {
    console.error("❌ Stripe Error:", err.message);   // 👈 IMPORTANT
    res.status(500).json({ message: err.message });
  }
});

export default router;