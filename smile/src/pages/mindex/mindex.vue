<script src="mindex_main.js"></script>
<template>

  <el-container id="container">
    <el-header>
      <el-row>
        <el-col :span="24" class="headerone" v-if="header==false">
          <el-input
            :placeholder="datalist.heardlan.placeholder"
            prefix-icon="el-icon-search"
            size="mini"
          >
          </el-input>
          <span class="quXiao" @click="header=true">取消</span>
        </el-col>
        <el-col :span="8" class="headerone" v-if="header==true">
          <!--<i class="el-icon-s-unfold"></i>-->
          <el-image src="./static/mimg/mnav.png" fit="cover" class="myimg" lazy></el-image>
        </el-col>
        <el-col :span="8" class="headertwo" v-if="header==true">
          <el-image :src="heardimg" lazy></el-image>
        </el-col>
        <el-col :span="8" class="header-right headerthree" v-if="header==true">
          <span @click="header=false">
            <el-image class="myimg" src="./static/mimg/mfangda.png" fit="cover" style=" width: 20px;position: relative;right: 0.2rem;" lazy></el-image>
          </span>
          <el-dropdown trigger="click" placement="top" @command="clickLanguage">
                          <span class="el-dropdown-link">
                            <el-image class="myimg" src="./static/mimg/mmy.png" fit="cover" style=" width: 20px;" lazy></el-image>
                          </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="1">{{datalist.heardlan.language1}}</el-dropdown-item>
              <el-dropdown-item command="2">{{datalist.heardlan.language2}}</el-dropdown-item>
              <el-dropdown-item command="3">{{datalist.heardlan.language3}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

        </el-col>
      </el-row>

    </el-header>
    <el-main>
      <div id="conter">
        <article>
        <div class="swiper-container">
          <div class="swiper-wrapper">
            <div class="swiper-slide">
              <img v-if="language==1" :src="carouselA[0]" style="width: 100%;height: auto;">
              <img v-else-if="language==2" :src="carouselA[1]" style="width: 100%;height: auto;">
              <img v-else :src="carouselA[2]" style="width: 100%;height: auto;">
            </div>
            <div class="swiper-slide">
              <img v-if="language==1" :src="carouselB[0]" style="width: 100%;height: auto;">
              <img v-else-if="language==2" :src="carouselB[1]" style="width: 100%;height: auto;">
              <img  v-else :src="carouselB[2]" style="width: 100%;height: auto;">
            </div>
          </div>
          <div class="swiper-pagination"></div>
        </div>
        </article>
        <el-row class="conterpadding video">
          <el-col :span="24">
            <div style="width: 100%;">
              <!--<el-image src="./static/mimg/11.jpg" fit="cover" lazy style="margin-bottom: 0.3rem;"></el-image>-->
              <video poster="./static/img/video.jpg" controls="controls" x5-playsinline="" playsinline="true" webkit-playsinline="true" x-webkit-airplay="true" x5-video-player-type="h5" x5-video-player-fullscreen="" x5-video-orientation="portraint" style="width: 100%;" :src="videoSrc"></video>
            </div>
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline"></i>
            </div>
            <div class="videoText">
              <p class="videoText1" :class="{Regular:language != 2 }">{{datalist.video.value1}}</p>
              <p v-if="language==1 || language==3" class="videoText1 Regular" style="margin-bottom: 16px">{{datalist.video.value2}}</p>
              <p v-else class="videoText1" style="margin-bottom: 20px">{{datalist.video.value2[0]}}<br>{{datalist.video.value2[1]}}</p>
              <p class="videoText2 Light" v-if="language==1" >
                <span class="videoText2-1">{{datalist.video.value3}}</span>
                {{datalist.video.value4[0]}}<br>{{datalist.video.value4[1]}}<br>{{datalist.video.value4[2]}}
              </p>
              <p class="videoText2" v-else-if="language==2" style="letter-spacing: 1px;">
                <span class="videoText2-1">{{datalist.video.value3}}</span>
                {{datalist.video.value4[0]}}<br>{{datalist.video.value4[1]}}<br>{{datalist.video.value4[2]}}<br>{{datalist.video.value4[3]}}
              </p>
              <p class="videoText2 Light" v-else style="letter-spacing: 1px;">
                <span class="videoText2-1">{{datalist.video.value3}}</span>
                {{datalist.video.value4[0]}}<br>{{datalist.video.value4[1]}}<br>{{datalist.video.value4[2]}}<br>{{datalist.video.value4[3]}}
              <p style="font-size: 13.5px;color: #7a7a7a;line-height: 1.4;">{{datalist.video.value4[4]}}</p>
              </p>
            </div>
          </el-col>
        </el-row>
        <article class="article_1">
          <el-row style="padding: 0 0.25rem;">
            <el-col :span="8" style="padding:0 0.05rem">
              <el-image v-if="language==1" src="./static/mimg/10.jpg" style=" width: 100%;" lazy></el-image>
              <el-image v-else-if="language==2" src="./static/mimg/10.1.jpg" style=" width: 100%;" lazy></el-image>
              <el-image v-else src="./static/mimg/10.2.jpg" style=" width: 100%;" lazy></el-image>
            </el-col>
            <el-col :span="8" style="padding:0 0.05rem">
              <el-image v-if="language==1" src="./static/mimg/12.jpg" style=" width: 100%;" lazy></el-image>
              <el-image v-else-if="language==2" src="./static/mimg/12.1.jpg" style=" width: 100%;" lazy></el-image>
              <el-image v-else src="./static/mimg/12.2.jpg" style=" width: 100%;" lazy></el-image>
            </el-col>
            <el-col :span="8" style="padding:0 0.05rem">
              <el-image v-if="language==1" src="./static/mimg/13.jpg" style=" width: 100%;" lazy></el-image>
              <el-image v-else-if="language==2" src="./static/mimg/13.1.jpg" style=" width: 100%;" lazy></el-image>
              <el-image v-else src="./static/mimg/13.2.jpg" style=" width: 100%;" lazy></el-image>
            </el-col>
          </el-row>
          <p class="text1" v-if="language==1" style="font-family: 微软雅黑;">{{datalist.article_1.value1}}</p>
          <p class="text1" v-else-if="language==2" :class="{Regular:language != 2}">I SMILE ,<br>CONTINUE TO PRIDE</p>
          <p class="text1" v-else :class="{Regular:language != 2}">계속되는 자부심과 <br>함께 나는 웃는다</p>
            <i class="iconbottom" v-if="language==1"></i>
          <p class="text3 Regular" v-if="language==1">I SMILE , CONTINUE TO PRIDE</p>
          <el-row style="margin-top: 40px">
          <el-image v-if="language==1" src="./static/mimg/11.jpg" style=" width: 100%;" lazy></el-image>
          <el-image v-else-if="language==2" src="./static/mimg/11.1.jpg" style=" width: 100%;" lazy></el-image>
          <el-image v-else src="./static/mimg/11.2.jpg" style=" width: 100%;" lazy></el-image>
          </el-row>
        </article>
      <!--  <article class="article_2">
          <div class="demo-image__placeholder conterpadding">
            <div class="block">
              <div class="text0">
                <p v-if="language==3" style="line-height: 1.2;" class="text1 Regular" data-am-scrollspy="{animation: 'slide-left', delay: 100}">{{datalist.article_2.value1[0]}}<br>{{datalist.article_2.value1[1]}}</p>
                <p v-else class="text1" :class="{Regular:language != 2}" data-am-scrollspy="{animation: 'slide-left', delay: 100}">{{datalist.article_2.value1}}</p>
                <p v-if="language==2" class="text1 Regular" data-am-scrollspy="{animation: 'slide-left', delay: 100}">{{datalist.article_2.value2}}</p>
                <p v-if="language==1" class="text2 Light" data-am-scrollspy="{animation:'slide-right', delay: 600}">{{datalist.article_2.value2}}</p>
                <p class="text3" :class="{Light:language != 2}" data-am-scrollspy="{animation:'slide-bottom', delay: 100}">{{datalist.article_2.value3}}</p>
                <div class="text4" :class="{Light:language != 2}" data-am-scrollspy="{animation:'slide-bottom', delay: 100}"><a href="">{{datalist.article_2.value4}}</a></div>
              </div>
              <el-image src="./static/img/card1.jpg" fit="cover" lazy></el-image>
            </div>
          </div>
        </article>-->
        <article class="article_3">
          <el-image v-if="language==1" src="./static/mimg/14.jpg" style=" width: 100%;" lazy></el-image>
          <el-image v-else-if="language==2" src="./static/mimg/14.2.jpg" style=" width: 100%;" lazy></el-image>
          <el-image v-else src="./static/mimg/14.1.jpg" style=" width: 100%;" lazy></el-image>
          <!--<div class="demo-image__placeholder conterpadding" style="display: flex">
            <el-image src="./static/img/card2.jpg" style=" width: 50.5%;" lazy></el-image>
            <div class="marginleft textright">
              <p class="text1" :class="{Regular:language != 2}">{{datalist.article_3.value1}}</p>
              <p class="text2 Light" v-if="language==1">{{datalist.article_3.value2}}</p>
              <p class="text3" :class="{Light:language != 2}" style="margin-top: 12px;">{{datalist.article_3.value3}}</p>
              <p class="text3" :class="{Light:language != 2}">{{datalist.article_3.value4}}</p>
              <p class="text3" :class="{Light:language != 2}">{{datalist.article_3.value5}}</p>
            </div>
          </div>
          <div class="demo-image__placeholder conterpadding" style="display: flex;margin-top: 0.3rem;">
            <div class="textleft">
              <p class="text2 Light" v-if="language==1" style="margin-top: 22px;">{{datalist.article_3.value8}}</p>
              <p class="text3" :class="{Light:language != 2}" style="margin-top: 12px;">{{datalist.article_3.value6}}</p>
              <p class="text3" :class="{Light:language != 2}">{{datalist.article_3.value7}}</p>
              <p class="text1" :class="{Regular:language != 2}" style="line-height: 1;margin-top: 15px;">{{datalist.article_3.value9}}</p>
            </div>
            <el-image style=" width: 50%;" src="./static/img/card3.jpg" lazy></el-image>
          </div>-->
        </article>
        <!--<article class="article_4">
          <div class="demo-image__placeholder conterpadding">
            <div class="block">
              <div class="textone">
                <p v-if="language==1||language==3" class="text1 Regular" data-am-scrollspy="{animation: 'slide-left', delay: 100}">{{datalist.article_4.value1}}</p>
                <p v-else-if="language==2" class="text1" data-am-scrollspy="{animation: 'slide-left', delay: 100}">
                  {{datalist.article_4.value1[0]}}<br>{{datalist.article_4.value1[1]}}
                </p>
                <p v-if="language==1" class="text2 Light" data-am-scrollspy="{animation:'slide-right', delay: 600}">{{datalist.article_4.value2}}</p>
                <p class="text3" :class="{Regular:language != 2}" data-am-scrollspy="{animation:'slide-bottom', delay: 100}">{{datalist.article_4.value3}}</p>
                <div class="text4" :class="{Light:language != 2}" data-am-scrollspy="{animation:'slide-bottom', delay: 100}"><a>{{datalist.article_4.value4}}</a></div>
              </div>
              <el-image src="./static/img/card4.jpg" fit="cover" style=" width: 100%;" lazy></el-image>
            </div>
          </div>
          <div class="demo-image__placeholder conterpadding" style="margin-top: 35px;">
            <div class="block">
              <div class="texttwo">
                <p v-if="language==1||language==3" class="text1 Regular" data-am-scrollspy="{animation: 'slide-left', delay: 100}">{{datalist.article_4.value5}}</p>
                <p v-else-if="language==2" class="text1" data-am-scrollspy="{animation: 'slide-left', delay: 100}">
                  {{datalist.article_4.value5[0]}}<br>
                  {{datalist.article_4.value5[1]}}<br>
                  {{datalist.article_4.value5[2]}}
                </p>
                <p v-if="language==1" class="text2 Light" data-am-scrollspy="{animation:'slide-right', delay: 600}">{{datalist.article_4.value6}}</p>
                <p style="margin-top: 0;" class="text2 Light" v-if="language==1" data-am-scrollspy="{animation:'slide-right', delay: 600}">{{datalist.article_4.value7}}</p>
                <p class="text3" :class="{Regular:language != 2}" data-am-scrollspy="{animation:'slide-bottom', delay: 100}">{{datalist.article_4.value8}}</p>
                <div class="text4" :class="{Light:language != 2}" data-am-scrollspy="{animation:'slide-bottom', delay: 100}"><a>{{datalist.article_4.value9}}</a></div>
              </div>
              <el-image src="./static/img/card5.jpg" fit="cover" style=" width: 100%;" lazy></el-image>
            </div>
          </div>
        </article>-->
        <footer class="footer">
          <div class="footerpadding">
            <div class="text1" :class="{Light:language != 2}">{{datalist.footerText.value1}}</div>
            <div class="text2">
              <el-input
                :placeholder="datalist.footerText.value2"
                prefix-icon="el-icon-search"
                size="small"
                style=" width: 60%;"
              >
              </el-input>
            </div>
            <p :class="{Regular:language != 2}" style="height: 30px;line-height: 30px;font-size: 14px;margin-top: 30px;">{{datalist.footerText.value13}}
              <span class="weixin"><el-image src="./static/mimg/mweixin.png" style="width: 28px" lazy></el-image></span>
              <span class="weibo"><el-image src="./static/mimg/mweibo.png" style="width: 28px" lazy></el-image></span>
            </p>
            <div class="text3">
              <div class="text3-left">
                <p :class="{Regular:language != 2}"><a style="color: inherit;" href="http://www.beian.miit.gov.cn" target="_blank">{{datalist.footerText.value3}}</a></p>
                <p :class="{Regular:language != 2}">{{datalist.footerText.value4}}<span>{{datalist.footerText.value5}}</span></p>
                <p :class="{Regular:language != 2}">{{datalist.footerText.value6}}<span>{{datalist.footerText.value7}}</span></p>
              </div>
              <div class="text3-right">
                <p :class="{Regular:language != 2}">{{datalist.footerText.value8}}<span>{{datalist.footerText.value9}}</span></p>
                <p :class="{Regular:language != 2}">{{datalist.footerText.value10}}<span>{{datalist.footerText.value11}}</span></p>

              </div>
            </div>
            <div class="clear"></div>
          </div>
        </footer>
      </div>
    </el-main>
    <p id="back-to-top"><a href="#top">
      <i class="el-icon-arrow-up"></i>
      <div style="line-height: 1;margin-bottom: 2px;">TOP</div>
    </a></p>
  </el-container>
</template>

<script>
  import Vue from 'vue';
  import ElementUI from 'element-ui';
  import 'element-ui/lib/theme-chalk/index.css';
  import 'babel-polyfill'
  Vue.use(ElementUI);　　//不要忽略
  /*$(function(){
   $(".el-main").height($("html").height()-$(".el-header").height())
   })*/
  var datalist={
    "heardlan": {
      "language": "",
      "language1": "",
      "language2": "",
      "language3": ""
    },
    "banner":[
      {"url":"./static/img/carouselOneA1.jpg"},{"url":"./static/img/carouselOneA1.jpg"},{"url":"./static/img/carouselOneA1.jpg"}
    ],
    "video": {
      "value1":"重 新 定 义",
      "value2":"牙 齿 美 白 新 美 学",
      "value3":"SmileMax",
      "value4":[" 旨在重新定义社交时代牙","齿美白新美学打造属于每个人的","明星时刻闪耀人生态度。"]
    },
    "article_1":{
      "value1":"我 用 微 笑 / 继 续 骄 傲",
      "value2":[
        [{"url":"./static/img/carouselTwo1.jpg","name":"闪耀洁白牙贴","text":"TEETH WHITENING STRIPS"},
          {"url":"./static/img/carouselTwo2.jpg","name":"闪耀美牙仪","text":"TEETH WHITENING ACCELERATOR"},
          {"url":"./static/img/carouselTwo3.jpg","name":"随身美牙笔","text":"TEETH WHITENING PEN"}]
      ]
    },
    "article_2":{
      "value1":"闪耀洁白牙贴",
      "value2":"TEETH WHITENING STRIPS",
      "value3":"7对/14贴/椰子味",
      "value4":"立即购买"
    },
    "article_3":{
      "value1":"自然白",
      "value2":"Natural white",
      "value3":"含过氧化氢≤3%",
      "value4":"温和配方",
      "value5":"还原牙齿自然白度",
      "value6":"透明凝胶",
      "value7":"隐形贴合设计",
      "value8":"Invisible fit",
      "value9":"隐形贴合"
    },
    "article_4":{
      "value1":"在家享受美容院级的牙齿护理",
      "value2":"ENJOYING THE TEE TEETH SPA AT HOME",
      "value3":"7对/14贴/椰子味",
      "value4":"即将上市",
      "value5":"随时随地亮白牙齿",
      "value6":"WHITEN YOUR TEETH ANYTIME,",
      "value7":"NYWHERE",
      "value8":"随身美牙笔",
      "value9":"即将上市"
    },
    "footerText":{
      "value1":"线上商城",
      "value2":"SmileMax惠笑天猫旗舰店",
      "value3":"浙ICP备15006544号-5",
      "value4":"公司 / ",
      "value5":"惠笑(杭州)生物科技有限公司",
      "value6":"地址 / ,",
      "value7":"杭州经济科技开发区白杨街道科技园路2号5幢3层",
      "value8":"联系我们 / ",
      "value9":"+86-181 0655 4948",
      "value10":"品牌合作 / ",
      "value11":"mzl@sowow.com",
      "value12":"关注我们 / ",
      "value13":"即将上市"
    }
  };
  if(getCookie("lan")){
    var lan=getCookie("lan")
  }else{
    var lan="1";
  }
  export default {
    data() {
      return {
        header:true,
        language:lan,
        datalist:datalist,
        visible: false,
        videoSrc:"./static/video/video-01.mp4",
        heardimg:"./static/mimg/mlogo.png",
        carouselA:["./static/mimg/banner1.jpg","./static/mimg/banner2.jpg","./static/mimg/banner3.jpg"],
        carouselB:["./static/mimg/banner1.1.jpg","./static/mimg/banner2.1.jpg","./static/mimg/banner3.1.jpg"],
      }
    },
    beforeCreate: function () {

    },
    created() {
      var that=this;
      if(this.language==1){
        var jsonurl="./static/json/chs.json";
      }
      else if(this.language==2){
        var jsonurl="./static/json/en.json";
      }
      else{
        var jsonurl="./static/json/smile.json";
      }
      $.getJSON(jsonurl, function(data){
        that.datalist=data;
      });
    },
    methods: {
      ajaxdata:function(){
        var that=this;
        that.datalist=[];
        setCookie("lan",this.language)
        setTimeout(function(){
          window.location.reload();
        }, 100);
      },
      clickLanguage:function(val){
        this.language=val;
        this.ajaxdata();
      }
    },
    mounted(){

    },
  }
  function setCookie(c_name,value,expiredays)
  {
    var exdate=new Date()
    exdate.setDate(exdate.getDate()+expiredays)
    document.cookie=c_name+ "=" +escape(value)+
      ((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
  }
  function getCookie(c_name)
  {
    if (document.cookie.length>0)
    {
      var c_start=document.cookie.indexOf(c_name + "=")
      if (c_start!=-1)
      {
        c_start=c_start + c_name.length+1
        var c_end=document.cookie.indexOf(";",c_start)
        if (c_end==-1) c_end=document.cookie.length
        return unescape(document.cookie.substring(c_start,c_end))
      }
    }
    return ""
  }
  window.onscroll = window.onresize = function(){
    var oScrollTop=$(window).scrollTop();
    if ( oScrollTop > 100) {
      //$("#back-to-top").show(1000)
      $("#back-to-top").fadeIn(1500);
    }else{
      //$("#back-to-top").hide(1000)
      $("#back-to-top").fadeOut(1000);
    }
  }
</script>

