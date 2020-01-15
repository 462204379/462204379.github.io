<template>
    <el-container id="container">
      <el-header>
        <el-row>
          <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8" class="headerone">
            <!--<i class="el-icon-s-unfold"></i>-->
            <el-image src="./static/img/nav.png" fit="cover" style=" width: 30px;" lazy></el-image>
            <el-input
              :placeholder="datalist.heardlan.placeholder"
              prefix-icon="el-icon-search"
              size="mini"
            >
            </el-input>
          </el-col>
          <el-col :xs="12" :sm="12" :md="12" :lg="8" :xl="8" class="headertwo">
            <el-image :src="heardimg" lazy></el-image>
          </el-col>
          <el-col :xs="12" :sm="12" :md="12" :lg="8" :xl="8" class="header-right headerthree">
            <el-dropdown trigger="click" placement="top" @command="clickLanguage">
                          <span class="el-dropdown-link">
                            {{datalist.heardlan.language}}<i class="el-icon-arrow-down el-icon--right"></i>
                          </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="1">{{datalist.heardlan.language1}}</el-dropdown-item>
                <el-dropdown-item command="2">{{datalist.heardlan.language2}}</el-dropdown-item>
                <el-dropdown-item command="3">{{datalist.heardlan.language3}}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-image class="myimg" src="./static/img/my.png" fit="cover" style=" width: 20px;" lazy></el-image>
          </el-col>
        </el-row>

      </el-header>
     <el-main>
        <div id="conter">
          <el-carousel indicator-position="outside" class="conterpadding margintop headerBanner" :interval="3000" arrow="always" :height="bannerHeaght+'px'">
            <el-carousel-item v-for="(item,index) in datalist.banner" :key="index">
              <div class="carouselImg">
                <a href="https://m.tb.cn/h.ee5dKUO?sm=59cbbb" target="_blank">
                  <img style="width: 100%;height: auto;border: 2px solid #FDFDFD;" ref="bannerHeaght" class="carouselOneImg" :src="item.url" @load="imgLoad">
                </a>
              </div>
            </el-carousel-item>
          </el-carousel>
          <el-row class="conterpadding video">
            <el-col :span="24" style="display: flex">
              <div style="width: 60%;">
                <!--<video style="width: 100%;" :src="videoSrc" controls="controls"></video>-->
                <!--<video style="width: 100%;" controls="controls">
                  <source :src="videoSrc" type="video/mp4" />
                </video>-->
                <div class="demo-video">
                  <video class="video-js" controls
                         preload="auto" style="width: 100%">
                    <source :src="videoSrc" type='video/mp4'/>
                  </video>
                </div>
              </div>
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              <div class="videoText marginleft">
                <p class="videoText1" :class="{Regular:language != 2 }">{{datalist.video.value1}}</p>
                <p v-if="language==1 || language==3" class="videoText1 Regular" style="margin-bottom: 20px">{{datalist.video.value2}}</p>
                <p v-else class="videoText1" style="margin-bottom: 20px">{{datalist.video.value2[0]}}<br>{{datalist.video.value2[1]}}</p>
                <p class="videoText2 Light" v-if="language==1" >
                  <span class="videoText2-1">{{datalist.video.value3}}</span>
                  {{datalist.video.value4[0]}}<br>{{datalist.video.value4[1]}}<br>{{datalist.video.value4[2]}}
                </p>
                <p class="videoText2" v-else-if="language==2" style="letter-spacing: 1px;text-align: left">
                  <span class="videoText2-1">{{datalist.video.value3}}</span>
                  {{datalist.video.value4[0]}}<br>{{datalist.video.value4[1]}}<br>{{datalist.video.value4[2]}}<br>{{datalist.video.value4[3]}}
                </p>
                <p class="videoText2 Light" v-else style="letter-spacing: 1px;text-align: left">
                  <span class="videoText2-1">{{datalist.video.value3}}</span>
                  {{datalist.video.value4[0]}}<br>{{datalist.video.value4[1]}}<br>{{datalist.video.value4[2]}}<br>{{datalist.video.value4[3]}}
                  <p style="font-size: 13.5px;color: #7a7a7a;line-height: 1.4;">{{datalist.video.value4[4]}}</p>
                </p>
              </div>
            </el-col>
          </el-row>
          <article class="article_1">
            <p class="text1" v-if="language==1" style="font-family: 微软雅黑;">{{datalist.article_1.value1}}</p>
            <p class="text1" v-else :class="{Regular:language != 2}">{{datalist.article_1.value1}}</p>
            <div class="text2">
              <i class="iconbottom"></i>
            </div>
            <p class="text3 Regular" v-if="language==1">I SMILE , CONTINUE TO PRIDE</p>
          <el-carousel class="conterpadding carouselsTwo" style="margin-top: 36px" :interval="4000" :height="bannerHeaght2+'px'" arrow="always" :autoplay="false">
            <el-carousel-item v-for="(item,index) in datalist.article_1.value2" :key="index">
              <el-row :gutter="20">
                <el-col :span="8" v-for="(item,index) in item" :key="index">
                    <img  style="width: 100%;height: auto;" ref="bannerHeaght2" :src="item.url" fit="cover" @load="imgLoad2" class="image" lazy>
                    <p class="text4" :class="{Regular:language != 2}">{{item.text}}</p>
                    <div class="text5" :class="{Light:language != 2}">
                      <i class="iconbottom2"></i>
                    </div>
                    <p class="text6">{{item.name}}</p>
                </el-col>
              </el-row>
            </el-carousel-item>
          </el-carousel>
          </article>
          <article class="article_2">
          <div class="demo-image__placeholder conterpadding">
            <div class="block">
              <div class="text0">
                <p v-if="language==3" style="line-height: 1.2;" class="text1 Regular">{{datalist.article_2.value1[0]}}<br>{{datalist.article_2.value1[1]}}</p>
                <p v-else class="text1" :class="{Regular:language != 2}">{{datalist.article_2.value1}}</p>
                <p v-if="language==2" class="text1 Regular">{{datalist.article_2.value2}}</p>
                <p v-if="language==1" class="text2 Light">{{datalist.article_2.value2}}</p>
                <p class="text3" :class="{Light:language != 2}">{{datalist.article_2.value3}}</p>
                <div class="text4" :class="{Light:language != 2}"><a href="https://m.tb.cn/h.ee5dKUO?sm=59cbbb" target="_blank">{{datalist.article_2.value4}}</a></div>
              </div>
              <el-image src="./static/img/card1.jpg" fit="cover" lazy></el-image>
            </div>
          </div>
          </article>
          <article class="article_3">
          <div class="demo-image__placeholder conterpadding" style="display: flex">
            <el-image src="./static/img/card2.jpg" fit="cover" style=" width: 50.5%;" lazy></el-image>
            <div class="marginleft textright">
              <p class="text1" :class="{Regular:language != 2}">{{datalist.article_3.value1}}</p>
              <p class="text2 Light" v-if="language==1">{{datalist.article_3.value2}}</p>
              <p class="text3" :class="{Light:language != 2}" style="margin-top: 20px;">{{datalist.article_3.value3}}</p>
              <p class="text3" :class="{Light:language != 2}">{{datalist.article_3.value4}}</p>
              <p class="text3" :class="{Light:language != 2}">{{datalist.article_3.value5}}</p>
            </div>
          </div>
          <div class="demo-image__placeholder conterpadding" style="display: flex;margin-top: 40px;">
            <div class="marginleft textleft">
              <p class="text3" :class="{Light:language != 2}">{{datalist.article_3.value6}}</p>
              <p class="text3" :class="{Light:language != 2}">{{datalist.article_3.value7}}</p>
              <p class="text2 Light" v-if="language==1">{{datalist.article_3.value8}}</p>
              <p class="text1" :class="{Regular:language != 2}" style="line-height: 1;">{{datalist.article_3.value9}}</p>
            </div>
            <el-image style=" width: 50%;" src="./static/img/card3.jpg" fit="cover" lazy></el-image>
          </div>
          </article>
          <article class="article_4">
          <div class="demo-image__placeholder conterpadding">
            <div class="block">
              <!--<div class="textone">
                <p v-if="language==1||language==3" class="text1 Regular">{{datalist.article_4.value1}}</p>
                <p v-else-if="language==2" class="text1">
                {{datalist.article_4.value1[0]}}<br>{{datalist.article_4.value1[1]}}
                </p>
                <p v-if="language==1" class="text2 Light">{{datalist.article_4.value2}}</p>
                <p class="text3" :class="{Regular:language != 2}">{{datalist.article_4.value3}}</p>
                <div class="text4" :class="{Light:language != 2}"><a>{{datalist.article_4.value4}}</a></div>
              </div>-->
              <el-image v-if="language==1" src="./static/img/card4a1.jpg" fit="cover" style=" width: 100%;" lazy></el-image>
              <el-image v-else-if="language==2" src="./static/img/card4a2.jpg" fit="cover" style=" width: 100%;" lazy></el-image>
              <el-image v-else src="./static/img/card4a3.jpg" fit="cover" style=" width: 100%;" lazy></el-image>
            </div>
          </div>
          <div class="demo-image__placeholder conterpadding" style="margin-top: 35px;">
            <div class="block">
              <!--<div class="texttwo">
                <p v-if="language==1" class="text1 Regular">{{datalist.article_4.value5}}</p>
                <p v-else-if="language==2" class="text1">
                  {{datalist.article_4.value5[0]}}<br>
                  {{datalist.article_4.value5[1]}}<br>
                  {{datalist.article_4.value5[2]}}
                </p>
                <p v-else class="text1 Regular" style="">언제 어디서나<br>치아 화이트닝</p>
                <p v-if="language==1" class="text2 Light">{{datalist.article_4.value6}}</p>
                <p style="margin-top: 0;" class="text2 Light" v-if="language==1">{{datalist.article_4.value7}}</p>
                <p class="text3" :class="{Regular:language != 2}">{{datalist.article_4.value8}}</p>
                <div class="text4" :class="{Light:language != 2}"><a>{{datalist.article_4.value9}}</a></div>
              </div>-->
              <el-image v-if="language==1" src="./static/img/card4b1.jpg" fit="cover" style=" width: 100%;" lazy></el-image>
              <el-image v-else-if="language==2" src="./static/img/card4b2.jpg" fit="cover" style=" width: 100%;" lazy></el-image>
              <el-image v-else src="./static/img/card4b3.jpg" fit="cover" style=" width: 100%;" lazy></el-image>
            </div>
          </div>
          </article>
          <footer class="footer">
            <div class="footerpadding">
              <div class="text1" :class="{Light:language != 2}">{{datalist.footerText.value1}}</div>
              <div class="text2">
                <el-input
                  :placeholder="datalist.footerText.value2"
                  prefix-icon="el-icon-search"
                  size="small"
                  style=" width: 19%;"
                >
                </el-input>
              </div>
              <div class="text3">
                <div class="text3-left">
                  <p :class="{Regular:language != 2}"><a style="color: inherit;" href="http://www.beian.miit.gov.cn" target="_blank">{{datalist.footerText.value3}}</a></p>
                  <p :class="{Regular:language != 2}">{{datalist.footerText.value4}}<span>{{datalist.footerText.value5}}</span></p>
                  <p :class="{Regular:language != 2}">{{datalist.footerText.value6}}<span>{{datalist.footerText.value7}}</span></p>
                </div>
                <div class="text3-right">
                  <p :class="{Regular:language != 2}">{{datalist.footerText.value8}}<span>{{datalist.footerText.value9}}</span></p>
                  <p :class="{Regular:language != 2}">{{datalist.footerText.value10}}<span>{{datalist.footerText.value11}}</span></p>
                  <p :class="{Regular:language != 2}" style="height: 30px;line-height: 30px;">{{datalist.footerText.value12}}
                    <span class="weixin"><el-image src="./static/img/weixin.png" fit="cover" style="width: 30px" lazy></el-image></span>
                    <span class="weibo"><el-image src="./static/img/weibo.png" fit="cover" style="width: 30px" lazy></el-image></span>
                  </p>
                </div>
              </div>
              <div class="clear"></div>
            </div>
          </footer>
        </div>
     </el-main>
      <p id="back-to-top"><a href="#top">
        <i class="el-icon-arrow-up"></i>
        <div style="line-height: 1">TOP</div>
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
      "value1":"我用微笑/继续骄傲",
      "value2":"闪耀洁白牙贴",
      "value3":"闪耀美牙仪",
      "value4":"随身美牙笔"
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
        language:lan,
        datalist:datalist,
        visible: false,
        bannerHeaght:"",
        bannerHeaght2:"",
        videoSrc:"./static/video/video-01.mp4",
        heardimg:"./static/img/logo.png",
        carouselOne:[{url:"./static/img/carouselOne1.jpg"},{url:"./static/img/carouselOne1.jpg"}],
        carouselTwo:[[{url:"./static/img/carouselTwo1.jpg"},{url:"./static/img/carouselTwo2.jpg"},{url:"./static/img/carouselTwo3.jpg"}]]
      }
    },
    beforeCreate: function () {
      if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
        window.location.href="mindex.html"
        this.PC=false;
      }
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

           /*if(this.language==1){
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
            window.location.reload();
          });*/
        },
      clickLanguage:function(val){
        this.language=val;
        this.ajaxdata();
      },
      imgLoad:function(){
        var that=this;
        this.$nextTick(function(){
          that.bannerHeaght=that.$refs.bannerHeaght[0].height;
        })
      },
      imgLoad2:function(){
          var that=this;
          this.$nextTick(function(){
            that.bannerHeaght2=that.$refs.bannerHeaght2[0].height+100;
          })
      }
    },
    mounted(){
          this.imgLoad();
          this.imgLoad2();
          const that = this;
          window.addEventListener('resize', function(){
            if(that.$refs.bannerHeaght[0].height=="undefined"){
              return;
            }
            that.bannerHeaght=that.$refs.bannerHeaght[0].height;
            that.bannerHeaght2=that.$refs.bannerHeaght2[0].height+100;
            that.imgLoad();
            that.imgLoad2();
          }, false);
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

<style>
  /*a:hover{
    opacity: 1;
  }*/
</style>
