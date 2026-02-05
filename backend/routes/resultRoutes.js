import express from "express";
import {
    publishResult,
    getResultByItem,
} from "../controllers/resultController.js";
import { protect } from "../middleware/authMiddleware.js";
import { isFaculty } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/:itemId", protect, isFaculty, publishResult);
router.get("/:itemId", getResultByItem);

export default router;
