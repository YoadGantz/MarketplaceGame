import React, { Component } from 'react';
import { connect } from 'react-redux'

import GameList from '../game-list/GameList';
import Filter from '../filter/Filter'


import './_OwnedGames.scss'
import { loadGames } from '../../actions/gameActions';
import OrderService from '../../services/OrderService';
import UtilService from '../../services/UtilService';
import { Link } from 'react-router-dom';

class OwnedGames extends Component {
    state = { games: [], gamesIds: [] }

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
        if (!this.state.gamesIds.length)return
        filterBy.gamesIds = this.state.gamesIds
        await this.props.loadGames({...filterBy,shoppingCartIds:this.state.gamesIds})
        this.setState({ games: this.props.games })
    }

    sortByDownloads = async () => {
        if (!this.state.gamesIds.length)return
        let games = [...this.state.games]
        games = await UtilService.sortByDownloads(games, this.state.isAscending)
        this.setState((prevState) => ({ games, isAscending: !prevState.isAscending }))
    }
    sortByPrice = () => {
        if (!this.state.gamesIds.length)return
        let games = [...this.state.games]
        games = UtilService.sortByPrice(games, this.state.isAscending)
        this.setState((prevState) => ({ games, isAscending: !prevState.isAscending }))
    }

    render() {
        const { games } = this.state
        return (
            <div className="container">
                <Filter sortByPrice={this.sortByPrice} sortByDownloads={this.sortByDownloads} onFilterBy={this.onFilterBy}></Filter>
                <div className='publish-button btn'>
                    <Link to='/edit'>Publish a game</Link>
                </div> 
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
