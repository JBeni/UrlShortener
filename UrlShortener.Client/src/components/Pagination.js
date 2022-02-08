import React from "react";
import {
    MDBPagination,
    MDBPaginationItem,
    MDBPaginationLink,
} from "mdb-react-ui-kit";

export default function Pagination() {
    return (
        <nav aria-label="">
            <MDBPagination circle className="justify-content-center mt-3 mb-0">
                <MDBPaginationItem>
                    <MDBPaginationLink
                        href="#"
                        tabIndex={-1}
                        aria-disabled="true"
                    >
                        Previous
                    </MDBPaginationLink>
                </MDBPaginationItem>
                <MDBPaginationItem>
                    <MDBPaginationLink href="#">1</MDBPaginationLink>
                </MDBPaginationItem>
                <MDBPaginationItem active>
                    <MDBPaginationLink href="#">
                        2 <span className="visually-hidden">(current)</span>
                    </MDBPaginationLink>
                </MDBPaginationItem>
                <MDBPaginationItem>
                    <MDBPaginationLink href="#">3</MDBPaginationLink>
                </MDBPaginationItem>
                <MDBPaginationItem>
                    <MDBPaginationLink href="#">Next</MDBPaginationLink>
                </MDBPaginationItem>
            </MDBPagination>
        </nav>
    );
}
