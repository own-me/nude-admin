import GenericTable from "../../components/GenericTable";
import React, { memo, useCallback } from "react";
import { useGetNftReportsQuery } from "../../redux/api/nft";

const NftsPage = memo(() => {
    const {
        data: nftData
    } = useGetNftReportsQuery({ page: 0 });

    const headers = Object.keys(nftData?.[0] || []);
    const rows = nftData || [];

    const onRowClick = useCallback((row: any) => {
        console.log(row);
    }, []);

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