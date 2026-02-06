import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

import {
    Box,
    Typography,
    Card,
    CardContent,
    Stack,
    Button,
    Grid,
    CircularProgress,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Chip,
    Divider,
    Snackbar,
    Alert,
} from "@mui/material";

import {
    ArrowBack,
    Event as EventIcon,
    ExpandMore,
    EmojiEvents,
} from "@mui/icons-material";

const EventDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const token = localStorage.getItem("token");

    const [event, setEvent] = useState(null);
    const [items, setItems] = useState([]);
    const [participants, setParticipants] = useState({});
    const [results, setResults] = useState({});
    const [loading, setLoading] = useState(true);

    const paypalClientId =
        "Afb-xuSJbbcB4_cXT12sqtJD3tTcUKueV7Y5WjunYs8P0pET__ZXisBJVfWp1o0tjAdvpdX3_yxsR5BN";

    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success",
    });

    const isStudent = user?.role === "student";
    const isFacultyOrAdmin =
        user?.role === "faculty" || user?.role === "admin";

    /* ---------- Fetch Event ---------- */
    const fetchEvent = async () => {
        const res = await axios.get(`http://localhost:5000/api/events/${id}`);
        setEvent(res.data);
    };

    /* ---------- Fetch Items ---------- */
    const fetchItems = async () => {
        const res = await axios.get(`http://localhost:5000/api/items/event/${id}`);
        setItems(res.data);
    };

    /* ---------- Fetch Participants ---------- */
    const fetchParticipants = async (itemId) => {
        if (participants[itemId]) return;

        try {
            const res = await axios.get(
                `http://localhost:5000/api/items/${itemId}/participants`,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setParticipants((prev) => ({
                ...prev,
                [itemId]: res.data,
            }));

            console.log(`Participants for item ${itemId}:`, res.data);
        } catch (err) {
            console.error(err);
            setParticipants((prev) => ({
                ...prev,
                [itemId]: [],
            }));
        }
    };

    /* ---------- Fetch Results ---------- */
    const fetchResult = async (itemId) => {
        if (results[itemId]) return;

        try {
            const res = await axios.get(
                `http://localhost:5000/api/results/${itemId}`
            );
            setResults((prev) => ({
                ...prev,
                [itemId]: res.data,
            }));
        } catch {
            setResults((prev) => ({
                ...prev,
                [itemId]: null,
            }));
        }
    };

    /* ---------- Free Item Registration ---------- */
    const handleRegister = async (item) => {
        try {
            await axios.post(
                "http://localhost:5000/api/registrations",
                { eventItem: item._id },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setParticipants((prev) => ({
                ...prev,
                [item._id]: prev[item._id]
                    ? [...prev[item._id], { student: user }]
                    : [{ student: user }],
            }));

            setSnackbar({
                open: true,
                message: "Registered successfully",
                severity: "success",
            });
        } catch (err) {
            console.error(err);
            setSnackbar({
                open: true,
                message: err.response?.data?.message || "Registration failed",
                severity: "error",
            });
        }
    };

    /* ---------- Load Event, Items, Participants ---------- */
    useEffect(() => {
        const load = async () => {
            await fetchEvent();
            await fetchItems();

            // Fetch participants for all items immediately
            for (const item of items) {
                await fetchParticipants(item._id);
                await fetchResult(item._id);
            }

            setLoading(false);
        };
        load();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, items.length]);

    if (loading) return <CircularProgress />;

    if (!event) return <Typography>Event not found</Typography>;

    return (
        <Box>
            {/* ---------- Back ---------- */}
            <Button
                startIcon={<ArrowBack />}
                onClick={() => navigate(-1)}
                sx={{ mb: 2 }}
            >
                Back
            </Button>

            {/* ---------- Event ---------- */}
            <Card sx={{ mb: 4, borderRadius: 3 }}>
                <CardContent>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <EventIcon color="primary" />
                        <Typography variant="h4" fontWeight={700}>
                            {event.title}
                        </Typography>
                    </Stack>

                    <Typography sx={{ mt: 2 }}>{event.description}</Typography>

                    <Stack direction="row" spacing={2} mt={2}>
                        <Chip label={`Venue: ${event.venue}`} />
                        <Chip
                            label={new Date(event.date).toLocaleDateString()}
                        />
                        <Chip
                            label={event.status.toUpperCase()}
                            color={event.status === "open" ? "success" : "error"}
                        />
                    </Stack>
                </CardContent>
            </Card>

            {/* ---------- Items ---------- */}
            <Typography variant="h5" fontWeight={700} gutterBottom>
                Event Items
            </Typography>

            <Grid container spacing={2}>
                {items.map((item) => {
                    const registered = participants[item._id]?.some(
                        (p) => p.student._id === user._id
                    );

                    return (
                        <Grid item xs={12} key={item._id}>
                            <Accordion
                                onChange={() => {
                                    fetchParticipants(item._id);
                                    fetchResult(item._id);
                                }}
                            >
                                <AccordionSummary expandIcon={<ExpandMore />}>
                                    <Stack direction="row" spacing={2}>
                                        <Typography fontWeight={600}>{item.name}</Typography>
                                        <Chip label={`Fee ₹${item.fee || 0}`} />
                                    </Stack>
                                </AccordionSummary>

                                <AccordionDetails>
                                    {/* ---------- Participants ---------- */}
                                    <Typography fontWeight={600} mb={1}>
                                        Participants
                                    </Typography>

                                    {participants[item._id]?.length ? (
                                        participants[item._id].map((p) => (
                                            <Typography key={p._id || p.student._id}>
                                                {p.student.name}
                                            </Typography>
                                        ))
                                    ) : (
                                        <Typography color="text.secondary">No participants</Typography>
                                    )}

                                    {/* ---------- Registration ---------- */}
                                    {isStudent && !registered && (
                                        <>
                                            {item.fee === 0 ? (
                                                <Button
                                                    variant="contained"
                                                    sx={{ mt: 2 }}
                                                    onClick={() => handleRegister(item)}
                                                >
                                                    Register
                                                </Button>
                                            ) : (
                                                <PayPalScriptProvider
                                                    options={{
                                                        "client-id": paypalClientId,
                                                        currency: "INR",
                                                    }}
                                                >
                                                    <PayPalButtons
                                                        createOrder={async () => {
                                                            const res = await axios.post(
                                                                "http://localhost:5000/api/registrations/paypal/create",
                                                                { eventItemId: item._id },
                                                                { headers: { Authorization: `Bearer ${token}` } }
                                                            );
                                                            return res.data.id;
                                                        }}
                                                        onApprove={async (data) => {
                                                            await axios.post(
                                                                "http://localhost:5000/api/registrations/paypal/capture",
                                                                { orderId: data.orderID, eventItemId: item._id },
                                                                { headers: { Authorization: `Bearer ${token}` } }
                                                            );

                                                            setParticipants((prev) => ({
                                                                ...prev,
                                                                [item._id]: prev[item._id]
                                                                    ? [...prev[item._id], { student: user }]
                                                                    : [{ student: user }],
                                                            }));

                                                            setSnackbar({
                                                                open: true,
                                                                message: "Payment & registration successful",
                                                                severity: "success",
                                                            });
                                                        }}
                                                        onError={(err) => {
                                                            console.error(err);
                                                            setSnackbar({
                                                                open: true,
                                                                message: "Payment failed",
                                                                severity: "error",
                                                            });
                                                        }}
                                                    />
                                                </PayPalScriptProvider>
                                            )}
                                        </>
                                    )}

                                    <Divider sx={{ my: 2 }} />

                                    {/* ---------- Results ---------- */}
                                    <Typography
                                        fontWeight={600}
                                        mb={1}
                                        display="flex"
                                        alignItems="center"
                                        gap={1}
                                    >
                                        <EmojiEvents fontSize="small" />
                                        Results
                                    </Typography>

                                    {results[item._id]?.positions ? (
                                        results[item._id].positions.map((r) => (
                                            <Typography key={r._id}>
                                                {r.position}️⃣ {r.student.name}
                                            </Typography>
                                        ))
                                    ) : isFacultyOrAdmin ? (
                                        <Button
                                            variant="outlined"
                                            onClick={() => navigate(`/publish-result/${item._id}`)}
                                        >
                                            Publish Result
                                        </Button>
                                    ) : (
                                        <Typography color="text.secondary">Results not published</Typography>
                                    )}
                                </AccordionDetails>
                            </Accordion>
                        </Grid>
                    );
                })}
            </Grid>

            {/* ---------- Snackbar ---------- */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={() =>
                    setSnackbar((prev) => ({ ...prev, open: false }))
                }
            >
                <Alert
                    onClose={() =>
                        setSnackbar((prev) => ({ ...prev, open: false }))
                    }
                    severity={snackbar.severity}
                    sx={{ width: "100%" }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default EventDetailPage;
