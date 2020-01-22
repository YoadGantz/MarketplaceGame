import React, { Component } from 'react'

export default class Filter extends Component {
    state = {
        title:'',
        tag:'' 
    }


  inputChange = ev => {
    let fieldName = ev.target.name;
    this.setState({ [fieldName]: ev.target.value });
  };

    onFilterBy = (ev) => {
        const value = ev.target.value;
        const name = ev.target.name;
        this.setState({[name]: value}, () => this.props.onFilterBy(this.state))
    }    
    render(){
        return<div>
             <input className="search-input" name='title'  type="text" placeholder="Search" onChange={this.onFilterBy}/>
            <input type='text' placeholder='Search by Tags' name='tag'   onChange={this.onFilterBy} />
            <span>Sort by</span>
            <button onClick={this.props.sortByDownloads}>Most Downloads</button>
            <button>Normal</button>
             </div>
    }
}