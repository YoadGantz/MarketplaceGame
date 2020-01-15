import React, { Component } from 'react';
import {  Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Navbar from './cmps/Navbar';
import HomePage from './pages/HomePage';
import Explore from './pages/Explore';
import './assets/css/global.scss'
import ProfilePage from './pages/ProfilePage';

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


