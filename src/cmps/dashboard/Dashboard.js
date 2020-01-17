
import React, { Component } from "react"

import LineChart from "../charts/LineChart"

export default class Dashboard extends Component {

    render() {
        return (<div>
            <h1>Dashboard</h1>
            <LineChart></LineChart>
            <div>game list</div>
        </div>
        )
    }
}