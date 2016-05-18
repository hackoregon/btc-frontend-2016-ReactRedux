import React, {Component, PropTypes} from 'react';
import './BarChart.css';
import numeral from 'numeral';

function sortNums(a, b) {
    return a - b;
}

class BarChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            max: 0
        }
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
            opaque = this.props.opaque,
            max = 0;
        for (let i = data.length; i--;) {
            for (let j = data[i].length; j--;) {
                if (data[i][j] > max) {
                    max = data[i][j];
                }
            }
        }
        this.setState({data: data, layered: layered, stacked: stacked, opaque: opaque, max: max});
    }

    mapSeries(self,series,seriesIndex,sum){
      return series.map((item, itemIndex) => {
          let color = self.props.colorBySeries
                  ? self.props.colors[seriesIndex]
                  : self.props.colors[itemIndex],
              style,
              size = item / (self.state.stacked
                  ? sum
                  : self.state.max) * 100;
          style = {
              backgroundColor: color,
              opacity: self.state.opaque
                  ? 1
                  : (item / self.state.max + .05),
              zIndex: item/self.state.max
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

          return (
              <div className={'BarChart--item ' + (self.props.grouping)} style={style} key={itemIndex}>
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
        const {customStyle,opaque} = this.props;
        let self = this;
        let max = self.state.max;
        if (this.props.data.length) {
            let data = this.props.data;
            return (
                <div className={'BarChart' + (this.props.horizontal
                    ? ' horizontal'
                    : '')} style={customStyle}>
                    {data.map((series, seriesIndex) => {
                        let sum = series.length > 1
                            ? series.reduce((carry, current) => {
                                return carry + current;
                            }, 0)
                            : 0;

                            let fullSeries = series.length > 1 ? self.mapSeries(self,series,seriesIndex,sum) : self.mapSeries(self,series,seriesIndex,sum);

                        return (
                            <div className={'BarChart--series ' + (self.props.grouping)} key={seriesIndex} style={{
                                height: self.props.height
                                    ? self.props.height
                                    : 'auto'
                            }}>
                                <label>{self.props.labels[seriesIndex]}</label>
                                { fullSeries }
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
    horizontal: PropTypes.boolean,
    opaque: PropTypes.boolean
}

export default BarChart
