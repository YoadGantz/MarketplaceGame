import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
 render(){
     const noLoggedinUser=false
     const userName=  (!noLoggedinUser)?'guest':''
    return (
    <nav className="navbar flex">
      <Link className="navbar-item link" to="/">
        Company Name
      </Link>
      <div className="menu-container flex">
        <Link className="navbar-item link" to="/">
          Home Page
        </Link>
        <Link className="navbar-item link" to="/game">
          Explore
        </Link>
        <Link className="navbar-item link" to={`/user/${userName}`}>
          profile
        </Link>

      </div>
    </nav>
  )
 }
}
