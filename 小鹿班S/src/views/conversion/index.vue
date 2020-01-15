<template>
    <div style="text-align: center;margin-top: 15%;">
        <a href=""  ref="viewBox" @mousewheel="rollImg(this)" :style="{'font-size':fontsize+'px'}">此功能暂未开放，请耐心等待!</a>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                fontsize: 14,
            }
        },
        created() {

        },
        methods: {
            rollImg (){
                    if (event.wheelDelta >0){
                        this.fontsize -= 1;
                    }else {
                        this.fontsize += 1;
                    }
            }
        },
        mounted (){
        }
    }
</script>

<style>

</style>
