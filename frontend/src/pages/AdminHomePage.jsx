import * as React from "react";
import ResponsiveLayout from "../components/ResponsiveLayout";

import {
    Box,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    Paper,
    Grid
} from "@mui/material";

import {
    School,
    ReportProblem,
    Settings,
    AccountBalance,
    HowToReg
} from "@mui/icons-material";

function AdminHomePage() {
    /* Drawer Content */
    const drawerContent = (
    <Box>
        <Typography
            variant="h6"
            sx={{ p: 2, fontWeight: "bold", textAlign: "center" }}
        >
            Admin Panel
        </Typography>

        <List>
            {/* Add College */}
            <ListItem disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <School />
                    </ListItemIcon>
                    <ListItemText primary="Add College" />
                </ListItemButton>
            </ListItem>

            {/* View Colleges */}
            <ListItem disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <AccountBalance />
                    </ListItemIcon>
                    <ListItemText primary="View Colleges" />
                </ListItemButton>
            </ListItem>

            {/* College Registration Requests */}
            <ListItem disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <HowToReg />
                    </ListItemIcon>
                    <ListItemText primary="College Registration Requests" />
                </ListItemButton>
            </ListItem>

            {/* View Complaints */}
            <ListItem disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <ReportProblem />
                    </ListItemIcon>
                    <ListItemText primary="View Complaints" />
                </ListItemButton>
            </ListItem>

            {/* Settings */}
            <ListItem disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <Settings />
                    </ListItemIcon>
                    <ListItemText primary="Settings" />
                </ListItemButton>
            </ListItem>
        </List>
    </Box>
);

    return (
        <ResponsiveLayout drawerContent={drawerContent}>
            {/* Welcome Section */}
            <Paper
                sx={{
                    p: 4,
                    mb: 4,
                    borderRadius: 3,
                    background: "linear-gradient(135deg, #1976d2, #42a5f5)",
                    color: "white"
                }}
            >
                <Typography variant="h4" fontWeight="bold">
                    Welcome, Admin 👋
                </Typography>
                <Typography sx={{ mt: 1 }}>
                    Manage colleges, monitor complaints, and control system settings
                    from one place.
                </Typography>
            </Paper>

            {/* Stats Cards */}
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Paper
                        sx={{
                            p: 3,
                            borderRadius: 3,
                            boxShadow: 4
                        }}
                    >
                        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                            <School color="primary" sx={{ mr: 1 }} />
                            <Typography variant="h6">Registered Colleges</Typography>
                        </Box>

                        <Typography variant="h3" fontWeight="bold">
                            12
                        </Typography>

                        <Typography color="text.secondary">
                            Colleges added to CampusConnect
                        </Typography>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Paper
                        sx={{
                            p: 3,
                            borderRadius: 3,
                            boxShadow: 4
                        }}
                    >
                        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                            <HowToReg color="primary" sx={{ mr: 1 }} />
                            <Typography variant="h6">Registration Requests</Typography>
                        </Box>

                        <Typography variant="h3" fontWeight="bold">
                            12
                        </Typography>

                        <Typography color="text.secondary">
                            Pending college registration requests
                        </Typography>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Paper
                        sx={{
                            p: 3,
                            borderRadius: 3,
                            boxShadow: 4
                        }}
                    >
                        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                            <ReportProblem color="error" sx={{ mr: 1 }} />
                            <Typography variant="h6">Pending Complaints</Typography>
                        </Box>

                        <Typography variant="h3" fontWeight="bold">
                            5
                        </Typography>

                        <Typography color="text.secondary">
                            Complaints waiting for review
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>

            {/* Info Section */}
            <Paper
                sx={{
                    p: 3,
                    mt: 4,
                    borderRadius: 3
                }}
            >
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Admin Responsibilities
                </Typography>

                <Typography color="text.secondary">
                    As an administrator, you can add and manage colleges, review user
                    complaints, and configure application settings to ensure smooth
                    operation of CampusConnect across all institutions.
                </Typography>
            </Paper>
        </ResponsiveLayout>
    );
}

export default AdminHomePage;
