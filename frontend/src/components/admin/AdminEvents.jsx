import { useEffect, useState } from "react";
import axios from "axios";
import {
    Typography,
    Card,
    CardContent,
    Grid,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Snackbar,
    Alert,
    Box,
    CircularProgress,
    Stack,
    Divider,
} from "@mui/material";
import EventIcon from "@mui/icons-material/Event";

const AdminEvents = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success",
    });

    const fetchEvents = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem("token");
            const { data } = await axios.get(
                "http://localhost:5000/api/admin/events",
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            setEvents(data);
        } catch (error) {
            console.error(error);
            setSnackbar({
                open: true,
                message: "Failed to fetch events",
                severity: "error",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteClick = (event) => {
        setSelectedEvent(event);
        setOpenDialog(true);
    };

    const handleDeleteConfirm = async () => {
        try {
            const token = localStorage.getItem("token");
            await axios.delete(
                `http://localhost:5000/api/admin/events/${selectedEvent._id}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            setEvents(events.filter((e) => e._id !== selectedEvent._id));
            setSnackbar({
                open: true,
                message: "Event deleted successfully",
                severity: "success",
            });
        } catch (error) {
            console.error(error);
            setSnackbar({
                open: true,
                message: "Failed to delete event",
                severity: "error",
            });
        } finally {
            setOpenDialog(false);
            setSelectedEvent(null);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    if (loading)
        return (
            <Box display="flex" justifyContent="center" mt={6}>
                <CircularProgress />
            </Box>
        );

    return (
        <Box px={{ xs: 2, md: 4 }} py={4}>
            {/* ================= HEADER ================= */}
            <Stack direction="row" spacing={2} alignItems="center" mb={1}>
                <EventIcon color="primary" sx={{ fontSize: 36 }} />
                <Box>
                    <Typography variant="h4" fontWeight={700}>
                        Events Management
                    </Typography>
                    <Typography color="text.secondary">
                        View, manage, and delete campus events
                    </Typography>
                </Box>
            </Stack>

            <Divider sx={{ my: 3 }} />

            {/* ================= EVENTS GRID ================= */}
            <Grid container spacing={3}>
                {events.length === 0 ? (
                    <Typography variant="subtitle1">
                        No events found.
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
                                    height: 200,
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                    p: 2,
                                    borderRadius: 3,
                                    transition:
                                        "transform 0.2s ease, box-shadow 0.2s ease",
                                    "&:hover": {
                                        transform: "translateY(-6px)",
                                        boxShadow: 8,
                                    },
                                }}
                            >
                                <CardContent sx={{ p: 0 }}>
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

                                    <Typography
                                        variant="caption"
                                        color="text.secondary"
                                    >
                                        {new Date(
                                            event.date
                                        ).toLocaleDateString()}
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

                                <Button
                                    variant="outlined"
                                    color="error"
                                    size="small"
                                    sx={{
                                        mt: 2,
                                        borderRadius: 2,
                                        textTransform: "none",
                                    }}
                                    onClick={() => handleDeleteClick(event)}
                                >
                                    Delete Event
                                </Button>
                            </Card>
                        </Grid>
                    ))
                )}
            </Grid>

            {/* ================= DELETE CONFIRMATION ================= */}
            <Dialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
            >
                <DialogTitle>Delete Event</DialogTitle>
                <DialogContent>
                    Are you sure you want to delete{" "}
                    <b>{selectedEvent?.title}</b>? This action cannot be undone.
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>
                        Cancel
                    </Button>
                    <Button
                        color="error"
                        variant="contained"
                        onClick={handleDeleteConfirm}
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

            {/* ================= SNACKBAR ================= */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={4000}
                onClose={() =>
                    setSnackbar({ ...snackbar, open: false })
                }
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert severity={snackbar.severity} variant="filled">
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default AdminEvents;
