import React, {Component, PropTypes} from 'react'
import NavbarCollapsible from './NavbarCollapsible.jsx'

class BTCNav extends Component {
  render() {
    const menuItemList = [
      'Search',
      'Oregon',
      'Campaigns',
      'Candidates',
      'Donors',
      'About',
      'FAQ'
    ]
    return (
      
        <NavbarCollapsible inverse={ false }
                         fixedTop={ true }
                         fluid={ true }
                         brandName='Behind the Curtain'
                         linkClasses='nav-item'
                         menuItems={ menuItemList }
                         params={ this.props.params }>
        </NavbarCollapsible>
      
    )
  }
}

BTCNav.propTypes = {
  params: PropTypes.string
};

export default BTCNav

