import paypal from "@paypal/checkout-server-sdk";

const environment = new paypal.core.SandboxEnvironment(
    "Afb-xuSJbbcB4_cXT12sqtJD3tTcUKueV7Y5WjunYs8P0pET__ZXisBJVfWp1o0tjAdvpdX3_yxsR5BN",
    "EKmIbUt2fC8IZqWVgCYWRxuV1ehUSzruVIYwnglVgCL5wfNxPNPMNhFosYXFJpmK0eVOMQzPGSBtNUyZ"
);

const paypalClient = new paypal.core.PayPalHttpClient(environment);

export default paypalClient;
