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

export const postsApi = createApi({
    reducerPath: "postsApi",
    baseQuery: fetchBaseQuery({ baseUrl: process.env.IS_DEV === "true" ? "http://localhost:3000/" : "https://api.ownme.io/" }),
    endpoints: (builder) => ({
        getPost: builder.query<Post, { postId: string }>({
            query: ({ postId }) => ({
                url: `posts/${postId}`,
                method: "GET",
                headers: {
                    ...(localStorage.getItem("token") && { Authorization: `Bearer ${localStorage.getItem("token")}` })
                }
            })
        }),
        getPosts: builder.query<Post[], { page: number }>({
            query: ({ page }) => ({
                url: `posts/admin/posts?page=${page}`,
                method: "GET",
                headers: {
                    ...(localStorage.getItem("token") && { Authorization: `Bearer ${localStorage.getItem("token")}` })
                }
            })
        }),
        getUserPosts: builder.query<Post[], { userAddress: string }>({
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