import { useEffect, useState } from "react";
import axios from "axios";
import {
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    CircularProgress,
    Chip,
    Stack,
    Alert,
} from "@mui/material";
import ReplyIcon from "@mui/icons-material/Reply";

const AdminComplaintsPage = () => {
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [open, setOpen] = useState(false);
    const [selectedComplaint, setSelectedComplaint] = useState(null);
    const [reply, setReply] = useState("");
    const [replyLoading, setReplyLoading] = useState(false);

    const fetchComplaints = async () => {
        try {
            const { data } = await axios.get("http://localhost:5000/api/complaints", {
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

    useEffect(() => {
        fetchComplaints();
    }, []);

    const openReplyDialog = (complaint) => {
        setSelectedComplaint(complaint);
        setReply(complaint.adminReply || "");
        setOpen(true);
    };

    const handleReply = async () => {
        if (!reply.trim()) return;

        try {
            setReplyLoading(true);

            const { data } = await axios.put(
                `http://localhost:5000/api/complaints/${selectedComplaint._id}/reply`,
                { reply },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            );

            setComplaints((prev) =>
                prev.map((c) =>
                    c._id === data._id ? data : c
                )
            );

            setOpen(false);
        } catch (err) {
            alert("Failed to send reply");
        } finally {
            setReplyLoading(false);
        }
    };

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
        <Box p={3}>
            <Typography variant="h5" fontWeight={600} mb={3}>
                User Complaints
            </Typography>

            <TableContainer
                component={Paper}
                sx={{ borderRadius: 3 }}
            >
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>User</TableCell>
                            <TableCell>Message</TableCell>
                            <TableCell>Reply</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell align="center">
                                Action
                            </TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {complaints.map((complaint) => (
                            <TableRow key={complaint._id}>
                                <TableCell>
                                    <Stack>
                                        <Typography fontWeight={500}>
                                            {complaint.user?.name}
                                        </Typography>
                                        <Typography
                                            variant="caption"
                                            color="text.secondary"
                                        >
                                            {complaint.user?.email}
                                        </Typography>
                                    </Stack>
                                </TableCell>

                                <TableCell sx={{ maxWidth: 300 }}>
                                    <Typography
                                        variant="body2"
                                        noWrap
                                    >
                                        {complaint.message}
                                    </Typography>
                                </TableCell>

                                <TableCell>
                                    {complaint.adminReply ? (
                                        <Chip
                                            label="Replied"
                                            color="success"
                                            size="small"
                                        />
                                    ) : (
                                        <Chip
                                            label="Pending"
                                            size="small"
                                        />
                                    )}
                                </TableCell>

                                <TableCell>
                                    {new Date(
                                        complaint.createdAt
                                    ).toLocaleDateString()}
                                </TableCell>

                                <TableCell align="center">
                                    <IconButton
                                        color="primary"
                                        onClick={() =>
                                            openReplyDialog(complaint)
                                        }
                                    >
                                        <ReplyIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Reply Dialog */}
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle>Reply to Complaint</DialogTitle>

                <DialogContent>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        mb={1}
                    >
                        User Message
                    </Typography>

                    <Typography mb={2}>
                        {selectedComplaint?.message}
                    </Typography>

                    <TextField
                        label="Admin Reply"
                        multiline
                        rows={4}
                        fullWidth
                        value={reply}
                        onChange={(e) =>
                            setReply(e.target.value)
                        }
                    />
                </DialogContent>

                <DialogActions>
                    <Button
                        onClick={() => setOpen(false)}
                        disabled={replyLoading}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleReply}
                        disabled={replyLoading}
                    >
                        {replyLoading ? (
                            <CircularProgress size={20} />
                        ) : (
                            "Send Reply"
                        )}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default AdminComplaintsPage;
