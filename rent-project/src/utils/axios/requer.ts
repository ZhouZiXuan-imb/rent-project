// 封装axios
// 引入axios
import axios from "axios";

// // 引入axios基地址
// import { BASE_URL } from "./url"

// 使用process 报错：Uncaught ReferenceError: process is not defined
// 这里需要使用import.meta.env 替换 process.env
// 替换后 需要把 两个 .env 文件中的变量名改成 VITE 开头
// 解决bug
export const BASE_URL = import.meta.env.VITE_APP_URL

// 配置axios基地址`
const API = axios.create({
    timeout: 10000,
    baseURL: BASE_URL
    // baseURL: "http://localhost:8080"
})

// 在请求头设置post请求头
API.defaults.headers.post['Content-Type'] = "application/json"


// 配置请求拦截器
API.interceptors.request.use(config => {
    // if(config)
    return config

}, error => {
    // 对请求错误做些什么
    return Promise.reject(error)
})

// 配置响应拦截器
API.interceptors.response.use(response => {
    if (response.status == 200) {
        return response;
    } else {
        return response;
    }
}, error => {
    console.log(error);
    return Promise.reject(error);
})

/**
 *
 * @param url 请求的地址
 * @param payload 请求要带的参数，可以为空或传一个对象
 * @returns 返回请求的数据
 */
export const axiosGet = async (url: string, payload?: object) => {
    try {
        // 发起请求
        const response = await API.get(url, {
            params: payload
        })
        // 返回请求数据
        return response;
    } catch (error) {
        throw new Error(error);
    }
}

/**
 *
 * @param url 请求的地址
 * @param payload 请求要带的参数，可以为空或传一个对象
 * @returns 返回请求的数据
 */
export const axiosPost = async (url: string, payload?: object) => {
    try {
        // 发起请求
        const response = await API.post(url, {
            data: payload
        })
        // 返回请求数据
        return response;
    } catch (error) {
        throw new Error(error);
    }
}

/**
 *
 * @param url 请求的地址
 * @param payload 请求要带的参数，可以为空或传一个对象
 * @returns 返回请求的数据
 */
export const axiosPut = async (url: string, payload?: object) => {
    try {
        // 发起请求
        const response = await API.put(url, {
            data: payload
        })
        // 返回请求数据
        return response;
    } catch (error) {
        throw new Error(error);
    }
}

/**
 *
 * @param url 请求的地址
 * @param payload 请求要带的参数，可以为空或传一个对象
 * @returns 返回请求的数据
 */
export const axiosDelete = async (url: string, payload?: object) => {
    try {
        // 发起请求
        const response = await API.put(url, {
            data: payload
        })
        // 返回请求数据
        return response;
    } catch (error) {
        // 抛出错误
        throw new Error(error);
    }
}

export {API}