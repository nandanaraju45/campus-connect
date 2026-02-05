import express from "express";
import {
    createEvent,
    getAllEvents,
    getEventById,
    getFacultyEvents,
    updateEvent,
    closeEvent,
} from "../controllers/eventController.js";
import { protect } from "../middleware/authMiddleware.js";
import { isFaculty } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/", getAllEvents);
router.get("/:id", getEventById);

router.post("/", protect, isFaculty, createEvent);
router.get("/faculty/my-events", protect, isFaculty, getFacultyEvents);
router.put("/:id", protect, isFaculty, updateEvent);
router.put("/close/:id", protect, isFaculty, closeEvent);

export default router;
