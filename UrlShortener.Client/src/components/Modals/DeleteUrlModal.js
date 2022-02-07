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

    const closeModal = (e, itemValue) => {
		e.preventDefault();
        props.handleDeleteUrlPopup(false, itemValue);
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
                            onClick={(e) => closeModal(e, 0)}
                        ></MDBBtn>
                    </MDBModalHeader>
                        <MDBModalBody className="display-6" style={{ backgroundColor: '#FFCCCB' }}>
                            Are you sure you want to delete the url?
                        </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color="secondary" onClick={(e) => closeModal(e, 0)}>
                            Close
                        </MDBBtn>
                        <MDBBtn color="danger" onClick={(e) => closeModal(e, 1)}>
                            Delete
                        </MDBBtn>
                    </MDBModalFooter>
                </MDBModalContent>
            </MDBModalDialog>
        </>
    );
}
