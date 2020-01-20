import React, { Component } from "react";
import { connect } from "react-redux";

class PlayGame extends Component {

  componentDidMount() {
  }

  updateMode = (ev) => {
    let mode = ev.target.value
    this.setState({ mode })
  }

  render() {
    return <div><img src='https://media.tenor.com/images/349f91eff94b2786b2d89c0850d84d1c/tenor.gif'></img>Hello</div>
  }
}



const mapStateToProps = state => {
    return {
      loggedInUser: state.userStore.loggedInUser,
    };
  };
  
  const mapDispatchToProps = {
  };
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(PlayGame);