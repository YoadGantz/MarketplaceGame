import React, { Component } from 'react';
import { connect } from 'react-redux'


import { updateUser } from '../../actions/userActions'
import { loadGames } from '../../actions/gameActions'
import GameList from '../game-list/GameList'

class WishList extends Component {
    componentDidMount() {
        loadGames()
    }

    onUpdateUser = async (updatedUser) => {
        this.props.updateUser(updatedUser)
    }

    render() {
        if (this.props.user) {
            const { games, user } = this.props
            let wishedGames = games.filter(game => user.wishedGames.includes(game._id))
            return <GameList history={this.props.history} user={user} onUpdateUser={this.onUpdateUser} games={wishedGames}></GameList>
        }
        return <p>Please Login to see your Wishlist</p>
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
)(WishList);