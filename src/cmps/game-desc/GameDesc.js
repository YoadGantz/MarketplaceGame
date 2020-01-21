import React, { Component } from "react";
import UserService from "../../services/UserService";
import UtilService from "../../services/UtilService";
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
    const { thumbnail, description, publishedAt, addToCart, price } = this.props.game
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
          <button type="primary" className='game-buy-button' onClick={this.props.addToCart}>
            {price}$ Add to cart
          </button>
        </div>
      </div>)
  }

}
