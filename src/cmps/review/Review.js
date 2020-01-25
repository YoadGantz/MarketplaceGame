import React, { Component } from 'react';
import NewReview from './new-review/NewReview';
import IsUserLoggedIn from '../is-user-logged-in/IsUserLoggedIn';

export default class Review extends Component {
  render() {

    const { reviews, user } = this.props;
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
        <IsUserLoggedIn>
          <NewReview user={user} onAddCommentOrReview={this.props.onAddCommentOrReview} onAddReview={this.onAddReview} inputChange={this.inputChange} />
          </IsUserLoggedIn>
      </div>
    );
  }
}
