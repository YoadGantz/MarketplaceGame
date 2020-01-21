import React, { Component } from 'react';

import DynamicTabMap from './DynamicTabMap.js'

export default class DynamicTabPrev extends Component {
    getComponent() {
        return DynamicTabMap[this.props.mode]
    }

    render() {
        const Cmp = this.getComponent();
        return <React.Fragment>
            <Cmp history={this.props.history}></Cmp>
        </React.Fragment>
    }
}