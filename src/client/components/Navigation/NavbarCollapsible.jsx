import React, {Component, PropTypes} from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import NavRouterLink from './NavRouterLink.jsx';
import {IndexLink} from 'react-router';
import Radium from 'radium';

const styles = {
  ':hover': {
    fontFamily: 'OpenSansBold'
  },

  base: {
    backgroundColor: '#64BCBB',
    fontSize: '1em',
    height: '75px'
  },

  logo: {
    color: '#FFF',
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)'
  }
}

@Radium
class NavbarCollapsible extends Component {
  makeLinks() {
    let links = this.props.menuItems.map((name, index) => {
      return (<NavRouterLink classes={this.props.linkClasses} name={name} params={this.props.params} key={index}/>);
    })
    return links
  }

  render() {
    const {brandName} = this.props;
    return (
      <Navbar {...this.props} style={styles.base}>
        <Navbar.Header>
          <Navbar.Brand>
            <IndexLink to="/">
              <span style={styles.logo}>{brandName}</span>
            </IndexLink>
          </Navbar.Brand>
          <Navbar.Toggle/>
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight={ true } params={ this.props.params }>
            {this.makeLinks()}
          </Nav>
                       
          <Nav pullRight={ false } params={ this.props.params }></Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

NavbarCollapsible.propTypes = {
  brandName: PropTypes.string,
  params: PropTypes.string,
  menuItems: PropTypes.arrayOf(PropTypes.string),
  linkClasses: PropTypes.string
};

NavbarCollapsible.defaultProps = {
  brandName: 'Hack Oregon'
};

export default NavbarCollapsible;
