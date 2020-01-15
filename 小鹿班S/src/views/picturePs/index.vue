<template>
    <div>
        <picturePsItem :item="item"></picturePsItem>
        <router-view></router-view>
    </div>
</template>
<script>
import picturePsItem from "./picturePsItem.vue";
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
