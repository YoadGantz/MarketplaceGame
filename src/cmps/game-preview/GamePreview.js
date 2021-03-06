import React, { Component } from 'react'
import { connect } from 'react-redux'
import history from '../../history'

import UtilService from '../../services/UtilService'
import UserService from '../../services/UserService'
import { removeGameFromCart, addGameToCart } from '../../actions/cartActions'
import TinyBarChart from '../charts/TinyBarChart'

import './_GamePreview.scss'

import full_heart from '../../assets/icons/full_heart.svg'
import empty_heart from '../../assets/icons/empty_heart.svg'
import remove_from_cart from '../../assets/icons/remove_from_cart.svg'
import edit_img from '../../assets/icons/edit.svg'
import Modal from '../modal/Modal'
import Notification from '../helpers/Notification'
class GamePreview extends Component {

    state = {
        publisherName: '',
        gameOrders: null,
        toggleModal: false,
        modalTxt: ''
    }

    async componentDidMount() {
        const { game } = this.props
        const publisher = await UserService.getById(game.publisher)
        const publisherName = publisher.userName
        this.setState({ publisherName })
        if (this.props.isDashboard) {
            this.getDetailsForChart()
        }
    }

    onOpenDetails = (gameId) => {
        history.push(`/game/${gameId}`)
    }
    onOpenEdit = (ev) => {
        ev.stopPropagation()
        history.push(`/edit/${this.props.game._id}`)
    }

    onRemoveFromCart = (ev) => {
        ev.stopPropagation();
        this.props.onRemoveFromCart(this.props.game._id)
        this.props.removeGameFromCart(this.props.game._id)
    }

    onPlayClick = (ev) => {
        ev.stopPropagation()
        history.push(`/play/${this.props.game._id}`)
    }

    getDetailsForChart = async () => {
        const gameOrders = await UtilService.getGraphsDetails([this.props.game])
        this.setState({ gameOrders })
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
        this.setState({
            modalTxt: 'Wishlist has been updated',
            toggleModal: true
        }, this.onToggleModal())

        this.props.onUpdateUser(updatedUser)
    }

    onAddToCart = (ev) => {
        ev.stopPropagation();
        try {
            this.props.addGameToCart(this.props.game._id)
            this.setState({
                modalTxt: 'Game has been added to the cart',
                toggleModal: true
            }, this.onToggleModal())
        } catch {
            this.setState({
                modalTxt: 'Game is already in the cart',
                toggleModal: true
            }, this.onToggleModal())
        }
    };

    onToggleModal = () => {
        setTimeout(() => {
            this.setState(prevState => ({ toggleModal: !prevState.toggleModal }))
        }, 2000)
    }

    render() {
        const { game, user, isProfile, isDashboard, isModal, isWishList } = this.props
        const { gameOrders, toggleModal, modalTxt } = this.state
        const review = UtilService.formatGameRating((UtilService.getGameRating(game)))
        return (
            <li className={isDashboard ? "game-card flex column dsh-game-card" : isModal ? "modal-card flex modal-game-container" : "game-card"} onClick={() => this.onOpenDetails(game._id)}>
                {!isDashboard ? <div className={"img-container"}><img alt="thumbnail" className="game-thumbnail" src={game.thumbnail}></img></div> :
                    <TinyBarChart game={game} gameOrders={gameOrders} />}
                <section className="details-container flex column">
                    <div className="full">
                        <div className={isModal ? "flex align-center column" : "flex align-center"}>
                            <strong className={isModal || isDashboard ? 'short-title' : "full game-title"} title={game.title}>{game.title}</strong>
                            {isProfile && isDashboard && <p className="price">${game.price}</p>}

                            {!isProfile && !isModal &&
                                <img alt="like" className={isModal ? 'flex align-self-end like-icon' : "like-icon"} onClick={this.toggleWishedGame} src={user && user.wishedGames.find(wishedGame => wishedGame === game._id) ?
                                    full_heart : empty_heart} />}
                        </div>
                        {!isModal && !isDashboard &&
                            <strong className="publisher">{this.state.publisherName}</strong>}
                    </div>
                    <div className={!isProfile ? "flex space-between align-end" : 'flex  align-end" flex-end'}>
                        {!isProfile && <p className="price">${game.price}</p>}
                        {!isProfile && !isModal &&
                            <p className="rating">{review} ({game.reviews.length})</p>}
                        {isModal && !isWishList && <img alt="remove" src={remove_from_cart} className="pointer like-icon" onClick={this.onRemoveFromCart} />}
                        {isProfile && !isDashboard && <div className="play-btn-container flex flex-end">
                            <button title="Play" className="play-btn" onClick={this.onPlayClick}>Play</button></div>}
                        {isProfile && isDashboard && <button title="Edit" className="btn" onClick={this.onOpenEdit}><img alt="" src={edit_img} /></button>}
                        {isWishList &&
                            <img alt="like" className={isModal ? 'flex align-self-end like-icon' : "like-icon"} onClick={this.toggleWishedGame} src={user && user.wishedGames.find(wishedGame => wishedGame === game._id) ?
                                full_heart : empty_heart} />}
                        {isWishList &&

                            <button type="primary" className='buy-btn' onClick={this.onAddToCart}>Add to cart </button>}
                        {toggleModal && <Modal><Notification modalTxt={modalTxt} toggleModal={this.onToggleModal} /></Modal>}

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
    addGameToCart
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GamePreview)
