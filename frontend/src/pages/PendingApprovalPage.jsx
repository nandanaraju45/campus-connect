import { Box, Typography, CircularProgress } from "@mui/material";

const PendingApprovalPage = () => {
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
            <CircularProgress />
            <Typography variant="h6" mt={3}>
                Your account is under review
            </Typography>
            <Typography variant="body2" color="text.secondary" mt={1}>
                Please wait for admin approval.
            </Typography>
        </Box>
    );
};

export default PendingApprovalPage;
