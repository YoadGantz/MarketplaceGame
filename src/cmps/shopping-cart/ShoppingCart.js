import React, { Component } from 'react'
import { connect } from 'react-redux'

import { loadGames } from "../../actions/gameActions";
import CartService from '../../services/CartService'
import GameList from '../../cmps/game-list/GameList'

class ShoppingCart extends Component {
    state = {
        isEmpty: true,
        filterBy: {
            shoppingCartIds: ''
        }
    }

    async componentDidMount() {
        const gamesIds = await CartService.query();
        if (gamesIds.length) {
            this.setState({
                filterBy: {
                    shoppingCartIds: gamesIds
                },
                isEmpty: false
            }, () => {
                this.props.loadGames(this.state.filterBy)
            })
        } else {
            this.setState({ isEmpty: true })
        }
    }
    render() {
        return <div>
            <h1>Testing The Shopping Cart</h1>
            <GameList games={this.props.games}></GameList>
        </div>
    }
};

const mapStateToProps = state => {
    return {
        games: state.gameStore.games
    };
};

const mapDispatchToProps = {
    loadGames
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ShoppingCart);