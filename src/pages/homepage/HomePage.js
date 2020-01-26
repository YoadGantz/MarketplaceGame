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
    mostDownloadGames: [],
    mostRecentGames: [],
    highestRatingGames: []
  }

  async componentDidMount() {
    await this.props.loadGames()
    this.setGames('mostDownloadGames')
    this.setGames('mostRecentGames')
    this.setGames('highestRatingGames')
  }

  onUpdateUser = async (updatedUser) => {
    this.props.updateUser(updatedUser)
  }

  setGames = async (sortBy, num = 3) => {
    const games = [...this.props.games]
    const sortedGames = await UtilService.sortGames(games, sortBy)
    sortedGames.splice(num, games.length)
    this.setState({ [sortBy]: sortedGames })
  }


  render() {
    const { mostDownloadGames: mostPopular, mostRecentGames: recentGames, highestRatingGames: topRated } = this.state
    return (
      <div className="homepage-container content-container container full">
        <div className="hero-text flex column totally-center">
          <h1 className="main-heading">Gamein</h1>
          <p>The ultimate destination for buying, discussing, and playing games</p>
          <Link to="/game" onClick={this.on} className="hero-btn">To the shop</Link>
        </div>
        <div className="popular"><p>Most Popular</p>
          <GameList history={this.props.history} user={this.props.user} onUpdateUser={this.onUpdateUser} games={mostPopular} />
        </div>
        <div className="recent">
          <p>Recently Released</p>
          <GameList history={this.props.history} user={this.props.user} onUpdateUser={this.onUpdateUser} games={recentGames} />
        </div>
        <div className="top-rated">
          <p>Top Rating</p>
          <GameList history={this.props.history} user={this.props.user} onUpdateUser={this.onUpdateUser} games={topRated} />
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