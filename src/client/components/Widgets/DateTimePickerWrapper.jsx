import React, { Component, PropTypes } from 'react';
import { DateTimePicker } from 'react-widgets';

class DateTimePickerWrapper extends Component {

    constructor(props, content) {
        super(props, content);
    }

    render() {
        return (<DateTimePicker {...this.props} defaultValue={new Date()} />
            );
    }
}

export default DateTimePickerWrapper;
