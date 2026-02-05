import Event from "../models/Event.js";

export const createEvent = async (req, res) => {
    const event = await Event.create({
        ...req.body,
        faculty: req.user._id,
    });
    res.status(201).json(event);
};

export const getAllEvents = async (req, res) => {
    const events = await Event.find({ status: "open" }).populate(
        "faculty",
        "name"
    );
    res.json(events);
};

export const getEventById = async (req, res) => {
    const event = await Event.findById(req.params.id);
    res.json(event);
};

export const getFacultyEvents = async (req, res) => {
    const events = await Event.find({ faculty: req.user._id });
    res.json(events);
};

export const updateEvent = async (req, res) => {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });
    res.json(event);
};

export const closeEvent = async (req, res) => {
    const event = await Event.findById(req.params.id);
    event.status = "closed";
    await event.save();
    res.json({ message: "Event closed" });
};
