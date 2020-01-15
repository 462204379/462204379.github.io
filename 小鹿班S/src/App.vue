<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
export default {
    name: "app"
};
</script>

<style type="text/scss" lang="scss">
@import "./styles/base";
@import "./assets/icons/iconfont.css";
@import "./assets/css/index.css";
html {
    height: 100%;
}
body {
    height: 100%;
    overflow: hidden;
}
#app {
    height: 100%;
}
/*路由跳转进度条*/
html #nprogress .spinner {
    display: none;
}
.backtop {
    position: fixed;
    right: 40px;
    top: 40%;
    box-shadow: 0 0 6px rgba(0,0,0,.12);
    padding: 5px;
    text-align: center;
    color: #409eff;
    cursor: pointer;
    background: #fff;
}
.backtop_bt {
    border-bottom: 1px solid #ccc;
    padding: 5px;
    padding-bottom: 10px;
}
.backtop_text {
    font-size: 12px;
    padding: 5px;
    padding-top: 10px;
}
.backtop_text p {
    color: #000;
}
.backtop_text div {
    background: #409eff;
    color: #fff;
    width: 24px;
    height: 24px;
    line-height: 24px;
    border-radius: 24px;
    margin: 0 auto;
    margin-top: 5px;
}
#app .el-main {
    margin-left: 0;
    margin-right: 0;
    padding: 0;
    background: #fff;
}
#pictureitem {
    height: 32px;
    line-height: 32px;
    margin-top: 20px;
    margin-bottom: 10px;
}
.el-dropdown-menu{
    max-height: 400px;
    overflow: auto;
}
#app .noClick {
    color: #ccc;
    cursor: auto;
}
</style>
