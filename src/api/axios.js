import axios from 'axios';


const BASE_URL = 'http://localhost:3500'
export default axios.create({
    baseURL: BASE_URL
});
export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers:{'content-Type' :'application/json'},
    withCredentials:true
});

//here we are attaching the interceptors to the axios private that will actually atatch jwt tokens for us and even retry when we get the failure first time ,failure will come back with the status of 403 which is forbidden

// interceptors will going to work with our JWT token to refresh the token if our initial request is denied due to an expired token ,it will all work in the background and user wont see whats happenning ,but it will keep everything secure and continue to  refresh tokens on a set schedule ,now we can add a couple of values here to our axios private like headers etc 