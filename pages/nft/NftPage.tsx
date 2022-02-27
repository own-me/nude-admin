import React, { memo } from "react";
import { useLocation } from "react-router-dom";
import { useGetNftQuery } from "../../redux/api/nft";

const NftPage = memo(() => {
    const location = useLocation();

    console.log(location);

    const {
        data: nftData
    } = useGetNftQuery({ tokenId: Number(location?.pathname?.split("/")[2]) });

    return (
        <div>
            <p>NFT</p>
        </div>
    );
});

export default NftPage;