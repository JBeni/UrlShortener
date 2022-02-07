import React from "react";
import { Toaster } from 'react-hot-toast';
import Navbar from "./components/Navbar";

function App() {
    return (
        <>
            <Navbar />
            <Toaster position="bottom-center" reverseOrder={false} />
        </>
    );
}

export default App;
