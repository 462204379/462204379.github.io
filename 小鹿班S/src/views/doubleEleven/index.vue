<template>
    <div id="daping">
        <div class="tishi" style="font-size: 18px;">
            <div style="font-size: 14px;">*总金额不包含耐克，耐克儿童，乔丹，匡威</div>
            *行业排名均为二级大类，非三级产品类目
        </div>
        <div id="clock">
            <div class="money">
                <span style="font-size: 32px">￥</span><span style="font-size: 4.6vw;font-weight: 600;">
	      <span class="money1 timer count-title" data-from="1" data-to="2000" data-speed="1500" data-decimals="0"></span>
      </span>
            </div>
            <div class="tims">
                <div id="h10" class="num">
                    <div class="time hh1">1</div>
                </div>
                <div id="h0" class="num">
                    <div class="time hh2">0</div>
                </div>
                <div class="colon">:</div>
                <div id="m10" class="num">
                    <div class="time mm1">0</div>
                </div>
                <div id="m0" class="num">
                    <div class="time mm2">0</div>
                </div>
                <div class="colon">:</div>
                <div id="s10" class="num">
                    <div class="time ss1">0</div>
                </div>
                <div id="s0" class="num">
                    <div class="time ss2">0</div>
                </div>
            </div>
            <div style="font-size: 0;">
                <div class="left">
                    <ul>
                        <li class="ths">
                            <span class="th" style="width:34%;"><span class="th1">店铺</span><span class="th2">名称</span></span>
                            <span class="th" style="width:16%;"><span class="th1">行业</span><span class="th2">排名</span></span>
                            <span class="th" style="width:20%;"><span class="th1">更新</span><span class="th2">时间</span></span>
                            <span class="th" style="width:30%;text-align: left;"><span class="th1" style="padding-left: 20%;">支付</span><span class="th2">金额</span></span>
                        </li>
                        <template>
                            <li class="tds" v-for="(item,index) in datas" v-if="index < 12" :key="index">
                                <span class="td td1" style="width:34%;">
                                    <img :src="item.url" alt=""><span>{{item.shopName}}</span></span>
                                <span class="td" style="width:16%;text-align: center;font-size: 1.4vw"><span>{{item.catRank}}
                        <div style="font-size: 0.7vw">{{item.ranName}}</div>
                        </span></span>
                                <span class="td" style="width:20%;text-align: center;"><span>{{item.updateTime.split(".")[0].split(" ")[1]}}</span></span>
                                <span class="td td3" style="width:30%;"><span style="padding-left: 20%;">{{item.amount|NumFormat}}</span></span>
                            </li>
                        </template>
                    </ul>
                </div>
                <div class="right">
                    <ul>
                        <li class="ths">
                            <span class="th" style="width:34%;"><span class="th1">店铺</span><span class="th2">名称</span></span>
                            <span class="th" style="width:16%;"><span class="th1">行业</span><span class="th2">排名</span></span>
                            <span class="th" style="width:20%;"><span class="th1">更新</span><span class="th2">时间</span></span>
                            <span class="th" style="width:30%;text-align: left;"><span class="th1" style="padding-left: 20%;">支付</span><span class="th2">金额</span></span>
                        </li>
                        <template>
                            <li class="tds" v-for="(item,index) in datas" v-if="index >= 12&& index" :key="index">
                                <span class="td td1" style="width:34%;">
                                    <img :src="item.url" alt=""><span>{{item.shopName}}</span></span>
                                <span class="td" style="width:16%;text-align: center;font-size: 1.4vw"><span>{{item.catRank}}
                        <div style="font-size: 0.7vw">{{item.ranName}}</div>
                        </span></span>
                                <span class="td" style="width:20%;text-align: center;"><span>{{item.updateTime.split(".")[0].split(" ")[1]}}</span></span>
                                <span class="td td3" style="width:30%;"><span style="padding-left: 20%;">{{item.amount|NumFormat}}</span></span>
                            </li>
                        </template>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import $ from "jquery";
let timer1;
export default {
    data() {
        return {
            numsdata1: 0,
            numsdata2: 0,
            datas: [],
            endTime: "2019/11/11 23:59:59"
        };
    },
    components: {},
    beforeCreate() {
    },
    created() {
    },
    mounted() {
        var that = this;
        shishidata();
        moneydata();
        var EndTime = new Date(that.endTime);
        var NowTime = new Date();
        var t = EndTime.getTime() - NowTime.getTime();
        if(t > 0){
           timer1 = setInterval(function () {
                shishidata();
            },5000);
        }
        function shishidata(){
            that.numsdata1 = that.numsdata2;
            $.ajax({
                url: "http://122.112.230.41/back/wow/sys/tmall/findDoubleEleven",
                type: 'GET',
                dataType : "json",
                success: function (data) {
                    if (data.code === 403) {
                        this.$router.push({ path: "/login"});
                    }
                    that.numsdata2 = Number(data.totalAmount);
                    $.each(data.data,function(i,v){
                        if(v.shopName == "Merck海外店"){
                            v.shopName = "Merck海外";
                        }else if (v.shopName == "比乐蒂旗舰店"){
                            v.shopName = "比乐蒂旗舰";
                        }
                        if (v.catRank==0){
                            v.catRank = "100+"
                        } else if(v.catRank=="-1" || v.catRank==null){
                            v.catRank = "-"
                        }
                        v.url = "http://122.112.230.41/upload/dapin-img/"+v.shopName+".png";
                    });
                    that.datas=data.data;
                    moneydata();
                }
            });
        }

        function money(value){
            if(!value) return '0';
            var intPart = Number(value).toFixed(0); //获取整数部分
            var intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,'); //将整数部分逢三一断
            intPartFormat=intPartFormat.split(",");
            return intPartFormat;
        }
        function money2(value){
            if(!value) return '0';
            var intPart = Number(value).toFixed(0); //获取整数部分
            var intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{1})+$)/g, '$1,'); //将整数部分逢三一断
            intPartFormat=intPartFormat.split(",");
            return intPartFormat;
        }
        function numbMoney(obj){
            var newStr = "";
            var count = 0;
            if(obj.value.indexOf(".")==-1){
                if(obj.value.charAt(0) == '0'){ //不存在小数点时，判断第一位数字是否为0
                    obj.value = obj.value.substring(1);
                }
                for(var i=obj.value.length-1;i>=0;i--){
                    if(count % 3 == 0 && count != 0){
                        newStr = obj.value.charAt(i) + "," + newStr;
                    }
                    else{
                        newStr = obj.value.charAt(i) + newStr;
                    }
                    count++;
                }
                obj.value = newStr + ".00";
            }
            else{
                for(var i=obj.value.indexOf(".")-1;i>=0;i--){
                    if(count % 3 == 0 && count != 0){
                        newStr = obj.value.charAt(i) + "," + newStr;
                    }
                    else{
                        newStr = obj.value.charAt(i) + newStr;
                    }
                    count++;
                }
                obj.value = newStr + (obj.value + "00").substr((obj.value + "00").indexOf("."),3);
            }

        };
        function moneydata(){
            $.fn.countTo = function (options) {
                options = options || {};
                return $(this).each(function () {
                    //当前元素的选项
                    var settings = $.extend({}, $.fn.countTo.defaults, {
                        from:            that.numsdata1,
                        to:              that.numsdata2,
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
                return Number(value.toFixed(settings.decimals)).toLocaleString('en-US');
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
        };
    },
    methods: {

    },
    filters:{
        //金额自动补逗号
        NumFormat:function(value) {
            if(!value) return '0';
            var intPart = Number(value/10000).toFixed(0)+"万"; //获取整数部分
            return intPart;
        }
    },
    beforeDestroy() {
        window.clearInterval(timer1);
    }
};
var t, ss, mm, hh;
setTimeVars();//时间
function setTimeVars(){
    t = new Date();
    t = new Date();
    ss = String(t.getSeconds());
    mm = String(t.getMinutes());
    hh = String( (t.getHours()>12) ? t.getHours() : t.getHours() );
    if (ss.length==1) ss = "0"+ss;
    if (mm.length==1) mm = "0"+mm;
    if (hh.length==1) hh = "0"+hh;
}

$(".hh1").html(Number(hh.substr(0,1)))
$(".hh2").html(Number(String(hh).substr(1,1)))
$(".mm1").html(Number(mm.substr(0,1)))
$(".mm2").html(Number(String(mm).substr(1,1)))
$(".ss1").html(Number(ss.substr(0,1)))
$(".ss2").html(Number(String(ss).substr(1,1)))

// start ticking
setInterval(function(){
    setTimeVars();
    $(".hh1").html(Number(hh.substr(0,1)))
    $(".hh2").html(Number(String(hh).substr(1,1)))
    $(".mm1").html(Number(mm.substr(0,1)))
    $(".mm2").html(Number(String(mm).substr(1,1)))
    $(".ss1").html(Number(ss.substr(0,1)))
    $(".ss2").html(Number(String(ss).substr(1,1)))
}, 1000);
</script>

<style type="text/scss" lang="scss">
    *{
        padding:0;
        margin:0
    }
    html, body { width:100%; height:100%;
        margin:0; padding:0;
        background: url("../../assets/doubleEleven/sowowbg.jpg") no-repeat;
        background-size: 100% 100%;
        overflow: hidden;
    }
    #daping{
        .tishi{
            position: absolute;
            right: 1%;
            color: #fff;
            top: 2%;
        }
        #clock {
            position: absolute;
            top: 16%;
            bottom:0; left:0; right:0;
            text-align:center;
            margin: 0 2%;
            font-size: 0;
        }

        .num {
            display:inline-block;
            width: 28px;
            height: 40px;
            line-height: 36px;
            font-size: 24px;
            color:#fddd74;
            box-sizing:border-box;
            background: -webkit-linear-gradient(#f0cf8b,#f8ffee);
            background: -moz-linear-gradient(#f0cf8b,#f8ffee);
            background: linear-gradient(#f0cf8b,#f8ffee);
            border-radius:4px;
            background-clip:padding-box ;
            padding: 2px;
            text-align: center;
            margin-right: 5px;
        }
        .time{
            width: 100%;height: 100%;border-radius:4px;background: #130655;
        }
        .colon {
            display: inline-block;
            font-size: 20px;
            color: #fddd74;
            height: 40px;
            line-height:40px;
            vertical-align: top;
            text-align: center;
            margin-right: 5px;
        }
        .money{
            color: #fddd74;
            font-size: 18px;
            display: inline-block;
            position: relative;
            right: -9%;
            width: 50%;
            text-align: right;
        }
        .tims{
            display: inline-block;
            position: relative;
            top: -10px;
            left: 11%;
            width: 50%;
            text-align: left;
        }
        .money1{
            background: linear-gradient(to right, #f0cf8b, #f8ffee,#efde92);
            -webkit-background-clip: text;
            color: transparent;
        }
        .money2{
            color: #f8ffee;
        }
        .money3{
            background: linear-gradient(to right, #f8ffee, #efde92);
            -webkit-background-clip: text;
            color: transparent;
        }
        .left{
            display: inline-block;
            width: 48%;
            vertical-align: top;
        }
        .right{
            display: inline-block;
            width: 48%;
            margin-left: 2%;
            vertical-align: top;
        }
        ul{

            color: #fddd74;
        }
        ul li{
            padding: 0 0;
            list-style: none;
            margin-bottom: 10px;
        }
        ul li .th{
            width: 22%;
            display: inline-block;
            font-size: 24px;
            font-weight: 600;
        }
        ul li .td{
            width: 22%;
            display: inline-block;
            font-size: 20px;
            vertical-align: middle;
            color: #f8ffee;
        }
        ul li .td1{
            text-align: left;
        }
        ul li .td3{
            font-size: 24px;
            text-align: right;
        }
        ul li .td span{
            vertical-align: middle;
        }
        ul li .td img{
            width: 36px;
            vertical-align: middle;
            margin-right: 20px;
            margin-left: 9%;
        }
        ul .ths{
            border-bottom: 1.2px solid #f0cf8b;
            padding-bottom: 5px;
        }
        ul li .th1{
            background: linear-gradient(to right, #f0cf8b, #f8ffee);
            -webkit-background-clip: text;
            color: transparent;
        }
        ul li .th2{
            background: linear-gradient(to right, #f8ffee, #efde92);
            -webkit-background-clip: text;
            color: transparent;
        }
        @media (min-width: 1200px) {
            ul li .td{
                font-size: 1.4vw;
                text-align: left;
            }
            ul li .td3{
                font-size: 2vw;
            }
            ul li .th {
                font-size: 1.5vw;
            }
        }
        @media only screen and (max-width:1900px){
            ul li{
                margin-bottom: 7px;
            }
        }
    }
</style>
