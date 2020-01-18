import { createBrowserHistory } from "history";
import Axios from 'axios';

const history = createBrowserHistory();
const BASE_URL = process.env.NODE_ENV === 'production'
    ? '/api/'
    : '//localhost:3030/api/'


let axios = Axios.create({
    withCredentials: true
});

export default {
    get(endpoint, data, params){
        return ajax(endpoint, 'GET', data, params)
    },
    post(endpoint, data){
        return ajax(endpoint, 'POST', data)
    },
    put(endpoint, data){
        return ajax(endpoint, 'PUT', data)
    },
    delete(endpoint, data){
        return ajax(endpoint, 'DELETE', data)
    }
}


async function ajax(endpoint, method='get', data=null ,params, dispatch) {
    try {
        
        const res = await axios({
            url: `${BASE_URL}${endpoint}`,
            method,
            data,
            params
        })
        console.log('data',data);
        return res.data;
    } catch (err) {
        console.log(`Had Issues ${method}ing to the backend, endpoint: ${endpoint}, with data: ${data}`);
        console.dir(err);
        if (err.response && err.response.status === 401) {
          history.push('/'); // diaspatch ('authorition error')
        }
          // diaspatch ('error')
          throw err; 
    }
}