import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import history from '../../history';

import { logout } from '../../actions/userActions';
import GameCounter from '../game-counter/GameCounter'
import './_NavBar.scss'
import wishlistImg from '../../assets/icons/wishlist.svg'
import shoppingCartImg from '../../assets/icons/shopping_cart.svg'

class NavBar extends Component {

  doLogOut = async () => {
    try {
      await this.props.logout();
      history.push('/')
    } catch (err) {
      console.log('Had issues while logging out ', err)
    }
  }

  render() {
    const { loggedInUser } = this.props
    const userName = (!loggedInUser) ? 'guest' : loggedInUser.userName;
    return (
      <nav className="nav-bar flex align-center">
        <div className="nav-logo full">
          <Link to="/">
            <img alt="logo" src="/navbar-logo.png" />
          </Link>
        </div>
        <input type="checkbox" className="hidden" id="menu" />
        <div className="flex nav-link-container">
          <div className="flex">
            <div className="nav-link flex align-center" onClick={() => this.props.toggleModal("wishlist")}>
              <img alt="" src={wishlistImg} />
            </div>
            <div className="nav-link flex align-center" onClick={() => this.props.toggleModal("shoppingCart")}>
              <GameCounter />
              <img alt="" src={shoppingCartImg} />
            </div>
          </div>
          <label className="nav-bar-hamburger pointer" htmlFor="menu">
            ☰
          </label>

          <div className="nav-bar-menu">
            <NavLink to="/" exact className="nav-link flex align-center" activeClassName="active" >
              Homepage
        </NavLink>
            <NavLink to="/game" exact className="nav-link flex align-center" activeClassName="active" >
              Explore
        </NavLink>
            <NavLink to={`/user/${userName || 'guest'}`} exact className="nav-link flex align-center" activeClassName="active"  >
              Profile
        </NavLink>
            {(!loggedInUser || !loggedInUser.userName) ? <NavLink to="/login" exact className="nav-link flex align-center" activeClassName="active" >Login</NavLink>
              : <NavLink onClick={this.doLogOut} to="/" exact className="nav-link flex align-center" activeClassName="">Logout</NavLink>}
          </div>
        </div>
      </nav >

    )
  }
}
const mapStateToProps = state => {
  return {
    loggedInUser: state.userStore.loggedInUser
  };
};

const mapDispatchToProps = {
  logout
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar);