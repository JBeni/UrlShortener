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
import * as urlService from '../services/url.service';

export default function UrlModal(props) {
    const [isDelete, setIsDelete] = useState(true);

    useEffect(() => {
        if (props.id > 0) {
            setIsDelete(true);
        }
    }, []);


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
                        {
                            isDelete ? <MDBModalTitle>Delete Url</MDBModalTitle>
                                : <MDBModalTitle>Url Error</MDBModalTitle>
                        }
                        <MDBBtn
                            className="btn-close"
                            color="none"
                            onClick={closeModal}
                        ></MDBBtn>
                    </MDBModalHeader>
                        {
                            isDelete
                                ? <MDBModalBody className="display-6" style={{ backgroundColor: '#FFCCCB' }}>
                                    Are you sure you want to delete the url?
                                </MDBModalBody>
                                : <MDBModalBody className="display-6" style={{ backgroundColor: '#FFCCCB' }}>
                                    Please, provide a valid url
                                </MDBModalBody>
                        }
                    <MDBModalFooter>
                        <MDBBtn color="secondary" onClick={closeModal}>
                            Close
                        </MDBBtn>
                        {
                            isDelete === true &&
                            <MDBBtn color="danger" onClick={handleSubmit}>
                                Delete
                            </MDBBtn>
                        }
                    </MDBModalFooter>
                </MDBModalContent>
            </MDBModalDialog>
        </>
    );
}
