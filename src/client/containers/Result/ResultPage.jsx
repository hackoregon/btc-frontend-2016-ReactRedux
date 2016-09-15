import React, { PropTypes, Component } from 'react'
import ResultHeader from './ResultHeader.jsx'
import ResultDonorsCard from './ResultDonorsCard.jsx'
import ResultSummaryCard from './ResultSummaryCard.jsx'
import ResultLocationStoryCard from './ResultLocationStoryCard.jsx'
import ResultSpendingCard from './ResultSpendingCard.jsx'
import ResultWhen from './ResultWhen.jsx';
import Loading from '../../components/Loading/Loading.jsx';
import _ from 'lodash';

class ResultPage extends Component {
    render() {
      const {year, campaign, contributions, spendData, sums, stateInfo} = this.props;
      if (!campaign) {
        return (<Loading name='cube-grid' />);
    }

    const newMoney = _.sumBy([...contributions.ind,...contributions.grassroots,...contributions.biz], 'amount');
    const xferMoney = _.sumBy([...contributions.pac,...contributions.party],'amount');

    return (
        <div>
            <ResultHeader candidate={campaign.candidateName} key={campaign.filerId} race={campaign.race}/>
            <ResultSummaryCard year={year} newTotal={newMoney} xferTotal={xferMoney} />
            <ResultDonorsCard year={year} contributions={contributions}/>
            <ResultSpendingCard year={year} data={spendData}/>
            <ResultWhen year={year} sums={sums} />
            <ResultLocationStoryCard year={year} stateContributions={stateInfo}/>
        </div>
    )}
}

ResultPage.propTypes = {
  campaign: PropTypes.object,
  year: PropTypes.string.isRequired,
  contributions: PropTypes.object.isRequired,
  spendData: PropTypes.object.isRequired,
  stateInfo: PropTypes.object.isRequired,
  sums: PropTypes.object.isRequired
}


export default ResultPage;
