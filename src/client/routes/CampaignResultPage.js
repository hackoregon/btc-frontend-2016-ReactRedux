import React, {Component, PropTypes} from 'react';

import {Grid} from 'react-bootstrap';
import {Row} from 'react-bootstrap';
import {Col} from 'react-bootstrap';
import {Panel} from 'react-bootstrap';
import {Table} from 'react-bootstrap';
import {NavbarCollapsible} from '../components/BootstrapNavigation';
import {Nav} from 'react-bootstrap';
import CustomNavRouterLink from '../components/CustomNav/CustomNavRouterLink.jsx';
import ResultHeader from '../containers/Result/ResultHeader.jsx';
import ResultDonorsCard from '../containers/Result/ResultDonorsCard.jsx';
import ResultLocationStoryCard from '../containers/Result/ResultLocationStoryCard.jsx';
import ResultWhen from '../containers/Result/ResultWhen.jsx';
import ResultPage from '../containers/Result/ResultPage.jsx';
import ResultSpendingCard from '../containers/Result/ResultSpendingCard.jsx';
import { fetchResultData } from '../actions/index.js';

class CampaignResultPage extends Component {
  componentWillMount() {
    let filerId = this.props.params.filer_id != undefined ? this.props.params.filer_id : '913'

  }
  render() {
    return (
      <ResultPage params={this.props.params} filerId={this.props.params.filer_id}>

      </ResultPage>
    )
  }
  //   return (
  //     <div>
  //       <NavbarCollapsible inverse={false} fixedTop={true} fluid={true} brand='Behind the Curtain' params={this.props.params}>
  //         <Nav pullRight={true} params={this.props.params}>
  //           <CustomNavRouterLink className="nav-item" name="Search" params={this.props.params}></CustomNavRouterLink>
  //           <CustomNavRouterLink className="nav-item" name="Oregon" params={this.props.params}></CustomNavRouterLink>
  //           <CustomNavRouterLink className="nav-item" name="Campaigns" params={this.props.params}></CustomNavRouterLink>
  //           <CustomNavRouterLink className="nav-item" name="Candidates" params={this.props.params}></CustomNavRouterLink>
  //           <CustomNavRouterLink className="nav-item" name="Donors" params={this.props.params}></CustomNavRouterLink>
  //           <CustomNavRouterLink className="nav-item" name="About" params={this.props.params}></CustomNavRouterLink>
  //           <CustomNavRouterLink className="nav-item" name="FAQ" params={this.props.params}></CustomNavRouterLink>
  //         </Nav>
  //         <Nav pullRight={false} params={this.props.params}></Nav>
  //       </NavbarCollapsible>
  //
  //       <Grid fluid={false} style={{
  //         marginTop: '60px',
  //         fontWeight: '200px'
  //       }} params={this.props.params}>
  //         <ResultHeader style={{
  //           textAlign: 'center'
  //         }} params={this.props.params}></ResultHeader>
  //
  //         <Col xs={12} md={12} sm={12} lg={12} params={this.props.params}>
  //           <ResultDonorsCard params={this.props.params}></ResultDonorsCard>
  //           <ResultSpendingCard param={this.props.params}></ResultSpendingCard>
  //           <ResultWhen param={this.props.params}></ResultWhen>
  //           <ResultLocationStoryCard params={this.props.params}></ResultLocationStoryCard>
  //         </Col>
  //         <div className="footer container-fluid" params={this.props.params}>
  //           <div className="container-fluid" params={this.props.params}>
  //             <Col xs={12} md={3} sm={3} lg={3} params={this.props.params}>
  //               <h4 className="underlined text-center" style={{
  //                 fontWeight: '200'
  //               }} params={this.props.params}>
  //                 <span params={this.props.params}>About</span>
  //               </h4>
  //               <div className="text-center nav-item" params={this.props.params}>
  //                 <a href="#" params={this.props.params}>
  //                   <span params={this.props.params}>2016 Team</span>
  //                 </a>
  //               </div>
  //             </Col>
  //             <Col xs={12} md={3} sm={3} lg={3} params={this.props.params}>
  //               <h4 className="underlined text-center" style={{
  //                 fontWeight: 200
  //               }} params={this.props.params}>
  //                 <span params={this.props.params}>Take action</span>
  //               </h4>
  //               <div className="text-center nav-item" params={this.props.params}>
  //                 <a href="#" params={this.props.params}>
  //                   <span params={this.props.params}>Register to vote</span>
  //                 </a>
  //               </div>
  //             </Col>
  //             <Col xs={12} md={3} sm={3} lg={3} params={this.props.params}>
  //               <h4 className="underlined text-center" style={{
  //                 fontWeight: 200
  //               }} params={this.props.params}>
  //                 <span params={this.props.params}>Contact</span>
  //               </h4>
  //               <div className="text-center nav-item" params={this.props.params}>
  //                 <a href="#" params={this.props.params}>
  //                   <span params={this.props.params}>Twitter</span>
  //                 </a>
  //               </div>
  //               <div className="text-center nav-item" params={this.props.params}>
  //                 <a href="#" params={this.props.params}>
  //                   <span params={this.props.params}>Email</span>
  //                 </a>
  //               </div>
  //             </Col>
  //             <Col xs={12} md={3} sm={3} lg={3} params={this.props.params}>
  //               <h4 className="underlined text-center" style={{
  //                 fontWeight: 200
  //               }} params={this.props.params}>
  //                 <span params={this.props.params}>Explore</span>
  //               </h4>
  //               <div className="text-center nav-item" params={this.props.params}>
  //                 <a href="#" params={this.props.params}>
  //                   <span params={this.props.params}>Search campaigns</span>
  //                 </a>
  //               </div>
  //             </Col>
  //           </div>
  //         </div>
  //       </Grid>
  //
  //     </div>
  //   );
  // }
}

export default CampaignResultPage;
