import React, { memo, useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { usePostLoginMutation } from "../api/login";
import { usePostAuthMutation } from "../api/auth";
import useWallet from "../hooks/useWallet";
import metamaskLogo from "../media/metamask.svg";
import { Box, Button, Typography } from "@mui/material";
import { setUserLoggedIn } from "../redux/slices/user";
import { useLocation, useNavigate } from "react-router-dom";
import { setUserToken } from "../redux/slices/user";
import { ethers } from "ethers";
import { NETWORKS } from "../lib/blockchain";

export const MetamaskButton = memo(() => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { loggedIn } = useAppSelector(state => state.user);
    const { address, signer } = useWallet();

    const [postLogin, {
        isLoading: isPostLoginLoading,
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

    const handleSubmit = useCallback(async (e?) => {
        e.preventDefault();
        try {
            await window.ethereum.request({
                method: "wallet_switchEthereumChain",
                params: [{ chainId: ethers.utils.hexValue(NETWORKS.polygonMumbai.chainId) }],
            });
        } catch (switchError) {
            if (switchError.code === 4902) { // couldn't switch networks
                try {
                    await window.ethereum.request({
                        method: "wallet_addEthereumChain",
                        params: [
                            {
                                chainId: ethers.utils.hexValue(NETWORKS.polygonMumbai.chainId),
                                chainName: "Mumbai",
                                rpcUrls: ["https://rpc-mumbai.matic.today"],
                                nativeCurrency: {
                                    name: "Matic",
                                    symbol: "MATIC",
                                    decimals: 18
                                },
                                blockExplorerUrls: ["https://mumbai.polygonscan.com/"]
                            },
                        ],
                    });
                } catch (addError) {
                    console.log("error switching chains");
                }
            }
        }
        let userAddress = address;
        if (!userAddress) {
            const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
            userAddress = ethers.utils.getAddress(accounts[0]);
        }
        postLogin({ address: userAddress });
    }, [address, postLogin]);

    useEffect(() => {
        if (isPostLoginSuccess && postLoginData && signer && address) {
            if (postLoginData?.nonce) {
                window.localStorage.removeItem("token");
                signer.signMessage(postLoginData.nonce).then(signature => {
                    postAuth({ address, signature, nonce: postLoginData.nonce });
                });
            } else {
                dispatch(setUserToken(window.localStorage.getItem("token")));
                dispatch(setUserLoggedIn(true));
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
            dispatch(setUserToken(postAuthData.token));
        }
    }, [dispatch, isPostAuthSuccess, postAuthData]);

    useEffect(() => {
        if (loggedIn) {
            navigate(location?.state?.from || "/nfts");
        }
    }, [location?.state?.from, loggedIn, navigate]);

    return (
        <Box onSubmit={handleSubmit}>
            <Typography>{isPostLoginError && postLoginError?.data?.error}</Typography>
            <Button 
                sx={{
                    backgroundColor: "text.primary",
                }}
                variant="outlined" 
                onClick={handleSubmit}
            >
                <img src={metamaskLogo} />
            </Button>
        </Box>
    );
});

export default MetamaskButton;