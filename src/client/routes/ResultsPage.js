import React, {Component, PropTypes} from 'react';
import {Col, Grid} from 'react-flexbox-grid';
import SearchResultsList from '../containers/SearchResults/SearchResultsList.jsx';
import SearchResultsForm from '../containers/SearchResults/SearchResultsForm.jsx';
import SearchResultsAlert from '../components/SearchResults/SearchResultsAlert.jsx';
import BTCNav from '../components/Navigation/BTCNav.jsx';

class ResultsPage extends Component {

    render() {
        return (
            <div {...this.props} params={this.props.params}>
                <BTCNav params={this.props.params} />
                <Grid fluid>
                  <SearchResultsList striped={true} bordered={false} condensed={false} hover={true} params={this.props.params}></SearchResultsList>
                </Grid>
            </div>
        );
    }
}

export default ResultsPage;


//
// import React, { Component, PropTypes } from 'react';
//
// import { Grid } from 'react-bootstrap';
// import { Col } from 'react-bootstrap';
// import SearchResultsList from '../containers/SearchResults/SearchResultsList.jsx';
// import SearchResultsForm from '../containers/SearchResults/SearchResultsForm.jsx';
// import BTCNav from '../components/Navigation/BTCNav.jsx';
//
// class ResultsPage extends Component {
//     render() {
//         console.log('results page params\n',this.props.params)
//         return (
//             <div>
//                 <BTCNav />
//                 <Grid fluid={ true }
//                       style={ {    marginTop: '100px',    fontWeight: '200px'} }
//                       params={ this.props.params }>
//                     <Col xs={ 12 }
//                          md={ 12 }
//                          sm={ 12 }
//                          lg={ 12 }
//                          params={ this.props.params }>
//                     <SearchResultsList striped={ true }
//                                        bordered={ false }
//                                        condensed={ false }
//                                        hover={ true }
//                                        params={ this.props.params }></SearchResultsList>
//                     </Col>
//                 </Grid>
//             </div>
//             );
//     }
// }
//
// ResultsPage.propTypes = {
//   params: PropTypes.string
// }
//
// export default ResultsPage;
