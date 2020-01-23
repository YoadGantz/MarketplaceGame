import React, { Component } from "react";
import UtilService from "../../services/UtilService";
import UserService from "../../services/UserService";

import full_heart from '../../assets/icons/full_heart.svg'
import empty_heart from '../../assets/icons/empty_heart.svg'

export default class GameDesc extends Component {
  state = { orderCount: '', rating: '', publisherName: '' }

  componentDidMount = () => {
    const { game } = this.props
    this.setOrderCount(game)
    this.setGameRating(game)
    this.setPublisherName(game.publisher)
  }

  setOrderCount = async (game) => {
    const orderCount = await UtilService.getGraphsDetails([game])
    this.setState({ orderCount: orderCount[game.title] })
  }

  onAddToCart = () => {
    this.props.onAddToCart(this.props.game._id)
  }

  setGameRating = (game) => {
    const rating = UtilService.getGameRating(game)
    this.setState({ rating })
  }

  setPublisherName = async (publisherId) => {
    const publisher = await UserService.getById(publisherId)
    const publisherName = publisher.userName
    this.setState({ publisherName })
  }

  render() {
    const { game, user } = this.props
    const { thumbnail, description, publishedAt, price } = game
    const date = new Date(publishedAt/1)
    const publishedDate = UtilService.formatDate(date)
    const { publisherName, rating, orderCount } = this.state
    return (
      <div>
        <img alt="" className="game-thumbnail" src={thumbnail}></img>
        <div className='game-description'>
          <p > {description}</p>
          <p> Published at: {publishedDate}</p>
          <p> Publisher: {publisherName}</p>
          <p> Rating: {rating}</p>
          <p> Downloads last month :{orderCount}   </p>
          <button type="primary" className='game-buy-button' onClick={this.onAddToCart}>
            {price}$ Add to cart
          </button>
          <img alt="like" className="like-icon" onClick={this.props.onToggleWishedGame} src={user && user.wishedGames.find(wishedGame => wishedGame === game._id) ?
            full_heart : empty_heart} />
        </div>
      </div>)
  }

}
