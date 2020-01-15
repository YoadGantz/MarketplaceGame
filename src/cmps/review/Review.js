import React, { Component } from "react";

export default class Review extends Component {
  state = { rating: 1, text: "" };


  inputChange = ev => {
    let fieldName = ev.target.name;
    this.setState({ [fieldName]: ev.target.value });
  };

//   onAddReview = ()=>{
//       addReview(this.state.rating,this.state.text)
//   }


  render() {
    const { reviews } = this.props;
    const {rating , text}= this.state
    return (
      <div>
        <ul>
          {" "}
          {reviews.map(review => {
            return (
              <div key={review.text}>
                <p> User Name: {review.user.userName}</p>
                <p> rating: {review.rating}</p>
                <p> text: {review.text}</p>
              </div>
            );
          })}
        </ul>
        <h3>New review</h3>
        <input type='text' name='text' value={text} onChange={this.inputChange} placeholder='write your text'/>
        <input type='number' name='rating' value={rating} onChange={this.inputChange} placeholder='score the game' max={10} min={0} />
        <button>Add Review</button>
      </div>
    );
  }
}
