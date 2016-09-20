import React, { PropTypes, Component } from 'react'

class FlexBody extends Component {
  render () {
    return (
      <div style={{
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
