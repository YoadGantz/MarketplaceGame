import React, { Component } from "react";
import { connect } from 'react-redux'

import GameList from '../game-list/GameList';
import Filter from "../filter/Filter"

import { loadGames } from "../../actions/gameActions";

class OwnedGames extends Component {
    componentDidMount() {
        this.props.loadGames()
    }

    onFilterBy = (filterBy) => {
        this.props.loadGames(filterBy)
    }

    render() {
        return (
            <div>
                <h1>Games</h1>
                <Filter onFilterBy={this.onFilterBy}></Filter>
                <GameList games={this.props.games}></GameList>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        games: state.game.games
    };
};

const mapDispatchToProps = {
    loadGames
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OwnedGames);
