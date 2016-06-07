
import React, { Component, PropTypes } from 'react';

import { Col } from 'react-bootstrap';

class Footer extends Component {

render(){
        return (
              <div className="footer container-fluid" params={ this.props.params }>
                  <div className="container-fluid" params={ this.props.params }>
                      <Col xs={ 12 }
                           md={ 3 }
                           sm={ 3 }
                           lg={ 3 }
                           params={ this.props.params }>
                      <h4 className="underlined text-center"
                          style={ {    fontWeight: '200'} }
                          params={ this.props.params }><span params={ this.props.params }>About</span></h4>
                      <div className="text-center nav-item" params={ this.props.params }>
                          <a href="#" params={ this.props.params }><span params={ this.props.params }>2016 Team</span></a>
                      </div>
                      </Col>
                      <Col xs={ 12 }
                           md={ 3 }
                           sm={ 3 }
                           lg={ 3 }
                           params={ this.props.params }>
                      <h4 className="underlined text-center"
                          style={ {    fontWeight: 200} }
                          params={ this.props.params }><span params={ this.props.params }>Take action</span></h4>
                      <div className="text-center nav-item" params={ this.props.params }>
                          <a href="#" params={ this.props.params }><span params={ this.props.params }>Register to vote</span></a>
                      </div>
                      </Col>
                      <Col xs={ 12 }
                           md={ 3 }
                           sm={ 3 }
                           lg={ 3 }
                           params={ this.props.params }>
                      <h4 className="underlined text-center"
                          style={ {    fontWeight: 200} }
                          params={ this.props.params }><span params={ this.props.params }>Contact</span></h4>
                      <div className="text-center nav-item" params={ this.props.params }>
                          <a href="#" params={ this.props.params }><span params={ this.props.params }>Twitter</span></a>
                      </div>
                      <div className="text-center nav-item" params={ this.props.params }>
                          <a href="#" params={ this.props.params }><span params={ this.props.params }>Email</span></a>
                      </div>
                      </Col>
                      <Col xs={ 12 }
                           md={ 3 }
                           sm={ 3 }
                           lg={ 3 }
                           params={ this.props.params }>
                      <h4 className="underlined text-center"
                          style={ {    fontWeight: 200} }
                          params={ this.props.params }><span params={ this.props.params }>Explore</span></h4>
                      <div className="text-center nav-item" params={ this.props.params }>
                          <a href="#" params={ this.props.params }><span params={ this.props.params }>Search campaigns</span></a>
                      </div>
                      </Col>
                  </div>
              </div>
    )
  }
}

export default Footer;
