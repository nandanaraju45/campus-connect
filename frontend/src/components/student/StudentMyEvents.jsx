import { useEffect, useState } from "react";
import axios from "axios";
import {
    Card,
    CardContent,
    Typography,
    Stack,
    Chip,
    CircularProgress,
    Box,
} from "@mui/material";

const StudentMyEvents = () => {
    const [registrations, setRegistrations] = useState([]);
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchMyEvents = async () => {
            try {
                const res = await axios.get(
                    "http://localhost:5000/api/registrations/my",
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                setRegistrations(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchMyEvents();
    }, []);

    if (loading)
        return (
            <Box display="flex" justifyContent="center" mt={5}>
                <CircularProgress />
            </Box>
        );

    return (
        <Box px={{ xs: 2, md: 4 }} py={4}>
            <Typography variant="h4" fontWeight={700} gutterBottom>
                My Events
            </Typography>

            {registrations.length === 0 ? (
                <Typography variant="subtitle1">
                    You haven't participated in any items yet.
                </Typography>
            ) : (
                registrations.map((reg) => (
                    <Card
                        key={reg._id}
                        elevation={4}
                        sx={{
                            mb: 3,
                            borderRadius: 3,
                            height: 140,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            transition: "transform 0.2s, box-shadow 0.2s",
                            "&:hover": {
                                transform: "translateY(-3px)",
                                boxShadow: 6,
                            },
                        }}
                    >
                        <CardContent
                            sx={{
                                flexGrow: 1,
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                                pb: 2,
                            }}
                        >
                            {/* Item Name */}
                            <Typography
                                fontWeight={600}
                                sx={{
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                }}
                                title={reg.eventItem?.name}
                            >
                                {reg.eventItem?.name}
                            </Typography>

                            {/* Event Name */}
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                }}
                                title={reg.eventItem?.event?.title}
                            >
                                Event: {reg.eventItem?.event?.title}
                            </Typography>

                            {/* Payment Status */}
                            <Stack direction="row" spacing={1} mt={1}>
                                <Chip
                                    label={reg.paymentStatus.toUpperCase()}
                                    color={
                                        reg.paymentStatus === "paid"
                                            ? "success"
                                            : "warning"
                                    }
                                    size="small"
                                />
                            </Stack>
                        </CardContent>
                    </Card>
                ))
            )}
        </Box>
    );
};

export default StudentMyEvents;
