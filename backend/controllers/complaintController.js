import Complaint from "../models/Complaint.js";

/* =========================
   Create complaint (USER)
========================= */
export const createComplaint = async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ message: "Message is required" });
        }

        const complaint = await Complaint.create({
            user: req.user._id,
            message,
        });

        res.status(201).json(complaint);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/* =========================
   Get logged-in user's complaints
========================= */
export const getMyComplaints = async (req, res) => {
    try {
        const complaints = await Complaint.find({
            user: req.user._id,
        }).sort({ createdAt: -1 });

        res.json(complaints);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/* =========================
   Get all complaints (ADMIN)
========================= */
export const getAllComplaints = async (req, res) => {
    try {
        const complaints = await Complaint.find()
            .populate("user", "name email")
            .sort({ createdAt: -1 });

        res.json(complaints);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/* =========================
   Admin reply to complaint
========================= */
export const replyToComplaint = async (req, res) => {
    try {
        const { reply } = req.body;

        const complaint = await Complaint.findById(req.params.id);

        if (!complaint) {
            return res.status(404).json({ message: "Complaint not found" });
        }

        complaint.adminReply = reply;
        await complaint.save();

        // 🔥 IMPORTANT: populate user again
        const populatedComplaint = await Complaint.findById(complaint._id)
            .populate("user", "name email");

        res.json(populatedComplaint);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

