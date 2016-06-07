
import React, { Component, PropTypes } from 'react';

import { Grid } from 'react-bootstrap';
import SearchResultsForm from '../containers/SearchResults/SearchResultsForm.jsx';
import BTCNav from '../components/Navigation/BTCNav.jsx';
import Footer from '../components/Navigation/Footer.jsx'


class CampaignsPage extends Component {

    render() {
        return (
            <div>
                <BTCNav />
                <Grid fluid={ true }
                      style={ {    marginTop: '100px',    fontWeight: '200px'} }
                      params={ this.props.params }>
                    <SearchResultsForm params={ this.props.params }></SearchResultsForm>
                </Grid>
                <Footer />
            </div>
            );
    }
}

export default CampaignsPage;
