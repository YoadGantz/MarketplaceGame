import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Icon } from 'antd';

import LongText from '../../cmps/helpers/LongTxt'
import UtilService from '../../services/UtilService'
import DynamicTabPrev from '../../cmps/dynamic-cmps/DynamicTabPrev';

import './_ProfilePage.scss'
class ProfilePage extends Component {
  state = {
    mode: 'OwnedGames',
    user: {
      "_id": "null",
      "fullName": "Guest",
      "userName": "Guest",
      "about": "Guest",
      "createdAt": 123879186123,
      "imgUrl": "http://keenthemes.com/preview/metronic/theme/assets/pages/media/profile/profile_user.jpg",
      "desiredGames": [{ game: 'gta' }],
    }
  };

  componentDidMount() {
    window.scrollTo(0,0);
    if (this.props.loggedInUser && this.props.loggedInUser.userName) this.setState({ user: this.props.loggedInUser })
  }

  updateMode = (ev) => {
    let mode = ev.target.value
    this.setState({ mode })
  }

  render() {
    const { user } = this.state
    if (user._id !== 'null') user.createdAt = UtilService.formatDate(UtilService.dateFromObjectId(user._id))
    else user.createdAt = 'Dec 2013'
    return (
      <div className="profile-container">
        <div className="user-card flex align-center container">
          <img className="user-img small" alt="" src={user.imgUrl} />
          <div className="user-details">
            <strong>{user.userName}</strong>
            <small>{user.createdAt}</small>
            <div>
            <LongText shortLength={100} isLongTxtShown={false} text={user.about}/>
            </div>
          </div>
          <Icon title="Edit details" type="edit" key="edit" />
        </div>
        <div className="tab-nav flex justify-center">
          <label className={(this.state.mode === "OwnedGames") ? "inner-tab active" : "inner-tab"} htmlFor="OwnedGames">
            <p>Games</p>
            <input name="tab" type="radio" onChange={this.updateMode}
              checked={this.state.mode === "OwnedGames"} value="OwnedGames" id="OwnedGames" />
          </label>
          <label className={(this.state.mode === "Dashboard") ? "inner-tab active" : "inner-tab"} htmlFor="Dashboard">
            <p>Dashboard</p>
            <input name="tab" type="radio" onChange={this.updateMode} value="Dashboard" id="Dashboard" />
          </label>
        </div>
        <DynamicTabPrev className="dynamic-prev" history={this.props.history} mode={this.state.mode} />
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