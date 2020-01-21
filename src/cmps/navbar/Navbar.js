import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import wishlistImg from "../../assets/icons/wishlist.svg"
import shoppingCartImg from "../../assets/icons/shopping_cart.svg"
import GamesCounter from '../games-counter/GamesCounter'
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
        <NavLink className="nav-link flex align-center" activeClassName="active" to="/" >
          Homepage
        </NavLink>
        <NavLink className="nav-link flex align-center" activeClassName="active" to="/game">
          Explore
        </NavLink>
        <NavLink className="nav-link flex align-center" activeClassName="active" to={`/user/${userName}`}>
          Profile
        </NavLink>
        <img src={wishlistImg} className="nav-link flex align-center" onClick={() => this.props.togglePortal("wishlist")} />
        <GamesCounter />
        <img src={shoppingCartImg} className="nav-link flex align-center" onClick={() => this.props.togglePortal("shoppingCart")} />
      </nav>
    )
  }
}
