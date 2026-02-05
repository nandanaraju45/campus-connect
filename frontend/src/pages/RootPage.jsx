import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RootPage = () => {
    const navigate = useNavigate();
    const { user, loading, fetchProfile } = useAuth();

    // 🔹 Fetch profile once when RootPage mounts
    useEffect(() => {
        fetchProfile();
    }, [fetchProfile]);

    // 🔹 Redirect after profile is resolved
    useEffect(() => {
        if (loading) return;

        // ❌ No user → Landing
        if (!user) {
            navigate("/", { replace: true });
            return;
        }

        // 🔀 Role-based navigation
        if (user.role === "faculty") {
            navigate("/faculty-home", { replace: true });
        } else if (user.role === "student") {
            navigate("/student-home", { replace: true });
        } else if (user.role === "admin") {
            navigate("/admin-home", { replace: true });
        } else {
            navigate("/", { replace: true });
        }
    }, [user, loading, navigate]);

    return null; // or loader
};

export default RootPage;
