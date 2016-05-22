
import React, { Component, PropTypes } from 'react';

import { Grid } from 'react-bootstrap';
import { Table } from 'react-bootstrap';
import { Carousel } from 'react-bootstrap';
import { CarouselItem } from 'react-bootstrap';
import { Panel } from 'react-bootstrap';
import DonorPage from '../containers/Donor/DonorPage.jsx';
import SearchResultsForm from '../containers/SearchResults/SearchResultsForm.jsx';
import BTCNav from '../components/Navigation/BTCNav.jsx';

class DonorsPage extends Component {

    render() {
        return (
            <div>
                <BTCNav />
                  <Grid  style= {{paddingTop:'100px',fontWeight: '200px'}} fluid={ true }>
                  <DonorPage
                    params={this.props.params} donor_name={this.props.params.donor_name} />
                  </Grid>
            </div>
            );
    }
}

export default DonorsPage;
