import React, { Component } from "react";
import { Link } from "react-router-dom";


import "./_NavBar.scss"
// update to use NavLink 
export default class Navbar extends Component {
  render() {
    const noLoggedinUser = false
    const userName = (!noLoggedinUser) ? 'guest' : ''
    return (
      <nav className="navbar flex align-center ">
        <Link className="link" to="/">
          <img width="150" alt="logo" src="/navbar-logo.png"/>
        </Link>
        <div className="menu-container flex align-center">
          <Link className="link" to="/">
            Home Page
        </Link>
          <Link className="link" to="/game">
            Explore
        </Link>
          <Link className="link" to={`/user/${userName}`}>
            Profile
        </Link>
        <p onClick={this.props.togglePortal}>Wishlist</p>
        <p onClick={this.props.togglePortal}>Shopping Cart</p>
        </div>
      </nav>
    )
  }
}
