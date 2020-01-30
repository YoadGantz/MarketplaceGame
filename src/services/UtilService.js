import OrderService from './OrderService';
export default {
    sortGames,
    sortByDownloads,
    getGraphsDetails,
    getGameRating,
    dateByMillisecond,
    dateFromObjectId,
    formatDate,
    getSum,
    formatGameRating
}

function dateFromObjectId(objectId) {
    const date = new Date(parseInt(objectId.substring(0, 8), 16) * 1000)
    return date
};




function getGameRating(game) {
    const { reviews } = game
    let sumOfRating = reviews.reduce((acc, review) => {
        if (review.rating === 'like') {
            return acc += 1
        } else {
            return acc -= 1
        }
    }, 0)
    const rating = +(sumOfRating / reviews.length) * 100
    return rating
}

function dateByMillisecond(time) {
    let date = new Date()
    if (time) {
        date.setDate(date.getDate() - time);
    }
    return date.getTime()
}

async function getSum(games) {
    const downloadsByGame = await getGraphsDetails(games, 'games')
    const sum = games.map((currGame, idx) => {
        return downloadsByGame[idx] * currGame.price
    })
    return { sum, downloadsByGame }
}

async function sortGames(games, sortBy, isAscending) {
    if (sortBy === 'popularity') {
        return sortByDownloads(games, isAscending)
    } else if (sortBy === 'releaseDate') {
        return _sortByRecency(games, isAscending)
    } else if (sortBy === 'rating') {
        return _sortByRating(games, isAscending)
    } else if (sortBy === 'price') {
        return _sortByPrice(games, isAscending)
    }
}

async function _sortByRecency(games, isAscending = false) {
    const sortedGames = games.sort((game1, game2) => {
        if (isAscending) {
            return game1.publishedAt < game2.publishedAt ? -1 : game1.publishedAt > game2.publishedAt ? 0 : 1
        }
        return game1.publishedAt > game2.publishedAt ? -1 : game1.publishedAt < game2.publishedAt ? 0 : 1
   
    })
    return sortedGames
}

async function _sortByRating(games, isAscending = false) {
    games.forEach(game => game.totalRating = getGameRating(game))
    const sortedGames = games.sort((game1, game2) => {
        if (isAscending) {
            return game1.totalRating < game2.totalRating ? -1 : game1.totalRating > game2.totalRating ? 0 : 1
        }
        return game1.totalRating > game2.totalRating ? -1 : game1.totalRating < game2.totalRating ? 0 : 1
    })
    return sortedGames
}

async function sortByDownloads(games, isAscending = false) {
    const downloadNumbers = await getGraphsDetails(games)
    games.forEach((game) => {
        game.downloadsCount = downloadNumbers[game.title]
    });
    const sortedGames = games.sort((game1, game2) => {
        if (isAscending) {
            return game1.downloadsCount < game2.downloadsCount ? -1 : game1.downloadsCount > game2.downloadsCount ? 0 : 1
        }
        return game1.downloadsCount > game2.downloadsCount ? -1 : game1.downloadsCount < game2.downloadsCount ? 0 : 1
    })
    return sortedGames
}

function _sortByPrice(games, isAscending) {
    const sortedGames = games.sort((game1, game2) => {
        if (isAscending) {
            return game2.price > game1.price ? -1 : game2.price < game1.price ? 0 : 1
        }
        return game2.price < game1.price ? -1 : game2.price > game1.price ? 0 : 1
    })
    return sortedGames
}


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

async function getGraphsDetails(games, type, time = 31) {
    const prms = []
    const ordersBy = {}
    const gameByNameOrder = []
    const ordersByGame = []
    games.forEach((game) => {
        prms.push(OrderService.query({
            lastMonthId: dateByMillisecond(time),
            gameIds: game._id
        }))
        gameByNameOrder.push(game.title)
        ordersByGame.push(0)
    })
    const gameOrders = await Promise.all(prms)
    gameOrders.forEach((orders, i) => {
        return orders.forEach((order, idx) => {
            const date = new Date(order.createdAt / 1)
            let currOrderDate = date.getDate()
            currOrderDate += `/${date.getMonth() + 1}`
            let num = ordersBy[currOrderDate]
            if (num && idx === 0) return
            if (type === 'games') {
                return ordersByGame[i] += 1
            }
            if (!num) {
                ordersBy[gameByNameOrder[i]] = 1
                return ordersBy[currOrderDate] = 1
            }
            ordersBy[gameByNameOrder[i]] = idx
            return ordersBy[currOrderDate] = num + 1
        })
    })
    if (type === 'games') return ordersByGame

    return ordersBy
}

function formatGameRating(rating) {
    if (rating > 50) {
        return 'Really positive'
    } else if (rating > 10) {
        return 'Positive'
    } else if (rating > -10) {
        return 'Mixed'
    } else if (rating > -50) {
        return 'Negetive'
    } else {
        return 'Really negetive'
    }
}

