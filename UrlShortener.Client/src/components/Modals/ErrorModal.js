import React from "react";
import {
    MDBBtn,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
} from "mdb-react-ui-kit";

export default function Error(props) {

    const closeModal = (e) => {
		e.preventDefault();
        props.handleErrorPopup(false);
	};

    return (
        <>
            <MDBModalDialog>
                <MDBModalContent>
                    <MDBModalHeader>
                        <MDBModalTitle>Url Error</MDBModalTitle>
                        <MDBBtn
                            className="btn-close"
                            color="none"
                            onClick={closeModal}
                        ></MDBBtn>
                    </MDBModalHeader>
                    <MDBModalBody className="display-6" style={{ backgroundColor: '#FFCCCB' }}>
                        Please, provide a valid url
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color="secondary" onClick={closeModal}>
                            Close
                        </MDBBtn>
                    </MDBModalFooter>
                </MDBModalContent>
            </MDBModalDialog>
        </>
    );
}
