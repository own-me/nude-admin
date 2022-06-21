import { Box, Button, Chip, Grid, Link, Stack, Typography } from "@mui/material";
import React, { memo, useCallback, useMemo, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useBanUserMutation, useTakedownProfileImageMutation, useUnbanUserMutation } from "../../api/user";
import { useGetUserQuery } from "../../api/user";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import ConfirmModal from "../../components/ConfirmModal";

const UserPage = memo(() => {
    const location = useLocation();
    const [isBanModalOpen, setBanModalOpen] = useState<boolean>(false);
    const [isUnbanModalOpen, setUnbanModalOpen] = useState<boolean>(false);
    const [isTakedownProfileImageOpen, setTakedownProfileImageOpen] = useState<boolean>(false);

    const userAddress = useMemo(() => location?.pathname?.split("/")[2], [location]);

    const {
        data: userData,
        refetch: refetchUserData
    } = useGetUserQuery({ userAddress });

    const [postBanUser, { isSuccess: isBanUserSuccess, isError: isBanUserError }] = useBanUserMutation();
    const [postUnbanUser, { isSuccess: isUnbanUserSuccess, isError: isUnbanUserError }] = useUnbanUserMutation();
    const [postTakedownProfileImage, { isSuccess: isTakedownProfileImageSuccess, isError: isTakedownProfileImageError }] = useTakedownProfileImageMutation();

    useEffect(() => {
        if (isBanUserSuccess || isUnbanUserSuccess || isTakedownProfileImageSuccess || isBanUserError || isUnbanUserError || isTakedownProfileImageError) {
            refetchUserData();
            setBanModalOpen(false);
            setUnbanModalOpen(false);
            setTakedownProfileImageOpen(false);
        }
    }, [isBanUserError, isBanUserSuccess, isTakedownProfileImageError, isTakedownProfileImageSuccess, isUnbanUserError, isUnbanUserSuccess, refetchUserData]);

    const openBanModal = useCallback(() => {
        setBanModalOpen(true);
    }, []);

    const openUnbanModal = useCallback(() => {
        setUnbanModalOpen(true);
    }, []);

    const openTakedownProfileImage = useCallback(() => {
        setTakedownProfileImageOpen(true);
    }, []);

    const cancelBan = useCallback(() => {
        setBanModalOpen(false);
    }, []);

    const cancelUnban = useCallback(() => {
        setUnbanModalOpen(false);
    }, []);

    const cancelTakedownProfileImage = useCallback(() => {
        setUnbanModalOpen(false);
    }, []);

    const confirmBan = useCallback(() => {
        postBanUser({ userAddress, reason: "banned" });
    }, [postBanUser, userAddress]);

    const confirmUnban = useCallback(() => {
        postUnbanUser({ userAddress });
    }, [postUnbanUser, userAddress]);

    const confirmTakedownProfileImage = useCallback(() => {
        postTakedownProfileImage({ userAddress, reason: "bad boi" });
    }, [postTakedownProfileImage, userAddress]);

    return (
        <>
            <Box sx={{
                color: "text.primary"
            }}>
                <Grid container>
                    <Grid item xs={4} mt={3}>
                        <img src={userData?.profileImageUrl} style={{
                            width: "100%"
                        }} />
                        {
                            userData?.profileImageUrl && <Box m={2}>
                                <Button variant="contained" color="error" onClick={openTakedownProfileImage}>Takedown Profile Image</Button>
                            </Box>
                        }
                    </Grid>
                    <Grid item xs={8} mt={3}>
                        <Box>
                            <img src={userData?.bannerImageUrl} style={{
                                width: "100%",
                                height: 250
                            }} />
                        </Box>
                        <Box p={2}>
                            <Typography variant="h2">{userData?.name}</Typography>
                            <Typography variant="subtitle1">
                                {userData?.address}
                            </Typography>
                            <Stack direction="row" spacing={1} mt={3} mb={3}>
                                <Chip
                                    icon={<OpenInNewIcon />}
                                    label="Polyscan"
                                    component="a"
                                    href={`https://mumbai.polygonscan.com/address/${userData?.address}`}
                                    target="_blank"
                                    clickable
                                />
                                <Chip
                                    label={userData?.banResults?.length > 0 ? "BANNED" : "Good Standing"}
                                    color={userData?.banResults?.length > 0 ? "error" : "success"}
                                    variant="outlined"
                                />
                            </Stack>
                            <Typography variant="subtitle2" mb={2}>Registration Date: {new Date(userData?.registrationDate).toLocaleString()}</Typography>
                            <Typography variant="subtitle2" mb={2}>Last Login Date: {userData?.lastLoginDate ? new Date(userData?.lastLoginDate).toLocaleString() : "unknown"}</Typography>
                            <Typography variant="subtitle2" mb={2}>Email: {userData?.email}</Typography>
                            <Typography variant="body1" mb={2}>
                                Link: {userData?.link && <Link href={userData?.link} target="_blank">{userData?.link}</Link>}
                            </Typography>
                            <Typography variant="body1">{userData?.bio}</Typography>
                            <Box mt={3}>
                                {
                                    userData?.banResults?.length > 0 ?
                                        <Button variant="contained" color="warning" onClick={openUnbanModal}>Unban</Button> :
                                        <Button variant="contained" color="error" onClick={openBanModal}>Ban</Button>
                                }
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            <ConfirmModal
                isOpen={isBanModalOpen}
                title={`Are you sure you want to ban: ${userData?.name}?`}
                buttonLabel="Ban"
                onClose={cancelBan}
                onConfirm={confirmBan}
            />
            <ConfirmModal
                isOpen={isUnbanModalOpen}
                title={`Are you sure you want to unban: ${userData?.name}?`}
                buttonLabel="Unban"
                onClose={cancelUnban}
                onConfirm={confirmUnban}
            />
            <ConfirmModal
                isOpen={isTakedownProfileImageOpen}
                title={`Are you sure you want to takedown ${userData?.name}'s profile image?`}
                buttonLabel="Takedown"
                onClose={cancelTakedownProfileImage}
                onConfirm={confirmTakedownProfileImage}
            />
        </>
    );
});

export default UserPage;