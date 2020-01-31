import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadCart } from '../../actions/cartActions'

class GameCounter extends Component {
    componentDidMount() {
        this.props.loadCart()
    }


    render() {
        const { isWishList } = this.props
        return isWishList ? <p style={{marginInlineEnd:'3px', alignSelf: "center", color: "white" }}>{this.props.user ? this.props.user.wishedGames.length : 0}</p>
                         : <p style={{ alignSelf: "center", color: "white" }}>{this.props.cart.length}</p>
    }
}

const mapStateToProps = state => {
    return {
        cart: state.cartStore.cart,
        user: state.userStore.loggedInUser
    };
};

const mapDispatchToProps = {
    loadCart
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GameCounter)