<template>
  <div id="app">
    <el-container>
      <el-header style="background: #F3F3F3;">
        <Top :current="current"/>
      </el-header>
      <el-main>
        <div class="mainTop">
          <img src="./assets/index01.png" alt="">
        </div>
        <div class="service">
          <img src="./assets/service-left.jpg" alt="" style="width: 19.5%;height: auto;bottom: 0;left: 0px;position: absolute;">
          <img src="./assets/service-right.jpg" alt="" style="width: 16%;height: auto;top: 0;right: 0px;position: absolute;">
          <div class="text">我们的服务<span style="color: #dd0730"> / </span>OUR SERVICE</div>
          <div class="texttwo">Focus on the implementation of brand e-commerce marketing</div>
          <el-row class="inpadding" style="font-size: 0;">
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <el-row :style="{'padding-bottom':servicep}">
                <el-col :span="6" style="width:34.74%;" :style="{'padding-right':servicep}" class="servicep1">
                  <img :src="serviceurl1" alt="" @click="alertImgClick(alertImg1,titleName='从0到1品牌塑造')" @mouseover="mouseOver(1)" @mouseleave="mouseLeave(1)">
                </el-col>
                <el-col :span="18" style="width: 65.26%;" :style="{'padding-left':servicep}">
                  <el-row>
                    <el-col :style="{'padding-bottom':servicep}" class="servicep2">
                      <img :src="serviceurl2" alt="" @click="alertImgClick(alertImg5,titleName='营销活动策划')" @mouseover="mouseOver(2)" @mouseleave="mouseLeave(2)">
                    </el-col>
                    <el-col>
                      <el-row class="servicep3" :style="{'padding-top':servicep}">
                        <el-col :span="12" style="width: 49.6%" :style="{'padding-right':servicep}">
                          <img :src="serviceurl3" alt="" @click="alertImgClick(alertImg3,titleName='全域传播规则')" @mouseover="mouseOver(3)" @mouseleave="mouseLeave(3)">
                        </el-col>
                        <el-col :span="12" style="width: 50.4%" :style="{'padding-left':servicep}">
                          <img :src="serviceurl4" alt="" @click="alertImgClick(alertImg4,titleName='社交内容种草')" @mouseover="mouseOver(4)" @mouseleave="mouseLeave(4)">
                        </el-col>
                      </el-row>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
              <el-row :style="{'padding-top':servicep}">
                <el-col :span="24" style="width: 100%">
                  <img :src="serviceurl5" alt="" @click="alertImgClick(alertImg2,titleName='电商店铺装修')" @mouseover="mouseOver(5)" @mouseleave="mouseLeave(5)">
                </el-col>
              </el-row>

            </el-col>

          </el-row>
          <div class="text">我们的集团<span style="color: #dd0730"> / </span>THE GROUP WE SERVE</div>
          <div class="texttwo">Focus on the implementation of brand e-commerce marketing</div>
        </div>
        <div class="group">
          <div id="wrap">
            <ul id="list">
              <li><img src="./assets/group02.jpg" alt="" style="height: 224px;width: 100%"></li>
              <li><img src="./assets/group02.jpg" alt="" style="height: 224px;width: 100%"></li>
            </ul>
          </div>
        </div>
        <div class="case" style="position: relative;">
          <div class="text">案例展示<span style="color: #dd0730"> / </span>CASE PRESENTATION</div>
          <div class="texttwo">Focus on the implementation of brand e-commerce marketing</div>
          <img src="./assets/case-left.jpg" alt="" style="width: 18%;height: auto;bottom: 0;left: 0px;position: absolute;">
          <img src="./assets/case-right.jpg" alt="" style="width: 18%;height: auto;top: 0;right: 0px;position: absolute;">
          <el-row class="inpadding" style="font-size: 0;">
                <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8" style="width: 33.2%;padding: 5px;">
                  <img :src="caseurl1" alt="" @mouseover="caseOver(1)" @mouseleave="caseLeave(1)">
                </el-col>
                <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8" style="width: 33.2%;padding: 5px;">
                  <img :src="caseurl2" alt="" @mouseover="caseOver(2)" @mouseleave="caseLeave(2)">
                </el-col>
                <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8" style="width: 33.6%;;padding: 5px;">
                  <img :src="caseurl3" alt="" @mouseover="caseOver(3)" @mouseleave="caseLeave(3)">
                </el-col>
                <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8" style="width: 33.2%;padding: 5px;">
                  <img :src="caseurl4" alt="" @mouseover="caseOver(4)" @mouseleave="caseLeave(4)">
                </el-col>
                <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8" style="width: 33.2%;padding: 5px;">
                  <img :src="caseurl5" alt="" @mouseover="caseOver(5)" @mouseleave="caseLeave(5)">
                </el-col>
                <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8" style="width: 33.6%;padding: 5px;">
                  <a href="case.html">
                    <img :src="caseurl6" alt="">
                  </a>
                </el-col>
          </el-row>
          <p class="inpadding" style="text-align: right;margin: 10px; margin-bottom: 0;padding-bottom: 10px;font-size: 12px;font-weight: 600;cursor: pointer;"><a href="case.html">查看更多>></a></p>
        </div>
      </el-main>
      <el-footer>
        <Footer/>
      </el-footer>
    </el-container>
    <el-dialog :title="titleName" :visible.sync="dialogTableVisible" custom-class="alertImg" :lock-scroll="false" width="60%">
      <img :src="alertImg">
    </el-dialog>
  </div>
</template>

<script>
  import Footer from '@/components/footer.vue'
  import Top from '@/components/top.vue'
  import serviceurl1 from "../../../static/img/index/service01.jpg";
  import serviceurl2 from "../../../static/img/index/service02.jpg";
  import serviceurl3 from "../../../static/img/index/service03.jpg";
  import serviceurl4 from "../../../static/img/index/service04.jpg";
  import serviceurl5 from "../../../static/img/index/service05.jpg";
  import serviceurl6 from "../../../static/img/index/service06.jpg";
  import serviceurl11 from "../../../static/img/index/service11.jpg";
  import serviceurl12 from "../../../static/img/index/service12.jpg";
  import serviceurl13 from "../../../static/img/index/service13.jpg";
  import serviceurl14 from "../../../static/img/index/service14.jpg";
  import serviceurl15 from "../../../static/img/index/service15.jpg";
  import serviceurl16 from "../../../static/img/index/service16.jpg";

  import caseurl1 from "../../../static/img/index/case01.jpg";
  import caseurl2 from "../../../static/img/index/case12.jpg";
  import caseurl3 from "../../../static/img/index/case03.jpg";
  import caseurl4 from "../../../static/img/index/case04.jpg";
  import caseurl5 from "../../../static/img/index/case05.jpg";
  import caseurl6 from "../../../static/img/index/case06.jpg";
  import caseurl11 from "../../../static/img/index/case11.jpg";
  import caseurl12 from "../../../static/img/index/case02.jpg";
  import caseurl13 from "../../../static/img/index/case13.jpg";
  import caseurl14 from "../../../static/img/index/case14.jpg";
  import caseurl15 from "../../../static/img/index/case15.jpg";

  import alertImg1 from "../../../static/img/index/alert_1.jpg";
  import alertImg2 from "../../../static/img/index/alert_2.jpg";
  import alertImg3 from "../../../static/img/index/alert_3.jpg";
  import alertImg4 from "../../../static/img/index/alert_4.jpg";
  import alertImg5 from "../../../static/img/index/alert_5.jpg";
export default {
  name: 'App',
  components: {
    Footer,
    Top
  },
  data(){
    return {
      titleName: "",
      alertImg1: alertImg1,
      alertImg2: alertImg2,
      alertImg3: alertImg3,
      alertImg4: alertImg4,
      alertImg5: alertImg5,
      alertImg:alertImg1,
      dialogTableVisible:false,
      current:"1",
      servicep:"3.23px",
      serviceurl1:serviceurl1,
      serviceurl2:serviceurl2,
      serviceurl3:serviceurl3,
      serviceurl4:serviceurl4,
      serviceurl5:serviceurl5,
      serviceurl6:serviceurl6,
      caseurl1:caseurl1,
      caseurl2:caseurl2,
      caseurl3:caseurl3,
      caseurl4:caseurl4,
      caseurl5:caseurl5,
      caseurl6:caseurl6,
    }
  },
  beforeMount:function(){

  },
  mounted:function(){
      var that=this;
    $(window).resize(function(){
      that.servicep=($(".servicep1").height()-$(".servicep2").height()-$(".servicep3").height())/2+"px";
    })
  },
  methods:{
    alertImgClick (url){
        this.dialogTableVisible = true;
        this.alertImg = url;
    },
    getimg:function(){
      this.servicep=($(".servicep1").height()-$(".servicep2").height()-$(".servicep3").height())/2+"px";
    },
    mouseOver:function(index){
      if(index==1){
        this.serviceurl1=serviceurl11;
        this.serviceurl3=serviceurl13;
      }
      else if(index==2){
        this.serviceurl2=serviceurl12;
        this.serviceurl3=serviceurl13;
      }
      else if(index==3){
        this.serviceurl3=serviceurl3;
      }
      else if(index==4){
        this.serviceurl4=serviceurl14;
        this.serviceurl3=serviceurl13;
      }
      else if(index==5){
        this.serviceurl5=serviceurl15;
        this.serviceurl3=serviceurl13;
      } else if (index==6){
        this.serviceurl6=serviceurl16;
        this.serviceurl3=serviceurl13;
      }
    },
    mouseLeave:function(index){
      if(index==1){
        this.serviceurl1=serviceurl1;
        this.serviceurl3=serviceurl3;
      }
      else if(index==2){
        this.serviceurl2=serviceurl2;
        this.serviceurl3=serviceurl3;
      }
      else if(index==3){
        this.serviceurl3=serviceurl3;
      }
      else if(index==4){
        this.serviceurl4=serviceurl4;
        this.serviceurl3=serviceurl3;
      }
      else if(index==5){
        this.serviceurl5=serviceurl5;
        this.serviceurl3=serviceurl3;
      }
      else{
        this.serviceurl6=serviceurl6;
        this.serviceurl3=serviceurl3;
      }
    },
    caseOver:function(index){
      if(index==1){
        this.caseurl1=caseurl11;
        this.caseurl2=caseurl12;
      }
      else if(index==2){
        this.caseurl2=caseurl2;
      }
      else if(index==3){
        this.caseurl3=caseurl13;
        this.caseurl2=caseurl12;
      }
      else if(index==4){
        this.caseurl4=caseurl14;
        this.caseurl2=caseurl12;
      }
      else if(index==5){
        this.caseurl5=caseurl15;
        this.caseurl2=caseurl12;
      }
    },
    caseLeave:function(index){
      if(index==1){
        this.caseurl1=caseurl1;
        this.caseurl2=caseurl2;
      }
      else if(index==2){
        this.caseurl2=caseurl2;
      }
      else if(index==3){
        this.caseurl3=caseurl3;
        this.caseurl2=caseurl2;
      }
      else if(index==4){
        this.caseurl4=caseurl4;
        this.caseurl2=caseurl2;
      }
      else if(index==5){
        this.caseurl5=caseurl5;
        this.caseurl2=caseurl2;
      }
    },
  },
  updated: function () {

  }
}
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
.inpadding{
  padding: 0 19.5%;
}
/*头部内容*/
.el-header{
  height: auto !important;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 999;
}

.headerNav ul li{
 display: inline-block;
}

.el-image__inner{
  height: 50px;
  width: auto;
}
/*身体内容*/
  .el-main{
    padding: 0;
    overflow-x: hidden;
    margin-top: 60px;
  }
  .mainTop{
    font-size: 0;
  }
  .service{
    position: relative;
  }

  .service .text{
    text-align: center;
    font-size: 28px;
    padding-top: 45px;
    font-weight: bolder;
  }
  .service .texttwo{
    font-size: 14px;
    color: #7e7e7e;
    text-align: center;
    padding-bottom: 30px;
  }
  .service,.case img{
    cursor: pointer;
  }

  .group .text{
    text-align: center;
    font-size: 28px;
    margin-top: 30px;
  }
  .group .texttwo{
    font-size: 14px;
    color: #7e7e7e;
    text-align: center;
    margin-bottom: 30px;
  }

  .case .text{
    text-align: center;
    font-size: 28px;
    padding-top: 45px;
    font-weight: bolder;
  }
  .case .texttwo{
    font-size: 14px;
    color: #7e7e7e;
    text-align: center;
    margin-bottom: 30px;
  }
 /* 底部内容*/
  .el-footer{
    padding: 0;
    font-size: 0;
  }
/*广告轮播图*/
  #wrap{
    width: 5303px;
    height: 224px;
    position: relative;
    overflow: hidden;
  }
  #list{
    position: absolute;
    left: 0;
    top: 0;
    margin: 0;
    padding: 0;
    -webkit-animation: 40s move infinite linear;
    width: 200%;
  }
  #list li {
    list-style: none;
    background: #000;
    color: #fff;
    text-align: center;
    float: left;
    font-size: 0;
  }
  @keyframes move {
    0% {
      transform: translateX(0);
      -ms-transform: translateX(0);
      -moz-transform: translateX(0);
      -webkit-transform: translateX(0);
      -o-transform: translateX(0);
    }
    100% {
      transform: translateX(-5303px);
      -ms-transform: translateX(-5303px);
      -moz-transform: translateX(-5303px);
      -webkit-transform: translateX(-5303px);
      -o-transform: translateX(-5303px);
    }
  }
  @-webkit-keyframes move{
    0% {
      transform: translateX(0);
      -ms-transform: translateX(0);
      -moz-transform: translateX(0);
      -webkit-transform: translateX(0);
      -o-transform: translateX(0);
    }
    100% {
      transform: translateX(-5303px);
      -ms-transform: translateX(-5303px);
      -moz-transform: translateX(-5303px);
      -webkit-transform: translateX(-5303px);
      -o-transform: translateX(-5303px);
    }
  }
  @-moz-keyframes move{
    0% {
      transform: translateX(0);
      -ms-transform: translateX(0);
      -moz-transform: translateX(0);
      -webkit-transform: translateX(0);
      -o-transform: translateX(0);
    }
    100% {
      transform: translateX(-5303px);
      -ms-transform: translateX(-5303px);
      -moz-transform: translateX(-5303px);
      -webkit-transform: translateX(-5303px);
      -o-transform: translateX(-5303px);
    }
  }
  @-o-keyframes move {
    0% {
      transform: translateX(0);
      -ms-transform: translateX(0);
      -moz-transform: translateX(0);
      -webkit-transform: translateX(0);
      -o-transform: translateX(0);
    }
    100% {
      transform: translateX(-5303px);
      -ms-transform: translateX(-5303px);
      -moz-transform: translateX(-5303px);
      -webkit-transform: translateX(-5303px);
      -o-transform: translateX(-5303px);
    }
  }
  #wrap:hover #list {
    animation-play-state:paused;
    -ms-animation-play-state:paused;/*动画暂停播放*/
    -moz-animation-play-state:paused;/*动画暂停播放*/
    -webkit-animation-play-state:paused;/*动画暂停播放*/
    -o-animation-play-state:paused;/*动画暂停播放*/
  }
  .alertImg {
    .el-image__inner {
      width: 100%;
      height: auto;
    }
    .el-dialog__body {
      padding: 0px 20px 20px;
    }
  }
</style>
