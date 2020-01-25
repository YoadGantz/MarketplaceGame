import React from "react";

import Notification from '../../../cmps/helpers/Notification'
import GameMedia from '../../../cmps/game-media/GameMedia';
import GameDesc from '../../../cmps/game-desc/GameDesc';
import Comments from '../../../cmps/comments/Comment';
import Review from '../../../cmps/review/Review';
import Modal from '../../../cmps/modal/Modal'

export default function GameDetailsPage(props) {
    if (!props.game) return <h1>Loading</h1>;
    const { onAddCommentOrReview, onThumbNailPhotoClick, user, toggleWishedGame, onAddToCart,
        onToggleModal, toggleModal, modalTxt, currMediaUrl, game: { title, reviews, mediaUrls, tags, comments } } = props
    let mainMedia;
    currMediaUrl.includes(".mp4") ?
        mainMedia = <iframe title="video" src={`${currMediaUrl}?#t=0&#autoplay=1&mute=1`} allowFullScreen='allowfullscreen' volume={0} className="game-main-thumbnail" />
        : mainMedia = <img src={currMediaUrl} alt="" className="game-main-thumbnail" />
    return (
        <div className="container content-container" >
            {toggleModal && <Modal><Notification modalTxt={modalTxt} toggleModal={onToggleModal} /></Modal>}
            <h1>{title}</h1>
            <div className="grid game-main-content-container ">
                {mainMedia}
                <div className="flex game-choose-thumbnail-container">
                    <GameMedia onThumbNailPhotoClick={onThumbNailPhotoClick} mediaUrls={mediaUrls} />
                </div>
                <GameDesc user={props.user} onToggleWishedGame={toggleWishedGame} onAddToCart={onAddToCart} game={props.game} />
            </div>
            <h2>Tags:</h2>
            {tags.map(tag => {
                return <span className="tag" key={tag}>{tag} </span>;
            })}
            <h2>Reviews :</h2>
            <Review user={user} onAddCommentOrReview={onAddCommentOrReview} reviews={reviews} />
            <h2>Comments :</h2>
            <Comments user={user} onAddCommentOrReview={onAddCommentOrReview} comments={comments} />
        </div>
    )
}
