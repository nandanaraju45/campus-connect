const paypalClient = require('./paypalClient'); // the file from step 3
const paypal = require("@paypal/checkout-server-sdk");

async function testPayPal() {
    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer("return=representation");
    request.requestBody({
        intent: "CAPTURE",
        purchase_units: [
            { amount: { currency_code: "USD", value: "1.00" } }
        ]
    });

    try {
        const response = await paypalClient.execute(request);
        console.log("✅ PayPal Sandbox Auth working!");
        console.log("Order ID:", response.result.id);
    } catch (err) {
        console.error("❌ PayPal Error:", err);
    }
}

testPayPal();
