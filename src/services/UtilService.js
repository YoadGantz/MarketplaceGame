import OrderService from './OrderService';
export default { sortByDownloads, getGraphsDetails, getGameRating, objectIdByTime, sortByPrice }

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

async function sortByDownloads(games, isAscending) {
    const downloadNumbers = await getGraphsDetails(games, 'games')
    games.forEach((game, idx) => {
        game.downloadsCount = downloadNumbers[idx]
    });
    const sortedGames = games.sort((game1, game2) => {
        if (isAscending) {
            return game1.downloadsCount < game2.downloadsCount ? -1 : game1.downloadsCount > game2.downloadsCount ? 0 : 1
        }
        return game1.downloadsCount > game2.downloadsCount ? -1 : game1.downloadsCount < game2.downloadsCount ? 0 : 1
    })
    return sortedGames
}

function sortByPrice(games, isAscending) {
    const sortedGames = games.sort((game1, game2) => {
        if (isAscending) {
            return game2.price > game1.price ? -1 : game2.price < game1.price ? 0 : 1
        }
        return game2.price < game1.price ? -1 : game2.price > game1.price ? 0 : 1
    })
    return sortedGames
}

function _dateFromObjectId(objectId) {
    return new Date(parseInt(objectId.substring(0, 8), 16) * 1000).getDate();
};


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
            const currOrderDate = _dateFromObjectId(order._id)
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