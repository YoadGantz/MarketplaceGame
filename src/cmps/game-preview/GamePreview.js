import React from 'react'
import { Link } from 'react-router-dom'
import './_GamePreview.scss'

export default function GamePreview(props) {
    const { game } = props;

    return (
        <React.Fragment>
            <Link to={`/game/${game._id}`}>
                <div className="game-card">
                    <h3>{game.title}</h3>
                    <h5>{game.publisher.name}</h5>
                    <div className="img-container">
                        <img alt ="thumbnail" className="game-thumbnail" width="200" src={game.thumbnail}></img>
                    </div>
                    <p>${game.price}</p>
                </div>
            </Link>
        </React.Fragment>
    );
};