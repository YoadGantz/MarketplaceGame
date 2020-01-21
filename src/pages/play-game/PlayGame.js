import React, { Component } from 'react';
import { connect } from 'react-redux';
import SocketService from '../../services/SocketService';
import Comments from '../../cmps/comments/Comments';
class PlayGame extends Component {
    state = { comments: [] }

    componentDidMount() {
        if (!this.props.loggedInUser) return
        SocketService.setup()
        SocketService.emit('chat topic', this.props.match.params.id);
        SocketService.emit('user joined the game', { text: `${this.props.loggedInUser.userName} has joined the chat` });
        SocketService.on('chat addMsg', this.addComment)
        SocketService.on('user joined the game', this.addComment)
    }

    componentWillUnmount = () => {
        if (!this.props.loggedInUser) return
        SocketService.off('chat addMsg')
        SocketService.off('user joined the game')
        SocketService.terminate()
    }

    sendComment = (text) => {
        SocketService.emit('chat newMsg', { user: { userName: this.props.loggedInUser.userName }, text });
    };

    addComment = newMsg => {
        if (!this.props.loggedInUser) return
        this.setState(prevState => ({ comments: [...prevState.comments, newMsg] }));
    };



    render() {
        const { comments } = this.state
        let addedComents
        const logInmsg = !this.props.loggedInUser ? <h3>Buy the game to see more then this gif and use the chat</h3> : ''
        addedComents = <Comments sendComment={this.sendComment} comments={comments} />
        return <div>
            {logInmsg}
            <iframe title="play" src="https://www.gameflare.com/embed/cartoon-strike/" frameborder="0" scrolling="no" width="1000" height="635" allowfullscreen></iframe>
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