import React, {Component, PropTypes} from 'react';
import './BarChart.css';
import numeral from 'numeral';
import Spinner from 'react-spinkit';
import d3 from 'd3';
import _ from 'lodash';

function sortNums(a, b) {
    return a - b;
}

class BarChart extends Component {

    static propTypes = {
      data: PropTypes.array.isRequired,
      labels: PropTypes.array.isRequired,
      colors: PropTypes.array.isRequired,
      grouping: PropTypes.string,
      horizontal: PropTypes.bool,
      horizontalLabels: PropTypes.array,
      seriesLabels: PropTypes.array,
      itemLabels: PropTypes.bool,
      opaque: PropTypes.bool,
      thick: PropTypes.bool,
      customStyle: PropTypes.object,
      height: PropTypes.number,
      splitAt: PropTypes.number
    }

    constructor() {
        super();
        this.mapSeries = this.mapSeries.bind(this);
    }

    componentWillMount() {
        let layered = this.props.grouping === 'layered'
                ? true
                : false,
            stacked = this.props.grouping === 'stacked'
                ? true
                : false,
            opaque = this.props.opaque,
            thick = this.props.thick;

        this.setState({layered: layered, stacked: stacked, opaque: opaque, thick: thick});
    }

    shouldComponentUpdate(nextProps) {
        if (nextProps.data.length) {
            return true
        }
        return false
    }

    mapSeries(self, series, seriesIndex, sum, max) {
        return series.map((item, itemIndex) => {
            let color = self.props.colorBySeries
                    ? self.props.colors[seriesIndex]
                    : self.props.colors[itemIndex],
                style,
                size = item / (self.state.stacked
                    ? sum
                    : max) * 100;
            style = {
                backgroundColor: color,
                opacity: self.state.opaque
                    ? 1
                    : (item / max + .05)
            };

            if (self.props.horizontal) {
                style['width'] = size + '%';
            } else {
                style['height'] = size + '%';
            }

            if (self.state.layered && !self.props.horizontal) {
                let sortedSeries = series.slice(0);
                sortedSeries.sort(sortNums);
                style['right'] = ((sortedSeries.indexOf(item) / (series.length + 1)) * 100) + '%';
            }

            if (self.props.horizontal && self.props.horizontalLabels) {
                style['width'] = (size * 0.85) + '%';
                return (
                    <div className={'horizontalLabels-container'}>
                        <div className={'horizontalLabels-labels-container'}>
                            <label className={'horizontalLabels'} key={seriesIndex}>{self.props.labels[seriesIndex]}
                            </label>
                        </div>
                        <div className={'horizontalLabels-item-container'}>
                            <div className={'BarChart--item ' + (self.props.grouping)} style={{
                                ...style
                            }} key={itemIndex}>
                                <b style={{
                                    color: color
                                }}>
                                    {(self.props.dollarFormat
                                        ? numeral(item).format('$0,0')
                                        : item)}</b>
                            </div>
                        </div>
                    </div>
                )
            }

            return (
                <div className={'BarChart--item ' + (self.props.grouping)} style={{
                    ...style
                }} key={itemIndex}>
                    <b style={{
                        color: color
                    }}>
                        {(self.props.dollarFormat
                            ? numeral(item).format('$0,0')
                            : item)}</b>
                </div>
            );
        });
    }

    render() {
        const {customStyle} = this.props;
        let max = d3.max(_.flatten(this.props.data));

        if (this.props.data.length) {
            let data = this.props.data;
            let split = (this.props.splitAt > -1);
            let titlesAvail = (this.props.titles > -1);
            return (
                <div className={'BarChart' + (this.props.horizontal
                    ? ' horizontal '
                    : '') + (this.props.horizontalLabels
                    ? 'horizontalLabels '
                    : '')} style={customStyle}>

                    {data.map((series, seriesIndex) => {
                        let sum = series.length > 1
                            ? series.reduce((carry, current) => {
                                return carry + current;
                            }, 0)
                            : 0;

                        let fullSeries = this.mapSeries(this, series, seriesIndex, sum, max);
                        let titles = this.props.titles
                            ? (
                                <h4 className={'titles `${series}`'} key={seriesIndex}>
                                    {this.props.titles[seriesIndex]}
                                </h4>
                            )
                            : null;

                        let seriesLabels = this.props.seriesLabels
                            ? (
                                <label key={seriesIndex}>{this.props.labels[seriesIndex]}
                                </label>
                            )
                            : null;

                        let itemLabels = this.props.itemLabels
                            ? (
                                <label key={seriesIndex}>{this.props.labels[seriesIndex]}
                                </label>
                            )
                            : null;

                        let height = this.props.height
                            ? this.props.height
                            : '0px'
                        let marginSplitLeft = split && this.props.splitAt == seriesIndex
                            ? ' marginSplitLeft '
                            : '';
                        let classNames = 'BarChart--series ' + (this.props.thick
                            ? ' thick '
                            : '') + (this.props.grouping) + (marginSplitLeft);

                        return (
                            <div className={classNames} key={seriesIndex} style={{
                                height: height
                            }}>

                                {seriesLabels || itemLabels}
                                {fullSeries}
                            </div>
                        );
                    })}

                </div>
            );
        } else {
            return (<Spinner spinnerName='cube-grid'/>)
        }
    }
}

export default BarChart
