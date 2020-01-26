import React, { Component } from 'react'

import './_Filter.scss'

export default class Filter extends Component {
    state = {
        title: '',
        tag: ''
    }

    inputChange = ev => {
        let fieldName = ev.target.name;
        this.setState({ [fieldName]: ev.target.value });
    };

    onFilterBy = (ev) => {
        const value = ev.target.value;
        const name = ev.target.name;
        this.setState({ [name]: value }, () => this.props.onFilterBy(this.state))
    }


    render() {
        const { sortByPrice, sortByDownloads } = this.props
        return <div className="search-container">
            <input className="search-input input" name='title' type="search" placeholder="Search" onChange={this.onFilterBy} />
            <input className="search-input input" name='tag' type='text' placeholder='Search by Tags' onChange={this.onFilterBy} />
            <span>Sort by </span>
            <button className='btn' onClick={sortByDownloads}> Popular </button>
            <button className='btn' onClick={sortByPrice}>  Price</button>
        </div>
    }
}