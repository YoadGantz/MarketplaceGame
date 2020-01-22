import React, { Component } from 'react'

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
        return <div>
            <input className="search-input" name='title' type="text" placeholder="Search" onChange={this.onFilterBy} />
            <input type='text' placeholder='Search by Tags' name='tag' onChange={this.onFilterBy} />
            <select onChange={this.onFilterBy} name='tag' >
                <option value=''>All</option>
                <option value='RPG'>RPG</option>
                <option value='FPS' >FPS</option>
                <option value='OPEN-World'>Open-World</option>
            </select>
            <span>Sort by</span>
            <button onClick={sortByDownloads}>By Downloads </button>
            <button onClick={sortByPrice}>By Price</button>
        </div>
    }
}