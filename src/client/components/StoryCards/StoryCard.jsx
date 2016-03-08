import React, { PropTypes } from 'react';
import {Col} from 'react-bootstrap';
import {connect} from 'react-redux';

const StoryCard = ({question,description,children}) => {

  return (
      <Col
          minWidth={500}
           className="text-center"
           style={ {    "fontWeight": 200} }>
          <h3>{question}</h3>
        <p>
            <span>{description}</span>
        </p>
        {children}
  </Col>
  )
}

export default StoryCard;