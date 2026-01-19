import React from "react";
import { useNavigate } from "react-router-dom";
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Container,
    Box,
    Grid,
    Card,
    CardContent,
    CardMedia
} from "@mui/material";
import { motion } from "framer-motion";

const MotionBox = motion(Box);
const MotionCard = motion(Card);

const LandingPage = () => {
    const navigate = useNavigate();
    return (
        <>
            {/* Navbar */}
            <AppBar position="sticky" elevation={0}>
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold" }}>
                        CampusConnect
                    </Typography>
                    <Button color="inherit" onClick={() => { navigate('/login') }}>Login</Button>
                    <Button variant="outlined" color="inherit">
                        Register
                    </Button>
                </Toolbar>
            </AppBar>

            {/* Hero Section */}
            <MotionBox
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                sx={{
                    minHeight: "90vh",
                    display: "flex",
                    alignItems: "center",
                    background:
                        "linear-gradient(135deg, #1976d2, #42a5f5)",
                    color: "white"
                }}
            >
                <Container>
                    <Grid container spacing={4} alignItems="center">
                        <Grid item xs={12} md={6}>
                            <Typography variant="h3" fontWeight="bold" gutterBottom>
                                Connect Your Campus Life
                            </Typography>
                            <Typography variant="h6" paragraph>
                                CampusConnect helps students and faculty stay connected,
                                informed, and engaged — all in one platform.
                            </Typography>
                            <Button
                                variant="contained"
                                size="large"
                                sx={{ mr: 2, backgroundColor: "#fff", color: "#1976d2" }}
                            >
                                Get Started
                            </Button>
                            <Button variant="outlined" size="large" color="inherit" onClick={() => { navigate('/learn-more') }}>
                                Learn More
                            </Button>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <motion.img
                                src="https://cdn-icons-png.flaticon.com/512/3135/3135755.png"
                                alt="Students"
                                style={{ width: "100%" }}
                                initial={{ scale: 0.8 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 1 }}
                            />
                        </Grid>
                    </Grid>
                </Container>
            </MotionBox>

            {/* Features */}
            <Container sx={{ py: 8 }}>
                <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
                    Why CampusConnect?
                </Typography>

                <Grid container spacing={4} sx={{ mt: 3 }}>
                    {[
                        {
                            title: "Student Networking",
                            img: "https://cdn-icons-png.flaticon.com/512/1256/1256650.png",
                            desc: "Build meaningful connections across your campus."
                        },
                        {
                            title: "Event Notifications",
                            img: "https://cdn-icons-png.flaticon.com/512/747/747310.png",
                            desc: "Never miss workshops, fests, or important events."
                        },

                    ].map((item, index) => (
                        <Grid item xs={12} md={4} key={index}>
                            <MotionCard
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 200 }}
                                sx={{
                                    height: "100%",
                                    boxShadow: 4,
                                    borderRadius: 3
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    height="160"
                                    image={item.img}
                                    alt={item.title}
                                    sx={{ objectFit: "contain", p: 2 }}
                                />
                                <CardContent>
                                    <Typography variant="h5" gutterBottom fontWeight="bold">
                                        {item.title}
                                    </Typography>
                                    <Typography color="text.secondary">
                                        {item.desc}
                                    </Typography>
                                </CardContent>
                            </MotionCard>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            {/* Call To Action */}
            <MotionBox
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1 }}
                sx={{
                    backgroundColor: "#f5f5f5",
                    py: 6,
                    textAlign: "center"
                }}
            >
                <Container>
                    <Typography variant="h4" fontWeight="bold" gutterBottom>
                        Ready to Join CampusConnect?
                    </Typography>
                    <Typography paragraph>
                        Make your campus experience smarter, simpler, and more connected.
                    </Typography>
                    <Button variant="contained" size="large">
                        Sign Up Now
                    </Button>
                </Container>
            </MotionBox>

            {/* Footer */}
            <Box sx={{ py: 3, textAlign: "center", backgroundColor: "#1976d2" }}>
                <Typography variant="body2" color="white">
                    © 2026 CampusConnect | Designed for College Project
                </Typography>
            </Box>
        </>
    );
};

export default LandingPage;

