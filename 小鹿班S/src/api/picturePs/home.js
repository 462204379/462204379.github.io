/**
 * Created by Administrator on 2019/9/21.
 */
import axios from "../../utils/axios";
import Qs from 'qs';
export function constQuery(formdata) {
    return axios({
        url: "/wow/sys/const/query",
        method: "post",
        data: Qs.stringify(formdata)
    });
}
export function homeQuery(formdata) {
    return axios({
        url: "/wow/sys/home/query",
        method: "post",
        data: Qs.stringify(formdata)
    });
}
export function homeCollect(formdata) {
    return axios({
        url: "/wow/sys/home/collect",
        method: "post",
        data: Qs.stringify(formdata)
    });
}//收藏
export function sort_top(formdata) {
    /*sortLogo 分类标识
    type save置顶  cancel取消置顶*/
    return axios({
        url: "/wow/sys/compoundImage/sort_top",
        method: "post",
        data: Qs.stringify(formdata)
    });
}//收藏置顶

export function psdTemplateItem(formdata) {
    return axios({
        url: "/wow/sys/psd/templateItem",
        method: "post",
        data: Qs.stringify(formdata)
    });
}//模板信息

export function psdAffirmTemplate(formdata) {
    return axios({
        url: "/wow/sys/psd/affirmTemplate",
        method: "post",
        responseType: "json",
        data: formdata
    });
}//保存模板
export function modifyPsdModel(formdata) {
    return axios({
        url: "/wow/sys/home/modifyPsdModel",
        method: "post",
        responseType: "json",
        data: formdata
    });
}//修改模板
export function queryCollectList(formdata) {
    return axios({
        url: "/wow/sys/compoundImage/queryCollectList",
        method: "post",
        data: Qs.stringify(formdata)
    });
}//收藏列表
export function compoundImage(formdata) {
    return axios({
        url: "/wow/sys/compoundImage/compound",
        method: "post",
        responseType: "json",
        data: formdata
    });
}//批图片
export function myphotoList(formdata) {
    return axios({
        url: "/wow/sys/photo/query",
        method: "post",
        responseType: "json",
        data: Qs.stringify(formdata)
    });
}//我的作品列表
export function download_photo(formdata) {
    return axios({
        url: "/wow/sys/photo/batch_download_photo",
        method: "get",
        responseType: 'blob',
        params: formdata
    });
}//导出作品
export function query_collect_num() {
    return axios({
        url: "/wow/sys/home/query_collect_num",
        method: "get"
    });
}//查看收藏数量
export function removeTemplate(formdata) {
    return axios({
        url: "/wow/sys/home/delete_model",
        method: "post",
        data: Qs.stringify(formdata)
    });
}//删除模板
export function model_preview(formdata) {
    return axios({
        url: "/wow/sys/compoundImage/model_preview",
        method: "post",
        responseType: "json",
        data: formdata
    });
}//合成模板预览
export function delete_model(formdata) {
    return axios({
        url: "/wow/sys/photo/delete_model",
        method: "post",
        data: Qs.stringify(formdata)
    });
}//我的作品删除模板
export function save_modify_record(formdata) {
    return axios({
        url: "/wow/sys/psd/save_modify_record",
        method: "post",
        data: Qs.stringify(formdata)
    });
}//储存模板记录
export function query_modify_record(formdata) {
    return axios({
        url: "/wow/sys/psd/query_modify_record",
        method: "post",
        data: Qs.stringify(formdata)
    });
}//提取模板记录images_upload
export function images_upload(data) {
    let formData = new FormData()
    // 服务端接收文件的参数名，文件数据，文件名
    formData.append("file", data, "img.png")
    return axios({
        url: "/wow/sys/file/upFile",
        headers: {'Content-Type': 'multipart/form-data'},
        method: "post",
        data: formData
    });
}//图片文件上传
export function download_model(formdata) {
    return axios({
        url: "/wow/sys/home/download_model",
        method: "post",
        responseType: 'blob',
        data: formdata
    });
}//下载单张图片
export function download_model_photo(formdata) {
    return axios({
        url: "/wow/sys/photo/download_photo",
        method: "post",
        responseType: 'blob',
        data: formdata
    });
}//我的作品，修改，下载/预览单张图片
export function stand_up_and_down(formdata) {
    return axios({
        url: "/wow/sys/home/stand_up_and_down",
        method: "post",
        data: Qs.stringify(formdata)
    });
}//上架下架
export function number_model(formdata) {
    return axios({
        url: "/wow/sys/compoundImage/number_model",
        method: "post",
        data: Qs.stringify(formdata)
    });
}//收藏的编号模板列表查询
export function save_layer_number(formdata) {
    return axios({
        url: "/wow/sys/compoundImage/save_layer_number",
        method: "post",
        responseType: "json",
        data: formdata
    });
}//保存图层编号信息
export function remark_query(formdata) {
    return axios({
        url: "/wow/sys/home/remark_query",
        method: "post",
        data: Qs.stringify(formdata)
    });
}//查询详情备注
export function remark_modify(formdata) {
    return axios({
        url: "/wow/sys/home/remark_modify",
        method: "post",
        data: Qs.stringify(formdata)
    });
}//修改详情备注
export function resizeImage(formdata) {
    return axios({
        url: "/wow/sys/resizeImage",
        method: "post",
        data: Qs.stringify(formdata)
    });
}//智能裁剪
export function renderingIntentImage(formdata) {
    let form = {
        imagePath: formdata.imagePath,
        rgb: formdata.rgb
    };
    return axios({
        url: "/wow/sys/renderingIntent",
        method: "post",
        data: Qs.stringify(form)
    });
}//转化图片文字颜色

//我的收藏
export function recommendModel(formdata) {
    let form = {
        sortLogo: formdata.sortLogo, //分类标识 （必传）
        sceneName: formdata.sceneName, //场景（默认 空字符串）
        labelId: formdata.labelId, //标签id（默认0）
        brandId: formdata.brandId, //品牌id（默认0）
        width: formdata.width,
        height: formdata.height,
        type: formdata.type //推荐方式 1按距离 2按主题 3按品牌（必传）
    };
    return axios({
        url: "/wow/sys/compoundImage/recommendModel",
        method: "post",
        data: Qs.stringify(form)
    });
}//智能推荐查询接口
export function modifyPsdModelBatch(formdata) {
    let form = [];
    formdata.list.map(item=>{
        form.push({
            list: item,
            type: 1
        })
    })
    return axios({
        url: "/wow/sys/home/modifyPsdModelBatch",
        method: "post",
        responseType: "json",
        data: form
    });
}//智能推荐保存接口
