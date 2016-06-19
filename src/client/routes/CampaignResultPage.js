import React, {Component, PropTypes} from 'react';
import ResultPage from '../containers/Result/ResultPage.jsx';
import BTCNav from '../components/Navigation/BTCNav.jsx';
import { Grid } from 'react-bootstrap';
import {loadCampaign, fetchCampaigns,loadPACinfo,loadBizInfo, loadIndivs,loadStateInfo} from '../actions'
import {connect} from 'react-redux'

function loadData(props) {
  const { filer_id } = props;
  props.loadCampaign(filer_id);
  props.loadIndivs(filer_id);
  props.loadBizInfo(filer_id);
  props.loadPACinfo(filer_id);
  props.loadStateInfo(filer_id);
}

class CampaignResultPage extends Component {
  componentWillMount() {
    let filerId = this.props.params.filer_id != undefined ? this.props.params.filer_id : '913';
    loadData(this.props);
  }

  render() {
    const {campaign,params,indivContributions,businessContributions,pacContributions,stateContributions} = this.props;
    return (
      <div {...this.props}>
        <BTCNav />
        <Grid  style= {{paddingTop:'100px',fontWeight: '200px'}} fluid={ true }>
        <ResultPage
          campaign={campaign} contributions={{ind:{...indivContributions},biz:{...businessContributions},pac:{...pacContributions}}} stateInfo={stateContributions} filerId={params.filer_id} />
        </Grid>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const { filer_id } = ownProps.params
  const {
    entities: { campaigns, stateContributions, indivContributions, businessContributions, pacContributions }
  } = state;
  const campaign = campaigns[filer_id]
  return {
    filer_id, campaign, stateContributions, indivContributions, businessContributions, pacContributions
  }
}


export default connect(mapStateToProps, {
  loadCampaign, loadIndivs,
  loadBizInfo,
  loadPACinfo,
  fetchCampaigns,
  loadStateInfo
})(CampaignResultPage)
// export default CampaignResultPage;

