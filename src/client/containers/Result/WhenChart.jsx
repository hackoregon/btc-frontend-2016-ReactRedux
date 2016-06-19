import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import ChartistGraph from 'react-chartist';
import SizeMe from 'react-sizeme';
import moment from 'moment';
import {Grid, Col, Row} from 'react-flexbox-grid';
import Legend from '../../components/Legend/Legend.jsx';
import _ from 'lodash';
import d3 from 'd3';
import MonthField from '../../components/Select/Month.jsx'
import {getMonthsData} from '../../actions';

import './Select.css';
import './Line.css';

// const SizeMeHOC = SizeMe({monitorWidth: true, monitorHeight: true, refreshRate: 16});

// const biPolarLineChartOptions = {
//     high: 3,
//     low: -3,
//     showArea: true,
//     showLine: false,
//     showPoint: false,
//     axisX: {
//         showLabel: false,
//         showGrid: false
//     }
// }
const simpleLineChartOptions = {
    showArea: true,
    showLine: true,
    showPoint: false,
    axisX: {
        showLabel: false,
        showGrid: false
    }
}

function formatData(arr) {

    let newData = {
        labels: [],
        series: [
            [], []
        ]
    };
    if(arr && arr.length){
    arr.forEach((item) => {
        let raised = item.totalIn == null
            ? 0
            : item.totalIn;
        let spent = item.totalOut == null
            ? 0
            : (item.totalOut);
        newData.labels.push(item.tranDate);
        newData.series[0].push(raised);
        newData.series[1].push(spent);
    });
    console.log(d3.extent(newData.series[0]));
    return newData;
  }
}

const biPolarBarChartOptions = {
    axisX: {
        labelInterpolationFnc: function(value, index) {
            return index % 2 === 0
                ? value
                : null;
        }
    }
}
const barStackedOptions = {
  low: 0,
  stackBars: true,
  axisX: {
      showLabel: false,
      showGrid: false
  },
  axisY: {
    labelInterpolationFnc: function(value) {
      return (value) + 'k';
    }
  }
}

const barGroupOptions = {
  seriesBarDistance: 10,
  axisX: {
    offset: 60
  },
  axisY: {
    labelInterpolationFnc: function(value) {
      return value
    },
    scaleMinSpace: 15
  }
}
const barOptions = {
  seriesBarDistance: 10
};

const barResponsiveOptions = [
  ['screen and (max-width: 640px)', {
    seriesBarDistance: 5,
    axisX: {
      labelInterpolationFnc: function (value) {
        return value[0];
      }
    }
  }]
];

function loadMonths(months,year,data,props){
  console.log(props);
  const {getMonthsData} = props;
  getMonthsData(months,year,data);
}
class WhenChart extends React.Component {
    constructor(props) {
        super(props);
        this.handleSelect = this.handleSelect.bind(this);
    }

    componentWillMount() {
      const {data,year} = this.props

    }
    componentWillReceiveProps(nextProps,nextState) {
      const {data,year,months} = nextProps;
      if(!_.isEmpty(data)){

        const today = moment.now();
        const lastMonth = moment(today).subtract(1,'months').format('MMM');
        // let dataSet = null;
        // if(_.isEmpty(months)){
         let dataSet = formatData(nextProps.data[nextProps.year][nextProps.month]) || formatData(data[year][lastMonth]);
         this.setState({
           year: year,
           data: data,
           dispData: dataSet
         });
        // }

      }
    }

    shouldComponentUpdate(nextProps, nextState) {
      const {data,year} = nextProps;
      if(typeof year == 'string' && !_.isEmpty(data) ){
          return true;
      }
      return false;
    }


      // let expensesByMonth = d3.nest()
      // .key(function(d) {
      //   return moment(d.tran_date).format('MMM');
      // })
      //   .rollup(function(v) {
      //   return v
      // }).map(data);

      // let years = Object.keys(expensesByMonth);


    // handleSelect (option) {
    //
    //   // const {data} = this.props;
    //   // let expensesByMonth = d3.nest()
    //   // .key(function(d) {
    //   //   return moment(d.tran_date).format('MMM');
    //   // }).rollup(function(v) {
    //   //   return v
    //   // }).map(data);
    //
    // console.log('You selected ', option.label)
    // let dataSet = formatData(this.state.data[this.state.year][option.label]);
    // this.setState({
    //   selected: option.label,
    //   dispData: dataSet
    //  });
    // }

    handleSelect(options) {
      const months = options.split(',');
      const monthData = [...months.map(m => { return this.state.data[this.state.year][m] })];
      let concacted = [];
      for (var i = 0; i < monthData.length; i++) {
        concacted.push(...monthData[i])
      }
      // loadMonths(months,this.state.year,this.state.data,this.props);


      this.setState({
        months: months,
        dispData: formatData(concacted)
        // year: this.refs.nav.refs.subnav.refs.year.state.year
      });

    }
    // getContributors (input, callback) {
  	// 	input = input.toLowerCase();
  	// 	let options = this.state.opts.filter(i => {
  	// 		return i.github.substr(0, input.length) === input;
  	// 	});
  	// 	let data = {
  	// 		options: options.slice(0, this.state.max),
  	// 		complete: options.length <= this.state.max,
  	// 	};
    //
  	// }

    renderGraph(dataSet){

    }

    render() {

        const {data,year} = this.props;
        // const expensesByMonth = d3.nest()
        // .key(function(d) {
        //   return moment(d.tran_date).format('MMM');
        // })
        // .rollup(function(v) {
        //   return v
        // }).map(data);
        if(_.isEmpty(data)){
          return (<div>Loading...</div>)
        } else {

        const labels= Object.keys(this.state.data[this.state.year]);
        // let selectKeys = Object.keys();
        // let dataSet = formatData(expensesByMonth['2015']['May']);

        // const placeHolderValue = typeof this.state.selected === 'string' ? this.state.selected : this.state.selected.label;


        return (<Grid {...this.props} >
          <Row center='xs' xs={6} md={6} lg={6} >
            <Col xs={12} style={{padding:'0.5rem'}}>
            <Legend inRow labels={['Recieved','Spent']} colors={['#F6675A','#AFAAD4']}/>
            </Col >
          </Row>

          <ChartistGraph data={this.state.dispData} options={simpleLineChartOptions}  type={'Line'} redraw/>
            <Col center = 'xs' xs={12}>
            <MonthField ref={'month'} months={labels} year={this.state.year} onToggleSelect={this.handleSelect} />
            </Col>
        </Grid>
      );
    }
  }
}

WhenChart.contextTypes = {router: React.PropTypes.object.isRequired}

function mapStateToProps(state,ownProps) {
const {entities: {
    concactedMonths
  }} = state;
  const { data, year } = ownProps;
  return {concactedMonths, data, year};
}

export default connect(mapStateToProps, {
  getMonthsData
})(WhenChart);