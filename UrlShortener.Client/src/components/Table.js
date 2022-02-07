import React, { useEffect, useState } from "react";
import {
    MDBTypography,
    MDBRow,
    MDBCol,
    MDBBtn,
    MDBContainer,
    MDBModal
} from "mdb-react-ui-kit";
import { notifyToastInfo, copyToClipboard } from '../services/helper.service';
import * as urlService from '../services/url.service';
import DeleteUrlModal from "./Modals/DeleteUrlModal";

export default function UrlsTable() {
    const [showDeleteUrl, setShowDeleteUrl] = useState(false);
    const [showViewCharts, setShowViewCharts] = useState(false);
    const [selectedRow, setSelectedRow] = useState(0);
    const [urlsList, setUrlsList] = useState([]);

    useEffect(() => {
        (async () => {
            await getUrlsList();
        })();
    }, []);

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

    const viewCharts = (item) => {
        setSelectedRow(item.id);
        setShowViewCharts(true);
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
                    <MDBRow className="col-xxl-12">
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
                                onClick={() => { viewCharts(item); }}
                            >
                                View Charts
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
