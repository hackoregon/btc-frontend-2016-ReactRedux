import React from 'react';
import ResultPage from '../containers/Result/ResultPage.jsx';
// import BTCNav from '../components/BTCNav.jsx';

const CampaignResultPage = () => ({
  render() {
    return (
      <div>
        <ResultPage style={{
          paddingTop: '60px',
        }} params={this.props.params}
          filerId={this.props.params.filer_id}
        />
        </div>
    );
  },
});
export default CampaignResultPage;
