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
const SizeMeHOC = SizeMe({monitorWidth: true, monitorHeight: true, refreshRate: 24});
const styles = {
    position: 'relative'
}
// const colorBlend = d3.interpolateRgb('#A3D3D2', '#10716F'); NOTE - alternate color pallete
class DataMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            palletteRange: [],
            domainRange: []
        }
        this.datamap = null;
        // this.handleResize = this.handleResize.bind(this);
        this.currentScreenWidth = this.currentScreenWidth.bind(this);
        this.reducedData = this.reducedData.bind(this);
    }
    linearPalleteScale(value) {
        let manualScale = d3.scale.quantile().range(this.state.palletteRange).domain(this.state.domainRange);
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
    componentWillMount() {
        const {domainRange, palletteRange} = this.props;
        this.setState({domainRange: domainRange, palletteRange: palletteRange});
    }
    componentDidMount() {
        const mapContainer = d3.select('#datamap-container');
        const initialScreenWidth = this.currentScreenWidth();
        const containerWidth = (initialScreenWidth < 600)
            ? {
                width: (initialScreenWidth * 0.8) + 'px',
                height: (initialScreenWidth * 0.5625) + 'px'
            }
            : {
                width: '600px',
                height: '350px'
            }
        mapContainer.style(containerWidth);
        this.datamap = this.renderMap();
        window.addEventListener('resize', () => {
            const currentScreenWidth = this.currentScreenWidth();
            const mapContainerWidth = mapContainer.style('width');
            if (this.props.size.width > 600 && mapContainerWidth !== '600px') {
                d3.select('#datamap-container svg').remove();
                mapContainer.style({width: this.props.size.width, height: this.props.size.height});
                this.datamap = this.renderMap();
            } else if (this.props.size.width <= 600) {
                d3.select('#datamap-container svg').remove();
                mapContainer.style({
                    width: (currentScreenWidth * 0.9) + 'px',
                    height: (currentScreenWidth * 0.5625) + 'px'
                });
                this.datamap = this.renderMap();
            }
        });
    }
    // handleResize()

    componentDidUpdate() {
        let data = this.reducedData();
        if (data) {
            this.datamap.updateChoropleth(data);
        }
    }
    // componentWillUnmount() {
    //     d3.select('#datamap-container svg').remove();
    //     // window.removeEventListener('resize', this.handleResize);
    // }
    render() {
        const {customStyle} = this.props;
        return (<div id="datamap-container" style={{...customStyle,...styles}}/>);
    }
}

DataMap.propTypes = {
    regionData: React.PropTypes.array.isRequired,
    domainRange: React.PropTypes.array,
    palletteRange: React.PropTypes.array
};
export default SizeMeHOC(DataMap);
