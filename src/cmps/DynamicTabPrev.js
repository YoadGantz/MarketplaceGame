import DynamicTabMap from "./DynamicTabMap.js"
import React, { Component } from 'react';

export default class DynamicTabPrev extends Component {
    getComponent() {
        console.log(this.props.mode)
        return DynamicTabMap[this.props.mode]
    }

    render() {
        const Cmp = this.getComponent();
        console.log('cmp=',Cmp)
        return <React.Fragment>
            <Cmp></Cmp>
        </React.Fragment>
    }
}