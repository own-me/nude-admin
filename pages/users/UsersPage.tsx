import GenericTable from "../../components/GenericTable";
import React, { memo, useCallback, useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useGetUsersQuery, User } from "../../redux/api/user";
import { Box, Tab, Tabs } from "@mui/material";

enum UsersPageTabs {
    LIST = "LIST",
    REPORTS = "REPORTS",
    BANNED = "BANNED"
}

const UsersPage = memo(() => {
    const navigate = useNavigate();
    const [tab, setTab] = useState<UsersPageTabs>(UsersPageTabs.LIST);

    const {
        data: usersData
    } = useGetUsersQuery(null, {
        skip: tab !== UsersPageTabs.LIST
    });

    const onUserClick = useCallback((row: User) => {
        navigate(`/user/${row.address}`);
    }, [navigate]);

    const handleTabChange = useCallback((event: ChangeEvent, newTab: UsersPageTabs) => {
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
                    <Tab value={UsersPageTabs.LIST} label={UsersPageTabs.LIST} />
                </Tabs>
            </Box>
            {
                tab === UsersPageTabs.LIST && <GenericTable
                    headers={Object.keys(usersData?.[0] || [])}
                    rows={usersData}
                    onRowClick={onUserClick}
                />
            }
        </div>
    );
});

export default UsersPage;