import React, { Component } from 'react';
import { Button, notification } from 'antd';
import { connect } from 'react-redux'

import CartService from '../../services/CartService.js'
import GameService from '../../services/GameService';
import SocketService from '../../services/SocketService';
import UtilService from '../../services/UtilService';
import UserService from '../../services/UserService';

import { addGameToCart } from '../../actions/cartActions'

import GameMedia from '../../cmps/game-media/GameMedia';
import Comments from '../../cmps/comments/Comments';
import Review from '../../cmps/review/Review';

import './_GameDetails.scss';
import GameDesc from '../../cmps/game-desc/GameDesc';

class GameDetails extends Component {
  state = {
    currUrl: '',
    game: {},
    downloads: '',
    rating: '',
    publisherName: ''
  };

  componentDidMount = async () => {
    const { id } = this.props.match.params
    const game = await GameService.getById(id)
    this.setState({ game, currUrl: game.mediaUrls[0], comments: game.comments });
    this.setGameRating(game)
    this.setGameDownloads(game)
    this.setPublisherName(game.publisher)
    SocketService.setup()
    SocketService.emit('chat topic', game.title);
    SocketService.on('chat addMsg', this.addComment)
  };

  componentWillUnmount = () => {
    SocketService.off('chat addMsg')
    SocketService.terminate()
  }

  addComment = newMsg => {
    this.updateGame('comment', newMsg)
  };

  sendComment = text => {
    SocketService.emit('chat newMsg', { user: { userName: 'me' }, text });
  };

  updateGame = (type, newMsg) => {
    let game = this.state.game
    if (type === 'comment') {
      game = { ...this.state.game }
      game.comments = [...game.comments, newMsg]
    }
    GameService.update(game)
  }

  setPublisherName = async (publisherId) => {
    const publisher = await UserService.getById(publisherId)
    const publisherName = publisher.userName
    this.setState({ publisherName })
  }

  setGameDownloads = async (game) => {
    const downloads = await UtilService.getGraphsDetails([game])
    this.setState({ downloads: downloads[game.title] })
  }

  setGameRating = (game) => {
    const rating = UtilService.getGameRating(game)
    this.setState({ rating })
  }



  addReview = (rating, text) => {
    const game = { ...this.state.game }
    game.reviews = [...game.reviews, { user: { userName: 'bob' }, text, rating }]
    this.setState({ game })
    this.updateGame()
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
    if (!this.state.game.title) return <h1>Loading</h1>;
    const { downloads, comments, currUrl, rating, publisherName, game: { thumbnail, title, description, publishedAt,
      reviews, mediaUrls, price, tags } } = this.state;
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
          <GameDesc addToCart={this.onAddToCart} downloads={downloads} description={description} publisherName={publisherName}
            publishedAt={publishedAt} rating={rating} price={price} thumbnail={thumbnail} />
        </div>
        <h2>Tags:</h2>
        {tags.map(tag => {
          return <span key={tag}>{tag} </span>;
        })}
        <h2>Reviews :</h2>
        <Review addReview={this.addReview} reviews={reviews} />
        <h2>Comments :</h2>
        <Comments sendComment={this.sendComment} comments={comments} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cartStore.cart
  };
};

const mapDispatchToProps = {
  addGameToCart
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameDetails)

