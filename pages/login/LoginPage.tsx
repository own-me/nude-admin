import React, { memo, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import MetamaskButton from "../../components/MetaMaskButton";
import { setIsLoggedIn } from "../../redux/slices/app";
import { useAppDispatch } from "../../redux/hooks";

export const LoginPage = memo(() => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (window.localStorage.getItem("token")) {
            dispatch(setIsLoggedIn(true));
        }
    }, [dispatch]);

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