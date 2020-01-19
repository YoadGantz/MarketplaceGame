import React, { Component } from "react";
import { connect } from 'react-redux'

import { loadWishedGames } from '../actions/gameActions'
import GameList from "../cmps/game-list/GameList"

class WishList extends Component {
    componentDidMount() {
        if (this.props.user) {
            const wishedIds = this.props.user.wishedGames.map(wishedGame => wishedGame)
            let filterBy = { wishedIds }
            console.log(filterBy);
            
            this.props.loadWishedGames(filterBy)
        }
    }
    render() {
        if (this.props.user) {
            console.log(this.props.games);
            
            let {games} = this.props
            return <ul>
                <GameList history={this.props.history} games={games}></GameList>
            </ul>
        }
        return <p>Please Login to see your Wishlist</p>
    }
}

const mapStateToProps = state => {
    return {
        games: state.gameStore.wishedGames,
        user: state.userStore.loggedInUser
    };
};

const mapDispatchToProps = {
    loadWishedGames
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WishList);