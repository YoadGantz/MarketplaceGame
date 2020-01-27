import React from 'react';

export default function thumbnail(props) {
  const { thumbnail } = props
  return (
    <div className="flex media-container">
      <img src={thumbnail} alt="" />
      <span className="pointer absolute" onClick={() => props.removeMediaAndTags("thumbnail")}>
        X
      </span>
    </div>)
}
