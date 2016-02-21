import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class CustomNavRouterLink extends Component {

    constructor(props, content) {
        super(props, content);
    }

    render() {
        let route = '/' + this.props.name.toLowerCase();
        return (<li {...this.props}
                    className="nav-item">
                    <Link to= {route} activeClass={"active"}>
                    <span>{this.props.name}</span>
                    </Link>
                </li>
            );
    }
}

export default CustomNavRouterLink;
