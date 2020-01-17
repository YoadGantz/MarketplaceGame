import React from "react";

export default function TagList(props) {
  return props.tags.map((tag, idx) => {
    return (
      <div className="tag-container" key={tag}>
        <span
          className="pointer"
          onClick={() => props.removeMediaAndTags("tags", idx)}
        >
          X
        </span>
        <p>{tag}</p>
      </div>
    );
  });
}
