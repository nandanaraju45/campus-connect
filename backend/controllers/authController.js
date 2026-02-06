import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/* Generate JWT */
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

/* Register */
export const registerUser = async (req, res) => {
    try {
        const { name, email, password, role, department, adminSecret } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists)
            return res.status(400).json({ message: "User already exists" });

        /* Admin secret check */
        if (role === "admin") {
            if (adminSecret !== process.env.ADMIN_SECRET) {
                return res.status(401).json({ message: "Invalid admin secret key" });
            }
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
            department,
            approved: role === "admin" ? true : false,
        });

        res.status(201).json({
            message: "Registration successful",
            token: generateToken(user._id),
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/* Login */
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
        return res.status(401).json({ message: "Invalid credentials" });

    res.json({
        token: generateToken(user._id),
        user: {
            id: user._id,
            name: user.name,
            role: user.role,
            approved: user.approved,
            department: user.department,
        },
    });
};

/* Profile */
export const getProfile = async (req, res) => {
    res.json(req.user);
};
