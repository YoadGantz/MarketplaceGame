import React, { Component } from 'react'

export default class Filter extends Component {
    state = {
        title:'',
        tag:'' ,
        rating:''
    }
    onFilterBy = (ev) => {
        const value = ev.target.value;
        this.setState({title: value}, () => this.props.onFilterBy(this.state))
    }    
    render() {
        return <input className="search-input" type="text" placeholder="Search" onChange={this.onFilterBy}></input>
    }
}