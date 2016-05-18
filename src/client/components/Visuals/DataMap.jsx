import d3 from 'd3';
// import topojson from 'topojson';
import Datamap from 'datamaps/dist/datamaps.usa.min'
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import statesDefaults from '../../data/states-defaults';
import assign from 'lodash/assign';
import numeral from 'numeral';
// import colorbrewer from 'colorbrewer';
import SizeMe from 'react-sizeme';
const SizeMeHOC = SizeMe({
  monitorWidth: true,
  monitorHeight: true,
  refreshRate: 24
});
const styles = {
    position: 'relative'
}
// const colorBlend = d3.interpolateRgb('#A3D3D2', '#10716F');
class DataMap extends Component {
    constructor(props) {
        super(props);
        this.datamap = null;
        this.legend = null;
        this.currentScreenWidth = this.currentScreenWidth.bind(this);
    }
    linearPalleteScale(value) {

        let palletteRange = ['#EEFBFB','#CDF3F2','#89C2C0','#84BEBB','#71B0AE','#6CACAA','#5A9E9B','#1F8481','#165F5C']
        let domainRange = [100, 1000, 10000, 100000, 1000000, 10000000];
        let manualScale = d3.scale.quantile()
                          .range(palletteRange)
                          .domain(domainRange);

        return manualScale(value);
    }
    reducedData() {
        const newData = this.props.regionData.reduce((object, data) => {
            if (data) {
                object[data.code] = {
                    value: data.value,
                    fillColor: this.linearPalleteScale(data.value)
                }
            }
            return object;
        }, {});
        return assign({}, statesDefaults, newData);
    }
    // renderLegend() {
    //
    //   // var svg = d3.select("#svg-color-quant");
    //   // var quantize = d3.scale.quantize().domain([0, 0.15]).range(d3.range(9).map(function(i) {
    //   //   return "q" + i + "-9";
    //   // }));
    //   // var colorLegend = d3.legend.color().labelFormat(d3.format(".2f")).useClass(true).scale(quantize);
    //   //
    //   //
    //   // return svg.append("g").attr("class", "legendQuant").attr("transform", "translate(20,20)").select(".legendQuant").call(colorLegend);
    // }
    renderMap() {
        return new Datamap({
            element: ReactDOM.findDOMNode(this),
            scope: 'usa',
            data: this.reducedData(),
            geographyConfig: {
                borderWidth: 0.5,
                highlightBorderColor: function(data) {
                    return data && data.value
                        ? 'rgba(0, 0, 0, 0.2)'
                        : 'none'
                },
                highlightBorderWidth: function(data) {
                    return data && data.value
                        ? 0.5
                        : 0
                },
                highlightBorderOpacity: function(data) {
                    return data && data.value
                        ? 0.5
                        : 0
                },
                highlightFillColor: function(data) {
                    return data && data.value
                        ? '#edf2c5'
                        : 'none'
                },
                popupTemplate: function(geography, data) {
                    if (data && data.value) {
                        return '<div class="hoverinfo">' + geography.properties.name + ', ' + numeral(data.value).format('($0.0a)') + '</div>';
                    }
                }
            }
        });
    }
    currentScreenWidth() {
        return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    }
    componentDidMount() {
        const mapContainer = d3.select('#datamap-container');
        const initialScreenWidth = this.currentScreenWidth();
        const containerWidth = (initialScreenWidth < 600)
            ? {
                width: (initialScreenWidth*0.8) + 'px',
                height: (initialScreenWidth * 0.5625) + 'px'
            }
            : {
                width: '600px',
                height: '350px'
            }
        mapContainer.style(containerWidth);
        this.datamap = this.renderMap();
        // this.legend = this.renderLegend();
        window.addEventListener('resize', () => {
            const currentScreenWidth = this.currentScreenWidth();
            const mapContainerWidth = mapContainer.style('width');
            if (this.props.size.width > 600 && mapContainerWidth !== '600px') {
                d3.select('svg').remove();
                mapContainer.style({width: this.props.size.width, height: this.props.size.height});
                this.datamap = this.renderMap();
            } else if (this.props.size.width <= 600) {
                d3.select('svg').remove();
                mapContainer.style({
                    width: (currentScreenWidth*0.8) + 'px',
                    height: (currentScreenWidth * 0.6) + 'px'
                });
                this.datamap = this.renderMap();
            }
        });
    }
    componentDidUpdate() {
        let data = this.reducedData();
        if (data) {
            this.datamap.updateChoropleth(data);
        }
    }
    componentWillUnmount() {
        d3.select('svg').remove();
    }
    render() {
        return (
            <div id="datamap-container" style={styles} />
        );
    }
}

DataMap.propTypes = {
    regionData: React.PropTypes.array.isRequired
};
export default SizeMeHOC(DataMap);