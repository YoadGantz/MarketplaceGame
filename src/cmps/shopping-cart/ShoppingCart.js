import React, { Component } from 'react'

import CartService from '../../services/CartService'
import GameList from '../../cmps/game-list/GameList'
import GameService from '../../services/GameService';

export default class ShoppingCart extends Component {
    state = {
        games: [],
        gamesIds: []
    }

    async loadGames() {
        const gamesIds = await CartService.query();
        let gamesToRender = []
        if (gamesIds.length ) {
            gamesToRender = await GameService.query({ shoppingCartIds: gamesIds })
        }
        this.setState({ gamesIds, games: gamesToRender })
    }

    onRemoveFromCart = (gameId) => {
        console.log(gameId);

        CartService.removeItem(gameId)
        this.loadGames()
    }

    componentDidMount() {
        this.loadGames()
    }
    render() {

        return <div>
            {(this.state.games.length) ? 
            <GameList onRemoveFromCart={this.onRemoveFromCart} isCart={true} games={this.state.games} history={this.props.history}></GameList>
            : <h2>Your shopping cart is empty</h2>}
        </div>
    }
}
