import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {loadCampaign} from '../../actions'
import ResultHeader from './ResultHeader.jsx'
import ResultDonorsCard from './ResultDonorsCard.jsx'
import ResultSummaryCard from './ResultSummaryCard.jsx'

function loadData(props) {
  const { filer_id } = props;
  props.loadCampaign(filer_id);
}

class ResultPage extends Component {
  constructor(props){
    super(props)
    this.renderCampaign = this.renderCampaign.bind(this)
  }
  componentWillMount() {

    loadData(this.props);
  }
  componentDidMount() {

  }
  componentWillReceiveProps(nextProps) {
    // debugger
    if(nextProps.filer_id !== this.props.filer_id){
      loadData(nextProps)
    }
  }
  renderCampaign(campaign){
    return(
      <ResultHeader renderItem={this.renderCampaign} />
    )
  }
  render(){
    const { campaign } = this.props
    if (!campaign) {
      return <h1><i>Loading... </i></h1>
    }
    debugger
    return (
      <div {...this.props}>
        <ResultHeader
          candidate={campaign.candidateName}
          key={campaign.filerId}
          race = { campaign.race } />
        <ResultSummaryCard total={campaign.total} totalSpent={campaign.totalSpent} grassroots={campaign.grassroots} instate={campaign.instate} />
        <ResultDonorsCard params={this.props.params}/>
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
  debugger
  return {
    filer_id, campaign
  }
}

export default connect(mapStateToProps, {
  loadCampaign
})(ResultPage)