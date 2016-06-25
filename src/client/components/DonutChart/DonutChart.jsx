import React, {Component} from 'react';
import {Chart, DataSeries, Pie} from 'diffract';
import Legend from '../Legend/Legend.jsx';
import {Row, Col} from 'react-flexbox-grid';
import _ from 'lodash';
import numeral from 'numeral';
import d3 from 'd3';

const width = 240;
const height = 240;
const COLORS = [
    '#a6cee3',
    '#1f78b4',
    '#b2df8a',
    '#33a02c',
    '#fb9a99',
    '#e31a1c',
    '#fdbf6f',
    '#ff7f00',
    '#cab2d6',
    '#6a3d9a',
    '#ffff99',
    '#b15928',
    '#8dd3c7',
    '#fb8072',
    '#80b1d3',
    '#bebada',
    '#ffed6f',
    '#fdb462',
    '#b3de69',
    '#fccde5',
    '#d9d9d9',
    '#bc80bd',
    '#ccebc5',
    '#ffffb3'
]
class DonutChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            total: 0,
            currValue: 0,
            defaultLabel: 'New Money',
            currLabel: '%',
            values: [
                1000, 10000
            ],
            labels: ['New money', 'Grassroots']
        }
        this.setLabel = this.setLabel.bind(this);
        this.animateLabel = this.animateLabel.bind(this);
    }

    componentWillMount() {
        const {data,title,offset} = this.props;
        if (!_.isEmpty(data)) {
            let total = d3.sum(this.props.data.values)
            let totalVals = this.props.data.values;
            let labelOfVals = this.props.data.labels;
            let offSet = 0;
            if(offset){
                offSet = offset
            }
            this.setState({
                total: total,
                title: title,
                currLabel: title,
                values: [...totalVals],
                labels: [...labelOfVals]
            });

        }

    }
    componentWillReceiveProps(nextProps) {

      const {data,title} = nextProps;
      if(!_.isEmpty(data)){
      let total = d3.sum(nextProps.data.values)
      let totalVals = nextProps.data.values;
      let labelOfVals = nextProps.data.labels;
      debugger;
      this.setState({
          total: total,
          currLabel: labelOfVals[totalVals.indexOf(d3.max(totalVals))],
          values: [...totalVals],
          labels: [...labelOfVals]
        });
      }
    }

    shouldComponentUpdate(nextProps, nextState) {
      return true;
    }

    getColors(d, i) {

        if (arguments.length === 2) {
            return COLORS[i];
        } else {
            return COLORS[d];
        }
    }


    setLabel(v, i) {
        this.setState({currValue: v, currLabel: this.state.labels[i]})
    }

    animateLabel(i, _this) {
        let j = i + 1;
        let nextVal = i <= _this.state.values.length
            ? _this.state.values[j]
            : _this.state.values[0];
        _this.setLabel(nextVal, j);
    }

    render() {
        // let name = null;
        // let label = name || 'Label Name';
        // const {width,height} = this.props;
        let percent = null || Math.round((this.state.currValue / this.state.total) * 100);
        let labelPercent = percent
            ? `${percent}%`
            : '%';
        let title = this.state.title ? (
          <div style={{textAlign:'center'}}><h3>{this.state.title}</h3><h4>{numeral(this.state.total).format('$0,0')}</h4></div>) : null;
        let valueDisp = this.props.displayValue
            ? (
                <text className="donut-subtitle" textAnchor="middle" x={0} y={0} fontSize={10}>
                    {numeral(this.state.currValue).format('$0,0')}
                </text>
            )
            : (
                <text className="donut-subtitle" textAnchor="middle" x={0} y={0} fontSize={10}>
                    {`${labelPercent}`}
                </text>
            );
        return (<div>
            {title}
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between'
            }}>
                <div xs={10}>
                    <Chart style={{
                        flex: '1'
                    }} width={width} height={height}>
                        <DataSeries data={this.state.values}>
                            <text className="donut-title" textAnchor="middle" x={100} y={25} fontSize={9}>
                                {this.state.currLabel}
                            </text>
                            <Pie innerRadius={35} outerRadius={85} onClick={(e, v, i) => {
                                this.setLabel(v, i);
                            }} style={(d, i) => ({fill: this.getColors(i)})}>
                                {valueDisp}
                            </Pie>
                        </DataSeries>
                    </Chart>
                </div>
                <Col>
                    <div style={{
                        display: 'block'
                    }}>
                        <Legend labels={this.state.labels} style ={{textAlign:'center'}}colors={COLORS}/>
                    </div>
                </Col>
            </div>
            </div>
        );
    }
}

export default DonutChart;
