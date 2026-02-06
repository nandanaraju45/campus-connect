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
                                onClick={() =>
                                    navigate(`/events/${event._id}`)
                                }
                                sx={{
                                    width: 320, // ✅ fixed width
                                    height: 160,
                                    cursor: "pointer",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                    padding: 2,
                                    overflow: "hidden", // ✅ prevent stretch
                                    transition:
                                        "transform 0.2s ease, box-shadow 0.2s ease",
                                    "&:hover": {
                                        transform: "translateY(-5px)",
                                        boxShadow: 6,
                                    },
                                }}
                            >
                                <CardContent sx={{ flexGrow: 1, p: 0 }}>
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
                                        size="small"
                                        color={
                                            event.status === "open"
                                                ? "success"
                                                : "error"
                                        }
                                        sx={{
                                            maxWidth: 120,
                                            "& .MuiChip-label": {
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                whiteSpace: "nowrap",
                                            },
                                        }}
                                        title={event.status}
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
