import React, { Component } from 'react';
import { connect } from 'react-redux';

import history from '../../history';

import './_SignUp.scss'
import MediaUploadService from '../../services/MediaUploadService';
import { signUp } from '../../actions/userActions';

class SignUp extends Component {
  state = {
    signUpCred: {
      fullName: '',
      userName: '',
      password: '',
      about: '',
      imgUrl: ''
    },
    isLoadingImg: false

  };

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  addMediaAndTags = async ev => {
    this.setState({ isLoadingImg: true })
    const imgUrl = await MediaUploadService(ev.target.files);
    return this.setState({ imgUrl: imgUrl[0], isLoadingImg: false })
  }

  signUpHandleChange = ev => {
    const { name, value } = ev.target;
    this.setState(prevState => ({
      signUpCred: {
        ...prevState.signUpCred,
        [name]: value
      }
    }));
  };

  doSignUp = async ev => {
    ev.preventDefault();
    const { fullName, userName, password, about } = this.state.signUpCred;
    if (!fullName || !userName || !password || !about) {
      return console.log('all inputs are required fullName, userName, password, about', fullName, userName, password, about);
    }
    const signUpCreds = { fullName, userName, password, about, imgUrl: this.state.imgUrl };
    try {
      await this.props.signUp(signUpCreds);
      this.setState({ signUpCred: { fullName: '', password: '', userName: '', about: '', imgUrl: '' } }, () => history.push('/'));
    } catch (err) {
      throw err
    }
  };

  removeImg = () => {
    return this.setState({ imgUrl: '' })
  };

  render() {
    const { imgUrl, isLoadingImg } = this.state
    const { loggedInUser } = this.props
    let imgPreview = ''
    if (imgUrl) {
      imgPreview = <div className="media-container">
        <img src={imgUrl} className='signup-img' alt="" />
        <span className="pointer"
          onClick={this.removeImg}>X</span>
      </div>
    }
    const signUpSection = (
      <form className='signup-form flex column align-center' onSubmit={this.doSignUp}>
        <input type="text" className='input' name="fullName" value={this.state.signUpCred.fullName}
          onChange={this.signUpHandleChange} placeholder="Full Name" />
        <br />
        <input type="text" className='input' name="userName" value={this.state.signUpCred.userName}
          onChange={this.signUpHandleChange} placeholder="UserName" />
        <br />
        <input type="password" className='input' name="password" value={this.state.signUpCred.password}
          onChange={this.signUpHandleChange} placeholder="Password" />
        <br />
        <input type="text" className='input' name="about" value={this.state.signUpCred.about}
          onChange={this.signUpHandleChange} placeholder="About" />
        <br />
        <input type="file" className='hidden' name="imgUrl" placeholder="Profile Image"
          onChange={this.addMediaAndTags} id='upload' />
        <label htmlFor='upload' className='input pointer upload-button flex' >
      <img alt='' src='https://pngimage.net/wp-content/uploads/2018/06/png-upload-4.png' />
        Upload Img</label>
        {imgPreview}
        <br />
        {(imgPreview && <button className='signup-btn'>Join</button>)}
      </form>
    );

    return (
      <div className='content-container signup-container flex column align-center'>
        <img className="signup-logo" alt="logo" src="/logo.png" width="100px" />
        {isLoadingImg && <div className='loader'></div>}
        {(!loggedInUser || !loggedInUser.userName) && signUpSection}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    loggedInUser: state.userStore.loggedInUser
  };
};

const mapDispatchToProps = {
  signUp
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);
