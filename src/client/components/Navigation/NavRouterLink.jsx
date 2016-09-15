import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import './NavRouterLink.css';

const styles = {
  ':hover': {
    fontFamily: 'OpenSansBold'
  },

  links: {
    color: '#fff',
    padding: '1rem  ',
    margin: '2px',
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

class NavRouterLink extends Component {

    render() {
        const {routeTo, customStyles } = this.props;
        let boxStyle = customStyles ? customStyles.box : null;
        let linkStyle = customStyles ? customStyles.link : null;
        let route = routeTo || '/' + this.props.name.toLowerCase();
        return (<div style={{...styles.links,...boxStyle}} >
                    <Link to= {route} className={'NavRouterLink'}>
                    <span style={{...linkStyle}}>{this.props.name}</span>
                    </Link>
                  </div>
            );
    }
}

NavRouterLink.propTypes = {
  name: PropTypes.string,
  route: PropTypes.string,
  routeTo: PropTypes.string,
  classes: PropTypes.string,
  customStyles: PropTypes.object
}

export default NavRouterLink;
