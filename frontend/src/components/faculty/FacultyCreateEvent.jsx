import { useState, useEffect } from "react";
import axios from "axios";
import {
    Typography,
    TextField,
    Button,
    Card,
    CardContent,
    Stack,
    Divider,
    Box,
    Snackbar,
    Alert,
    Chip,
    Grid,
} from "@mui/material";

import { Event, AddCircle, ListAlt } from "@mui/icons-material";

const FacultyCreateEvent = () => {
    const token = localStorage.getItem("token");

    const [eventForm, setEventForm] = useState({
        title: "",
        description: "",
        date: "",
        venue: "",
    });

    const [itemForm, setItemForm] = useState({
        name: "",
        fee: "",
        maxParticipants: "",
    });

    const [eventId, setEventId] = useState(null);
    const [items, setItems] = useState([]);
    const [snack, setSnack] = useState({
        open: false,
        message: "",
        severity: "success",
    });

    const showSnack = (message, severity = "success") =>
        setSnack({ open: true, message, severity });

    const fetchItems = async (id = eventId) => {
        if (!id) return;
        try {
            const res = await axios.get(`http://localhost:5000/api/items/event/${id}`);
            setItems(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const createEvent = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/api/events", eventForm, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setEventId(res.data._id);
            setItems([]);
            showSnack("Event created successfully 🎉");
        } catch (err) {
            console.error(err);
            showSnack("Failed to create event", "error");
        }
    };

    const addItem = async () => {
        try {
            await axios.post(`http://localhost:5000/api/items/${eventId}`, itemForm, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setItemForm({ name: "", fee: "", maxParticipants: "" });
            fetchItems();
            showSnack("Item added to event");
        } catch (err) {
            console.error(err);
            showSnack("Failed to add item", "error");
        }
    };

    return (
        <Box px={{ xs: 2, md: 4 }} py={4} display="flex" justifyContent="center">
            <Card
                elevation={6}
                sx={{
                    maxWidth: 950,
                    width: "100%",
                    borderRadius: 4,
                    p: { xs: 2, md: 4 },
                    background: "linear-gradient(145deg, #f0f3ff, #e5eaff)",
                }}
            >
                <CardContent>
                    {/* ---------- Header ---------- */}
                    <Stack direction="row" spacing={2} alignItems="center" mb={3}>
                        <Event sx={{ color: "#1976d2", fontSize: 36 }} />
                        <Typography variant="h4" fontWeight={700}>
                            Create New Event
                        </Typography>
                    </Stack>

                    {/* ---------- Event Form ---------- */}
                    <Stack spacing={3} component="form" onSubmit={createEvent}>
                        <TextField
                            label="Event Title"
                            name="title"
                            value={eventForm.title}
                            onChange={(e) =>
                                setEventForm({ ...eventForm, title: e.target.value })
                            }
                            required
                            fullWidth
                        />

                        <TextField
                            label="Description"
                            name="description"
                            multiline
                            rows={4}
                            value={eventForm.description}
                            onChange={(e) =>
                                setEventForm({ ...eventForm, description: e.target.value })
                            }
                            required
                            fullWidth
                        />

                        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                            <TextField
                                type="date"
                                name="date"
                                label="Event Date"
                                value={eventForm.date}
                                onChange={(e) =>
                                    setEventForm({ ...eventForm, date: e.target.value })
                                }
                                InputLabelProps={{ shrink: true }}
                                fullWidth
                                required
                            />
                            <TextField
                                label="Venue"
                                name="venue"
                                value={eventForm.venue}
                                onChange={(e) =>
                                    setEventForm({ ...eventForm, venue: e.target.value })
                                }
                                fullWidth
                                required
                            />
                        </Stack>

                        <Button
                            type="submit"
                            variant="contained"
                            size="large"
                            sx={{
                                borderRadius: 3,
                                backgroundColor: "#1976d2",
                                "&:hover": { backgroundColor: "#145ea8" },
                            }}
                        >
                            Create Event
                        </Button>
                    </Stack>

                    {/* ---------- Items Section ---------- */}
                    {eventId && (
                        <>
                            <Divider sx={{ my: 4 }} />
                            <Stack direction="row" spacing={2} alignItems="center" mb={2}>
                                <AddCircle sx={{ color: "#9c27b0", fontSize: 28 }} />
                                <Typography variant="h5" fontWeight={600}>
                                    Add Event Items
                                </Typography>
                                <Chip label="Event Created" color="success" size="small" />
                            </Stack>

                            <Stack spacing={2.5}>
                                <TextField
                                    label="Item Name"
                                    value={itemForm.name}
                                    onChange={(e) =>
                                        setItemForm({ ...itemForm, name: e.target.value })
                                    }
                                    fullWidth
                                />
                                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                                    <TextField
                                        label="Fee"
                                        type="number"
                                        value={itemForm.fee}
                                        onChange={(e) =>
                                            setItemForm({ ...itemForm, fee: e.target.value })
                                        }
                                        fullWidth
                                    />
                                    <TextField
                                        label="Max Participants"
                                        type="number"
                                        value={itemForm.maxParticipants}
                                        onChange={(e) =>
                                            setItemForm({
                                                ...itemForm,
                                                maxParticipants: e.target.value,
                                            })
                                        }
                                        fullWidth
                                    />
                                </Stack>
                                <Button
                                    variant="outlined"
                                    sx={{
                                        borderRadius: 3,
                                        borderColor: "#9c27b0",
                                        color: "#9c27b0",
                                        "&:hover": { backgroundColor: "#f3e5f5" },
                                    }}
                                    onClick={addItem}
                                >
                                    Add Item
                                </Button>
                            </Stack>

                            {/* ---------- Added Items Preview ---------- */}
                            {items.length > 0 && (
                                <>
                                    <Divider sx={{ my: 4 }} />
                                    <Stack direction="row" spacing={1} alignItems="center" mb={2}>
                                        <ListAlt sx={{ color: "#1976d2", fontSize: 26 }} />
                                        <Typography variant="h6" fontWeight={600}>
                                            Added Items
                                        </Typography>
                                    </Stack>

                                    <Grid container spacing={2}>
                                        {items.map((item) => (
                                            <Grid item xs={12} md={6} key={item._id}>
                                                <Card
                                                    elevation={3}
                                                    sx={{
                                                        borderRadius: 3,
                                                        height: 130,
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        justifyContent: "center",
                                                        padding: 2,
                                                        "&:hover": {
                                                            transform: "translateY(-4px)",
                                                            boxShadow: 6,
                                                            transition: "all 0.2s ease-in-out",
                                                        },
                                                    }}
                                                >
                                                    <Typography
                                                        fontWeight={600}
                                                        sx={{
                                                            whiteSpace: "nowrap",
                                                            overflow: "hidden",
                                                            textOverflow: "ellipsis",
                                                        }}
                                                        title={item.name}
                                                    >
                                                        {item.name}
                                                    </Typography>
                                                    <Typography variant="body2">
                                                        Fee: ₹{item.fee || 0}
                                                    </Typography>
                                                    <Typography variant="body2">
                                                        Max Participants: {item.maxParticipants}
                                                    </Typography>
                                                </Card>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </>
                            )}
                        </>
                    )}
                </CardContent>

                {/* ---------- Snackbar ---------- */}
                <Snackbar
                    open={snack.open}
                    autoHideDuration={3000}
                    onClose={() => setSnack({ ...snack, open: false })}
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                >
                    <Alert
                        severity={snack.severity}
                        variant="filled"
                        onClose={() => setSnack({ ...snack, open: false })}
                    >
                        {snack.message}
                    </Alert>
                </Snackbar>
            </Card>
        </Box>
    );
};

export default FacultyCreateEvent;
