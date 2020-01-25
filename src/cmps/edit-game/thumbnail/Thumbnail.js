import React from 'react';

export default function thumbnail(props) {
  const { thumbnail } = props
  return <div className="media-container">
    <img src={thumbnail} alt="" />
    <span className="pointer"
      onClick={() => props.removeMediaAndTags("thumbnail")}>X</span>
  </div>
}
