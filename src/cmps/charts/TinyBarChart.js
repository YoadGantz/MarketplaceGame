import React, { Component } from 'react';
import { BarChart, Bar, XAxis, Tooltip } from 'recharts';

export default class Example extends Component {

    state = { data: [] }

    componentDidUpdate(prevprops) {
        if (prevprops.gameOrders !== this.props.gameOrders) {
            this.setData(this.props.gameOrders)
        }
    }

    setData = (gameOrders) => {
        const data = []
        if (!this.props.game) return
        for (let i = 30; i >= 0; i--) {
            let date = new Date()
            date.setDate(date.getDate() - i)
            const formatDate = `${date.getDate()}/${date.getMonth() + 1}`
            let orderCount
            if (gameOrders[formatDate]) {
                orderCount = gameOrders[formatDate]
            } else {
                orderCount = 0
            }
            data.push({ name: formatDate, sum: this.props.game.price * orderCount })
        }
        this.setState({ data })
    }


    render() {
        const { data } = this.state
        return (
            <div className="flex column chart align-center">
                <strong className="small-chart-title">Income distribution per day</strong>
                <BarChart
                    width={200}
                    height={150}
                    data={data}
                    margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                    <XAxis dataKey="name" />
                    <Tooltip />
                    <Bar stroke="#45667d" dataKey="sum" fill="#5c88a7" />
                </BarChart>
            </div>
        );
    }
}