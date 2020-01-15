//将时间戳转换为时间格式
export function replaceDate_1(timestamp) {
    if(!timestamp){
        return "";
    }
    timestamp = Number(timestamp);
    if (timestamp === ""||timestamp === null){
        return "-";
    } else {
        var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        var D = (date.getDate() < 10 ? '0'+(date.getDate()) : date.getDate()) + ' ';
        return Y + M + D;
    }
}
//将时间戳转换为时间格式
export function replaceDate_2(timestamp) {
    if(!timestamp){
        return "";
    }
    timestamp = Number(timestamp);
    if (timestamp === ""||timestamp === null){
        return "-";
    } else {
        var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        var D = (date.getDate() < 10 ? '0'+(date.getDate()) : date.getDate()) + ' ';
        var h = (date.getHours() < 10 ? '0'+(date.getHours()) : date.getHours()) + ':';
        var m = (date.getMinutes() < 10 ? '0'+(date.getMinutes()) : date.getMinutes()) + ':';
        var s = (date.getSeconds() < 10 ? '0'+(date.getSeconds()) : date.getSeconds());
        return Y + M + D + h + m + s;
    }
}
//将时间字符串转成时间戳
export function getshijiancho(dateStr){
    var newstr = dateStr.replace(/-/g,'/');
    var date = new Date(newstr);
    var time_str = date.getTime().toString();
    return time_str;
}
// 获取长度为len的随机字符串
export function getRandomString(len, val) {
    len = len || 10;
    var $chars = val; //这里除了数字还可加入字母
    var maxPos = $chars.length;
    var value = '';
    for (var i = 0; i < len; i++) {
        value += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return value;
}
//当前时间戳
export function newDate(){
    const start = new Date();
    return start.getTime();
}
//文件大小
export function getFileSize(fileByte) {
    var fileSizeByte = fileByte;
    var fileSizeMsg = "";
    if (fileSizeByte < 1048576) fileSizeMsg = (fileSizeByte / 1024).toFixed(2) + "KB";
    else if (fileSizeByte == 1048576) fileSizeMsg = "1MB";
    else if (fileSizeByte > 1048576 && fileSizeByte < 1073741824) fileSizeMsg = (fileSizeByte / (1024 * 1024)).toFixed(2) + "MB";
    else if (fileSizeByte > 1048576 && fileSizeByte == 1073741824) fileSizeMsg = "1GB";
    else if (fileSizeByte > 1073741824 && fileSizeByte < 1099511627776) fileSizeMsg = (fileSizeByte / (1024 * 1024 * 1024)).toFixed(2) + "GB";
    else fileSizeMsg = "文件超过1TB";
    return fileSizeMsg;
}
