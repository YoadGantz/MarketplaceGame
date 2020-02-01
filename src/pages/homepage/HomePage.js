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
    Popularity: [],
    ReleaseDate: [],
    Rating: []
  }

  async componentDidMount() {
    window.scrollTo(0, 0);
    await this.props.loadGames()
    this.setGames('Popularity')
    this.setGames('ReleaseDate')
    this.setGames('Rating')
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
    const { Popularity, ReleaseDate, Rating } = this.state
    return (
      <div className="homepage-container content-container container full">
        <div className="hero-text flex column totally-center">
          <h1 className="main-heading">Gamein</h1>
          <p>The ultimate destination for buying, discussing, and playing games</p>
          <Link to="/game" onClick={this.on} className="hero-btn">To the shop</Link>
        </div>
        <div>
          <div className="flex  heading space-between">
          <p >Most Popular</p>
          <Link to='/game?sortBy=popularity'>See More →</Link>
          </div>
          <GameList isHomepage={true} user={this.props.user} onUpdateUser={this.onUpdateUser} games={Popularity} />
        </div>
        <div>
        <div className="flex  heading space-between">
          <p >Recently Released</p>
          <Link to='/game?sortBy=releaseDate'>See More →</Link>
          </div>
          <GameList isHomepage={true} user={this.props.user} onUpdateUser={this.onUpdateUser} games={ReleaseDate} />
        </div>
        <div>
        <div className="flex  heading space-between">
          <p>Top Rated</p>
          <Link to='/game?sortBy=rating'>See More →</Link>
          </div>
          <GameList isHomepage={true} user={this.props.user} onUpdateUser={this.onUpdateUser} games={Rating} />
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