import GamePreview from '../game-preview/GamePreview'
import React from 'react'
import ModalGamePreview from '../modal-game-preview/ModalGamePreview';

export default function GameList(props) {
    const { games, user, isModal } = props;
    return <ul className={props.isHomepage ? "hp-cards-container clean-list container" : "cards-container clean-list container"}>
        {games?.map((game) => {
            if (isModal) {
                return <ModalGamePreview
                    key={game._id}
                    onRemoveFromCart={props.onRemoveFromCart}
                    onUpdateUser={props.onUpdateUser}
                    game={game}
                    isWishList={props.isWishList}
                    history={props.history}
                />
            }
            return <GamePreview
                game={game}
                user={user}
                key={game._id}
                isProfile={props.isProfile}
                isHomepage={props.isHomepage}
                isDashboard={props.isDashboard}
                onUpdateUser={props.onUpdateUser}
                onRemoveGame={props.onRemoveGame}
                >
            </GamePreview>
        })}
    </ul >
}
