import React, { Component } from "react";
import { Comment,  } from "antd";
import { Link } from "react-router-dom";


export default class Comments extends Component {
  state = { text: "" };
  inputChange = ev => {
    let fieldName = ev.target.name;
    this.setState({ [fieldName]: ev.target.value });
  };

  onAddMessage= ()=>{
    if (!this.state.text)return
    this.props.sendComment(this.state.text)
  }

  render() {
    const { comments } = this.props;
    const { text } = this.state;
    return (
    
      <div>
        {comments.map(comment => {        
          return (
            <Comment
            key={comment.text+comment.user.userName}
              author={<Link to={`/user/${comment.user.userName}`}>userName:{comment.user.userName}</Link>}
              content={<p> {comment.text}</p>}
            />
          );
        })}
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
