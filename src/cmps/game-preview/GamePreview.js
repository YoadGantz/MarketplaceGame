import React from 'react'

import './_GamePreview.scss'

export default function GamePreview(props) {
    const { game } = props;

    return (
        <React.Fragment>
                <div className="game-card">
                    <h3>{game.title}</h3>
                    <h5>{game.publisher.name}</h5>
                    <div className="img-container">
                        <img alt ="thumbnail" className="game-thumbnail" width="200" src={game.thumbnail}></img>
                    </div>
                    <p>${game.price}</p>
                </div>
        </React.Fragment>
    );
};