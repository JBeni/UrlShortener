import React, { useState } from "react";
import {
    MDBTypography,
    MDBInput,
    MDBRow,
    MDBCol,
    MDBBtn,
    MDBModal
} from "mdb-react-ui-kit";
import { initialFormValues } from '../services/ApiConfiguration';
import * as urlService from '../services/url.service';
import ErrorModal from "./Modals/ErrorModal";
import { toast } from 'react-hot-toast';
import DeleteUrlModal from "./Modals/DeleteUrlModal";

export default function AddUrlForm() {
    const [showModal, setShowModal] = useState(false);
    const [selectedRow, setSelectedRow] = useState(0);
    const [values, setValues] = useState(initialFormValues);
    const [url, setUrl] = useState('');

    const handlePopup = (value) => {
        setShowModal(value);
        setSelectedRow(0);
    }

    const handleInputChange = (e) => {
        setUrl(e.target.value);
	};

    async function createUrlShortener(e) {
        e.preventDefault();

        if (values.urlKey.length <= 0) {
            setShowModal(true);
            return;
        }

        var response = await urlService.createUrlShorten(url);
        setValues(response.item);
    }

    const copyToClipboard = (value) => {
        navigator.clipboard.writeText(value);
        notifyToastInfo("Value copied to clipboard");
    }

    const notifyToastInfo = (message) => {
        toast.success(message, {
            position: 'bottom-center',
            duration: 3000,
        });
    }

    return (
        <div className="container col-md-12 shadow-lg p-3 bg-white rounded mt-5 mb-5">
            <div className="row d-flex justify-content-center mb-1">
                <MDBRow tag="form" className="gy-2 gx-3 align-items-center">
                    <MDBCol size="auto" className="col-md-8">
                        <MDBInput
                            onChange={handleInputChange }
                            placeholder="Enter your url to create a short one"
                            label="Url"
                        />
                    </MDBCol>
                    <MDBCol size="auto" className="col-md-3">
                        <button type="submit" className=" btn btn-success w-75" onClick={(e) => { createUrlShortener(e); }}>
                            Submit
                        </button>
                    </MDBCol>
                </MDBRow>

                <MDBModal show={showModal} setShow={showModal} tabIndex='-1'>
                    <ErrorModal handlePopup={handlePopup.bind(this)} />
                </MDBModal>

                <MDBModal show={showModal} setShow={showModal} tabIndex='-1'>
                    <DeleteUrlModal id={selectedRow} handlePopup={handlePopup.bind(this)} />
                </MDBModal>
            </div>

            {
                values.urlKey.length > 5 &&
                <div className="row mt-4">
                    <MDBCol size="auto" className="col-md-6">
                        <MDBTypography
                            note
                            noteColor="primary"
                            className="text-truncate"
                        >
                            {values.originalUrl}
                        </MDBTypography>
                    </MDBCol>
                    <MDBCol
                        size="auto"
                        className="col-md-3"
                        style={{ marginLeft: "30px" }}
                    >
                        <MDBTypography note noteColor="primary" className="text-truncate">
                            {values.shortUrl}
                        </MDBTypography>
                    </MDBCol>
                    <MDBCol size="auto" className="mt-1">
                        <MDBBtn
                            type="submit"
                            color="link"
                            className="border border-primary border-2"
                            onClick={() => { copyToClipboard(values.shortUrl); }}
                        >
                            Copy
                        </MDBBtn>
                    </MDBCol>
                </div>
            }
        </div>
    );
}
