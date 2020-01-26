import React, { Component } from "react";
import { connect } from 'react-redux'

import SocketService from "../../services/SocketService";

import { loadGame, updateGame, updateComments } from "../../actions/gameActions";
import { updateUser } from '../../actions/userActions';
import { addGameToCart } from '../../actions/cartActions';

import './_GameDetails.scss';
import GameDetailsPage from "./game-details-page/GameDetailsPage";

class GameDetails extends Component {
  state = {
    currMediaUrl: '',
    toggleModal: false,
    modalTxt: ''
  };

  componentDidMount = async () => {
    window.scrollTo(0,0);
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
    const { loggedInUser, game } = this.props
    ev.stopPropagation();
    let wishedGames = (loggedInUser && loggedInUser.wishedGames) || []
    let updatedUser
    const idx = wishedGames.findIndex(id => id === game._id)
    if (idx === -1) {
      updatedUser = { ...loggedInUser, wishedGames: [...wishedGames, game._id] }
    } else {
      updatedUser = { ...loggedInUser, wishedGames: wishedGames.filter(wishedGame => wishedGame !== game._id) }
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
    return (
      <GameDetailsPage onThumbNailPhotoClick={this.onThumbNailPhotoClick}
        onToggleModal={this.onToggleModal} toggleWishedGame={this.toggleWishedGame}
        game={this.props.game} currMediaUrl={this.state.currMediaUrl} modalTxt={this.state.modalTxt}
        onAddToCart={this.onAddToCart} onAddCommentOrReview={this.onAddCommentOrReview} user={this.props.loggedInUser} />
    )
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
  updateComments,
  updateUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameDetails)
