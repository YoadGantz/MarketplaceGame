import GamePreview from '../game-preview/GamePreview'
import React from 'react'

import './_GameList.scss'

export default function GameList(props) {
    const { games, user } = props;
    return <ul className="cards-container clean-list container">
        {games?.map((game) => {
            return <GamePreview key={game._id} onRemoveFromCart={props.onRemoveFromCart} isCart={props.isCart}
                history={props.history}
                isProfile={props.isProfile}
                isDashboard={props.isDashboard}
                user={user}
                onUpdateUser={props.onUpdateUser}
                onRemoveGame={props.onRemoveGame}
                game={game}>
            </GamePreview>
        })}
    </ul >
}
