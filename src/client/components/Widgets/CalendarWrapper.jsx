import React, { Component, PropTypes } from 'react';
import { Calendar } from 'react-widgets';

class CalendarWrapper extends Component {

    constructor(props, content) {
        super(props, content);
    }

    render() {
        return (<Calendar defaultValue={new Date()} {...this.props} />
            );
    }
}

export default CalendarWrapper;
