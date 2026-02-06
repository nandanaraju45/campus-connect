import express from "express";
import {
    createItem,
    getItemsByEvent,
    updateItem,
    deleteItem,
    getParticipants,
    getItemById,
} from "../controllers/itemController.js";
import { protect } from "../middleware/authMiddleware.js";
import { isFaculty } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/:eventId", protect, isFaculty, createItem);
router.get("/event/:eventId", getItemsByEvent);
router.get("/:itemId", protect, getItemById); // implement getItemById in controller

router.put("/:itemId", protect, isFaculty, updateItem);
router.delete("/:itemId", protect, isFaculty, deleteItem);

router.get("/:itemId/participants", protect, getParticipants);

export default router;
