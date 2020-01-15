import { getStore, setStore, removeStore } from "./store";

const adminId = "ADMIN-ID";
const adminToken = "ADMIN-TOKEN";

// 获取token
export function getToken() {
    return getStore(adminToken);
}
// 设置存储
export function setName(name,val) {
    return setStore(name, val, 365);
}
// 获取admin_id
export function getName(name) {
    return getStore(name);
}
// 刪除admin_id
export function removeName(name) {
    return removeStore(name);
}
// 设置token
export function setToken(sid) {
    return setStore(adminToken, sid, 365);
}

// 删除token
export function removeToken() {
    return removeStore(adminToken);
}

// 获取admin_id
export function getAdminId() {
    return getStore(adminId);
}

// 设置admin_id
export function setAdminId(id) {
    return setStore(adminId, id, 365);
}

// 删除admin_id
export function removeAdminId() {
    return removeStore(adminId);
}

// 设置SessionStorage缓存关闭浏览器
export function setSessionStorage(name, val) {
    return sessionStorage.setItem(name, JSON.stringify(val));
}

// 读取SessionStorage缓存
export function getSessionStorage(name) {
    return JSON.parse(sessionStorage.getItem(name));
}

// 删除SessionStorage缓存
export function removeSessionStorage(name) {
    return sessionStorage.removeItem(name);
}

// 删除所有的SessionStorage缓存
export function removeAllSessionStoragee() {
    return sessionStorage.clear();
}

// 设置localStorage缓存
export function setLocalStorage(name, val) {
    return localStorage.setItem(name, JSON.stringify(val));
}

// 读取localStorage缓存永久
export function getLocalStorage(name) {
    return JSON.parse(localStorage.getItem(name));
}

// 删除localStorage缓存
export function removeLocalStorage(name) {
    return localStorage.removeItem(name);
}

// 删除所有的localStorage缓存
export function removeAllLocalStorage() {
    return localStorage.clear();
}

