import React, { Component } from 'react'
import { connect } from 'react-redux'

import UtilService from '../../services/UtilService'
import UserService from '../../services/UserService'
import { removeGameFromCart } from '../../actions/cartActions'

import './_GamePreview.scss'

import full_heart from '../../assets/icons/full_heart.svg'
import empty_heart from '../../assets/icons/empty_heart.svg'
import remove_from_cart from '../../assets/icons/remove_from_cart.png'
import trash_bin from '../../assets/icons/bin.svg'
import edit_img from '../../assets/icons/edit.svg'
import play_img from '../../assets/icons/play.svg'

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
    onOpenEdit = (ev) => {
        ev.stopPropagation()
        this.props.history.push(`/edit/${this.props.game._id}`)
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
        const review = UtilService.formatGameRating((UtilService.getGameRating(game)))
        return (
            <li className="game-card" onClick={() => this.onOpenDetails(game._id)}>
                <div className="img-container">
                    <img alt="thumbnail" className="game-thumbnail" src={game.thumbnail}></img>
                </div>
                <section className="details-container">
                    <div className="flex align-center">
                        <strong className="full game-title" title={game.title}>{game.title}</strong>
                        {isProfile && isDashboard && <p className="price">${game.price}</p>}
                        {!isProfile &&
                            <img alt="like" className="like-icon" onClick={this.toggleWishedGame} src={user && user.wishedGames.find(wishedGame => wishedGame === game._id) ?
                                full_heart : empty_heart} />}
                    </div>
                    <strong className="publisher">{this.state.publisherName}</strong>
                    <div className="flex space-between">
                        {!isProfile && <p className="price">${game.price}</p>}
                        {!isProfile &&
                            <p className="rating">{review} ({game.reviews.length})</p>}
                        {isCart && <img alt="remove" src={remove_from_cart} className="like-icon" onClick={this.onRemoveFromCart} />}
                        {isProfile && !isDashboard &&
                            <button title="Play" className="play-btn btn" onClick={this.onPlayClick}><img alt="" src={play_img}/></button>}
                        {isProfile && isDashboard && <div className="dsh-btn-container flex space-between">
                            <button title="Edit" className="btn" onClick={this.onOpenEdit}><img alt="" src={edit_img}/></button>
                            {isDashboard && <button title="Delete" className="btn" onClick={this.onRemoveGame}><img alt="" src={trash_bin}/></button>}
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
