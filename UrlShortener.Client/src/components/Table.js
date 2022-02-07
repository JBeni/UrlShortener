import React, { useEffect, useState } from "react";
import {
    MDBTypography,
    MDBRow,
    MDBCol,
    MDBBtn,
    MDBContainer,
} from "mdb-react-ui-kit";
import { initialFormValues } from '../services/ApiConfiguration';
import * as urlService from '../services/url.service';
import { toast } from 'react-hot-toast';

export default function UrlsTable() {
    const [showModal, setShowModal] = useState(false);
    const [selectedRow, setSelectedRow] = useState(0);
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
        setSelectedRow(item.id);
        openModal(true);
    };

    const openModal = (value) => {
        setShowModal(true);
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
                <MDBCol className='col-1'>
                    Clicks
                </MDBCol>
                <MDBCol>
                    Actions
                </MDBCol>
            </MDBRow>
        );
    }

    const getTableBody = () => {
        return (
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
                                onClick={() => { performDelete(item); }}
                            >
                                Delete
                            </MDBBtn>
                        </MDBCol>
                    </MDBRow>
                );
            })
        );
    }

    return (
        <>
            <h4 className="d-flex justify-content-center mt-3 mb-4">Globally Created Shortener Urls</h4>
            <MDBContainer className="col-xxl-12">
                {
                    getTableHead(), getTableBody()
                }
            </MDBContainer>
        </>
    );
}
