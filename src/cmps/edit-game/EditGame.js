import React, { Component } from "react";
import "./_EditGame.scss";
import uploadImg from "../../services/mediaUploadService";
import { Button } from "antd";
import TagList from "../tag-list/TagList";
import MediaUrlsList from "../comments/media-url-list/MediaUrlList";
import TextArea from "antd/lib/input/TextArea";

export default class EditGame extends Component {
  state = {
    title: "",
    descripiton: "",
    thumbnail: "",
    mediaUrls: [],
    price: "",
    tags: [],
    currUrl: "",
    currTag: ""
  };

  addMediaAndTags = async ev => {
    const fieldName = ev.target.name
    if (fieldName !== "tags") {
      const res = await uploadImg(ev);
      const url = await res.url
      if (fieldName === 'thumbnail') {
        return this.setState({ thumbnail: url })
      }
      return this.setState(prevState => ({
        mediaUrls: [...prevState.mediaUrls, url]
      }));
    }
    if (!this.state.currTag) return
    this.setState(prevState => ({
      tags: [...prevState.tags, this.state.currTag]
    }));
  };

  removeMediaAndTags = (fieldName, idx) => {
    let editedData = [...this.state[fieldName]];
    editedData.splice(idx, 1);
    this.setState({
      [fieldName]: editedData
    });
  };

  inputChange = ev => {
    let fieldName = ev.target.name;
    this.setState({ [fieldName]: ev.target.value });
  };

  render() {

    const { mediaUrls, tags, thumbnail } = this.state;
    let addedTags;
    let addedUrls;
    let addedThumbnail
    if (mediaUrls.length)
      addedUrls = (
        <MediaUrlsList removeMediaAndTags={this.removeMediaAndTags} mediaUrls={mediaUrls} />
      );
    if (tags.length) {
      addedTags = (
        <TagList removeMediaAndTags={this.removeMediaAndTags} tags={tags} />
      )
    }
    if (thumbnail) {
      addedThumbnail = <div className='media-container'>
        <img src={thumbnail} alt='' />
      </div>
    }
    return (
      <div className='edit-container'>
          <p> Title : </p>
          <input  type="text" onChange={this.inputChange} placeholder="title"  name="title" />
        <p> Descripiton: </p>
        <TextArea
          type="text"
          onChange={this.inputChange}
          placeholder="descripiton"
          name="descripiton"
        />
        <p> Thumbnail Img: </p>
        <input
          type="file"
          onChange={this.addMediaAndTags}
          placeholder="thumbnail"
          name="thumbnail"
        />
        {addedThumbnail}
        <p> Img Url: </p>
        <div>
          <input
            type="file"
            onChange={this.addMediaAndTags}
            placeholder="Put your image Urls here"
            name="mediaUrls"
          />
          <div className="flex wrap">{addedUrls}</div>
        </div>
        <p>Price: </p>
        <input
          type="number"
          onChange={this.inputChange}
          placeholder="price"
          name="price"
        />
        <p>Tags:</p>
        <input
          type="tags"
          onChange={this.inputChange}
          placeholder="tags"
          name="currTag"
        />
        <button name="tags" onClick={this.addMediaAndTags}>
          Add Tag
          </button>
        <div className="flex">{addedTags}</div>
        <Button>Submit</Button>
      </div>
    );
  }
}
