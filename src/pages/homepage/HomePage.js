import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'

import UtilService from '../../services/UtilService';
import { loadGames } from '../../actions/gameActions';
import { updateUser } from '../../actions/userActions'
import GameList from '../../cmps/game-list/GameList'

import './_HomePage.scss'
class HomePage extends Component {
  state = {
    mostPopular: [],
    recentGames: [],
    topRated: []
  }

  async componentDidMount() {
    window.scrollTo(0, 0);
    await this.props.loadGames()
    this.setGames('mostPopular')
    this.setGames('recentGames')
    this.setGames('topRated')
  }

  onUpdateUser = async (updatedUser) => {
    this.props.updateUser(updatedUser)
  }

  setGames = async (sortBy, num = 4) => {
    const games = [...this.props.games]
    const sortedGames = await UtilService.sortGames(games, sortBy)
    sortedGames.splice(num, games.length)
    this.setState({ [sortBy]: sortedGames })
  }


  render() {
    const { mostPopular, recentGames, topRated } = this.state
    return (
      <div className="homepage-container content-container container full">
        <div className="hero-text flex column totally-center">
          <h1 className="main-heading">Gamein</h1>
          <p>The ultimate destination for buying, discussing, and playing games</p>
          <Link to="/game" onClick={this.on} className="hero-btn">To the shop</Link>
        </div>
        <div><p className="heading">Most Popular</p>
          <GameList isHomepage={true} user={this.props.user} onUpdateUser={this.onUpdateUser} games={mostPopular} />
        </div>
        <div>
          <p className="heading">Recently Released</p>
          <GameList isHomepage={true} user={this.props.user} onUpdateUser={this.onUpdateUser} games={recentGames} />
        </div>
        <div>
          <p className="heading">Top Rated</p>
          <GameList isHomepage={true} user={this.props.user} onUpdateUser={this.onUpdateUser} games={topRated} />
        </div>
      </div>)
  }
}

const mapStateToProps = state => {
  return {
    games: state.gameStore.games,
    user: state.userStore.loggedInUser
  };
};

const mapDispatchToProps = {
  loadGames,
  updateUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);