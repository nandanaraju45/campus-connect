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
    MenuItem,
    Alert
} from "@mui/material";
import {
    Email,
    Lock,
    Visibility,
    VisibilityOff,
    Person,
    School
} from "@mui/icons-material";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const departments = [
    "Computer Science",
    "Electronics",
    "English",
    "Commerce",
];

const RegisterPage = () => {
    const [formData, setFormData] = React.useState({
        name: "",
        email: "",
        role: "",
        department: "",
        password: "",
        confirmPassword: ""
    });

    const [showPassword, setShowPassword] = React.useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
    const [error, setError] = React.useState("");
    const [loading, setLoading] = React.useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");

        if (formData.password !== formData.confirmPassword) {
            return setError("Passwords do not match");
        }

        setLoading(true);

        try {
            await axios.post(
                "http://localhost:5000/api/auth/register",
                {
                    name: formData.name,
                    email: formData.email,
                    role: formData.role,
                    department: formData.department,
                    password: formData.password
                }
            );

            navigate("/login");

        } catch (err) {
            setError(err.response?.data?.message || "Registration failed");
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
                            Create your account
                        </Typography>

                        {error && <Alert severity="error">{error}</Alert>}

                        <form onSubmit={handleRegister}>
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Full Name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Person />
                                        </InputAdornment>
                                    )
                                }}
                            />

                            <TextField
                                fullWidth
                                margin="normal"
                                label="Email"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
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
                                select
                                margin="normal"
                                label="User Type"
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                required
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <School />
                                        </InputAdornment>
                                    )
                                }}
                            >
                                <MenuItem value="student">Student</MenuItem>
                                <MenuItem value="faculty">Faculty</MenuItem>
                            </TextField>

                            <TextField
                                fullWidth
                                select
                                margin="normal"
                                label="Department"
                                name="department"
                                value={formData.department}
                                onChange={handleChange}
                                required
                            >
                                {departments.map((dept) => (
                                    <MenuItem key={dept} value={dept}>
                                        {dept}
                                    </MenuItem>
                                ))}
                            </TextField>

                            <TextField
                                fullWidth
                                margin="normal"
                                label="Password"
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
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

                            <TextField
                                fullWidth
                                margin="normal"
                                label="Confirm Password"
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
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
                                                onClick={() =>
                                                    setShowConfirmPassword(!showConfirmPassword)
                                                }
                                            >
                                                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
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
                                {loading ? "Creating account..." : "Register"}
                            </Button>
                        </form>

                        <Typography mt={2} align="center">
                            Already have an account?{" "}
                            <span
                                style={{ color: "#1976d2", cursor: "pointer" }}
                                onClick={() => navigate("/login")}
                            >
                                Login
                            </span>
                        </Typography>
                    </Paper>
                </motion.div>
            </Container>
        </Box>
    );
};

export default RegisterPage;
