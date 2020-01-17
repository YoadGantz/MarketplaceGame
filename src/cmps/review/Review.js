import React, { Component } from "react";
import { Rate, Input, Button } from "antd";

const { TextArea } = Input;

export default class Review extends Component {
  state = { rating: 1, text: "" };

  inputChange = ev => {
    if (!isNaN(ev)) {
      return this.setState({ rating: ev })
    }
    let fieldName = ev.target.name;
    this.setState({ [fieldName]: ev.target.value });
  };

  //   onAddReview = ()=>{
  //       addReview(this.state.rating,this.state.text)
  //   }


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
                <p> text: {review.text}</p>
                <Rate allowHalf disabled defaultValue={review.rating} />
              </div>
            );
          })}
        </ul>
        <h3>New review</h3>
        <TextArea
          type="text"
          name="text"
          value={text}
          onChange={this.inputChange}
          placeholder="write your text"
        />
        <Rate
          type="number"
          name="rating"
          value={rating}
          onChange={this.inputChange}
          allowHalf defaultValue={2.5}
        />
        <Button type='primary'>Add Review</Button>
      </div>
    );
  }
}
