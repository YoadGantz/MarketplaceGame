
import React, { Component } from "react"
import { connect } from 'react-redux'
import OrderService from "../../services/OrderService";


import { loadGames, setFilterBy } from "../../actions/gameActions";
// import { loadUser } from "../../actions/userActions";

import GameList from '../game-list/GameList'
import Graph from "../charts/LineChart";
import PieCharts from "../charts/PieCharts";

class Dashboard extends Component {
    state = {
        orders: '',
        filterBy: {
            publisherName: '',
        }
    }
    objectIdFromLastMonth = () => {
        let date = new Date()
        date.setDate(date.getDate() - 30);
        return Math.floor(date.getTime() / 1000).toString(16) + "0000000000000000"
    }

    dateFromObjectId = (objectId) => {
        return new Date(parseInt(objectId.substring(0, 8), 16) * 1000).getDate();
    };


    getGraphsDetails = async () => {
        const prms = []
        const ordersBy = {}
        const gameByNameOrder = []
        this.props.games.forEach((game) => {
            prms.push(OrderService.query({
                lastMonthId: this.objectIdFromLastMonth(),
                gameIds: game._id
            }))
            gameByNameOrder.push(game.title)
        })
        const gameOrders = await Promise.all(prms)
        gameOrders.forEach((orders, i) => {
            return orders.forEach((order, idx) => {
                const currOrderDate = (this.dateFromObjectId(order._id))
                let num = ordersBy[currOrderDate]
                if (!num) return ordersBy[currOrderDate] = 1
                ordersBy[gameByNameOrder[i]] = idx
                return ordersBy[currOrderDate] = num + 1
            })
        })
        this.setState({ orders: ordersBy })
    }




    componentDidMount() {
        if (this.props.loggedInUser) {
            const publisherName = this.props.loggedInUser.userName
            this.setState({
                filterBy: {
                    publisherName,
                    lastMonthId: this.objectIdFromLastMonth()
                }
            }, () => {
                this.props.loadGames(this.state.filterBy)
            })
        } else {
            this.props.loadGames()
        }
        this.getGraphsDetails()

        // const user = this.props.loadUser(this.props.loggedInUser).then((user)=>console.log(user))   
    }

    render() {
        const { orders } = this.state
        return (<div>
            <h1>Dashboard</h1>
            <Graph orderDates={orders} ></Graph>
            <PieCharts games={this.props.games} orderedGames={orders} />
            <div>game list</div>
            <GameList games={this.props.games}></GameList>
        </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        games: state.gameStore.games,
        loggedInUser: state.userStore.loggedInUser,
        filterBy: state.gameStore.filterBy
    };
};

const mapDispatchToProps = {
    loadGames,
    setFilterBy
    // loadUser
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard);
