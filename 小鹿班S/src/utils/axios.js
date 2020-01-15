import axios from "axios";
import { Message } from "element-ui";
import store from "../store/index";
import { BASE_URL } from "../config/app";
import router from "../router/index";

// 创建axios实例
const service = axios.create({
    baseURL: BASE_URL, // api的base_url
    timeout: 600000 // 请求超时时间
});

// request拦截器
service.interceptors.request.use(
    config => {
        // Do something before request is sent
        if (store.getters.adminId && store.getters.token) {
            config.params = {
                /*ADMIN_ID: store.getters.adminId,
                ADMIN_TOKEN: store.getters.token,*/
                ...config.params
            };
        }
        return config;
    },
    error => {
        // Do something with request error
        Promise.reject(error);
    }
);

// respone拦截器
service.interceptors.response.use(
    response => {
        const data = response.data;
        if (data.code) {
            if (data.code === 403) {
                store.dispatch("fedLogout").then(() => {
                    router.push({
                        path: "/login"
                        /*query: { redirect: router.currentRoute.fullPath } // 从哪个页面跳转过来*/
                    });
                });
            }
            if (data.code === -1) {
                Message({
                    message: data.msg,
                    type: "error",
                    duration: 3 * 1000
                });
            }
            if (data.code === 1) {
                Message({
                    message: data.msg,
                    type: "error",
                    duration: 3 * 1000
                });
            }
            if (data.code === 2) {
                Message({
                    message: data.msg,
                    type: "error",
                    duration: 3 * 1000
                });
            }
            if (data.code === 6) {
                Message({
                    message: data.msg,
                    type: "error",
                    duration: 3 * 1000
                });
            }
        }
        return data;
    },
    error => {
        Message({
            message: error.message,
            type: "error",
            duration: 1.5 * 1000
        });
        return Promise.reject(error);
    }
);

export default service;
