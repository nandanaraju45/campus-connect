import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    eventItem: { type: mongoose.Schema.Types.ObjectId, ref: "EventItem", required: true },
    paymentStatus: { type: String, enum: ["pending", "paid"], default: "pending" },

    // Razorpay (optional)
    razorpayOrderId: String,
    razorpayPaymentId: String,

    // PayPal
    paypalOrderId: String,
    paypalPaymentId: String,
  },
  { timestamps: true }
);

export default mongoose.model("Registration", registrationSchema)
