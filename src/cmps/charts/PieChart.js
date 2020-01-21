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
    const colors=['#16578F','#5F89D3','#A45FC1','#E5EDF4','#4C96D7','blue','lightblue']
    const data=[]
    const ordersSum = this.props.games.reduce((sum, game) => {
    if   (!this.props.orderedGames[game.title]) return sum
      return sum += this.props.orderedGames[game.title]
    }, 0)
    console.log(ordersSum)
     this.props.games.forEach((game,i) => {
    if (!this.props.orderedGames[game.title])return
      data.push({fill:colors[i] ,name: game.title, value: Math.floor(((this.props.orderedGames[game.title]) / ordersSum) * 100)})
    })
    console.log(this.props.orderedGames)
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
