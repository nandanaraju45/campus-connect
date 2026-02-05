import express from "express";
import {
    getAllUsers,
    approveUser,
    deleteUser,
    getAllEvents,
    deleteEvent,
} from "../controllers/adminController.js";
import { protect } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/users", protect, isAdmin, getAllUsers);
router.put("/users/approve/:id", protect, isAdmin, approveUser);
router.delete("/users/:id", protect, isAdmin, deleteUser);

router.get("/events", protect, isAdmin, getAllEvents);
router.delete("/events/:id", protect, isAdmin, deleteEvent);

export default router;
