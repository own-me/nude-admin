import { Box, Button, Checkbox, FormControlLabel, FormGroup, Grid, Modal, Typography } from "@mui/material";
import React, { memo, useCallback, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { useBanNftMutation, useGetNftQuery } from "../../redux/api/nft";

const PostPage = memo(() => {
    const location = useLocation();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isBanConfirmed, setIsBanConfirmed] = useState<boolean>(false);

    const tokenId = useMemo(() => Number(location?.pathname?.split("/")[2]), [location]);

    const {
        data: nftData
    } = useGetNftQuery({ tokenId });

    const [postBanNft, {
        isSuccess: isPostBanNftSuccess,
    }] = useBanNftMutation();

    const openBanModal = useCallback(() => {
        setIsModalOpen(true);
    }, []);

    const confirmBan = useCallback(() => {
        postBanNft({ tokenId, reason: "banned" });
    }, [postBanNft, tokenId]);

    return (
        <>
            <Box sx={{
                color: "text.primary"
            }}>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <Box>
                            <img src={nftData?.nft.tokenURI?.image} style={{
                                width: "100%"
                            }} />
                        </Box>
                    </Grid>
                    <Grid item xs={8}>
                        <Typography variant="h2">{nftData?.nft.tokenURI?.title}</Typography>
                        <Typography variant="subtitle1">{nftData?.nft.tokenURI?.description}</Typography>
                        <Typography variant="button">{nftData?.nft.tokenURI?.hashtags}</Typography>
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
                        Are you sure you want to ban this NFT?
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

export default PostPage;