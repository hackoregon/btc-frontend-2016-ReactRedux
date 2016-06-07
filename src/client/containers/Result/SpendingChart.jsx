import React, { PropTypes } from 'react';
import BarChart from '../../components/BarChart/BarChart.jsx';
import SizeMe from 'react-sizeme';

// function formatData(arr) {
//     let newData = {
//         labels: [],
//         series: [
//             [], []
//         ]
//     };
//     arr.forEach((item) => {
//         let raised = item.total_in == null
//             ? 0
//             : item.total_in;
//         let spent = item.total_out == null
//             ? 0
//             : (item.total_out);
//         newData.labels.push(item.tran_date);
//         newData.series[0].push(raised);
//         newData.series[1].push(spent);
//     });
//     console.log(d3.extent(newData.series[0]));
//     return newData;
// }

const SizeMeHOC = SizeMe({
  monitorWidth: true,
  monitorHeight: true,
  refreshRate: 16
});
const colors = [
    '#8dd3c7',
    '#ffffb3',
    '#bebada',
    '#fb8072',
    '#80b1d3',
    '#fdb462',
    '#b3de69',
    '#fccde5',
    '#2196F3',
    '#bc80bd',
    '#ccebc5',
    '#ffed6f',
    '#E91E63'
];

// NOTE: dummy data in the state right now
class SpendingChart extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          series: ['Spending'],
          data: [[175000],[13999],[21000],[89640],[3514],[25000],[19999]],
          labels: ['General Operational Expenses',
'Postage',
'Reimbursement for Personal Expenditures',
'Travel Expenses',
'Unknown',
'Management Services',
'Other Advertising (yard signs, buttons, etc.)'],
          colors: colors
      }
  }

  componentWillMount() {
    const {labels, data} = this.props;
    this.setState({...labels, ...data});
  }

  render() {
    // if (_.isArray(this.props.data) && this.props.data.length === 5) {
      return (
        <div {...this.props}
          style={{ display: 'flex',
            flexFlow: 'row nowrap',
            alignItems: 'center'}}>
          <BarChart customStyle={{flex:'1'}}
          data={this.state.data}
          labels={this.state.labels}
          horizontal
          horizontalLabels
          dollarFormat
          colors={this.state.colors}
          opaque
           />
        </div>);
    // } else {
      // return <div>Loading...</div>
    // }
  }
}

export default SizeMeHOC(SpendingChart);