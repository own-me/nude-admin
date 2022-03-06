import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import appReducer from "./slices/app";
import { loginApi } from "./api/login";
import { authApi } from "./api/auth";
import { nftApi } from "./api/nft";
import { userApi } from "./api/users";
import { postsApi } from "./api/posts";

export const store = configureStore({
    reducer: {
        app: appReducer,
        [loginApi.reducerPath]: loginApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [nftApi.reducerPath]: nftApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [postsApi.reducerPath]: postsApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
        loginApi.middleware,
        authApi.middleware,
        nftApi.middleware,
        userApi.middleware,
        postsApi.middleware
    ),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;