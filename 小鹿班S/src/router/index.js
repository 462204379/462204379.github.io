import Vue from "vue";
import VueRouter from "vue-router";

if (process.env.NODE_ENV === "development") {
    Vue.use(VueRouter);
}

//import { ROUTER_MODE } from "../config/app";

import Home from "../views/home/index.vue";

// 管理组相关
/*import adminRouter from "../views/userManage/admin/router.vue";*/
import authAdmin from "../views/userManage/admin/authAdmin.vue";
import authRole from "../views/userManage/admin/authRole.vue";
import authPermissionRule from "../views/userManage/admin/authPermissionRule.vue";
//指数转化
import conversion from "../views/conversion/index.vue";
//小鲁班
import picturePs from "../views/picturePs/index.vue";
//小鲁班管理
import authPicturePs from "../views/userManage/picturePs/index.vue";

//蓝海搜索词
import blueSearch from "../views/blueSearch/index.vue";


// Vue.use(VueRouter);

const err401 = r =>
    require.ensure([], () => r(require("../views/error/err401.vue")), "home");
const err404 = r =>
    require.ensure([], () => r(require("../views/error/err404.vue")), "home");
const err500 = r =>
    require.ensure([], () => r(require("../views/error/err500.vue")), "home");
const login = r =>
    require.ensure([], () => r(require("../views/login/index.vue")), "home");
const main = r =>
    require.ensure([], () => r(require("../views/home/main.vue")), "home");

// 注意 权限字段 authRule （严格区分大小写）
export const constantRouterMap = [
    //不需要加权限的页面
    {
        path: "*",
        component: err404,
        hidden: true
    },
    {
        path: "/401",
        component: err401,
        name: "401",
        hidden: true
    },
    {
        path: "/404",
        component: err404,
        name: "404",
        hidden: true
    },
    {
        path: "/500",
        component: err500,
        name: "500",
        hidden: true
    },
    {
        path: "/login",
        component: login,
        name: "登录",
        hidden: true
    },
    {
        path: "/",
        component: Home,
        redirect: "/main/index",
        name: "sowow",
        hidden: true
    }
];

export default new VueRouter({
   // mode: "history", //后端支持可开
    mode: "",
    routes: constantRouterMap,
    strict: process.env.NODE_ENV !== "production"
});

export const asyncRouterMap = [
    //需要加权限的页面
    {
        path: "/main",
        component: Home,
        redirect: "/main/index",
        icon: "tubiao115",
        name: "首页",
        NAME: "HOME",
        noDropdown: true,
        children: [
            {
                path: "index",
                component: main
            }
        ]
    },
    {
        path: "/doubleEleven",
        component: resolve => require(['../views/doubleEleven/index.vue'], resolve),
        meta: {
            authRule: ["/doubleEleven"]
        },
        icon: "tubiao115",
        name: "双十一",
        NAME: "Double Eleven",
        noDropdown: true,
        children: [
            {
                path: "index",
                component: conversion
            }
        ]
    },
    {
        path: "/conversion",
        component: Home,
        redirect: "/conversion/index",
        icon: "gongju",
        name: "指数转化",
        NAME: "TRANSLATE",
        noDropdown: true,
        meta: {
            authRule: ["/conversion/index"]
        },
        children: [
            {
                path: "index",
                component: conversion
            }
        ]
    },
    {
        path: "/picturePs",
        component: Home,
        icon: "lu",
        name: "小鹿班",
        NAME: "IMAGE PROCESS",
        noDropdown: true,
        meta: {
            authRule: ["/picturePs/index/home"]
        },
        children: [
            {
                path: "index",
                redirect: "/picturePs/index/home",
                component: picturePs,
                children: [
                    {
                        path: "home",
                        name: "小鹿班首页",
                        meta: {
                            authRule: ["/picturePs/index/home"]
                        },
                        component: resolve => require(['../views/picturePs/home.vue'], resolve)
                    },
                    {
                        path: "home/upImages",
                        name: "修改图片",
                        meta: {
                            authRule: ["/picturePs/index/home/upImages"]
                        },
                        component: resolve => require(['../views/picturePs/home/index.vue'], resolve)
                    },
                    {
                        path: "collection",
                        name: "我的收藏",
                        meta: {
                            authRule: ["/picturePs/index/collection/home"]
                        },
                        component: resolve => require(['../views/picturePs/collection.vue'], resolve)
                    },
                    {
                        path: "collection/next",
                        name: "修改图片",
                        meta: {
                            authRule: ["/picturePs/index/collection/next"]
                        },
                        component: resolve => require(['../views/picturePs/collection/index.vue'], resolve),
                    },
                    {
                        path: "works",
                        name: "我的作品",
                        meta: {
                            authRule: ["/picturePs/index/works"]
                        },
                        component: resolve => require(['../views/picturePs/works.vue'], resolve)
                    },
                    {
                        path: "works/imges",
                        name: "我的作品图片",
                        meta: {
                            authRule: ["/picturePs/index/works/imges"]
                        },
                        component: resolve => require(['../views/picturePs/worksImages.vue'], resolve)
                    },
                    {
                        path: "works/upImges",
                        name: "修改我的作品图片",
                        meta: {
                            authRule: ["/picturePs/index/works/imges"]
                        },
                        component: resolve => require(['../views/picturePs/worksUpImages.vue'], resolve)
                    },
                    {
                        path: "collection/upImages",
                        name: "批图片",
                        meta: {
                            authRule: ["/picturePs/index/upImages"]
                        },
                        component: resolve => require(['../views/picturePs/upImages.vue'], resolve)
                    },
                    {
                        path: "collection/recommendImg",
                        name: "批图片",
                        meta: {
                            authRule: ["/picturePs/index/upImages"]
                        },
                        component: resolve => require(['../views/picturePs/collection/recommendImg.vue'], resolve)
                    },
                    {
                        path: "collection/upImages/images",
                        name: "批图片下一步",
                        meta: {
                            authRule: ["/picturePs/index/upImages/images"]
                        },
                        component: resolve => require(['../views/picturePs/images.vue'], resolve)
                    },
                    {
                        path: "price",
                        name: "批价格",
                        meta: {
                            authRule: ["/picturePs/index/price"]
                        },
                        component: resolve => require(['../views/picturePs/price.vue'], resolve)
                    },
                    {
                        path: "template",
                        name: "上传模板",
                        meta: {
                            authRule: ["/picturePs/index/template"]
                        },
                        component: resolve => require(['../views/picturePs/template.vue'], resolve)
                    },
                    {
                        path: "template/next",
                        name: "下一步",
                        meta: {
                            authRule: ["/picturePs/index/template"]
                        },
                        component: resolve => require(['../views/picturePs/template/index.vue'], resolve),
                    },
                    {
                        path: "template/next/upPSD",
                        name: "修改图片",
                        meta: {
                            authRule: ["/picturePs/index/template"]
                        },
                        component: resolve => require(['../views/picturePs/template/upPSD.vue'], resolve),
                    },
                    {
                        path: "myMatterD",
                        name: "我的素材库",
                        meta: {
                            authRule: ["/picturePs/index/home"]
                        },
                        component: resolve => require(['../views/picturePs/myMatter.vue'], resolve),
                    }
                ]
            }
        ]
    },
    {
        path: "/blueSearch",
        component: Home,
        redirect: "/blueSearch/index",
        icon: "abcsousuocixiangqing",
        name: "蓝海搜索词",
        NAME: "SEARCH WORD",
        noDropdown: true,
        meta: {
            authRule: ["/blueSearch/index"]
        },
        children: [
            {
                path: "index",
                component: blueSearch
            }
        ]
    },
    {
        path: "/userManage",
        component: Home,
        icon: "yonghuguanli",
        meta: {
            authRule: ["/userManage/index"]
        },
        name: "管理员管理",
        NAME: "ADMINISTRATOR",
        children: [
            {
                path: "authAdmin",
                component: authAdmin,
                name: "用户管理",
                icon: "",
                meta: {
                    authRule: ["/userManage/authAdmin"]
                }
            },
            {
                path: "authAdmin/authUser",
                component: resolve => require(['../views/userManage/admin/authUser.vue'], resolve),
                name: "用户登录详情",
                hidden: true,
                icon: "",
                meta: {
                    authRule: ["/userManage/authAdmin"]
                }
            },
            {
                path: "authRole",
                component: authRole,
                name: "角色管理",
                icon: "",
                meta: {
                    authRule: ["/userManage/authRole"]
                }
            },
            {
                path: "authPermissionRule",
                component: authPermissionRule,
                name: "权限管理",
                icon: "",
                meta: {
                    authRule: ["/userManage/authPermissionRule"]
                }
            },
            {
                path: "/userManage",
                redirect: "/userManage/authPicturePs/index",
                component: authPicturePs,
                name: "小鲁班管理",
                noDropdown: true,
                icon: "",
                meta: {
                    authRule: ["/userManage/authPermissionRule"]
                },
                children: [
                    {
                        path: "authPicturePs",
                        component: resolve => require(['../views/userManage/picturePs/authbrand.vue'], resolve),
                        meta: {
                            authRule: ["/userManage/authPermissionRule"]
                        }
                    },
                    {
                        path: "authPicturePs/cdr",
                        component: resolve => require(['../views/userManage/picturePs/cdr.vue'], resolve),
                        meta: {
                            authRule: ["/userManage/authPermissionRule"]
                        }
                    }
                ]
            }
        ]
    }
];
