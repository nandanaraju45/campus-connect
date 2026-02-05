import Registration from "../models/Registration.js";

export const registerForItem = async (req, res) => {
    const registration = await Registration.create({
        student: req.user._id,
        eventItem: req.body.eventItem,
    });

    res.status(201).json(registration);
};

export const myRegistrations = async (req, res) => {
    const registrations = await Registration.find({
        student: req.user._id,
    }).populate("eventItem");
    res.json(registrations);
};

export const cancelRegistration = async (req, res) => {
    await Registration.findByIdAndDelete(req.params.id);
    res.json({ message: "Registration cancelled" });
};
