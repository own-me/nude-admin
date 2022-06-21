import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface User {
    id?: string;
    address?: string;
    name?: string;
    email?: string;
    emailVerified?: boolean;
    birthDate?: string;
    registrationDate?: string;
    lastLoginDate?: string;
    profileImageUrl?: string;
    bannerImageUrl?: string;
    bio?: string;
    link?: string;
    isFollowing?: boolean;
    following?: any[];
    banResults: any[];
    message?: string;
    error?: string;
}

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({ baseUrl: process.env.IS_DEV === "true" ? "http://localhost:3000/" : "https://api.ownme.io/" }),
    endpoints: (builder) => ({
        getUser: builder.query<User, { userAddress: string }>({
            query: ({ userAddress }) => ({
                url: `user/admin/user/${userAddress}`,
                method: "GET",
                headers: {
                    ...(localStorage.getItem("token") && { Authorization: `Bearer ${localStorage.getItem("token")}` })
                }
            })
        }),
        searchUsers: builder.query<User[], { query: string, page: number }>({
            query: ({ query, page }) => ({
                url: "user/admin/users",
                method: "POST",
                body: {
                    query,
                    page
                },
                headers: {
                    ...(localStorage.getItem("token") && { Authorization: `Bearer ${localStorage.getItem("token")}` })
                }
            })
        }),
        banUser: builder.mutation<null, { userAddress: string; reason: string; }>({
            query: ({ userAddress, reason }) => ({
                url: "user/admin/ban",
                method: "POST",
                body: {
                    userAddress,
                    reason
                },
                headers: {
                    ...(localStorage.getItem("token") && { Authorization: `Bearer ${localStorage.getItem("token")}` })
                }
            })
        }),
        unbanUser: builder.mutation<null, { userAddress: string }>({
            query: ({ userAddress }) => ({
                url: "user/admin/unban",
                method: "POST",
                body: {
                    userAddress
                },
                headers: {
                    ...(localStorage.getItem("token") && { Authorization: `Bearer ${localStorage.getItem("token")}` })
                }
            })
        }),
        takedownProfileImage: builder.mutation<null, { userAddress: string, reason: string }>({
            query: ({ userAddress, reason }) => ({
                url: "user/admin/takedown-profile-image",
                method: "POST",
                body: {
                    userAddress,
                    reason
                },
                headers: {
                    ...(localStorage.getItem("token") && { Authorization: `Bearer ${localStorage.getItem("token")}` })
                }
            })
        })
    })
});

export const {
    useGetUserQuery,
    useSearchUsersQuery,
    useBanUserMutation,
    useUnbanUserMutation,
    useTakedownProfileImageMutation
} = userApi;