import React, { Component } from 'react';
import {
    BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

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
            <BarChart
                width={300}
                height={150}
                data={data}
                margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar stroke="#8884d8" dataKey="sum" fill="#8884d8" />
            </BarChart>
        );
    }
}