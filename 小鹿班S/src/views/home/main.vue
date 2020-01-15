<template>
    <div style="width: 100%;height: 100%;position: relative" id="bodHeight">
        <div class="mainDemo" id="demo">
            <div class="top_logo" style="color: #52A3D4">
                电商高效工具
            </div>
            <div class="nav" v-if="getAdminId">
                <a class="gv">首页</a>
                <a class="gv" @click="$router.push({ path: '/conversion/index'})">指数转化</a>
                <a class="gv" @click="$router.push({ path: '/picturePs/index/home'})">小鹿班</a>
                <a class="gv" @click="$router.push({ path: '/blueSearch/index'})">蓝海搜索词</a>
                <a class="gv" @click="$router.push({ path: '/doubleEleven/index'})">双十一</a>
            </div>
            <div class="nav" v-else>
                <a class="gv">首页</a>
                <a class="gv" @click="$router.push({ path: '/login'})">指数转化</a>
                <a class="gv" @click="$router.push({ path: '/login'})">小鹿班</a>
                <a class="gv" @click="$router.push({ path: '/login'})">蓝海搜索词</a>
                <a class="gv" @click="$router.push({ path: '/login'})">双十一</a>
            </div>
            <div class="canvaszz"> </div>
            <canvas id="canvas"></canvas>
        </div>
    </div>
</template>

<script>
import { getAdminId } from "../../utils/auth";
export default {
    data() {
        return {
            getAdminId: getAdminId(),
            stop: false
        };
    },
    created() {
        this.stop = false;
    },
    mounted(){
        let that = this;
        //宇宙特效
        var canvas = document.getElementById('canvas'),
            ctx = canvas.getContext('2d'),
            w = canvas.width = window.innerWidth,
            h = canvas.height = window.innerHeight-80,
            hue = 217,
            stars = [],
            count = 0,
            maxStars = 1300;//星星数量

        var canvas2 = document.createElement('canvas'),
            ctx2 = canvas2.getContext('2d');
        canvas2.width = 100;
        canvas2.height = 100;
        var half = canvas2.width / 2,
            gradient2 = ctx2.createRadialGradient(half, half, 0, half, half, half);
        gradient2.addColorStop(0.025, '#CCC');
        gradient2.addColorStop(0.1, 'hsl(' + hue + ', 61%, 33%)');
        gradient2.addColorStop(0.25, 'hsl(' + hue + ', 64%, 6%)');
        gradient2.addColorStop(1, 'transparent');

        ctx2.fillStyle = gradient2;
        ctx2.beginPath();
        ctx2.arc(half, half, half, 0, Math.PI * 2);
        ctx2.fill();

// End cache

        function random(min, max) {
            if (arguments.length < 2) {
                max = min;
                min = 0;
            }

            if (min > max) {
                var hold = max;
                max = min;
                min = hold;
            }

            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        function maxOrbit(x, y) {
            var max = Math.max(x, y),
                diameter = Math.round(Math.sqrt(max * max + max * max));
            return diameter / 2;
            //星星移动范围，值越大范围越小，
        }
        var Star = function() {
            this.orbitRadius = random(maxOrbit(w, h));
            this.radius = random(60, this.orbitRadius) / 8;
            //星星大小
            this.orbitX = w / 2;
            this.orbitY = h / 2;
            this.timePassed = random(0, maxStars);
            this.speed = random(this.orbitRadius) / 50000;
            //星星移动速度
            this.alpha = random(2, 10) / 10;
            count++;
            stars[count] = this;
        };
        Star.prototype.draw = function() {
            var x = Math.sin(this.timePassed) * this.orbitRadius + this.orbitX,
                y = Math.cos(this.timePassed) * this.orbitRadius + this.orbitY,
                twinkle = random(10);

            if (twinkle === 1 && this.alpha > 0) {
                this.alpha -= 0.05;
            } else if (twinkle === 2 && this.alpha < 1) {
                this.alpha += 0.05;
            }

            ctx.globalAlpha = this.alpha;
            ctx.drawImage(canvas2, x - this.radius / 2, y - this.radius / 2, this.radius, this.radius);
            this.timePassed += this.speed;
        }

        for (var i = 0; i < maxStars; i++) {
            new Star();
        }
        function animation() {
            if(that.stop){
                return;
            }
            ctx.globalCompositeOperation = 'source-over';
            ctx.globalAlpha = 0.5; //尾巴
            ctx.fillStyle = 'hsla(' + hue + ', 64%, 6%, 2)';
            ctx.fillRect(0, 0, w, h)
            ctx.globalCompositeOperation = 'lighter';
            for (var i = 1, l = stars.length; i < l; i++) {
                stars[i].draw();
            };
            //window.requestAnimationFrame(animation);
        }
        animation();
    },
    beforeDestroy() {
        this.stop = true;
    }
};
</script>

<style type="text/scss" lang="scss" scoped>
    .mainDemo{
        margin:0 auto;
        width:100%;
        height:100%;
        background-color:#000;
        position:relative;
    }
    .mainDemo canvas {
        width:100%;height:auto/*默认全屏显示 可自己设置高度640px*/;
        display:inline-block;
        z-index:-1;
    }
    .mainDemo .canvaszz{  /*用来解决视频右键菜单，用于视频上面的遮罩层*/
        width:100%;
        background-image: url(../../assets/image/in_top_bj.jpg);
        height:100%;
        position:absolute;
        z-index:10;
        filter:alpha(opacity=40);
        -moz-opacity:0.4;
        -khtml-opacity: 0.4;
        opacity: 0.4;
    }

    .audio{
        /*设置音乐显示位置*/
        width:45px;
        position:fixed;top:65px;left:94%;
        z-index:100;
        filter:alpha(opacity=30);
        -moz-opacity:0.3;
        -khtml-opacity: 0.3;
        opacity: 0.3;
    }
   .mainDemo .top_logo{
        /*background-image: url(../../assets/image/top_logo.png);*/
        margin:0 auto;
        width:750px;
        height:200px;
        position:fixed;
        z-index:30;
        top: 150px;
        left: 50%;
        margin-left: -390px;
       font-size: 70px;
       text-align: center;
    }
    .mainDemo .nav{
        height:auto;
        position:fixed;
        z-index:30;
        bottom:20%;
        left: 50%;
        margin-left: -335px;
    }
    .mainDemo .nav a.gv {
        text-decoration:none;
        background:url(../../assets/image/nav_gv.png) repeat 0px 0px;
        width: 130px;
        height: 43px;
        display: block;
        text-align:center;		/*水平居中*/
        line-height:43px;  /*上下居中*/
        cursor:pointer;
        float:left;/*左浮动*/
        margin:8px 2px 8px 2px;
        font:18px/43px 'microsoft yahei';
        color:#066197;
    }
    .mainDemo .nav a.gv span {
        display: none;
    }
    .mainDemo .nav a.gv:hover {
        background: url("../../assets/image/nav_gv.png") repeat 0px -43px;
        color:#1d7eb8;
        -webkit-box-shadow: 0 0 6px #1d7eb8;
        transition-duration: 0.5s;
    }

    .mainDemo	.topcn{
        width: 980px;
        top:200px;
        left: 50%;
        margin-left: -490px;
        position:absolute;
        z-index:20;
    }
</style>
