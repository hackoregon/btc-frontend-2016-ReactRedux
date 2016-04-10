import React, {Component, PropTypes} from 'react'
import CustomNavRouterLink from './CustomNavRouterLink.jsx'
import {Nav} from 'react-bootstrap'

class CustomNavMenu extends Component {
  render(){
    let links = this.props.customLinks.map((name, index) => {
      return (<CustomNavRouterLink className="nav-item" name={name} params={this.props.params} key={index}/>);
    })
    return (
      <Nav pullRight={true} params={this.props.params}>
        {links}
      </Nav>
    )
  }

}

export default CustomNavMenu
