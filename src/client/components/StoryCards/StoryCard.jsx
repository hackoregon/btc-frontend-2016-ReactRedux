import React, { PropTypes } from 'react'

const StoryCard = (props) => {
  return (
      <Col {...this.props}
          minWidth={500}
           className="text-center"
           style={ {    "fontWeight": 200} }>
          <h3>{this.props.question}</h3>
        <p>
            <span>{this.props.description}</span>
        </p>
        {this.props.children}
  </Col>
  )
}

StoryCard.propTypes = {
        question: PropTypes.string,
        description: PropTypes.string
};

export default StoryCard;