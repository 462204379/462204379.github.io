<template>
  <div id="app">
    <el-container>
      <el-header style="background: #F3F3F3;">
        <Top :current="current"/>
      </el-header>
      <el-main>
        <div class="about_1" style="position:relative;font-size: 0;">
          <img src="./assets/about_1.jpg" style="height: auto;width: 100%;">
          <div style="position: absolute;top: 40px; width: 100%;">
            <div style="text-align: center;color: #F4002D;font-size: 14px;position: relative;font-weight: bolder;top:0;">
              <div style="display: flex;width: 0;margin: 0 auto;" class="animatexian">
                <div style="height: 3px;background: #F4002D;width: 50%;margin-right: 70px;"></div>
                <div style="height: 3px;background: #F4002D;width: 50%;margin-left: 70px;"></div>
              </div>
              <div style="position: absolute;left: 50%;transform: translate(-50%,-50%);">BADU MEDIA</div>
            </div>
          </div>
          <div style="position: absolute;bottom: 0;width: 100%">
          <div style="margin: 0 auto;margin-top: 50px;" class="animatexian">
            <el-divider></el-divider>
          </div>
          </div>
        </div>
        <div class="about_3 m-case-list STRENGTH" style="padding-bottom: 45px;background: url('../../../static/img/about/about_2_bg.jpg') 0 50% no-repeat fixed;">
          <div class="about_2_1 tile_text" style="color: #2c2d2e">我们的优势<span style="color: #dd0730"> / </span>OUR  STRENGTH</div>
          <ul style="display: flex;padding-bottom: 20px;
      border-bottom: 1px solid #B4B4B5;" class="inpaddingmain">
            <li class="li_right_border">
              <img src="./assets/about_icon_1.png" alt="">
              <div>阿里巴巴金牌营销服务商</div>
            </li>
            <li class="li_right_border">
              <img src="./assets/about_icon_2.png" alt="">
              <div>品牌号服务商</div>
            </li>
            <li>
              <img src="./assets/about_icon_3.png" alt="">
              <div>阿里V任务入驻机构</div>
            </li>
          </ul>
          <ul style="display: flex;padding-top: 20px" class="inpaddingmain">
            <li class="li_right_border">
              <img src="./assets/about_icon_4.png" alt="">
              <div>京东MCN入驻机构</div>
            </li>
            <li class="li_right_border">
              <img src="./assets/about_icon_5.png" alt="">
              <div>快手MCN入驻机构</div>
            </li>
            <li>
              <img src="./assets/about_icon_6.png" alt="">
              <div>小红书入驻机构</div>
            </li>
          </ul>
        </div>
        <div class="about_2_bg" style="background: #2C2D2E;color: #fff;">
          <div class="about_2 inpaddingmain">
          <div class="tile_text" style="margin-bottom: 20px;">我们的优势<span style="color: #dd0730"> / </span>OUR ADVANTAGES</div>
          <el-row style="font-size: 0;display: flex;align-items: center;">
            <el-col style="margin-right: 5px;">
              <el-row>
                <el-col style="margin-bottom: 5px;">
                  <div style="position: relative">
                  <img class="cursorPointer" :src="about_2_1" alt="" @mouseover="about_2_Over(1)" @mouseleave="about_2_Leave(1)">
                  </div>
                </el-col>
                <el-col @mouseover="about_2_Over(2)" @mouseleave="about_2_Leave(2)">
                  <div style="position: relative" @mouseover="about_2_Over(2)" @mouseleave="about_2_Leave(2)">
                  <img :src="about_2_2" alt="" class="cursorPointer">
                  </div>
                </el-col>
              </el-row>
            </el-col>
            <el-col style="margin-right: 5px;width: 79.69%;">
              <el-row>
                <el-col>
                  <div style="position: relative" @mouseover="about_2_Over(3)" @mouseleave="about_2_Leave(3)">
                  <img :src="about_2_3" alt="" class="cursorPointer">
                  </div>
                </el-col>
              </el-row>
            </el-col>
            <el-col>
              <el-row>
                <el-col style="margin-bottom: 5px;">
                  <div style="position: relative" @mouseover="about_2_Over(4)" @mouseleave="about_2_Leave(4)">
                  <img :src="about_2_4" alt="" class="cursorPointer">
                  </div>
                </el-col>
                <el-col>
                  <div style="position: relative" @mouseover="about_2_Over(5)" @mouseleave="about_2_Leave(5)">
                  <img :src="about_2_5" alt="" class="cursorPointer">
                  </div>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </div>
        </div>
        <div class="about_3 m-case-list inpaddingmain" style="padding-bottom: 45px;background: url('../../../static/img/about/about_2_bg.jpg') 0 50% no-repeat fixed;">
          <div class="about_2_1 tile_text" style="color: #2c2d2e">我们的客户<span style="color: #dd0730"> / </span>OUR CLIENTS</div>
          <ul>
            <li class="title"><div>身心愉悦</div></li>
            <li class="title"><div>饮食愉悦</div></li>
            <li class="title"><div>居家愉悦</div></li>
            <li class="title"><div>容颜愉悦</div></li>
          <li v-for="(item,i) in about_2_img">
            <figure class="effect-lily" :class="{'effect-lily-befor': ((i+1)%4 !=0)&&((i+1)!=19)&&((i+1)!=18)&&((i+1)!=15)}">
              <img :src="item.url">
              <figcaption v-if="item.text1 != ''">
                <a></a>
                <p>
                  <span class="text">{{item.text1}}<br>{{item.text2}}</span>
                </p>
              </figcaption>
            </figure>
          </li>
          </ul>
        </div>
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
  import about_2_1 from "../../../static/img/about/about_2_1.jpg";
  import about_2_2 from "../../../static/img/about/about_2_2.jpg";
  import about_2_3 from "../../../static/img/about/about_2_3_hover.jpg";
  import about_2_4 from "../../../static/img/about/about_2_4.jpg";
  import about_2_5 from "../../../static/img/about/about_2_5.jpg";
  import about_2_1_hover from "../../../static/img/about/about_2_1_hover.jpg";
  import about_2_2_hover from "../../../static/img/about/about_2_2_hover.jpg";
  import about_2_3_hover from "../../../static/img/about/about_2_3.jpg";
  import about_2_4_hover from "../../../static/img/about/about_2_4_hover.jpg";
  import about_2_5_hover from "../../../static/img/about/about_2_5_hover.jpg";

  import logo_1 from "./assets/logo_01-1.jpg";
  import logo_2 from "./assets/logo_02-1.jpg";
  import logo_3 from "./assets/logo_03-1.jpg";
  import logo_4 from "./assets/logo_04-1.jpg";
  import logo_5 from "./assets/logo_01-2.jpg";
  import logo_6 from "./assets/logo_02-2.jpg";
  import logo_7 from "./assets/logo_03-2.jpg";
  import logo_8 from "./assets/logo_04-2.jpg";
  import logo_9 from "./assets/logo_01-3.jpg";
  import logo_10 from "./assets/logo_2-3.jpg";
  import logo_11 from "./assets/logo_3-3.jpg";
  import logo_12 from "./assets/logo_4-3.jpg";
  import logo_13 from "./assets/logo_1-4.jpg";
  import logo_14 from "./assets/logo_2-4.jpg";
  import logo_15 from "./assets/logo_3-4.jpg";
  import logo_17 from "./assets/logo_1-5.jpg";
  import logo_18 from "./assets/logo_2-5.jpg";
  import logo_none from "./assets/logo_none.jpg";

  export default {
    name: 'App',
    components: {
      Footer,
      Top
    },
    data(){
      return {
        current: "2",
        about_2_text_bg_hover:3,
        about_2_1:about_2_1,
        about_2_2:about_2_2,
        about_2_3:about_2_3,
        about_2_4:about_2_4,
        about_2_5:about_2_5,
        about_2_1_hover:about_2_1_hover,
        about_2_2_hover:about_2_2_hover,
        about_2_3_hover:about_2_3_hover,
        about_2_4_hover:about_2_4_hover,
        about_2_5_hover:about_2_5_hover,
        about_2_img:[
            {url:logo_1,text1:"全球著名的体育运动品牌",text2:'涵盖服装，鞋类，运动器材等多类目'},
            {url:logo_2,text1:"德国经典品牌，天才创意",text2:'人性化设计，成就生活中的专家'},
            {url:logo_3,text1:"源自瑞典，专注研发高端空气",text2:'净化解决方案热销全球'},
            {url:logo_4,text1:"欧莱雅集团旗下高端护肤品牌",text2:'以声波洁面代替传统手洗'},
            {url:logo_5,text1:"美国领先的家庭智能音响系统品牌",text2:'备受全球60多个国家欢迎'},
            {url:logo_6,text1:"美国经典厨电品牌",text2:'专注厨师机99年，激发你的烘焙欲望'},
            {url:logo_7,text1:"南孚，中国电池行业著名企业",text2:'选择南孚，相信持久的力量'},
            {url:logo_8,text1:"源自韩国，",text2:'E・LAND集团旗轻奢珠宝首饰品牌'},
            {url:logo_9,text1:"享誉世界的医药健康品牌",text2:'欧洲NO.1孕妇维生素及全家健康系列广受好评'},
            {url:logo_10,text1:"全球知名小家电品牌",text2:'传承70年英式品质，开启美食新纪元'},
            {url:logo_11,text1:"中国国礼丝绸品牌",text2:'用中国的礼遇，邂逅世界'},
            {url:logo_12,text1:"韩国轻奢时尚眼镜品牌",text2:''},
            {url:logo_13,text1:"lululemon: 致力于为男士女士",text2:'打造技术领先的加拿大运动服饰品牌'},
            {url:logo_14,text1:"意大利近百年经典品牌",text2:'摩卡壶十家九用，咖啡行业专家'},
            {url:logo_15,text1:"新西兰进口宠粮品牌",text2:'WDJ高度认可的宠物干粮'},
            {url:logo_none,text1:"",text2:''},
            {url:logo_17,text1:"百年品牌，英国皇室御用画材",text2:'坚持革新为每一位艺术家'},
            {url:logo_18,text1:"全球第三大烈酒集团",text2:'涵盖威士忌五大产区，囊括众多品牌'},
            {url:logo_none,text1:"",text2:''},
            {url:logo_none,text1:"",text2:''},
            ]
      }
    },
    mounted:function(){},
    methods:{
      about_2_Over(index){
        this.about_2_3 = about_2_3_hover;
        if(index===1){
          this.about_2_1 = about_2_1_hover;
        } else if(index===2) {
          this.about_2_2 = about_2_2_hover;
        } else if(index===3) {
          this.about_2_3 = about_2_3;
        } else if(index===4) {
          this.about_2_4 = about_2_4_hover;
        } else{
          this.about_2_5 = about_2_5_hover;
        }
      },
      about_2_Leave(index){
        if(index===1){
          this.about_2_1 = about_2_1;
        } else if(index===2) {
          this.about_2_2 = about_2_2;
        } else if(index===3) {
          this.about_2_3 = about_2_3;
        } else if(index===4) {
          this.about_2_4 = about_2_4;
        } else{
          this.about_2_5 = about_2_5;
        }
        this.about_2_3 = about_2_3;
      }
    }
  }
  $(function() {
    $(".animatexian").css("width", "95%");
  })
</script>

<style type="text/scss" lang="scss">
  html{
    background: #F3F3F3;
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
  .cursorPointer {
    cursor: pointer;
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
    background:#393939;
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
  .STRENGTH {
    ul {
      background: none;
      border:none;
      li {
        position: relative;
        text-align: center;
        width: 33.33%;
        img {
          height: 40px;
          width: auto;
        }
        div{
          margin-top: 10px;
          font-size: 20px;
        }
      }
      .li_right_border:after {
        content: "";
        position: absolute;
        right: 0;
        width: 1px;
        height: 60%;
        top:20%;
        background: #9B9B9D;
      }
    }
  }
</style>
