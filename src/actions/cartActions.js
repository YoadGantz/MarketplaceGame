import CartService from '../../services/CartService.js'

export const saveCart = cart => {
    return async dispatch => {
        return await CartService.saveCart(cart)
            (() => dispatch(setCart(cart)))
    }
}

function setCart(cart) {
    return {
        type: 'SET_CART',
        cart
    }
}

// const addToCart = item => {
//     return {
//         type: 'ADD_TO_CART',
//         item
//     }
// }
// export const removeFromCart = id => {
//     return {
//         type: 'REMOVE_FROM_CART',
//         id
//     }
// }
