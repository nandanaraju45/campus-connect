import express from "express";
import {
    createItem,
    getItemsByEvent,
    updateItem,
    deleteItem,
    getParticipants,
} from "../controllers/itemController.js";
import { protect } from "../middleware/authMiddleware.js";
import { isFaculty } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/:eventId", protect, isFaculty, createItem);
router.get("/event/:eventId", getItemsByEvent);

router.put("/:itemId", protect, isFaculty, updateItem);
router.delete("/:itemId", protect, isFaculty, deleteItem);

router.get("/:itemId/participants", protect, isFaculty, getParticipants);

export default router;
