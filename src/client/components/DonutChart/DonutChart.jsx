import React, {Component, PropTypes } from 'react';
import {Chart, DataSeries, Pie} from 'diffract';
import Legend from '../Legend/Legend.jsx';
import {Row, Col} from 'react-flexbox-grid';
import _ from 'lodash';
import numeral from 'numeral';
import d3 from 'd3';

const { object, string, number, bool } = PropTypes;
// const width = 240;
// const height = 240;
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

    static propTypes = {
      data: object,
      title: string,
      offset: number,
      displayValue: bool,
      fontSize: number,
      width: number,
      height: number,
      x: number,
      y: number,
      inner: number,
      outer: number,
      labelLinks: bool,
      wrapRow: bool
    }

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
        const {data,title} = this.props;
        if (!_.isEmpty(data) && data.values) {
            let total = d3.sum(data.values)
            let totalVals = data.values;
            let labelOfVals = data.labels;
            // let offSet = 0;
            // if(offset){
            //     // offSet = offset
            // }
            if(labelOfVals && typeof labelOfVals[0] === 'object'){
              this.setState({
                  total: total,
                  title: title,
                  currLabel: labelOfVals[totalVals.indexOf(d3.max(totalVals))].name,
                  currValue: d3.max(totalVals),
                  values: [...totalVals],
                  labels: [...labelOfVals]
                  });
            }

            if(labelOfVals && typeof labelOfVals[0] === 'string'){
            this.setState({
                total: total,
                title: title,
                currLabel: labelOfVals[totalVals.indexOf(d3.max(totalVals))],
                currValue: d3.max(totalVals),
                values: [...totalVals],
                labels: [...labelOfVals]
                });
              }
            }
        }
    componentWillReceiveProps(nextProps) {

      const {data} = nextProps;

      if(!_.isEmpty(data)){
      let total = d3.sum(nextProps.data.values)
      let totalVals = nextProps.data.values;
      let labelOfVals = nextProps.data.labels;
      console.log('labels going into donut', labelOfVals);

      if(labelOfVals && typeof labelOfVals[0] === 'object'){

        this.setState({
            total: total,
            currLabel: labelOfVals[totalVals.indexOf(d3.max(totalVals))].name,
            currValue: d3.max(totalVals),
            values: [...totalVals],
            labels: [...labelOfVals]
            });
      }

      if(labelOfVals && typeof labelOfVals[0] === 'string'){
      this.setState({
          total: total,
          currLabel: labelOfVals[totalVals.indexOf(d3.max(totalVals))],
          currValue: d3.max(totalVals),
          values: [...totalVals],
          labels: [...labelOfVals]
          });
        }
      }
    }

    shouldComponentUpdate() {
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
        const { name } = this.state.labels[i];
       if(name) {
        this.setState({currValue: v, currLabel: this.state.labels[i].name});
      } else {
        this.setState({currValue: v, currLabel: this.state.labels[i]})
      }
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
          <Col xs={12} style={{textAlign:'center', selfAlign:'middle'}}><h3>{this.state.title}</h3><h4>{numeral(this.state.total).format('$0,0')}</h4></Col>) : null;
        let valueDisp = this.props.displayValue
            ? (
                <text className="donut-subtitle" textAnchor="middle" x={0} y={0} fontSize={this.props.fontSize||10}>
                    {numeral(this.state.currValue).format('$0,0')}
                </text>
            )
            : (
                <text className="donut-subtitle" textAnchor="middle" x={0} y={0} fontSize={this.props.fontSize||10}>
                    {`${labelPercent}`}
                </text>
            );

        return (<Col  >
            {title}
                <Row center='xs' around='xs' >
                    <Chart style={{
                        flex: '1'
                    }} width={this.props.width||240} height={this.props.height||240}>
                        <DataSeries data={this.state.values}>
                            <text className="donut-title" textAnchor="middle" x={this.props.x||100} y={this.props.y||25} fontSize={this.props.fontSize||9}>
                                {this.state.currLabel}
                            </text>
                            <Pie innerRadius={this.props.inner || 35} outerRadius={this.props.outer || 85} onClick={(e, v, i) => {

                                this.setLabel(v, i);
                            }} style={(d, i) => ({fill: this.getColors(i)})}>
                                {valueDisp}
                            </Pie>
                        </DataSeries>
                    </Chart>
                    <div style={{
                        display: 'block'
                    }}>
                        <Legend labelLinks={this.props.labelLinks || false} wrapRow={this.props.wrapRow || false} labels={this.state.labels} style ={{textAlign:'center'}} colors={COLORS}/>
                    </div>
                </Row>
          </Col>
        );
    }
}

export default DonutChart;


// <Pie innerRadius={100} outerRadius={185} onClick={(e, v, i) => {