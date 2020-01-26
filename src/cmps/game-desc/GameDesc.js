import React, { Component } from "react";
import UtilService from "../../services/UtilService";
import UserService from "../../services/UserService";

import full_heart from '../../assets/icons/full_heart.svg'
import empty_heart from '../../assets/icons/empty_heart.svg'
import OrderService from "../../services/OrderService";

import './_GameDesc.scss'

export default class GameDesc extends Component {
  state = { orderCount: '', rating: '', publisherName: '', isOwned: false }

  componentDidMount = () => {
    const { game } = this.props
    this.setOrderCount(game)
    this.setGameRating(game)
    this.setPublisherName(game.publisher)
    this.purchaseCheck()
  }
  componentDidUpdate = (prevProps) => {
    const { game } = this.props
    if (game.title !== prevProps.game.title) {
      this.setOrderCount(game)
      this.setGameRating(game)
      this.setPublisherName(game.publisher)
      this.purchaseCheck()
    }
  }

  setOrderCount = async (game) => {
    const orderCount = await UtilService.getGraphsDetails([game])
    this.setState({ orderCount: orderCount[game.title] })
  }

  onAddToCart = () => {
    this.props.onAddToCart(this.props.game._id)
  }

  setGameRating = (game) => {
    const rating = UtilService.formatGameRating((UtilService.getGameRating(game)))
    this.setState({ rating })
  }

  setPublisherName = async (publisherId) => {
    const publisher = await UserService.getById(publisherId)
    const publisherName = publisher.userName
    this.setState({ publisherName })
  }

  purchaseCheck = async () => {
    let isPurchased = []
    if (this.props.user) {
      isPurchased = await OrderService.query({ orderBy: this.props.user._id, gameId: this.props.game._id })
    }
    if (isPurchased.length) {
      return this.setState({ isOwned: true })
    } else {
      return this.setState({ isOwned: false })
    }
  }

  render() {
    const { game, user } = this.props
    const { thumbnail, description, publishedAt, price,_id } = game
    const { publisherName, rating, orderCount, isOwned } = this.state
    const priceOrPlay = isOwned ? <button className='btn'>Play</button> :
      <button type="primary" className='buy-btn' onClick={this.onAddToCart}> {price}$ Add to cart </button>
    const date = new Date(publishedAt / 1)
    const publishedDate = UtilService.formatDate(date)
    return (
      <div className="desc desc-container flex column">
        <img alt="" className="game-thumbnail" src={thumbnail}></img>
        <table className="details">
          <tbody>
            <tr>
              <td className="publisher">{publisherName}</td>
              <td className="published">{publishedDate}</td>
            </tr>
          </tbody>
        </table>
        <div className="rating-downloads">
          <p className="rating">Rating: {rating}</p>
          <p className="downloads">Last month downloads: {orderCount}</p>
        </div>
        <p className="description full">{description}</p>
        <div className="flex space-between wish-btn">
          <img alt="like" className="like-icon" onClick={this.props.onToggleWishedGame} src={user && user.wishedGames.find(wishedGame => wishedGame === _id) ? full_heart : empty_heart} />
          <button>{priceOrPlay}</button>
        </div>
      </div>)
  }
}
