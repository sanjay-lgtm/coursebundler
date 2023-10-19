import mongoose from "mongoose";
import validator from "validator";

const schema = new mongoose.Schema({
  razorpay_signature: {
    type: String,
    required: [true, "Please provide a signature"],
  },
  razorpay_payment_id: {
    type: String,
    required: [true, "Please provide payment id"],
  },
  razorpay_subscription_id: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


export const Payment = mongoose.model("Payment", schema);
