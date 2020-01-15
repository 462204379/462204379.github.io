/**
 * Created by lk on 17/6/4.
 */
import axios from "../../utils/axios";
import Qs from 'qs';

// 获取角色列表
export function getRoleList(data) {
    return axios({
        url: "/wow/sys/role/query",
        method: "post",
        data: Qs.stringify(data)
    });
}
// 获取角色权限
export function getRoleMean(data) {
    return axios({
        url: "/wow/sys/role/havePermission",
        method: "post",
        data: Qs.stringify(data)
    });
}
// 删除角色
export function removeRole(data) {
    return axios({
        url: "/wow/sys/role/delete",
        method: "post",
        data: Qs.stringify(data)
    });
}
// 修改角色状态
export function upRoleStatus(data) {
    return axios({
        url: "/wow/sys/role/modifyStatus",
        method: "post",
        data: Qs.stringify(data)
    });
}
// 保存角色
export function addupRoleModify(data, formName, method = "post") {
    let url =
        formName === "add" ? "/wow/sys/role/add" : "/wow/sys/role/modify";
    return axios({
        url: url,
        method: method,
        data: Qs.stringify(data)
    });
}
// 获取权限列表
export function getRuleList(data) {
    return axios({
        url: "/wow/sys/menu/query",
        method: "post",
        data: Qs.stringify(data)
    });
}
