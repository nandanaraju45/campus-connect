import { useState } from "react";
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
    Fade,
} from "@mui/material";

import {
    Event,
    AddCircleOutline,
    ListAlt,
    CheckCircle,
} from "@mui/icons-material";

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
        const res = await axios.get(
            `http://localhost:5000/api/items/event/${id}`
        );
        setItems(res.data);
    };

    const createEvent = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                "http://localhost:5000/api/events",
                eventForm,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setEventId(res.data._id);
            setItems([]);
            showSnack("Event created successfully 🎉");
        } catch {
            showSnack("Failed to create event", "error");
        }
    };

    const addItem = async () => {
        try {
            await axios.post(
                `http://localhost:5000/api/items/${eventId}`,
                itemForm,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setItemForm({ name: "", fee: "", maxParticipants: "" });
            fetchItems();
            showSnack("Item added successfully");
        } catch {
            showSnack("Failed to add item", "error");
        }
    };

    return (
        <Box px={{ xs: 2, md: 4 }} py={5} display="flex" justifyContent="center">
            <Fade in timeout={500}>
                <Card
                    elevation={10}
                    sx={{
                        maxWidth: 1000,
                        width: "100%",
                        borderRadius: 4,
                        p: { xs: 2, md: 4 },
                        background:
                            "linear-gradient(180deg, #f9faff, #eef2ff)",
                    }}
                >
                    <CardContent>
                        {/* ================= HEADER ================= */}
                        <Stack
                            direction="row"
                            spacing={2}
                            alignItems="center"
                            mb={4}
                        >
                            <Event color="primary" sx={{ fontSize: 40 }} />
                            <Box>
                                <Typography variant="h4" fontWeight={700}>
                                    Create New Event
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    Fill event details and add participation
                                    items
                                </Typography>
                            </Box>
                        </Stack>

                        {/* ================= EVENT FORM ================= */}
                        <Stack
                            spacing={3}
                            component="form"
                            onSubmit={createEvent}
                        >
                            <TextField
                                label="Event Title"
                                value={eventForm.title}
                                onChange={(e) =>
                                    setEventForm({
                                        ...eventForm,
                                        title: e.target.value,
                                    })
                                }
                                fullWidth
                                required
                            />

                            <TextField
                                label="Description"
                                multiline
                                rows={4}
                                value={eventForm.description}
                                onChange={(e) =>
                                    setEventForm({
                                        ...eventForm,
                                        description: e.target.value,
                                    })
                                }
                                fullWidth
                                required
                            />

                            <Stack
                                direction={{ xs: "column", sm: "row" }}
                                spacing={2}
                            >
                                <TextField
                                    type="date"
                                    label="Event Date"
                                    value={eventForm.date}
                                    onChange={(e) =>
                                        setEventForm({
                                            ...eventForm,
                                            date: e.target.value,
                                        })
                                    }
                                    InputLabelProps={{ shrink: true }}
                                    fullWidth
                                    required
                                />
                                <TextField
                                    label="Venue"
                                    value={eventForm.venue}
                                    onChange={(e) =>
                                        setEventForm({
                                            ...eventForm,
                                            venue: e.target.value,
                                        })
                                    }
                                    fullWidth
                                    required
                                />
                            </Stack>

                            <Button
                                type="submit"
                                size="large"
                                variant="contained"
                                sx={{
                                    borderRadius: 3,
                                    py: 1.2,
                                }}
                            >
                                Create Event
                            </Button>
                        </Stack>

                        {/* ================= ADD ITEMS ================= */}
                        {eventId && (
                            <>
                                <Divider sx={{ my: 5 }} />

                                <Stack
                                    direction="row"
                                    spacing={2}
                                    alignItems="center"
                                    mb={2}
                                >
                                    <AddCircleOutline color="secondary" />
                                    <Typography
                                        variant="h5"
                                        fontWeight={600}
                                    >
                                        Add Event Items
                                    </Typography>
                                    <Chip
                                        icon={<CheckCircle />}
                                        label="Event Created"
                                        color="success"
                                        size="small"
                                    />
                                </Stack>

                                <Stack spacing={2.5}>
                                    <TextField
                                        label="Item Name"
                                        value={itemForm.name}
                                        onChange={(e) =>
                                            setItemForm({
                                                ...itemForm,
                                                name: e.target.value,
                                            })
                                        }
                                        fullWidth
                                    />

                                    <Stack
                                        direction={{
                                            xs: "column",
                                            sm: "row",
                                        }}
                                        spacing={2}
                                    >
                                        <TextField
                                            label="Fee (₹)"
                                            type="number"
                                            value={itemForm.fee}
                                            onChange={(e) =>
                                                setItemForm({
                                                    ...itemForm,
                                                    fee: e.target.value,
                                                })
                                            }
                                            fullWidth
                                        />
                                        <TextField
                                            label="Max Participants"
                                            type="number"
                                            value={
                                                itemForm.maxParticipants
                                            }
                                            onChange={(e) =>
                                                setItemForm({
                                                    ...itemForm,
                                                    maxParticipants:
                                                        e.target.value,
                                                })
                                            }
                                            fullWidth
                                        />
                                    </Stack>

                                    <Button
                                        variant="outlined"
                                        onClick={addItem}
                                        sx={{
                                            borderRadius: 3,
                                            alignSelf: "flex-start",
                                        }}
                                    >
                                        Add Item
                                    </Button>
                                </Stack>

                                {/* ================= ITEM PREVIEW ================= */}
                                {items.length > 0 && (
                                    <>
                                        <Divider sx={{ my: 4 }} />

                                        <Stack
                                            direction="row"
                                            spacing={1}
                                            alignItems="center"
                                            mb={2}
                                        >
                                            <ListAlt color="primary" />
                                            <Typography
                                                variant="h6"
                                                fontWeight={600}
                                            >
                                                Added Items
                                            </Typography>
                                        </Stack>

                                        <Grid container spacing={2}>
                                            {items.map((item) => (
                                                <Grid
                                                    item
                                                    xs={12}
                                                    sm={6}
                                                    md={4}
                                                    key={item._id}
                                                >
                                                    <Card
                                                        elevation={4}
                                                        sx={{
                                                            height: 150,
                                                            borderRadius: 3,
                                                            p: 2,
                                                            transition:
                                                                "all 0.2s",
                                                            "&:hover": {
                                                                transform:
                                                                    "translateY(-6px)",
                                                                boxShadow: 8,
                                                            },
                                                        }}
                                                    >
                                                        <Typography
                                                            fontWeight={600}
                                                            noWrap
                                                        >
                                                            {item.name}
                                                        </Typography>
                                                        <Typography
                                                            variant="body2"
                                                            color="text.secondary"
                                                        >
                                                            Fee: ₹
                                                            {item.fee || 0}
                                                        </Typography>
                                                        <Typography
                                                            variant="body2"
                                                            color="text.secondary"
                                                        >
                                                            Max Participants:{" "}
                                                            {
                                                                item.maxParticipants
                                                            }
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

                    {/* ================= SNACKBAR ================= */}
                    <Snackbar
                        open={snack.open}
                        autoHideDuration={3000}
                        onClose={() =>
                            setSnack({ ...snack, open: false })
                        }
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right",
                        }}
                    >
                        <Alert
                            severity={snack.severity}
                            variant="filled"
                        >
                            {snack.message}
                        </Alert>
                    </Snackbar>
                </Card>
            </Fade>
        </Box>
    );
};

export default FacultyCreateEvent;
