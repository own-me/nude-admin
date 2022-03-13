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
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
    endpoints: (builder) => ({
        getUsers: builder.query<User[], null>({
            query: () => ({
                url: "user/admin/users",
                method: "GET",
                headers: {
                    ...(localStorage.getItem("token") && { Authorization: `Bearer ${localStorage.getItem("token")}` })
                }
            })
        }),
        getUser: builder.query<User, { userAddress: string }>({
            query: ({ userAddress }) => ({
                url: `user/admin/user/${userAddress}`,
                method: "GET",
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
        })
    })
});

export const {
    useGetUsersQuery,
    useGetUserQuery,
    useBanUserMutation,
    useUnbanUserMutation
} = userApi;