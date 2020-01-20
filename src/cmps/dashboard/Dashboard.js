
import React, { Component } from "react"
import { connect } from 'react-redux'
import LineChart from "../charts/LineChart"

import { loadGames} from "../../actions/gameActions";
// import { loadUser } from "../../actions/userActions";

import GameList from '../game-list/GameList'

class Dashboard extends Component {
    state = {
        filterBy: {
            publisherName: ''
        }
    }

    componentDidMount() {
        if (this.props.loggedInUser) {
            const publisherName = this.props.loggedInUser.userName
            this.setState({
                filterBy: {
                    publisherName
                }
            }, () => {
                this.props.loadGames(this.state.filterBy)
            })
        } else {
            this.props.loadGames()
        } 
    }

    render() {
        return (<div>
            <h1>Dashboard</h1>
            <LineChart></LineChart>
            <GameList games={this.props.games}></GameList>
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
