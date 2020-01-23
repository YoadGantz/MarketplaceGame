import React from 'react';

export default function GameMedia(props){

    return  props.mediaUrls.map(url => {
        if (url.includes("mp4")) {
          return (
            <video  key={url}  onClick={props.onThumbNailPhotoClick}  alt="" className="game-choose-thumbnail" src={`${url}#t=23`} />   );
        }
        return (
          <img key={url} onClick={props.onThumbNailPhotoClick} alt=""  className="game-choose-thumbnail" src={url}  />
        );
      })
}
