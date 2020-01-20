import OrderService from "./OrderService";
export default { getGraphsDetails, getGameRating }

function getGameRating(game) {
    const { reviews } = game
    let sumOfRating = reviews.reduce((acc, review) => {
        return acc += review.rating;
    }, 0)
    const rating = +(sumOfRating / reviews.length).toFixed(2)
    return rating
}

function _objectIdFromLastMonth() {
    let date = new Date()
    date.setDate(date.getDate() - 30);
    return Math.floor(date.getTime() / 1000).toString(16) + "0000000000000000"
}

function _dateFromObjectId(objectId) {
    return new Date(parseInt(objectId.substring(0, 8), 16) * 1000).getDate();
};

async function getGraphsDetails(games) {
    const prms = []
    const ordersBy = {}
    const gameByNameOrder = []
    games.forEach((game) => {
        prms.push(OrderService.query({
            lastMonthId: _objectIdFromLastMonth(),
            gameIds: game._id
        }))
        gameByNameOrder.push(game.title)
    })
    const gameOrders = await Promise.all(prms)
    gameOrders.forEach((orders, i) => {
        return orders.forEach((order, idx) => {
            const currOrderDate = _dateFromObjectId(order._id)
            let num = ordersBy[currOrderDate]
            if (!num) return ordersBy[currOrderDate] = 1
            ordersBy[gameByNameOrder[i]] = idx
            return ordersBy[currOrderDate] = num + 1
        })
    })
    return ordersBy
}