import React, {PropTypes} from 'react';
import ChartistGraph from 'react-chartist';
import SizeMe from 'react-sizeme';
import moment from 'moment';
import d3 from 'd3';
import _ from 'lodash';
import './Select.css';
import './Line.css';
import MonthField from '../../components/Select/Month.jsx'
const SizeMeHOC = SizeMe({monitorWidth: true, monitorHeight: true, refreshRate: 16});

const simpleLineChartData = {
    labels: [
        'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'
    ],
    series: [
        [
            12, 9, 7, 8, 5
        ],
        [
            2, 1, 3.5, 7, 3
        ],
        [1, 3, 4, 5, 6]
    ]
}

const biPolarLineChartData = {
    labels: [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8
    ],
    series: [
        [
            2.5,
            2,
            1,
            0.5,
            1,
            0.5,
            -1,
            -2.5
        ],
        [
            -2,
            -1,
            -2,
            -1,
            -2.5,
            -1,
            -2,
            -1
        ],
        [
            2,
            2,
            3,
            1,
            -2,
            0,
            1,
            0
        ],
        [
            0,
            0,
            0,
            1,
            2,
            2.5,
            2,
            1
        ]
    ]
}
const biPolarLineChartOptions = {
    high: 3,
    low: -3,
    showArea: true,
    showLine: false,
    showPoint: false,
    axisX: {
        showLabel: false,
        showGrid: false
    }
}
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

const biPolarBarChartData = {
    labels: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
    ],
    series: [
        [
            1,
            2,
            4,
            8,
            6,
            -2,
            -1,
            -4,
            -6,
            -2
        ],
        [
            -1,
            -4,
            -6,
            -2,
            8,
            6,
            -2
        ]
    ]
};
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
// const expensesByMonth = d3.nest().key(function(d) {
//   return d.tran_date.split("-")[0];
//   }).rollup(function(v) {
//   return v
//   }).map(dataSet);
//
// var expensesTotalByYear = d3.nest().key(function(d) {
//     return d.tran_date.split("-")[0];
// }).rollup(function(v) {
//     return d3.sum(v, function(d) {
//         return d.total_out;
//     });
// }).map(dataSet);
// console.log(expensesByMonth);
//
// var expensesByMonth = d3.nest().key(d => moment(d.tran_date).format('MM_YYYY')).rollup(function(v) {
//     return d3.sum(v, function(d) {
//         return d.total_out;
//     });
// }).map(dataSet);
// console.log(JSON.stringify(expensesByMonth));
//
//
// function splitData(data) {
//
// }

// NOTE: dummy data in the state right now
class WhenChart extends React.Component {
    constructor(props) {
        super(props);
        this.handleSelect = this.handleSelect.bind(this);
    }

    componentWillMount() {
      const {data,year} = this.props
    }
    componentWillReceiveProps(nextProps) {
      const {data,year} = nextProps;
      if(!_.isEmpty(data)){
        this.setState({
          year: year,
          data: data
        });
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

    handleSelect(month) {

      console.log('month choice',month);

      this.setState({
        month: month,
        dispData: this.state.data[this.state.year][month]
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
        let today = moment.now();
        // let thisYear = moment(today).format('YYYY');
        let lastMonth = moment(today).subtract(1,'months').format('MMM');
        let dataSet = formatData(this.state.data[this.state.year][this.state.month]) || formatData(data[year][lastMonth]);

        return (<div {...this.props} >
          <MonthField ref={'month'} months={labels} year={this.state.year} style={{ width:'3rem'}} onToggleSelect={this.handleSelect} />
          <ChartistGraph data={dataSet} options={simpleLineChartOptions}  type={'Line'} redraw/>
        </div>
      );
    }
  }
}


export default SizeMeHOC(WhenChart);