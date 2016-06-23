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
        const {routeTo, customStyles} = this.props;
        let boxStyle = customStyles ? customStyles.box : null;
        let linkStyle = customStyles ? customStyles.link : null;
        let route = routeTo || '/' + this.props.name.toLowerCase();
        return (<div {...this.props} style={{...styles.links,...boxStyle}} >
                    <Link style={{padding:'2.1rem 1rem'}} to= {route} activeClass={'active'} className={'NavRouterLink'}>
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
  classes: PropTypes.string
}

export default NavRouterLink;
