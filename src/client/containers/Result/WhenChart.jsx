import React, {PropTypes} from 'react';
import ChartistGraph from 'react-chartist';
import SizeMe from 'react-sizeme';
import moment from 'moment';
import d3 from 'd3';
import './Select.css';
import './Line.css';
import Dropdown from 'react-dropdown';
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
    showArea: false,
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
    arr.forEach((item) => {
        let raised = item.total_in == null
            ? 0
            : item.total_in;
        let spent = item.total_out == null
            ? 0
            : (item.total_out);
        newData.labels.push(item.tran_date);
        newData.series[0].push(raised);
        newData.series[1].push(spent);
    });
    console.log(d3.extent(newData.series[0]));
    return newData;
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
// const expensesByYear = d3.nest().key(function(d) {
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
// console.log(expensesByYear);
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
        this.state = {
          multi: true,
          max: 3,
          opts:[
          	{ github: 'jedwatson', name: 'Jed Watson' },
          	{ github: 'bruderstein', name: 'Dave Brotherstone' },
          	{ github: 'jossmac', name: 'Joss Mackison' },
          	{ github: 'jniechcial', name: 'Jakub Niechciał' },
          	{ github: 'craigdallimore', name: 'Craig Dallimore' },
          	{ github: 'julen', name: 'Julen Ruiz Aizpuru' },
          	{ github: 'dcousens', name: 'Daniel Cousens' },
          	{ github: 'jgautsch', name: 'Jon Gautsch' },
          	{ github: 'dmitry-smirnov', name: 'Dmitry Smirnov' },
          ],
            series: ['Spending'],
            data: [
                [175000],
                [13999],
                [21000],
                [896],
                [3514],
                [250000],
                [19999]
            ],
            labels: [
                'General Operational Expenses',
                'Postage',
                'Reimbursement for Personal Expenditures',
                'Travel Expenses',
                'Unknown',
                'Management Services',
                'Other Advertising (yard signs, buttons, etc.)'
            ]
        }
        this._onSelect = this._onSelect.bind(this);
    }
    componentWillMount() {
      const {data} = this.props;
      let expensesByYear = d3.nest().key(function(d) {
        return d.tran_date.split("-")[0];
        }).rollup(function(v) {
        return v
      }).map(data);
      let selectKeys = Object.keys(expensesByYear);
      let dataSet = formatData(expensesByYear[selectKeys[0]]);
      this.setState({
        selected: selectKeys[0],
        dataSet: dataSet
      });
    }
    _onSelect (option) {
      const {data} = this.props;
      let expensesByYear = d3.nest().key(function(d) {
        return d.tran_date.split("-")[0];
        }).rollup(function(v) {
        return v
      }).map(data);
    console.log('You selected ', option.label)

    let dataSet = formatData(expensesByYear[option.value]);
    this.setState({
      selected: option,
      dataSet: dataSet});
    }
    getContributors (input, callback) {
  		input = input.toLowerCase();
  		let options = this.state.opts.filter(i => {
  			return i.github.substr(0, input.length) === input;
  		});
  		let data = {
  			options: options.slice(0, this.state.max),
  			complete: options.length <= this.state.max,
  		};

  	}
    componentDidMount() {
        console.log(formatData(this.props.data));
    }


    render() {

        const {data} = this.props;
        const expensesByYear = d3.nest().key(function(d) {
          return d.tran_date.split("-")[0];
          }).rollup(function(v) {
          return v
        }).map(data);
        let selectKeys = Object.keys(expensesByYear);
        let dataSet = formatData(expensesByYear['2015']);
        const defaultOption = this.state.selected;
        const placeHolderValue = typeof this.state.selected === 'string' ? this.state.selected : this.state.selected.label;
        return (<div {...this.props} >
          <Dropdown style={{marginBottom: '1rem'}} options={selectKeys} onChange={this._onSelect} value={defaultOption} placeholder={"Select an option"} />
          <ChartistGraph data={this.state.dataSet} options={simpleLineChartOptions}  type={'Line'} redraw/>
        </div>
      );
    }
}

export default SizeMeHOC(WhenChart);