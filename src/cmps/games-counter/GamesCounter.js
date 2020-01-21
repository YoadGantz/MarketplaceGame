import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadCart } from '../../actions/cartActions'

class GamesCounter extends Component {
    componentDidMount() {
        this.props.loadCart()
    }

    render() {
        return <div style={{ color: "white" }}>{this.props.cart.length}</div>
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
)(GamesCounter)