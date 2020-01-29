import React, { Component } from 'react';
import NewReview from './new-review/NewReview';
import IsUserLoggedIn from '../is-user-logged-in/IsUserLoggedIn';

export default class Review extends Component {
  render() {

    const { reviews, user } = this.props;
    return (
      <div className='reviews-container' >
        <ul className='social-content-container'>
          {reviews.map(review => {
            return (
              <div className='review-container flex' key={review.text}>
                <div className='flex column review-user-details'>
                  <p>{review.user.userName}</p>
                  {review.rating === 'like' ? <img alt='like' src="https://img.icons8.com/ultraviolet/40/000000/good-quality.png" />
                    : <img alt='dislike' src="https://img.icons8.com/ultraviolet/40/000000/poor-quality.png" />}
                </div>
                <div>
                  <p>{review.text}</p>
                </div>
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
