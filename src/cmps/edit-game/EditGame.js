import React, { Component } from 'react';
import { connect } from 'react-redux'

import GameService from '../../services/GameService';
import MediaUploadService from '../../services/MediaUploadService';

import './_EditGame.scss';
import InputForm from './inputForm/InputForm';
class EditGame extends Component {
  state = {
    title: "",
    description: "",
    thumbnail: "",
    mediaUrls: [],
    price: "",
    publishedAt: '',
    tags: null,
    currTag: '',
    loading: false
  };

  componentDidMount = async () => {
    const params = this.props.match.params.id
    if (params) {
      const game = await GameService.getById(params)
      const publishedAt = this.getDateInput(game.publishedAt)
      this.setState({ ...game, publishedAt })
    }
  }

  getDateInput = (publishDate) => {
    const publishedAt = new Date(publishDate / 1)
    const day = ("0" + publishedAt.getDate()).slice(-2);
    const month = ("0" + (publishedAt.getMonth() + 1)).slice(-2);
    const date = publishedAt.getFullYear() + "-" + (month) + "-" + (day)
    return date
  }

  onSubmit = async () => {
    const newGame = { ...this.state }
    newGame.publishedAt = new Date(newGame.publishedAt).getTime()
    console.log(newGame)
    if (!newGame.mediaUrls) return
    if (!newGame.thumbnail) return
    if (this.props.match.params.id) {
      delete newGame.currTag
      delete newGame.loading
      const game = await GameService.update(newGame)
      return this.props.history.push(`/game/${game._id}`)
    }
    if (!this.props.loggedInUser) return
    newGame.publisher = this.props.loggedInUser._id
    newGame.comments = []
    newGame.reviews = []
    delete newGame.currTag
    delete newGame.loading
    const game = await GameService.add(newGame)
    return this.props.history.push(`/game/${game._id}`)
  }

  addMediaAndTags = async ev => {
    const fieldName = ev.target.name
    if (fieldName !== "tags") {
      this.setState({ loading: true })
      const urls = await MediaUploadService(ev.target.files);
      if (fieldName === 'thumbnail') {
        return this.setState({ thumbnail: urls[0], loading: false })
      }
      return this.setState(prevState => ({
        mediaUrls: [...prevState.mediaUrls, ...urls], loading: false
      }));
    }
    if (!this.state.currTag) return
    this.setState(prevState => ({
      tags: [...prevState.tags, this.state.currTag]
    }))
  }

  removeMediaAndTags = (fieldName, idx) => {
    if (fieldName === 'thumbnail') {
      return this.setState({ thumbnail: '' })
    }
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
    return <InputForm removeMediaAndTags={this.removeMediaAndTags} inputChange={this.inputChange}
      onSubmit={this.onSubmit} addMediaAndTags={this.addMediaAndTags} form={this.state} />
  }
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
