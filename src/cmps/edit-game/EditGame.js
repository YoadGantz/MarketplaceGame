import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Button } from 'antd';

import GameService from '../../services/GameService';
import uploadImg from '../../services/mediaUploadService';
import MediaUrlsList from './media-url-list/MediaUrlList';
import TagList from '../tag-list/TagList';

import './_EditGame.scss';
class EditGame extends Component {
  state = {
    title: "",
    description: "",
    thumbnail: "",
    mediaUrls: null,
    price: "",
    publishedAt: '',
    tags: null,
    currTag: ''
  };

  componentDidMount = async () => {
    const params = this.props.match.params.id
    if (params) {
      const game = await GameService.getById(params)
      this.setState({ ...game })
    }
  }

  onSubmit = async () => {
    const newGame = { ...this.state }
    if (!newGame.mediaUrls) return
    if (!newGame.thumbnail) return
    if (this.props.match.params.id) {
      delete newGame.currTag
      const game = await GameService.update(newGame)
      return this.props.history.push(`/game/${game._id}`)
    }
    if (!this.props.loggedInUser) return
    newGame.publisher = this.props.loggedInUser._id
    newGame.comments = []
    newGame.reviews = []
    delete newGame.currTag
    const game = await GameService.add(newGame)
    return this.props.history.push(`/game/${game._id}`)

  }

  addMediaAndTags = async ev => {
    const fieldName = ev.target.name
    if (fieldName !== "tags") {
      const urls = await uploadImg(ev.target.files);
      if (fieldName === 'thumbnail') {
        return this.setState({ thumbnail: urls[0] })
      }
      return this.setState(prevState => ({
        mediaUrls: [...prevState.mediaUrls, ...urls]
      }));
    }
    if (!this.state.currTag) return
    this.setState(prevState => ({
      tags: [...prevState.tags, this.state.currTag]
    }))
  }

  removeMediaAndTags = (fieldName, idx) => {
    if (fieldName === 'thumbnail') {
      return this.setState({ thumbnail: '' })}
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
    const { mediaUrls, tags, thumbnail, description, title, publishedAt, price } = this.state;
    let addedTags;
    let addedUrls;
    let addedThumbnail
    if (mediaUrls && mediaUrls.length)
      addedUrls = (
        <MediaUrlsList removeMediaAndTags={this.removeMediaAndTags} mediaUrls={mediaUrls} />
      );
    if (tags && tags.length) {
      addedTags = (
        <TagList removeMediaAndTags={this.removeMediaAndTags} tags={tags} />
      )
    }
    if (thumbnail) {
      addedThumbnail = <div className='media-container'>
        <img src={thumbnail} alt='' />
        <span
          className="pointer"
          onClick={() => this.removeMediaAndTags("thumbnail")}
        >
          X
        </span>
      </div>
    }

    return (
      <div className='edit-container'>
        <p> Title : </p>
        <input type="text" onChange={this.inputChange} value={title} placeholder="title" name="title" />
        <p>Publish Date</p>
        <input type="date" onChange={this.inputChange} value={publishedAt} name="publishedAt" />
        <p> Descripiton: </p>
        <textarea type="text" onChange={this.inputChange} placeholder="description" name="description" value={description} />
        <p> Thumbnail Img: </p>
        <input type="file" onChange={this.addMediaAndTags} placeholder="thumbnail" name="thumbnail" />
        {addedThumbnail}
        <p> Img Url: </p>
        <div>
          <input type="file" onChange={this.addMediaAndTags} placeholder="Put your image Urls here" name="mediaUrls" multiple />
          <div className="flex wrap">{addedUrls}</div>
        </div>
        <p>Price: </p>
        <input type="number" onChange={this.inputChange} placeholder="price" name="price" value={price} />
        <p>Tags:</p>
        <input type="tags" onChange={this.inputChange} placeholder="tags" name="currTag" />
        <button name="tags" onClick={this.addMediaAndTags}>
          Add Tag
          </button>
        <div className="flex">{addedTags}</div>
        <Button onClick={this.onSubmit}>Submit</Button>
      </div>
    );}
}

const mapStateToProps = state => {
  return {
    loggedInUser: state.userStore.loggedInUser,
  };
};

const mapDispatchToProps = {
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditGame);
