import React, {Component} from 'react';
import * as ReactBootstrap from 'react-bootstrap';

class DataVisualsContainer extends Component {

    renderChildren(){
        let eventKeyCount = 0;
        return React.Children.map(this.props.children, child => {
            return React.cloneElement(child, {eventKey: ++eventKeyCount});
        });
    }

    render(){
        return (
            <div   style={{marginTop: '10px'}} >
                <ReactBootstrap.Panel  >
                    {this.renderChildren()}
                </ReactBootstrap.Panel>
            </div>
        );
    }
}

export default DataVisualsContainer;
