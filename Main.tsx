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
    const { loggedIn } = useAppSelector(state => state.user);
    const location = useLocation();

    console.log("loggedIn", loggedIn);

    return (
        <div id="main-container">
            {loggedIn && <Navbar />}
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/" element={
                    loggedIn ? <NftsPage /> : <Navigate to="/login" state={{ from: location }} replace={true} />
                } />
                <Route path="/nfts" element={
                    loggedIn ? <NftsPage /> : <Navigate to="/login" state={{ from: location }} replace={true} />
                } />
                <Route path="/nft/:tokenId" element={
                    loggedIn ? <NftPage /> : <Navigate to="/login" state={{ from: location }} replace={true} />
                } />
                <Route path="/users" element={
                    loggedIn ? <UsersPage /> : <Navigate to="/login" state={{ from: location }} replace={true} />
                } />
                <Route path="/user/:userAddress" element={
                    loggedIn ? <UserPage /> : <Navigate to="/login" state={{ from: location }} replace={true} />
                } />
                <Route path="/posts" element={
                    loggedIn ? <PostsPage /> : <Navigate to="/login" state={{ from: location }} replace={true} />
                } />
                <Route path="/post/:postId" element={
                    loggedIn ? <PostPage /> : <Navigate to="/login" state={{ from: location }} replace={true} />
                } />
            </Routes>
        </div>
    );
}