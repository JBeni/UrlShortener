import React, { useState } from "react";
import {
    MDBTypography,
    MDBInput,
    MDBRow,
    MDBCol,
    MDBBtn,
    MDBModal
} from "mdb-react-ui-kit";
import { initialFormValues, copyToClipboard } from '../services/helper.service';
import * as urlService from '../services/url.service';
import ErrorModal from "./Modals/ErrorModal";

export default function AddUrlForm() {
    const [showError, setShowError] = useState(false);
    const [values, setValues] = useState(initialFormValues);
    const [url, setUrl] = useState('');

    const handleErrorPopup = (value) => {
        setShowError(value);
    }

    const handleInputChange = (e) => {
        setUrl(e.target.value);
	};

    async function createUrlShortener(e) {
        e.preventDefault();
        if (values.urlKey.length <= 0) {
            setShowError(true);
            return;
        }
        var response = await urlService.createUrlShorten(url);
        setValues(response.item);
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

                <MDBModal show={showError} setShow={setShowError} tabIndex='-1'>
                    <ErrorModal handlePopup={handleErrorPopup.bind(this)} />
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
