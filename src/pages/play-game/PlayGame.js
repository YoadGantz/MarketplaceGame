import React, { Component } from "react";
import { connect } from "react-redux";
import SocketService from "../../services/SocketService";
import Comments from "../../cmps/comments/Comment";
class PlayGame extends Component {
    state = { comments: null }

    componentDidMount() {
        let userName = 'Guest'
        if (this.props.loggedInUser) userName = this.props.loggedInUser.userName
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
        const logInMsg = !this.props.loggedInUser ? 'Buy the game to see more then this gif' : '';
        addedComments = <Comments onAddCommentOrReview={this.sendComment} comments={comments} />
        return <div>
            <h3>{logInMsg}</h3>
            <iframe title="play" src="https://www.gameflare.com/embed/cartoon-strike/" frameBorder="0" scrolling="no" width="1000" height="635" allowFullScreen></iframe>
            <ul>{addedComments}</ul>
        </div>
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