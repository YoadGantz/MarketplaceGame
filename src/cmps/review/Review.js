import React, { Component } from 'react';

export default class Review extends Component {
  state = { rating: 1, text: "" };

  inputChange = ev => {
    let fieldName = ev.target.name;
    this.setState({ [fieldName]: ev.target.value });
  };

  onAddReview = () => {
    this.props.addReview(this.state.rating, this.state.text)
  }


  render() {
    const { reviews } = this.props;
    const { rating, text } = this.state;
    return (
      <div>
        <ul>
          {" "}
          {reviews.map(review => {
            return (
              <div key={review.text}>
                <p>{review.user.userName}</p>
                <p>{review.text}</p>
                <p> rating: {review.rating}</p>
              </div>
            );
          })}
        </ul>
        <h3>New review</h3>
        <textarea
          type="text"
          name="text"
          value={text}
          onChange={this.inputChange}
          placeholder="write your text"
        />
        <input
          type="number"
          min={0}
          max={10}
          name="rating"
          value={rating}
          onChange={this.inputChange}
        />
        <button onClick={this.onAddReview}>Add Review</button>
      </div>
    );
  }
}
