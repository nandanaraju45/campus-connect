import { useEffect, useState } from "react";
import axios from "axios";
import {
    Box,
    Typography,
    Card,
    CardContent,
    Button,
    Grid,
    Divider,
    Chip,
    CircularProgress,
    Tabs,
    Tab,
    Stack,
} from "@mui/material";
import {
    People,
    School,
    CheckCircle,
    HourglassEmpty,
} from "@mui/icons-material";

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [roleTab, setRoleTab] = useState("faculty");
    const [status, setStatus] = useState("pending");

    const token = localStorage.getItem("token");

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const res = await axios.get(
                "http://localhost:5000/api/admin/users",
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setUsers(res.data);
        } finally {
            setLoading(false);
        }
    };

    const approveUser = async (id) => {
        await axios.put(
            `http://localhost:5000/api/admin/users/approve/${id}`,
            {},
            { headers: { Authorization: `Bearer ${token}` } }
        );
        fetchUsers();
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const filteredUsers = users.filter(
        (u) =>
            u.role === roleTab &&
            (status === "approved" ? u.approved : !u.approved)
    );

    return (
        <>
            <Typography variant="h4" fontWeight={700} gutterBottom>
                Admin Dashboard
            </Typography>

            {/* Summary */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Stack direction="row" spacing={2}>
                                <School color="primary" />
                                <Box>
                                    <Typography fontWeight={600}>
                                        Faculty
                                    </Typography>
                                    <Typography variant="body2">
                                        Approved:{" "}
                                        {
                                            users.filter(
                                                (u) =>
                                                    u.role === "faculty" &&
                                                    u.approved
                                            ).length
                                        }{" "}
                                        | Pending:{" "}
                                        {
                                            users.filter(
                                                (u) =>
                                                    u.role === "faculty" &&
                                                    !u.approved
                                            ).length
                                        }
                                    </Typography>
                                </Box>
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Stack direction="row" spacing={2}>
                                <People color="secondary" />
                                <Box>
                                    <Typography fontWeight={600}>
                                        Students
                                    </Typography>
                                    <Typography variant="body2">
                                        Approved:{" "}
                                        {
                                            users.filter(
                                                (u) =>
                                                    u.role === "student" &&
                                                    u.approved
                                            ).length
                                        }{" "}
                                        | Pending:{" "}
                                        {
                                            users.filter(
                                                (u) =>
                                                    u.role === "student" &&
                                                    !u.approved
                                            ).length
                                        }
                                    </Typography>
                                </Box>
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Filters */}
            <Card>
                <CardContent>
                    <Tabs
                        value={roleTab}
                        onChange={(_, v) => setRoleTab(v)}
                    >
                        <Tab value="faculty" label="Faculty" />
                        <Tab value="student" label="Students" />
                    </Tabs>

                    <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                        <Chip
                            label="Pending"
                            color={status === "pending" ? "warning" : "default"}
                            onClick={() => setStatus("pending")}
                        />
                        <Chip
                            label="Approved"
                            color={
                                status === "approved"
                                    ? "success"
                                    : "default"
                            }
                            onClick={() => setStatus("approved")}
                        />
                    </Stack>

                    <Divider sx={{ my: 3 }} />

                    {/* Section Title */}
                    <Typography fontWeight={600} sx={{ mb: 2 }}>
                        {status === "approved" ? "Approved" : "Pending"}{" "}
                        {roleTab === "faculty" ? "Faculty" : "Students"} (
                        {filteredUsers.length})
                    </Typography>

                    {loading ? (
                        <CircularProgress />
                    ) : filteredUsers.length === 0 ? (
                        <Typography color="text.secondary">
                            No users found
                        </Typography>
                    ) : (
                        <Grid container spacing={2}>
                            {filteredUsers.map((user) => (
                                <Grid item xs={12} md={6} lg={4} key={user._id}>
                                    <Card variant="outlined">
                                        <CardContent>
                                            <Typography fontWeight={600}>
                                                {user.name}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                            >
                                                {user.email}
                                            </Typography>

                                            <Stack
                                                direction="row"
                                                justifyContent="space-between"
                                                alignItems="center"
                                                sx={{ mt: 2 }}
                                            >
                                                <Chip
                                                    size="small"
                                                    icon={
                                                        user.approved ? (
                                                            <CheckCircle />
                                                        ) : (
                                                            <HourglassEmpty />
                                                        )
                                                    }
                                                    label={
                                                        user.approved
                                                            ? "Approved"
                                                            : "Pending"
                                                    }
                                                    color={
                                                        user.approved
                                                            ? "success"
                                                            : "warning"
                                                    }
                                                />

                                                {!user.approved && (
                                                    <Button
                                                        size="small"
                                                        variant="contained"
                                                        onClick={() =>
                                                            approveUser(
                                                                user._id
                                                            )
                                                        }
                                                    >
                                                        Approve
                                                    </Button>
                                                )}
                                            </Stack>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    )}
                </CardContent>
            </Card>
        </>
    );
};

export default AdminDashboard;
