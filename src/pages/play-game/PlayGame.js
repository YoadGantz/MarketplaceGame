import React, { Component } from "react";
import { connect } from "react-redux";
import SocketService from "../../services/SocketService";
import Comments from "../../cmps/comments/Comments";
class PlayGame extends Component {
    state = { comments: [] }

    componentDidMount() {
        if (!this.props.loggedInUser) return
        console.log(this.props.loggedInUser)
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
       const logInmsg= !this.props.loggedInUser? <h3>Buy the game to see more then this gif and use the chat</h3> : ''
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