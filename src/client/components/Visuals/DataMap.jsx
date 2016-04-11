import d3 from 'd3';
import topojson from 'topojson';
import Datamap from 'datamaps/dist/datamaps.usa.min'
import React from 'react';
import ReactDOM from 'react-dom';
import statesDefaults from '../../data/states-defaults';
import objectAssign from 'object-assign';
import numeral from 'numeral';
const styles = {
  position: 'relative'
}
export default class DataMap extends React.Component {
  constructor(props) {
    super(props);
    this.datamap = null;
    this.currentScreenWidth = this.currentScreenWidth.bind(this);
  }
  linearPalleteScale(value) {
    const dataValues = this.props.regionData.map(function(data) {
      return data.value
    });

    return d3.scale.linear().domain(d3.extent(dataValues)).range(["#fcfff0", "#10716F"])(value);
  }
  reducedData() {
    const newData = this.props.regionData.reduce((object, data) => {
        console.log(data)
      if (data) {
        // console.log()
      object[data.code] = {
        value: data.value,
        fillColor: this.linearPalleteScale(data.value)
        }
      }
      // } else {
      //   object[data.code] = {
      //     fillColor: '#f2f2f2',
      //     value: ''
      //   }
      // }
      return object;

    }, {});
    return objectAssign({}, statesDefaults, newData);
  }
  renderMap() {
    return new Datamap({
      element: ReactDOM.findDOMNode(this),
      scope: 'usa',
      data: this.reducedData(),
      geographyConfig: {
        borderWidth: 0.5,
        highlightBorderColor: 'rgba(0, 0, 0, 0.2)',
        highlightBorderWidth: 0.5,
        highlightBorderOpacity: 0.5,
        highlightFillColor: '#edf2c5',
        popupTemplate: function(geography, data) {
          if (data && data.value) {
            return '<div class="hoverinfo"><strong>' + geography.properties.name + ', ' + numeral(data.value).format('($0.0a)') + '</strong></div>';
          } else {
            return '<div class="hoverinfo"><strong>' + geography.properties.name + '</strong></div>';
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
    if(data){

    this.datamap.updateChoropleth(data);
    }
  }
  componentWillUnmount() {
    d3.select('svg').remove();
  }
  render() {
    return (
      <div id="datamap-container" style={styles}></div>
    );
  }
}

DataMap.propTypes = {
  regionData: React.PropTypes.array.isRequired
};
