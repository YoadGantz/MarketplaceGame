import React, { Component } from 'react'
import { connect } from 'react-redux'

import UtilService from '../../services/UtilService'
import UserService from '../../services/UserService'
import { removeGameFromCart } from '../../actions/cartActions'


import full_heart from '../../assets/icons/full_heart.svg'
import empty_heart from '../../assets/icons/empty_heart.svg'
import remove_from_cart from '../../assets/icons/remove_from_cart.png'

import './_GamePreview.scss'

class GamePreview extends Component {
    state = {
        publisherName: '',
    }
    async componentDidMount() {
        const { game } = this.props
        const publisher = await UserService.getById(game.publisher)
        const publisherName = publisher.userName
        this.setState({ publisherName })
    }

    onOpenDetails = (gameId) => {
        this.props.history.push(`/game/${gameId}`)
    }
    onOpenEdit = (gameId) => {
        this.props.history.push(`/edit/${gameId}`)
    }

    onRemoveFromCart = (ev) => {
        ev.stopPropagation();
        this.props.onRemoveFromCart(this.props.game._id)
        this.props.removeGameFromCart(this.props.game._id)
    }

    onPlayClick = (ev) => {
        ev.stopPropagation()
        this.props.history.push(`/play/${this.props.game._id}`)
    }

    toggleWishedGame = (ev) => {
        const { user, game } = this.props
        ev.stopPropagation();
        let wishedGames = (user && user.wishedGames) || []
        let updatedUser
        const idx = wishedGames.findIndex(id => id === game._id)
        if (idx === -1) {
            updatedUser = { ...user, wishedGames: [...wishedGames, game._id] }
        } else {
            updatedUser = { ...user, wishedGames: wishedGames.filter(wishedGame => wishedGame !== game._id) }
        }
        this.props.onUpdateUser(updatedUser)
    }
    render() {
        const { game, user, isProfile, isDashboard, isCart } = this.props
        return (
            <li className="game-card" onClick={() => this.onOpenDetails(game._id)}>
                {/* <img className="spotlight-img" src={spotlightImg} alt="background spotlight"></img> */}
                <div className="img-container">
                    <img alt="thumbnail" className="game-thumbnail" src={game.thumbnail}></img>
                </div>
                <section className="content-container">
                    <div className="flex">
                        <strong className="full">{game.title}</strong>
                        <p className="rating">{UtilService.getGameRating(game)} ( {game.reviews.length} )</p>
                    </div>
                    <strong className="publisher">{this.state.publisherName}</strong>
                    <div className="flex space-between">
                        <p className="price">${game.price}</p>
                        {!isProfile &&
                            <img alt="like" className="like-icon" onClick={this.toggleWishedGame} src={user && user.wishedGames.find(wishedGame => wishedGame === game._id) ?
                                full_heart : empty_heart} />}
                        {isCart && <img alt="remove" src={remove_from_cart} className="like-icon" onClick={this.onRemoveFromCart} />}
                        {isProfile && !isDashboard &&
                            <button className="preview-btn" onClick={this.onPlayClick}>Play</button>}
                        {isProfile && isDashboard && <div>
                            <button className="preview-btn" onClick={() => this.onOpenEdit(game._id)}>Edit</button>
                            <button className="preview-btn" onClick={() => this.props.onRemoveGame(game._id)}>X</button>
                        </div>}
                    </div>
                </section >
            </li >
        )
    }
}

const mapStateToProps = state => {
    return {
        cart: state.cartStore.cart
    };
};

const mapDispatchToProps = {
    removeGameFromCart,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GamePreview)
