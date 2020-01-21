import React, { Component } from "react";
import { connect } from 'react-redux'

import { loadGames } from '../../actions/gameActions'
import GameList from "../game-list/GameList"

class WishList extends Component {
    componentDidMount() {
        loadGames()
    }
    render() {
        if (this.props.user) {
            const { games, user } = this.props
            let wishedGames = games.filter(game => user.wishedGames.includes(game._id))
            return <GameList history={this.props.history} user={user} games={wishedGames}></GameList>
        }
        return <p>Please Login to see your Wishlist</p>
    }
}

const mapStateToProps = state => {
    return {
        games: state.gameStore.games,
        user: state.userStore.loggedInUser
    };
};

const mapDispatchToProps = {
    loadGames
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WishList);