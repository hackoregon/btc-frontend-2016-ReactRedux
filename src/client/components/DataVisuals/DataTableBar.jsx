import React from 'react';
function donorPercent(amount,max,scale) {
  if (amount > 0) {
    let donorSize = d3.scale.linear().domain([0, max]).range([0, 1]);
    return {
      size: 100 * donorSize(amount) + '%',
      color: colorBlend(donorSize(amount))
    };
  } else
    return {size: '0%', color: '#FFF'};
}
const DataTableBar = React.createClass({
  getDefaultProps() {
    return {
      height: 10
    };
  },
  render() {
    const {
      max,
      height,
      scale,
      value,
      color
    } = this.props;
    return (
      <svg
        width={scale(max)}
        height={height}>
        <rect
          width={scale(value)}
          height={height}
          style={{fill: color}}></rect>
      </svg>
    );
  }
});

export default DataTableBar;