import React, { Component } from "react";
import { connect } from "react-redux";

class PlayGame extends Component {

  componentDidMount() {
      console.log(this.props.match)
  }

  updateMode = (ev) => {
    let mode = ev.target.value
    this.setState({ mode })
  }

  render() {
    return <div>Hello</div>
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