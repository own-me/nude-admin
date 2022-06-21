import GenericTable from "../../components/GenericTable";
import React, { memo, useCallback, useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchUsersQuery, User } from "../../api/user";
import { Box, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Tab, Tabs } from "@mui/material";
import { Search } from "@mui/icons-material";

enum UsersPageTabs {
    LIST = "LIST",
    REPORTS = "REPORTS",
    BANNED = "BANNED"
}

const UsersPage = memo(() => {
    const navigate = useNavigate();

    const [tab, setTab] = useState<UsersPageTabs>(UsersPageTabs.LIST);
    const [searchInput, setSearchInput] = useState<string>("");

    const {
        data: searchUsersData
    } = useSearchUsersQuery({ query: searchInput || "*", page: 0 }, {
        skip: tab !== UsersPageTabs.LIST
    });

    const onUserClick = useCallback((row: User) => {
        navigate(`/user/${row.address}`);
    }, [navigate]);

    const handleTabChange = useCallback((event: ChangeEvent, newTab: UsersPageTabs) => {
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
                    <Tab value={UsersPageTabs.LIST} label={UsersPageTabs.LIST} />
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
                tab === UsersPageTabs.LIST && <GenericTable
                    headers={Object.keys(searchUsersData?.[0] || [])}
                    rows={searchUsersData}
                    onRowClick={onUserClick}
                />
            }
        </div>
    );
});

export default UsersPage;