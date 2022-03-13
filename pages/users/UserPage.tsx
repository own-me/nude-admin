import { Box, Button, Checkbox, Chip, FormControlLabel, FormGroup, Grid, Link, Modal, Stack, Typography } from "@mui/material";
import React, { memo, useCallback, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { useBanUserMutation } from "../../redux/api/users";
import { useGetUserQuery } from "../../redux/api/users";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

const UserPage = memo(() => {
    const location = useLocation();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isBanConfirmed, setIsBanConfirmed] = useState<boolean>(false);

    const userAddress = useMemo(() => location?.pathname?.split("/")[2], [location]);

    const {
        data: userData
    } = useGetUserQuery({ userAddress });

    const [postBanUser, {
        isSuccess: isPostBanNftSuccess,
    }] = useBanUserMutation();

    const openBanModal = useCallback(() => {
        setIsModalOpen(true);
    }, []);

    const confirmBan = useCallback(() => {
        postBanUser({ userAddress, reason: "banned" });
    }, [postBanUser, userAddress]);

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
                        <Box m={2}>
                            <Button variant="contained" color="error" onClick={openBanModal}>Takedown Profile Image</Button>
                        </Box>
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
                                        <Button variant="contained" color="warning" onClick={openBanModal}>Unban</Button> :
                                        <Button variant="contained" color="error" onClick={openBanModal}>Ban</Button>
                                }
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            <Modal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            >
                <Box sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 400,
                    bgcolor: "background.paper",
                    border: "2px solid #000",
                    color: "text.primary",
                    boxShadow: 24,
                    p: 4
                }}>
                    <Typography variant="h6" component="h2">
                        Are you sure you want to ban: {userData?.name}?
                    </Typography>
                    <FormGroup>
                        <FormControlLabel
                            label="I confirm."
                            control={
                                <Checkbox
                                    checked={isBanConfirmed}
                                    onClick={() => setIsBanConfirmed(!isBanConfirmed)}
                                />
                            }
                        />
                        <Box mt={3}>
                            <Button variant="contained" color="error" onClick={confirmBan} disabled={!isBanConfirmed}>Ban</Button>
                        </Box>
                    </FormGroup>
                </Box>
            </Modal>
        </>
    );
});

export default UserPage;