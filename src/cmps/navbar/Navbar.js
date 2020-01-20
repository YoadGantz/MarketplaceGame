import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./_NavBar.scss"
// update to use NavLink 
export default class Navbar extends Component {
  render() {
    const noLoggedinUser = false
    const userName = (!noLoggedinUser) ? 'guest' : ''
    return (
      <nav className="nav-bar flex align-center">
        <div className="nav-logo full">
          <a  to="/">
            <img alt="logo" src="/navbar-logo.png" />
          </a>
        </div>
        <Link className="nav-link flex align-center" to="/">
          Homepage
        </Link>
        <Link className="nav-link flex align-center" to="/game">
          Explore
        </Link>
        <Link className="nav-link flex align-center" to={`/user/${userName}`}>
          Profile
        </Link>
        <p className="nav-link flex align-center" onClick={() => this.props.togglePortal("wishlist")}>Wishlist</p>
        <p className="nav-link flex align-center" onClick={() => this.props.togglePortal("shoppingCart")}>Shopping Cart</p>
      </nav>
    )
  }
}
