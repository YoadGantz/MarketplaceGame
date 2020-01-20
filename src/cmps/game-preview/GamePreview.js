import React from 'react'

import './_GamePreview.scss'

export default function GamePreview(props) {
    const { game } = props;

    function onOpenDetails(gameId) {
        props.history.push(`/game/${gameId}`)
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
            </div>
        </React.Fragment>
    );
};