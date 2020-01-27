import React, { PureComponent } from 'react';
import {
    AreaChart, Area, XAxis, YAxis, Tooltip,
} from 'recharts';


export default class TinyAreaChart extends PureComponent {
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
            <AreaChart
                width={200}
                height={60}
                data={data}
                margin={{
                    top: 5, right: 0, left: 0, bottom: 5,
                }}
            >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="sum" stroke="#8884d8" fill="#8884d8" />
            </AreaChart>
        );
    }
}
