import React, { memo } from "react";
import { Box, Typography } from "@mui/material";
import MetamaskButton from "../../components/MetaMaskButton";

export const LoginPage = memo(() => {
    return (
        <Box sx={{
            display: "flex",
            height: "100%",
            width: "100%",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "2rem"
        }}>
            <Typography variant="h4">Login</Typography>
            <hr />
            <MetamaskButton />
        </Box>
    );
});

export default LoginPage;