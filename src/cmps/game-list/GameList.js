import GamePreview from '../game-preview/GamePreview'
import React from 'react'
import './_GameList.scss'

export default function GameList(props) {
    const { games } = props;
    console.log(games)
    
    return <ul className="games-container">
        {games?.map((game) => {
            return <li key={game._id}>
                <GamePreview game={game}></GamePreview>
            </li>
        })
        }
    </ul>
}
