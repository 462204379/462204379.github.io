<template>
    <div>
        <div id="myMatter">
            <matirialItem :matiriaVal="matiriaVal" @showhide="matiriaVisible=false" v-show="matiriaVisible" ref="baseInfo"></matirialItem>
        </div>
    </div>
</template>
<script>
    import $ from "jquery";
    import matirialItem from "./items/matirialItem.vue";
    export default {
        data() {
            return {
                matiriaVisible:true,
                matiriaVal: {
                    mainHeight: "",
                    conterHeight:""
                },
            }
        },
        components: {
            matirialItem
        },
        created() {
        },
        methods: {
        },
        mounted: function() {
            this.$refs.baseInfo.indexAxios();
            this.$refs.baseInfo.brandAxios();
            this.$refs.baseInfo.querySortList();
            let that = this;
            this.matiriaVal.mainHeight = $(".main").height() - $("#pictureitem").height() - 38;
            this.matiriaVal.conterHeight = this.matiriaVal.mainHeight-83-30;
            window.onresize = function () {  // 定义窗口大小变更通知事件
                that.matiriaVal.mainHeight = $(".main").height() - $("#pictureitem").height() - 38;
                that.matiriaVal.conterHeight = that.matiriaVal.mainHeight-83-30;
            };
        }
    }
</script>

<style type="text/scss" lang="scss">
#myMatter {
    .zhezhao {
        background: none;
        height: auto;
    }
    #matirialItem {
        width: 90%;
        left: 5%;
        margin-left: 0;
        top: 136px;
        .footer {
            display: none;
        }
        .conterRight {
            width: calc(100% - 200px);
            width: -webkit-calc(100% - 200px);
            width: -moz-calc(100% - 200px);
        }
    }
    .el-icon-close {
        display: none;
    }
}
</style>
