import React, { useEffect, useState } from "react";
import {
    MDBTypography,
    MDBRow,
    MDBCol,
    MDBBtn,
    MDBContainer,
    MDBModal,
    MDBInput
} from "mdb-react-ui-kit";
import { initialFormValues, notifyToastInfo, copyToClipboard } from '../services/helper.service';
import * as urlService from '../services/url.service';
import DeleteUrlModal from "./Modals/DeleteUrlModal";
import ErrorModal from "./Modals/ErrorModal";
import { useNavigate  } from "react-router-dom";

export default function Dashboard() {
    const [showDeleteUrl, setShowDeleteUrl] = useState(false);
    const [selectedRow, setSelectedRow] = useState(0);
    const [urlsList, setUrlsList] = useState([]);
    const [showError, setShowError] = useState(false);
    const [urlCreated, setUrlCreated] = useState(initialFormValues);
    const [url, setUrl] = useState({ originalUrl: ''});

    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            await getUrlsList();
        })();
    }, []);

    const handleErrorPopup = (value) => {
        setShowError(value);
    }

    const handleInputChange = (e) => {
        setUrl({ originalUrl: e.target.value });
	};

    async function createUrlShortener(e) {
        e.preventDefault();
        if (url.originalUrl?.length <= 0) {
            setShowError(true);
            return;
        }
        var response = await urlService.createUrlShorten(url.originalUrl);
        setUrlCreated(response.item);
        setUrl({ originalUrl: '' });
        await getUrlsList();
    }

    async function getUrlsList() {
        var response = await Promise.resolve(await urlService.getUrlsData());
        setUrlsList(response.items);
    }

    const handleDeleteUrlPopup = async (value, isDelete) => {
        setShowDeleteUrl(value);
        if (isDelete === 1) {
            await urlService.deleteUrlShorten(selectedRow);
            notifyToastInfo("The Url was deleted");
            await getUrlsList();
        }
    }

    const performDelete = (item) => {
        setSelectedRow(item.id);
        setShowDeleteUrl(true);
    }

    const getTableHead = () => {
        return (
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
                <MDBCol>
                    Clicks
                </MDBCol>
                <MDBCol className="col-md-4">
                    Actions
                </MDBCol>
            </MDBRow>
        );
    }

    const getTableBody = () => {
        return (
            urlsList.map((item) => {
                return (
                    <MDBRow key={item.id} className="col-xxl-12">
                        <MDBCol className="col-md-3">
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
                        <MDBCol className="col-2">
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
                        <MDBCol className="col-md-4">
                            <MDBBtn
                                type="submit"
                                color="primary"
                                style={{ marginRight: '10px' }}
                            >
                                Update
                            </MDBBtn>
                            <MDBBtn
                                type="submit"
                                color="danger"
                                style={{ marginRight: '10px' }}
                                onClick={() => { performDelete(item); }}
                            >
                                Delete
                            </MDBBtn>
                            <MDBBtn
                                type="submit"
                                color="secondary"
                                style={{ marginRight: '10px' }}
                                onClick={() => { navigate(`chart/${item.id}`); }}
                            >
                                View Charts
                            </MDBBtn>
                        </MDBCol>
                    </MDBRow>
                );
            })
        );
    }

    const getUrlForm = () => {
        return (
            <div className="container col-md-12 shadow-lg p-3 bg-white rounded mt-5 mb-5">
                <div className="row d-flex justify-content-center mb-1">
                    <MDBRow tag="form" className="gy-2 gx-3 align-items-center">
                        <MDBCol size="auto" className="col-md-8">
                            <MDBInput
                                value={url.originalUrl}
                                onChange={handleInputChange}
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
                        <ErrorModal handleErrorPopup={handleErrorPopup.bind(this)} />
                    </MDBModal>
                </div>

                {
                    urlCreated.urlKey.length > 5 &&
                    <div className="row mt-4">
                        <MDBCol size="auto" className="col-md-6">
                            <MDBTypography
                                note
                                noteColor="primary"
                                className="text-truncate"
                            >
                                {urlCreated.originalUrl}
                            </MDBTypography>
                        </MDBCol>
                        <MDBCol
                            size="auto"
                            className="col-md-3"
                            style={{ marginLeft: "30px" }}
                        >
                            <MDBTypography note noteColor="primary" className="text-truncate">
                                {urlCreated.shortUrl}
                            </MDBTypography>
                        </MDBCol>
                        <MDBCol size="auto" className="mt-1">
                            <MDBBtn
                                type="submit"
                                color="link"
                                className="border border-primary border-2"
                                onClick={() => { copyToClipboard(urlCreated.shortUrl); }}
                            >
                                Copy
                            </MDBBtn>
                        </MDBCol>
                    </div>
                }
            </div>
        );
    }

    return (
        <>
            {
                getUrlForm()
            }
            <h4 className="d-flex justify-content-center mt-3 mb-4">Globally Created Shortener Urls</h4>
            <MDBContainer className="col-xxl-12">
                {
                    getTableHead()
                }
                {
                    getTableBody()
                }
            </MDBContainer>

            <MDBModal show={showDeleteUrl} setShow={setShowDeleteUrl} tabIndex='-1'>
                <DeleteUrlModal id={selectedRow} handleDeleteUrlPopup={handleDeleteUrlPopup.bind(this)} />
            </MDBModal>
        </>
    );
}
