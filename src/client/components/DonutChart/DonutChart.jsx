import React, {Component} from 'react';
import {
    Chart,
    DataSeries,
    Pie
} from 'diffract';
import Legend from '../Legend/Legend.jsx';

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
const width = 240;
const height = 240;

class DonutChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            total: 0,
            currValue: 0,
            currLabel: 'Sectors',
            values: [],
            labels: []
        }
        this.setLabel = this.setLabel.bind(this);
        this.animateLabel = this.animateLabel.bind(this);
    }

    componentDidMount() {
        // let total = 0;
        // let totalVals = [];
        // let labelOfVals = [];
        // for (var i = 0; i < this.props.data.length; i++) {
        //     total += this.props.data[i].money_from_indivs + this.props.data[i].money_from_pacs;
        //     totalVals.push(this.props.data[i].money_from_indivs + this.props.data[i].money_from_pacs);
        //     labelOfVals.push(this.props.data[i].sector_name);
        // }
        // this.setState({
        //     total: total,
        //     values: [...totalVals],
        //     labels: [...labelOfVals]
        // });
    }

    getColors(d, i) {
        if (arguments.length === 2) {
            return colors[i];
        } else {
            return colors[d];
        }
    }

    setLabel(v, i) {
        this.setState({currValue: v, currLabel: this.state.labels[i]})
    }

    animateLabel(i,_this){
      let j = i+1;
      let nextVal = i <= _this.state.values.length ? _this.state.values[j] : _this.state.values[0];
      _this.setLabel(nextVal,j);
    }

    render() {
        // let name = null;
        // let label = name || 'Label Name';
        // const {width,height} = this.props;
        let percent = null || Math.round((this.state.currValue / this.state.total) * 100);
        let labelPercent = percent
            ? `${percent}%`
            : 'by %';

        return (
            <div style={{
                display: 'flex',
                flexFlow: 'row nowrap',
                justifyContent: 'space-around'
            }}>
                <Chart width={width} height={height}>
                    <DataSeries data={this.state.values}>
                        <Pie innerRadius={75} outerRadius={110} onClick={(e, v, i) => {
                            this.setLabel(v,i);
                        }} style={(d, i) => ({fill: this.getColors(i)})}>
                            <text className="donut-title" textAnchor="middle" x={0} y={0} fontSize={14}>
                                {this.state.currLabel}
                            </text>
                            <text className="donut-subtitle" textAnchor="middle" x={0} y={18} fontSize={10}>
                                {`${labelPercent}`}
                            </text>
                        </Pie>
                    </DataSeries>
                </Chart>
                <Legend styles={{
                    alignSelf: 'center'
                }} labels={this.state.labels} colors={colors}/>
            </div>
        );
    }
}

export default DonutChart;
