import axios from 'axios';
//允许跨域
const request = axios.create({
    withCredentials: true
})

export default request;