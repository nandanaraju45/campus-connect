import { useEffect, useState } from "react";
import axios from "axios";
import {
    Box,
    Card,
    CardContent,
    Typography,
    Stack,
    Chip,
    CircularProgress,
    Alert,
    Divider,
} from "@mui/material";

const MyComplaintsPage = () => {
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchComplaints = async () => {
            try {
                const { data } = await axios.get("http://localhost:5000/api/complaints/my", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });

                setComplaints(data);
            } catch (err) {
                setError(
                    err.response?.data?.message ||
                    "Failed to load complaints"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchComplaints();
    }, []);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" mt={6}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box maxWidth={600} mx="auto" mt={4}>
                <Alert severity="error">{error}</Alert>
            </Box>
        );
    }

    return (
        <Box maxWidth={700} mx="auto" mt={4} px={2}>
            <Typography variant="h5" fontWeight={600} mb={3}>
                My Complaints
            </Typography>

            {complaints.length === 0 ? (
                <Alert severity="info">
                    You haven’t submitted any complaints yet.
                </Alert>
            ) : (
                <Stack spacing={2}>
                    {complaints.map((complaint) => (
                        <Card
                            key={complaint._id}
                            sx={{
                                borderRadius: 3,
                                boxShadow: 3,
                            }}
                        >
                            <CardContent>
                                <Typography
                                    variant="body1"
                                    fontWeight={500}
                                >
                                    Your Message
                                </Typography>

                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    mt={0.5}
                                >
                                    {complaint.message}
                                </Typography>

                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                    display="block"
                                    mt={1}
                                >
                                    Submitted on{" "}
                                    {new Date(
                                        complaint.createdAt
                                    ).toLocaleString()}
                                </Typography>

                                {complaint.adminReply && (
                                    <>
                                        <Divider sx={{ my: 2 }} />

                                        <Chip
                                            label="Admin Reply"
                                            color="primary"
                                            size="small"
                                            sx={{ mb: 1 }}
                                        />

                                        <Typography
                                            variant="body2"
                                            sx={{
                                                backgroundColor:
                                                    "action.hover",
                                                p: 1.5,
                                                borderRadius: 2,
                                            }}
                                        >
                                            {complaint.adminReply}
                                        </Typography>
                                    </>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </Stack>
            )}
        </Box>
    );
};

export default MyComplaintsPage;
