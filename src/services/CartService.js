import StorageService from './StorageService'

export default {
    query,
    addToCart,
    removeItem
}

function query() {
    return Promise.resolve(StorageService.loadFromStorage('cart'))
}

function addToCart(item) {
    const cartItems = StorageService.loadFromStorage('cart')
    if (!cartItems.find((currItem) => item === currItem)) {
        cartItems.push(item)
        return Promise.resolve(StorageService.saveToStorage('cart', cartItems))
    }
    return Promise.reject()
}

function removeItem(item) {
    const cartItems = StorageService.loadFromStorage('cart')
    const updatedCart = cartItems.filter((currItem) => currItem !== item)
    StorageService.saveToStorage('cart', updatedCart)
}
