import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Radium from 'radium';

const styles = {
  ':hover': {
    fontFamily: 'OpenSansBold'
  },

  links: {
    color: '#FFF',
    paddingTop: '22px',
    paddingBottom: '22px',

    ':focus': {
      color: '#FFF'
    },
    ':hover': {
      color: '#FFF'
    },
    ':active': {
      color: '#FFF'
    }
  }
}

@Radium
class NavRouterLink extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        let route = '/' + this.props.name.toLowerCase();
        return (<li {...this.props}
                    className={this.props.classes}>
                    <Link to= {route} activeClass={"active"} style={styles.links}>
                    <span>{this.props.name}</span>
                    </Link>
                </li>
            );
    }
}

NavRouterLink.propTypes = {
  name: PropTypes.string,
  classes: PropTypes.string
}

export default NavRouterLink;
