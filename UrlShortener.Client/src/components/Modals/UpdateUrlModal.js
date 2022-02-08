import React, { useEffect } from "react";
import {
    MDBBtn,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
    MDBTypography,
    MDBCol
} from "mdb-react-ui-kit";
import { copyToClipboard } from '../../services/helper.service';

export default function UpdateUrlModal(props) {

    useEffect(() => {
        console.log(props.item);
    }, []);

    const closeModal = (e, itemValue) => {
		e.preventDefault();
        props.handleUpdateUrlPopup(false, itemValue);
	};

    return (
        <>
            <MDBModalDialog>
                <MDBModalContent style={{ width: '900px' }}>
                    <MDBModalHeader>
                        <MDBModalTitle>Updated Url</MDBModalTitle>
                        <MDBBtn
                            className="btn-close"
                            color="none"
                            onClick={closeModal}
                        ></MDBBtn>
                    </MDBModalHeader>
                    <MDBModalBody>
                        <div className="container col-md-12 shadow-lg p-3 bg-white rounded mt-3 mb-3">
                        {
                            props.item.urlKey.length > 5 &&
                            <div className="row mt-4">
                                <MDBCol size="auto" className="col-md-6">
                                    <MDBTypography
                                        note
                                        noteColor="primary"
                                        className="text-truncate"
                                    >
                                        {props.item.originalUrl}
                                    </MDBTypography>
                                </MDBCol>
                                <MDBCol
                                    size="auto"
                                    className="col-md-3"
                                    style={{ marginLeft: "30px" }}
                                >
                                    <MDBTypography note noteColor="primary" className="text-truncate">
                                        {props.item.shortUrl}
                                    </MDBTypography>
                                </MDBCol>
                                <MDBCol size="auto" className="mt-1">
                                    <MDBBtn
                                        type="submit"
                                        color="link"
                                        className="border border-primary border-2"
                                        onClick={() => { copyToClipboard(props.item.shortUrl); }}
                                    >
                                        Copy
                                    </MDBBtn>
                                </MDBCol>
                            </div>
                        }
                        </div>
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
