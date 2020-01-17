import React, { Component } from "react";
import { Card, Icon} from 'antd';

import DynamicTabPrev from "../../cmps/dynamic-cmps/dynamic-tab/";
import WishList from "../../cmps/WishList";

import "./_ProfilePage.scss"

const { Meta } = Card;

export default class ProfilePage extends Component {
  state = {
    mode: 'OwnedGames',
    user: {
      "_id": "u101",
      "fullName": "Yoad Gantz",
      "userName": "NabCake",
      "password": "tinkerbell",
      "about": "Consequuntur inventore eaque modi. Commodi eos eum minus voluptas dignissimos. Saepe ...",
      "createdAt": 123879186123,
      "imgUrl": "http://keenthemes.com/preview/metronic/theme/assets/pages/media/profile/profile_user.jpg",
      //“acquiredGames” : [{minimal-game}],
      //“publishedGames” :[{minimal-game}],
      "desiredGames": [{ game: 'gta' }],
    }
  };

  componentDidMount() {
    // this.setUser();
    //getAcquiredGames;
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
      <div className="container profile-container flex full">
        <div className="tab-container flex full column align-center">
          <div className="tab-nav flex">
            <label className="tab" htmlFor="OwnedGames">
              <p>Games</p>
              <input name="tab" type="radio" onChange={this.updateMode}
                checked={this.state.mode === "OwnedGames"} value="OwnedGames" id="OwnedGames" />
            </label>
            <label className="tab" htmlFor="Dashboard">
              <p>Dashboard</p>
              <input name="tab" type="radio" onChange={this.updateMode} value="Dashboard" id="Dashboard" />
            </label>
          </div>
          <DynamicTabPrev mode={this.state.mode} />
        </div>
        <Card
          style={{ width: 300 }}
          cover={
            <img className="user-img small"
              alt="example"
              src={user.imgUrl}
            />
          }
          actions={[
            <Icon title="Edit details" type="edit" key="edit" />,
            <Icon onClick={this.toggleModal} title="My wishlist" type="heart" key="heart" />,
          ]}
        >
          <Meta
            title={user.userName}
            avatar={'Dec 2013'}
            description={user.about}
          />
        </Card>
      </div>
    )
  }
}


