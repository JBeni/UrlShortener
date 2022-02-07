import React, { useEffect, useState } from "react";
import {
    MDBBtn,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
} from "mdb-react-ui-kit";
import * as urlService from '../../services/url.service';

export default function DeleteUrlModal(props) {

    const handleSubmit = (e) => {
		e.preventDefault();
        urlService.deleteUrlShorten(props.id);
        props.handlePopup(false);
	};

    const closeModal = (e) => {
		e.preventDefault();
        props.handlePopup(false);
	};

    return (
        <>
            <MDBModalDialog>
                <MDBModalContent>
                    <MDBModalHeader>
                        <MDBModalTitle>Delete Url</MDBModalTitle>
                        <MDBBtn
                            className="btn-close"
                            color="none"
                            onClick={closeModal}
                        ></MDBBtn>
                    </MDBModalHeader>
                        <MDBModalBody className="display-6" style={{ backgroundColor: '#FFCCCB' }}>
                            Are you sure you want to delete the url?
                        </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color="secondary" onClick={closeModal}>
                            Close
                        </MDBBtn>
                        <MDBBtn color="danger" onClick={handleSubmit}>
                            Delete
                        </MDBBtn>
                    </MDBModalFooter>
                </MDBModalContent>
            </MDBModalDialog>
        </>
    );
}
