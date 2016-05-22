import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {loadDonor} from '../../actions'
import ResultHeader from '../Result/ResultHeader.jsx'
// import ResultDonorsCard from './ResultDonorsCard.jsx'
// import ResultSummaryCard from './ResultSummaryCard.jsx'
// import ResultLocationStoryCard from './ResultLocationStoryCard.jsx'
// import ResultSpendingCard from './ResultSpendingCard.jsx'
// import ResultWhen from './ResultWhen.jsx'
import { Grid } from 'react-bootstrap';

function loadData(props) {
  const { donor_name } = props;
  props.loadDonor(donor_name);
}

class DonorPage extends Component {
  constructor(props){
    super(props)
  }
  componentWillMount() {
    loadData(this.props);
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.donor_name !== this.props.donor_name){
      loadData(nextProps)
    }
  }

  render(){
    
    const { donors } = this.props
    if (!donors) {
      // needs loading icon here
      return <h1><i>Loading... </i></h1>
    }

    let size = Object.keys(donors).length
    let headerTitle = this.props.donor_name + " " + size;

    return (
      <div {...this.props}>
        <ResultHeader
          candidate={headerTitle}
          // key={campaign.filerId}
          //race = { campaign.race } 
        />
        
      </div>
    )
  }
}

DonorPage.propTypes = {
  campaign: PropTypes.object,
  // searchTerm: PropTypes.string.isRequired,
  donor_name: PropTypes.string.isRequired
}

function mapStateToProps(state, ownProps) {
  const { donor_name } = ownProps.params
  const {
    entities: { donors }
  } = state;
  // const donor = transactions[donor_name]
  return {
    // donor_name, donor
    donors
  }
}

export default connect(mapStateToProps, {
  loadDonor
})(DonorPage)