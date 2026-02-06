import EventItem from "../models/EventItem.js";
import Registration from "../models/Registration.js";

export const createItem = async (req, res) => {
    const item = await EventItem.create({
        event: req.params.eventId,
        ...req.body,
    });
    res.status(201).json(item);
};

export const getItemsByEvent = async (req, res) => {
    const items = await EventItem.find({ event: req.params.eventId });
    res.json(items);
};

export const updateItem = async (req, res) => {
    const item = await EventItem.findByIdAndUpdate(
        req.params.itemId,
        req.body,
        { new: true }
    );
    res.json(item);
};

export const deleteItem = async (req, res) => {
    await EventItem.findByIdAndDelete(req.params.itemId);
    res.json({ message: "Item deleted" });
};

export const getItemById = async (req, res) => {
    try {
        const EventItem = await EventItem.findById(req.params.itemId);
        if (!EventItem) return res.status(404).json({ message: "Item not found" });
        res.json(EventItem);
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.error(err);
    }
};

export const getParticipants = async (req, res) => {
    const participants = await Registration.find({
        eventItem: req.params.itemId,
    }).populate("student", "name email");
    res.json(participants);
};
