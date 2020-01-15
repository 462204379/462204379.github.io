/**
 * Created by Administrator on 2019/12/17.
 */
import axios from "../../utils/axios";
import Qs from "qs";

// 添加品牌
export function addBrand(data) {
    let form = {
        pId: data.pId, //父id
        brandName: data.brandName //品牌名称
    };
    return axios({
        url: "/wow/sys/brand/add",
        method: "post",
        data: Qs.stringify(form)
    });
}
// 修改品牌
export function modifyBrand(data) {
    let form = {
        pId: data.pId, //父id
        brandName: data.brandName, //品牌名称
        id: data.id //品牌id //品牌名称
    };
    return axios({
        url: "/wow/sys/brand/modify",
        method: "post",
        data: Qs.stringify(form)
    });
}
// 删除品牌
export function deleteBrand(data) {
    let form = {
        brandId : data.brandId //品牌id
    };
    return axios({
        url: "/wow/sys/brand/delete",
        method: "post",
        data: Qs.stringify(form)
    });
}
// 查询品牌
export function queryBrand(val) {
    let form = {
        pId: val //父id（-1：查全部 0：查一级目录）
    };
    return axios({
        url: "/wow/sys/brand/query",
        method: "post",
        data: Qs.stringify(form)
    });
}
