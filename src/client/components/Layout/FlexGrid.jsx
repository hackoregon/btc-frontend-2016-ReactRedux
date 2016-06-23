import React, {Component, PropTypes} from 'react';
import {Grid } from 'react-flexbox-grid';

class FlexGrid extends React.Component {
  render () {
    return (
      <div style = {{flex:'1',minWidth:'320px',paddingTop:'3rem'}}>
        <Grid xs  fluid={true} params={this.props.params}>
            {this.props.children}
        </Grid>
      </div>

    )
  }
}

export default FlexGrid;

