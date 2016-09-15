import React, { Component, PropTypes } from 'react';
import { Grid } from 'react-bootstrap';
import BTCNav from '../components/Navigation/BTCNav.jsx';

class RecipientsPage extends Component {
   static propTypes = {
     params: PropTypes.string
   }
    render() {
        return (
            <div >
                <BTCNav />
                <Grid fluid={ true }
                      style={ {    marginTop: '100px',    fontWeight: '200px'} }
                      params={ this.props.params }>
                      <h2>Recipients page to come</h2>
                </Grid>
            </div>
            );
    }
}

export default RecipientsPage;
