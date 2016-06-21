import React, { Component, PropTypes } from 'react';
import { Grid } from 'react-flexbox-grid';
import BTCNav from '../components/Navigation/BTCNav.jsx';

class DonorsPage extends Component {

    render() {
        return (
            <div>
                <BTCNav />
                  <Grid  style= {{paddingTop:'3rem',fontWeight: '200px'}} fluid={ true }>
                    hi there
                  </Grid>
            </div>
            );
    }
}

export default DonorsPage;
