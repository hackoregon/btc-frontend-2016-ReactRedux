import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {loadCampaign} from '../../actions'
import ResultHeader from './ResultHeader.jsx'
import ResultDonorsCard from './ResultDonorsCard.jsx'
import ResultSummaryCard from './ResultSummaryCard.jsx'
import ResultLocationStoryCard from './ResultLocationStoryCard.jsx'
import ResultSpendingCard from './ResultSpendingCard.jsx'
import ResultWhen from './ResultWhen.jsx'
import { Grid } from 'react-bootstrap';

function loadData(props) {
  const { filer_id } = props;
  props.loadCampaign(filer_id);
}

class ResultPage extends Component {
  constructor(props){
    super(props)
  }
  componentWillMount() {
    loadData(this.props);
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.filer_id !== this.props.filer_id){
      loadData(nextProps)
    }
  }

  render(){
    const { campaign } = this.props
    if (!campaign) {
      // needs loading icon here
      return <h1><i>Loading... </i></h1>
    }

    return (
      <div {...this.props}>
        <ResultHeader
          candidate={campaign.candidateName}
          key={campaign.filerId}
          race = { campaign.race } />
        <ResultSummaryCard total={campaign.total} totalSpent={campaign.totalSpent} grassroots={campaign.grassroots} instate={campaign.instate} />
        <ResultDonorsCard params={this.props.params}/>
        <ResultSpendingCard params={this.props.params}/>
        <ResultLocationStoryCard params={this.props.params} />
      </div>
    )
  }
}

ResultPage.propTypes = {
  campaign: PropTypes.object,
  // searchTerm: PropTypes.string.isRequired,
  filerId: PropTypes.string.isRequired
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
})(ResultPage)