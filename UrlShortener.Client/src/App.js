import React, { useState } from 'react';
import "./App.css";
import {
    MDBTypography,
    MDBInput,
    MDBRow,
    MDBCol,
    MDBBtn,
    MDBNavbar,
    MDBContainer,
    MDBIcon,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBNavbarToggler,
    MDBNavbarBrand,
    MDBCollapse
} from "mdb-react-ui-kit";

function App() {
    const [showNavColor, setShowNavColor] = useState(false);
    const [showNavColorSecond, setShowNavColorSecond] = useState(false);
    const [showNavColorThird, setShowNavColorThird] = useState(false);

    return (
        <>
            <MDBNavbar expand="lg" light style={{ backgroundColor: "#e3f2fd" }} className="d-flex flex-row-reverse">
                <MDBContainer fluid>
                    <MDBNavbarBrand href="#">Navbar</MDBNavbarBrand>
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
                        <MDBNavbarNav className="me-auto mb-2 mb-lg-0">
                            <MDBNavbarItem className="active">
                                <MDBNavbarLink aria-current="page" href="#">
                                    Home
                                </MDBNavbarLink>
                            </MDBNavbarItem>
                            <MDBNavbarItem>
                                <MDBNavbarLink href="#">Features</MDBNavbarLink>
                            </MDBNavbarItem>
                            <MDBNavbarItem>
                                <MDBNavbarLink href="#">Pricing</MDBNavbarLink>
                            </MDBNavbarItem>
                            <MDBNavbarItem>
                                <MDBNavbarLink href="#">About</MDBNavbarLink>
                            </MDBNavbarItem>
                        </MDBNavbarNav>
                    </MDBCollapse>
                </MDBContainer>
            </MDBNavbar>

            <div className="container col-md-12 shadow-lg p-3 bg-white rounded mt-5 mb-3">
                <div className="row d-flex justify-content-center mb-4">
                    <MDBRow tag="form" className="gy-2 gx-3 align-items-center">
                        <MDBCol size="auto" className="col-md-8">
                            <MDBInput
                                id="form13Example1"
                                label="Enter your link to create a short one"
                            />
                        </MDBCol>
                        <MDBCol size="auto" className="col-md-3">
                            <MDBBtn type="submit" className="w-75">
                                Submit
                            </MDBBtn>
                        </MDBCol>
                    </MDBRow>
                </div>

                <div className="row">
                    <MDBCol size="auto" className="col-md-6">
                        <MDBTypography
                            note
                            noteColor="primary"
                            className="text-truncate"
                        >
                            sdkjfksjdfksdjfkjdsf asdlkalskdlaskdlas dsf sd fsd
                            fsddsfsdfsdfsdfsdfsd f sdf sd fsdfdsfsdfdsfdsfsdf
                        </MDBTypography>
                    </MDBCol>
                    <MDBCol
                        size="auto"
                        className="col-md-3"
                        style={{ marginLeft: "30px" }}
                    >
                        <MDBTypography note noteColor="primary">
                            sdkjfksjdfksdjfkjdsf asdlkalskdlask
                        </MDBTypography>
                    </MDBCol>
                    <MDBCol size="auto" className="mt-1">
                        <MDBBtn
                            type="submit"
                            color="link"
                            className="border border-primary border-2"
                        >
                            Copy
                        </MDBBtn>
                    </MDBCol>
                </div>
            </div>
        </>
    );
}

export default App;
