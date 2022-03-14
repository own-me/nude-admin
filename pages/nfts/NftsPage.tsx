import GenericTable from "../../components/GenericTable";
import React, { memo, useCallback, useState, ChangeEvent } from "react";
import { NftBanRecord, NftInterface, useSearchNftReportsQuery, useSearchNftsQuery } from "../../redux/api/nft";
import { useNavigate } from "react-router-dom";
import { Box, Tab, Tabs, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from "@mui/material";
import { Search } from "@mui/icons-material";

enum NftsPageTabs {
    LIST = "LIST",
    REPORTS = "REPORTS"
}

const NftsPage = memo(() => {
    const navigate = useNavigate();

    const [tab, setTab] = useState<NftsPageTabs>(NftsPageTabs.LIST);
    const [searchInput, setSearchInput] = useState<string>("");

    const {
        data: searchNftsData
    } = useSearchNftsQuery({ query: searchInput || "*", page: 0 }, {
        skip: tab !== NftsPageTabs.LIST
    });

    const {
        data: nftReportsData
    } = useSearchNftReportsQuery({ query: searchInput || "*", page: 0 }, {
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

    const handleSearchInputChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setSearchInput(event.target.value);
    }, []);

    return (
        <div>
            <Box sx={{ display: "flex", justifyContent: "space-between", p: 1 }}>
                <Tabs
                    value={tab}
                    onChange={handleTabChange}
                    textColor="secondary"
                    indicatorColor="secondary"
                >
                    <Tab value={NftsPageTabs.LIST} label={NftsPageTabs.LIST} />
                    <Tab value={NftsPageTabs.REPORTS} label={NftsPageTabs.REPORTS} />
                </Tabs>
                <FormControl sx={{ width: 200 }} variant="outlined">
                    <InputLabel htmlFor="search-input">Search</InputLabel>
                    <OutlinedInput
                        id="search-input"
                        type="text"
                        value={searchInput}
                        onChange={handleSearchInputChange}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    edge="end"
                                >
                                    <Search />
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Search"
                    />
                </FormControl>
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
        </div>
    );
});

export default NftsPage;