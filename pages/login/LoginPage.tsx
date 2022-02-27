import React, { memo, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import MetamaskButton from "../../components/MetaMaskButton";
import { setIsLoggedIn } from "../../redux/slices/app";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useLocation, useNavigate } from "react-router-dom";

export const LoginPage = memo(() => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const isLoggedIn = useAppSelector(state => state.app.isLoggedIn);

    useEffect(() => {
        if (window.localStorage.getItem("token")) {
            dispatch(setIsLoggedIn(true));
        }
    }, [dispatch]);

    useEffect(() => {
        if (isLoggedIn) {
            navigate(location?.state?.from || "/");
        }
    }, [isLoggedIn, location?.state?.from, navigate]);

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