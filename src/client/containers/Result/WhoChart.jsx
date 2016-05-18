import React, {Component} from 'react';
import BarChart from '../../components/BarChart/BarChart.jsx';

class WhoChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                [10000], [22000], [3223240], [123130],[2133]
            ],
            series: ['Finances'],
            labels: [
                'PAC', 'Business', 'Large Donors', 'Grassroots', 'Party'
            ],
            colors: ['#bebada', '#fb8072', '#8dd3c7', '#b3de69','#80b1d3']
        }
    }

    componentWillMount() {
        // this.setState({
        //     data: [
        //         [this.props.data.total],
        //         [this.props.data.spent],
        //         [this.props.data.cash_on_hand],
        //         [this.props.data.debt]
        //     ]
        // });
    }

    render() {
        return (
          <div style = {{ width:'700px'}}>
          <BarChart
          data={this.state.data}
          labels={this.state.labels}
          dollarFormat
          colors={this.state.colors}
          height={240}
          opaque
          colorBySeries />
          </div>);
    }
}

export default WhoChart;