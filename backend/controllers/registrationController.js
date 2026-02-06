import Registration from "../models/Registration.js";
import EventItem from "../models/EventItem.js";
import paypalClient from "../config/paypalClient.js";
import paypal from "@paypal/checkout-server-sdk";

// 1️⃣ Create PayPal Order
export const createPayPalOrder = async (req, res) => {
    try {
        const { eventItemId } = req.body;
        const item = await EventItem.findById(eventItemId);
        if (!item) return res.status(404).json({ message: "Item not found" });

        // Convert INR → USD (rough rate, adjust if you want)
        const usdAmount = (item.fee / 83).toFixed(2);

        const request = new paypal.orders.OrdersCreateRequest();
        request.prefer("return=representation");
        request.requestBody({
            intent: "CAPTURE",
            purchase_units: [
                {
                    amount: {
                        currency_code: "USD",
                        value: usdAmount,
                    },
                    description: item.name,
                },
            ],
        });

        const order = await paypalClient.execute(request);

        res.json({
            id: order.result.id,
            displayAmount: item.fee, // still show INR in UI if you want
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "PayPal order creation failed" });
    }
};

// 2️⃣ Capture PayPal Payment
export const capturePayPalOrder = async (req, res) => {
    try {
        const { orderId, eventItemId } = req.body;

        const request = new paypal.orders.OrdersCaptureRequest(orderId);
        request.requestBody({});

        const capture = await paypalClient.execute(request);

        // Save registration
        const registration = await Registration.create({
            student: req.user._id,
            eventItem: eventItemId,
            paymentStatus: "paid",
            paypalOrderId: orderId,
            paypalPaymentId: capture.result.purchase_units[0].payments.captures[0].id,
        });

        res.json(registration);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "PayPal payment capture failed" });
    }
};


export const registerForItem = async (req, res) => {
    const registration = await Registration.create({
        student: req.user._id,
        eventItem: req.body.eventItem,
    });

    res.status(201).json(registration);
};

export const myRegistrations = async (req, res) => {
    try {
        const registrations = await Registration.find({
            student: req.user._id,
        }).populate({
            path: "eventItem", // first level
            populate: {
                path: "event", // nested field inside eventItem
            },
        });

        res.json(registrations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};


export const cancelRegistration = async (req, res) => {
    await Registration.findByIdAndDelete(req.params.id);
    res.json({ message: "Registration cancelled" });
};
