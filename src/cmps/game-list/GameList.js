import GamePreview from '../game-preview/GamePreview'
import React from 'react'

export default function GameList(props) {
    const { games, user, } = props;
    return <ul className={props.isHomepage ? "hp-cards-container clean-list container" : props.isModal ? "clean-list modal-cards" : "cards-container clean-list container"}>
        {games?.map((game) => {
            return <GamePreview
                isModal={props.isModal}
                game={game}
                user={user}
                key={game._id}
                isProfile={props.isProfile}
                isHomepage={props.isHomepage}
                isDashboard={props.isDashboard}
                onUpdateUser={props.onUpdateUser}
                onRemoveFromCart={props.onRemoveFromCart}
                isWishList={props.isWishList}
            >
            </GamePreview>
        })}
    </ul >
}
