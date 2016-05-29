import React from 'react';

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