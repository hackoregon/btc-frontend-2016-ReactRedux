import React, { PropTypes } from 'react'
import './Logo.css';
import {Link } from 'react-router';

const Logo = React.createClass({
  render () {
    return (
      <div className={'Logo'}>
      <div className={"card-container"}>
        <div className={"card"}>
          <div className={"side"}>
            <img className = {'Logo'} href='/' src={require('../../assets/img/behind-the-curtain-icon-inverted.png')} /></div>
          <Link to={'/'} ><h3 className={"Lato text-bold side back"}>Behind The Curtain</h3></Link>
        </div>
      </div>
      </div>
    )
  }
})

export default Logo
