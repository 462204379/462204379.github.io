/**
 * Created by Administrator on 2020/1/9.
 */

//文件图片转base64格式图片
export function file_base64(files) {
    var reader = new FileReader();
    reader.readAsDataURL(files);//this.files[0]
    reader.onload = function(){
        console.log(reader.result); //获取到base64格式图片
    };
}

//base64转换为file
export function base64_file(dataurl, filename) {
    let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type:mime});
}

//base64转换为blob流
export function base64_blob(base64Data) {
    //console.log(base64Data);//data:image/png;base64,
    let byteString;
    if(base64Data.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(base64Data.split(',')[1]);//base64 解码
    else{
        byteString = unescape(base64Data.split(',')[1]);
    }
    let mimeString = base64Data.split(',')[0].split(':')[1].split(';')[0];//mime类型 -- image/png

    // var arrayBuffer = new ArrayBuffer(byteString.length); //创建缓冲数组
    // var ia = new Uint8Array(arrayBuffer);//创建视图
    let ia = new Uint8Array(byteString.length);//创建视图
    for(let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    let blob = new Blob([ia], {
        type: mimeString
    });
    return blob;
}

//blob流转换为base64
export function blob_base64(blob, callback) {
    let reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onload = function (e) {
        callback(e.target.result);
    };
}

//base64转canvas
export function base64_canvas(dataurl, callback){
    var canvas = document.createElement('CANVAS');
    var ctx = canvas.getContext('2d');
    var img = new Image();
    img.src = dataurl;
    img.onload = function(){
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        callback(canvas);
    };
}
