/**
 * Created by Administrator on 2019/12/20.
 */
import axios from "../../utils/axios";
import Qs from "qs";
// 批量新增素材
export function addMaterialLibrary(data, materialList) {
    let form = {
        firstType: data.firstType, //一级类目
        brandName: data.brandName, //品牌
        sortId: data.sortId, //分类id
        inlet: data.inlet, //入口 common公共 //system系统
        materialList: [
            {
                linkUrl: "", //素材图片地址
                materialName: "" //素材名称
            }
        ]
    };
    form.materialList = materialList;
    return axios({
        url: "/wow/sys/materialLibrary/add",
        method: "post",
        responseType: "json",
        data: form
    });
}
// 修改素材
export function upMaterialLibrary(data) {
    let form = {
        firstType: data.firstType, //一级类目
        brandName: data.brandName, //品牌
        sortId: data.sortId, //分类名称
        materialName: data.materialName, //素材名称
        materialId: data.materialId, //素材id
        inlet: data.commonOrPerson //素材入口
    };
    return axios({
        url: "/wow/sys/materialLibrary/modify",
        method: "post",
        data: Qs.stringify(form)
    });
}
// 素材列表
export function queryMaterialLibrary(data) {
    let form = {
        brandId: data.brandId, //品牌 默认传0
        materialSortId: data.materialSortId, //素材分类 默认传0
        orderBy: data.orderBy, //排序 desc asc
        orderByField: data.orderByField, //排序字段 file_size大小 material_name名称//create_time 创建时间
        materialName: data.materialName, //素材名称
        commonOrPerson: data.commonOrPerson, //个人或公共 common公共 person个人 system系统
        userId: data.userId, //上传人id 默认传0
        folderIds: data.folderIds, //文件夹id 0
        pageNo: data.pageNo,
        pageSize: data.pageSize
    };
    return axios({
        url: "/wow/sys/materialLibrary/query",
        method: "post",
        data: Qs.stringify(form)
    });
}

//移动收藏素材分类：
export function move_collect_material(data) {
    let form = {
        materialIds: data.materialIds, //素材id（必传，逗号分隔）
        folderId: data.folderId //文件夹id(必传)
    };
    return axios({
        url: "/wow/sys/materialLibrary/move_collect_material",
        method: "post",
        data: Qs.stringify(form)
    });
}
//删除素材：
export function remove_collect_material(data) {
    let form = {
        materialId: data  //素材id
    };
    return axios({
        url: "/wow/sys/materialLibrary/delete",
        method: "post",
        data: Qs.stringify(form)
    });
}
//收藏和取消素材：
export function collect_material(data) {
    let form = {
        materialIds : data.materialIds, //素材id（必传，逗号分隔）
        type : data.type,  //操作类型 collect收藏 cancel取消收藏
        folderId : data.folderId  //文件夹id（取消收藏时传0）
    };
    return axios({
        url: "/wow/sys/materialLibrary/collect",
        method: "post",
        data: Qs.stringify(form)
    });
}
//查询素材分类：
export function querySort() {
    return axios({
        url: "/wow/sys/materialLibrary/query_sort",
        method: "get"
    });
}
//查询收藏文件夹列表：
export function queryFolder() {
    return axios({
        url: "/wow/sys/folder/query",
        method: "get"
    });
}
//删除文件夹：
export function removeFolder(data) {
    let form = {
        folderId: data.folderId //文件夹id（必传）
    };
    return axios({
        url: "/wow/sys/folder/delete",
        method: "post",
        data: Qs.stringify(form)
    });
}
//新增文件夹：
export function addFolder(data) {
    let form = {
        folderName: data.folderName, //文件名称（必传）
        remarks: data.remarks //备注
    };
    return axios({
        url: "/wow/sys/folder/add",
        method: "post",
        data: Qs.stringify(form)
    });
}
//修改文件夹：
export function upFolder(data) {
    let form = {
        folderId: data.folderId, //文件夹id（必传）
        folderName: data.folderName //文件夹名称（必传）
    };
    return axios({
        url: "/wow/sys/folder/modify",
        method: "post",
        data: Qs.stringify(form)
    });
}

//查询作品详情列表：
export function queryPhotoItemList(data) {
    let form = {
        photoId: data.photoId
    };
    return axios({
        url: "/wow/sys/photo/queryPhotoItemList",
        method: "post",
        data: Qs.stringify(form)
    });
}

//保存模板
export function modifyPhoto(formdata) {
    return axios({
        url: "/wow/sys/photo/modifyPhoto",
        method: "post",
        responseType: "json",
        data: formdata
    });
}
