
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './_DashBoard.scss'
import UtilService from '../../services/UtilService';
import GameService from '../../services/GameService'
import { loadGames } from '../../actions/gameActions';

import GameList from '../game-list/GameList';
import Modal from '../modal/Modal'
import AreaChart from '../charts/AreaChart';
import PieChart from '../charts/PieChart';
import InfoCard from '../infocard/InfoCard';

import ConfirmDelete from '../helpers/ConfirmDelete'
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
        }, 0)
        this.setState({ downloadsByWeek })
    }

    getMonthInfo = async () => {
        const sumOfGames = await UtilService.getSum(this.props.games)
        const monthMoneySum = sumOfGames.sum.reduce((acc, gameSum) => {
            return acc += gameSum
        }, 0)
        const downloadsByMonth = sumOfGames.downloadsByGame.reduce((acc, gameSum) => {
            return acc += gameSum
        }, 0)
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
            gameList = (<>
                <div>game list</div>
                <Link to='/edit'>Add a game</Link>
                <GameList onRemoveGame={this.onRemoveGame} history={this.props.history} isDashboard={true} isProfile={true} games={this.props.games} />
                {this.state.modalType === 'confirmDelete' && <Modal >
                    <ConfirmDelete modalType={this.modalType} modalAction={this.removeGame} toggleModal={this.onToggleModal} />
                </Modal>}</>

            )
        }
        return (<div className="content-container container">
            <h1>Dashboard</h1>
            <div className='flex space-evenly'>
                <InfoCard> Money Earned This Month: {monthMoneySum}</InfoCard>
                <InfoCard>Downloads By Month : {downloadsByMonth}</InfoCard>
                <InfoCard> Downloads By Week : {downloadsByWeek}</InfoCard>
            </div>
            <div className="charts-container flex">
                <AreaChart orderDates={orders} />
                <PieChart games={this.props.games} sumOfGames={sumOfGames} />
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
