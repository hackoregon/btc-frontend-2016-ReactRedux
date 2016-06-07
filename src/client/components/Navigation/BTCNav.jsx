import React, {Component, PropTypes} from 'react';
import NavbarCollapsible from './NavbarCollapsible.jsx';
import SubNav from './SubNav.jsx';
import FlexNav from './FlexNav.jsx';
import './BTCNav.css';
class BTCNav extends Component {

    enableSelect(){

    }

    render() {
        const menuItemList = ['About', 'FAQ']
        const subMenuItems = ['Recipients', 'Donors']
        return (
            <div {...this.props} className={'BTCNav'}>
                <NavbarCollapsible inverse={false} fixedTop={true} fluid={true} brandName='Behind the Curtain' linkClasses='nav-item' menuItems={menuItemList} params={this.props.params}></NavbarCollapsible>
                <FlexNav menuItems={subMenuItems}/>
            </div>
        )
    }
}

BTCNav.propTypes = {
    params: PropTypes.string
};

export default BTCNav;
