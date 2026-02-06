import { useEffect, useState } from "react";
import axios from "axios";
import {
    Typography,
    Card,
    CardContent,
    Grid,
    Button,
    Chip,
    Stack,
    Box,
} from "@mui/material";

const FacultyMyEvents = () => {
    const [events, setEvents] = useState([]);
    const token = localStorage.getItem("token");

    const fetchMyEvents = async () => {
        const res = await axios.get(
            "http://localhost:5000/api/events/faculty/my-events",
            { headers: { Authorization: `Bearer ${token}` } }
        );
        setEvents(res.data);
    };

    const closeEvent = async (id) => {
        await axios.put(
            `http://localhost:5000/api/events/close/${id}`,
            {},
            { headers: { Authorization: `Bearer ${token}` } }
        );
        fetchMyEvents();
    };

    useEffect(() => {
        fetchMyEvents();
    }, []);

    return (
        <Box px={{ xs: 2, md: 4 }} py={4}>
            <Typography variant="h4" fontWeight={700} gutterBottom>
                My Events
            </Typography>

            <Grid container spacing={3}>
                {events.length === 0 ? (
                    <Typography variant="subtitle1">
                        You haven't created any events yet.
                    </Typography>
                ) : (
                    events.map((event) => (
                        <Grid item xs={12} md={6} lg={4} key={event._id}>
                            <Card
                                elevation={4}
                                sx={{
                                    height: 240,
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                    padding: 2,
                                    transition: "transform 0.2s, box-shadow 0.2s",
                                    cursor: "pointer",
                                    "&:hover": {
                                        transform: "translateY(-5px)",
                                        boxShadow: 6,
                                    },
                                }}
                            >
                                <CardContent sx={{ flexGrow: 1 }}>
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

                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{
                                            mt: 1,
                                            display: "-webkit-box",
                                            WebkitLineClamp: 4,
                                            WebkitBoxOrient: "vertical",
                                            overflow: "hidden",
                                        }}
                                        title={event.description}
                                    >
                                        {event.description}
                                    </Typography>
                                </CardContent>

                                <Stack spacing={1} sx={{ mt: 1 }}>
                                    <Chip
                                        label={event.status.toUpperCase()}
                                        color={
                                            event.status === "open"
                                                ? "success"
                                                : "error"
                                        }
                                        size="small"
                                    />

                                    {event.status === "open" && (
                                        <Button
                                            variant="outlined"
                                            color="error"
                                            sx={{
                                                borderRadius: 2,
                                                textTransform: "none",
                                            }}
                                            onClick={() => closeEvent(event._id)}
                                        >
                                            Close Event
                                        </Button>
                                    )}
                                </Stack>
                            </Card>
                        </Grid>
                    ))
                )}
            </Grid>
        </Box>
    );
};

export default FacultyMyEvents;
