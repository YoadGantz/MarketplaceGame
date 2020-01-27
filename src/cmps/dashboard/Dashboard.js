
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import UtilService from '../../services/UtilService';
import GameService from '../../services/GameService'
import { loadGames } from '../../actions/gameActions';

import GameList from '../game-list/GameList';
import Modal from '../modal/Modal'
import AreaChart from '../charts/AreaChart';
import PieChart from '../charts/PieChart';
import InfoCard from '../infocard/InfoCard';

import ConfirmDelete from '../helpers/ConfirmDelete'
import './_Dashboard.scss'



class Dashboard extends Component {
    state = {
        orders: null,
        filterBy: {
            _id: '',
        },
        modalType: '',
        toggleModal: false,
        currGameId: '',
        sumOfGames: [],
        monthMoneySum: null,
        downloadsByMonth: null,
        downloadsByWeek: null
    }

    onToggleModal = (modalType) => {
        if (!this.state.toggleModal) {
            this.setState({ modalType, toggleModal: true });
        } else if (modalType === this.state.modalType) {
            this.setState(prevState => { return { toggleModal: !prevState.toggleModal, modalType: '' } })
        } else {
            this.setState({ modalType })
        }
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

    onRemoveGame = async (gameId) => {
        this.setState({
            toggleModal: true,
            currGameId: gameId
        })
        this.onToggleModal('confirmDelete')
    }

    removeGame = async () => {
        this.setState(prevState => { return { toggleModal: !prevState.toggleModal, modalType: '' } })
        await GameService.remove(this.state.currGameId)
        this.props.loadGames()
    }

    render() {
        const { orders, sumOfGames, monthMoneySum, downloadsByMonth, downloadsByWeek } = this.state
        let gameList
        if (this.props.loggedInUser) {
            gameList = (<div className="games-container flex column totally-center">
                <h3 className="games-header">Your uploaded games</h3>
                <div className='publish-button btn'>
                    <Link to='/edit'>Publish a game</Link>
                </div>
                <GameList onRemoveGame={this.onRemoveGame} history={this.props.history} isDashboard={true} isProfile={true} games={this.props.games} />
                {this.state.modalType === 'confirmDelete' && <Modal >
                    <ConfirmDelete modalType={this.modalType} modalAction={this.removeGame} toggleModal={this.onToggleModal} />
                </Modal>}</div>
            )
            if (!this.props.games.length) {
                return <div className="container dashboard-container flex column align-center">
                    <h3 className="dashboard-header">Publish games to see more</h3>
                </div>
            }
        }
        return (<div className="container dashboard-container flex column align-center">
            {!this.props.loggedInUser && <h3 className="dashboard-header">This is a demo of the dashboard, login to see your data</h3>}
            <div className='flex info-cards-container'>
                <InfoCard data={monthMoneySum}>Earned this month:</InfoCard>
                <InfoCard data={downloadsByMonth}>Downloads this month:</InfoCard>
                <InfoCard data={downloadsByWeek}>Downloads this week:</InfoCard>
            </div>
            <div className="charts-container flex wrap totally-center">
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
