import React from 'react';
import { Chart, Dataset, ButtonGroup, Button } from 'react-rainbow-components';

const containerStyles = {
    maxWidth: 600,
};

export default class DoughnutChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            colors: ['#fe4849', '#ff6837', '#ffcc00', '#1ad1a3'],
            // labels: ['Data-Red', 'Data-Orange', 'Data-Yellow', 'Data-Green'],
            // dataset: [
            //     {
            //         value: 10,
            //         color: '#fe4849',
            //     },
            //     {
            //         value: 15,
            //         color: '#ff6837',
            //     },
            //     {
            //         value: 42,
            //         color: '#ffcc00',
            //     },
            //     {
            //         value: 33,
            //         color: '#1ad1a3',
            //     },
            // ],

            labels: [],
            dataset: [],
        };
    }

    componentDidMount() {
        console.log(this.props.data);
        if (this.props.data !== undefined) {
            var index = 0;
            for (var i = 0; i < this.props.data.length; i++) {
                this.setState({ labels: [...this.state.labels, this.props.data[i].name] });
                var newDataset = { value: this.props.data[i].value, color: this.state.colors[index] };
                index++;
                this.setState({ dataset: [...this.state.dataset, newDataset] });
            }
        }
    }

    renderDataset() {
        let data = [];
        let colors = [];
        const { dataset } = this.state;
        dataset.forEach(d => {
            data.push(d.value);
            colors.push(d.color);
        });

        return <Dataset title="Data" values={data} backgroundColor={colors} />;
    }

    render() {
        const { labels } = this.state;

        return (
            <div className="rainbow-p-vertical_xx-large rainbow-p-horizontal_medium">
                <div
                    style={containerStyles}
                    className="rainbow-align-content_center rainbow-m-vertical_large rainbow-m_auto"
                >
                    <Chart labels={labels} type="doughnut" legendPosition="right" disableCurves>
                        {this.renderDataset()}
                    </Chart>
                </div>
            </div>
        );
    }
}
