import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    stripeSessionId: {
      type: String,
      required: true,
      unique: true,
    },
    planId: {
      type: String,
      required: true,
    },
    credits: {
      type: Number,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: "inr",
    },
    status: {
      type: String,
      default: "paid",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Payment", paymentSchema);
