import mongoose from "mongoose";

const resultSchema = new mongoose.Schema(
    {
        eventItem: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "EventItem",
            required: true,
        },

        positions: [
            {
                student: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                },
                position: {
                    type: Number, // 1, 2, 3
                },
            },
        ],
    },
    { timestamps: true }
);

export default mongoose.model("Result", resultSchema);
