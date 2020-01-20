import React, { Component } from "react";
import { Link } from "react-router-dom";
import wishlistImg from "../../assets/icons/wishlist.svg"
import shoppingCartImg from "../../assets/icons/shopping_cart.svg"
import "./_NavBar.scss"

// update to use NavLink 
export default class Navbar extends Component {
  render() {
    const noLoggedinUser = false
    const userName = (!noLoggedinUser) ? 'guest' : ''
    return (
      <nav className="nav-bar flex align-center">
        <div className="nav-logo full">
          <Link to="/">
            <img alt="logo" src="/navbar-logo.png" />
          </Link>
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
        <img src={wishlistImg} className="nav-link flex align-center" onClick={() => this.props.togglePortal("wishlist")} />
        <img src={shoppingCartImg} className="nav-link flex align-center" onClick={() => this.props.togglePortal("shoppingCart")} />
      </nav>
    )
  }
}
