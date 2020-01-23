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
            <select onChange={this.onFilterBy} name='tag' >
                <option value=''>All</option>
                <option value='rpg'>RPG</option>
                <option value='action'>Action</option>
                <option value='simulator'>Simulator</option>
                <option value='third-person'>Third Person</option>
                <option value='open-world'>Open-World</option>
            </select>
            <span>Sort by</span>
            <button onClick={sortByDownloads}>By Downloads </button>
            <button onClick={sortByPrice}>By Price</button>
        </div>
    }
}