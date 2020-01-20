import React, { Component } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import HomePage from './pages/homepage/HomePage';
import Login from './pages/login/Login';
import Explore from './pages/explore-page/Explore';
import ProfilePage from './pages/profile-page/ProfilePage';
import GameDetails from './pages/game-details/GameDetails';
import Modal from './cmps/modal/Modal'
import Navbar from './cmps/navbar/Navbar';

import './assets/styles/global.scss'
import EditGame from './cmps/edit-game/EditGame';
import ShoppingCart from './cmps/shopping-cart/ShoppingCart';
import WishList from './cmps/WishList';

const history = createBrowserHistory();


export default class App extends Component {
   state = {
      modalType: '',
      toggleModal: false
   }

   togglePortal = (modalType) => {
      if (!this.state.toggleModal) {
         this.setState({ modalType, toggleModal: true });
      } else if (modalType === this.state.modalType) {
         this.setState(prevState => { return { toggleModal: !prevState.toggleModal, modalType: '' } })
      } else {
         this.setState({ modalType })
      }

   }
   render() {
      return (
         <React.Fragment>
            <Router history={history}>
               <Navbar togglePortal={this.togglePortal} />
               <Switch>
                  <Route component={HomePage} path="/" exact />
                  <Route component={Login} path="/login" exact />
                  <Route component={EditGame} path="/edit/:id?" exact />
                  <Route component={GameDetails} path="/game/:id" exact />
                  <Route render={() => <Explore history={history} />} path="/game" exact />
                  <Route render={() => <ProfilePage history={history} />} path="/user/:id" exact />
               </Switch>
            </Router>
            {this.state.toggleModal && <Modal>
               {(this.state.modalType === 'wishlist') ? <WishList history={history} /> : <ShoppingCart history={history} />}

            </Modal>}
         </React.Fragment>
      )
   }
}


