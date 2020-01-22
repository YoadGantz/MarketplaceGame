
import HttpService from './HttpService';

export default {
    query,
    add
}


async function query(filterBy) {
    return HttpService.get('order', '', filterBy);
}

async function add(order) {
    return HttpService.post('order', order);
}


