import Result from "../models/Result.js";

export const publishResult = async (req, res) => {
    const result = await Result.create({
        eventItem: req.params.itemId,
        positions: req.body.positions,
    });
    res.status(201).json(result);
};

export const getResultByItem = async (req, res) => {
    const result = await Result.findOne({
        eventItem: req.params.itemId,
    }).populate("positions.student", "name");
    res.json(result);
};
