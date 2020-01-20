import React, { Component } from "react";
import { Link } from "react-router-dom";
import './_HomePage.scss'
export default class HomePage extends Component {


  render() {
    return <div className="homepage-container">
      <div className="hero-image">
        <div className="hero-text">
          <h1 className="main-heading">GAMEIN</h1>
          <p>The ultimate destination for buying, discussing, and playing games</p>
          <Link to="/game" onClick={this.on} className="hero-btn">To the shop, my noble steed</Link>
        </div>
      </div>
    </div>;
  }
}
