import React, { PureComponent } from 'react';
import {
  AreaChart, Area, XAxis, YAxis , Tooltip,
} from 'recharts';

export default class Graph extends PureComponent {
  state = { data: [{ name: '0', purcheses: 0 }] }

  componentDidUpdate(prevprops) {
    if (prevprops.orderDates !== this.props.orderDates) {
      this.setData(this.props.orderDates)
    }
  }

  setData = (purcheses) => {
    const data = []
    if (!this.props.games.length)return
    for (let i = 30; i >=0; i--) {
  let date=new Date()
  date.setDate(date.getDate()-i)
      let price
      if (purcheses[date.getDate()]) {
        price = purcheses[date.getDate()]
      }else{
        price=0
      }
      data.push({ name: date.getDate()+'/'+(date.getMonth()+1), purcheses: price })
    }
    this.setState({ data })
  }

  render() {
    const { data } = this.state
    return (
      <AreaChart
        width={500}
        height={400}
        data={data}
        margin={{
          top: 10, right: 30, left: 0, bottom: 0,
        }}
      >
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="purcheses" stroke="#8884d8" fill="#8884d8" />
      </AreaChart>
    );
  }
}

