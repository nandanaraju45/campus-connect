import { useEffect, useState } from "react";
import axios from "axios";
import {
    Typography,
    Card,
    CardContent,
    Grid,
    Chip,
    Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const FacultyAllEvents = () => {
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/events")
            .then((res) => setEvents(res.data))
            .catch(console.error);
    }, []);

    return (
        <Box px={{ xs: 2, md: 4 }} py={4}>
            <Typography variant="h4" fontWeight={700} gutterBottom>
                All Events
            </Typography>

            <Grid container spacing={3}>
                {events.length === 0 ? (
                    <Typography variant="subtitle1">
                        No events available.
                    </Typography>
                ) : (
                    events.map((event) => (
                        <Grid item xs={12} md={6} lg={4} key={event._id}>
                            <Card
                                elevation={4}
                                onClick={() => navigate(`/events/${event._id}`)}
                                sx={{
                                    cursor: "pointer",
                                    height: 220,
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                    padding: 2,
                                    transition: "transform 0.2s, box-shadow 0.2s",
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

                                <Box mt={1}>
                                    <Chip
                                        label={event.status}
                                        color={
                                            event.status === "open"
                                                ? "success"
                                                : "error"
                                        }
                                        size="small"
                                    />
                                </Box>
                            </Card>
                        </Grid>
                    ))
                )}
            </Grid>
        </Box>
    );
};

export default FacultyAllEvents;
