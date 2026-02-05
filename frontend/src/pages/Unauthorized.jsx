import { Box, Typography, Button } from "@mui/material";
import BlockIcon from "@mui/icons-material/Block";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Unauthorized = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    return (
        <Box
            minHeight="100vh"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            px={2}
        >
            <BlockIcon sx={{ fontSize: 64, color: "error.main" }} />

            <Typography variant="h5" mt={2}>
                Access Denied
            </Typography>

            <Typography variant="body2" color="text.secondary" mt={1}>
                You don’t have permission to access this page.
            </Typography>

            {user && (
                <Typography variant="caption" color="text.secondary" mt={1}>
                    Logged in as <b>{user.role}</b>
                </Typography>
            )}

            <Box mt={4} display="flex" gap={2}>
                <Button
                    variant="contained"
                    onClick={() => navigate("/")}
                >
                    Go to Home
                </Button>

                <Button
                    variant="outlined"
                    color="error"
                    onClick={logout}
                >
                    Logout
                </Button>
            </Box>
        </Box>
    );
};

export default Unauthorized;
