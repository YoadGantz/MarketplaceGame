import GamePreview from '../game-preview/GamePreview'
import React from 'react'
import './_GameList.scss'

export default function GameList(props) {

    const { games, user } = props;
    return <ul className="cards-container clean-list container">
        {games?.map((game) => {
            return <li key={game._id}>
                <GamePreview onRemoveFromCart={props.onRemoveFromCart} isCart={props.isCart} history={props.history}
                isProfile={props.isProfile} user={user} onUpdateUser={props.onUpdateUser}
                game={game}></GamePreview>
            </li>
        })
        }
    </ul>
}
