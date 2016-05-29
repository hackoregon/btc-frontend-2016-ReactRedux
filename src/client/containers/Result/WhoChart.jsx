import React, {Component} from 'react';
import BarChart from '../../components/BarChart/BarChart.jsx';
import SizeMe from 'react-sizeme';
const SizeMeHOC = SizeMe({
  monitorWidth: true,
  monitorHeight: true,
  refreshRate: 16
});
class WhoChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
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

    //componentDidMount() {
    //  //setTimeout(this.renderChart,1000);
    //  window.addEventListener('resize', this.handleResize);
    //}

    currentScreenWidth() {
        return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    }
    handleResize(){
      const { height } = this.props.size;
      let divHeight = (height*0.7);
      this.setState({
        divHeight: divHeight
      });
      this.renderChart();
    }

    renderChart(){
      return (<BarChart customStyle={{flex:'1'}}
      data={this.props.data}
      labels={this.state.labels}
      dollarFormat
      colors={this.state.colors}
      height={this.props.size.height*0.7}
      opaque
      colorBySeries />);
    }
    componentWillUnmount() {
      //window.removeEventListener('resize', this.handleResize);
    }
    render() {
      if (_.isArray(this.props.data) && this.props.data.length === 5) {
        return (
          <div {...this.props}
            style={{ display: 'flex',
              flexFlow: 'row nowrap',
              alignItems: 'center'}}>
            {this.renderChart()}
          </div>);
      } else {
        return <div>Loading...</div>
      }
    }
}

export default SizeMeHOC(WhoChart);