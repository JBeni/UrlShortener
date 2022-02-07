import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import * as statisticsService from '../services/statistics.service';
import DoughnutChart from "./Charts/DoughnuChart";

export default function Charts(props) {
    const [browserChart, setBrowserChart] = useState();
    const [oSChart, setOSChart] = useState();

    const { id } = useParams();

    useEffect(() => {
        console.log(id);
        (async () => {
            await initializeComponent();
        })();
    }, []);

    async function initializeComponent() {
        if (id > 0) {
            var responseBrowser = await Promise.resolve( await statisticsService.getBrowserChartData(id));
            var responseOS = await statisticsService.getOSChartData(id);
            setBrowserChart(responseBrowser.items);
            setOSChart(responseOS.items);
        }
    }

    return (
        <>
            <div className="mt-5 ml-5">
                <DoughnutChart data={browserChart} />
            </div>
        </>
    );
}
