import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Post {
    id: number;
    childOf?: number | null;
    text: string;
    userAddress: string;
    userName?: string;
    dateCreated: Date;
    likesCount: number;
    commentsCount: number;
    imageUrl?: string | null;
    profileImageUrl?: string;
    comments: Post[];
    isLiked: boolean;
}

interface GetPostRequest {
    postId: string;
}

interface GetUserPostsRequest {
    userAddress: string;
}

interface GetPostsRequest {
    page: number;
}

interface GetPostsResponse {
    message?: string;
    error?: string;
    posts?: Post[];
}

export const postsApi = createApi({
    reducerPath: "postsApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
    endpoints: (builder) => ({
        getPost: builder.query<Post, GetPostRequest>({
            query: ({ postId }) => ({
                url: `posts/${postId}`,
                method: "GET",
                headers: {
                    ...(localStorage.getItem("token") && { Authorization: `Bearer ${localStorage.getItem("token")}` })
                }
            })
        }),
        getPosts: builder.query<GetPostsResponse, GetPostsRequest>({
            query: ({ page }) => ({
                url: `posts/admin/posts?page=${page}`,
                method: "GET",
                headers: {
                    ...(localStorage.getItem("token") && { Authorization: `Bearer ${localStorage.getItem("token")}` })
                }
            })
        }),
        getUserPosts: builder.query<Post[], GetUserPostsRequest>({
            query: ({ userAddress }) => ({
                url: `posts/user/${userAddress}`,
                method: "GET",
                headers: {
                    ...(localStorage.getItem("token") && { Authorization: `Bearer ${localStorage.getItem("token")}` })
                }
            })
        })
    })
});

export const {
    useGetPostQuery,
    useGetPostsQuery,
    useGetUserPostsQuery
} = postsApi;