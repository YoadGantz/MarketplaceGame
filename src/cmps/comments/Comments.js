import React, { Component } from "react";
import { Comment, Avatar, Input, Button } from "antd";
import { Link } from "react-router-dom";

const { TextArea } = Input;

export default class Comments extends Component {
  state = { text: "" };
  inputChange = ev => {
    let fieldName = ev.target.name;
    this.setState({ [fieldName]: ev.target.value });
  };

  onAddMessage= ()=>{
    this.props.sendMsg(this.state.text)
  }

  render() {
    const { comments } = this.props;
    const { text } = this.state;
    return (
      <div>
        {comments.map(comment => {
          return (
            <Comment
            key={comment.text+comment.user._id}
              author={<Link to={`/user/${comment.user._id}`}>{comment.user}</Link>}
              avatar={
                <Avatar
                  src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                  alt="Han Solo"
                />
              }
              content={<p>{comment.text}</p>}
            />
          );
        })}
        <h3>New Comment</h3>
        <TextArea
          type="text"
          name="text"
          value={text}
          onChange={this.inputChange}
          placeholder="write your text"
        />
        <Button onClick={this.onAddMessage} type='primary'>Add comment</Button>
      </div>
    );
  }
}
