import React, { Component } from 'react';

export default class Comment extends Component {
  state = { text: "" };
  inputChange = ev => {
    let fieldName = ev.target.name;
    this.setState({ [fieldName]: ev.target.value });
  };

  onAddComment = () => {
    const { text } = this.state
    if (!text) return
    let user = { userName: 'Guest' }
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
        <div className='social-content-container'>
          {commentMap}
        </div>
        <div>
          <h3>Add a Comment</h3>
          <div className='flex new-comment-container align-center'>
            <textarea
              type="text"
              name="text"
              value={text}
              onChange={this.inputChange}
              placeholder="write your text"
            />
            <button className='add-button' onClick={this.onAddComment} type='primary'>Add Comment</button>
          </div>
        </div>
      </div>
    );
  }
}
