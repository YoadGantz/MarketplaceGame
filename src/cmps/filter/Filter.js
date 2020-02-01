import React, { Component } from 'react'


import './_Filter.scss'

export default class Filter extends Component {
    state = {
        title: '',
        tag: '',
        filterBy: 'title',
        sortBy: '',
        isAscending: false
    }

    inputChange = ev => {
        let fieldName = ev.target.name;
        if (fieldName === 'filterBy') {
            return this.setState({ title: '', tag: '', filterBy: ev.target.value }, () => this.onFilterBy())
        }
        if (fieldName === 'sortBy') {
            return this.setState({ sortBy: ev.target.value }, this.onFilterBy);
        }
        this.setState({ [this.state.filterBy]: ev.target.value }, this.onFilterBy);
    };

    onFilterBy = () => {
        this.props.onFilterBy(this.state)
    }

    changeOrder = () => {
        this.setState((prevState) => ({ ...prevState, isAscending: !prevState.isAscending }), this.onFilterBy)
    }

    render() {
        const { filterBy } = this.state
        return <div className="search-container totally-center">
            <div className="totally-center">
                <input className="search-input input" value={this.state[filterBy]}
                    type="search" placeholder={`Search by ${filterBy}`} onChange={this.inputChange} />
                <input className='hidden' name='filterBy' onChange={this.inputChange} defaultChecked id='title' value='title' type='radio' />
                <label className='btn title-btn pointer' htmlFor='title'>
                    Title
             </label>
                <input className='hidden' onChange={this.inputChange} name='filterBy' id='tag' value='tag' type='radio' />
                <label className='btn tag-btn pointer' htmlFor='tag'>
                    Tag
             </label>
            </div>
            <div className='flex'>
                <div className='flex column'>
                    <input className='hidden' id='sortBy' type='checkbox' />
                    <label htmlFor='sortBy' className="btn sort-by-title pointer">Sort by </label>
                    <div className="totally-center sort-by-inputs hidden  wrap">
                        <input className='hidden' onClick={this.inputChange} name='sortBy' id='price' value='price' type='radio' />
                        <label className='pointer' htmlFor='price'>
                            Price
             </label>
                        <input className='hidden' name='sortBy' onClick={this.inputChange} id='rating' value='rating' type='radio' />
                        <label className='pointer' htmlFor='rating'>
                            Rating
             </label>
                        <input className='hidden' name='sortBy' onClick={this.inputChange} id='popularity' value='popularity' type='radio' />
                        <label className='pointer' htmlFor='popularity'>
                            Popularity
             </label>
                        <input className='hidden' name='sortBy' onClick={this.inputChange} id='releaseDate' value='releaseDate' type='radio' />
                        <label className=' pointer' htmlFor='releaseDate'>
                            Release Date
             </label>
                    </div>
                </div>
                <button className='btn order-btn' onClick={this.changeOrder}><img alt="" src='https://image.flaticon.com/icons/svg/2413/2413274.svg' /></button>
            </div>
        </div>
    }
}