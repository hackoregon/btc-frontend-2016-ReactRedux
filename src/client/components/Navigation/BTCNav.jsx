import React, {Component, PropTypes} from 'react';
import NavbarCollapsible from './NavbarCollapsible.jsx';
import FlexNav from './FlexNav.jsx';
import './BTCNav.css';
class BTCNav extends Component {
    render() {
        // const menuItemList = ['About', 'FAQ']
        const subMenuItems = ['Recipients', 'Donors']
        return (
            <div   className={'BTCNav'}>
                <FlexNav ref={'subnav'} pageType={this.props.pageType} years={this.props.years} menuItems={subMenuItems} onToggleSelect={this.props.onToggleSelect}/>
            </div>
        )
    }
}

BTCNav.propTypes = {
    params: PropTypes.string,
    years: PropTypes.array,
    pageType: PropTypes.string
};

export default BTCNav;
// <NavbarCollapsible inverse={false} fixedTop={true} fluid={true} brandName='Behind the Curtain' linkClasses='nav-item' menuItems={menuItemList} params={this.props.params}></NavbarCollapsible>