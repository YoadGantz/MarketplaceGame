import React, { Component } from "react";
import { connect } from 'react-redux'

import CartService from '../../services/CartService.js'
import SocketService from "../../services/SocketService";

import { loadGame, updateGame } from "../../actions/gameActions.js";
import { addGameToCart } from '../../actions/cartActions'

import GameDesc from '../../cmps/game-desc/GameDesc';
import GameMedia from '../../cmps/game-media/GameMedia';
import Comments from '../../cmps/comments/Comment';
import Review from '../../cmps/review/Review';
import Modal from '../../cmps/modal/Modal'
import Notification from '../../cmps/helpers/Notification'

import './_GameDetails.scss';

class GameDetails extends Component {
  state = {
    currMediaUrl: '',
    toggleModal: false,
    modalTxt: ''
  };

  componentDidMount = async () => {
    const { id } = this.props.match.params
    await this.props.loadGame(id)
    this.setState({ currMediaUrl: this.props.game.mediaUrls[0] });
    this.initiateSockets()
  }

  initiateSockets = () => {
    SocketService.setup()
    SocketService.emit('chat topic', this.props.game.title);
    SocketService.on('chat newComment', this.onAddComment)
  }

  componentWillUnmount = () => {
    SocketService.terminate()
  }

  onAddComment = newComment => {
    const newGame = { ...this.props.game }
    newGame.comments = [...newGame.comments, newComment]
    this.props.updateGame(newGame)
  }

  onAddReview = (rating, text) => {
    if (!this.props.loggedInUser) {
      console.log('you have to login if you want to add a review')
      return
    }
    const newGame = { ...this.props.game }
    newGame.reviews = [...newGame.reviews,
    {
      user: { userName: this.props.loggedInUser.userName },
      text,
      rating
    }]
    this.props.updateGame(newGame)
  }

  sendComment = text => {
    let userName = 'Guest'
    if (this.props.loggedInUser) userName = this.props.loggedInUser.userName
    SocketService.emit('chat newComment', { user: { userName }, text });
  }

  onAddToCart = async () => {
    try {
      await CartService.addToCart(this.state.game._id)
      this.props.addGameToCart(this.state.game._id)
      this.setState({ modalTxt: 'Game has been added to the cart', toggleModal: true }, this.onToggleModal())
    }
    catch{
      this.setState({ modalTxt: 'Game is already in the cart', toggleModal: true }, this.onToggleModal())
    }
  };

  onToggleModal = () => {
    setTimeout(() => { 
      this.setState((prevState) => this.state.toggleModal = !prevState) 
    }, 2000)
  }

  onThumbNailPhotoClick = ev => {
    this.setState({ currMediaUrl: ev.target.src });
  };

  render() {
    if (!this.props.game) return <h1>Loading</h1>;
    const { currMediaUrl } = this.state
    const { title, reviews, mediaUrls, tags, comments } = this.props.game;
    let mainMedia;
    if (!currMediaUrl) { return <h1>Loading</h1> }
    currMediaUrl.includes("mp4") ?
      mainMedia = <iframe title="video" src={`${currMediaUrl}#t=0`} className="game-main-thumbnail" />
      : mainMedia = <img src={currMediaUrl} alt="" className="game-main-thumbnail" />
    console.log(this.state.toggleModal)
    return (
      <div className="container" >
        {this.state.toggleModal && <Modal><Notification modalTxt={this.state.modalTxt} toggleModal={this.onToggleModal} /></Modal>}
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
        {tags.map(tag => { return <span key={tag}>{tag} </span>; })}
        <h2>Reviews :</h2>
        <Review addReview={this.onAddReview} reviews={reviews} />
        <h2>Comments :</h2>
        <Comments sendComment={this.sendComment} comments={comments} />
      </div >
    );
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cartStore.cart,
    game: state.gameStore.game,
    user: state.userStore.loggedInUser
  };
};
const mapDispatchToProps = {
  addGameToCart,
  loadGame,
  updateGame
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameDetails)
