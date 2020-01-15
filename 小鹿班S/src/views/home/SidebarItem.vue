<template>
    <div class="sidebarlist" v-if="!item.hidden&&item.children">
        <router-link v-if="!item.hidden&&item.noDropdown" :to="item.path+'/'+item.children[0].path">
            <el-menu-item v-if="item.NAME" class="submenu-title-noDropdown" :index="item.path+'/'+item.children[0].path" style="text-align: center">
                <!--<icon-svg v-if='item.icon' :icon-class="item.icon"></icon-svg>一级菜单-->
                <div style="line-height: 20px;padding-top: 9.5px;">{{item.NAME}}</div>
                <div slot="title" style="line-height: 20px;">{{item.name}}</div>
            </el-menu-item>
            <el-menu-item v-else class="submenu-title-noDropdown" :index="item.path+'/'+item.children[0].path"><!--有子集的二级菜单-->
                <div slot="title">{{item.name}}</div>
            </el-menu-item>
        </router-link>
        <el-submenu class="nest-menu" :index="item.path" v-else-if="!item.noDropdown&&!item.hidden&&item.children.length > 0">
            <template slot="title">
                <!--<icon-svg v-if='item.icon' :icon-class="item.icon"></icon-svg>
                <span v-if='item.name' slot="title">{{item.name}}</span>-->
                <div style="text-align: center">
                    <div style="line-height: 20px;padding-top: 9.5px;">{{item.NAME}}</div>
                    <div slot="title" style="line-height: 20px;">{{item.name}}</div>
                </div>
            </template>
            <template v-for="child in item.children" v-if='!child.hidden'>
                <sidebar-item :key="child.path" v-if='child.children&&child.children.length>0' :item='child'></sidebar-item>
                <router-link :key="child.path" v-else :to="item.path+'/'+child.path" class="hover_bg">
                    <el-menu-item :index="item.path+'/'+child.path">
                        <div>
                            <icon-svg v-if='child.icon' :icon-class="child.icon"></icon-svg>
                            <span slot="title">{{child.name}}</span>
                        </div>
                    </el-menu-item>
                </router-link>
            </template>
        </el-submenu>
    </div>
</template>
<script>
export default {
    name: "SidebarItem",
    props: {
        item: {}
    },
    methods: {
        // 查找子节点是否有可显示的节点
        hasFilterChildrenHidden(children) {
            const showingChildren = children.filter(item => {
                return !item.hidden;
            });
            return showingChildren.length === 1;
        }
    },
    created() {

    }
};
</script>
<style>
    .sidebarlist{
        outline: none;
    }
    .sidebarlist .el-submenu__title:hover{
        background: none;
    }
    .sidebarlist .el-menu-item{
        outline: none;
    }
    .sidebarlist .el-menu-item:hover{
        background: none;
        color: #409EFF;
    }
    .el-submenu__title i {
        right: 0;
    }
    .header .sidebarlist .el-menu-item {
        height:59px;
        line-height: 59px;
    }
    .header .sidebarlist .el-submenu__title {
        height:59px;
        line-height: 59px;
    }
    .sidebarlist .el-menu-item.is-active {
        background: none;
    }
    .el-menu--horizontal .el-menu .el-menu-item{
        padding: 0 !important;
    }
    .el-menu--horizontal .el-menu .el-menu-item div{
        padding: 0 10px;
    }
    .el-menu--horizontal .el-menu .el-menu-item div:hover{
        color: rgb(64, 158, 255);
        background-color: #ECF5FF;
    }
</style>
