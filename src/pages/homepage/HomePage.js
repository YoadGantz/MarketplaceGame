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
    console.log(this.props.games);
    const sortedGames = await UtilService.sortGames(games, sortBy)
    sortedGames.splice(num, games.length)
    this.setState({ [sortBy]: sortedGames })
  }


  render() {
    const { mostDownloadGames, mostRecentGames, highestRatingGames } = this.state
    return <div className="homepage-container">
      <div className="hero-image">
        <div className="hero-text">
          <h1 className="main-heading">GAMEIN</h1>
          <p>The ultimate destination for buying, discussing, and playing games</p>
          <Link to="/game" onClick={this.on} className="hero-btn">To the shop</Link>
          <div className="flex"></div>
        </div>
      </div>
      Most Popular
      <GameList history={this.props.history} user={this.props.user} onUpdateUser={this.onUpdateUser} games={mostDownloadGames} />
      Recent Released
      <GameList history={this.props.history} user={this.props.user} onUpdateUser={this.onUpdateUser} games={mostRecentGames} />
      Highest Rating
      <GameList history={this.props.history} user={this.props.user} onUpdateUser={this.onUpdateUser} games={highestRatingGames} />
    </div>;
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