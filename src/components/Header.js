import React, {Component} from 'react'
import logo from '../images/logo.png'
import '../styles/Header.scss'
import Button from '@material/react-button'

const Header = props => {
  return (
    <div className="header-bg">
      <img src={logo} className="header-logo" />
      <div className="header-text">
        <h1 className="header-title">Level Sprint</h1>
        <h2 className="header-subtext">2D Level Mockups</h2>
      </div>
      <div className="header-menu">
        <h2 className="header-hello">Welcome, Shigeru</h2>
        <Button
          unelevated
          className="header-logout"
          onClick={() => console.log(" logout clicked!")}
          >
          LOGOUT
        </Button>
        </div>
    </div>
  );
}

export default Header;
