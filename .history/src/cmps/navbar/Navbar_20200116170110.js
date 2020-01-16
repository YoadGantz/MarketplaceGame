import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png"

import "./_NavBar.scss"
// update to use NavLink 
export default class Navbar extends Component {
  render() {
    const noLoggedinUser = false
    const userName = (!noLoggedinUser) ? 'guest' : ''
    return (
      <nav className="navbar flex align-center ">
        <Link className="navbar-item link" to="/">
          <img alt="logo" src="../../assets/images/logo.png"/>
        </Link>
        <div className="menu-container flex align-center">
          <Link className="navbar-item link" to="/">
            Home Page
        </Link>
          <Link className="navbar-item link" to="/game">
            Explore
        </Link>
          <Link className="navbar-item link" to={`/user/${userName}`}>
            Profile
        </Link>
        </div>
      </nav>
    )
  }
}
