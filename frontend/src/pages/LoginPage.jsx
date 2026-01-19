import React from "react";
import {
    Box,
    Button,
    TextField,
    Typography,
    Container,
    Paper,
    InputAdornment,
    IconButton
} from "@mui/material";
import { Email, Lock, Visibility, VisibilityOff } from "@mui/icons-material";
import { motion } from "framer-motion";

const LoginPage = () => {
    const [showPassword, setShowPassword] = React.useState(false);

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
                    <Paper
                        elevation={10}
                        sx={{
                            p: 4,
                            borderRadius: 4,
                            textAlign: "center"
                        }}
                    >
                        <Typography variant="h4" fontWeight="bold" gutterBottom>
                            CampusConnect
                        </Typography>

                        <Typography color="text.secondary" mb={3}>
                            Login to your account
                        </Typography>

                        <TextField
                            fullWidth
                            margin="normal"
                            label="Email"
                            type="email"
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
                            variant="contained"
                            size="large"
                            sx={{ mt: 3, py: 1.2 }}
                        >
                            Login
                        </Button>

                        <Typography mt={2}>
                            Don’t have an account?{" "}
                            <span style={{ color: "#1976d2", cursor: "pointer" }}>
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
