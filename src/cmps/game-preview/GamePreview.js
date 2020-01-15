import React from 'react'
import { Link } from 'react-router-dom'

export default function GamePreview(props) {
    const { game } = props;
    console.log(game._id);
    
    return (
        <React.Fragment>
            <Link to={`/game/${game._id}`}>
                <div>
                    <h3>{game.title}</h3>
                    <h5>{game.publisher.name}</h5>
                    <img className="thumbnail" width="200" src={game.thumbnail}></img>
                    <p>${game.price}</p>
                </div>
            </Link>
        </React.Fragment>
    );
};