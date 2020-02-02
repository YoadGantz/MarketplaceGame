import React, { Component } from 'react'

import './_Filter.scss'
import up_down_arrows from '../../assets/icons/up_down_arrows.svg'

export default class Filter extends Component {
    state = {
        title: '',
        tag: '',
        filterBy: 'title',
        sortBy: '',
        isAscending: false,
        isShown:false
    }

    inputChange = ev => {
        let {name,value} = ev.target;
        if (name === 'filterBy') {
            return this.setState({ title: '', tag: '', filterBy: value }, () => this.onFilterBy())
        }
        if (name === 'sortBy') {
            return this.setState(prevState=>({ sortBy: value,isShown:!prevState.isShown }), this.onFilterBy);
        }
        this.setState({ [this.state.filterBy]: value }, this.onFilterBy);
    };

    onFilterBy = () => {
        this.props.onFilterBy(this.state)
    }

    changeOrder = () => {
        this.setState((prevState) => ({ ...prevState, isAscending: !prevState.isAscending }), this.onFilterBy)
    }

    render() {
        const { filterBy, sortBy,isShown } = this.state
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
                <div className='flex'>
                    <div className="filter-container flex column ">
                        <button htmlFor="sortBy" onClick={()=>this.setState(prevState=>({isShown:!prevState.isShown}))} className={isShown? "btn sort-by pointer sort-by-checked": "btn sort-by pointer"}>
                            {sortBy !== '' ? sortBy === "ReleaseDate" ? "Release Date" : sortBy : "Sort by"}
                            </button>
                       {isShown && <div className="sort-by-inputs">
                            <button className="pointer sort-by-button" name="sortBy" onClick={this.inputChange} value="ReleaseDate" >
                                Release Date
                            </button>
                            <button className="pointer sort-by-button" name="sortBy" onClick={this.inputChange} value="Popularity" >
                                Popularity
                        </button>
                            <button className="pointer sort-by-button" name="sortBy" onClick={this.inputChange} value="Rating"  >
                                Rating
                        </button>
                            <button className="pointer sort-by-button" onClick={this.inputChange} name="sortBy" value="Price">
                                Price
                        </button>
                        </div>
    }
                    </div>
                    <button className="btn order-btn" onClick={this.changeOrder}><img alt="" src={up_down_arrows} /></button>
                </div>
            </div>

        )
    }
}