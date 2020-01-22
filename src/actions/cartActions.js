import CartService from '../services/CartService'

export function loadCart() {
    return dispatch => {
        const cart = CartService.query();
        dispatch(_setCart(cart));
    }
}

export function clearCart() {
    return dispatch => {
        const cart = CartService.clear();
        dispatch(_setCart(cart))
    }
}

export function removeGameFromCart(item) {
    return dispatch => {
        CartService.removeFromCart(item)
        dispatch(_removeFromCart(item));
    }
}

export function addGameToCart(item) {
    return dispatch => {
        try {
            CartService.addToCart(item)
            dispatch(_addToCart(item))
            return;
        } catch (err) {
            console.log(err);
            throw err;
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
