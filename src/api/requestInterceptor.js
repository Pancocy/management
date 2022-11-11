import axios from 'axios'

//1.创建axios对象
const app = axios.create();

//2.设置请求拦截器
app.interceptors.request.use((config) => {
    return config;
}, (error) => {
    Promise.reject(error);
})

//3.设置响应拦截器
app.interceptors.response.use((reaponse) => {
    return reaponse.data;
}, (error) => {
    return Promise.reject(error);
})

export default app