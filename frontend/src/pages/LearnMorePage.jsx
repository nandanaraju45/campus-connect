import React from "react";
import {
    Box,
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    CardMedia,
    Button
} from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const MotionBox = motion(Box);
const MotionCard = motion(Card);

const LearnMorePage = () => {
    const navigate = useNavigate();
    return (
        <>
            {/* Hero Section */}
            <MotionBox
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                sx={{
                    minHeight: "60vh",
                    display: "flex",
                    alignItems: "center",
                    background: "linear-gradient(135deg, #1976d2, #42a5f5)",
                    color: "white",
                    textAlign: "center"
                }}
            >
                <Container>
                    <Typography variant="h3" fontWeight="bold" gutterBottom>
                        Learn More About CampusConnect
                    </Typography>
                    <Typography variant="h6">
                        A smarter way to manage campus communication and collaboration
                    </Typography>
                </Container>
            </MotionBox>

            {/* About Section */}
            <Container sx={{ py: 8 }}>
                <Typography variant="h4" fontWeight="bold" align="center" gutterBottom>
                    What is CampusConnect?
                </Typography>
                <Typography align="center" color="text.secondary" maxWidth="md" mx="auto">
                    CampusConnect is a centralized platform designed to connect students,
                    faculty, and campus administration. It simplifies communication,
                    academic sharing, and event updates in one secure system.
                </Typography>
            </Container>

            {/* Features Section */}
            <Container sx={{ pb: 8 }}>
                <Grid container spacing={4}>
                    {[
                        {
                            title: "Unified Communication",
                            img: "https://cdn-icons-png.flaticon.com/512/2463/2463510.png",
                            desc: "Chat, announcements, and discussions in one platform."
                        },
                        {
                            title: "Event Management",
                            img: "https://cdn-icons-png.flaticon.com/512/747/747310.png",
                            desc: "View and register for campus events easily."
                        },
                        {
                            title: "Event Participation",
                            img: "https://cdn-icons-png.flaticon.com/512/3135/3135755.png",
                            desc: "Join events that match your interests and passions."
                        }
                    ].map((item, index) => (
                        <Grid item xs={12} md={4} key={index}>
                            <MotionCard
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 200 }}
                                sx={{
                                    height: "100%",
                                    borderRadius: 3,
                                    boxShadow: 4,
                                    width: 360
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
                                    <Typography variant="h5" fontWeight="bold" gutterBottom>
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

            {/* CTA Section */}
            <MotionBox
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                sx={{
                    backgroundColor: "#f5f5f5",
                    py: 6,
                    textAlign: "center"
                }}
            >
                <Container>
                    <Typography variant="h4" fontWeight="bold" gutterBottom>
                        Ready to Experience CampusConnect?
                    </Typography>
                    <Typography color="text.secondary" paragraph>
                        Join today and make your campus life more connected and efficient.
                    </Typography>
                    <Button variant="contained" size="large" onClick={() => navigate("/register")}>
                        Get Started
                    </Button>
                </Container>
            </MotionBox>

            {/* Footer */}
            <Box sx={{ py: 3, textAlign: "center", backgroundColor: "#1976d2" }}>
                <Typography variant="body2" color="white">
                    © 2026 CampusConnect | Learn More
                </Typography>
            </Box>
        </>
    );
};

export default LearnMorePage;
