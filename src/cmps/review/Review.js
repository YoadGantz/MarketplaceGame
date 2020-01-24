import React, { Component } from 'react';

export default class Review extends Component {
  state = { rating: 'like', text: "" };

  inputChange = ev => {
    let fieldName = ev.target.name;
    this.setState({ [fieldName]: ev.target.value });
  };

  onAddReview = () => {
    if (!this.props.user) return
    const { rating, text } = this.state
    this.props.onAddCommentOrReview({ user: { userName: this.props.user.userName }, rating, text }, true, 'reviews')
  }


  render() {

    const { reviews } = this.props;
    const { rating, text } = this.state;
    return (
      <div className='review-container' >
        <ul className='social-content-container '>
          {" "}
          {reviews.map(review => {
            return (
              <div key={review.text}>
                <p>{review.user.userName}</p>
                <p>{review.text}</p>
                {review.rating === 'like' ? <img alt='like' src="https://img.icons8.com/ultraviolet/40/000000/good-quality.png" />
                  : <img alt='dislike' src="https://img.icons8.com/ultraviolet/40/000000/poor-quality.png" />}
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
        <input className='hidden' type='radio' value='like' onChange={this.inputChange} name='rating' id='like' checked />
        <label className='like-img' htmlFor='like' name='rating'>
          <img alt='like' src="https://img.icons8.com/ultraviolet/40/000000/good-quality.png" />
        </label>
        <input className='hidden' type='radio' onChange={this.inputChange} value='dislike' name='rating' id='dislike' />
        <label htmlFor='dislike' className='dislike-img' name='rating'>
          <img alt='dislike' src="https://img.icons8.com/ultraviolet/40/000000/poor-quality.png" />
        </label>
        <button onClick={this.onAddReview}>Add Review</button>
      </div>
    );
  }
}
