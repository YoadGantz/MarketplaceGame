import React from "react"
import ApexCharts from 'apexcharts'
var options = {
    chart: {
      type: 'line'
    },
    series: [{
      name: 'sales',
      data: [30,40,35,50,49,60,70,91,125]
    }],
    xaxis: {
      categories: [1991,1992,1993,1994,1995,1996,1997, 1998,1999]
    }
  }
  
  var chart = new ApexCharts(document.querySelector("#chart"), options);
  
  chart.render();
export default function (props) {
    return (
        <div>
            <h1>Dashboard</h1>
            <img alt="graph" width="50" src="https://www.statista.com/graphic/1/277229/facebooks-annual-revenue-and-net-income.jpg" />
            <div publisher="publisher" games={props.games}>game list</div>
        </div>
    )
}