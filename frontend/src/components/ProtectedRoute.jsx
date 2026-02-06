import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import PendingApprovalPage from "../pages/PendingApprovalPage";

const ProtectedRoute = ({ allowedRoles }) => {
    const { user, loading } = useAuth();

    if (loading) return null; // or loader

    // ❌ Not logged in
    if (!user) {
        return <Navigate to="/" replace />;
    }

    console.log("ProtectedRoute user:", user);

    // ⏳ Not approved
    if (user.approved === false) {
        return <PendingApprovalPage />;
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
