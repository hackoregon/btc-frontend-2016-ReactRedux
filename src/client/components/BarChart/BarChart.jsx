import React, {Component, PropTypes} from 'react';
import './BarChart.css';
import numeral from 'numeral';
import d3 from 'd3';
import _ from 'lodash';

function sortNums(a, b) {
    return a - b;
}

class BarChart extends Component {
    constructor(props) {
        super(props);
        this.mapSeries = this.mapSeries.bind(this);
    }
    componentWillMount() {
        let data = this.props.data,
            layered = this.props.grouping === 'layered'
                ? true
                : false,
            stacked = this.props.grouping === 'stacked'
                ? true
                : false,
            opaque = this.props.opaque;

        this.setState({layered: layered, stacked: stacked, opaque: opaque});
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
                        <div className = {'horizontalLabels-labels-container'}>
                            <label className={'horizontalLabels'} key={seriesIndex}>{self.props.labels[seriesIndex]}
                            </label>
                        </div>
                        <div className = {'horizontalLabels-item-container'}>
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
        const {customStyle, opaque} = this.props;
        let max = d3.max(_.flatten(this.props.data));

        if (this.props.data.length) {
            let data = this.props.data;
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
                        let seriesLabels = this.props.seriesLabels
                            ? (
                                <label>{this.props.labels[seriesIndex]}
                                </label>
                            )
                            : null;

                        return (
                            <div className={'BarChart--series ' + (this.props.grouping)} key={seriesIndex} style={{
                                height: this.props.height
                                    ? this.props.height
                                    : 'auto'
                            }}>
                                {seriesLabels}
                                {fullSeries}
                            </div>
                        );
                    })}

                </div>
            );
        } else {
            return (
                <div>Loading...</div>
            )
        }
    }
}

BarChart.propTypes = {
    data: PropTypes.array.isRequired,
    labels: PropTypes.array.isRequired,
    colors: PropTypes.array.isRequired,
    horizontal: PropTypes.bool,
    opaque: PropTypes.bool
}

export default BarChart
