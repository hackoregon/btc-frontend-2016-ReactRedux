import React, { PropTypes } from 'react'

class FlexBody extends React.Component {
  render () {
    return (
      <div {...this.props} style={{
          display: 'flex',
          minHeight: '100vh',
          flexDirection: 'column'
      }}>
      {this.props.children}

    </div>
    )
  }
}


export default FlexBody;
