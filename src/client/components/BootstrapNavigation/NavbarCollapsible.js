import React, {Component, PropTypes} from 'react';
import { Navbar } from 'react-bootstrap';

class NavbarCollapsible extends Component {

    render(){
        const { branding } = this.props;
        return (
            <Navbar {...this.props} >
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href={branding.href}>{branding.name}</a>
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
    branding: PropTypes.shape({
        name: PropTypes.string,
        href: PropTypes.string
    })
};

NavbarCollapsible.defaultProps = {
    branding: {
        name: 'Hack Oregon',
        href: '#'
    }
};

export default NavbarCollapsible;
