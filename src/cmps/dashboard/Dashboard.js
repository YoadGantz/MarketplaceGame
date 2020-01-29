
import React, { Component } from 'react';
import { connect } from 'react-redux';

import UtilService from '../../services/UtilService';
import { loadGames } from '../../actions/gameActions';

import GameList from '../game-list/GameList';
import AreaChart from '../charts/AreaChart';
import PieChart from '../charts/PieChart';
import InfoCard from '../info-card/InfoCard';

import './_Dashboard.scss'


class Dashboard extends Component {
    state = {
        orders: null,
        filterBy: {
            _id: '',
        },
        sumOfGames: [],
        monthMoneySum: null,
        downloadsByMonth: null,
        downloadsByWeek: null
    }

    getGraphsDetails = async () => {
        const ordersBy = await UtilService.getGraphsDetails(this.props.games)
        this.setState({ orders: ordersBy })
    }

    getWeekInfo = async () => {
        const downloadsSum = await UtilService.getGraphsDetails(this.props.games, 'games', 7)
        const downloadsByWeek = downloadsSum.reduce((acc, gameSum) => {
            return acc += gameSum
        }, 0).toLocaleString()
        this.setState({ downloadsByWeek })
    }

    getMonthInfo = async () => {
        const sumOfGames = await UtilService.getSum(this.props.games)
        const monthMoneySum = sumOfGames.sum.reduce((acc, gameSum) => {
            return acc += gameSum
        }, 0).toLocaleString()
        const downloadsByMonth = sumOfGames.downloadsByGame.reduce((acc, gameSum) => {
            return acc += gameSum
        }, 0).toLocaleString()
        this.setState({ sumOfGames: sumOfGames.sum, monthMoneySum, downloadsByMonth })
    }

    componentDidUpdate = (prevProps) => {
        if (prevProps.games.length !== this.props.games.length) {
            this.getGraphsDetails()
            this.getWeekInfo()
            this.getMonthInfo()
        }
    }

    componentDidMount = async () => {
        if (this.props.loggedInUser) {
            const _id = this.props.loggedInUser._id
            this.setState({
                filterBy: {
                    _id
                }
            }, async () => {
                await this.props.loadGames(this.state.filterBy)
            })
        } else {
            this.props.loadGames()
        }
        await this.getGraphsDetails()
        this.getWeekInfo()
        this.getMonthInfo()
    }

    render() {
        const { orders, sumOfGames, monthMoneySum, downloadsByMonth, downloadsByWeek } = this.state
        let gameList
        if (this.props.loggedInUser) {
            gameList = (<div className="games-container flex column totally-center">
                <h3 className="data-header">Per Game</h3>
                <GameList isDashboard={true} isProfile={true} games={this.props.games} />
            </div>
            )
            if (!this.props.games.length) {
                return <div className="container dashboard-container flex column align-center">
                    <h3 className="dashboard-header">Publish games to see more</h3>
                </div>
            }
        }
        return (<div className="container dashboard-container flex column align-center">
            {!this.props.loggedInUser ? <h3 className="dashboard-header">This is a demo of the dashboard, login to see your data</h3> : <h3 className="data-header">For All Games</h3>}
            <div className='flex info-cards-container'>
                <InfoCard data={monthMoneySum}>Earned this month:</InfoCard>
                <InfoCard data={downloadsByMonth}>Downloads this month:</InfoCard>
                <InfoCard data={downloadsByWeek}>Downloads this week:</InfoCard>
            </div>
            <div className="charts-container flex wrap">
                <AreaChart games={this.props.games} orderDates={orders} />
                <PieChart user={this.props.loggedInUser} games={this.props.games} sumOfGames={sumOfGames} />
            </div>
            {gameList}
        </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        games: state.gameStore.games,
        loggedInUser: state.userStore.loggedInUser
    };
};

const mapDispatchToProps = {
    loadGames
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard);
