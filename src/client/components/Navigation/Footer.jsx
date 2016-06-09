
import React, { Component, PropTypes } from 'react';
import {Grid, Row, Col} from 'react-flexbox-grid';
import './Footer.css'

class Footer extends Component {

render(){
        let linkStyle = {fontWeight: '200px'}
        return (
              <Grid className="footer" style={{
                  color: 'white',
                  backgroundColor: '#4D92C2',
                  maxHeight: '15%',
                  position: 'fixed',
                  left: '0px',
                  bottom: '0px',
                  width: '100%',
                  zIndex: '1020',
                  margin: '0px',
                  padding: '3px'
              }}
              params={ this.props.params }>
                  <Row xs={12}
                      md={12} lg={12}
                      center='xs'
                      middle='xs'
                      params={ this.props.params }>

                      <Col xs={ 2 }
                           md={ 1 }
                           sm={ 1 }
                           lg={ 1 }
                           params={ this.props.params }>
                      <a className="footer-link" syle={linkStyle} href="#"
                          style={ {    fontWeight: '200'} }
                          params={ this.props.params }><span params={ this.props.params }>About</span></a>
                      </Col>

                      <Col xs={ 2 }
                               md={ 1 }
                               sm={ 1 }
                               lg={ 1 }
                               params={ this.props.params }>
                      <a className="footer-link" href="#" syle={linkStyle} params={ this.props.params }><span params={ this.props.params }>2016 Team</span></a>
                      </Col>

                      <Col xs={ 2 }
                           md={ 1 }
                           sm={ 1 }
                           lg={ 1 }
                           params={ this.props.params }>
                      <a className="footer-link" href="#"
                          params={ this.props.params }><span params={ this.props.params }>Take action</span></a>
                      </Col>

                      <Col xs={ 2 }
                           md={ 1 }
                           sm={ 1 }
                           lg={ 1 }
                           params={ this.props.params }>
                     <a className="footer-link" href="#" params={ this.props.params }><span params={ this.props.params }>Register to vote</span></a>
                      </Col>

                      <Col xs={ 2 }
                           md={ 1 }
                           sm={ 1 }
                           lg={ 1 }
                           params={ this.props.params }>
                      <a className="footer-link" href="#"
                          params={ this.props.params }><span params={ this.props.params }>Contact</span></a>
                      </Col>

                      <Col xs={ 2 }
                          md={ 1 }
                          sm={ 1 }
                          lg={ 1 }
                          params={ this.props.params }>
                      <a className="footer-link" href="#" syle={linkStyle} params={ this.props.params }><span params={ this.props.params }>Twitter</span></a>
                      </Col>

                      <Col xs={ 2 }
                           md={ 1 }
                           sm={ 1 }
                           lg={ 1 }
                           params={ this.props.params }>
                      <a className="footer-link" href="#" syle={linkStyle} params={ this.props.params }><span params={ this.props.params }>Email</span></a>
                      </Col>

                      <Col xs={ 2 }
                           md={ 1 }
                           sm={ 1 }
                           lg={ 1 }
                           params={ this.props.params }>
                      <a className="footer-link" href="#" syle={linkStyle}
                          params={ this.props.params }><span params={ this.props.params }>Explore</span></a>
                      </Col>

                      <Col xs={ 2 }
                           md={ 1 }
                           sm={ 1 }
                           lg={ 1 }
                           params={ this.props.params }>
                      <a className="footer-link"  href="#" syle={linkStyle} params={ this.props.params }><span params={ this.props.params }>Search</span></a>
                      </Col>

                      <Col xs={ 2 }
                           md={ 1 }
                           sm={ 1 }
                           lg={ 1 }
                           params={ this.props.params }>
                      <a className="footer-link" href="#" syle={linkStyle} params={ this.props.params }><span params={ this.props.params }>Link</span></a>
                      </Col>

                      <Col xs={ 2 }
                           md={ 1 }
                           sm={ 1 }
                           lg={ 1 }
                           params={ this.props.params }>
                          <a className="footer-link" href="#" syle={linkStyle} params={ this.props.params }><span params={ this.props.params }>Link</span></a>
                      </Col>

                      <Col xs={ 2 }
                           md={ 1 }
                           sm={ 1 }
                           lg={ 1 }
                           params={ this.props.params }>
                          <a className="footer-link" href="#" syle={linkStyle} params={ this.props.params }><span params={ this.props.params }>Link</span></a>
                      </Col>

                  </Row>
              </Grid>
    )
  }
}

export default Footer;
