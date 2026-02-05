import mongoose from "mongoose";

const eventItemSchema = new mongoose.Schema(
    {
        event: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Event",
            required: true,
        },

        name: {
            type: String,
            required: true,
        },

        fee: {
            type: Number,
            default: 0,
        },

        maxParticipants: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
);

export default mongoose.model("EventItem", eventItemSchema);
