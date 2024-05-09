import axios from 'axios';
//允许跨域
const request = axios.create({
    baseURL:"http://localhost:10001",
    withCredentials: true
})
//获取token


export default request;