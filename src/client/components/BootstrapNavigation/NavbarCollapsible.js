import React, {Component, PropTypes} from 'react';
import { Navbar } from 'react-bootstrap';
import {IndexLink} from 'react-router';

class NavbarCollapsible extends Component {
    render(){
        const { brandName } = this.props;
        return (
            <Navbar {...this.props} >
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
