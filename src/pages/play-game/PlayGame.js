import React, { Component } from "react";
import { connect } from "react-redux";
import SocketService from "../../services/SocketService";
import Comments from "../../cmps/comments/Comment";
import './_PlayGame.scss'

class PlayGame extends Component {
    state = { comments: null }

    componentDidMount() {
        window.scrollTo(0, 0);
        let userName = (this.props.loggedInUser) ? this.props.loggedInUser.userName : 'Guest';
        SocketService.setup()
        SocketService.emit('chat room', this.props.match.params.id);
        SocketService.emit('user joined', { text: `${userName} has joined the chat` });
        SocketService.on('chat newComment', this.addComment)
        SocketService.on('user joined', this.addComment)
    }

    componentWillUnmount = () => {
        SocketService.terminate()
    }

    sendComment = (newComment) => {
        SocketService.emit('chat newComment', newComment);
    };

    addComment = newComment => {
        if (!this.state.comments) return this.setState({ comments: [newComment] })
        this.setState(prevState => ({ comments: [...prevState.comments, newComment] }));
    };

    render() {
        const { comments } = this.state
        let addedComments
        const logInMsg = !this.props.loggedInUser ? 'Buy the game to enjoy the game fully' : '';
        addedComments = <Comments user={this.props.loggedInUser} onAddCommentOrReview={this.sendComment} comments={comments} />
        return (<div className=' container play-container'>
            <h3>{logInMsg}</h3>
            <div className='game-content-container flex'>
                <iframe title="play" src="https://www.gameflare.com/embed/cartoon-strike/" frameBorder="0" scrolling="no" width="1000" height="635" allowFullScreen></iframe>
                <div className='comments-container'>{addedComments}</div>
            </div>
        </div>)
    }
}

const mapStateToProps = state => {
    return {
        loggedInUser: state.userStore.loggedInUser
    };
};

const mapDispatchToProps = {
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PlayGame);