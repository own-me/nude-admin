import React, { memo, useCallback, useEffect } from "react";
import { useAppDispatch } from "../redux/hooks";
import { usePostLoginMutation } from "../redux/api/login";
import { usePostAuthMutation } from "../redux/api/auth";
import useWallet from "../hooks/useWallet";
import metamaskLogo from "../media/metamask.svg";
import { Box, Button, Typography } from "@mui/material";
import { setIsLoggedIn } from "../redux/slices/app";

export const MetamaskButton = memo(() => {
    const dispatch = useAppDispatch();

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
            console.log("postLoginData", postLoginData);
            if (postLoginData.nonce) {
                window.localStorage.removeItem("token");
                signer.signMessage(postLoginData.nonce).then(signature => {
                    postAuth({ address, signature, nonce: postLoginData.nonce });
                });
            }
        }
    }, [postLoginData, isPostLoginSuccess, signer, postAuth, address, dispatch]);

    useEffect(() => {
        if (isPostLoginError) {
            window.localStorage.removeItem("token");
        }
    }, [isPostLoginError]);

    useEffect(() => {
        if (isPostAuthSuccess && postAuthData && postAuthData.token) {
            window.localStorage.setItem("token", postAuthData.token);
            dispatch(setIsLoggedIn(true));
        }
    }, [dispatch, isPostAuthSuccess, postAuthData]);

    return (
        <Box onSubmit={handleSubmit}>
            <Typography>{isPostLoginError && postLoginError?.data?.error}</Typography>
            <Button variant="outlined" onClick={handleSubmit}><img src={metamaskLogo} /></Button>
        </Box>
    );
});

export default MetamaskButton;