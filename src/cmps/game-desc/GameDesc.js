import React, { Component } from "react";
import UtilService from "../../services/UtilService";
import UserService from "../../services/UserService";

export default class GameDesc extends Component {
  state = { orderCount: '', rating: '', publisherName: '' }

  componentDidMount = () => {
    const game = this.props.game
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
    const { onAddToCart, game: { thumbnail, description, publishedAt, price } } = this.props
    const { publisherName, rating, orderCount } = this.state
    console.log(this.props)
    return (
      <div>
        <img alt="" className="game-thumbnail" src={thumbnail}></img>
        <div className='game-description'>
          <p > {description}</p>
          <p> Published at: {publishedAt}</p>
          <p> Publisher: {publisherName}</p>
          <p> Rating: {rating}</p>
          <p> Downloads last month :{orderCount}   </p>
          <button type="primary" className='game-buy-button' onClick={onAddToCart}>
            {price}$ Add to cart
          </button>
        </div>
      </div>)
  }

}
