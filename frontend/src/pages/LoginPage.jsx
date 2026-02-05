import React from "react";
import {
    Box,
    Button,
    TextField,
    Typography,
    Container,
    Paper,
    InputAdornment,
    IconButton,
    Alert
} from "@mui/material";
import { Email, Lock, Visibility, VisibilityOff } from "@mui/icons-material";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [showPassword, setShowPassword] = React.useState(false);
    const [error, setError] = React.useState("");
    const [loading, setLoading] = React.useState(false);

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await axios.post(
                "http://localhost:5000/api/auth/login",
                { email, password }
            );

            // Save token & user
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));

            // Redirect based on role
            const role = res.data.user.role;
            if (role === "admin") navigate("/admin-home");
            else if (role === "faculty") navigate("/faculty-home");
            else navigate("/student-home");

        } catch (err) {
            setError(
                err.response?.data?.message || "Invalid email or password"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                background: "linear-gradient(135deg, #1976d2, #42a5f5)",
                display: "flex",
                alignItems: "center"
            }}
        >
            <Container maxWidth="sm">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <Paper elevation={10} sx={{ p: 4, borderRadius: 4 }}>
                        <Typography variant="h4" fontWeight="bold" gutterBottom align="center">
                            CampusConnect
                        </Typography>

                        <Typography color="text.secondary" mb={3} align="center">
                            Login to your account
                        </Typography>

                        {error && <Alert severity="error">{error}</Alert>}

                        <form onSubmit={handleLogin}>
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Email />
                                        </InputAdornment>
                                    )
                                }}
                            />

                            <TextField
                                fullWidth
                                margin="normal"
                                label="Password"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Lock />
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => setShowPassword(!showPassword)}
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />

                            <Button
                                fullWidth
                                type="submit"
                                variant="contained"
                                size="large"
                                disabled={loading}
                                sx={{ mt: 3, py: 1.2 }}
                            >
                                {loading ? "Logging in..." : "Login"}
                            </Button>
                        </form>

                        <Typography mt={2} align="center">
                            Don’t have an account?{" "}
                            <span
                                style={{ color: "#1976d2", cursor: "pointer" }}
                                onClick={() => navigate("/register")}
                            >
                                Register
                            </span>
                        </Typography>
                    </Paper>
                </motion.div>
            </Container>
        </Box>
    );
};

export default LoginPage;
