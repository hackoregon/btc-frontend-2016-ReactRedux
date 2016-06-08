
import React, { Component, PropTypes } from 'react';

import { Grid } from 'react-bootstrap';
import SearchResultsForm from '../containers/SearchResults/SearchResultsForm.jsx';
import BTCNav from '../components/Navigation/BTCNav.jsx';
import Footer from '../components/Navigation/Footer.jsx'

class OregonPage extends Component {

    render() {
        return (
            <div>
                <BTCNav />
                <Grid fluid={ true }
                      style={ {    marginTop: '100px',    fontWeight: '200px'} }
                      params={ this.props.params }>
                </Grid>
                <Footer/>
            </div>
            );
    }
}

export default OregonPage;
