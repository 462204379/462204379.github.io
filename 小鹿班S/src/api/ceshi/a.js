/**
 * Created by Administrator on 2019/8/5.
 */
import axios from "@/utils/axios";
export function ceshi(data) {
    return axios({
        url: "/api/login.html",
        method: "post",
        data: data
    });
}
