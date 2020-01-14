<template>
  <div id="app">
    <el-container>
      <el-header style="background: #F3F3F3;height: 75px;">
        <Top :current="current"/>
      </el-header>
      <div class="border"></div>
      <el-main>
        <div class="contactUs">
          <div class="contactLeft">
            <div class="text_1">八度传媒有限公司</div>
            <div class="text_2">-TEL: <span>0571-88955892</span></div>
            <div class="text_3">-Email: <span>postmaster@badumedia.com</span></div>
            <div class="text_4">-Address: <span>杭州市江干区下沙科技园路2号新加坡科技园5幢leo3楼</span></div>
            <div class="text_5">
              <div class="text_5_left">-微博:@八度传媒微博</div>
              <div class="text_5_right"><img src="../../../static/img/footer_2.png" alt=""></div>
            </div>
          </div>
          <div class="contactRight">
            <a href="/"><img src="./assets/contact-right.jpg" alt=""></a>
          </div>
        </div>
        <div id="containerMap"></div>
      </el-main>
      <el-footer>
        <Footer/>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
  import Footer from '@/components/footer.vue'
  import Top from '@/components/top.vue'
  export default {
    name: 'App',
    components: {
      Footer,
      Top
    },
    data(){
      return {
        current: "5",
      }
    },
    mounted:function(){

     this.initAMap()
    },
    methods:{
       initAMap() {
         var map = new AMap.Map('containerMap',{
           resizeEnable: true,
           center: [120.370343,30.302891],
           zoom: 25
         });
         // 创建一个 Marker 实例：
         var marker = new AMap.Marker({
           position: new AMap.LngLat(120.370343,30.302891),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
           title: '浙江八度传媒'
         });
        // 将创建的点标记添加到已有的地图实例：
         map.add(marker);
        //构建信息窗体中显示的内容
         var info = [];
         info.push("<div class='input-card content-window-card' >");
         info.push("<div><h4 style='margin-bottom: 5px;'>八度传媒</h4>");
         info.push("<p class='input-item'>电话 : 86-85110973  邮编 : 310016</p>");
         info.push("<p class='input-item'>地址 : 杭州市江干区下沙科技园路2号新加坡科技园5幢leo楼3楼</p></div></div>");
         var infoWindow = new AMap.InfoWindow({
           offset: new AMap.Pixel(0, -35),
           content: info.join("")  //使用默认信息窗体框样式，显示信息内容
         });
         infoWindow.open(map, map.getCenter());
      }
    }
  }

</script>

<style type="text/scss" lang="scss">
  html{
    background: #F3F3F3;
  }
  body {
    min-width: 1000px;
    overflow-x: hidden;
  }
  img{
    width: 100%;height: auto;
  }
  .current{
    color: #dd0730;
  }
  #app .inpadding{
    padding: 0 19.5%;
  }
  #app .inpaddingmain{
    padding: 0 15%;
  }
  #app .el-image__inner {
    height: auto;
    width: 100%;
  }
  /*头部内容*/
  .headerNav ul li{
    display: inline-block;
  }
  .el-image__inner{
    height: 50px;
    width: auto;
  }
  .animatexian{
    width: 20%;
    transition: width 4s linear;
  }
  #app .el-divider {
    background-color: #F4002D;
    height: 3px;
    margin: 40px 0;
  }
  #app .el-divider__text{
    background: #240107;
    color: #F4002D;
    font-weight: bolder;
  }
  .about_2_1{
    padding-bottom: 45px;
  }
  .about_2_text_bg{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    cursor: pointer;
  }
  .about_2_text{
    position: absolute;
    top: 50%;
    width: 100%;
    font-size: 18px;
    color: #FEFEFE;
    text-align: center;
    transform: translate(0,-50%);
    cursor: pointer;
  }
  .about_2_text span{
    display: inline-block;
    font-size: 26px;
  }
  .about_2_text_border{
    height: 1.8px;
    background: #FEFEFE;
    margin: 4px auto;
  }
  .about_2_text_border2{
    height: 2.4px;
    background: #FEFEFE;
    width: 40%;
    margin: 30px auto;
  }
  .about_2_text_bg_hover{
    background: #CA0A2F;
    opacity: 0.8;
  }

  .about_2_bg{
    overflow: hidden;
    padding-bottom: 45px;
  }


  .about_3{
    background: #2C2D2E;
    padding-bottom: 45px;
  }
  .about_3 ul{
    border:1px solid #A9A9A9;
    font-size: 0;
    background: #000;
  }
  .about_3 .title{
    font-size: 14px;
    color: #D7D7D8;
    text-align: center;
    margin-top: 20px;
    margin-bottom: 20px;
    font-weight: 600;
  }
  .about_3 .title div{
    width: 50%;
    margin: 0 auto;
    height: 24px;
    line-height: 24px;
    border-radius: 24px;
    background: #E5002D;
    cursor: pointer;
  }
  .about_3 .title div:hover{
    background:#D4D4D5;
    color: #E5002D;
  }
  .m-case-list li {
    margin: 10px 0;
    width: 25%;
    display: inline-block;
    position: relative;
    /*border-right: 1px solid #A9A9A9;*/
  }
  .m-case-list li .effect-lily-befor:before{
    /*content: "";*/
    display: block;
    position: absolute;
    right: 0;
    height: 100%;
    width: 1.5px;
    background: #A9A9A9;
    z-index: 9;
  }
  .m-case-list li .effect-lily-befor{
    border-right: 1px solid #A9A9A9;
  }
  .m-case-list li figure {
    margin-bottom: 0;
    position: relative;
    z-index: 1;
    display: inline-block;
    overflow: hidden;
    background: #2C2D2E;
    text-align: center;
    cursor: pointer;
  }
  .m-case-list li figure img {
    position: relative;
    display: block;
  }
  .m-case-list li figure figcaption {
    color: #fff;
    text-transform: uppercase;
    font-size: 12px;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
  }
  .m-case-list li figure figcaption::before, .m-case-list li figure figcaption::after {
    pointer-events: none;
  }
  .m-case-list li figure figcaption, .m-case-list li figure a {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .m-case-list li figure a {
    z-index: 99;
    text-indent: 200%;
    white-space: nowrap;
    font-size: 0;
    opacity: 0;
    background: #fff;
  }
  figure.effect-lily figcaption {
    top: auto;
    bottom: 0;
  }
  figure.effect-lily p {
    -webkit-transform: translate3d(0, 100%, 0);
    transform: translate3d(0, 100%, 0);
  }
  figure.effect-lily a {
    -webkit-transform: translate3d(0, 100%, 0);
    transform: translate3d(0, 100%, 0);
    -webkit-transition: opacity 0.2s, -webkit-transform 0.35s;
    transition: opacity 0.2s, transform 0.35s;
  }
  figure.effect-lily p {
    color: #000;
    font-size: 10px;
    opacity: 1;
    width: 100%;
    height:100%;
    -webkit-transition: opacity 0.2s, -webkit-transform 0.35s;
    transition: opacity 0.2s, transform 0.35s;
    position: absolute;
  }
  figure.effect-lily:hover p {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
    color: #000;
    opacity: 1;
    z-index: 1000;
  }
  figure.effect-lily:hover a{
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
    opacity: 0.8;
    background: #fff;
  }

  figure.effect-lily:hover p {
    -webkit-transition-delay: 0.05s;
    transition-delay: 0.05s;
    -webkit-transition-duration: 0.35s;
    transition-duration: 0.35s;
  }
  figure.effect-lily:hover a {
    -webkit-transition-delay: 0.05s;
    transition-delay: 0.05s;
    -webkit-transition-duration: 0.35s;
    transition-duration: 0.35s;
  }
  .effect-lily .text{
    display: inline-block;
    transform: translate(0,-50%);
    position: relative;
    top: 50%;
    width: 100%;
    text-align: center;
  }
  #containerMap {
    width: 1050px;
    height: 400px;
    margin: 30px auto;
  }
  .amap-info-close {
    right: 5px !important;
  }
  #app {
    .border {
      border-top: 2px solid #DB072E;
      z-index: 99;
      margin-top: 75px;
    }
    .contactUs {
      display: flex;
      width: 1050px;
      margin: 0 auto;
    }
    .el-footer {
      padding: 0;
    }
  }
  .contactLeft {
    color: #262626;
    font-family: "SourceHanSansCN";
    span {
      color: #747474;
    }
    .text_1 {
      width: 100%;
      font-size: 22px;
      border-bottom: 2px solid #D4D4D4;
      padding-bottom: 25px;
    }
    .text_2 {
      padding: 20px 0;
    }
    .text_4 {
      border-bottom: 2px solid #D4D4D4;
      padding-top: 20px;
      padding-bottom: 25px;
    }
    .text_5 {
      padding-top: 20px;
      display: flex;
      align-items: center;
      font-size: 18px;
      .text_5_right {
        width: 50px;
        margin-left: 60px;
      }
    }
  }
  .contactRight {
    padding-left: 10%;
    flex: 1;
    color: #4F4F4F;
    img {
      border-radius: 4px;
    }
  }
  #app .el-main {
    margin-top: 0;
    background: #fff;
    padding-top: 75px;
  }
</style>
