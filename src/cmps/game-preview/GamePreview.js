import React from 'react'

import full_heart from '../../assets/icons/full_heart.svg'
import empty_heart from '../../assets/icons/empty_heart.svg'

import './_GamePreview.scss'

export default function GamePreview(props) {
    const { game, user } = props;

    function onOpenDetails(gameId) {
        props.history.push(`/game/${gameId}`)
    }

    function getGameRating() {
        const { reviews } = game

        let sumOfRating = reviews.reduce((acc, review) => {
            return acc += review.rating;
        }, 0)
        const rating = +(sumOfRating / reviews.length).toFixed(2)
        return rating
    }

    function onRemoveFromCart(ev) {
        ev.stopPropagation();
        props.onRemoveFromCart(game._id)
    }

    function toggleWishedGame(ev) {
        ev.stopPropagation();

        let wishedGames = user && user.wishedGames || []
        let updatedUser
        const idx = wishedGames.findIndex(id => id === game._id)
        if (idx === -1) {
            updatedUser = { ...user, wishedGames: [...wishedGames, game._id] }
        } else {
            updatedUser = { ...user, wishedGames: wishedGames.filter(wishedGame => wishedGame !== game._id) }
        }
        props.onUpdateUser(updatedUser)
    }
    return (
        <React.Fragment>
            <div onClick={() => onOpenDetails(game._id)} className="game-card">
                <div className="img-container">
                    <img alt="thumbnail" className="game-thumbnail" src={game.thumbnail}></img>
                </div>
                <div className="flex">
                    <h3 className="full">{game.title}</h3>
                    <p className="rating">{getGameRating()} ({game.reviews.length} reviews)</p>
                </div>
                <h5>{game.publisher.user.userName}</h5>
                <div className="flex space-between">
                    <p className="price">${game.price}</p>
                    {!props.isProfile &&
                        <img className="like-icon" onClick={toggleWishedGame} src={user && user.wishedGames.find(wishedGame => wishedGame === game._id) ? full_heart : empty_heart} />}
                    {props.isCart && <img className="like-icon" onClick={onRemoveFromCart} />}

                </div>
            </div>
        </React.Fragment >
    )
};