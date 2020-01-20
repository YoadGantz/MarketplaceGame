import React, { Component } from "react";
import { Button, notification } from "antd";

import "./GameDetails.scss";
import Review from "../../cmps/review/Review";
import Comments from "../../cmps/comments/Comments";
import GameService from "../../services/GameService";
import GameMedia from "../../cmps/game-media/GameMedia";
import SocketService from "../../services/SocketService";

export default class GameDetails extends Component {
  state = {
    currUrl: '',
    game: {},
    comments:[]
  };

  componentDidMount = async () => {
    const { id } = this.props.match.params
    const game = await GameService.getById(id)
    this.setState({ game, currUrl: game.mediaUrls[0],comments:game.comments});
    SocketService.setup()
    SocketService.emit('chat topic', game.title);
    SocketService.on('chat addMsg',this.addMsg)
  };

  componentWillUnmount= ()=>{
    SocketService.off()
    SocketService.terminate()
  }

  
  addMsg = newMsg => {
    console.log(newMsg)
    this.setState(prevState => ({ comments: [...prevState.comments, newMsg] }));
  };

  sendMsg = text => {
    SocketService.emit('chat newMsg', {text,user:'me'});
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
    if (!this.state.currUrl) return <h1>Loading</h1>;
    const {comments, currUrl,game:{thumbnail, title, description, publishedAt , 
   publisher , reviews , mediaUrls, price, tags }} = this.state;
    let mainMedia;
    if (currUrl.includes("mp4")) { mainMedia = ( <iframe title="video" src={`${currUrl}#t=0`} className="game-main-thumbnail" />
      );
    } else {
      mainMedia = (  <img src={currUrl} alt="" className="game-main-thumbnail" />
      );
    }
    console.log(comments)
    return (
      <div className="container">
        <div className="flex justify-between">
          <h1>{title}</h1>
          <Button type="primary" className='game-buy-button' onClick={this.openNotification}>
            {price}$ Add to basket
          </Button>
        </div>
        <div className="flex game-main-content-container ">
          <div className="flex column game-thumbnail-container">
            {mainMedia}
            <div className="flex game-choose-thumbnail-container">
            <GameMedia onThumbNailPhotoClick={this.onThumbNailPhotoClick} mediaUrls={mediaUrls} />
            </div>
          </div>
          <div className="game-description">
            <div className="img-container">
              <img className="game-thumbnail" alt='' src={thumbnail}></img>
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
        <Comments sendMsg={this.sendMsg} comments={comments} />
      </div>
    );
  }
}
