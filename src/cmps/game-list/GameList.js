import GamePreview from '../game-preview/GamePreview'
import React from 'react'
import ModalGamePreview from '../modal-game-preview/ModalGamePreview';

export default function GameList(props) {
    const { games, user ,isModal} = props;
    return <ul className="cards-container clean-list container">
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
                key={game._id}
                onRemoveFromCart={props.onRemoveFromCart}
                isCart={props.isCart}
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
