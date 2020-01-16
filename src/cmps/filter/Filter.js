import React, { Component } from "react"

export default class Filter extends Component {
    state = {
        filterBy: ''
    }
    onFilterBy = (ev) => {
        const value = ev.target.value;
        this.setState({filterBy: value}, () => this.props.onFilterBy(this.state.filterBy))
    }    
    render() {
        return <input className="search-input" type="text" placeholder="Search" onChange={this.onFilterBy}></input>
    }
}