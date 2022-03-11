import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface User {
    id?: string;
    address?: string;
    name?: string;
    birthDate?: string;
    registrationDate?: string;
    lastLoginDate?: string;
    profileImageUrl?: string;
    bannerImageUrl?: string;
    bio?: string;
    link?: string;
    isFollowing?: boolean;
    following?: any[];
    message?: string;
    error?: string;
}

interface GetUserRequest {
    userAddress: string;
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
        getUser: builder.query<User, GetUserRequest>({
            query: ({ userAddress }) => ({
                url: `user/admin/user/${userAddress}`,
                method: "GET",
                headers: {
                    ...(localStorage.getItem("token") && { Authorization: `Bearer ${localStorage.getItem("token")}` })
                }
            })
        })
    })
});

export const {
    useGetUsersQuery,
    useGetUserQuery
} = userApi;