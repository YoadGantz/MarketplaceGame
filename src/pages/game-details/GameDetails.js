import React, { Component } from "react";
import { connect } from 'react-redux'

import SocketService from "../../services/SocketService";

import { loadGame, updateGame, updateComments } from "../../actions/gameActions";
import { updateUser } from '../../actions/userActions';
import { addGameToCart } from '../../actions/cartActions';


import full_heart from '../../assets/icons/full_heart.svg'
import empty_heart from '../../assets/icons/empty_heart.svg'

import Notification from '../../cmps/helpers/Notification'
import GameMedia from '../../cmps/game-media/GameMedia';
import GameDesc from '../../cmps/game-desc/GameDesc';
import Comments from '../../cmps/comments/Comment';
import Review from '../../cmps/review/Review';
import Modal from '../../cmps/modal/Modal'

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
    SocketService.emit('chat room', this.props.game.title);
    SocketService.on('chat newComment', this.onAddCommentOrReview)
  }

  componentWillUnmount = () => {
    SocketService.terminate()
  }

  onAddCommentOrReview = (newText, isSent = false, name = 'comments') => {
    const newGame = { ...this.props.game }
    newGame[name] = [...newGame[name], newText]
    if (!isSent) { return this.props.updateComments(newGame) }
    if (name === 'comments') { SocketService.emit('chat newComment', newText); }
    return this.props.updateGame(newGame)
  }

  onAddToCart = (gameId) => {
    try {
      this.props.addGameToCart(gameId)
      this.setState({
        modalTxt: 'Game has been added to the cart',
        toggleModal: true
      }, this.onToggleModal())
    } catch {
      this.setState({
        modalTxt: 'Game is already in the cart',
        toggleModal: true
      }, this.onToggleModal())
    }
  };

  toggleWishedGame = (ev) => {
    const { user, game } = this.props
    ev.stopPropagation();
    let wishedGames = (user && user.wishedGames) || []
    let updatedUser
    const idx = wishedGames.findIndex(id => id === game._id)
    if (idx === -1) {
      updatedUser = { ...user, wishedGames: [...wishedGames, game._id] }
    } else {
      updatedUser = { ...user, wishedGames: wishedGames.filter(wishedGame => wishedGame !== game._id) }
    }
    this.props.updateUser(updatedUser)
  }

  onToggleModal = () => {
    setTimeout(() => {
      this.setState(prevState => ({ toggleModal: !prevState.toggleModal }))
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
    currMediaUrl.includes(".mp4") ?
      mainMedia = <iframe title="video" src={`${currMediaUrl}?#t=0&#autoplay=1&mute=1`} volume={0}  className="game-main-thumbnail" />
      : mainMedia = <img src={currMediaUrl} alt="" className="game-main-thumbnail" />
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
          <GameDesc user={this.props.user} onToggleWishedGame={this.toggleWishedGame} onAddToCart={this.onAddToCart} game={this.props.game} />
        </div>
        <h2>Tags:</h2>
        {tags.map(tag => {
          return <span className="tag" key={tag}>{tag} </span>;
        })}
        <h2>Reviews :</h2>
        <Review user={this.props.user} onAddCommentOrReview={this.onAddCommentOrReview} reviews={reviews} />
        <h2>Comments :</h2>
        <Comments user={this.props.user} onAddCommentOrReview={this.onAddCommentOrReview} comments={comments} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cartStore.cart,
    game: state.gameStore.game,
    user: state.userStore.loggedInUser,
  };
};
const mapDispatchToProps = {
  addGameToCart,
  loadGame,
  updateGame,
  updateComments,
  updateUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameDetails)
