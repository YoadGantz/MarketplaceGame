import React, { PureComponent } from 'react';
import {
  PieChart, Pie, Tooltip,
} from 'recharts';



export default class PieCharts extends PureComponent {
  state = { data: [],colors:['#16578F','#5F89D3','#A45FC1','#E5EDF4','#4C96D7','blue','lightblue'],gameTitles:null }

  componentDidUpdate(prevprops) {
    if (prevprops.sumOfGames !== this.props.sumOfGames) {
      this.setData(this.props.sumOfGames)
    }
  }

  setData = (sum) => {
    const {colors}=this.state
    const data=[]
    const gameTitles=[]
     this.props.games.forEach((game,i) => {
    if (!sum[i])return
    gameTitles.push(game.title)
      data.push({fill:colors[i] ,name: game.title, value: sum[i]})
    })
    this.setState({ data,gameTitles })
  }



  render() {
    const { data,gameTitles,colors } = this.state
    
    return (
      <div>
      <PieChart width={400} height={400}>
        <Pie dataKey="value" isAnimationActive={false} data={data} cx={200} cy={200} outerRadius={80} fill="#8884d8" label />
        <Tooltip />
      </PieChart>
      {gameTitles&&gameTitles.map((title,i)=>{
       return <p key={title} style={{background:colors[i]}}>{title}</p> 
      })}
      </div>
    );
  }
}
