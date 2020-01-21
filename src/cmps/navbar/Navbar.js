import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
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
          <Link to="/">
            <img alt="logo" src="/navbar-logo.png" />
          </Link>
        </div>
        <NavLink to="/" exact className="nav-link flex align-center" activeClassName="active" >
          Homepage
        </NavLink>
        <NavLink to="/game" exact className="nav-link flex align-center" activeClassName="active" >
          Explore
        </NavLink>
        <NavLink to={`/user/${userName}`} exact className="nav-link flex align-center" activeClassName="active"  >
          Profile
        </NavLink>
        <NavLink to={`/login`} exact className="nav-link flex align-center" activeClassName="active"  >
          Login
        </NavLink>
        <img alt="" src={wishlistImg} className="nav-link flex align-center" onClick={() => this.props.togglePortal("wishlist")} />
        <GamesCounter />
        <img alt="" src={shoppingCartImg} className="nav-link flex align-center" onClick={() => this.props.togglePortal("shoppingCart")} />
      </nav>
    )
  }
}
