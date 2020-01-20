import React, { Component } from "react";
import { NavLink } from "react-router-dom";
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
          <NavLink to="/">
            <img alt="logo" src="/navbar-logo.png" />
          </NavLink>
        </div>
        <NavLink to="/" className="nav-link flex align-center" activeClassName="active" >
          Homepage
        </NavLink>
        <NavLink to="/game" className="nav-link flex align-center" activeClassName="active" >
          Explore
        </NavLink>
        <NavLink to={`/user/${userName}`} className="nav-link flex align-center" activeClassName="active"  >
          Profile
        </NavLink>
        <img src={wishlistImg} className="nav-link flex align-center" onClick={() => this.props.togglePortal("wishlist")} />
        <img src={shoppingCartImg} className="nav-link flex align-center" onClick={() => this.props.togglePortal("shoppingCart")} />
      </nav>
    )
  }
}
