import React, {Component, PropTypes} from 'react';
import ResultPage from '../containers/Result/ResultPage.jsx';
import BTCNav from '../components/Navigation/BTCNav.jsx';
import { Grid } from 'react-bootstrap';
class CampaignResultPage extends Component {
  componentWillMount() {
    let filerId = this.props.params.filer_id != undefined ? this.props.params.filer_id : '913'
  }

  render() {
    return (
      <div>
        <BTCNav />
        <Grid  style= {{paddingTop:'100px',fontWeight: '200px'}} fluid={ true }>
        <ResultPage
          params={this.props.params} filerId={this.props.params.filer_id} />
        </Grid>
      </div>
    )
  }
}

export default CampaignResultPage;
