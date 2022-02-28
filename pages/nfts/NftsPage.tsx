import GenericTable from "../../components/GenericTable";
import React, { memo, useCallback } from "react";
import { useGetNftReportsQuery } from "../../redux/api/nft";
import { useNavigate } from "react-router-dom";

const NftsPage = memo(() => {
    const navigate = useNavigate();

    const {
        data: nftData
    } = useGetNftReportsQuery({ page: 0 });

    const headers = Object.keys(nftData?.[0] || []);
    const rows = nftData || [];

    const onRowClick = useCallback((row: any) => {
        navigate(`/nft/${row.tokenId}`);
    }, [navigate]);

    return (
        <div>
            <GenericTable
                headers={headers}
                rows={rows}
                onRowClick={onRowClick}
            />
        </div>
    );
});

export default NftsPage;