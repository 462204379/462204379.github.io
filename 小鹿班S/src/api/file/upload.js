/**
 * 上传相关
 */
import axios from "../../utils/axios";
import Qs from 'qs';
// 上传文件
export function createFile(formdata) {
    return axios({
        url: "/wow/sys/psd/uploadTemplate",
        method: "post",
        data: Qs.stringify(formdata)
    });
}
