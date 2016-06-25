import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import ChartistGraph from 'react-chartist';
import SizeMe from 'react-sizeme';
import moment from 'moment';
import numeral from 'numeral';
import {Grid, Col, Row} from 'react-flexbox-grid';
import Legend from '../../components/Legend/Legend.jsx';
import Loading from '../../components/Loading/Loading.jsx';
import _ from 'lodash';
import d3 from 'd3';
import MonthField from '../../components/Select/Month.jsx'
import {getMonthsData} from '../../actions';
import Chartist from 'chartist';

import './Select.css';
import './Line.css';
function formatData(arr) {

    let newData = {
        labels: [],
        series: [
            [], []
        ]
    };
    if (arr && arr.length) {
        arr.forEach((item) => {
            let raised = item.totalIn == null
                ? 0
                : item.totalIn;
            let spent = item.totalOut == null
                ? 0
                : (-item.totalOut);
            newData.labels.push(item.tranDate);
            newData.series[0].push(raised);
            newData.series[1].push(spent);
        });
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
    [
        'screen and (max-width: 640px)', {
            seriesBarDistance: 5,
            axisX: {
                labelInterpolationFnc: function(value) {
                    return value[0];
                }
            }
        }
    ]
];

function loadMonths(months, year, data, props) {
    const {getMonthsData} = props;
    getMonthsData(months, year, data);
}
class WhenChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            high: 0,
            low: 0
        }
        this.handleSelect = this.handleSelect.bind(this);
    }
    componentWillMount() {
      const {data, year} = this.props;
      if (!_.isEmpty(data)) {
          const years = Object.keys(data);
          const months = Object.keys(data[years[years.length-1]])
          const defaultData = data[years[years.length-1]][months[months.length-1]];
          let dataSet = formatData(defaultData);
          let high = d3.max(defaultData, (d) => d.totalIn);
          let low = (-d3.max(defaultData, (d) => d.totalOut));
          // if (!_.isEmpty(monthsData)) {
          //     dataSet = formatData(monthsData)
          //     high = d3.max(defaultData, (d) => d.totalIn);
          //     low = (-d3.max(defaultData, (d) => d.totalOut));
          // }
          this.setState({year: year, data: data, dispData: dataSet, high, low});
      }
    }
    componentWillReceiveProps(nextProps, nextState) {
        const {data, year} = nextProps;
        const {monthsData} = nextState;
        if (!_.isEmpty(data)) {

            // const today = moment.now();
            const years = Object.keys(data);
            const months = Object.keys(data[years[years.length-1]])
            // const lastMonth = moment(today).subtract(1, 'months').format('MMM');
            const defaultData = data[years[years.length-1]][months[months.length-1]];
            let dataSet = formatData(defaultData);
            let high = d3.max(defaultData, (d) => d.totalIn);
            let low = (-d3.max(defaultData, (d) => d.totalOut));
            if (!_.isEmpty(monthsData)) {
                dataSet = formatData(monthsData)
                high = d3.max(defaultData, (d) => d.totalIn);
                low = (-d3.max(defaultData, (d) => d.totalOut));
            }

            this.setState({year: year, data: data, dispData: dataSet, high, low});
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        const {data, year} = nextProps;
        if (typeof year == 'string' && !_.isEmpty(data)) {
            return true;
        }
        return false;
    }

    handleSelect(options) {
        if (options) {
            const months = options.split(',');
            const allData = [...months.map(m => {
                    return this.state.data[this.state.year][m]
                })];
            let monthsData = [];
            for (var i = 0; i < allData.length; i++) {
                monthsData.push(...allData[i])
            }
            const high = d3.max(monthsData, (d) => d.totalIn);
            const low = (-d3.max(monthsData, (d) => d.totalOut));
            // loadMonths(months,this.state.year,this.state.data,this.props);
            this.setState({monthsData, high, low, dispData: formatData(monthsData)});
        }
    }

    render() {
        const {data, year} = this.props;

        if (_.isEmpty(this.state.dispData)) {
            return (<Loading name='rotating-plane'/>)
        } else {
            const labels = Object.keys(data[year]);
            const lineChartOptions = {
                showArea: true,
                showLine: true,
                showPoint: false,
                high: this.state.high,
                low: this.state.low,
                height: '300px',
                lineSmooth: Chartist.Interpolation.cardinal({tension: 0.25}),
                axisX: {
                    showLabel: true,
                    showGrid: true,
                    labelInterpolationFnc(value, index) {
                        const date = Number(moment(value).format('DD'))
                        return date == 1 || date == 15
                            ? moment(value).format('MMM DD')
                            : null;
                    }
                },
                axisY: {
                    showGrid: true,
                    scaleMinSpace: 30,
                    onlyInteger: false,
                    labelOffset: {
                        x: 0,
                        y: 35
                    },
                    labelInterpolationFnc(value, index) {
                        return value == 0 || value % 1000 == 0
                            ? numeral(value).format('$ 0 a')
                            : null;
                    }
                }
            }

            return (
                <Grid {...this.props}>
                    <Row center='xs' around='xs' xs={6} md={6} lg={6}>
                        <Col xs={12} style={{
                            padding: '0.5rem'
                        }}>
                            <Legend inRow labels={['Recieved', 'Spent']} colors={['#F6675A', '#AFAAD4']}/>
                        </Col >
                    </Row>

                    <ChartistGraph data={this.state.dispData} options={lineChartOptions} type={'Line'}/>
                    <Row xs={6} style={{alignItems:'center',justifyContent:'space-around'}}>
                        <MonthField style={{alignSelf:'center'}} xs={1} ref={'month'} months={labels} year={this.state.year} onToggleSelect={this.handleSelect}/>
                    </Row>
                </Grid>
            );
        }
    }
}

export default WhenChart;