import { useState } from "react";
import ResponsiveLayout from "../components/ResponsiveLayout";
import { useAuth } from "../context/AuthContext";

import {
    Box,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    Divider,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
} from "@mui/material";

import {
    EventAvailable,
    AssignmentTurnedIn,
    Logout,
    ReportProblem,
    Feedback,
} from "@mui/icons-material";

import StudentAllEvents from "../components/student/StudentAllEvents";
import StudentMyEvents from "../components/student/StudentMyEvents";
import ReportIssuePage from "../pages/ReportIssuePage";
import MyComplaintsPage from "../pages/MyComplaintsPage";

const StudentHomePage = () => {
    const [activeTab, setActiveTab] = useState("events");
    const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
    const { logout } = useAuth();

    const handleLogoutClick = () => {
        setLogoutDialogOpen(true);
    };

    const handleLogoutConfirm = () => {
        setLogoutDialogOpen(false);
        logout();
    };

    const handleLogoutCancel = () => {
        setLogoutDialogOpen(false);
    };

    const drawerContent = (
        <Box>
            <Typography variant="h6" sx={{ p: 2, fontWeight: 700 }}>
                Student Panel
            </Typography>
            <Divider />

            <List>
                <ListItemButton
                    selected={activeTab === "events"}
                    onClick={() => setActiveTab("events")}
                >
                    <ListItemIcon>
                        <EventAvailable />
                    </ListItemIcon>
                    <ListItemText primary="View Events" />
                </ListItemButton>

                <ListItemButton
                    selected={activeTab === "my-events"}
                    onClick={() => setActiveTab("my-events")}
                >
                    <ListItemIcon>
                        <AssignmentTurnedIn />
                    </ListItemIcon>
                    <ListItemText primary="My Events" />
                </ListItemButton>

                <Divider sx={{ my: 1 }} />

                {/* Complaints */}
                <ListItemButton
                    selected={activeTab === "report-issue"}
                    onClick={() => setActiveTab("report-issue")}
                >
                    <ListItemIcon>
                        <ReportProblem />
                    </ListItemIcon>
                    <ListItemText primary="Report Issue" />
                </ListItemButton>

                <ListItemButton
                    selected={activeTab === "my-complaints"}
                    onClick={() => setActiveTab("my-complaints")}
                >
                    <ListItemIcon>
                        <Feedback />
                    </ListItemIcon>
                    <ListItemText primary="My Complaints" />
                </ListItemButton>

                <Divider sx={{ my: 1 }} />

                {/* Logout */}
                <ListItemButton onClick={handleLogoutClick}>
                    <ListItemIcon>
                        <Logout />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                </ListItemButton>
            </List>
        </Box>
    );

    return (
        <ResponsiveLayout drawerContent={drawerContent}>
            {activeTab === "events" && <StudentAllEvents />}
            {activeTab === "my-events" && <StudentMyEvents />}
            {activeTab === "report-issue" && <ReportIssuePage />}
            {activeTab === "my-complaints" && <MyComplaintsPage />}

            {/* Logout Confirmation Dialog */}
            <Dialog open={logoutDialogOpen} onClose={handleLogoutCancel}>
                <DialogTitle>Confirm Logout</DialogTitle>
                <DialogContent>
                    Are you sure you want to logout?
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleLogoutCancel} color="inherit">
                        Cancel
                    </Button>
                    <Button
                        onClick={handleLogoutConfirm}
                        color="error"
                        variant="contained"
                    >
                        Logout
                    </Button>
                </DialogActions>
            </Dialog>
        </ResponsiveLayout>
    );
};

export default StudentHomePage;
