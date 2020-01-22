import React, { Component } from 'react';

export default class Comments extends Component {
  state = { text: "" };
  inputChange = ev => {
    let fieldName = ev.target.name;
    this.setState({ [fieldName]: ev.target.value });
  };

  onAddMessage = () => {
    const { text } = this.state
    if (!text) return
    let user = {userName:'Guest'}
    if (this.props.user) user = this.props.user
    this.props.onAddCommentOrReview({ text, user }, true)
    this.setState({ text: '' })
  }

  render() {
    const { comments } = this.props;
    const { text } = this.state;
    if (!comments) return ''
    const commentMap = comments.map(comment => {
      if (!comment.user) {
        return <p key={comment.text}>{comment.text}</p>
      }
      return (
        <p key={comment.text + comment.user.userName}>{comment.user.userName} : {comment.text}</p>
      );
    })
    return (
      <div>
        {commentMap}
        <h3>New Comment</h3>
        <textarea
          type="text"
          name="text"
          value={text}
          onChange={this.inputChange}
          placeholder="write your text"
        />
        <button onClick={this.onAddMessage} type='primary'>Add comment</button>
      </div>
    );
  }
}
