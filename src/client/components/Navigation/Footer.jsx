
import React, { Component, PropTypes } from 'react';
import {Grid, Row, Col} from 'react-flexbox-grid';
import NavRouterLink from './NavRouterLink.jsx';
import './Footer.css'

class Footer extends Component {

render(){
        let linkStyle = {fontWeight: '200px'}
        return (
                  <footer {...this.props} params={this.props.params} className="footer" style={{
                      zIndex: '1020',
                      padding: '3rem',
                      backgroundColor:'#4D92C2'
                  }} >
                  <Row
                  xs={12}
                      md={12} lg={12}
                      center='xs'
                      middle='xs'
                      params={ this.props.params }>
                  
                      <Col xs={ 2 }
                           md={ 1 }
                           sm={ 1 }
                           lg={ 1 }
                           start='xs'
                           params={ this.props.params }>
                      <NavRouterLink name={'About'} />
                      </Col>

                      <Col xs={ 2 }
                               md={ 1 }
                               sm={ 1 }
                               lg={ 1 }
                               params={ this.props.params }>
                      <NavRouterLink name={'FAQ'} />
                      </Col>

                      
                      <Col xs={ 2 }
                           md={ 1 }
                           sm={ 1 }
                           lg={ 1 }
                           params={ this.props.params }>
                      <a className="footer-link" href="https://secure.sos.state.or.us/orestar/vr/register.do" target="_blank" params={ this.props.params }><span params={ this.props.params }>Register to vote</span></a>
                      </Col>
                    
                      <Col xs={ 2 }
                           md={ 1 }
                           sm={ 1 }
                           lg={ 1 }
                           params={ this.props.params }>
                      <a className="footer-link" href="mailto:catherine@hackoregon.org" target="_blank" params={ this.props.params }><span params={ this.props.params }>Email</span></a>
                      </Col>

                      <Col xs={ 2 }
                          md={ 1 }
                          sm={ 1 }
                          lg={ 1 }
                          params={ this.props.params }>
                      <a className="footer-link" href="https://twitter.com/HackOregon" target="_blank" style={linkStyle} params={ this.props.params }><span params={ this.props.params }>Twitter</span></a>
                      </Col>

                      <Col xs={ 2 }
                          md={ 1 }
                          sm={ 1 }
                          lg={ 1 }
                          params={ this.props.params }>
                      <a className="footer-link" href="https://github.com/hackoregon" target="_blank" style={linkStyle} params={ this.props.params }><span params={ this.props.params }>GitHub</span></a>
                      </Col>
                      

                      
                      </Row>
                  </footer>

    )
  }
}

export default Footer;
