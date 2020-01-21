import React, { Component } from 'react';
import { Router, Switch, Route} from 'react-router';

import history from './history';

import HomePage from './pages/homepage/HomePage';
import Login from './pages/login/Login';
import Explore from './pages/explore-page/Explore';
import ProfilePage from './pages/profile-page/ProfilePage';
import GameDetails from './pages/game-details/GameDetails';
import PlayGame from './pages/play-game/PlayGame';
import Modal from './cmps/modal/Modal'
import Navbar from './cmps/navbar/Navbar';

import EditGame from './cmps/edit-game/EditGame';
import ShoppingCart from './cmps/shopping-cart/ShoppingCart';
import WishList from './cmps/wish-list/WishList';

import './assets/styles/global.scss'

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
                  <Route path="/edit/:id?" component={EditGame} exact />
                  <Route path="/game/:id" component={GameDetails} exact />
                  <Route path="/game" render={() => <Explore history={history} />} exact />
                  <Route path="/user/:id" render={() => <ProfilePage history={history} />} exact />
                  <Route path="/play/:id" component={PlayGame} exact />
               </Switch>
            </Router>
            {this.state.toggleModal && <Modal>
               {(this.state.modalType === 'wishlist') ? <WishList history={history} /> : <ShoppingCart history={history} />}

            </Modal>}
         </React.Fragment>
      )
   }
}


