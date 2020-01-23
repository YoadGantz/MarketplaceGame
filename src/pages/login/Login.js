import React, { Component } from 'react';
import { connect } from 'react-redux';

import history from '../../history';

import { login } from '../../actions/userActions';

class Login extends Component {
  state = {
    loginCred: {
      userName: '',
      password: ''
    }
  };

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
      await this.props.login(userCreds);
      this.setState({ loginCred: { userName: '', password: '' } }, () => history.push('/'));
    } catch (err) {
      console.log('Had issues while logging in ')
    }
  };

  render() {
    const { loggedInUser } = this.props
    const loginSection = (
      <form onSubmit={this.doLogin}>
        <input type="text" name="userName" value={this.state.loginCred.userName}
          onChange={this.loginHandleChange} placeholder="userName" />
        <br />
        <input type="password" name="password" value={this.state.loginCred.password}
          onChange={this.loginHandleChange} placeholder="Password" />
        <br />
        <button>Login</button>
      </form>
    );

    return (
      <div className="login-form">
        {(!loggedInUser || !loggedInUser.userName) && loginSection}
        <p>Don't have a user yet ? </p>
        <button onClick={() => history.push('/sign-up')}>Join</button>
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
