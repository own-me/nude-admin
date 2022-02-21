import GenericTable from "../../components/GenericTable";
import React, { memo } from "react";
import { useGetNftReportsQuery } from "../../redux/api/nft";

const NftsPage = memo(() => {
    const {
        data: nftData
    } = useGetNftReportsQuery({ page: 0 });

    return (
        <div>
            <GenericTable />
        </div>
    );
});

export default NftsPage;