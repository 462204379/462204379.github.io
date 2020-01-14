<template>
  <div id="app">
    <el-container>
      <el-header style="background: #F3F3F3;height: 75px;">
        <Top :current="current"/>
      </el-header>
      <el-main>
        <div class="banner">
          <img src="./assets/banner.jpg" style="height: auto;width: 100%;">
        </div>
        <div class="conter">
          <img src="./assets/service-left.png" class="serviceleft">
          <img src="./assets/service-right.png" class="serviceright">
          <div class="title">招聘职位列表</div>
          <div class="text_box">
            <img src="./assets/man_1.png" alt="" class="img_main_1">
            <img src="./assets/man_2.png" alt="" class="img_main_2">
            <img src="./assets/three_3.png" alt="" class="img_main_3">
            <div class="img_bottom_1">
              <img src="./assets/bottom_1.png" alt="">
              <img src="./assets/bottom_2.png" alt="" class="img_bottom_2">
            </div>
            <img src="./assets/three_1.png" alt="" class="three_1">
            <img src="./assets/three_1.png" alt="" class="three_2">
            <img src="./assets/three_1.png" alt="" class="three_3">
            <img src="./assets/MARKET.png" alt="" class="market">
            <div class="text_main">
              <div class="text_template">
                <div class="text_template_1">
                  <div class="text_template_1_1">店铺策划</div>
                  <div class="text_template_1_2">
                    <div class="text_template_1_2_title">岗位要求</div>
                    <div>1、独立完成店铺的文案撰写：包括详情页、首页、主图、专题页、软文等文案工作 </div>
                    <div>2、独立完成页面布局规划，确保呈现效果</div>
                    <div>3、完成店铺的日常活动策划、主题策划等策划类工作;</div>
                  </div>
                  <div class="text_template_1_2">
                    <div class="text_template_1_2_title">任务要求</div>
                    <div>1、本科及以上学历，1-3年文案策划工作经验，熟悉电商行业者优先</div>
                    <div>2、拥有较强的文字功底、熟练驾驭文字和选题风格，思维活跃，逻辑缜密</div>
                    <div>3、拥有好的沟通表达能力，良好的团队协作精神、责任心及应变能力，及时跟进活动及页面；</div>
                    <div>4、对品牌策划有热情和积极性，执行力强，能承受一定的工作压力</div>
                  </div>
                </div>
                <div class="text_template_1">
                  <div class="text_template_1_1">市场营销</div>
                  <div class="text_template_1_2">
                    <div class="text_template_1_2_title">岗位要求</div>
                    <div>1、熟练掌握用户运营、产品运营、活动运营、社区运营；</div>
                    <div>2、能熟练策划线上、线下活动，实现大量增粉及购买用户的转化；</div>
                    <div>3、根据品牌实际情况制定相应线上及线下的市场计划及营销方案；</div>
                    <div>4、负责市场活动文案的策划、创意、撰写</div>
                    <div>5、具备创新思维及PPT撰写能力，能够独立策划方案及执行方案，能够完成基础品宣物料内容的规划；</div>
                  </div>
                  <div class="text_template_1_2">
                    <div class="text_template_1_2_title">任务要求</div>
                    <div>1、熟悉品牌行业，1年以上市场策划工作经验，有成功推广经验者优先</div>
                    <div>2、具有敏锐的市场洞察能力和分析能力</div>
                    <div>3、性格外向开朗，善于沟通和跨部门协作；</div>
                    <div>4、市场营销、策划、传媒、工商管理等相关专业优先，熟悉电商行业，具备产品/品牌管理经验</div>
                    <div>5、具备独立管理项目的能力，熟悉项目活动、计划、执行、控制、收尾全流程</div>
                    <div>6、良好的沟通能力和团队协作能力，有自己的市场洞察和产品敏感度</div>
                  </div>
                </div>
                <div class="text_template_1" style="margin-bottom: 0;">
                  <div class="text_template_1_1">KOL运营</div>
                  <div class="text_template_1_2">
                    <div class="text_template_1_2_title">岗位要求</div>
                    <div>1、达人运营：内外部优质达人（以小红书、抖音为主的内容平台达人）的开拓、管理、合作把控与关系维护；</div>
                    <div>2、负责小红书、抖音等平台和供应商资源对接</div>
                    <div>3、社交营销研究开拓∶研究社交营销特性和玩法，包括小红书、知乎、抖音、微博、微信等各新媒体渠道；</div>
                    <div>4、配合营销策划等小组，策划、执行营销推广活动</div>
                    <div>5、负责品牌招商引进、商务谈判，负责建立和维护品牌合作与沟通体系；</div>
                  </div>
                  <div class="text_template_1_2">
                    <div class="text_template_1_2_title">任务要求</div>
                    <div>1、拥有大量的kol资源，了解以小红书、抖音为主的内容电商的运营模式与玩法</div>
                    <div>2、沟通能力强，有影响力和说服力；灵活变通，善于资源整合和协调</div>
                    <div>3、良好的资料收集与分析能力，逻辑思维强，善长分析总结，挖掘表象背后的深层因素</div>
                    <div>4、有较强的自我驱动力、执行力、以及良好的审美能力</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
  export default {
    name: 'App',
    components: {
      Footer,
      Top
    },
    data(){
      return {
        current: "4",
      }
    },
    mounted:function(){
    },
    methods:{
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
  #app {
    .el-main {
      padding: 0;
      .title {
        font-family: "SourceHanSansCN";
        font-size: 46px;
        color: #DC3220;
        text-align: center;
        line-height: 1;
        padding: 30px 0;
      }
      .conter {
        font-family: "SourceHanSansCN";
        padding-bottom: 20px;
        position: relative;
        .serviceleft {
          position: absolute;
          left: 0;
          width: 14%;
          bottom: 178px;
        }
        .serviceright {
          position: absolute;
          right: 0;
          width: 14%;
          top: 80px;
        }
      }
      .text_box {
        border:2px solid #DC3220;
        width: 66.8%;
        margin: 0 auto;
        position: relative;
        background: #fff;
        z-index: -2;
        .text_main{
          padding: 60px 100px;
        }
        .img_main_1 {
          width: 170px;
          position: absolute;
          right: 30px;
          top: 0;
          z-index: -1;
        }
        .img_main_2 {
          width: 180px;
          position: absolute;
          left: 0;
          bottom: 193px;
          z-index: -1;
        }
        .img_main_3 {
          width: 60px;
          position: absolute;
          right: 230px;
          top: 365px;
          z-index: -1;
        }
        .img_bottom_1 {
          width: 50%;
          position: absolute;
          right: 0px;
          bottom: 0px;
          z-index: -1;
        }
        .img_bottom_2 {
          width: 20px;
          position: absolute;
          right: 46.1%;
          bottom: 65.5%;
        }
        .three_1 {
          width: 30px;
          right: 223px;
          position: absolute;
          bottom: 480px;
          z-index: -1;
        }
        .three_2 {
          width: 16px;
          right: 206px;
          position: absolute;
          bottom: 461px;
          z-index: -1;
        }
        .three_3 {
          width: 24px;
          right: 261px;
          position: absolute;
          bottom: 451px;
          z-index: -1;
        }
        .market {
          width: 50%;
          right: 50px;
          position: absolute;
          top: 504px;
          z-index: -1;
        }
        .text_template_1 {
          margin-bottom: 20px;
        }
        .text_template_1_1 {
          font-size: 30px;
          color: #DC3220;
          line-height: 1;
        }
        .text_template_1_2 {
          font-size: 14px;
          line-height: 30px;
          color: #696969;
          margin-top: 15px;
          .text_template_1_2_title {
            font-size: 18px;
            color: #DC3220;
          }
        }
      }
    }
    .el-footer {
      padding: 0;
    }
  }
</style>
