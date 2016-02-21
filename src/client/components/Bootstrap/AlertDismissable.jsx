
import React, { Component, PropTypes } from 'react';

import { Alert } from 'react-bootstrap';

class AlertDismissable extends Component {

    constructor(props, content) {
        super(props, content); // this.state = {count: props.initialCount};
        this.state = {
            alertVisible: true
        };
        this.handleDismiss = this.handleDismiss.bind(this);
    }

    handleDismiss(){
        this.setState({
            alertVisible: false
        });
        if(this.props.onDismiss){
            this.props.onDismiss();
        }
    }

    render() {
        let content = null;
        if(this.state.alertVisible){
            content = (
                <Alert {...this.props} onDismiss={this.handleDismiss}>
                    {this.props.children}
                </Alert>
            );
        } else {
            content = ( <span></span> );
        }
        return content;
    }
}

AlertDismissable.propTypes = {
    onDismiss: PropTypes.func
};

export default AlertDismissable;