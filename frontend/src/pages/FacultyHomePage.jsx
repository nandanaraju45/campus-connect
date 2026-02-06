import { useState } from "react";
import ResponsiveLayout from "../components/ResponsiveLayout";

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
    DialogContentText,
    DialogActions,
    Button,
} from "@mui/material";

import {
    AddCircle,
    Event,
    ListAlt,
    Logout,
} from "@mui/icons-material";

import FacultyCreateEvent from "../components/faculty/FacultyCreateEvent";
import FacultyAllEvents from "../components/faculty/FacultyAllEvents";
import FacultyMyEvents from "../components/faculty/FacultyMyEvents";

import { useAuth } from "../context/AuthContext";

const FacultyHomePage = () => {
    const [activePage, setActivePage] = useState("create");
    const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

    const { logout } = useAuth();

    const handleLogout = () => {
        logout(); // Call your useAuth logout function
    };

    const drawerContent = (
        <Box>
            <Typography variant="h6" sx={{ p: 2, fontWeight: 700 }}>
                Faculty Panel
            </Typography>
            <Divider />

            <List>
                <ListItemButton
                    selected={activePage === "create"}
                    onClick={() => setActivePage("create")}
                >
                    <ListItemIcon>
                        <AddCircle />
                    </ListItemIcon>
                    <ListItemText primary="Create Event" />
                </ListItemButton>

                <ListItemButton
                    selected={activePage === "all"}
                    onClick={() => setActivePage("all")}
                >
                    <ListItemIcon>
                        <Event />
                    </ListItemIcon>
                    <ListItemText primary="View All Events" />
                </ListItemButton>

                <ListItemButton
                    selected={activePage === "my"}
                    onClick={() => setActivePage("my")}
                >
                    <ListItemIcon>
                        <ListAlt />
                    </ListItemIcon>
                    <ListItemText primary="My Events" />
                </ListItemButton>

                <Divider sx={{ my: 1 }} />

                {/* Logout Button */}
                <ListItemButton onClick={() => setLogoutDialogOpen(true)}>
                    <ListItemIcon>
                        <Logout />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                </ListItemButton>
            </List>

            {/* Logout Confirmation Dialog */}
            <Dialog
                open={logoutDialogOpen}
                onClose={() => setLogoutDialogOpen(false)}
            >
                <DialogTitle>Confirm Logout</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to logout?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setLogoutDialogOpen(false)} color="primary">
                        Cancel
                    </Button>
                    <Button
                        onClick={() => {
                            handleLogout();
                            setLogoutDialogOpen(false);
                        }}
                        color="error"
                    >
                        Logout
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );

    return (
        <ResponsiveLayout drawerContent={drawerContent}>
            {activePage === "create" && <FacultyCreateEvent />}
            {activePage === "all" && <FacultyAllEvents />}
            {activePage === "my" && <FacultyMyEvents />}
        </ResponsiveLayout>
    );
};

export default FacultyHomePage;
