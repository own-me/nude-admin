import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface TokenURIInterface {
    title: string;
    description: string;
    image: string;
    hashtags: string[];
}

export interface NftInterface {
    tokenId: number;
    recipient: string;
    address: string;
    transactionHash: string;
    transactionIndex: number;
    blockHash: string;
    blockNumber: number;
    tokenURI: TokenURIInterface;
    price: string;
}

export interface NftBanRecord {
    id: number;
    tokenId: number;
    reason: string;
    adminAddress: string;
    dateBanned: string;
}

interface NftReport {
    id: number;
    tokenId: number;
    reason: string;
    reporterAddress: string;
    dateReported: string;
}

interface GetNftResponse {
    nft: NftInterface;
    banRecords?: NftBanRecord[];
    owner?: any;
    likesCount: number;
    viewsCount: number;
}

export const nftApi = createApi({
    reducerPath: "nftApi",
    baseQuery: fetchBaseQuery({ baseUrl: process.env.IS_DEV === "true" ? "http://localhost:3000/" : "https://api.ownme.io/" }),
    endpoints: (builder) => ({
        getNft: builder.query<GetNftResponse, { tokenId: number }>({
            query: ({ tokenId }) => ({
                url: `nft/admin/${tokenId}`,
                method: "GET",
                headers: {
                    ...(localStorage.getItem("token") && { Authorization: `Bearer ${localStorage.getItem("token")}` })
                }
            })
        }),
        searchNfts: builder.query<NftInterface[], { query: string, page: number }>({
            query: ({ query, page }) => ({
                url: "nft/admin/nfts",
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
        searchNftReports: builder.query<NftReport[], { query: string, page: number }>({
            query: ({ query, page }) => ({
                url: "nft/admin/reports",
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
        banNft: builder.mutation<null, { tokenId: number, reason: string }>({
            query: ({ tokenId, reason }) => ({
                url: "nft/admin/ban",
                method: "POST",
                body: {
                    tokenId,
                    reason
                },
                headers: {
                    ...(localStorage.getItem("token") && { Authorization: `Bearer ${localStorage.getItem("token")}` })
                }
            })
        }),
        unbanNft: builder.mutation<null, { tokenId: number }>({
            query: ({ tokenId }) => ({
                url: "nft/admin/unban",
                method: "POST",
                body: {
                    tokenId
                },
                headers: {
                    ...(localStorage.getItem("token") && { Authorization: `Bearer ${localStorage.getItem("token")}` })
                }
            })
        })
    })
});

export const {
    useGetNftQuery,
    useSearchNftsQuery,
    useSearchNftReportsQuery,
    useBanNftMutation,
    useUnbanNftMutation
} = nftApi;