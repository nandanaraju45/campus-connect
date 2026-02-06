import express from "express";
import {
    registerForItem,
    myRegistrations,
    cancelRegistration,
    createPayPalOrder,
    capturePayPalOrder,
} from "../controllers/registrationController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, registerForItem);
router.get("/my", protect, myRegistrations);
router.delete("/:id", protect, cancelRegistration);

router.post("/paypal/create", protect, createPayPalOrder);
router.post("/paypal/capture", protect, capturePayPalOrder);


export default router;
