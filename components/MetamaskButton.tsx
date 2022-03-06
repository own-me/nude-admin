import React, { memo, useCallback, useEffect } from "react";
import { useAppDispatch } from "../redux/hooks";
import { usePostLoginMutation } from "../redux/api/login";
import { usePostAuthMutation } from "../redux/api/auth";
import useWallet from "../hooks/useWallet";
import metamaskLogo from "../media/metamask.svg";
import { Box, Button, Typography } from "@mui/material";
import { setIsLoggedIn } from "../redux/slices/app";
import { useLocation, useNavigate } from "react-router-dom";

export const MetamaskButton = memo(() => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const { address, signer } = useWallet();

    const [postLogin, {
        isSuccess: isPostLoginSuccess,
        isError: isPostLoginError,
        data: postLoginData,
        error: postLoginError
    }] = usePostLoginMutation();

    const [postAuth, {
        isSuccess: isPostAuthSuccess,
        data: postAuthData,
    }] = usePostAuthMutation();

    useEffect(() => {
        if (window.localStorage.getItem("token") && address) {
            postLogin({ address });
        }
    }, [address, postLogin]);

    const handleSubmit = useCallback((e?) => {
        e.preventDefault();
        postLogin({ address });
    }, [address, postLogin]);

    useEffect(() => {
        if (isPostLoginSuccess && postLoginData) {
            if (postLoginData.nonce) {
                window.localStorage.removeItem("token");
                signer.signMessage(postLoginData.nonce).then(signature => {
                    postAuth({ address, signature, nonce: postLoginData.nonce });
                });
            } else {
                navigate(location?.state?.from || "/");
                dispatch(setIsLoggedIn(true));
            }
        }
    }, [postLoginData, isPostLoginSuccess, signer, postAuth, address, dispatch, navigate, location?.state?.from]);

    useEffect(() => {
        if (isPostAuthSuccess && postAuthData && postAuthData.token) {
            window.localStorage.setItem("token", postAuthData.token);
            navigate(location?.state?.from || "/");
            dispatch(setIsLoggedIn(true));
        }
    }, [dispatch, isPostAuthSuccess, location?.state?.from, navigate, postAuthData]);

    useEffect(() => {
        if (isPostLoginError) {
            window.localStorage.removeItem("token");
        }
    }, [isPostLoginError]);

    return (
        <Box onSubmit={handleSubmit}>
            <Typography>{isPostLoginError && postLoginError?.data?.error}</Typography>
            <Button variant="outlined" onClick={handleSubmit}><img src={metamaskLogo} /></Button>
        </Box>
    );
});

export default MetamaskButton;