import React, { Component } from 'react';
import { connect } from 'react-redux';

import { loadGames } from '../../actions/gameActions';
import { updateUser } from '../../actions/userActions';

import Filter from '../../cmps/filter/Filter';
import GameList from '../../cmps/game-list/GameList';
import UtilService from '../../services/UtilService';

import './_Explore.scss'

class Explore extends Component {
    state = { games: null, isAscending: false }

    componentDidMount = async () => {
        window.scrollTo(0, 0);
        this.onFilterBy()
    }

    onUpdateUser = async (updatedUser) => {
        this.props.updateUser(updatedUser)
    }

    onFilterBy = async (filterBy) => {
        await this.props.loadGames(filterBy)
        this.setState({ games: this.props.games })
    }

    sortByDownloads = async () => {
        let games = [...this.props.games]
        games = await UtilService.sortByDownloads(games, this.state.isAscending)
        this.setState((prevState) => ({ games, isAscending: !prevState.isAscending }))
    }
    sortByPrice = () => {
        let games = [...this.props.games]
        games = UtilService.sortByPrice(games, this.state.isAscending)
        this.setState((prevState) => ({ games, isAscending: !prevState.isAscending }))
    }

    render() {
        const { games } = this.state
        return <div className="content-container flex column container align-center">
            <Filter sortByPrice={this.sortByPrice} sortByDownloads={this.sortByDownloads} onFilterBy={this.onFilterBy} />
            <GameList history={this.props.history} user={this.props.user} onUpdateUser={this.onUpdateUser} games={games} />
        </div>
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
)(Explore);