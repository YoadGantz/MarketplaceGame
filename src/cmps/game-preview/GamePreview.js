import React from 'react'

import full_heart from '../../assets/icons/full_heart.svg'
import empty_heart from '../../assets/icons/empty_heart.svg'

import './_GamePreview.scss'

export default function GamePreview(props) {
    const { game, user } = props;

    function onOpenDetails(gameId) {
        props.history.push(`/game/${gameId}`)
    }

    function gameRating() {
        const {reviews} = game
        return reviews.reduce((acc, review) => {
            return acc += review.rating;
        }, 0)
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
                <h3>{game.title}</h3>
                <h5>{game.publisher.user.userName}</h5>
                <p className="price">${game.price}</p>
    <p className="rating">{gameRating()} (total of {game.reviews.length} reviews)</p>
                <img onClick={toggleWishedGame} src={user && user.wishedGames.find(wishedGame => wishedGame === game._id) ? full_heart : empty_heart}></img>
            </div>
        </React.Fragment >
    )
};