import Registration from "../models/Registration.js";

export const createOrder = async (req, res) => {
    res.json({ message: "Order created (Razorpay logic here)" });
};

export const verifyPayment = async (req, res) => {
    const registration = await Registration.findById(req.body.registrationId);
    registration.paymentStatus = "paid";
    registration.razorpayPaymentId = req.body.paymentId;
    await registration.save();

    res.json({ message: "Payment successful" });
};
