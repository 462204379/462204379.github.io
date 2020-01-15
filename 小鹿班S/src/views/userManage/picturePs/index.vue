<template>
    <div id="pictureManage">
        <div class="pictureManage-nav">
            <picturePsItem :item="item"></picturePsItem>
        </div>
        <div class="pictureManage-conter">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
import picturePsItem from "./items/leftNavMenu.vue";
export default {
    data() {
        return {
            item: ""
        };
    },
    components: {
        picturePsItem
    },
    created() {
        let list = [];
        this.$route.path.split("/").map((item,index) => {
            if (index < 4) {
                list.push(item);
            }
        });
        this.item = list.join("/");
    },
    methods: {},
    updated() {
        let list = [];
        this.$route.path.split("/").map((item, index) => {
            if (index < 4) {
                list.push(item);
            }
        });
        this.item = list.join("/");
    }
};
</script>
<style type="text/scss" lang="scss">
#pictureManage {
    display: flex;
    height: 100%;
    .pictureManage-nav {
        width: 160px;
        height: 100%;
        background: #F2F2F2;
        border-right: 1px solid #ccc;
        border-top: 1px solid #ccc;
    }
    .pictureManage-conter {
        width: 100%;
        height: 100%;
    }
}
</style>
