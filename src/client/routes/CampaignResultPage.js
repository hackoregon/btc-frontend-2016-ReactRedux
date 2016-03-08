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
import ResultDonorsList from '../containers/Result/ResultDonorsList.jsx';
import ResultLocationStoryCard from '../containers/Result/ResultLocationStoryCard.jsx';

class CampaignResultPage extends Component {

  render() {
    return (
      <div>
        <NavbarCollapsible inverse={false} fixedTop={true} fluid={true} branding={{
          name: 'Behind the Curtain',
          href: '#'
        }} params={this.props.params}>
          <Nav pullRight={true} params={this.props.params}>
            <CustomNavRouterLink className="nav-item" name="Search" params={this.props.params}></CustomNavRouterLink>
            <CustomNavRouterLink className="nav-item" name="Oregon" params={this.props.params}></CustomNavRouterLink>
            <CustomNavRouterLink className="nav-item" name="Campaigns" params={this.props.params}></CustomNavRouterLink>
            <CustomNavRouterLink className="nav-item" name="Candidates" params={this.props.params}></CustomNavRouterLink>
            <CustomNavRouterLink className="nav-item" name="Donors" params={this.props.params}></CustomNavRouterLink>
            <CustomNavRouterLink className="nav-item" name="About" params={this.props.params}></CustomNavRouterLink>
            <CustomNavRouterLink className="nav-item" name="FAQ" params={this.props.params}></CustomNavRouterLink>
          </Nav>
          <Nav pullRight={false} params={this.props.params}></Nav>
        </NavbarCollapsible>

        <Grid fluid={false} style={{
          marginTop: '60px',
          fontWeight: '200px'
        }} params={this.props.params}>
          <ResultHeader style={{
            textAlign: 'center'
          }} params={this.props.params}></ResultHeader>
          <ResultDonorsList params={this.props.params}></ResultDonorsList>
          <Row style={{
            textAlign: 'center',
            overflow: 'hidden'
          }} params={this.props.params}>
            <Col xs={12} sm={6} style={{
              display: 'inline-block',
              float: 'none',
              textAlign: 'left',
              marginRight: '-4px'
            }} params={this.props.params}>
              <Table striped={false} bordered={true} condensed={true} hover={true} className="col-sm-6 col-xs-12" params={this.props.params}>
                <thead className="btn btn-default col-xs-12" params={this.props.params}>
                  <tr params={this.props.params}>
                    <th params={this.props.params}>
                      <span params={this.props.params}>Text in th</span>
                    </th>
                  </tr>
                </thead>
                <tbody params={this.props.params}>
                  <tr params={this.props.params}>
                    <td params={this.props.params}>
                      <Col sm={7} params={this.props.params}>
                        <span params={this.props.params}>Empty Panel</span>
                      </Col>
                      <Col sm={2} params={this.props.params}>
                        <span params={this.props.params}>Empty Panel</span>
                      </Col>
                      <Col sm={3} params={this.props.params}>
                        <span params={this.props.params}>Empty Panel</span>
                      </Col>
                    </td>
                  </tr>
                  <tr params={this.props.params}>
                    <td params={this.props.params}>
                      <Col sm={7} params={this.props.params}>
                        <span params={this.props.params}>Empty Panel</span>
                      </Col>
                      <Col sm={2} params={this.props.params}>
                        <span params={this.props.params}>Empty Panel</span>
                      </Col>
                      <Col sm={3} params={this.props.params}>
                        <span params={this.props.params}>Empty Panel</span>
                      </Col>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Col>
            <Col xs={12} sm={6} style={{
              display: 'inline-block',
              float: 'none',
              textAlign: 'left',
              marginRight: '-4px'
            }} params={this.props.params}>
              <Table striped={false} bordered={true} condensed={true} hover={true} className="col-sm-6 col-xs-12" params={this.props.params}>
                <thead className="btn btn-default col-xs-12" params={this.props.params}>
                  <tr params={this.props.params}>
                    <th params={this.props.params}>
                      <span params={this.props.params}>Text in th</span>
                    </th>
                  </tr>
                </thead>
                <tbody params={this.props.params}>
                  <tr params={this.props.params}>
                    <td params={this.props.params}>
                      <Col sm={7} params={this.props.params}>
                        <span params={this.props.params}>Empty Panel</span>
                      </Col>
                      <Col sm={2} params={this.props.params}>
                        <span params={this.props.params}>Empty Panel</span>
                      </Col>
                      <Col sm={3} params={this.props.params}>
                        <span params={this.props.params}>Empty Panel</span>
                      </Col>
                    </td>
                  </tr>
                  <tr params={this.props.params}>
                    <td params={this.props.params}>
                      <Col sm={7} params={this.props.params}>
                        <span params={this.props.params}>Empty Panel</span>
                      </Col>
                      <Col sm={2} params={this.props.params}>
                        <span params={this.props.params}>Empty Panel</span>
                      </Col>
                      <Col sm={3} params={this.props.params}>
                        <span params={this.props.params}>Empty Panel</span>
                      </Col>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
          <Col xs={12} md={12} sm={12} lg={12} params={this.props.params}>
            <ResultLocationStoryCard params={this.props.params}></ResultLocationStoryCard>
            <Panel header="How does the money flow?" className="text-center" style={{
              fontWeight: 200
            }} params={this.props.params}>
              <p params={this.props.params}>
                <span params={this.props.params}>The diagram below shows the major categories of donors and their contributions to candidates are ultimately expended. The thickness of each line represents the relative size of each category of funds.</span>
              </p>
              <Panel bsSize="md" params={this.props.params}></Panel>
            </Panel>
            <Panel header="How does the money flow?" className="text-center" style={{
              fontWeight: 200
            }} params={this.props.params}>
              <p params={this.props.params}>
                <span params={this.props.params}>The diagram below shows the major categories of donors and their contributions to candidates are ultimately expended. The thickness of each line represents the relative size of each category of funds.</span>
              </p>
              <Panel bsSize="md" params={this.props.params}></Panel>
            </Panel>
          </Col>
          <div className="footer container-fluid" params={this.props.params}>
            <div className="container-fluid" params={this.props.params}>
              <Col xs={12} md={3} sm={3} lg={3} params={this.props.params}>
                <h4 className="underlined text-center" style={{
                  fontWeight: '200'
                }} params={this.props.params}>
                  <span params={this.props.params}>About</span>
                </h4>
                <div className="text-center nav-item" params={this.props.params}>
                  <a href="#" params={this.props.params}>
                    <span params={this.props.params}>2016 Team</span>
                  </a>
                </div>
              </Col>
              <Col xs={12} md={3} sm={3} lg={3} params={this.props.params}>
                <h4 className="underlined text-center" style={{
                  fontWeight: 200
                }} params={this.props.params}>
                  <span params={this.props.params}>Take action</span>
                </h4>
                <div className="text-center nav-item" params={this.props.params}>
                  <a href="#" params={this.props.params}>
                    <span params={this.props.params}>Register to vote</span>
                  </a>
                </div>
              </Col>
              <Col xs={12} md={3} sm={3} lg={3} params={this.props.params}>
                <h4 className="underlined text-center" style={{
                  fontWeight: 200
                }} params={this.props.params}>
                  <span params={this.props.params}>Contact</span>
                </h4>
                <div className="text-center nav-item" params={this.props.params}>
                  <a href="#" params={this.props.params}>
                    <span params={this.props.params}>Twitter</span>
                  </a>
                </div>
                <div className="text-center nav-item" params={this.props.params}>
                  <a href="#" params={this.props.params}>
                    <span params={this.props.params}>Email</span>
                  </a>
                </div>
              </Col>
              <Col xs={12} md={3} sm={3} lg={3} params={this.props.params}>
                <h4 className="underlined text-center" style={{
                  fontWeight: 200
                }} params={this.props.params}>
                  <span params={this.props.params}>Explore</span>
                </h4>
                <div className="text-center nav-item" params={this.props.params}>
                  <a href="#" params={this.props.params}>
                    <span params={this.props.params}>Search campaigns</span>
                  </a>
                </div>
              </Col>
            </div>
          </div>
        </Grid>

      </div>
    );
  }
}

export default CampaignResultPage;
