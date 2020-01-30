import React, { Component } from 'react';
import { connect } from 'react-redux';

import { loadGames } from '../../actions/gameActions';
import { updateUser } from '../../actions/userActions';

import Filter from '../../cmps/filter/Filter';
import GameList from '../../cmps/game-list/GameList';
import UtilService from '../../services/UtilService';

import './_Explore.scss'

class Explore extends Component {
    state = { games: null }

    componentDidMount = async () => {
        window.scrollTo(0, 0);
        this.onFilterBy()
    }

    onUpdateUser = async (updatedUser) => {
        this.props.updateUser(updatedUser)
    }

    onFilterBy = async (filterBy = {}) => {
        filterBy.gamesIds = this.state.gamesIds
        await this.props.loadGames({ ...filterBy, shoppingCartIds: this.state.gamesIds })
        if (filterBy.sortBy === 'popularity') {
            this.sortByDownloads(filterBy.isAscending)
        } else if (filterBy.sortBy === 'price') {
            this.sortByPrice(filterBy.isAscending)
        } else {
            this.setState({ games: this.props.games })
        }
    }

    sortByDownloads = async (isAscending) => {
        let games = [...this.props.games]
        games = await UtilService.sortByDownloads(games, isAscending)
        this.setState({ games })
    }
    sortByPrice = (isAscending) => {
        let games = [...this.props.games]
        games = UtilService.sortByPrice(games, isAscending)
        this.setState({ games })
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