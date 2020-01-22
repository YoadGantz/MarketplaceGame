import React, { Component } from "react";
import { connect } from 'react-redux'
import { notification } from "antd";

import CartService from '../../services/CartService.js'
import SocketService from "../../services/SocketService";

import { loadGame, updateGame, updateComments } from "../../actions/gameActions.js";
import { addGameToCart } from '../../actions/cartActions'

import GameDesc from '../../cmps/game-desc/GameDesc';
import GameMedia from '../../cmps/game-media/GameMedia';
import Comments from '../../cmps/comments/Comment';
import Review from '../../cmps/review/Review';

import './_GameDetails.scss';

class GameDetails extends Component {
  state = {
    currUrl: '',
  };

  componentDidMount = async () => {
    const { id } = this.props.match.params
    await this.props.loadGame(id)
  }

  getDetails = () => {
    this.setState({ currUrl: this.props.game.mediaUrls[0] });
    this.initiateSockets()
  }

  initiateSockets = () => {
    SocketService.setup()
    SocketService.emit('chat topic', this.props.game.title);
    SocketService.on('chat newComment', this.onAddCommentOrReview)
  }

  componentWillUnmount = () => {
    SocketService.terminate()
  }

  onAddCommentOrReview = (newText, isSent = false, name = 'comments') => {
    const newGame = { ...this.props.game }
    newGame[name] = [...newGame[name], newText]
    if (!isSent) {
      return this.props.updateComments(newGame)
    }
    if (name === 'comments') {
      SocketService.emit('chat newComment', newText);
    }
    return this.props.updateGame(newGame)
  }

  onAddToCart = async () => {
    try {
      await CartService.addToCart(this.state.game._id)
      this.props.addGameToCart(this.state.game._id)
      notification.info({
        message: `Game has been added`,
        description: "The game has been added to the cart"
      });
    }
    catch{
      notification.info({
        message: `The game is already in the cart`,
        description: "You can add other games :)"
      });
    }
  };

  onThumbNailPhotoClick = ev => {
    this.setState({ currUrl: ev.target.src });
  };

  render() {
    if (!this.props.game) return <h1>Loading</h1>;
    const { currUrl } = this.state
    const { loggedInUser, game: { title,
      reviews, mediaUrls, tags, comments } } = this.props;
    if (!currUrl) {
      this.getDetails()
      return <h1>Loading</h1>
    }
    let mainMedia;
    if (currUrl.includes("mp4")) {
      mainMedia = (<iframe title="video" src={`${currUrl}#t=0`} className="game-main-thumbnail" />
      );
    } else {
      mainMedia = (<img src={currUrl} alt="" className="game-main-thumbnail" />
      );
    }
    return (
      <div className="container">
        <div className="flex justify-between">
          <h1>{title}</h1>
        </div>
        <div className="grid game-main-content-container ">
          {mainMedia}
          <div className="flex game-choose-thumbnail-container">
            <GameMedia onThumbNailPhotoClick={this.onThumbNailPhotoClick} mediaUrls={mediaUrls} />
          </div>
          <GameDesc addToCart={this.onAddToCart} game={this.props.game} />
        </div>
        <h2>Tags:</h2>
        {tags.map(tag => {
          return <span key={tag}>{tag} </span>;
        })}
        <h2>Reviews :</h2>
        <Review user={this.props.loggedInUser} onAddCommentOrReview={this.onAddCommentOrReview} reviews={reviews} />
        <h2>Comments :</h2>
        <Comments user={loggedInUser} onAddCommentOrReview={this.onAddCommentOrReview} comments={comments} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cartStore.cart,
    game: state.gameStore.game,
    loggedInUser: state.userStore.loggedInUser,
  };
};
const mapDispatchToProps = {
  addGameToCart,
  loadGame,
  updateGame,
  updateComments
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameDetails)
