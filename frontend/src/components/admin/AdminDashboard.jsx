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
    Person,
    CheckCircle,
    HourglassEmpty,
} from "@mui/icons-material";

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [roleTab, setRoleTab] = useState(0);
    const [statusTab, setStatusTab] = useState(0);

    const token = localStorage.getItem("token");

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const res = await axios.get(
                "http://localhost:5000/api/admin/users",
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setUsers(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const approveUser = async (id) => {
        try {
            await axios.put(
                `http://localhost:5000/api/admin/users/approve/${id}`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
            fetchUsers();
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const role = roleTab === 0 ? "faculty" : "student";
    const approved = statusTab === 0;

    const filteredUsers = users.filter(
        (u) => u.role === role && u.approved === approved
    );

    const countBy = (r, a) =>
        users.filter((u) => u.role === r && u.approved === a).length;

    return (
        <>
            <Typography variant="h4" fontWeight={700} gutterBottom>
                Admin Dashboard
            </Typography>

            {/* Summary Cards */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} md={6}>
                    <Card elevation={4}>
                        <CardContent>
                            <Stack direction="row" spacing={2} alignItems="center">
                                <School color="primary" fontSize="large" />
                                <Box>
                                    <Typography fontWeight={600}>Faculty</Typography>
                                    <Typography variant="body2">
                                        Approved: {countBy("faculty", true)} | Pending:{" "}
                                        {countBy("faculty", false)}
                                    </Typography>
                                </Box>
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Card elevation={4}>
                        <CardContent>
                            <Stack direction="row" spacing={2} alignItems="center">
                                <People color="secondary" fontSize="large" />
                                <Box>
                                    <Typography fontWeight={600}>Students</Typography>
                                    <Typography variant="body2">
                                        Approved: {countBy("student", true)} | Pending:{" "}
                                        {countBy("student", false)}
                                    </Typography>
                                </Box>
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Tabs + User Cards */}
            <Card elevation={3}>
                <CardContent>
                    <Tabs
                        value={roleTab}
                        onChange={(_, v) => setRoleTab(v)}
                    >
                        <Tab icon={<School />} label="Faculty" />
                        <Tab icon={<Person />} label="Students" />
                    </Tabs>

                    <Tabs
                        value={statusTab}
                        onChange={(_, v) => setStatusTab(v)}
                        sx={{ mt: 2 }}
                    >
                        <Tab icon={<CheckCircle />} label="Approved" />
                        <Tab icon={<HourglassEmpty />} label="Pending Approval" />
                    </Tabs>

                    <Divider sx={{ my: 3 }} />

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
                                    <Card
                                        elevation={2}
                                        sx={{
                                            borderLeft: approved
                                                ? "4px solid #4caf50"
                                                : "4px solid #ff9800",
                                        }}
                                    >
                                        <CardContent>
                                            <Typography fontWeight={600}>
                                                {user.name}
                                            </Typography>
                                            <Typography variant="body2">
                                                {user.email}
                                            </Typography>

                                            <Chip
                                                icon={
                                                    approved ? (
                                                        <CheckCircle />
                                                    ) : (
                                                        <HourglassEmpty />
                                                    )
                                                }
                                                label={approved ? "Approved" : "Pending"}
                                                color={approved ? "success" : "warning"}
                                                size="small"
                                                sx={{ mt: 1 }}
                                            />

                                            {!approved && (
                                                <Button
                                                    fullWidth
                                                    variant="contained"
                                                    sx={{ mt: 2 }}
                                                    onClick={() =>
                                                        approveUser(user._id)
                                                    }
                                                >
                                                    Approve User
                                                </Button>
                                            )}
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
