import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "./redux/hooks";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/login/LoginPage";
import NftsPage from "./pages/nfts/NftsPage";
import NftPage from "./pages/nfts/NftPage";
import UsersPage from "./pages/users/UsersPage";
import UserPage from "./pages/users/UserPage";
import PostsPage from "./pages/posts/PostsPage";
import PostPage from "./pages/posts/PostPage";

export default function Main() {
    const isLoggedIn = useAppSelector(state => state.app.isLoggedIn);
    const location = useLocation();

    console.log("isLoggedIn", isLoggedIn);

    return (
        <div id="main-container">
            <Navbar />
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/nfts" element={
                    isLoggedIn ? <NftsPage /> : <Navigate to="/login" state={{ from: location }} replace={true} />
                } />
                <Route path="/nft/:tokenId" element={
                    isLoggedIn ? <NftPage /> : <Navigate to="/login" state={{ from: location }} replace={true} />
                } />
                <Route path="/users" element={
                    isLoggedIn ? <UsersPage /> : <Navigate to="/login" state={{ from: location }} replace={true} />
                } />
                <Route path="/user/:userAddress" element={
                    isLoggedIn ? <UserPage /> : <Navigate to="/login" state={{ from: location }} replace={true} />
                } />
                <Route path="/posts" element={
                    isLoggedIn ? <PostsPage /> : <Navigate to="/login" state={{ from: location }} replace={true} />
                } />
                <Route path="/post/:postId" element={
                    isLoggedIn ? <PostPage /> : <Navigate to="/login" state={{ from: location }} replace={true} />
                } />
            </Routes>
        </div>
    );
}