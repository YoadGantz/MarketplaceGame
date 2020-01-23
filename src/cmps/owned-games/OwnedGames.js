import React, { Component } from 'react';
import { connect } from 'react-redux'

import GameList from '../game-list/GameList';
import Filter from '../filter/Filter'

import { loadGames } from '../../actions/gameActions';
import OrderService from '../../services/OrderService';

class OwnedGames extends Component {
    state={games:[]}
    componentDidMount=async () =>{
        const gamesIds=[]
        if (this.props.user){
            const orders=   await OrderService.query({orderBy: this.props.user._id})
         orders.forEach((order)=>{
            order.gameIds.forEach((gameId)=>{
                gamesIds.push(gameId)
            })
        })
        }
        if (gamesIds.length){
         const games= await  this.props.loadGames({shoppingCartIds:gamesIds})
         this.setState({games})
        }
    }

    onFilterBy = (filterBy) => {
        this.props.loadGames(filterBy)
    }

    render() {
        const {games}=this.state
        return (
            <div className="content-container container">
                <Filter onFilterBy={this.onFilterBy}></Filter>
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
