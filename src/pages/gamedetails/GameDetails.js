import React, { Component } from "react";

import "antd/dist/antd.css";
import { Button, notification } from "antd";

import "./GameDetails.scss";
import Review from "../../cmps/review/Review";
import Comments from "../../cmps/comments/Comments";
import GameService from "../../services/GameService";

export default class GameDetails extends Component {
  state = {
    currUrl: '',
    game: {}
  };

  componentDidMount = async () => {
    const { id } = this.props.match.params
    const game = await GameService.getById(id)
    console.log(game);

    this.setState({ game, currUrl: game.mediaUrls[0] });
  };

  openNotification = () => {
    notification.info({
      message: `Game has been added`,
      description: "The game has been added to the cart"
    });
  };


  onThumbNailPhotoClick = ev => {
    this.setState({ currUrl: ev.target.src });
  };

  render() {
    if (!this.state.currUrl) return <h1>Loading</h1>
    const { game, currUrl } = this.state
    let thumbnail;
    if (currUrl.includes("mp4")) {
      thumbnail = (
        <iframe
          title="video"
          src={`${currUrl}#t=0`}
          className="game-main-thumbnail"
        />
      );
    } else {
      thumbnail = <img src={currUrl} alt="" className="game-main-thumbnail" />;
    }

    return (
      <div className="container">
        <div className="flex justify-between">
          <h1>{game.title}</h1>
          <Button type="primary" className='game-buy-button' onClick={this.openNotification}>
            {game.price}$ Add to basket
          </Button>
        </div>
        <div className="flex ">
          <div className="flex column game-thumbnail-container">
            {thumbnail}
            <div className="flex game-choose-thumbnail-container">
              {game.mediaUrls.map(url => {
                if (url.includes("mp4")) {
                  return (
                    <video key={url} onClick={this.onThumbNailPhotoClick}
                      alt="" className="game-choose-thumbnail" src={`${url}#t=34`}
                    />
                  );
                }
                return (
                  <img
                    key={url} onClick={this.onThumbNailPhotoClick}
                    alt="" className="game-choose-thumbnail" src={url}>
                  </img>
                );
              })}
            </div>
          </div>
          <div className="game-description">
            <div className="img-container">
              <img className="game-thumbnail" src={game.thumbnail}></img>
            </div>
            <p> {game.description}</p>
            <p> published at: {game.publishedAt}</p>
            <p> publisher {game.publisher.name}</p>
          </div>
        </div>
        <h2>Tags:</h2>
        {game.tags.map(tag => {
          return <span key={tag}>{tag} </span>;
        })}
        <h2>Reviews :</h2>
        <Review reviews={game.reviews} />
        <h2>Comments :</h2>
        <Comments comments={game.comments} />
      </div>
    );
  }
}
