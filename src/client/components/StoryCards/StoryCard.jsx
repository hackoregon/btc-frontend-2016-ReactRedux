import React, { PropTypes } from 'react';

const styles = {
  base : {
    minWidth: '500px',
    textAlign: 'center',
    fontWeight: '200'
  }
}

const StoryCard = ({question,description,children}) => {
  return (
      <div style = {styles.base}>
          <h3>{question}</h3>
        <p>
            <span>{description}</span>
        </p>
        {children}
  </div>
  )
}

export default StoryCard;