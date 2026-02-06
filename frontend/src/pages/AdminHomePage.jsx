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

import { Dashboard, Event, Logout } from "@mui/icons-material";

import AdminDashboard from "../components/admin/AdminDashboard";
import AdminEvents from "../components/admin/AdminEvents";

const AdminHomePage = () => {
    const [activePage, setActivePage] = useState("dashboard");
    const [openLogoutDialog, setOpenLogoutDialog] = useState(false); // state for dialog
    const { logout } = useAuth();

    const drawerContent = (
        <Box>
            <Typography variant="h6" sx={{ p: 2, fontWeight: 700 }}>
                Admin Panel
            </Typography>
            <Divider />

            <List>
                <ListItemButton
                    selected={activePage === "dashboard"}
                    onClick={() => setActivePage("dashboard")}
                >
                    <ListItemIcon>
                        <Dashboard />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" />
                </ListItemButton>

                <ListItemButton
                    selected={activePage === "events"}
                    onClick={() => setActivePage("events")}
                >
                    <ListItemIcon>
                        <Event />
                    </ListItemIcon>
                    <ListItemText primary="Events" />
                </ListItemButton>

                <Divider sx={{ my: 1 }} />

                {/* Logout Button */}
                <ListItemButton onClick={() => setOpenLogoutDialog(true)}>
                    <ListItemIcon>
                        <Logout />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                </ListItemButton>
            </List>

            {/* Logout Confirmation Dialog */}
            <Dialog
                open={openLogoutDialog}
                onClose={() => setOpenLogoutDialog(false)}
            >
                <DialogTitle>Confirm Logout</DialogTitle>
                <DialogContent>
                    Are you sure you want to logout?
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenLogoutDialog(false)}>Cancel</Button>
                    <Button
                        color="error"
                        variant="contained"
                        onClick={() => {
                            logout();
                            setOpenLogoutDialog(false);
                        }}
                    >
                        Logout
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );

    return (
        <ResponsiveLayout drawerContent={drawerContent}>
            {activePage === "dashboard" && <AdminDashboard />}
            {activePage === "events" && <AdminEvents />}
        </ResponsiveLayout>
    );
};

export default AdminHomePage;
