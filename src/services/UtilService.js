import OrderService from './OrderService';
export default {
    sortByDownloads,
    getGraphsDetails,
    getGameRating,
    objectIdByTime,
    dateFromObjectId,
    formatDate
}

function getGameRating(game) {
    const { reviews } = game
    let sumOfRating = reviews.reduce((acc, review) => {
        return acc += review.rating;
    }, 0)
    const rating = +(sumOfRating / reviews.length).toFixed(2)
    return rating
}

function objectIdByTime(time) {
    let date = new Date()
    if (time) {
        date.setDate(date.getDate() - time);
    }
    return Math.floor(date.getTime() / 1000).toString(16) + "0000000000000000"
}

async function sortByDownloads(games) {
    const downloadNumbers = await getGraphsDetails(games, 'games')
    games.forEach((game, idx) => {
        game.downloads = downloadNumbers[idx]
    })
    const sortedGames = games.sort((game1, game2) => {
        return game1.downloads > game2.downloads ? -1 : game1.downloads < game2.downloads ? 0 : 1
    })
    return sortedGames
}

function sortByPrice(games) {
    const sortedGames = games.sort((game1, game2) => {
        return (game2.price - game1.price) ? game2.price - game1.price : ''
    })
    return sortedGames
}

function dateFromObjectId(objectId) {
    const date = new Date(parseInt(objectId.substring(0, 8), 16) * 1000)
    return date
};

function formatDate(date) {
    const year = date.getFullYear()
    const monthNames = [
        "Jan", "Feb", "Mar", "Apr",
        "May", "Jun", "Jul", "Aug",
        "Sep", "Oct", "Nov", "Dec"];
    let month = monthNames[date.getMonth()]
    const fullDate = month + ' ' + year
    return fullDate
}

async function getGraphsDetails(games, type) {
    const prms = []
    const ordersBy = {}
    const gameByNameOrder = []
    const ordersByGame = []
    games.forEach((game) => {
        prms.push(OrderService.query({
            lastMonthId: objectIdByTime(30),
            gameIds: game._id
        }))
        gameByNameOrder.push(game.title)
        ordersByGame.push(0)
    })
    const gameOrders = await Promise.all(prms)
    gameOrders.forEach((orders, i) => {
        return orders.forEach((order, idx) => {
            const currOrderDate = dateFromObjectId(order._id)
            if (type === 'games') {
                return ordersByGame[i] += 1
            }
            let num = ordersBy[currOrderDate]
            if (!num) return ordersBy[currOrderDate] = 1
            ordersBy[gameByNameOrder[i]] = idx
            return ordersBy[currOrderDate] = num + 1
        })
    })
    if (type === 'games') return ordersByGame
    return ordersBy
}