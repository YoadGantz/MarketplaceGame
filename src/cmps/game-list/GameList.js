import GamePreview from '../game-preview/GamePreview'
import React from 'react'

export default function GameList(props) {
    const { games, user } = props;
    return <ul className={props.isHomepage ? "hp-cards-container clean-list container" : "cards-container clean-list container"}>
        {games?.map((game) => {
            return (
                <GamePreview
                    game={game}
                    user={user}
                    key={game._id}
                    isCart={props.isCart}
                    isProfile={props.isProfile}
                    isHomepage={props.isHomepage}
                    isDashboard={props.isDashboard}
                    onUpdateUser={props.onUpdateUser}
                    onRemoveGame={props.onRemoveGame}
                    onRemoveFromCart={props.onRemoveFromCart}>
                </GamePreview>)
        })}
    </ul >
}
