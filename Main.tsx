import React from "react";
import Navbar from "./components/Navbar";
import NftsPage from "./pages/nfts/NftsPage";

export default function Main() {
    return (
        <div id="main-container">
            <Navbar />
            <NftsPage />
        </div>
    );
}