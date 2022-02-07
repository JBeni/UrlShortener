import React, { useEffect, useState } from "react";
import {
    MDBTypography,
    MDBInput,
    MDBRow,
    MDBCol,
    MDBBtn,
    MDBContainer,
    MDBModal
} from "mdb-react-ui-kit";
import { initialFormValues } from './services/ApiConfiguration';
import * as urlService from './services/url.service';
import Navbar from "./components/Navbar";
import UrlModal from "./components/UrlModal";
import { Toaster, toast } from 'react-hot-toast';

function App() {
    const [showModal, setShowModal] = useState(false);
    const [selectedRow, setSelectedRow] = useState(0);
    const [values, setValues] = useState(initialFormValues);
    const [url, setUrl] = useState('');
    const [urlsList, setUrlsList] = useState([]);

    useEffect(() => {
        (async () => {
            var response = await Promise.resolve(await urlService.getUrlsData());
            setUrlsList(response.items);
        })();
    }, []);

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

    const performDelete = (item) => {
        setSelectedRow(item);
        openModal(true);
    };

    const openModal = (value) => {
        setShowModal(true);
    }

    return (
        <>
            <Navbar />

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
                        <UrlModal id={selectedRow} handlePopup={handlePopup.bind(this)} />
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

            <h4 className="d-flex justify-content-center mt-3 mb-4">Globally Created Shortener Urls</h4>
            <MDBContainer className="col-xxl-12">
                <MDBRow className="mb-3">
                    <MDBCol className='col-md-4'>
                        Original Url
                    </MDBCol>
                    <MDBCol className='col-md-2'>
                        Short Url
                    </MDBCol>
                    <MDBCol className='col-md-2'>
                        Url Key
                    </MDBCol>
                    <MDBCol className='col-1'>
                        Clicks
                    </MDBCol>
                    <MDBCol>
                        Actions
                    </MDBCol>
                </MDBRow>
                {
                    urlsList.map((item) => {
                        return (
                            <MDBRow className="col-xxl-12">
                                <MDBCol className="col-md-4">
                                    <MDBTypography note noteColor="primary" className="text-truncate" onClick={() => { copyToClipboard(item.originalUrl); }}>
                                        <button style={{ border: 'none', padding: '0', background: 'none' }}>
                                            {item.originalUrl}
                                        </button>
                                    </MDBTypography>
                                </MDBCol>
                                <MDBCol className="col-md-2">
                                    <MDBTypography note noteColor="primary" className="text-truncate" onClick={() => { copyToClipboard(item.shortUrl); }}>
                                        <button style={{ border: 'none', padding: '0', background: 'none' }}>
                                            {item.shortUrl}
                                        </button>
                                    </MDBTypography>
                                </MDBCol>
                                <MDBCol className="col-md-2">
                                    <MDBTypography note noteColor="primary" className="text-truncate" onClick={() => { copyToClipboard(item.urlKey); }}>
                                        <button style={{ border: 'none', padding: '0', background: 'none' }}>
                                            {item.urlKey}
                                        </button>
                                    </MDBTypography>
                                </MDBCol>
                                <MDBCol className="col-1">
                                    <MDBTypography note noteColor="primary" className="text-truncate">
                                        {item.clicks}
                                    </MDBTypography>
                                </MDBCol>
                                <MDBCol>
                                    <MDBBtn
                                        type="submit"
                                        color="primary"
                                        className="border"
                                        style={{ marginRight: '10px' }}
                                    >
                                        Update
                                    </MDBBtn>
                                    <MDBBtn
                                        type="submit"
                                        color="danger"
                                        className="border"
                                        style={{ marginRight: '10px' }}
                                        onClick={() => { performDelete(item.id); }}
                                    >
                                        Delete
                                    </MDBBtn>
                                </MDBCol>
                            </MDBRow>
                        );
                    })
                }
            </MDBContainer>


            <Toaster position="bottom-center" reverseOrder={false} />
        </>
    );
}

export default App;
