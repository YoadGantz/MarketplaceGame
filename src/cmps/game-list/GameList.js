import GamePreview from '../game-preview/GamePreview'
import React, { Component } from 'react'
import './GameList.scss'

export default function GameList(props) {
    const { games } = props;
    return <ul className="games-container">
        {games.map((game) => {
            return <li key={game._id}>
                <GamePreview game={game}></GamePreview>
            </li>
        })
        }
    </ul>
}
