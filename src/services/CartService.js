import StorageService from './StorageService'

export default {
    query,
    addToCart,
    removeFromCart,
    clear
}

function query() {
    return StorageService.loadFromStorage('cart')
}

function addToCart(item) {
    const cartItems = StorageService.loadFromStorage('cart')
    try {
        if (!cartItems.find((currItem) => item === currItem)) {
            cartItems.push(item)
            StorageService.saveToStorage('cart', cartItems)
            return 'success'
        }else {
            const err = 'Already in the cart'
            throw err
        }
    } catch (err) {
        console.log('Already in the cart')
        throw err
    }
}

function removeFromCart(item) {
    const cartItems = StorageService.loadFromStorage('cart')
    const updatedCart = cartItems.filter((currItem) => currItem !== item)
    StorageService.saveToStorage('cart', updatedCart)
}

function clear() {
    StorageService.saveToStorage('cart', [])
    return [];
}