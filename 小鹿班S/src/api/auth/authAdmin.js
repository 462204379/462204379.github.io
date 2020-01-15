/**
 * Created by lk on 17/6/4.
 */
import axios from "../../utils/axios";
import Qs from 'qs';
// 获取列表
export function authAdminList(query) {
    return axios({
        url: "/admin/auth/admin/index",
        method: "get",
        params: query
    });
}

// 获取角色列表
export function authAdminRoleList(query) {
    return axios({
        url: "/admin/auth/admin/roleList",
        method: "get",
        params: query
    });
}

// 保存
export function authAdminSave(data, formName, method = "post") {
    let url =
        formName === "add"
            ? "/admin/auth/admin/save"
            : "/admin/auth/admin/edit";
    return axios({
        url: url,
        method: method,
        data: data
    });
}

// 删除管理员
export function authAdminDelete(data) {
    return axios({
        url: "/admin/auth/admin/delete",
        method: "post",
        data: data
    });
}
// 获取用户列表
export function getUserList(data) {
    return axios({
        url: "/wow/sys/user/query",
        method: "post",
        data: Qs.stringify(data)
    });
}
// 获取角色列表
export function getRoleList(data) {
    return axios({
        url: "/wow/sys/role/query",
        method: "post",
        data: Qs.stringify(data)
    });
}
// 重置密码
export function resetPassword(data) {
    return axios({
        url: "/wow/sys/user/resetPassword",
        method: "post",
        data: Qs.stringify(data)
    });
}
// 用户禁用启动
/*type:1禁用；2删除*/
export function modifyStatus(data) {
    return axios({
        url: "/wow/sys/user/modifyStatus",
        method: "post",
        data: Qs.stringify(data)
    });
}
// 用户编辑
/*type:1禁用；2删除*/
export function upUser(data) {
    return axios({
        url: "/wow/sys/user/modify",
        method: "post",
        data: Qs.stringify(data)
    });
}
// 获取用户角色
export function getUserRoleList(data) {
    return axios({
        url: "/wow/sys/user/haveRole",
        method: "post",
        data: Qs.stringify(data)
    });
}
