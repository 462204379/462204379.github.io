<template>
    <div style="display: flex" id="leftNavMenu">
        <ul>
            <li :class="{trueclick:item === '/userManage/authPicturePs'}">
                <router-link to="/userManage/authPicturePs">品牌管理</router-link>
            </li>
            <!--<li :class="{trueclick:item === '/userManage/authPicturePs/cdr'}">
                <router-link to="/userManage/authPicturePs/cdr">素材分类</router-link>
            </li>-->
        </ul>
    </div>
</template>

<script>
export default {
    name: "leftNavItem",
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
#leftNavMenu {
    ul {
        width: 100%;
        text-align: center;
        margin: 10px 0;
    }
    li {
        cursor: pointer;
        padding: 10px 0;
        a:hover {
            color: #409EFF;
        }
    }
    a {
        color: #000;
        font-size: 16px;
        font-weight: 500;
        width: 100%;
    }
    .active {
        color: #409EFF;
    }
    .trueclick a {
        color: #409EFF;
    }
}
</style>
