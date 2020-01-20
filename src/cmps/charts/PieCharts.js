import React, { PureComponent } from 'react';
import {
  PieChart, Pie, Tooltip,
} from 'recharts';



export default class PieCharts extends PureComponent {
  state = { data: [] }

  componentDidUpdate(prevprops) {
    if (prevprops.orderedGames !== this.props.orderedGames) {
      this.setData(this.props.orderedGames)
    }
  }

  setData = () => {
    const colors=['#16578F','#5F89D3','#A45FC1','#E5EDF4','#4C96D7']
    const ordersSum = this.props.games.reduce((sum, game) => {
      return sum += this.props.orderedGames[game.title]
    }, 0)
    const data = this.props.games.map((game,i) => {
      return {fill:colors[i] ,name: game.title, value: Math.floor(((this.props.orderedGames[game.title]) / ordersSum) * 100)}
    })
    this.setState({ data })
  }



  render() {
    const { data } = this.state
    return (
      <PieChart width={400} height={400}>
        <Pie dataKey="value" isAnimationActive={false} data={data} cx={200} cy={200} outerRadius={80} fill="#8884d8" label />
        <Tooltip />
      </PieChart>
    );
  }
}