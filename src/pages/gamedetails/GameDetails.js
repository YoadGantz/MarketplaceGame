import React, { Component } from "react";

import "antd/dist/antd.css";
import { Button, notification } from "antd";

import "./GameDetails.scss";
import Review from "../../cmps/review/Review";
import Comments from "../../cmps/comments/Comments";

export default class GameDetails extends Component {
  state = {
    _id: "u102",
    title: "Grand Theft Auto V",
    description:
      "Grand Theft Auto V for PC offers players the option to explore the award-winning world of Los Santos and Blaine County in resolutions of up to 4k and beyond, as well as the chance to experience the game running at 60 frames per second.      ",
    publishedAt: "2013-09-17",
    publisher: { name: "Rockstar", _id: "u101" },
    comments: [
      {
        user: "Boby",
        text:
          "the true meaning of open world. the game is so good that i've been playing it for years. great single player story-line, and great multiplayer. i just wish it wasn't banned in iran."
      }
    ],
    reviews: [
      { user: { _id: "u110", userName: "boby" }, text: "text", rating: 4.5 }
    ],
    mediaUrls: [
      "https://res.cloudinary.com/dfdvfunfj/video/upload/v1579108574/eu7d0h6m8uelu0wpictc.mp4",
      "https://media.rawg.io/media/games/b11/b115b2bc6a5957a917bc7601f4abdda2.jpg",
      "https://media.rawg.io/media/screenshots/1b4/1b4eefb4cc2a77d4d35bb4a6926f3189.jpg",
      "https://media.rawg.io/media/screenshots/a7c/a7c43871a54bed6573a6a429451564ef.jpg",
      "https://media.rawg.io/media/screenshots/cf4/cf4367daf6a1e33684bf19adb02d16d6.jpg"
    ],
    price: 25,
    tags: ["open-world", "fps", "third person"],
    currUrl: ""
  };
  openNotification = () => {
    notification.info({
      message: `Game has been added`,
      description: "The game has been added to the cart"
    });
  };

  componentDidMount = () => {
    this.setState({ currUrl: this.state.mediaUrls[0] });
  };

  onThumbNailPhotoClick = ev => {
    this.setState({ currUrl: ev.target.src });
  };

  render() {
    const { title, description, publishedAt, publisher, comments, reviews, mediaUrls,
      price, tags, currUrl } = this.state;
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
      <div>
        <div className="flex justify-between">
          <h1>{title}</h1>
          <Button type="primary" className='game-buy-button' onClick={this.openNotification}>
            {price}$ Add to basket
          </Button>
        </div>
        <div className="flex ">
          <div className="flex column game-thumbnail-container">
            {thumbnail}
            <div className="flex game-choose-thumbnail-container">
              {mediaUrls.map(url => {
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
