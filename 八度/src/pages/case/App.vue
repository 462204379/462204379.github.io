<template>
  <div id="app">
    <el-container>
      <el-header style="background: #F3F3F3;z-index: 9999;">
        <Top :current="current"/>
      </el-header>
      <el-main>
        <div class="case_1" style="position:relative;font-size: 0;z-index: 999;background: #F3F3F3;">
          <img src="./assets/case01.jpg" style="height: auto;width: 100%;">
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
        <div class="case_2">
          <div class="case_2_1 marginright">
            <div class="marginbottom position">
              <img src="./assets/case_0.png" alt="" @click="alertImg=caseeurl0,dialogTableVisible=true,titleName='Merck默克-从0到1品牌建设'">
              <div class="topText">品牌建设</div>
            </div>
            <div class="marginbottom position">
              <img src="./assets/case_1.png" alt="" @click="alertImg=caseeurl1,dialogTableVisible=true,titleName='Blueair-618蓝色超能力'">
              <div class="topText">营销活动策划</div>
            </div>
            <div class="position">
              <img src="./assets/case_2.png" alt="" @click="alertImg=caseeurl2,dialogTableVisible=true,titleName='凯伍德-宝贝一生营养计划'">
              <div class="topText">社交内容种草</div>
            </div>
          </div>
          <div class="case_2_2 marginright">
            <div class="marginbottom position">
              <img src="./assets/case_3.png" alt="" @click="alertImg=caseeurl3,dialogTableVisible=true,titleName='NIKE耐克-全域营销精细化投放'">
              <div class="topText">全域传播规划</div>
            </div>
            <div class="marginbottom position">
              <img src="./assets/case_4.png" alt="" @click="alertImg=caseeurl4,dialogTableVisible=true,titleName='万事利-母亲节情感营销'">
              <div class="topText">营销活动策划</div>
            </div>
            <div class="position">
              <img src="./assets/case_5.png" alt="" @click="alertImg=caseeurl5,dialogTableVisible=true,titleName='博朗生活-四周年店庆'">
              <div class="topText">社交内容种草</div>
            </div>
          </div>
          <div class="case_2_3">
            <div class="marginbottom position">
              <img src="./assets/case_6.png" alt="" @click="alertImg=caseeurl6,dialogTableVisible=true,titleName='比乐蒂-场景化全域种草'">
              <div class="topText">全域传播规划</div>
            </div>
            <div class="marginbottom position">
              <img src="./assets/case_7.png" alt="" @click="alertImg=caseeurl7,dialogTableVisible=true,titleName='宾三得利-新零售布局'">
              <div class="topText">超级品类目</div>
            </div>
            <div class="position">
              <img src="./assets/case_8.png" alt="" @click="alertImg=caseeurl8,dialogTableVisible=true,titleName='618-九大品牌联合营销'">
              <div class="topText">联合营销</div>
            </div>
          </div>
        </div>
      </el-main>
      <el-footer>
        <Footer/>
      </el-footer>
    </el-container>
    <el-dialog :title="titleName" :visible.sync="dialogTableVisible" custom-class="alertImg" width="22%" :lock-scroll="false">
      <img :src="alertImg" alt="">
    </el-dialog>
  </div>
</template>

<script>
  import Footer from '@/components/footer.vue'
  import Top from '@/components/top.vue'

  import caseeurl0 from "./assets/case_alert_1.jpg";
  import caseeurl1 from "./assets/case_alert_0.jpg";
  import caseeurl2 from "./assets/case_alert_2.jpg";
  import caseeurl3 from "./assets/case_alert_3.jpg";
  import caseeurl4 from "./assets/case_alert_4.jpg";
  import caseeurl5 from "./assets/case_alert_5.jpg";
  import caseeurl6 from "./assets/case_alert_6.jpg";
  import caseeurl7 from "./assets/case_alert_7.jpg";
  import caseeurl8 from "./assets/case_alert_8.jpg";
  export default {
    name: 'App',
    components: {
      Footer,
      Top
    },
    data(){
      return {
        titleName: "",
        current: "3",
        dialogTableVisible:false,
        alertImg:caseeurl0,
        caseeurl0:caseeurl0,
        caseeurl1:caseeurl1,
        caseeurl2:caseeurl2,
        caseeurl3:caseeurl3,
        caseeurl4:caseeurl4,
        caseeurl5:caseeurl5,
        caseeurl6:caseeurl6,
        caseeurl7:caseeurl7,
        caseeurl8:caseeurl8
      }
    },
    methods:{

    }
  }
  $(function() {
    $(".animatexian").css("width", "95%");
    var galleryThumbs = new Swiper('.gallery-thumbs', {
      spaceBetween: 5,
      slidesPerView: 5,
      freeMode: true,
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
    });
    var galleryTop = new Swiper('.gallery-top', {
      spaceBetween: 5,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      thumbs: {
        swiper: galleryThumbs
      }
    });
    $(".gallery-thumbs .swiper-slide").hover(function () {
      galleryTop.thumbs.onThumbHover($(this).data("id"),this)
    })
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
  .inpadding{
    padding: 0 19.5%;
  }
  #app .inpaddingmain{
    padding: 0 14%;
  }
  .case_2 {
    display: flex;
    width: 1000px;
    margin: 20px auto;
    align-items: center;
    font-size: 0;
    .marginright {
      margin-right: 10px;
    }
    .marginbottom {
      margin-bottom: 10px;
    }
    .position {
      position: relative;
      cursor: pointer;
      .topText {
        position: absolute;
        left: 0;
        top:0;
        font-size: 12px;
        background: #DA000D;
        width: 90px;
        height: 30px;
        line-height: 30px;
        color: #fff;
        text-align: center;
      }
    }
  }
  /*头部内容*/
  #vapp .el-header{
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
  #vapp .el-main{
    padding: 0;
    overflow-x: hidden;
    margin-top: 60px;
  }
  .animatexian{
    width: 20%;
    transition: width 2s linear;
  }
  .el-divider {
    background-color: #F4002D;
    height: 3px;
    margin: 40px 0;
  }
  .el-divider__text{
    background: #240008;
    color: #F4002D;
    font-weight: bolder;
  }
  /* 底部内容*/
  #vapp .el-footer{
    padding: 0;
    font-size: 0;
  }
  .el-dialog__body {
    padding: 0;
  }
  .el-dialog__header {
    padding: 10px 10px 10px;
    .el-dialog__title {
      line-height: 14px;
      font-size: 14px;
      font-family: "SourceHanSansCN";
    }
  }
  .el-dialog__headerbtn{
    right: 10px;
    top: 10px;
  }
</style>
