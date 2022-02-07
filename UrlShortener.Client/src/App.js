import React from "react";
import Navbar from "./components/Navbar";

import { Toaster } from 'react-hot-toast';
import UrlsTable from "./components/Table";
import AddUrlForm from "./components/AddUrl";
import LineChart from "./components/Charts/LinearChart";
import DoughnutChartExample from "./components/Charts/DoughnuChart";

function App() {
    return (
        <>
            <Navbar />
            <AddUrlForm />
            <UrlsTable />

            <br/><br/>

            <DoughnutChartExample />

            <br/><br/>
            <br/><br/>


            <Toaster position="bottom-center" reverseOrder={false} />
        </>
    );
}

export default App;
