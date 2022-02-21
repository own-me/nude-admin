import GenericTable from "../../components/GenericTable";
import React, { memo } from "react";
import { useGetNftReportsQuery } from "../../redux/api/nft";

const NftsPage = memo(() => {
    const {
        data: nftData
    } = useGetNftReportsQuery({ page: 0 });

    const headers = Object.keys(nftData?.[0] || []);
    const rows = nftData || [];

    return (
        <div>
            <GenericTable headers={headers} rows={rows} />
        </div>
    );
});

export default NftsPage;