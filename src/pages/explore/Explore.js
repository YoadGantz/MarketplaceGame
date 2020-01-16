import React, { Component } from "react"
import { connect } from 'react-redux'

import { loadGames } from "../../actions/gameActions";

import Filter from "../../cmps/filter/Filter"
import GameList from "../../cmps/game-list/GameList"

class Explore extends Component {
    componentDidMount() {
        this.props.loadGames()
    }

    onFilterBy = (filterBy) => {
        
        this.props.loadGames(filterBy)
    }

    render() {
        return <React.Fragment>
            <Filter onFilterBy={this.onFilterBy}></Filter>
            <GameList games={this.props.games}></GameList>
        </React.Fragment>
    }
}

const mapStateToProps = state => {
    return {
        games: state.games
    };
};

const mapDispatchToProps = {
    loadGames
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Explore);