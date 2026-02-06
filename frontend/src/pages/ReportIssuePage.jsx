import { useState } from "react";
import axios from "axios";
import {
    Box,
    Card,
    CardContent,
    Typography,
    TextField,
    Button,
    Stack,
    Alert,
    CircularProgress,
} from "@mui/material";

const ReportIssuePage = () => {
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const submitHandler = async (e) => {
        e.preventDefault();

        if (!message.trim()) {
            setError("Please describe your issue");
            return;
        }

        try {
            setLoading(true);
            setError("");
            setSuccess("");

            await axios.post(
                "http://localhost:5000/api/complaints",
                { message },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            setSuccess("Your issue has been sent to the admin.");
            setMessage("");
        } catch (err) {
            setError(
                err.response?.data?.message || "Something went wrong"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="80vh"
            px={2}
        >
            <Card
                sx={{
                    width: "100%",
                    maxWidth: 500,
                    borderRadius: 3,
                    boxShadow: 4,
                }}
            >
                <CardContent>
                    <Typography variant="h5" fontWeight={600} gutterBottom>
                        Report an Issue
                    </Typography>

                    <Typography variant="body2" color="text.secondary" mb={2}>
                        Describe the problem you’re facing. Our admin will
                        review it.
                    </Typography>

                    <form onSubmit={submitHandler}>
                        <Stack spacing={2}>
                            {error && <Alert severity="error">{error}</Alert>}
                            {success && (
                                <Alert severity="success">{success}</Alert>
                            )}

                            <TextField
                                label="Your Issue"
                                multiline
                                rows={4}
                                fullWidth
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Explain the issue clearly..."
                            />

                            <Button
                                type="submit"
                                variant="contained"
                                size="large"
                                disabled={loading}
                                sx={{ borderRadius: 2 }}
                            >
                                {loading ? (
                                    <CircularProgress size={24} />
                                ) : (
                                    "Submit"
                                )}
                            </Button>
                        </Stack>
                    </form>
                </CardContent>
            </Card>
        </Box>
    );
};

export default ReportIssuePage;
