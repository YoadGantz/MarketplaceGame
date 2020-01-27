import React, { Component } from 'react';
import { connect } from 'react-redux'

import { updateUser } from '../../actions/userActions'
import { loadGames } from '../../actions/gameActions'
import GameList from '../game-list/GameList'

import './_WishList.scss'

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
            return <div className="modal">
                <div className="modal-content">
                    <GameList isModal={true} isWishList={true} history={this.props.history} user={user} onUpdateUser={this.onUpdateUser} games={wishedGames}></GameList>
                </div>
            </div>
        }
        return <div className="modal"><h3 className="modal-content empty-wishlist flex align-center">Please Login to see your wishlist</h3></div>
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