import React, {Component} from 'react';
import {Grid,Row,Col} from 'react-flexbox-grid';
import BarChart from '../../components/BarChart/BarChart.jsx';
import SizeMe from 'react-sizeme';
import Spinner from 'react-spinkit';
import _ from 'lodash';
const SizeMeHOC = SizeMe({
  monitorWidth: true,
  monitorHeight: true,
  refreshRate: 16
});
class WhoChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            series: ['New Funds','Transferred Funds'],
            height: 0
        }
    }

    componentWillMount() {
     const {height} = this.props.size;
     this.setState({
         height: height
     });
    }

    componentWillReceiveProps(nextProps) {
      const {data, labels, colors} = nextProps;
        this.setState({
            data: data,
            labels: labels,
            colors: colors
        });
    }

    shouldComponentUpdate(nextProps,nextState){
      if(nextState.data != undefined && nextProps.data.length > 0){
        return true;
      }
      return false;
    }

    renderChart(height){
      // const spinner = ( <Spinner spinnerName='cube-grid' /> );
      //
      // if(this.state.data && this.state.data){
      //   debugger;
      // }
      return (
        <BarChart
      data={this.state.data}
      labels={this.state.labels}
      dollarFormat
      colors={this.state.colors}
      height={200}
      opaque
      colorBySeries
      />);
    }
// height={height*0.65}
// {this.renderChart(height)}
    render() {
      const { height } = this.props.size;
      const spinner = ( <Spinner spinnerName='cube-grid' /> )
      if (_.isArray(this.state.data) && this.state.data.length > 1) {
        return (
          <Grid style={{flex:'1'}}>
           <Row middle="xs">
            <Col xs={12}>
              {this.renderChart(height)}
          </Col>
        </Row>
      </Grid>);
      } else {
        return (
          <Row center={'xs'} xs={12}>
          <Spinner spinnerName='cube-grid' />
          </Row>
        );
      }
    }
}

export default SizeMeHOC(WhoChart);

// <div
//   style={{ display: 'flex',
//     flex: '1',
//     flexFlow: 'row nowrap',
//     alignItems: 'center',
//   justifyContent: 'center'}}>