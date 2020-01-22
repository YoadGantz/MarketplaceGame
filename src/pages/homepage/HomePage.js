import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'

import UtilService from '../../services/UtilService';
import { loadGames } from '../../actions/gameActions';
import { updateUser } from '../../actions/userActions'
import GameList from '../../cmps/game-list/GameList'

import './_HomePage.scss'
class HomePage extends Component {
  state = { games: [] }

  async componentDidMount() {
    await this.props.loadGames()
    this.setGames()

  }

  setGames = async (num = 3) => {
    const games = [...this.props.games]
    const gameDownloads = await UtilService.getGraphsDetails(this.props.games, 'games')
    for (let i = gameDownloads.length; i > num; i--) {
      const minNum = Math.min(...gameDownloads)
      const idx = gameDownloads.indexOf(minNum)
      games.splice(idx, 1)
      gameDownloads.splice(idx, 1)
    }
    this.setState({ games })

  }
  render() {
    const { games } = this.state
    return <div className="homepage-container">
      <div className="hero-image">
        <div className="hero-text">
          <h1 className="main-heading">GAMEIN</h1>
          <p>The ultimate destination for buying, discussing, and playing games</p>
          <Link to="/game" onClick={this.on} className="hero-btn">To the shop</Link>
          <div className="flex"></div>
        </div>
      </div>
      <GameList games={games} />
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