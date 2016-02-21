import React, {Component} from 'react';
import * as ReactBootstrap from 'react-bootstrap';

class Tabs extends Component {

    renderChildren(){
        let eventKeyCount = 0;
        return React.Children.map(this.props.children, child => {
            return React.cloneElement(child, {eventKey: ++eventKeyCount});
        });
    }

    render(){
        return (
            <div style={{marginTop: '10px'}} {...this.props}>
                <ReactBootstrap.Tabs {...this.props}>
                    {this.renderChildren()}
                </ReactBootstrap.Tabs>
            </div>
        );
    }
}

export default Tabs;
