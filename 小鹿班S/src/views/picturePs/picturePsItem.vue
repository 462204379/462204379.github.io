<template>
    <div style="display: flex" id="pictureitem">
        <ul style="display: flex;margin: 0 auto;">
            <li :class="{trueclick:item === '/picturePs/index/home'}">
                <router-link to="/picturePs/index/home">小鹿班首页</router-link>
            </li>
            <li :class="{trueclick:item === '/picturePs/index/collection'}">
                <router-link to="/picturePs/index/collection">我的收藏</router-link>
            </li>
            <li :class="{trueclick:item === '/picturePs/index/works'}">
                <router-link to="/picturePs/index/works">我的作品</router-link>
            </li>
            <li :class="{trueclick: item === '/picturePs/index/template'}">
                <router-link to="/picturePs/index/template">上传模板</router-link>
            </li>
            <li :class="{trueclick: item === '/picturePs/index/myMatterD'}" style="border: none">
                <router-link to="/picturePs/index/myMatterD">我的素材库</router-link>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "PicturepsItem",
    props: {
        item: {}
    },
    created() {},
    methods: {},
    computed: {},
    mounted() {}
};
</script>

<style type="text/scss" lang="scss">
#pictureitem ul li {
    padding: 4px 40px;
    border-right: 1.5px solid #ccc;
    cursor: pointer;
}
#pictureitem a {
    color: #000;
    font-size: 18px;
    font-weight: 500;
}
#pictureitem .trueclick a {
    color: #409EFF;
}
</style>
