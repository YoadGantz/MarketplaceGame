
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import UtilService from '../../services/UtilService';
import GameService from '../../services/GameService'
import { loadGames } from '../../actions/gameActions';

import GameList from '../game-list/GameList';
import Modal from '../modal/Modal'
import Graph from '../charts/LineChart';
import PieChart from '../charts/PieChart';

import ConfirmDelete from '../helpers/ConfirmDelete'
class Dashboard extends Component {
    state = {
        orders: null,
        filterBy: {
            _id: '',
        },
        modalType: '',
        toggleModal: false,
        currGameId: ''
    }

    togglePortal = (modalType) => {
        console.log(modalType);
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

    componentDidUpdate = (prevProps) => {
        if (prevProps.games.length !== this.props.games.length) {
            this.getGraphsDetails()
        }
    }

    componentDidMount = () => {
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
        this.getGraphsDetails()
    }

    onRemoveGame = async (gameId) => {
        console.log(gameId)
        this.setState({
            toggleModal: true,
            currGameId: gameId
        }, console.log(this.state))
        this.togglePortal('confirmDelete')
    }

    removeGame = async () => {
        this.setState(prevState => { return { toggleModal: !prevState.toggleModal, modalType: '' } })
        await GameService.remove(this.state.currGameId)
        this.props.loadGames()
    }

    render() {
        const { orders } = this.state
        return (<div>
            <h1>Dashboard</h1>
            <Graph orderDates={orders} ></Graph>
            <PieChart games={this.props.games} orderedGames={orders} />
            <div>game list</div>
            <Link to='/edit'>Add a game</Link>
            <GameList onRemoveGame={this.onRemoveGame} history={this.props.history} isDashboard={true} isProfile={true} games={this.props.games}></GameList>
            {this.state.modalType === 'confirmDelete' && <Modal >
                <ConfirmDelete modalAction={this.removeGame} togglePortal={this.togglePortal}></ConfirmDelete>
            </Modal>}
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
