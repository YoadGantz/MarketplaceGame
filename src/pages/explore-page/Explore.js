import React, { Component } from "react"
import { connect } from 'react-redux'

import { loadGames, loadWishedGames } from "../../actions/gameActions";
import { updateUser } from "../../actions/userActions"

import Filter from "../../cmps/filter/Filter"
import GameList from "../../cmps/game-list/GameList"

class Explore extends Component {
    componentDidMount() {
        this.props.loadGames()
    }

    onUpdateUser = async (updatedUser) => {
        // debugger;
        // console.log('explore updatedUser', updatedUser);
        this.props.updateUser(updatedUser)
        // console.log(this.props.user);
        // const wishedIds = updatedUser.wishedGames.map(wishedGame => wishedGame)
        // let filterBy = { wishedIds: updatedUser.wishedGames }
        console.log('updatedUser: ', updatedUser);

        // this.props.loadWishedGames(filterBy)
    }

    onFilterBy = (filterBy) => {
        this.props.loadGames(filterBy)
    }

    render() {
        return <div className="explore-container flex column container">
            <Filter onFilterBy={this.onFilterBy}></Filter>
            <GameList history={this.props.history} user={this.props.user} onUpdateUser={this.onUpdateUser} wishedGames={this.props.wishedGames} games={this.props.games}></GameList>
        </div>
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
)(Explore);