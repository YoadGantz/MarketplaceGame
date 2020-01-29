import React, { Component } from 'react';
import { connect } from 'react-redux';

import history from '../../history';

import { login } from '../../actions/userActions';

import './_Login.scss'

class Login extends Component {
  state = {
    loginCred: {
      userName: '',
      password: ''
    },
    isIncorrectInput: false
  };
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  loginHandleChange = ev => {
    const { name, value } = ev.target;
    this.setState(prevState => ({
      loginCred: {
        ...prevState.loginCred,
        [name]: value
      }
    }));
  };

  doLogin = async ev => {
    ev.preventDefault();
    const { userName, password } = this.state.loginCred;
    if (!userName || !password) {
      return console.log('all details are required');
    }
    const userCreds = { userName, password };

    try {
      debugger;
      await this.props.login(userCreds);
      this.setState({ loginCred: { userName: '', password: '' } }, () => history.push('/'));
    } catch (err) {
      this.setState({ isIncorrectInput: true })
      console.log('Had issues while logging in ')
    }
  };

  render() {
    const { loggedInUser } = this.props
    const loginSection = (
      <form className="login-form flex column justify-center align-center" onSubmit={this.doLogin}>
        <input className="login-input input" type="text" name="userName" value={this.state.loginCred.userName}
          onChange={this.loginHandleChange} placeholder="User name" />
        <input className="login-input input" type="password" name="password" value={this.state.loginCred.password}
          onChange={this.loginHandleChange} placeholder="Password" />
        {this.state.isIncorrectInput && <strong className="wrong-input">Wrong username/password please try again.</strong>}
        <button className="login-btn btn">Login</button>
        <p>Not with us yet ?</p>
        <button className="join-btn" onClick={() => history.push('/sign-up')}>Join</button>
      </form>
    );

    return (
      <div className="login-container content-container flex column justify-center align-center container">
        <img className="login-logo" alt="logo" src="/logo.png" width="100px" />
        {(!loggedInUser || !loggedInUser.userName) && loginSection}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loggedInUser: state.userStore.loggedInUser
  };
};

const mapDispatchToProps = {
  login
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
