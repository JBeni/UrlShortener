import React from "react";
import {
    MDBNavbar,
    MDBContainer,
    MDBNavbarBrand,
} from "mdb-react-ui-kit";
import Dashboard from "./Dashboard";
import { Routes , Route } from 'react-router-dom';
import Charts from "./Charts/Charts";

export default function Navbar() {
    return (
        <>
            <MDBNavbar expand="lg" light style={{ backgroundColor: "#e3f2fd" }}>
                <MDBContainer fluid>
                    <MDBNavbarBrand>Url Shortener App</MDBNavbarBrand>
                </MDBContainer>
            </MDBNavbar>

            <Routes>
                <Route path="/" exact element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/chart/:id" element={<Charts />} />
            </Routes>
        </>
    );
}
