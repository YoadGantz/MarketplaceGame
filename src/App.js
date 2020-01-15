import React, { Component } from 'react';
import {  Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import HomePage from './pages/homepage/HomePage';
import Explore from './pages/explore/Explore';
import ProfilePage from './pages/profile_page/ProfilePage';

import Navbar from './cmps/navbar/Navbar';
import './assets/styles/global.scss'

const history = createBrowserHistory();


export default class App extends Component {
  render() {
     return (
        <main>
           <Router history={history}>
              <Navbar></Navbar>
              <Switch>
                 <Route component={HomePage} path="/" exact></Route>
                 <Route component={Explore} path="/games" exact></Route>
                 <Route component={ProfilePage} path="/user/:id" exact></Route>
              </Switch>
           </Router>
        </main>
     )
  }
}


