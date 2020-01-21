import React, { Component } from "react";
import { Link } from "react-router-dom";

import { loadGames, loadWishedGames } from "../../actions/gameActions";
import { updateUser } from "../../actions/userActions"
import { connect } from 'react-redux'
import './_HomePage.scss'
import UtilService from "../../services/UtilService";

class HomePage extends Component {
 async componentDidMount () {
  await this.props.loadGames()
 const gameDownloads= await  UtilService.getGraphsDetails(this.props.games)
this.props.games.forEach((game)=>{

})
}
  render() {
    return <div className="homepage-container">
      <div className="hero-image">
        <div className="hero-text">
          <h1 className="main-heading">GAMEIN</h1>
          <p>The ultimate destination for buying, discussing, and playing games</p>
          <Link to="/game" onClick={this.on} className="hero-btn">To the shop, my noble steed</Link>
          <div className='flex'>
            

          </div>
        </div>
      </div>
    </div>;
  }
}

const mapStateToProps = state => {
  return {
      games: state.gameStore.games,
      // wishedGames: state.gameStore.wishedGames,
      user: state.userStore.loggedInUser
  };
};

const mapDispatchToProps = {
  loadGames,
  // loadWishedGames, 
  updateUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);