import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
    Grid,
    Card,
    CardContent,
    Typography,
    Chip,
    Stack,
    CircularProgress,
    Box,
} from "@mui/material";

import { Event } from "@mui/icons-material";

const StudentAllEvents = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/events");
                setEvents(res.data.filter((e) => e.status === "open"));
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);

    if (loading)
        return (
            <Box display="flex" justifyContent="center" mt={5}>
                <CircularProgress />
            </Box>
        );

    return (
        <Box px={{ xs: 2, md: 4 }} py={4}>
            <Typography variant="h4" fontWeight={700} gutterBottom>
                Available Events
            </Typography>

            <Grid container spacing={3}>
                {events.length === 0 ? (
                    <Typography variant="subtitle1">
                        No events available at the moment.
                    </Typography>
                ) : (
                    events.map((event) => (
                        <Grid item xs={12} md={6} lg={4} key={event._id}>
                            <Card
                                elevation={4}
                                sx={{
                                    height: 240,
                                    borderRadius: 3,
                                    cursor: "pointer",
                                    transition: "transform 0.2s, box-shadow 0.2s",
                                    display: "flex",
                                    flexDirection: "column",
                                    "&:hover": {
                                        transform: "translateY(-5px)",
                                        boxShadow: 6,
                                    },
                                }}
                                onClick={() => navigate(`/events/${event._id}`)}
                            >
                                {/* CardContent handles title, description, and chips */}
                                <CardContent
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "space-between",
                                        flexGrow: 1,
                                        pb: 2, // padding bottom for chips
                                    }}
                                >
                                    {/* Title & Description */}
                                    <Box>
                                        <Stack
                                            direction="row"
                                            spacing={1}
                                            mb={1}
                                            alignItems="center"
                                        >
                                            <Event color="primary" />
                                            <Typography
                                                fontWeight={600}
                                                variant="h6"
                                                sx={{
                                                    whiteSpace: "nowrap",
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                }}
                                                title={event.title}
                                            >
                                                {event.title}
                                            </Typography>
                                        </Stack>

                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{
                                                display: "-webkit-box",
                                                WebkitLineClamp: 4,
                                                WebkitBoxOrient: "vertical",
                                                overflow: "hidden",
                                            }}
                                            title={event.description}
                                        >
                                            {event.description}
                                        </Typography>
                                    </Box>

                                    {/* Date & Venue Chips */}
                                    <Stack direction="row" spacing={1} mt={2}>
                                        <Chip
                                            label={new Date(
                                                event.date
                                            ).toLocaleDateString()}
                                            size="small"
                                            color="primary"
                                        />
                                        <Chip label={event.venue} size="small" />
                                    </Stack>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))
                )}
            </Grid>
        </Box>
    );
};

export default StudentAllEvents;
