import GenericTable from "../../components/GenericTable";
import React, { memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useGetUsersQuery } from "../../redux/api/users";

const UsersPage = memo(() => {
    const navigate = useNavigate();

    const {
        data: usersData
    } = useGetUsersQuery({});

    const headers = Object.keys(usersData?.[0] || []);
    const rows = usersData || [];

    const onRowClick = useCallback((row: any) => {
        navigate(`/user/${row.address}`);
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

export default UsersPage;