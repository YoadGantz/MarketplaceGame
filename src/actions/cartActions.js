import CartService from '../services/CartService'
import StorageService from '../services/StorageService'

export function loadCart() {
    return async dispatch => {
        try {
            const cart = await CartService.query();
            dispatch(_setCart(cart));

        } catch (err) {
        }
    };
}

export function clearCart() {
    return async dispatch => {
        try {
            const cart = []
            StorageService.saveToStorage('cart', cart)
            dispatch(_setCart(cart))
        } catch (err) {

        }
    }
}

export function removeGameFromCart(item) {
    return async dispatch => {
        try {
            dispatch(_removeFromCart(item));
        } catch (err) {

        }
    }
}

export function addGameToCart(item) {
    return async dispatch => {
        try {
            dispatch(_addToCart(item));
        } catch (err) {

        }
    }
}

function _setCart(cart) {
    return {
        type: 'SET_CART',
        cart
    }
}



function _addToCart(item) {
    return {
        type: 'ADD_TO_CART',
        item
    }
}

function _removeFromCart(item) {
    return {
        type: 'REMOVE_FROM_CART',
        item
    }
}
