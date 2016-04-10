import React, {PropTypes, Component} from 'react'
import {CustomNavbar, CustomNavMenu} from './CustomNav'

class BTCNav extends Component {
  render() {
    return (
      <div {...this.props}>
        <CustomNavbar params={this.props.params} brandName={"Behind the Curtain"}>
          <CustomNavMenu params={this.props.params} customLinks={[
            'Search',
            'Oregon',
            'Campaigns',
            'Candidates',
            'Donors',
            'About',
            'FAQ'
          ]}/>
        </CustomNavbar>
      </div>
    )
  }
}

export default BTCNav
