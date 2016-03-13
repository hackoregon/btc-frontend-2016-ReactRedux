import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {loadCampaign} from '../../actions'
import ResultHeader from './ResultHeader.jsx'

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
    debugger
    loadData(this.props);
  }
  componentWillReceiveProps(nextProps) {
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
    return (
      <div>
        <ResultHeader
          candidate={campaign.candidate_name}
          key={campaign.filerId}
          race = { campaign.race } />

      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  debugger
  const { filer_id } = ownProps.params
  const {
    entities: { campaign },
    searchData: { searchTerm }
  } = state;

  return {
    filer_id, searchTerm, campaign
  }
}

export default connect(mapStateToProps, {
  loadCampaign
})(ResultPage)