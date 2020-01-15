/**
 * Created by lk on 17/6/4.
 */
import axios from "../../utils/axios";
import Qs from 'qs';

// 获取列表
export function getRuleList(data) {
    return axios({
        url: "/wow/sys/menu/query",
        method: "post",
        data: Qs.stringify(data)
    });
}
// 添加修改
export function addupRuleList(data, formName) {
    let url =
        formName !== "add"
            ? "/wow/sys/menu/modify"
            : "/wow/sys/menu/add";
    return axios({
        url: url,
        method: "post",
        data: Qs.stringify(data)
    });
}


// 启动或禁用
export function modifyStatus(data) {
    return axios({
        url: "/wow/sys/menu/modifyStatus",
        method: "post",
        data: Qs.stringify(data)
    });
}
