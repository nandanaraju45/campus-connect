import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },

        password: {
            type: String,
            required: true,
        },

        role: {
            type: String,
            enum: ["admin", "faculty", "student"],
            default: "student",
        },

        department: {
            type: String,
        },

        approved: {
            type: Boolean,
            default: false, // admin approval
        },
    },
    { timestamps: true }
);

export default mongoose.model("User", userSchema);
