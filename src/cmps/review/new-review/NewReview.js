import React, { Component } from "react";


export default class NewReview extends Component {
    state = { rating: '', text: "" };

    inputChange = ev => {
        let fieldName = ev.target.name;
        this.setState({ [fieldName]: ev.target.value });
    };

    onAddReview = () => {
        const { rating, text } = this.state
        if (!rating) return
        this.props.onAddCommentOrReview({ user: { userName: this.props.user.userName }, rating, text }, true, 'reviews')
        this.setState({ text: '' })
    }


    render() {
        const { text } = this.state
        return (
            <div>
                <h3>Add a review</h3>
                <div className='flex align-center'>
                <textarea
                    type="text"
                    name="text"
                    value={text}
                    onChange={this.inputChange}
                    placeholder="write your text"
                />
                <input className='hidden' type='radio' value='like' onChange={this.inputChange} name='rating' id='like' />
                <label className='like-img pointer' htmlFor='like' name='rating'>
                    <img alt='like' src="https://img.icons8.com/ultraviolet/40/000000/good-quality.png" />
                </label>
                <input className='hidden' type='radio' onChange={this.inputChange} value='dislike' name='rating' id='dislike' />
                <label htmlFor='dislike' className='dislike-img pointer' name='rating'>
                    <img alt='dislike' src="https://img.icons8.com/ultraviolet/40/000000/poor-quality.png" />
                </label>
                <button  className='add-button' onClick={this.onAddReview}>Add Review</button>
                </div>
            </div>
        )
    }
}