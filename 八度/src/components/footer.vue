<template>
  <div id="footer">
    <div class="left">
      <img src="../../static/img/footer_1.png" alt="">
    </div>
    <div class="center">
      <div>
        <div class="sizeColor">联系我们</div>
        <div style="margin-bottom: 9px;" class="font-weiruanyahei">CONTACT US</div>
        <a class="font-weiruanyahei" style="color: #cbcbcb" target="_blank" href="http://www.beian.miit.gov.cn">浙ICP备19004634号</a>
      </div>
      <div style="font-size: 50px;margin: 0 40px;">/</div>
      <div style="line-height: 22px">
        <div class="font-weiruanyahei">Tel:0571-88955892</div>
        <div class="font-weiruanyahei">E-mail:postmaster@badumedia.com</div>
        <div class="font-weiruanyahei">地址:杭州科技园路2号新加坡科技园5幢Leo楼3楼</div>
        <div class="font-weiruanyahei">杭州八度传媒有限责任公司</div>
      </div>
    </div>
    <div class="right">
      <img src="../../static/img/footer_2.png" alt="">
      <div style="text-align: center;font-size: 12px">微博</div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'Footer',
  data () {
    return {

    }
  }
}
</script>
<style type="text/scss" lang="scss">
  .el-footer {
    height: auto!important;
    background: #131313;
  }
  #footer {
    font-family:"SourceHanSansCN";
    display: flex;
    background: #131313;
    color: #cbcbcb;
    padding: 64px 0;
    width: 1000px;
    margin: 0 auto;
    align-items: center;
    font-size: 14.5px;
    .left {
      width: 80px;
      position: relative;
    }

    .center {
      display: flex;
      align-items: center;
      margin: 0 auto;
      position: relative;
    }
    .right {
      width: 60px;
      position: relative;
      top:5px;
    }
    .center:before {
      content: "";
      border-left: 3px solid #cbcbcb;
      position: absolute;
      left: -70px;
      height: 90%;
      top: 5%;
    }
    .center:after {
      content: "";
      border-right: 3px solid #cbcbcb;
      position: absolute;
      right: -80px;
      height: 90%;
      top: 5%;
    }
    .sizeColor{
      color: #e9e9e9;
      font-size: 19.89px;
    }
  }
</style>
