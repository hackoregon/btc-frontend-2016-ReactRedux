import React, {Component} from 'react';
import * as ReactBootstrap from 'react-bootstrap';
import './Panels.css'
class PanelGroup extends Component {

    renderChildren(){
        let eventKeyCount = 0;
        return React.Children.map(this.props.children, child => {
            return React.cloneElement(child, {eventKey: ++eventKeyCount});
        });
    }

    render(){
        return (
            <ReactBootstrap.PanelGroup>
                {this.renderChildren()}
            </ReactBootstrap.PanelGroup>
        );
    }
}

export default PanelGroup;
