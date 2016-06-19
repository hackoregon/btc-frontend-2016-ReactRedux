import React, { PropTypes } from 'react';

const styles = {
  base : {
    // minWidth: '500px',
    // minHeight: '500px',
    textAlign: 'center',
  }
}

const StoryCard = ({question,description,children}) => {
  return (
      <div style = {styles.base}>
          <h2>{question}</h2>
        <p>{description}</p>
        {children}
  </div>
  )
}

export default StoryCard;