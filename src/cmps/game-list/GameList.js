import GamePreview from '../game-preview/GamePreview'
import React from 'react'
import './_GameList.scss'

export default function GameList(props) {
    const { games } = props;
    
    return <ul className="games-container">
        {games?.map((game) => {
            return <li key={game._id}>
                <GamePreview history={props.history} game={game}></GamePreview>
            </li>
        })
        }
    </ul>
}
