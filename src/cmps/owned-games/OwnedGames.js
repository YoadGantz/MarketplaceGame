import React, { Component } from 'react';
import { connect } from 'react-redux'

import GameList from '../game-list/GameList';
import Filter from '../filter/Filter'


import { loadGames } from '../../actions/gameActions';
import OrderService from '../../services/OrderService';
import UtilService from '../../services/UtilService';

class OwnedGames extends Component {
    state = { games: [], gameIds: [] }

    componentDidMount = async () => {
        const gamesIds = []
        if (this.props.user) {
            const orders = await OrderService.query({ orderBy: this.props.user._id })
            orders.forEach((order) => {
                order.gameIds.forEach((gameId) => {
                    gamesIds.push(gameId)
                })
            })
        }
        if (gamesIds.length) {

            const games = await this.props.loadGames({ shoppingCartIds: gamesIds })
            this.setState({ games, gamesIds })
        }
    }

    onFilterBy = async (filterBy = {}) => {
        filterBy.gamesIds = this.state.gameIds
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
        return (
            <div className="content-container container">
                <Filter sortByPrice={this.sortByPrice} sortByDownloads={this.sortByDownloads} onFilterBy={this.onFilterBy}></Filter>
                <GameList isProfile={true} history={this.props.history} games={games}></GameList>
            </div>
        )
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
)(OwnedGames);
