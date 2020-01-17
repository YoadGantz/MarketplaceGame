
import React from "react"

export default function (props) {
    return (
        <div>hi
            <h1>Dashboard</h1>
            <img alt="graph" width="50" src="https://www.statista.com/graphic/1/277229/facebooks-annual-revenue-and-net-income.jpg" />
            <div publisher="publisher" games={props.games}>game list</div>
        </div>
    )
}