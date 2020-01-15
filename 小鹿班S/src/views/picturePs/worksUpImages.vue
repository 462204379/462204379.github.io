<template>
    <div>
        <upImgItem :upImgVal="upImgVal" @enterClick="enterClick" ref="baseInfo"></upImgItem>
    </div>
</template>
<script>
import upImgItem from "./items/upImgItem.vue";
import {
    modifyPhoto
} from "../../api/picturePs/items";
export default {
    data() {
        return {
            upImgVal: {
                okPath: "",
                activeName: "",
                worksQuery: this.$route.query.worksQuery,
                toUrl: "/picturePs/index/works/imges",
                username: this.$route.query.username,
                modelId: this.$route.query.photoId,
                width: this.$route.query.width,
                height: this.$route.query.height,
                type: 0
            }
        };
    },
    components: {
        upImgItem
    },
    created() {

    },
    mounted() {

    },
    methods: {
        enterClick(val) {
            modifyPhoto({list:val.itemlist})
                .then(response => {
                    if(response.code){
                        return;
                    }
                    if(val == 0){
                        this.$message({
                            message: '保存成功！',
                            type: 'success'
                        });
                        this.$route.query.id = response.data;
                        this.indexAxios();
                    } else {
                        this.$router.push({path: this.upImgVal.toUrl, query: JSON.parse(this.upImgVal.worksQuery)});
                    }
                })
                .catch(() => {});
        }
    },
    updated: function() {

    }
};
</script>

<style type="text/scss" lang="scss">

</style>
