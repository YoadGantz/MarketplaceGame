
import React, { Component } from "react"
import { connect } from 'react-redux'


import { loadGames} from "../../actions/gameActions";
// import { loadUser } from "../../actions/userActions";

import GameList from '../game-list/GameList'
import Graph from "../charts/LineChart";
import PieCharts from "../charts/PieCharts";
import orderUtils from "../../services/UtilService";
import EditGame from "../edit-game/EditGame";
import { Link } from "react-router-dom";

class Dashboard extends Component {
    state = {
        orders: '',
        filterBy: {
            publisherId: '',
        }
    }

    getGraphsDetails=async ()=>{
     const   ordersBy=await orderUtils.getGraphsDetails(this.props.games)
        this.setState({ orders: ordersBy })
    }
    componentDidUpdate= (prevProps)=>{
      if  (prevProps.games.length!==this.props.length){
          this.getGraphsDetails()
      }
    }




    componentDidMount =() =>{
        if (this.props.loggedInUser) {
            const publisherId = this.props.loggedInUser._id
            this.setState({
                filterBy: {
                }
            }, async ()=> {
              await  this.props.loadGames(this.state.filterBy)
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
            <Link to='/edit'><button>Add a game</button></Link>
            <GameList isProfile={true} games={this.props.games}></GameList>
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
