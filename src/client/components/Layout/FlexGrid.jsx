import React, { Component, PropTypes } from 'react';
import { Grid } from 'react-flexbox-grid';

export default class FlexGrid extends Component {
  render () {
    return (
      <div style = {{flex:'1',minWidth:'320px',paddingTop:'3rem'}}>
        <Grid fluid={true}>
            {this.props.children}
        </Grid>
      </div>

    )
  }
}

FlexGrid.propTypes = {
  children: PropTypes.object
};
