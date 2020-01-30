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
        const games = await this.props.loadGames({ ...filterBy })
        if (filterBy.sortBy) {
            const sortedGames = await UtilService.sortGames(games, filterBy.sortBy, filterBy.isAscending)
            this.setState({ games: sortedGames })
        } else {
            this.setState({ games })
        }
    }

    render() {
        const { games } = this.state
        return <div className="content-container flex column container align-center">
            <Filter onFilterBy={this.onFilterBy} />
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