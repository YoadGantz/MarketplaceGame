import React, { Component } from "react";

import "antd/dist/antd.css";
import { Button, notification } from "antd";

import Review from "../../cmps/review/Review";
import Comments from "../../cmps/comments/Comments";
import GameService from "../../services/GameService";

export default class GameDetails extends Component {
  state = {
    currUrl: ""
  };
  openNotification = () => {
    notification.info({
      message: `Game has been added`,
      description: "The game has been added to the cart"
    });
  };

  componentDidMount = async () => {
    const game = await GameService.getById(this.props.match.params.id);
    this.setState({ ...game, currUrl: game.mediaUrls[0] });
  };

  onThumbNailPhotoClick = ev => {
    this.setState({ currUrl: ev.target.src });
  };

  render() {
    if (!this.state.currUrl) return <h1>Loading</h1>;
    const {
      thumbnail,
      title,
      description,
      publishedAt,
      publisher,
      comments,
      reviews,
      mediaUrls,
      price,
      tags,
      currUrl
    } = this.state;
    let bigThumbnail;
    if (currUrl.includes("mp4")) {
      bigThumbnail = (
        <iframe
          title="video"
          src={`${currUrl}#t=0`}
          className="game-main-thumbnail"
        />
      );
    } else {
      bigThumbnail = (
        <img src={currUrl} alt="" className="game-main-thumbnail" />
      );
    }

    return (
      <div className="game-main-container">
        <div className="flex justify-between">
          <h1>{title}</h1>
          <Button
            type="primary"
            className="game-buy-button"
            onClick={this.openNotification}
          >
            {price}$ Add to basket
          </Button>
        </div>
        <div className="flex">
          <div className="flex column game-thumbnail-container">
            {bigThumbnail}
            <div className="flex game-choose-thumbnail-container">
              {mediaUrls.map(url => {
                if (url.includes("mp4")) {
                  return (
                    <video
                      key={url}
                      onClick={this.onThumbNailPhotoClick}
                      alt=""
                      className="game-choose-thumbnail"
                      src={`${url}#t=34`}
                    />
                  );
                }
                return (
                  <img
                    key={url}
                    onClick={this.onThumbNailPhotoClick}
                    alt=""
                    className="game-choose-thumbnail"
                    src={url}
                  ></img>
                );
              })}
            </div>
          </div>
          <div className="game-description">
            <div className="game-right-thumbnail">
              <img alt="" className="" src={thumbnail} />
            </div>
            <p> {description}</p>
            <p> published at: {publishedAt}</p>
            <p> publisher {publisher.name}</p>
          </div>
        </div>
        <h2>Tags:</h2>
        {tags.map(tag => {
          return <span key={tag}>{tag} </span>;
        })}
        <h2>Reviews :</h2>
        <Review reviews={reviews} />
        <h2>Comments :</h2>
        <Comments comments={comments} />
      </div>
    );
  }
}
