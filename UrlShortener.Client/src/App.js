import React from "react";
import Navbar from "./components/Navbar";

import { Toaster } from 'react-hot-toast';
import UrlsTable from "./components/Table";
import AddUrlForm from "./components/AddUrl";

function App() {
    return (
        <>
            <Navbar />
            <AddUrlForm />
            <UrlsTable />

            <Toaster position="bottom-center" reverseOrder={false} />
        </>
    );
}

export default App;
