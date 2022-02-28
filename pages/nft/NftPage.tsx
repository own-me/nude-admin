import { Box, Grid, Typography } from "@mui/material";
import React, { memo } from "react";
import { useLocation } from "react-router-dom";
import { useGetNftQuery } from "../../redux/api/nft";

const NftPage = memo(() => {
    const location = useLocation();

    const {
        data: nftData
    } = useGetNftQuery({ tokenId: Number(location?.pathname?.split("/")[2]) });

    return (
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
                </Grid>
            </Grid>
        </Box>
    );
});

export default NftPage;