import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
// import {loadCampaign} from '../../actions'
import ResultHeader from './ResultHeader.jsx'
import ResultDonorsCard from './ResultDonorsCard.jsx'
import ResultSummaryCard from './ResultSummaryCard.jsx'
import ResultLocationStoryCard from './ResultLocationStoryCard.jsx'
import ResultSpendingCard from './ResultSpendingCard.jsx'
import ResultWhen from './ResultWhen.jsx';
import Spinner from 'react-spinkit';
// function loadData(props) {
//   const { filer_id } = props;
//   props.loadCampaign(filer_id);
// }

const ResultPage = ({campaign, filerId, contributions, stateInfo}) => {
    if (!campaign) {
        // needs loading icon here
        return (<Spinner spinnerName='cube-grid' />);
    }

    return (
        <div>
            <ResultHeader candidate={campaign.candidateName} key={campaign.filerId} race={campaign.race}/>
            <ResultSummaryCard total={campaign.total} totalSpent={campaign.totalSpent} grassroots={campaign.grassroots} instate={campaign.instate}/>
            <ResultDonorsCard contributions={contributions}/>
            <ResultSpendingCard params={filerId}/>
            <ResultWhen/>
            <ResultLocationStoryCard stateContributions={stateInfo}/>
        </div>
    )
};

// ResultPage.propTypes = {
//   campaign: PropTypes.object,
//   // searchTerm: PropTypes.string.isRequired,
//   filerId: PropTypes.string.isRequired
// }

// function mapStateToProps(state, ownProps) {
//   const { filer_id } = ownProps.params
//   const {
//     entities: { campaigns }
//   } = state;
//   const campaign = campaigns[filer_id]
//   return {
//     filer_id, campaign
//   }
// }

export default ResultPage;
// export default connect(mapStateToProps, {
//   loadCampaign
// })(ResultPage)