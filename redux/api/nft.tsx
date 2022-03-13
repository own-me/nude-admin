import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface GetNftReportsRequest {
    page: number;
}

interface GetNftRequest {
    tokenId: number;
}

interface BanNftRequest {
    tokenId: number;
    reason: string;
}

interface UnbanNftRequest {
    tokenId: number;
}

export interface TokenURIInterface {
    title: string;
    description: string;
    image: string;
    hashtags: string[];
}

interface NftBanRecord {
    id: number;
    tokenId: number;
    reason: string;
    adminAddress: string;
    dateBanned: string;
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

interface GetNftResponse {
    nft: NftInterface;
    banRecords?: NftBanRecord[];
    owner?: any;
    likesCount: number;
    viewsCount: number;
}

export const nftApi = createApi({
    reducerPath: "nftApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
    endpoints: (builder) => ({
        getNftReports: builder.query<NftInterface[], GetNftReportsRequest>({
            query: ({ page }) => ({
                url: `nft/admin/reports/?page=${page}`,
                method: "GET",
                headers: {
                    ...(localStorage.getItem("token") && { Authorization: `Bearer ${localStorage.getItem("token")}` })
                }
            })
        }),
        getNft: builder.query<GetNftResponse, GetNftRequest>({
            query: ({ tokenId }) => ({
                url: `nft/admin/${tokenId}`,
                method: "GET",
                headers: {
                    ...(localStorage.getItem("token") && { Authorization: `Bearer ${localStorage.getItem("token")}` })
                }
            })
        }),
        banNft: builder.mutation<null, BanNftRequest>({
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
        unbanNft: builder.mutation<null, UnbanNftRequest>({
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
    useGetNftReportsQuery,
    useGetNftQuery,
    useBanNftMutation,
    useUnbanNftMutation
} = nftApi;