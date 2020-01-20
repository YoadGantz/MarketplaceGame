import React, { Component } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory, createHashHistory } from 'history';

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

const history = createHashHistory();

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
                  <Route path="/" component={HomePage} exact />
                  <Route path="/login" component={Login} exact />
                  <Route path="/edit" component={EditGame} exact />
                  <Route path="/game/:id" component={GameDetails} exact />
                  <Route path="/game" render={() => <Explore history={history} />} exact />
                  <Route path="/user/:id" render={() => <ProfilePage history={history} />} exact />
               </Switch>
            </Router>
            {this.state.toggleModal && <Modal>
               {(this.state.modalType === 'wishlist') ? <WishList history={history} /> : <ShoppingCart history={history} />}

            </Modal>}
         </React.Fragment>
      )
   }
}


