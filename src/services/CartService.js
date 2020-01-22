import StorageService from "./StorageService"

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
    if (!cartItems.find((currItem) => item === currItem)) {
        cartItems.push(item)
        StorageService.saveToStorage('cart', cartItems)
    }
}

function removeFromCart(item) {
    const cartItems = StorageService.loadFromStorage('cart')
    const updatedCart = cartItems.filter((currItem) => currItem !== item)
    StorageService.saveToStorage('cart', updatedCart)
}

function clear() {
    StorageService.saveToStorage('cart', [])
}