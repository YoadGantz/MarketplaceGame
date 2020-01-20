import React, { Component } from "react";
import { Card, Icon } from 'antd';
import { connect } from 'react-redux'

import DynamicTabPrev from "../../cmps/dynamic-cmps/DynamicTabPrev";

import "./_ProfilePage.scss"

const { Meta } = Card;
class ProfilePage extends Component {
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
      "desiredGames": [{ game: 'gta' }],
    }
  };

  componentDidMount() {
    if (this.props.loggedInUser) this.setState({ user: this.props.loggedInUser })
  }

  updateMode = (ev) => {
    let mode = ev.target.value
    this.setState({ mode })
  }

  render() {
    const { user } = this.state
    return (
      <div className="profile-container">
        <div className="tab-nav flex align-center">
          <label className="inner-tab" htmlFor="OwnedGames">
            <p>Games</p>
            <input name="tab" type="radio" onChange={this.updateMode}
              checked={this.state.mode === "OwnedGames"} value="OwnedGames" id="OwnedGames" />
          </label>
          <label className="inner-tab" htmlFor="Dashboard">
            <p>Dashboard</p>
            <input name="tab" type="radio" onChange={this.updateMode} value="Dashboard" id="Dashboard" />
          </label>
        </div>
        <div className="content-container container">
          <DynamicTabPrev className="dynamic-prev" history={this.props.history} mode={this.state.mode} />
          <Card className="user-card"
            style={{ width: 300 }}
            cover={<img className="user-img small" alt=""
              src={user.imgUrl} />}
            actions={[
              <Icon title="Edit details" type="edit" key="edit" />,
              <Icon title="My wishlist" type="heart" key="heart" />,
            ]}>
            <Meta title={user.userName} avatar={'Dec 2013'}
              description={user.about} />
          </Card>
        </div>
      </div>
    )
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
)(ProfilePage);