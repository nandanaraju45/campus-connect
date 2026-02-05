import express from "express";
import {
    registerForItem,
    myRegistrations,
    cancelRegistration,
} from "../controllers/registrationController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, registerForItem);
router.get("/my", protect, myRegistrations);
router.delete("/:id", protect, cancelRegistration);

export default router;
