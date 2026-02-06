import express from "express";
import {
    createComplaint,
    getMyComplaints,
    getAllComplaints,
    replyToComplaint,
} from "../controllers/complaintController.js";

import { protect } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/roleMiddleware.js";

const router = express.Router();

/* User routes */
router.post("/", protect, createComplaint);
router.get("/my", protect, getMyComplaints);

/* Admin routes */
router.get("/", protect, isAdmin, getAllComplaints);
router.put("/:id/reply", protect, isAdmin, replyToComplaint);

export default router;
