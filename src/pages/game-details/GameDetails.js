import React, { Component } from "react";
import { Button, notification } from "antd";
import CartService from '../../services/CartService.js'

// import { connect } from 'react-redux'
// import { saveCartItem } from "../../actions/cartActions";

import Review from "../../cmps/review/Review";
import Comments from "../../cmps/comments/Comments";
import GameMedia from "../../cmps/game-media/GameMedia";
import GameService from "../../services/GameService";
import SocketService from "../../services/SocketService";

import "./_GameDetails.scss";

export default class GameDetails extends Component {
  state = {
    currUrl: '',
    game: {},
    comments: []
  };

  

  componentDidMount = async () => {
    
    const { id } = this.props.match.params
    const game = await GameService.getById(id)
    this.setState({ game, currUrl: game.mediaUrls[0], comments: game.comments });
    SocketService.setup()
    SocketService.emit('chat topic', game.title);
    SocketService.on('chat addMsg', this.addComment)
  };

  componentWillUnmount = () => {
    SocketService.off()
    SocketService.terminate()
  }


  addComment = newMsg => {
    this.setState(prevState => ({ comments: [...prevState.comments, newMsg] }));
    this.updateGame('comment')
  };


  updateGame = (type) => {
    let game = this.state.game
    if (type === 'comment') {
      game = { ...this.state.game }
      game.comments = this.state.comments
    }
    GameService.update(game)
  }

  sendComment = text => {
    SocketService.emit('chat newMsg', { user: { userName: 'me' }, text });
  };

  addReview = (rating, text) => {
    const game = { ...this.state.game }
    game.reviews = [...game.reviews, { user: { userName: 'bob' }, text, rating }]
    this.setState({ game })
    this.updateGame()
  }

  addToCart = async () => {
    try {
      await CartService.addToCart(this.state.game._id)
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
    if (!this.state.currUrl) return <h1>Loading</h1>;
    const { comments, currUrl, game: { thumbnail, title, description, publishedAt,
      publisher, reviews, mediaUrls, price, tags } } = this.state;
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
          <Button type="primary" className='game-buy-button' onClick={this.addToCart}>
            {price}$ Add to cart
          </Button>
        </div>
        <div className="grid game-main-content-container ">
          {mainMedia}
          <div className="flex game-choose-thumbnail-container">
            <GameMedia onThumbNailPhotoClick={this.onThumbNailPhotoClick} mediaUrls={mediaUrls} />
          </div>
          <div >
            <img alt="" className="game-thumbnail" src={thumbnail}></img>
            <div className='game-description'>
              <p> {description}</p>
              <p> published at: {publishedAt}</p>
              <p> publisher {publisher.name}</p>
            </div>
          </div>
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

