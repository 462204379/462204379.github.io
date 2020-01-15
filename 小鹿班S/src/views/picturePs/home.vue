<template>
    <div>
        <div id="pictureHome">
            <div class="searchDiv_1">
                <div style="display: flex">
                    <div class="xiaoluban">
                        <div class="xuanzhuan">
                            <i class="icon iconfont icon-lu" style="font-size: 50px;color: #1D4999;"></i>
                        </div>
                        <div>小鹿班</div>
                    </div>
                    <div style="width: 100%;">
                        <el-input placeholder="请输入要搜索的内容" v-model="searchVal" class="input-with-select" clearable @keyup.enter.native="indexAxios">
                            <el-button slot="append" @click="indexAxios">搜模板</el-button>
                        </el-input>
                        <ul class="searteitem">
                            <li @click="searteitemClick('七夕')">七夕</li>
                            <li @click="searteitemClick('88大促')">88大促</li>
                            <li @click="searteitemClick('99大促')">99大促</li>
                            <li style="border: none;" @click="searteitemClick('双十一')">双十一</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="clear"></div>
            <div class="mainDiv">
                <div class="searchDiv_2" style="display: block;">
                    <div class="searchDiv_2_1">全部 ></div>
                    <div class="searchDiv_2_2">共收藏模板<span style="color: #409EFF;"> {{nums}} </span>个</div>
                    <div class="clear"></div>
                </div>
                <div class="searchDiv_3">
                    <div class="name">活动品牌：</div>
                    <el-select v-model="search.brandName1" size="mini" @change="fileBrandChange" style="margin-left: 10px;">
                        <el-option size="mini" label="全部" value=""></el-option>
                        <el-option :label="item.text" :value="item.id" v-for="(item,index) in searchDiv_3_0_list" :key="index"></el-option>
                    </el-select>
                    <el-select
                        v-show="search.brandName1 != ''"
                        v-model="search.brandName2"
                        @change="brandNameChange"
                        multiple
                        collapse-tags
                        style="margin-left: 20px;"
                        size="mini"
                        placeholder="请选择">
                        <el-option
                            v-for="item in brandNameList"
                            :key="item.id"
                            :label="item.brandName"
                            :value="item.id">
                        </el-option>
                    </el-select>
                    <div class="clear" style="flex: 1"></div>
                    <div @click="orderByClick" style="font-size: 16px;cursor: pointer;">
                        <div v-if="orderBy===''">
                            <span style="font-size: 14px;">图层排序</span>
                            <i class="el-icon-sort-down" style="position: relative;left: 8px;"></i><i class="el-icon-sort-up"></i>
                        </div>
                        <div v-else-if="orderBy==='desc'">
                            <span style="font-size: 14px;">图层排序</span>
                            <i class="el-icon-sort-down" style="color: #409EFF;position: relative;left: 8px;"></i><i class="el-icon-sort-up"></i>
                        </div>
                        <div v-else>
                            <span style="font-size: 14px;">图层排序</span>
                            <i class="el-icon-sort-down" style="position: relative;left: 8px;"></i><i style="color: #409EFF" class="el-icon-sort-up"></i>
                        </div>
                    </div>
                </div>
                <div class="searchDiv_4">
                    <div class="name">活动标签：</div>
                    <ul>
                        <li><el-button :type="searchDiv_3_2_bt" size="mini" style="padding: 7px 15px;" @click="searchItemsAllClick(2)">全部</el-button></li>
                        <li v-for="(item, index) in searchDiv_4_list" :key="index" v-if="index < 6">
                            <el-button :type="item.type|clickType" size="mini" style="padding: 7px 15px;" @click="searchItemsClick(item,2)">{{item.text}}</el-button>
                        </li>
                        <li v-if="searchDiv_4_list.length > 6">
                            <el-dropdown trigger="click" size="small" placement="bottom">
                              <span class="el-dropdown-link">
                                更多<i class="el-icon-arrow-down el-icon--right"></i>
                              </span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item v-for="(item, index) in searchDiv_4_list" :key="index" v-if="index >= 6" command="item.id">
                                        <div @click="dropClick(item,2)" :class="{'textColor':item.type}">{{item.text}}</div>
                                    </el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </li>
                    </ul>
                    <div class="clear"></div>
                </div>
                <div class="searchDiv_3">
                    <div class="name">使用场景：</div>
                    <ul>
                        <li><el-button :type="searchDiv_3_1_bt" size="mini" style="padding: 7px 15px;" @click="searchItemsAllClick(1)">全部</el-button></li>
                        <li v-for="(item, index) in searchDiv_3_list" :key="index" v-if="index < 6">
                            <el-button :type="item.type|clickType" size="mini" style="padding: 7px 15px;" @click="searchItemsClick(item,1)">{{item.text}}</el-button>
                        </li>
                        <li v-if="searchDiv_3_list.length > 6">
                            <el-dropdown trigger="click" size="small" placement="bottom">
                              <span class="el-dropdown-link">
                                更多<i class="el-icon-arrow-down el-icon--right"></i>
                              </span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item v-for="(item, index) in searchDiv_3_list" :key="index" v-if="index >= 6" command="item.id" >
                                        <div @click="dropClick(item,1)" :class="{'textColor':item.type}">{{item.text}}</div></el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </li>
                    </ul>
                    <div class="clear"></div>
                </div>
                <div class="searchDiv_5">
                    <div class="name">整图尺寸：</div>
                    <ul>
                        <li><el-button :type="searchDiv_3_3_bt" size="mini" style="padding: 7px 15px;" @click="searchItemsAllClick(3)">全部</el-button></li>
                        <li v-for="(item, index) in searchDiv_5_list" :key="index" v-if="index < 6">
                            <el-button :type="item.type|clickType" size="mini" style="padding: 7px 15px;" @click="searchItemsClick(item,3)">{{item.text}}</el-button>
                        </li>
                        <li v-if="searchDiv_5_list.length > 6">
                            <el-dropdown trigger="click" size="small" placement="bottom">
                              <span class="el-dropdown-link">
                                更多<i class="el-icon-arrow-down el-icon--right"></i>
                              </span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item v-for="(item, index) in searchDiv_3_list" :key="index" v-if="index >= 6" command="item.id">
                                        <div @click="dropClick(item,3)" :class="{'textColor':item.type}">{{item.text}}</div>
                                    </el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </li>
                    </ul>
                    <div class="clear"></div>
                </div>
                <div class="imgList" style="margin-top: 0;">
                    <el-row :gutter="20" style="padding: 0 10px;">
                        <el-col id="activeTab">
                            <el-tabs v-model="activeName" @tab-click="indexAxios">
                                <el-tab-pane label="全部" name=""></el-tab-pane>
                                <el-tab-pane label="近期主题" name="1"></el-tab-pane>
                                <el-tab-pane label="热门收藏" name="2"></el-tab-pane>
                                <el-tab-pane label="最新上传" name="3"></el-tab-pane>
                                <el-tab-pane label="我的模板" name="4"></el-tab-pane>
                                <el-tab-pane label="个人修改" name="5"></el-tab-pane>
                            </el-tabs>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="6" v-for="(item, index) in imgList" :key="index" style="margin-bottom: 20px;position: relative;">
                            <el-card :body-style="{ padding: '0px' }" shadow="hover" class="cardWidth">
                                <transition name="el-fade-in-linear">
                                    <div style="position: relative;" @mouseover="item.show = true" @mouseout="item.show = false">
                                        <img v-show="item.status == 2" src="../../assets/image/yixiajia.png" style="z-index: 9;width: 15%;position: absolute;left: 0px;top: 0px;" alt="">
                                        <el-image :src="item.masterUrl" class="widthImg" :class="{'heightImg':item.type==1}" :alt="item.labelName" lazy>
                                            <div slot="error" class="image-slot">
                                                <i class="el-icon-picture-outline"></i>
                                            </div>
                                        </el-image>
                                        <div class="topZhezhaoBg" v-show="item.show">
                                            <div class="topZhezhao"></div>
                                            <div class="topZhezhaoBtn">
                                                <div style="margin: 0 auto;">
                                                    <el-button type="primary" size="mini" @click="upimgClick(item)">编辑</el-button>
                                                    <template v-if="activeName == 4">
                                                        <el-button v-if="item.status == 0" @click="shangjiaClick(item)" type="danger" size="mini">下架</el-button>
                                                        <el-button v-else @click="shangjiaClick(item)" type="success" size="mini">上架</el-button>
                                                    </template>
                                                    <el-button type="info" size="mini" @click="xqClick(item.id)">详情</el-button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </transition>
                                <div style="padding: 10px;">
                                    <div class="bottom clearfix" style="display: flex;height: 16px;">
                                        <div style="width: 100%;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">
                                            <span style="color: #409EFF;font-weight: bold; ">{{ item.labelName }}</span>
                                            <span> - {{ item.sceneName }} - {{ item.width }} x {{ item.height }}</span>
                                            <time class="time"> {{ item.createTime|replaceDate_1 }}</time>
                                        </div>
                                    </div>
                                    <div style="display: flex;margin-top: 5px">
                                    <span>
                                        <i style="margin-right: 5px;" @click="removeClick(item.id)" v-if="activeName == '4'||activeName == '5'" class="icon iconfont icon-shanchu"></i>
                                        <i @click="shoucangClick(2,item.id)" v-if="item.collect" class="icon iconfont icon-zan1" style="color: #FF0000"></i>
                                        <i @click="shoucangClick(1,item.id)" v-else class="icon iconfont icon-zan1 icon-zan1-hover"></i>
                                    </span>
                                        <span style="color: #ccc;margin-left: 10px;">收藏数：{{item.collectNum}}</span>
                                        <span style="color: #ccc;margin-left: 10px;">图层数：{{item.layerCount}}</span>
                                    </div>
                                </div>
                            </el-card>
                        </el-col>
                    </el-row>
                    <el-pagination
                        style="text-align: center;margin-top: 20px;"
                        @size-change="handleSizeChange"
                        @current-change="indexAxios"
                        :current-page.sync="currentPage"
                        :page-sizes="[12, 24, 36, 48]"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                    </el-pagination>
                </div>
            </div>
            <div class="backtop">
                <div class="backtop_bt" @click='goTop'>
                    <div><i class="el-icon-caret-top"></i></div>
                    <div>TOP</div>
                </div>
                <div class="backtop_text">
                    <router-link to="/picturePs/index/collection">
                        <p>我的</p>
                        <p>收藏</p>
                        <div>{{nums}}</div>
                    </router-link>
                </div>
            </div>
            <el-dialog
                :visible.sync="dialogVisible"
            >
                <div class="pictureHome-beizhu-top">
                    <span class="pictureHome-beizhu-title">模板详情</span>
                    <span>--{{ formDataXq.labelName }}</span>
                    <span> - {{ formDataXq.sceneName }} - </span>
                    <time class="time"> {{ formDataXq.createTime|replaceDate_1 }}</time>
                </div>
                <div style="display: flex;align-items: center;">
                    <div class="pictureHome-beizhu-li">
                        <div class="pictureHome-beizhu-img"><img src="../../assets/image/pictureHome-1.png"></div>
                        <div class="text-slh">上传者:{{formDataXq.username}}</div>
                    </div>
                    <div class="pictureHome-beizhu-li">
                        <div class="pictureHome-beizhu-img"><img src="../../assets/image/pictureHome-2.png"></div>
                        <div class="text-slh">{{ formDataXq.createTime|replaceDate_2 }}</div>
                    </div>
                    <div class="pictureHome-beizhu-li">
                        <div class="pictureHome-beizhu-img"><img src="../../assets/image/pictureHome-3.png"></div>
                        <div class="text-slh">{{ formDataXq.width }} x {{ formDataXq.height }}</div>
                    </div>
                    <div class="pictureHome-beizhu-li">
                        <div class="pictureHome-beizhu-img"><img style="padding: 5px;" src="../../assets/image/pictureHome-4.png"></div>
                        <div class="text-slh">{{formDataXq.widthType|widthType}}</div>
                    </div>
                </div>
                <div style="display: flex;margin-top: 20px">
                    <div class="pictureHome-beizhu-li">
                        <div class="pictureHome-beizhu-img"><span>Brand</span></div>
                        <div class="text-slh" v-show="submitUp=='1'">
                            <el-select @change="upfileBrandChange" v-model="formDataXq.firstType" placeholder="请选择" size="mini" filterable allow-create default-first-option >
                                <el-option
                                    v-for="item in searchDiv_3_0_list"
                                    :key="item.value"
                                    :label="item.text"
                                    :value="item.text">
                                </el-option>
                            </el-select>
                            <br>
                            <el-select v-model="formDataXq.brandName" placeholder="请选择" size="mini" filterable allow-create default-first-option style="margin-top: 5px">
                                <el-option
                                    v-for="item in upbrandNameList"
                                    :key="item.id"
                                    :label="item.brandName"
                                    :value="item.brandName">
                                </el-option>
                            </el-select>
                        </div>
                        <div class="text-slh" v-show="submitUp==0">{{formDataXq.brandName}}</div>
                    </div>
                    <div class="pictureHome-beizhu-li">
                        <div class="pictureHome-beizhu-img"><img style="padding: 5px;" src="../../assets/image/pictureHome-6.png"></div>
                        <div class="text-slh" v-show="submitUp=='0'">{{formDataXq.sceneDate}}月</div>
                        <div class="text-slh" v-show="submitUp=='1'">
                            <el-select v-model="formDataXq.sceneDate" placeholder="请选择" size="mini">
                                <el-option label="一月" value="1"></el-option>
                                <el-option label="二月" value="2"></el-option>
                                <el-option label="三月" value="3"></el-option>
                                <el-option label="四月" value="4"></el-option>
                                <el-option label="五月" value="5"></el-option>
                                <el-option label="六月" value="6"></el-option>
                                <el-option label="七月" value="7"></el-option>
                                <el-option label="八月" value="8"></el-option>
                                <el-option label="九月" value="9"></el-option>
                                <el-option label="十月" value="10"></el-option>
                                <el-option label="十一月" value="11"></el-option>
                                <el-option label="十二月" value="12"></el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="pictureHome-beizhu-li">
                        <div class="pictureHome-beizhu-img"><img src="../../assets/image/pictureHome-7.png"></div>
                        <div class="text-slh" v-show="submitUp=='1'">
                            <el-select v-model="formDataXq.labelName" placeholder="请选择" size="mini" filterable allow-create default-first-option >
                                <el-option
                                    v-for="item in searchDiv_4_list"
                                    :key="item.value"
                                    :label="item.text"
                                    :value="item.text">
                                </el-option>
                            </el-select>
                        </div>
                        <div class="text-slh" v-show="submitUp=='0'">{{formDataXq.labelName}}</div>
                    </div>
                    <div class="pictureHome-beizhu-li">
                        <div class="pictureHome-beizhu-img"><img src="../../assets/image/pictureHome-8.png"></div>
                        <div class="text-slh" v-show="submitUp=='1'">
                            <el-select v-model="formDataXq.sceneName" placeholder="请选择" size="mini" filterable allow-create default-first-option >
                                <el-option
                                    v-for="item in searchDiv_3_list"
                                    :key="item.value"
                                    :label="item.text"
                                    :value="item.text">
                                </el-option>
                            </el-select>
                        </div>
                        <div class="text-slh" v-show="submitUp=='0'">{{formDataXq.sceneName}}</div>
                    </div>
                </div>
                <div style="margin: 0 12.5%;margin-top: 50px;position: relative;margin-right: 8%;">
                    <div style="position: absolute;left: -30px;z-index: 9;top: -30px;" class="pictureHome-beizhu-img"><img src="../../assets/image/pictureHome-9.png"></div>
                    <el-input
                        type="textarea"
                        :autosize="{ minRows: 4, maxRows: 8}"
                        placeholder="暂无备注"
                        v-model="formDataXq.remark"
                        maxlength="100"
                        show-word-limit
                        :disabled="submitUp=='0'"
                        >
                    </el-input>
                </div>
                <span slot="footer" class="dialog-footer" v-if="activeName == 4||activeName == 5">
                    <el-button type="primary" @click="okFormSubmit" size="mini" v-show="submitUp=='1'">确认</el-button>
                    <el-button type="primary" @click="submitUp = true" size="mini"  v-show="submitUp=='0'">编辑</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>
<script>
import $ from "jquery";
import {
    homeQuery,
    constQuery,
    homeCollect,
    query_collect_num,
    removeTemplate,
    stand_up_and_down,
    remark_query,
    remark_modify
} from "../../api/picturePs/home";
import {
    queryBrand,
} from "../../api/auth/picturePs";
import {
    replaceDate_1,
    replaceDate_2,
} from "../../utils/public";
export default {
    data() {
        return {
            orderBy: "",
            orderByField: "",
            search: {
                brandName1: "",
                brandName2: []
            },
            brandNameList: [],
            upbrandNameList: [],
            nums: 0,
            activeName: this.$route.query.activeName || "",
            searchVal: "",
            searchDiv_3_0_bt: "primary",
            searchDiv_3_1_bt: "primary",
            searchDiv_3_2_bt: "primary",
            searchDiv_3_3_bt: "primary",
            searchDiv_3_0_list: [],
            searchDiv_3_list: [{text:'PC智钻',type:false},{text:'PC品销宝',type:false},{text:'PC品销宝（轮播）',type:false},{text:'MOBIL钻展',type:false},{text:'MOBIL品销宝',type:false},{text:'MOBIL品销宝（轮播）',type:false},{text:'PC Banner',type:false}],
            searchDiv_4_list: [{text:'618',type:false},{text:'双11',type:false},{text:'双12',type:false},{text:'38大促',type:false},{text:'99大促',type:false},{text:'年货节',type:false}],
            searchDiv_5_list: [{text:'宽图',type:false,id:'2'},{text:'超宽图',type:false,id:'4'},{text:'方正图',type:false,id:'1'},{text:'窄图',type:false,id:'3'}],
            imgList: [],
            imgLength: "0",
            currentPage: 1,
            pageSize: 12,
            total: 100,
            formDataXq: {
                value:""
            },
            dialogVisible: false,
            submitUp: "0"
        };
    },
    created() {
        this.collect_num();
        this.searchAxios();
        this.indexAxios();
    },
    mounted() {

    },
    methods: {
        brandNameChange() {
            let brandName = [];
            if(this.search.brandName2[this.search.brandName2.length-1]==this.brandNameList[0].id){
                this.search.brandName2 = [];
            }
            if(this.search.brandName2.length > 1){
                this.search.brandName2.map(item=>{
                    if(item !=this.brandNameList[0].id){
                        brandName.push(item);
                    }
                })
            }
            if(this.search.brandName2.length == 0){
                brandName = [this.brandNameList[0].id];
            }
            if(brandName.length==this.brandNameList.length-1) {
                brandName = [this.brandNameList[0].id];
            }
            this.search.brandName2 = brandName;
            this.indexAxios();
        },
        orderByClick() {
            if (this.orderBy === "") {
                this.orderBy = "asc";
                this.orderByField = "layerCount";
            } else if (this.orderBy === "asc") {
                this.orderBy = "desc";
                this.orderByField = "layerCount";
            } else {
                this.orderBy = "";
                this.orderByField = "";
            }
            this.indexAxios();
        },
        fileBrandChange (){
            if(this.search.brandName1 == ""){
                this.search.brandName2 = [""];
                this.indexAxios();
                return;
            }
            this.search.brandName2 = [];
            this.brandNameList = [];
            queryBrand(this.search.brandName1)
                .then(response => {
                    let brandid = [];
                    response.data.map((item)=>{
                        brandid.push(item.id);
                    });
                    this.search.brandName2 = [brandid.join(",")];
                    this.brandNameList = response.data;
                    this.brandNameList.unshift({id: brandid.join(","), brandName: "全部"});
                    this.indexAxios();
                })
                .catch(() => {

                });
        },
        upfileBrandChange (val){
            this.upbrandNameList = [];
            this.formDataXq.brandName = "";
            let subType = false;
            let brandId = "";
            this.searchDiv_3_0_list.map((item)=>{
                if(item.text==val){
                    brandId = item.id;
                    subType = true;
                }
            });
            if(subType) {
                queryBrand(brandId)
                    .then(response => {
                        this.upbrandNameList = response.data;
                    })
                    .catch(() => {

                    });
            } else {
                this.upbrandNameList = [];
            }
        },
        chushiBrand(id) {
            queryBrand(id)
                .then(response => {
                    this.upbrandNameList = response.data;
                })
                .catch(() => {

                });
        },
        xqClick (id){
            this.submitUp =  "0";
            remark_query({modelId :id})
                .then(response => {
                    if (response.code) {
                        return false;
                    } else {
                        this.formDataXq = response.data;
                        this.formDataXq.sceneDate = this.formDataXq.sceneDate+"";
                        this.dialogVisible = true;
                        this.chushiBrand(response.data.firstTypeId);
                    }
                })
                .catch(() => {});
        },
        okFormSubmit (){
            let form = {
                modelId: this.formDataXq.modelId,
                sceneName: this.formDataXq.sceneName,//场景id
                labelName: this.formDataXq.labelName,//标签id
                brandName: this.formDataXq.brandName,//品牌名
                firstType: this.formDataXq.firstType,//文件名
                remark: this.formDataXq.remark,//备注
                sceneDate: this.formDataXq.sceneDate//场景时间
            }
            remark_modify(form)
                .then(response => {
                    if (response.code) {
                        return false;
                    } else {
                        this.$message({
                            type: 'success',
                            message: '修改成功!'
                        });
                        this.indexAxios();
                        this.dialogVisible = false;
                    }
                })
                .catch(() => {});
        },
        collect_num(){
            query_collect_num()
                .then(response => {
                    this.nums = response.data;
                })
                .catch(() => {});
        },
        handleSizeChange(val) {
            this.pageSize = `${val}`;
            this.currentPage = 1;
            this.indexAxios();
        },
        indexAxios() {
            let data = {
                searchTerm: this.searchVal,
                sceneName: "",
                brandId: this.search.brandName2.join(","),
                labelId: "",
                widthType: "0",
                contentType: this.activeName,
                pageNo: this.currentPage,
                pageSize: this.pageSize,
                orderBy: this.orderBy,
                orderByField: this.orderByField
            };
            if (this.searchDiv_3_0_bt === "primary") {
                data.sceneName = "";
            } else {
                let list = [];
                this.searchDiv_3_0_list.map((item) =>{
                    if(item.type == true) {
                        list.push(item.id);
                    }
                });
                data.brandId = list.join(",");
            }
            if (this.searchDiv_3_2_bt === "primary") {
                data.labelId = "";
            } else {
                let list = [];
                this.searchDiv_4_list.map((item) =>{
                    if(item.type) {
                        list.push(item.id);
                    }
                });
                data.labelId = list.join(",");
            }
            if (this.searchDiv_3_3_bt === "primary") {
                data.widthType = "0";
            } else {
                let list = [];
                this.searchDiv_5_list.map((item) =>{
                    if(item.type) {
                        list.push(item.id);
                    }
                });
                data.widthType = list.join(",");
            }
            homeQuery(data)
                .then(response => {
                    response.data.map((item)=>{
                        if (item.width / item.height > 1.5) {
                            item.type = 0;
                        } else {
                            item.type = 1;
                        }
                        item.show = false;
                    })
                    this.imgList = response.data;
                    this.total = response.total;
                })
                .catch(() => {});
        },
        removeClick(id) {
            let data = {
                modelId: id
            };
            this.$confirm('此操作将删除该模板, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                    removeTemplate(data)
                    .then(response => {
                        if (response.code) {
                            return false;
                        }else{
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.indexAxios();
                        }
                    })
                    .catch(() => {});
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        searteitemClick(val) {
            this.searchVal = val;
            this.indexAxios();
        },
        searchAxios() {
            constQuery()
                .then(response => {
                    let datalist3 = [];
                    let datalist4 = [];
                    let datalist0 = [];
                    response.data.scenes.map((item)=>{
                        datalist3.push({
                            text: item.sceneName,
                            id: item.sceneName,
                            Id: item.id,
                            type: false
                        });
                    });
                    response.data.labels.map((item)=>{
                        datalist4.push({
                            text: item.labelName,
                            id: item.id,
                            type: false
                        });
                    });
                    response.data.brands.map((item)=>{
                        datalist0.push({
                            text: item.brandName,
                            id: item.id,
                            type: false
                        });
                    });
                    this.searchDiv_3_0_list = datalist0;
                    this.searchDiv_3_list = datalist3;
                    this.searchDiv_4_list = datalist4;
                })
                .catch(() => {

                });
        },
        searchItemsClick(val, index) {
            val.type = !val.type;
            if (index === 0) {
                let allType_0 = true;
                this.searchDiv_3_0_list.map((item)=>{
                    if (item.type === true) {
                        allType_0 = false;
                        return false;
                    }
                });
                allType_0 ? this.searchDiv_3_0_bt = "primary" : this.searchDiv_3_0_bt = "text";
            } else if (index === 1) {
                let allType_1 = true;
                this.searchDiv_3_list.map((item)=>{
                    if (item.type === true) {
                        allType_1 = false;
                        return false;
                    }
                });
                allType_1 ? this.searchDiv_3_1_bt = "primary" : this.searchDiv_3_1_bt = "text";
            } else if (index === 2) {
                let allType_2 = true;
                this.searchDiv_4_list.map((item)=>{
                    if (item.type === true) {
                        allType_2 = false;
                    }
                });
                allType_2 ? this.searchDiv_3_2_bt = "primary" : this.searchDiv_3_2_bt = "text";
            } else {
                this.searchDiv_5_list.map((item)=>{
                    if (item.type === true) {
                        item.type = false;
                    }
                });
                val.type = true;
                this.searchDiv_3_3_bt = "text";

            }
            this.indexAxios();
        },
        searchItemsAllClick(val) {
            if (val === 0) {
                this.searchDiv_3_0_bt = "primary";
                this.searchDiv_3_0_list.map((item) => {
                    item.type = false;
                });
            } else if (val === 1) {
                this.searchDiv_3_1_bt = "primary";
                this.searchDiv_3_list.map((item) => {
                    item.type = false;
                });
            } else if (val === 2) {
                this.searchDiv_3_2_bt = "primary";
                this.searchDiv_4_list.map((item) => {
                    item.type = false;
                });
            } else {
                this.searchDiv_3_3_bt = "primary";
                this.searchDiv_5_list.map((item) => {
                    item.type = false;
                });
            }
            this.indexAxios();
        },
        dropClick(data, index) {
            data.type = !data.type;
            if (index === 0) {
                let allType_0 = true;
                this.searchDiv_3_0_list.map((item)=>{
                    if (item.type === true) {
                        allType_0 = false;
                        return false;
                    }
                });
                allType_0 ? this.searchDiv_3_0_bt = "primary" : this.searchDiv_3_0_bt = "text";
            } else if (index === 1) {
                let allType_1 = true;
                this.searchDiv_3_list.map((item)=>{
                    if (item.type === true) {
                        allType_1 = false;
                        return false;
                    }
                });
                allType_1 ? this.searchDiv_3_1_bt = "primary" : this.searchDiv_3_1_bt = "text";
            } else if (index === 2) {
                let allType_2 = true;
                this.searchDiv_4_list.map((item)=>{
                    if (item.type === true) {
                        allType_2 = false;
                    }
                });
                allType_2 ? this.searchDiv_3_2_bt = "primary" : this.searchDiv_3_2_bt = "text";
            } else {
                let allType_3 = true;
                this.searchDiv_5_list.map((item)=>{
                    if (item.type === true) {
                        allType_3 = false;
                    }
                });
                allType_3 ? this.searchDiv_3_3_bt = "primary" : this.searchDiv_3_3_bt = "text";
            }
            this.indexAxios();
        },
        shoucangClick(val, id) {
            let form = {
                modelId: id,
                type: val
            };
            homeCollect(form)
                .then(response => {
                    this.indexAxios();
                    this.collect_num();
                })
                .catch(() => {

                });
        },
        shangjiaClick(val){
            let form = {
                modelId: val.id,
                type: val.status == 0 ? 2 : 1
            };
            stand_up_and_down(form)
                .then(response => {
                    if (response.code === 0) {
                        this.$message({
                            message: response.msg,
                            type: "success"
                        });
                        this.indexAxios();
                        this.collect_num();
                    }
                })
                .catch(() => {

                });
        },
        upimgClick(val) {
            this.$router.push({path: "/picturePs/index/home/upImages", query: {id:val.id,username:val.username+"-"+val.labelName+"-"+val.sceneName,width:val.width,height:val.height,userId:val.userId,activeName:this.activeName}});
        },
        goTop() {
            clearInterval(timer);
            let timer = setInterval(function() {
                let curHeight = document.getElementsByClassName("el-main")[0].scrollTop || document.body.scrollTop;  // 得到当前高度
                let speed = (0 - curHeight) / 7; // 随着高度减速
                speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
                if (curHeight === 0) {
                    clearInterval(timer); //当前高度为零,停止这次计时器
                }
                document.getElementsByClassName("el-main")[0].scrollTop = curHeight + speed; //直接给高度赋值,会调用needtotop方法
            }, 20);
        } //回到顶部
    },
    filters: {
        clickType(type) {
            return type ? "primary" : "text";
        },
        widthType(type) {
            let typevalue = "";
            if (type == 1){
                typevalue = "方正图";
            } else if (type == 2) {
                typevalue = "宽图";
            } else if (type == 3) {
                typevalue = "窄图";
            } else {
                typevalue = "超宽图";
            }
            return typevalue;
        },
        replaceDate_1: replaceDate_1,
        replaceDate_2: replaceDate_2
    },
    updated: function() {
        if($(".cardWidth").eq(0).width() != undefined){
            this.imgList.map((item)=>{
                if (item.width / item.height > $(".cardWidth").eq(0).width()/150) {
                    item.type = 0;
                } else {
                    item.type = 1;
                }
            })
        }
    }
};
</script>

<style type="text/scss" lang="scss">
#app .el-main {
    background-color: #fff;
}
.clear {
    clear: both;
}
.searchDiv_1 {
    width: 50%;
    margin: 0 auto;
    margin-top: 30px;
}
.searteitem {
    margin-top: 10px;
    font-size: 16px;
}
.searteitem li {
    float: left;
    border-right: 1.5px solid #ccc;
    padding: 0 10px;
    cursor: pointer;
}
.mainDiv ul li {
    float: left;
    line-height: 30px;
    height: 30px;
    padding: 0 10px;
}
.mainDiv ul .name{
    padding: 0;
}
.searchDiv_2 ,.searchDiv_3 ,.searchDiv_4 ,.searchDiv_5 {
    width: 90%;
    margin: 0 auto;
    padding: 10px;
    display: flex;
    align-items: center;
}
.name {
    flex: none;
    line-height: 30px;
}
.searchDiv_2 ,.searchDiv_5 {
    border-bottom: 1px solid #ccc;
}
.searchDiv_2_1 {
    float: left;
}
.searchDiv_2_2 {
    float: right;
}
.el-button--text {
    color: #000;
}
.el-button--text:focus {
    color: #000;
}
.imgList{
    width: 90%;
    margin: 0 auto;
    margin-top: 20px;
    margin-bottom: 20px;
}
.el-image {
    width: 100%;
    height: 150px;
}
.image-slot{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background: #f5f7fa;
    color: #909399;
}
#app .widthImg {
    text-align: center;
    line-height: 150px;
}
.widthImg img{
    width: 100%;
    height: auto;
    vertical-align: middle;
}
#app .heightImg {
    text-align: center;
}
.heightImg img{
    height: 100%;
    width: auto;
}
.el-card {
    cursor: pointer;
    font-size: 12px;
}
.el-dropdown{
    font-size: 12px;
    color: #000;
}
.el-dropdown-link {
    cursor: pointer;
}
.textColor {
    color: #409EFF;
}
.xiaoluban {
    color: #409EFF;
    margin-right: 100px;
    position: relative;
    bottom: 10px;
    cursor: pointer
}
.xiaoluban:hover .xuanzhuan{
    transform:rotateY(360deg);
    -ms-transform:rotateY(360deg); 	/* IE 9 */
    -moz-transform:rotateY(360deg); 	/* Firefox */
    -webkit-transform:rotateY(360deg); /* Safari 和 Chrome */
    -o-transform:rotateY(360deg);
    -webkit-transition:-webkit-transform 1s linear;
    transition:transform 1s linear;
}
#activeTab .el-tabs__nav-wrap::after {
    background: #fff;
}
.icon-zan1-hover{
    color: #ccc;
}
.topZhezhaoBg {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
}
.topZhezhao {
    background: #000;
    width: 100%;
    height: 100%;
    opacity: 0.4;
    position: absolute;
    top: 0;
}
.topZhezhaoBtn {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    display: flex;
    align-items: center;
}
.pictureHome-beizhu-li {
    width: 25%;
    text-align: center;
    padding: 0 5px;
}
.pictureHome-beizhu-img {
    margin: 0 auto;
    text-align: center;
    margin-bottom: 10px;
    width: 60px;
    height: 60px;
    line-height: 40px;
    background: #657081;
    border-radius: 50px;
    padding: 10px;
    color: #fff;
    img {
        width: auto;
        height: 100%;
    }
}
#pictureHome {
    .pictureHome-beizhu-top {
        position: absolute;
        top: 10px;
        left: 20px;
        height: 20px;
        line-height: 20px;
    }
    .el-dialog__header {
        padding: 20px 20px 10px;
        border-bottom: 1px solid #ccc;
        height: 40px;
    }
    .el-dialog__headerbtn {
        top: 10px;
    }
    .pictureHome-beizhu-title {
        font-size: 16px;
        font-weight: bold;
    }
    .el-textarea__inner{
        padding-top: 20px;
    }
    .el-dialog__body {
        padding: 30px 20px;
    }
}
</style>
