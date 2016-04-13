import d3 from 'd3';
import topojson from 'topojson';
import Datamap from 'datamaps/dist/datamaps.usa.min'
import React from 'react';
import ReactDOM from 'react-dom';
import statesDefaults from '../../data/states-defaults';
import assign from "lodash/assign";
import numeral from 'numeral';
const styles = {
  position: 'relative'
}
const colorBlend = d3.interpolateRgb('#A3D3D2', '#10716F');
export default class DataMap extends React.Component {
  constructor(props) {
    super(props);
    this.datamap = null;
    this.legend = null;
    this.currentScreenWidth = this.currentScreenWidth.bind(this);
  }
  linearPalleteScale(value) {
    const dataValues = this.props.regionData.map(function(data) {
      return data.value
    });
    // let palletteRange = ['#f7fcf5','#e5f5e0','#c7e9c0','#a1d99b','#74c476','#41ab5d','#238b45','#006d2c','#00441b']
    // let minValue = d3.min(dataValues);
    let donorSize = d3.scale.linear().domain([d3.min(dataValues), d3.max(dataValues)]).range([0, 1]);
    return colorBlend(donorSize(value))
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
        highlightBorderColor: function(data){return data && data.value ? 'rgba(0, 0, 0, 0.2)' : 'none' },
        highlightBorderWidth: function(data){return data && data.value ? 0.5 : 0 },
        highlightBorderOpacity: function(data){return data && data.value ? 0.5 : 0 },
        highlightFillColor: function(data){return data && data.value ? '#edf2c5' : 'none' },
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
        width: initialScreenWidth + 'px',
        height: (initialScreenWidth * 0.5625) + 'px'
      }
      : {
        width: '600px',
        height: '350px'
      }
    // { width: '600px', height: '350px' }

    mapContainer.style(containerWidth);
    this.datamap = this.renderMap();
    // this.legend = this.renderLegend();
    window.addEventListener('resize', () => {
      const currentScreenWidth = this.currentScreenWidth();
      const mapContainerWidth = mapContainer.style('width');
      if (this.currentScreenWidth() > 600 && mapContainerWidth !== '600px') {
        d3.select('svg').remove();
        mapContainer.style({width: '80%', height: '40%'});
        this.datamap = this.renderMap();
      } else if (this.currentScreenWidth() <= 600) {
        d3.select('svg').remove();
        mapContainer.style({
          width: currentScreenWidth + 'px',
          height: (currentScreenWidth * 0.5625) + 'px'
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
      <div id="datamap-container" style={styles}>
        <div id="svg-color-quant"/>
      </div>
    );
  }
}

DataMap.propTypes = {
  regionData: React.PropTypes.array.isRequired
};
