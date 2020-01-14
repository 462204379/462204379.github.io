<template>
  <el-row class="row-header">
    <el-col style="float: left;width: auto;">
      <img src="../../static/img/logo.jpg" style="float: left;height: 75px;width: auto;">
      <div class="logotext">八度传媒</div></el-col>
    <el-col class="headerNav" style="float: right;width: auto;">
      <ul>
        <li><a href="/" :class="{'current':currentchi==1}" @mouseover="onhover(1)" @mouseleave="downhover">首页</a></li>
        <li><a href="about.html" :class="{'current':currentchi==2}" @mouseover="onhover(2)" @mouseleave="downhover">关于我们</a></li>
        <li><a href="case.html" :class="{'current':currentchi==3}" @mouseover="onhover(3)" @mouseleave="downhover">案例</a></li>
        <li><a href="joinUs.html" :class="{'current':currentchi==4}" @mouseover="onhover(4)" @mouseleave="downhover">加入我们</a></li>
        <li><a href="contactUs.html" :class="{'current':currentchi==5}" @mouseover="onhover(5)" @mouseleave="downhover" style="border: none">联系我们</a></li>
      </ul>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'Top',
  data () {
    return {
      currentchi:""
    }
  },
  props: ["current"],
  mounted:function(){
    this.currentchi =  this.current;
  },
  methods:{
    onhover:function (index) {
      this.currentchi=index;
    },
    downhover:function () {
      this.currentchi=this.current;
    }
  }
}
</script>
<style type="text/scss" lang="scss">
  .el-header {
    padding: 0;
    position: fixed;
    width: 100%;
  }
  .row-header {
    width: 1000px;
    margin: 0 auto;
  }
</style>
