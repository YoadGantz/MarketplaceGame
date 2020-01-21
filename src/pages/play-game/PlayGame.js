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
        SocketService.emit('chat topic', this.props.match.params.id);
        SocketService.emit('user joined', { text: `${userName} has joined the chat` });
        SocketService.on('chat newComment', this.addComment)
        SocketService.on('user joined', this.addComment)
    }

    componentWillUnmount = () => {
        SocketService.terminate()
    }

    sendComment = (text) => {
        let userName = 'Guest'
        if (this.props.loggedInUser) {
            userName = this.props.loggedInUser.userName
        }
        SocketService.emit('chat newComment', { user: { userName }, text });
    };

    addComment = newComment => {
        if (!this.state.comments) return this.setState({ comments: [newComment] })
        this.setState(prevState => ({ comments: [...prevState.comments, newComment] }));
    };

    render() {
        const { comments } = this.state
        let addedComents
        const logInmsg = !this.props.loggedInUser ? <h3>Buy the game to see more then this gif</h3> : ''
        addedComents = <Comments sendComment={this.sendComment} comments={comments} />
        return <div>
            {logInmsg}
            <img src={`https://media0.giphy.com/media/yZEIja6oMZ3qg/giphy.gif?cid=790b76114ded6412318df27a5f16325837281f38fa06ad58&rid=giphy.gif`} />
            <ul>
                {addedComents}
            </ul>
        </div>
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