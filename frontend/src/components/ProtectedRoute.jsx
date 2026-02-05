import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ allowedRoles }) => {
    const { user, loading } = useAuth();

    if (loading) return null; // or loader

    // ❌ Not logged in
    if (!user) {
        return <Navigate to="/landing" replace />;
    }

    // ⏳ Not approved
    if (user.approved === false) {
        return <PendingApproval />;
    }

    // ❌ Role not allowed
    if (!allowedRoles.includes(user.role)) {
        console.log("Access denied for role:", user);
        return <Navigate to="/unauthorized" replace />;
    }

    // ✅ Allowed
    return <Outlet />;
};

export default ProtectedRoute;
