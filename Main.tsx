import GenericTable from "./components/GenericTable";
import React from "react";
import Navbar from "./components/Navbar";

export default function Main() {
    return (
        <div id="main-container">
            <Navbar />
            <GenericTable />
        </div>
    );
}