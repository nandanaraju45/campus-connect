export const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === "admin") {
        next();
    } else {
        return res.status(403).json({ message: "Admin access only" });
    }
};

export const isFaculty = (req, res, next) => {
    if (req.user && req.user.role === "faculty") {
        next();
    } else {
        return res.status(403).json({ message: "Faculty access only" });
    }
};

export const isStudent = (req, res, next) => {
    if (req.user && req.user.role === "student") {
        next();
    } else {
        return res.status(403).json({ message: "Student access only" });
    }
};
