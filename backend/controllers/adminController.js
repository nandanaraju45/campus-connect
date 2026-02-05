import User from "../models/User.js";
import Event from "../models/Event.js";

export const getAllUsers = async (req, res) => {
    const users = await User.find();
    res.json(users);
};

export const approveUser = async (req, res) => {
    const user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    user.approved = true;
    await user.save();

    res.json({ message: "User approved" });
};

export const deleteUser = async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
};

export const getAllEvents = async (req, res) => {
    const events = await Event.find().populate("faculty", "name email");
    res.json(events);
};

export const deleteEvent = async (req, res) => {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: "Event deleted" });
};
