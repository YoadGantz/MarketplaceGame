import React, { PureComponent } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, Tooltip,
} from 'recharts';

export default class Graph extends PureComponent {
  state = { data: [{ name: '0', purcheses: 0 }] }

  componentDidUpdate(prevprops) {
    if (prevprops.orderDates !== this.props.orderDates) {
      this.setData(this.props.orderDates)
    }
  }

  setData = (purchases) => {
    const data = []
    if (!this.props.games.length) return
    for (let i = 30; i >= 0; i--) {
      let date = new Date()
      date.setDate(date.getDate() - i)
      let price
      if (purchases[date.getDate()]) {
        price = purchases[date.getDate()]
      } else {
        price = 0
      }
      data.push({ name: date.getDate() + '/' + (date.getMonth() + 1), purchases: price })
    }
    this.setState({ data })
  }

  render() {
    const { data } = this.state
    return (
      <div className="flex column chart align-center">
        <strong className="chart-title">Downloads distribution per day</strong>
        <AreaChart
          width={350}
          height={300}
          data={data}
          margin={{
            top: 10, right: 30, left: 0, bottom: 0,
          }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="purchases" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
      </div>
    );
  }
}

