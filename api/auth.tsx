import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface AuthRequest {
    address: string;
    signature: string;
    nonce: string;
}

interface AuthResponse {
    address: string;
    message: string;
    token: string;
}

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({ baseUrl: process.env.IS_DEV === "true" ? "http://localhost:3000/" : "https://api.ownme.io/" }),
    endpoints: (builder) => ({
        postAuth: builder.mutation<AuthResponse, AuthRequest>({
            query: ({ address, signature, nonce }) => ({
                url: "auth/",
                method: "POST",
                body: {
                    address,
                    signature,
                    nonce
                }
            })
        })
    })
});

export const { usePostAuthMutation } = authApi;