import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Box, Button, Chip, Grid, Stack, Typography, Link } from "@mui/material";
import { useBanNftMutation, useGetNftQuery, useUnbanNftMutation } from "../../redux/api/nft";
import ConfirmModal from "../../components/ConfirmModal";

const NftPage = memo(() => {
    const location = useLocation();
    const [isBanModalOpen, setBanModalOpen] = useState<boolean>(false);
    const [isUnbanModalOpen, setUnbanModalOpen] = useState<boolean>(false);

    const tokenId = useMemo(() => Number(location?.pathname?.split("/")[2]), [location]);

    const {
        data: nftData,
        refetch: refetchNftData
    } = useGetNftQuery({ tokenId });

    const [postBanNft, { isSuccess: isBanNftSuccess, isError: isBanNftError }] = useBanNftMutation();
    const [postUnbanNft, { isSuccess: isUnbanNftSuccess, isError: isUnbanNftError }] = useUnbanNftMutation();

    useEffect(() => {
        if (isBanNftSuccess || isUnbanNftSuccess || isBanNftError || isUnbanNftError) {
            refetchNftData();
            setBanModalOpen(false);
            setUnbanModalOpen(false);
        }
    }, [isBanNftError, isBanNftSuccess, isUnbanNftError, isUnbanNftSuccess, refetchNftData]);

    const openBanModal = useCallback(() => {
        setBanModalOpen(true);
    }, []);

    const openUnbanModal = useCallback(() => {
        setUnbanModalOpen(true);
    }, []);

    const cancelBan = useCallback(() => {
        setBanModalOpen(false);
    }, []);

    const cancelUnban = useCallback(() => {
        setUnbanModalOpen(false);
    }, []);

    const confirmBan = useCallback(() => {
        postBanNft({ tokenId, reason: "banned" });
    }, [postBanNft, tokenId]);

    const confirmUnban = useCallback(() => {
        postUnbanNft({ tokenId });
    }, [postUnbanNft, tokenId]);

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
                        <Stack direction="row" spacing={1} mt={3} mb={3}>
                            <Chip
                                icon={<OpenInNewIcon />}
                                label="Polyscan"
                                component="a"
                                href={`https://mumbai.polygonscan.com/tx/${nftData?.nft?.transactionHash}`}
                                target="_blank"
                                clickable
                            />
                            <Chip
                                label={nftData?.banRecords?.length > 0 ? "BANNED" : "Good Standing"}
                                color={nftData?.banRecords?.length > 0 ? "error" : "success"}
                                variant="outlined"
                            />
                        </Stack>
                        <Typography variant="subtitle1" mb={2}>
                            Creator: <Link href={`/user/${nftData?.nft?.recipient}`}>{nftData?.nft?.recipient}</Link>
                        </Typography>
                        <Typography variant="subtitle1" mb={2}>
                            Owner: <Link href={`/user/${nftData?.owner?.address}`}>{nftData?.owner?.address}</Link>
                        </Typography>
                        <Typography variant="subtitle2" mb={2}>Views: {nftData?.viewsCount}</Typography>
                        <Typography variant="subtitle2" mb={2}>Likes: {nftData?.likesCount}</Typography>
                        <Typography variant="subtitle1" mb={2}>{nftData?.nft.tokenURI?.description}</Typography>
                        <Typography variant="button">{nftData?.nft.tokenURI?.hashtags}</Typography>
                        <Box mt={3}>
                            {
                                nftData?.banRecords?.length > 0 ?
                                    <Button variant="contained" color="warning" onClick={openUnbanModal}>Unban</Button> :
                                    <Button variant="contained" color="error" onClick={openBanModal}>Ban</Button>
                            }
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            <ConfirmModal
                isOpen={isBanModalOpen}
                title="Do you want to ban this NFT?"
                buttonLabel="Ban"
                onClose={cancelBan}
                onConfirm={confirmBan}
            />
            <ConfirmModal
                isOpen={isUnbanModalOpen}
                title="Do you want to unban this NFT?"
                buttonLabel="Unban"
                onClose={cancelUnban}
                onConfirm={confirmUnban}
            />
        </>
    );
});

export default NftPage;