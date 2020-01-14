<template>
  <div id="app">
    <el-container>
      <el-header style="
      background: #F3F3F3;z-index: 9999;">
        <Top :current="current"/>
      </el-header>
      <el-main>
        <div class="about_1" style="position:relative;font-size: 0;z-index: 999;">
          <img src="./assets/service01.jpg" style="height: auto;width: 100%;">
          <div style="position: absolute;top: 40px; width: 100%;">
          <div style="text-align: center;color: #F4002D;font-size: 14px;position: relative;font-weight: bolder;top:0;">
            <div style="display: flex;width: 0;margin: 0 auto;" class="animatexian">
              <div style="height: 3px;background: #F4002D;width: 50%;margin-right: 70px;"></div>
              <div style="height: 3px;background: #F4002D;width: 50%;margin-left: 70px;"></div>
            </div>
            <div style="position: absolute;left: 50%;transform: translate(-50%,-50%);">BADU MEDIA</div>
          </div>
          </div>
          <!--<div style="position: absolute;top: 0;width: 100%">
            <div style="margin: 0 auto;" class="animatexian">
              <el-divider>BADU MEDIA</el-divider>
            </div>
          </div>-->
          <div style="position: absolute;bottom: 0;width: 100%">
            <div style="margin: 0 auto;margin-top: 50px;" class="animatexian">
              <el-divider></el-divider>
            </div>
          </div>
        </div>
        <div class="service_1 inpaddingmain" style="position: relative;">
          <div class="about_1_1 tile_text">为您，我们可以做的更多<span style="color: #dd0730"> / </span>WE CAN DO MORE FOR YOU</div>
          <div class="tile_text_3">Tailored global closed-loop integrated marketing</div>
          <el-row style="font-size: 0;">
            <el-col :span="12" style="padding-right: 2px;padding-bottom: 2px">
              <img :src="service_1_1" alt="" @mouseover="service_1_Over(1)" @mouseleave="service_1_Leave(1)">
            </el-col>
            <el-col :span="12" style="padding-left: 2px;padding-bottom: 2px">
              <img :src="service_1_2" alt="" @mouseover="service_1_Over(2)" @mouseleave="service_1_Leave(2)">
            </el-col>
            <el-col :span="12" style="padding-right: 2px;padding-top: 2px">
              <img :src="service_1_3" alt="" @mouseover="service_1_Over(3)" @mouseleave="service_1_Leave(3)">
            </el-col>
            <el-col :span="12" style="padding-left: 2px;padding-top: 2px">
              <img :src="service_1_4" alt="" @mouseover="service_1_Over(4)" @mouseleave="service_1_Leave(4)">
            </el-col>
          </el-row>
          <img src="./assets/service_1_left.jpg" alt="" style="width: 15%;position: absolute;left: 0;bottom: 0">
          <img src="./assets/service_1_right.jpg" alt="" style="width: 15%;position: absolute;right: 0;top: 0">
          <div class="tile_text">为您，我们可以做的更好<span style="color: #dd0730"> / </span>WE CAN DO BETTER FOR YOU</div>
          <div class="tile_text_3">Professional supplier screening to match your best quality resources</div>
        </div>
        <div class="service_2" style="font-size: 0;">
          <div style="position: relative">
            <img src="./assets/service_2_img_1.jpg" alt="">
            <el-row class="service_2_2">
              <el-col :span="8" class="service_2_2_s">
                <div class="service_2_2_1">优质媒体供应商</div>
                <div class="service_2_2_2">Premium media provider</div>
                <div class="service_2_2_3"></div>
                <div class="service_2_2_4">
                  <div class="digital" style="display: inline-block;">
                    <div class="timer count-title" data-from="1" data-to="100" data-speed="2000" data-decimals="0"></div>
                  </div><span>+</span>
                </div>
              </el-col>
              <el-col :span="8" class="service_2_2_s">
                <div class="service_2_2_1">深度合作KOL</div>
                <div class="service_2_2_2">Deep cooperation KOL</div>
                <div class="service_2_2_3"></div>
                <div class="service_2_2_4">
                  <div class="digital" style="display: inline-block;">
                    <div class="timer count-title" data-from="1" data-to="3000" data-speed="2000" data-decimals="0"></div>
                  </div><span>+</span>
                </div>
              </el-col>
              <el-col :span="8" class="service_2_2_s">
                <div class="service_2_2_1">小红书合作达人</div>
                <div class="service_2_2_2">Cooperate with Xiaohongshu</div>
                <div class="service_2_2_3"></div>
                <div class="service_2_2_4">
                  <div class="digital" style="display: inline-block;">
                    <div class="timer count-title" data-from="1" data-to="2000" data-speed="2000" data-decimals="0"></div>
                  </div><span>+</span>
                </div>
              </el-col>
            </el-row>
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
  import service_1_1 from "../../../static/img/service/service_1_1.jpg";
  import service_1_2 from "../../../static/img/service/service_1_2.jpg";
  import service_1_3 from "../../../static/img/service/service_1_3.jpg";
  import service_1_4 from "../../../static/img/service/service_1_4.jpg";
  import service_hover_1_1 from "../../../static/img/service/service_hover_1_1.jpg";
  import service_hover_1_2 from "../../../static/img/service/service_hover_1_2.jpg";
  import service_hover_1_3 from "../../../static/img/service/service_hover_1_4.jpg";
  import service_hover_1_4 from "../../../static/img/service/service_hover_1_3.jpg";
export default {
  name: 'App',
  components: {
    Footer,
    Top
  },
  data(){
    return {
      current: "2",
      service_1_1:service_hover_1_1,
      service_1_2:service_1_2,
      service_1_3:service_1_3,
      service_1_4:service_1_4,
/*      service_hover_1_1:service_hover_1_1,
      service_hover_1_2:service_hover_1_2,
      service_hover_1_3:service_hover_1_3,
      service_hover_1_4:service_hover_1_4,*/
    }
  },
  methods:{
    service_1_Over(index){
      if(index==1){

      }
      else if(index==2){
        this.service_1_2=service_hover_1_2;
        this.service_1_1=service_1_1;
      }
      else if(index==3){
        this.service_1_3=service_hover_1_3;
        this.service_1_1=service_1_1;
      }
      else if(index==4){
        this.service_1_4=service_hover_1_4;
        this.service_1_1=service_1_1;
      }
    },
    service_1_Leave(index){
      if(index==1){

      }
      else if(index==2){
        this.service_1_2=service_1_2;
        this.service_1_1=service_hover_1_1;
      }
      else if(index==3){
        this.service_1_3=service_1_3;
        this.service_1_1=service_hover_1_1;
      }
      else if(index==4){
        this.service_1_4=service_1_4;
        this.service_1_1=service_hover_1_1;
      }
    }
  }
}
$(function(){
  $(".animatexian").css("width","95%");
  //窗口显示才加载
  var wrapTop = $(".digital").offset().top;
  var istrue = true;
  $(window).on("scroll",
    function() {
      var s = $(window).scrollTop();
      if (s > wrapTop - 500 && istrue) {
        $(".timer").each(count);
        function count(a) {
          var b = $(this);
          a = $.extend({},
            a || {},
            b.data("countToOptions") || {});
          b.countTo(a)
        };
        istrue = false;
      };
    })
//设置计数
  $.fn.countTo = function (options) {
    options = options || {};
    return $(this).each(function () {
      //当前元素的选项
      var settings = $.extend({}, $.fn.countTo.defaults, {
        from:            $(this).data('from'),
        to:              $(this).data('to'),
        speed:           $(this).data('speed'),
        refreshInterval: $(this).data('refresh-interval'),
        decimals:        $(this).data('decimals')
      }, options);
      //更新值
      var loops = Math.ceil(settings.speed / settings.refreshInterval),
        increment = (settings.to - settings.from) / loops;
      //更改应用和变量
      var self = this,
        $self = $(this),
        loopCount = 0,
        value = settings.from,
        data = $self.data('countTo') || {};
      $self.data('countTo', data);
      //如果有间断，找到并清除
      if (data.interval) {
        clearInterval(data.interval);
      };
      data.interval = setInterval(updateTimer, settings.refreshInterval);
      //初始化起始值
      render(value);
      function updateTimer() {
        value += increment;
        loopCount++;
        render(value);
        if (typeof(settings.onUpdate) == 'function') {
          settings.onUpdate.call(self, value);
        }
        if (loopCount >= loops) {
          //移出间隔
          $self.removeData('countTo');
          clearInterval(data.interval);
          value = settings.to;
          if (typeof(settings.onComplete) == 'function') {
            settings.onComplete.call(self, value);
          }
        }
      }
      function render(value) {
        var formattedValue = settings.formatter.call(self, value, settings);
        $self.html(formattedValue);
      }
    });
  };
  $.fn.countTo.defaults={
    from:0,               //数字开始的值
    to:0,                 //数字结束的值
    speed:1000,           //设置步长的时间
    refreshInterval:100,  //隔间值
    decimals:0,           //显示小位数
    formatter: formatter, //渲染之前格式化
    onUpdate:null,        //每次更新前的回调方法
    onComplete:null       //完成更新的回调方法
  };
  function formatter(value, settings){
    return value.toFixed(settings.decimals);
  }
  //自定义格式
  $('#count-number').data('countToOptions',{
    formmatter:function(value, options){
      return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
    }
  });
  //定时器
  $('.timer').each(count);
  function count(options){
    var $this=$(this);
    options=$.extend({}, options||{}, $this.data('countToOptions')||{});
    $this.countTo(options);
  }
})
</script>

<style>
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
  .inpaddingmain{
    padding: 0 15%;
  }
  .service_1 img{
    cursor: pointer;
  }
  .service_2_2{
    position: absolute;
    top: 0;
    color: #fff;
    font-size: 20px;
    text-align: center;
    width: 74%;
    height: 100%;
    left: 13%;
  }
  .service_2_2_s{
    transform: translate(0,-50%);
    position: relative;
    top: 50%;
  }
  .service_2_2_1{
    font-weight: bolder;
    font-size: 26px;
    color: #FEFEFE;
    letter-spacing: 2px;
  }
  .service_2_2_2{
    font-size: 12px;
    color: #6B6260;
    margin-top: 5px;
  }
  .service_2_2_3{
    height: 4px;
    background: #F8002A;
    width: 40px;
    margin: 0 auto;
    margin-top: 16%;
    margin-bottom: 16%;
  }
  .service_2_2_4{
    font-size: 70px;
    color: #FDFDFD;
  }
  /* 底部内容*/
  #vapp .el-footer{
    padding: 0;
    font-size: 0;
  }
</style>
