import React, { Component } from 'react'

import arrow_up from '../../assets/icons/arrow_up.svg'
import arrow_down from '../../assets/icons/arrow_down.svg'

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
            console.log('got here');

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
            <input className="search-input input" value={this.state[this.state.filterBy]}
                type="search" placeholder={`Search by ${filterBy}`} onChange={this.inputChange} />
            <input className='hidden' name='filterBy' onChange={this.inputChange} defaultChecked id='title' value='title' type='radio' />
            <label className='btn title-btn pointer' htmlFor='title'>
                Title
             </label>
            <input className='hidden' onChange={this.inputChange} name='filterBy' id='tag' value='tag' type='radio' />
            <label className='btn tag-btn pointer' htmlFor='tag'>
                Tag
             </label>
            <span>Sort by: </span>
            <input className='hidden' name='sortBy' onClick={this.inputChange} id='popularity' value='popularity' type='radio' />
            <label className='btn popularity-btn pointer' htmlFor='popularity'>
                Popularity
             </label>
            <input className='hidden' onClick={this.inputChange} name='sortBy' id='price' value='price' type='radio' />
            <label className='btn price-btn pointer' htmlFor='price'>
                Price
             </label>
            <button className='btn order-btn' onClick={this.changeOrder}><img alt="" src={this.state.isAscending ? arrow_up : arrow_down} /></button>
        </div>
    }
}