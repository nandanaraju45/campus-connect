import { useEffect, useState } from "react";
import axios from "axios";
import {
    Typography,
    Card,
    CardContent,
    Grid,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Snackbar,
    Alert,
    Box,
    CircularProgress,
} from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import DeleteIcon from "@mui/icons-material/Delete";

const AdminEvents = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

    const fetchEvents = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem("token");
            const { data } = await axios.get("http://localhost:5000/api/admin/events", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setEvents(data);
        } catch (error) {
            console.error(error);
            setSnackbar({ open: true, message: "Failed to fetch events", severity: "error" });
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
            await axios.delete(`http://localhost:5000/api/admin/events/${selectedEvent._id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setEvents(events.filter((e) => e._id !== selectedEvent._id));
            setSnackbar({ open: true, message: "Event deleted successfully", severity: "success" });
        } catch (error) {
            console.error(error);
            setSnackbar({ open: true, message: "Failed to delete event", severity: "error" });
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
            <Box display="flex" justifyContent="center" mt={5}>
                <CircularProgress />
            </Box>
        );

    return (
        <Box p={3}>
            <Typography variant="h4" fontWeight={700} gutterBottom>
                Events Management
            </Typography>
            <Typography color="text.secondary" gutterBottom>
                View, manage, and delete campus events here.
            </Typography>
            <EventIcon sx={{ fontSize: 80, mt: 3, opacity: 0.2 }} />

            <Grid container spacing={3} mt={2}>
                {events.length === 0 ? (
                    <Typography variant="subtitle1" mt={2}>
                        No events found.
                    </Typography>
                ) : (
                    events.map((event) => (
                        <Grid item xs={12} sm={6} md={4} key={event._id}>
                            <Card
                                variant="outlined"
                                sx={{
                                    height: 250,
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                    position: "relative",
                                    transition: "transform 0.2s, box-shadow 0.2s",
                                    "&:hover": {
                                        transform: "translateY(-5px)",
                                        boxShadow: 4,
                                    },
                                }}
                            >
                                <CardContent sx={{ pb: 1 }}>
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
                                        color="text.secondary"
                                        fontSize={14}
                                        sx={{ mb: 1 }}
                                    >
                                        {new Date(event.date).toLocaleDateString()}
                                    </Typography>
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
                                </CardContent>
                                <IconButton
                                    color="error"
                                    sx={{ position: "absolute", top: 8, right: 8 }}
                                    onClick={() => handleDeleteClick(event)}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </Card>
                        </Grid>
                    ))
                )}
            </Grid>

            {/* Delete Confirmation Dialog */}
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>Delete Event</DialogTitle>
                <DialogContent>
                    Are you sure you want to delete <b>{selectedEvent?.title}</b>?
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
                    <Button color="error" variant="contained" onClick={handleDeleteConfirm}>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Snackbar */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={4000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert severity={snackbar.severity} sx={{ width: "100%" }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default AdminEvents;
