
import HttpService from "./HttpService";

export default {
    query
}


async function query(filterBy) {
    return HttpService.get('order', '', filterBy);
}