import React from 'react';

export default function MediaUrlsList(props) {
  return props.mediaUrls.map((url, idx) => {
    if (url.includes(".mp4")) {
      return (
        <div className="media-container flex" key={url}>
          <iframe src={url} title='video' alt={url} />
          <span
            className="pointer"
            onClick={() => props.removeMediaAndTags("mediaUrls", idx)}
          >
            X
          </span>
        </div>
      );
    }
    return (
      <div className="media-container  flex" key={url}>
        <img src={url} alt={url} />
        <span
          className="pointer"
          onClick={() => props.removeMediaAndTags("mediaUrls", idx)}
        >
          X
        </span>
      </div>
    );
  });
}
