import { Box, Button, Checkbox, Chip, FormControlLabel, FormGroup, Grid, Modal, Typography } from "@mui/material";
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
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <Box>
                            <img src={userData?.profileImageUrl} style={{
                                width: "100%"
                            }} />
                        </Box>
                    </Grid>
                    <Grid item xs={8} mt={3}>
                        <Typography variant="h2">{userData?.name}</Typography>
                        <Typography variant="button" mr={2}>{userData?.address}</Typography>
                        <Chip
                            icon={<OpenInNewIcon />}
                            label="Polyscan"
                            component="a"
                            href={`https://mumbai.polygonscan.com/address/${userData?.address}`}
                            target="_blank"
                            clickable
                        />
                        <Box mt={3} mb={3}>
                            <Chip
                                label={userData?.banResults?.length > 0 ? "BANNED" : "Good Standing"}
                                color={userData?.banResults?.length > 0 ? "error" : "success"}
                                variant="outlined"
                            />
                        </Box>
                        <Typography variant="subtitle1">{userData?.bio}</Typography>
                        <Box mt={3}>
                            <Button variant="contained" color="error" onClick={openBanModal}>Ban</Button>
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
                        <FormControlLabel control={
                            <Checkbox
                                checked={isBanConfirmed}
                                onClick={() => setIsBanConfirmed(!isBanConfirmed)}
                            />
                        }
                        label="I confirm."
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