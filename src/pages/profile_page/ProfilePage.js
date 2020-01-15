import React, { Component } from "react";
import DynamicTabPrev from "../../cmps/DynamicTabPrev";
import WishList from "../../cmps/WishList";

export default class ProfilePage extends Component {
  state = {
    mode: 'OwnedGames',
    user: {
      "_id": "u101",
      "fullName": "Yoad Gantz",
      "userName": "NabCake",
      "password": "tinkerbell",
      "about": "1234 is not the password",
      "createdAt": 123879186123,
      "imgUrl": "http://some-img",
      //“acquiredGames” : [{minimal-game}],
      //“publishedGames” :[{minimal-game}],
      "desiredGames": [{ game: 'gta' }],
    }
  };

  componentWillMount() {
    // this.setUser();
    //getAquiredGames;
    //getPublishedGames;
  }

  updateMode = (ev) => {
    let mode = ev.target.value
    this.setState({ mode })
  }

  toggleModal = () => {
    console.log('Opened Modal')
  }

  render() {
    const { user } = this.state
    return (
      <div>
        <h1>Hi {user.fullName}</h1>
        <p>Registered:{user.createdAt}</p>
        <p>{user.about}</p>
        <img src={user.imgUrl} alt="User" />
        <button onClick={this.toggleModal}>My Wish List</button>
        <label htmlFor="OwnedGames" >
          <p>My Games</p>
          <input name="tab" type="radio" onClick={this.updateMode}
            checked={this.state.mode === "OwnedGames"} value="OwnedGames" />
        </label>
        <label htmlFor="Dashboard">
          <p>Dashboard</p>
          <input name="tab" type="radio" onClick={this.updateMode} value="Dashboard" />
        </label>
        <DynamicTabPrev mode={this.state.mode} />
      </div>
    )
  }
}


