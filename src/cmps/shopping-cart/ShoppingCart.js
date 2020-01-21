import React, { Component } from 'react'
import { connect } from 'react-redux'


import CartService from '../../services/CartService'
import GameList from '../../cmps/game-list/GameList'
import GameService from '../../services/GameService';
import UtilService from '../../services/UtilService';
import OrderService from '../../services/OrderService';

 class ShoppingCart extends Component {
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
        CartService.removeItem(gameId)
        this.loadGames()
    }

    onBuyClick= ()=>{
        if(!this.props.loggedInUser)return
      const  order={
          createdAt:UtilService.objectIdByTime(),
          orderBy:this.props.loggedInUser._id,
          gameIds:this.state.gamesIds
      }
      OrderService.add(order)
    }

    componentDidMount() {
        this.loadGames()
    }
    render() {

        return <div>
            {(this.state.games.length) ? 
            <div>
            <GameList onRemoveFromCart={this.onRemoveFromCart} isCart={true} games={this.state.games} history={this.props.history}></GameList>
            <button onClick={this.onBuyClick}>Buy</button>
            </div>
            : <h2>Your shopping cart is empty</h2>}
        </div>
    }
}


const mapStateToProps = state => {
    return {
        loggedInUser: state.userStore.loggedInUser
    };
};

const mapDispatchToProps = {
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ShoppingCart);
