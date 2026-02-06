import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import itemRoutes from "./routes/itemRoutes.js";
import registrationRoutes from "./routes/registrationRoutes.js";
import resultRoutes from "./routes/resultRoutes.js";

dotenv.config();

const app = express();

/* Connect DB */
connectDB();

/* Middlewares */
app.use(cors());
app.use(express.json());

/* Routes */
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/registrations", registrationRoutes);
app.use("/api/results", resultRoutes);

/* Test Route */
app.get("/", (req, res) => {
    res.send("Campus Connect API is running 🚀");
});

/* Start Server */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
