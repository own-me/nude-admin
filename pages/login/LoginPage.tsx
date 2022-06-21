import React, { memo } from "react";
import { Box, Typography } from "@mui/material";
import MetamaskButton from "../../components/MetamaskButton";
import logo from "../../media/own-me-logo.svg";

export const LoginPage = memo(() => {
    return (
        <Box sx={{
            display: "flex",
            height: "100%",
            width: "100%",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "2rem",
            color: "text.primary"
        }}>
            <img src={logo} />
            <br />
            <br />
            <br />
            <Typography variant="h4">Login</Typography>
            <br />
            <MetamaskButton />
        </Box>
    );
});

export default LoginPage;