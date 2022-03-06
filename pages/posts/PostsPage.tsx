import GenericTable from "../../components/GenericTable";
import React, { memo, useCallback } from "react";
import { useGetPostsQuery } from "../../redux/api/posts";
import { useNavigate } from "react-router-dom";

const PostsPage = memo(() => {
    const navigate = useNavigate();

    const {
        data: postsData
    } = useGetPostsQuery({ page: 0 });

    const headers = Object.keys(postsData?.posts?.[0] || []);
    const rows = postsData?.posts || [];

    const onRowClick = useCallback((row: any) => {
        navigate(`/post/${row.id}`);
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

export default PostsPage;