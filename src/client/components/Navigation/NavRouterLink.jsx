import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Radium from 'radium';
import './NavRouterLink.css';
// <li {...this.props}
//             className={this.props.classes}>
//             <Link to= {route} activeClass={"active"} style={styles.links}>
//             <span>{this.props.name}</span>
//             </Link>
//         </li>
const styles = {
  ':hover': {
    fontFamily: 'OpenSansBold'
  },

  links: {
    color: '#fff',
    padding: '1rem  ',
    listStyle: 'none',

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
        const {routeTo, customStyles} = this.props;
        let boxStyle = customStyles ? customStyles.box : null;
        let linkStyle = customStyles ? customStyles.link : null;
        let route = routeTo || '/' + this.props.name.toLowerCase();
        return (<li {...this.props} style={{...styles.links,...boxStyle}} >
                    <Link style={{padding:'1.85rem 1rem'}} to= {route} activeClass={'active'} className={'NavRouterLink'}>
                    <span style={{...linkStyle}}>{this.props.name}</span>
                    </Link>
                    </li>
            );
    }
}

NavRouterLink.propTypes = {
  name: PropTypes.string,
  route: PropTypes.string,
  classes: PropTypes.string
}

export default NavRouterLink;
