import React, {Component, PropTypes} from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import NavRouterLink from './NavRouterLink.jsx';
import {IndexLink} from 'react-router';
import './Navbar.css'
const styles = {
  ':hover': {
    fontFamily: 'OpenSansBold'
  },
  base: {
    backgroundColor: '#4D92C2',
    borderColor: 'rgba(0,0,0,0.1)',
    fontSize: '1em',
    height: 'auto'
  },
  logo: {
    color: '#FFF',
    fontSize: '2rem'
  },
  slogan: {
    color: '#fff',
    fontSize: '1rem'
  }
}

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
      <Navbar style={styles.base}>
        <Navbar.Header>
          <Navbar.Brand>
            <IndexLink to="/">
              <span style={styles.logo}>{brandName}</span>
              <p style={styles.slogan}>Explore campaign finance in Oregon</p>
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
