import React, { Component, PropTypes } from 'react';
import { Grid } from 'react-flexbox-grid';
import DonorPage from '../containers/Donor/DonorPage.jsx';
import BTCNav from '../components/Navigation/BTCNav.jsx';

class DonorsPage extends Component {

    render() {
        return (
            <div>
                <BTCNav />
                  <Grid  style= {{paddingTop:'3rem',fontWeight: '200px'}} fluid={ true }>
                  <h2>Donors page to come...</h2>
                  </Grid>
            </div>
            );
    }
}

export default DonorsPage;
