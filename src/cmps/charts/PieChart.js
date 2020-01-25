import React, { PureComponent } from 'react';
import { PieChart, Pie, Tooltip } from 'recharts';
export default class PieCharts extends PureComponent {
  state = {
    data: [{ fill: '#16578F', name: 'publish Games', value: 1 }],
    gameTitles: null,
    colors: ['#16578F', '#5F89D3', '#A45FC1',
      '#4C96D7', 'lightblue', 'red', '#023436', '#FFC09F',
      '#ADF7B6', '#D10000', '#65AFFF', '#274060']
  }

  componentDidUpdate(prevprops) {
    if (prevprops.sumOfGames !== this.props.sumOfGames) {
      this.setData(this.props.sumOfGames)
    }
  }

  setData = (sum) => {
    const { colors } = this.state
    const data = []
    const gameTitles = []
    this.props.games.forEach((game, i) => {
      if (!sum[i]) return
      if (!this.props.user && i > 3) return
      gameTitles.push(game.title)
      data.push({ fill: colors[i], name: game.title, value: sum[i] })
    })
    this.setState({ data, gameTitles })
  }

  renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  render() {
    const { data, gameTitles, colors } = this.state

    return (
      <div>
        <PieChart width={400} height={400}>
          <Pie
            dataKey="value"
            isAnimationActive={true}
            data={data}
            cx={200}
            cy={200}
            outerRadius={100}
            fill="#8884d8"
            labelLine={false}
            label={this.renderCustomizedLabel} />
          <Tooltip />
        </PieChart>
        <table>
          <tbody>
            {gameTitles && gameTitles.map((title, i) => {
              return <tr key={title}>
                <td className="menu-color" style={{ background: colors[i], width: "20px" }}>
                </td>
                <td>{title}</td>
              </tr>
            })}
          </tbody>
        </table>
      </div >
    );
  }
}
