import React, { Component, PropTypes } from 'react'
import NavbarCollapsible from '../BootstrapNavigation/NavbarCollapsible.jsx'

class CustomNavbar extends Component {

  render(){
    return (
      <NavbarCollapsible inverse={ false }
                         fixedTop={ true }
                         fluid={ true }
                         brandName= {this.props.brandName}
                         params={ this.props.params }>

                         {this.props.children}

      </NavbarCollapsible>
    )
  }

}

export default CustomNavbar
