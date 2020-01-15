

  import React, { Component } from "react";

export default class Comments extends Component {
state={text:''}
    inputChange = ev => {
        let fieldName = ev.target.name;
        this.setState({ [fieldName]: ev.target.value });
      };
    


    render() {
  const   {comments}= this.props
  const {text}= this.state
  return <div>
    {comments.map(comment => {
        return (
          <div key={comment.user}>
            <h3> {comment.user}</h3>
            <p> {comment.text}</p>
          </div>
        );
      })}

<h3>New Comment</h3>
        <input type='text' name='text' value={text} onChange={this.inputChange} placeholder='write your text'/>
        <button>Add comment</button>
      </div>

  }
}
