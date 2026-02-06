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

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" mt={5}>
                <CircularProgress />
            </Box>
        );
    }

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
                        <Grid
                            item
                            xs={12}
                            sm={6}
                            md={4}
                            lg={3}
                            key={event._id}
                            display="flex"
                            justifyContent="center"
                        >
                            <Card
                                elevation={4}
                                sx={{
                                    width: 320, // ✅ fixed width
                                    height: 160,
                                    borderRadius: 3,
                                    cursor: "pointer",
                                    display: "flex",
                                    flexDirection: "column",
                                    overflow: "hidden", // ✅ prevent width expansion
                                    transition:
                                        "transform 0.2s ease, box-shadow 0.2s ease",
                                    "&:hover": {
                                        transform: "translateY(-5px)",
                                        boxShadow: 6,
                                    },
                                }}
                                onClick={() =>
                                    navigate(`/events/${event._id}`)
                                }
                            >
                                <CardContent
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "space-between",
                                        flexGrow: 1,
                                        pb: 2,
                                    }}
                                >
                                    {/* Title & Description */}
                                    <Box>
                                        <Stack
                                            direction="row"
                                            spacing={1}
                                            alignItems="center"
                                            mb={1}
                                        >
                                            <Event
                                                color="primary"
                                                fontSize="small"
                                            />
                                            <Typography
                                                variant="h6"
                                                fontWeight={600}
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

                                    {/* Date & Venue */}
                                    <Stack direction="row" spacing={1} mt={2}>
                                        <Chip
                                            label={new Date(
                                                event.date
                                            ).toLocaleDateString()}
                                            size="small"
                                            color="primary"
                                        />

                                        <Chip
                                            label={event.venue}
                                            size="small"
                                            sx={{
                                                maxWidth: 140,
                                                "& .MuiChip-label": {
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                    whiteSpace: "nowrap",
                                                },
                                            }}
                                            title={event.venue}
                                        />
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
