import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import * as statisticsService from '../../services/statistics.service';
import { Chart, Dataset } from 'react-rainbow-components';

const containerStyles = {
    maxWidth: 600,
};

export default function Charts(props) {
    const [loading, setLoading] = useState(true);
    const [labels, setLabels] = useState([]);
    const [colors, setColors] = useState(['#fe4849', '#ff6837', '#ffcc00', '#1ad1a3', '#1aFFa3']);
    const [dataset, setDataset] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        (async () => {
            await initializeComponent();
        })();
    }, []);

    async function initializeComponent() {
        if (id > 0) {
            var responseBrowser = await statisticsService.getBrowserChartData(id);

            if (responseBrowser.items?.length > 0 || responseBrowser.items !== undefined) {
                var titles = [];
                var dataset = [];
                var value0Count = 0;
                for (var i = 0; i < responseBrowser.items.length; i++) {
                    titles.push(responseBrowser.items[i].name);
                    dataset.push(responseBrowser.items[i].value);
                    if (responseBrowser.items[i].value === 0) value0Count++;
                }
                setLabels( titles );
                setDataset( dataset );
                if (value0Count !== responseBrowser.items.length) {
                    setLoading( false );
                }
            }
        }
    }

    const renderDataset = () => {
        return <Dataset title="Data" values={dataset} backgroundColor={colors} />;
    }

    if (loading === false) {
        return (
            <div className="d-flex justify-content-center mt-5 rainbow-p-vertical_xx-large rainbow-p-horizontal_medium">
                <h4 className="d-flex justify-content-center">Browser Chart</h4>
                <div
                    style={containerStyles}
                    className="rainbow-align-content_center rainbow-m-vertical_large rainbow-m_auto"
                >
                    <Chart labels={labels} type="doughnut" legendPosition="right" disableCurves>
                        {renderDataset()}
                    </Chart>
                </div>
            </div>
        );
    } else {
        return <div className='d-flex justify-content-center mt-5'>
            <h4 className='display-4'>The Browser Chart is not available.</h4>
        </div>
    }
}
