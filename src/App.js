import React, { Component } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import HomePage from './pages/homepage/HomePage';
import Login from './pages/login/Login';
import Explore from './pages/explore-page/Explore';
import ProfilePage from './pages/profile-page/ProfilePage';
import GameDetails from './pages/game-details/GameDetails';

import Navbar from './cmps/navbar/Navbar';

import './assets/styles/global.scss'
import EditGame from './cmps/edit-game/EditGame';

const history = createBrowserHistory();


export default class App extends Component {
   render() {
      return (
         <React.Fragment>
            <Router history={history}>
               <Navbar></Navbar>
               <Switch>
                  <Route component={HomePage} path="/" exact></Route>
                  <Route component={Login} path="/login" exact />
                  <Route component={EditGame} path="/edit" exact></Route>
                  <Route component={Explore} path="/game" exact></Route>
                  <Route component={GameDetails} path="/game/:id" exact></Route>
                  <Route component={ProfilePage} path="/user/:id" exact></Route>
               </Switch>
            </Router>
         </React.Fragment>
      )
   }
}


