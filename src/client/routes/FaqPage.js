
import React, { Component, PropTypes } from 'react';

import { Grid } from 'react-bootstrap';
import { Panel } from 'react-bootstrap';
import { PanelGroup } from '../components/Bootstrap';
import ReactMarkdown from 'react-markdown';
import BTCNav from '../components/Navigation/BTCNav.jsx';
import Footer from '../components/Navigation/Footer.jsx';

class FaqPage extends Component {
    getFaqData() {
        const fileData = require('../assets/faqData.hson');
        return fileData.map((obj,key) => {
          return (
              <Panel header={ obj.q } eventKey={ key } key={ key }>
                <p className="faq-answer">
                  <ReactMarkdown source={ obj.a.replace(/\n/g, '<br/>') } />
                </p>
              </Panel>
            )
        })
    }

    render() {
        return (
            <div>
                <BTCNav />
                <Grid fluid={ true }
                      style={ {    marginTop: '100px',    fontWeight: '200px'} }
                      params={ this.props.params }>
                    <PanelGroup accordion={ true }
                                defaultActiveKey={ 1 }
                                params={ this.props.params }>

                        { this.getFaqData() }

                    </PanelGroup>
                </Grid>
              <Footer />
            </div>
            );
    }
}

export default FaqPage;
