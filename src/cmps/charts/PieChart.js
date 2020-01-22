import React, { PureComponent } from 'react';
import {
  PieChart, Pie, Tooltip,
} from 'recharts';



export default class PieCharts extends PureComponent {
  state = { data: [] }

  componentDidUpdate(prevprops) {
    if (prevprops.sumOfGames !== this.props.sumOfGames) {
      this.setData(this.props.sumOfGames)
    }
  }

  setData = (sum) => {
    const colors=['#16578F','#5F89D3','#A45FC1','#E5EDF4','#4C96D7','blue','lightblue']
    const data=[]
     this.props.games.forEach((game,i) => {
    if (!sum[i])return
      data.push({fill:colors[i] ,name: game.title, value: sum[i]})
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
