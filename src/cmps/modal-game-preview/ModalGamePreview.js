import React, { Component } from "react";
import { connect } from "react-redux";

import full_heart from '../../assets/icons/full_heart.svg'
import empty_heart from '../../assets/icons/empty_heart.svg'
import remove_from_cart from '../../assets/icons/remove_from_cart.png'
import { removeGameFromCart } from "../../actions/cartActions";
import './_ModalGamePreview.scss'

class ModalGamePreview extends Component {

    onRemoveFromCart = (ev) => {
        ev.stopPropagation();
        this.props.onRemoveFromCart(this.props.game._id)
        this.props.removeGameFromCart(this.props.game._id)
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

    onGameClick= (ev)=>{
        ev.stopPropagation();
        this.props.history.push(`/game/${this.props.game._id}`)
    }

    render() {
        const { isWishList, user, game: { thumbnail, title, _id, price } } = this.props

        return (<div className='flex modal-game-container' onClick={this.onGameClick}>
            <img alt="thumbnail" className="game-thumbnail" src={thumbnail} />
            <div className='flex column space-between'>
                <p className="title" title={title}>{title}</p>
                <div className='flex space-between align-end'>
                    {!isWishList&&<img alt="remove" src={remove_from_cart} className="modal-buttons pointer" onClick={this.onRemoveFromCart} />}
                    {isWishList &&
                        <img alt="like" className="modal-buttons pointer" onClick={this.toggleWishedGame} src={user && user.wishedGames.find(wishedGame => wishedGame === _id) ?
                            full_heart : empty_heart} />}
                   <p>${price}</p>

                </div>
            </div>



        </div>)


    }
}



const mapStateToProps = state => {
    return {
        cart: state.cartStore.cart,
        user: state.userStore.loggedInUser

    };
};

const mapDispatchToProps = {
    removeGameFromCart,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ModalGamePreview)
