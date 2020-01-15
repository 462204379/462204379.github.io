import { loginName, logout } from "../../api/auth/login";
import * as types from "../mutation-types";
import { constantRouterMap } from "../../router";
import {
    getToken,
    setToken,
    removeToken,
    getAdminId,
    setAdminId,
    removeAdminId,
    setSessionStorage,
    getSessionStorage
} from "../../utils/auth";
// import { $NOT_NETWORK } from '../../utils/errorCode'
import { Message } from "element-ui";

// initial state
const state = {
    adminId: getAdminId(), // id
    userName: "", // 昵称
    avatar: "", // 头像
    token: getToken(), // 登录token
    authRules: [], // 权限列表
    routers: constantRouterMap // 路由列表
};

// getters
const getters = {
    adminId: state => state.adminId,
    userName: state => state.userName,
    avatar: state => state.avatar,
    token: state => state.token,
    authRules: state => state.authRules,
    routers: state => state.routers
};

// actions
const actions = {
    // 用户名登录
    loginName({ commit }, userInfo) {
        const userName = userInfo.userName ? userInfo.userName.trim() : "";
        const pwd = userInfo.pwd ? userInfo.pwd : "";
        return new Promise((resolve, reject) => {
            loginName(userName, pwd)
                .then(response => {
                    if (response.code) {
                        reject(response)
                    } else {
                        let data = response.data;
                        commit(types.RECEIVE_ADMIN_ID, data.sysUserId);
                        commit(types.RECEIVE_ADMIN_TOKEN, data.token);
                        var datas = {
                            username:data.username,
                            avatar:"",
                            authRules:data.permissionList
                        };
                        setSessionStorage('username',datas.username);
                        setSessionStorage('authRules',datas.authRules);
                        commit(types.RECEIVE_ADMIN_NAME, "");
                        commit(types.RECEIVE_ADMIN_AVATAR, datas.avatar);
                        commit(types.RECEIVE_ADMIN_AUTH_RULES, []);
                        resolve(response);
                    }
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
    userInfo({ commit }) {
        return new Promise((resolve) => {
            let data = {
                username: "admin",
                avatar: "",
                authRules: [""]
            };
            if (state.adminId === undefined){
                data.username = "";
            } else {
                data.username = getSessionStorage("username");
                data.authRules = getSessionStorage("authRules");
            }
            commit(types.RECEIVE_ADMIN_NAME, data.username);
            commit(types.RECEIVE_ADMIN_AVATAR, data.avatar);
            commit(types.RECEIVE_ADMIN_AUTH_RULES, data.authRules);
            resolve(data);
        });
    },
    // 登出
    loginOut({ commit }) {
        return new Promise((resolve, reject) => {
            logout()
                .then(() => {
                    commit(types.RECEIVE_ADMIN_ID, "");
                    commit(types.RECEIVE_ADMIN_TOKEN, "");
                    commit(types.RECEIVE_ADMIN_AUTH_RULES, []);
                    resolve();
                })
                .catch(error => {
                    reject(error);
                });
        });
    },

    // 前端 登出
    fedLogout({ commit }) {
        return new Promise(resolve => {
            commit(types.RECEIVE_ADMIN_ID, "");
            commit(types.RECEIVE_ADMIN_TOKEN, "");
            commit(types.RECEIVE_ADMIN_AUTH_RULES, []);
            resolve();
        });
    },
    /**
     * 过滤路由列表
     * @param commit
     * @param data
     * @returns {Promise}
     */
    filterRouter({ commit }, data) {
        const { accessedRouters } = data;
        if (accessedRouters && accessedRouters.length > 0) {
            commit(types.RECEIVE_ROUTERS, accessedRouters);
        }
    }
};

// mutations
const mutations = {
    [types.RECEIVE_ADMIN_ID](state, adminId) {
        state.adminId = adminId;
        if (adminId === "") {
            removeAdminId();
        } else {
            setAdminId(adminId);
        }
    },
    [types.RECEIVE_ADMIN_TOKEN](state, token) {
        state.token = token;
        if (token === ""||token ===undefined) {
            removeToken();
        } else {
            setToken(token);
        }
    },
    [types.RECEIVE_ADMIN_NAME](state, userName) {
        state.userName = userName;
    },
    [types.RECEIVE_ADMIN_AVATAR](state, avatar) {
        state.avatar = avatar;
    },
    [types.RECEIVE_ADMIN_AUTH_RULES](state, authRules) {
        state.authRules = authRules;
    },
    [types.RECEIVE_ROUTERS](state, routers) {
        const tempRm = constantRouterMap.concat(routers);
        state.routers = JSON.parse(JSON.stringify(tempRm));
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
