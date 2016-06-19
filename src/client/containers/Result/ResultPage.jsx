import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
// import {loadCampaign} from '../../actions'
import ResultHeader from './ResultHeader.jsx'
import ResultDonorsCard from './ResultDonorsCard.jsx'
import ResultSummaryCard from './ResultSummaryCard.jsx'
import ResultLocationStoryCard from './ResultLocationStoryCard.jsx'
import ResultSpendingCard from './ResultSpendingCard.jsx'
import ResultWhen from './ResultWhen.jsx';
import Loading from '../../components/Loading/Loading.jsx';
// function loadData(props) {
//   const { filer_id } = props;
//   props.loadCampaign(filer_id);
// }

const ResultPage = ({year, campaign, filerId, contributions, sums, stateInfo}) => {
    if (!campaign) {
        // needs loading icon here
        return (<Loading name='cube-grid' />);
    }

    const newMoney = _.sumBy([...contributions.ind,...contributions.grassroots,...contributions.biz], 'amount');
    const xferMoney = _.sumBy([...contributions.pac,...contributions.party],'amount');

    return (

        <div>
            <ResultHeader candidate={campaign.candidateName} key={campaign.filerId} race={campaign.race}/>
            <ResultSummaryCard year={year} newTotal={newMoney} xferTotal={xferMoney} />
            <ResultDonorsCard year={year} contributions={contributions}/>
            <ResultSpendingCard year={year} params={filerId}/>
            <ResultWhen year={year} sums={sums} />
            <ResultLocationStoryCard year={year} stateContributions={stateInfo}/>
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