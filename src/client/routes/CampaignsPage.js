
import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux'
import { Grid } from 'react-bootstrap';
import SearchResultsForm from '../containers/SearchResults/SearchResultsForm.jsx';
import BTCNav from '../components/Navigation/BTCNav.jsx';
import Footer from '../components/Navigation/Footer.jsx'
import {loadCampaign} from '../actions'


function loadData(props) {
  const { filer_id } = props;
  props.loadCampaign(filer_id);
}

class CampaignsPage extends Component {
    // constructor(props){
    //   super(props)
    //   this.state = {
    //
    //   }
    // }
    componentWillMount() {
      loadData(this.props);
    }
    render() {
      const {campaign,filer_id} = this.props;
        return (
            <div>
                <BTCNav />
                <Grid fluid={ true }
                      style={ {    marginTop: '100px',    fontWeight: '200px'} }
                      params={ this.props.params }>
                </Grid>
                <Footer />
            </div>
            );
    }
}

function mapStateToProps(state, ownProps) {
  const { filer_id } = ownProps.params
  const {
    entities: { campaigns }
  } = state;
  const campaign = campaigns[filer_id]
  return {
    filer_id, campaign
  }
}


export default connect(mapStateToProps, {
  loadCampaign
})(CampaignsPage)
// export default CampaignsPage;
