/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 *
 */
//let BASE_URL = "/api";
//let BASE_URL = "http://192.168.1.45:9011";
//let BASE_URL = "http://122.112.230.41/back";
let BASE_URL = process.env.VUE_APP_API_BASE;
// let ROUTER_MODE = "history";
let ROUTER_MODE = "";
let IMG_BASE_URL = BASE_URL;
export { BASE_URL, ROUTER_MODE, IMG_BASE_URL };
