import React, { Component } from "react";
import { Link } from "react-router-dom";
// update to use NavLink 
export default class Navbar extends Component {
  render() {
    const noLoggedinUser = false
    const userName = (!noLoggedinUser) ? 'guest' : ''
    return (
      <div className="navbar flex">
        <Link className="navbar link" to="/">
          Company Name
      </Link>
        <div className="flex">
          <Link className="navbar link" to="/">
            Home Page
        </Link>
          <Link className="navbar link" to="/games">
            Explore
        </Link>
          <Link className="navbar link" to={`/user/${userName}`}>
            Profile
        </Link>
        </div>
      </div>
    )
  }
}
