import React, { useState } from "react";
import {
    MDBNavbar,
    MDBContainer,
    MDBIcon,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBNavbarToggler,
    MDBNavbarBrand,
    MDBCollapse,
} from "mdb-react-ui-kit";
import Dashboard from "./Dashboard";
import { Routes , Route } from 'react-router-dom';
import Charts from "./Charts/Charts";

export default function Navbar() {
    const [showNavColorThird, setShowNavColorThird] = useState(false);

    return (
        <>
            <MDBNavbar expand="lg" light style={{ backgroundColor: "#e3f2fd" }}>
                <MDBContainer fluid>
                    <MDBNavbarBrand>Url Shortener App</MDBNavbarBrand>
                    <MDBNavbarToggler
                        type="button"
                        data-target="#navbarColor02"
                        aria-controls="navbarColor02"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                        onClick={() => setShowNavColorThird(!showNavColorThird)}
                    >
                        <MDBIcon icon="bars" fas />
                    </MDBNavbarToggler>
                    <MDBCollapse show={showNavColorThird} navbar>
                        <MDBNavbarNav className="d-flex justify-content-end me-auto mb-2 mb-lg-0">
                            <MDBNavbarItem className="active">
                                <MDBNavbarLink aria-current="page" href="#">
                                    Home
                                </MDBNavbarLink>
                            </MDBNavbarItem>
                            <MDBNavbarItem>
                                <MDBNavbarLink href="#">Login</MDBNavbarLink>
                            </MDBNavbarItem>
                            <MDBNavbarItem>
                                <MDBNavbarLink href="#">Register</MDBNavbarLink>
                            </MDBNavbarItem>
                        </MDBNavbarNav>
                    </MDBCollapse>
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
