import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import {
    Box,
    Typography,
    Card,
    CardContent,
    Stack,
    Button,
    CircularProgress,
    MenuItem,
    Select,
    Snackbar,
    Alert,
    Divider,
} from "@mui/material";

import { ArrowBack, EmojiEvents } from "@mui/icons-material";
import { useAuth } from "../context/AuthContext";

const PublishResultPage = () => {
    const { itemId } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const token = localStorage.getItem("token");

    const [item, setItem] = useState(null);
    const [participants, setParticipants] = useState([]);
    const [positions, setPositions] = useState({
        first: "",
        second: "",
        third: "",
    });
    const [loading, setLoading] = useState(true);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success",
    });

    const isFacultyOrAdmin =
        user?.role === "faculty" || user?.role === "admin";

    /* ---------- Guards ---------- */
    useEffect(() => {
        if (!isFacultyOrAdmin) {
            navigate(-1);
        }
    }, [isFacultyOrAdmin]);

    /* ---------- Fetch Data ---------- */
    const loadParticipants = async () => {
        try {
            const res = await axios.get(
                `http://localhost:5000/api/items/${itemId}/participants`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            console.log(res.data);
            setParticipants(res.data);
            setLoading(false);
        } catch (err) {
            console.error(err.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        loadParticipants();
    }, [itemId]);

    /* ---------- Publish Result ---------- */
    const publishResult = async () => {
        try {
            const payload = {
                positions: [
                    { student: positions.first, position: 1 },
                    { student: positions.second, position: 2 },
                    { student: positions.third, position: 3 },
                ].filter((p) => p.student),
            };

            await axios.post(
                `http://localhost:5000/api/results/${itemId}`,
                payload,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setSnackbar({
                open: true,
                message: "Result published successfully 🎉",
                severity: "success",
            });

            setTimeout(() => navigate(-1), 1200);
        } catch (err) {
            console.error(err);
            setSnackbar({
                open: true,
                message: "Failed to publish result",
                severity: "error",
            });
        }
    };

    if (loading) return <CircularProgress />;

    return (
        <Box maxWidth={600}>
            {/* ---------- Back ---------- */}
            <Button
                startIcon={<ArrowBack />}
                onClick={() => navigate(-1)}
                sx={{ mb: 2 }}
            >
                Back
            </Button>

            <Card elevation={4} sx={{ borderRadius: 3 }}>
                <CardContent>
                    <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                        mb={2}
                    >
                        <EmojiEvents color="primary" />
                        <Typography variant="h4" fontWeight={700}>
                            Publish Result
                        </Typography>
                    </Stack>

                    <Typography fontWeight={600}>
                        Item: {item?.name}
                    </Typography>

                    <Divider sx={{ my: 2 }} />

                    {/* ---------- Position Selectors ---------- */}
                    <Stack spacing={3}>
                        <PositionSelect
                            label="🥇 First Place"
                            value={positions.first}
                            onChange={(v) =>
                                setPositions({ ...positions, first: v })
                            }
                            participants={participants}
                        />

                        <PositionSelect
                            label="🥈 Second Place"
                            value={positions.second}
                            onChange={(v) =>
                                setPositions({ ...positions, second: v })
                            }
                            participants={participants}
                        />

                        <PositionSelect
                            label="🥉 Third Place"
                            value={positions.third}
                            onChange={(v) =>
                                setPositions({ ...positions, third: v })
                            }
                            participants={participants}
                        />
                    </Stack>

                    <Button
                        fullWidth
                        variant="contained"
                        sx={{ mt: 4 }}
                        onClick={publishResult}
                        disabled={!positions.first}
                    >
                        Publish Result
                    </Button>
                </CardContent>
            </Card>

            {/* ---------- Snackbar ---------- */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={() =>
                    setSnackbar({ ...snackbar, open: false })
                }
            >
                <Alert severity={snackbar.severity}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

/* ---------- Reusable Select ---------- */
const PositionSelect = ({ label, value, onChange, participants }) => (
    <Box>
        <Typography fontWeight={600} mb={1}>
            {label}
        </Typography>
        <Select
            fullWidth
            value={value}
            onChange={(e) => onChange(e.target.value)}
            displayEmpty
        >
            <MenuItem value="">
                <em>Select student</em>
            </MenuItem>
            {participants.map((p) => (
                <MenuItem key={p.student._id} value={p.student._id}>
                    {p.student.name}
                </MenuItem>
            ))}
        </Select>
    </Box>
);

export default PublishResultPage;
