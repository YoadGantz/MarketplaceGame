import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadCart } from '../../actions/cartActions'

class GameCounter extends Component {
    componentDidMount() {
        this.props.loadCart()
    }

    render() {
        return <p  style={{ alignSelf:"center",color: "white" }}>{this.props.cart.length}</p>
    }
}

const mapStateToProps = state => {
    return {
        cart: state.cartStore.cart
    };
};

const mapDispatchToProps = {
    loadCart
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GameCounter)