import React, {Component, PropTypes} from 'react';
import ResultPage from '../containers/Result/ResultPage.jsx';
import BTCNav from '../components/BTCNav.jsx';

class CampaignResultPage extends Component {
  componentWillMount() {
    let filerId = this.props.params.filer_id != undefined ? this.props.params.filer_id : '913'
  }

  render() {
    return (
      <div>
      <BTCNav />
      <ResultPage style= {{paddingTop:'100px'}}
        params={this.props.params} filerId={this.props.params.filer_id} />
    </div>
    )
  }
}

export default CampaignResultPage;
