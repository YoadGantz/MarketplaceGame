import React, { Component } from 'react';
import { connect } from 'react-redux';

import { loadGames } from '../../actions/gameActions';
import { updateUser } from '../../actions/userActions';

import Filter from '../../cmps/filter/Filter';
import GameList from '../../cmps/game-list/GameList';
import UtilService from '../../services/UtilService';

class Explore extends Component {
    state = { games: null }

    componentDidMount = async () => {
        const games = await this.props.loadGames()
        this.setState({ games: this.props.games })
    }

    onUpdateUser = async (updatedUser) => {
        this.props.updateUser(updatedUser)
    }

    onFilterBy = (filterBy) => {
        this.props.loadGames(filterBy)
    }

    sortByDownloads = async () => {
        let games = [...this.props.games]
        games = await UtilService.sortByDownloads(games)
        this.setState({ games })
    }

    render() {
        const { games } = this.state
        return <div className="flex column container align-center">
            <Filter sortByDownloads={this.sortByDownloads} onFilterBy={this.onFilterBy} />
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