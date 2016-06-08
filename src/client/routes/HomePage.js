
import React, { Component, PropTypes } from 'react';

// import { Grid } from 'react-bootstrap';
// import { Row } from 'react-bootstrap';
// import { Col } from 'react-bootstrap';
import {Grid, Row, Col}  from 'react-flexbox-grid';
import { Panel } from 'react-bootstrap';
import DataBoxGroup from '../components/DataBoxes/DataBoxGroup.jsx';
import BTCNav from '../components/Navigation/BTCNav.jsx';
import Footer from '../components/Navigation/Footer.jsx'
import SearchResultsForm from '../containers/SearchResults/SearchResultsForm.jsx';


class HomePage extends Component {

    render() {
        return (
            <div {...this.props}>
              <BTCNav />
                <Grid fluid params={ this.props.params }
                  style={{marginTop:'100px'}}>

                      <DataBoxGroup boxes={[
                        {name:"Expenditures", value:"$313,412,231"},
                        {name:"Contributions", value:"$307,489,692"},
                        {name:"Average Cost per Ballot", value:"$48"}
                      ]} />

                    <Row params={ this.props.params }>
                        <Col xs={ 12 }
                             md={ 12 }
                             sm={ 12 }
                             lg={ 12 }
                             params={ this.props.params }>
                        </Col>
                    </Row>
                    <Col style={{    marginTop: '40px'} }
                         xs={ 12 }
                         md={ 12 }
                         sm={ 12 }
                         lg={ 12 }
                         params={ this.props.params }>
                    <Panel header="How does the money flow?"
                           className="text-center"
                           style={ {    fontWeight: 200} }
                           params={ this.props.params }>
                        <p params={ this.props.params }>
                            <span params={ this.props.params }>The diagram below shows the major categories of donors and their contributions to candidates are ultimately expended. The thickness of each line represents the relative size of each category of funds.</span>
                        </p>
                        <Panel bsSize="md" params={ this.props.params }></Panel>
                    </Panel>
                    <Panel header="How does the money flow?"
                           className="text-center"
                           style={ {    fontWeight: 200} }
                           params={ this.props.params }>
                        <p params={ this.props.params }>
                            <span params={ this.props.params }>The diagram below shows the major categories of donors and their contributions to candidates are ultimately expended. The thickness of each line represents the relative size of each category of funds.</span>
                        </p>
                        <Panel bsSize="md" params={ this.props.params }></Panel>
                    </Panel>
                    <Panel header="How does the money flow?"
                           className="text-center"
                           style={ {    fontWeight: 200} }
                           params={ this.props.params }>
                        <p params={ this.props.params }>
                            <span params={ this.props.params }>The diagram below shows the major categories of donors and their contributions to candidates are ultimately expended. The thickness of each line represents the relative size of each category of funds.</span>
                        </p>
                        <Panel bsSize="md" params={ this.props.params }></Panel>
                    </Panel>
                    </Col>
                    <Footer />
                </Grid>
            </div>
          );
    }
}

export default HomePage;
