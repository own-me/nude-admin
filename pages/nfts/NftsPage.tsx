import GenericTable from "../../components/GenericTable";
import React, { memo, useCallback, useState, ChangeEvent } from "react";
import { NftBanRecord, NftInterface, useSearchNftReportsQuery, useSearchNftsQuery } from "../../redux/api/nft";
import { useNavigate } from "react-router-dom";
import { Box, Tab, Tabs } from "@mui/material";

enum NftsPageTabs {
    LIST = "LIST",
    REPORTS = "REPORTS",
    BANNED = "BANNED"
}

const NftsPage = memo(() => {
    const navigate = useNavigate();
    const [tab, setTab] = useState<NftsPageTabs>(NftsPageTabs.LIST);

    const {
        data: searchNftsData
    } = useSearchNftsQuery({ query: "*", page: 0 }, {
        skip: tab !== NftsPageTabs.LIST
    });

    const {
        data: nftReportsData
    } = useSearchNftReportsQuery({ query: "*", page: 0 }, {
        skip: tab !== NftsPageTabs.REPORTS
    });

    const onNftClick = useCallback((row: NftInterface) => {
        navigate(`/nft/${row.tokenId}`);
    }, [navigate]);

    const onReportClick = useCallback((row: NftBanRecord) => {
        navigate(`/nft/${row.tokenId}`);
    }, [navigate]);

    const handleTabChange = useCallback((event: ChangeEvent, newTab: NftsPageTabs) => {
        setTab(newTab);
    }, []);

    return (
        <div>
            <Box>
                <Tabs
                    value={tab}
                    onChange={handleTabChange}
                    textColor="secondary"
                    indicatorColor="secondary"
                >
                    <Tab value={NftsPageTabs.LIST} label={NftsPageTabs.LIST} />
                    <Tab value={NftsPageTabs.REPORTS} label={NftsPageTabs.REPORTS} />
                    <Tab value={NftsPageTabs.BANNED} label={NftsPageTabs.BANNED} />
                </Tabs>
            </Box>
            {
                tab === NftsPageTabs.LIST && <GenericTable
                    headers={Object.keys(searchNftsData?.[0] || [])}
                    rows={searchNftsData}
                    onRowClick={onNftClick}
                />
            }
            {
                tab === NftsPageTabs.REPORTS && <GenericTable
                    headers={Object.keys(nftReportsData?.[0] || [])}
                    rows={nftReportsData}
                    onRowClick={onReportClick}
                />
            }
            {/* {
                tab === NftsPageTabs.BANNED && <GenericTable
                    headers={headers}
                    rows={rows}
                    onRowClick={onRowClick}
                />
            } */}
        </div>
    );
});

export default NftsPage;