import React, { Component } from 'react'

import './_Filter.scss'

export default class Filter extends Component {
    state = {
        title: '',
        tag: '',
        filterBy: 'title'
    }

    inputChange = ev => {
        let fieldName = ev.target.name;
        if (fieldName === 'filterBy') {
            return this.setState({ title: '', tag: '', filterBy: ev.target.value }, () => this.onFilterBy())
        }
        this.setState({ [this.state.filterBy]: ev.target.value }, () => this.onFilterBy());
    };

    onFilterBy = () => {
        this.props.onFilterBy(this.state)
    }

    render() {
        const { sortByPrice, sortByDownloads } = this.props
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
            <button className='btn filter-btn' onClick={sortByDownloads}>Popularity</button>
            <button className='btn filter-btn' onClick={sortByPrice}>Price</button>
        </div>
    }
}