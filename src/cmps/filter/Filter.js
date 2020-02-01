import React, { Component } from 'react'

import './_Filter.scss'
import up_down_arrows from '../../assets/icons/up_down_arrows.svg'

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
        const { filterBy, sortBy } = this.state
        return (
            <div className="search-filter-container totally-center">
                <div className="search-container flex">
                    <input className="search-input input" value={this.state[filterBy]}
                        type="search" placeholder={`Search by ${filterBy}`} onChange={this.inputChange} />
                    <input className="hidden" name="filterBy" onChange={this.inputChange} defaultChecked id="title" value="title" type="radio" />
                    <label className="btn title-btn pointer" htmlFor="title"> Title</label>
                    <input className="hidden" onChange={this.inputChange} name="filterBy" id="tag" value="tag" type="radio" />
                    <label className="btn tag-btn pointer" htmlFor="tag"> Tag </label>
                </div>
                <div className="filter-container flex justify-center">
                    <label htmlFor="sortBy" className="btn sort-by pointer">{sortBy !== '' ? sortBy : "Sort by"}</label>
                    <input className="hidden" id="sortBy" type="checkbox" />
                    <div className="sort-by-inputs hidden wrap">
                        <label className="pointer" htmlFor="releaseDate">Release Date
                        <input className="hidden" name="sortBy" onClick={this.inputChange} id="releaseDate" value="ReleaseDate" type="radio" />
                        </label>
                        <label className="pointer" htmlFor="popularity">Popularity
                        <input className="hidden" name="sortBy" onClick={this.inputChange} id="popularity" value="Popularity" type="radio" />
                        </label>
                        <label className="pointer" htmlFor="rating">Rating
                        <input className="hidden" name="sortBy" onClick={this.inputChange} id="rating" value="Rating" type="radio" />
                        </label>
                        <label className="pointer" htmlFor='price'>Price
                        <input className="hidden" onClick={this.inputChange} name="sortBy" id="price" value="Price" type="radio" />
                        </label>
                    </div>
                    <button className="btn order-btn" onClick={this.changeOrder}><img alt="" src={up_down_arrows} /></button>
                </div>
            </div>

        )
    }
}