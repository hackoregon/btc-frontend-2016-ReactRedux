import React, {Component, PropTypes} from 'react';
import { Navbar } from 'react-bootstrap';
import {IndexLink} from 'react-router';
import Radium from 'radium';

const styles = {
  ':hover' : {
    fontFamily: 'OpenSansBold'
  },

  base: {
  backgroundColor: '#FFF',
    fontSize: '1em',


    // .navbar-nav {
    //     li {
    //       div {
    //         display: 'inline',
    //         paddingBottom: '5%',
    //         marginRight: '20px',
    //         marginTop: '15px',
    //
    //         &:active, &:hover {
    //             a {
    //               color: '#828282',
    //             }
    //         }
    //       }
    //       a {
    //           color: 'black'
    //           textDecoration: none
    //           &:active, &:hover {
    //               textDecoration: none
    //           }
    //         }
    //     }
    // }
    //
    // .navbar {
    //   border: 'none',
    // minHeight: '75px'
    // }
  }
}
@Radium
class NavbarCollapsible extends Component {
    render(){
        const { brandName } = this.props;
        return (
            <Navbar {...this.props} style = {styles.base}>
                <Navbar.Header>
                    <Navbar.Brand>
                      <IndexLink to="/"><span>{brandName}</span></IndexLink>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    {this.props.children}
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

NavbarCollapsible.propTypes = {
    brandName: PropTypes.string
};

NavbarCollapsible.defaultProps = {
    brandName: 'Hack Oregon'
};

export default NavbarCollapsible;
