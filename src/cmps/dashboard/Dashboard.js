
import React, { Component } from "react"
import { connect } from 'react-redux'
import LineChart from "../charts/LineChart"

import { loadGames, setFilterBy } from "../../actions/gameActions";
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

        // const user = this.props.loadUser(this.props.loggedInUser).then((user)=>console.log(user))   
    }

    render() {
        return (<div>
            <h1>Dashboard</h1>
            <LineChart></LineChart>
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
