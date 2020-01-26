import React, { Component } from 'react'
import { connect } from 'react-redux'
import history from '../../history'


import CartService from '../../services/CartService'
import GameList from '../../cmps/game-list/GameList'
import GameService from '../../services/GameService';
import UtilService from '../../services/UtilService';
import OrderService from '../../services/OrderService';

import { updateUser } from '../../actions/userActions'
import { clearCart } from '../../actions/cartActions';

class ShoppingCart extends Component {
    state = {
        games: null,
        gamesIds: null
    }

    componentDidMount() {
        this.loadGames()
    }

    async loadGames() {
        const gamesIds = CartService.query();
        let gamesToRender = []
        if (gamesIds.length) {
            gamesToRender = await GameService.query({ shoppingCartIds: gamesIds })
        }
        this.setState({ gamesIds, games: gamesToRender })
    }

    onUpdateUser = async (updatedUser) => {
        this.props.updateUser(updatedUser)
    }

    onRemoveFromCart = (gameId) => {
        CartService.removeFromCart(gameId)
        this.loadGames()
    }

    onBuyClick = () => {
        if (!this.props.user) {history.push('/login'); return}

        const order = {
            createdAt: UtilService.objectIdByTime(),
            orderBy: this.props.user._id,
            gameIds: this.state.gamesIds
        }
        OrderService.add(order)
        this.props.clearCart()
        this.loadGames()
    }

    render() {
        return <div className="modal totally-center">
            {(this.state.games && this.state.games.length) ?
                <div className="modal-content">
                    <GameList user={this.props.user} onUpdateUser={this.onUpdateUser} onRemoveFromCart={this.onRemoveFromCart} isCart={true} games={this.state.games} history={this.props.history}></GameList>
                    <div className='flex justify-center'>
                    <button className="pointer cla-btn" onClick={this.onBuyClick}>Purchase</button>
                    </div>
                </div>
                : <h3 className="flex column totally-center">Your shopping cart is empty</h3>}
        </div>
    }
}


const mapStateToProps = state => {
    return {
        user: state.userStore.loggedInUser
    };
};

const mapDispatchToProps = {
    clearCart,
    updateUser
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ShoppingCart);
