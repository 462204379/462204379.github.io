<template>
    <div>
        <div class="clear"></div>
        <div class="mainDiv" id="worksMain" element-loading-text="下载中" element-loading-spinner="el-icon-loading">
            <div class="searchDiv_2">
                <div class="searchDiv_2_1"><el-link type="primary" @click="$router.push('/picturePs/index/works')">上一页 </el-link></div>
                <div class="searchDiv_2_2" style="margin-left: 5px"> > {{dataTop.createTime|replaceDate_2}} {{dataTop.brandName}}-{{dataTop.photoNum}}张-{{dataTop.photoType}}</div>
                <div class="clear"></div>
            </div>
            <div class="searchDiv_3">
                <div class="name">活动品牌：</div>
                <el-select v-model="search.brandName1" size="mini" @change="fileBrandChange" style="margin-left: 10px;">
                    <el-option size="mini" label="全部" value=""></el-option>
                    <el-option :label="item.text" :value="item.id" v-for="item in searchDiv_6_list" :key="item.val"></el-option>
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
                        v-for="(item, index) in brandNameList"
                        :key="index"
                        :label="item.brandName"
                        :value="item.id">
                    </el-option>
                </el-select>
                <div class="clear"></div>
            </div>
            <div class="searchDiv_7">
                <div class="name">时间 & 价格：</div>
                <ul>
                    <li>
                        <el-date-picker
                            v-model="searchVal_7_time"
                            value-format="timestamp"
                            size="mini"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            @change="indexAxios">
                        </el-date-picker>
                        <el-select v-model="searchSelect_7" placeholder="请选择" size="mini" style="width:100px;margin-left: 20px;">
                            <el-option label="全部"  value=""></el-option>
                            <el-option label="促销价"  value="促销价"></el-option>
                            <el-option label="差价"  value="差价"></el-option>
                            <el-option label="原价"  value="原价"></el-option>
                        </el-select>
                        <span v-if="searchSelect_7 != ''" style="margin-left: 10px;">等于</span>
                        <el-input v-if="searchSelect_7 != ''" v-model="searchVal_7" placeholder="请输入价格" @keyup.enter.native="indexAxios" size="mini" style="width:160px;margin-left: 10px;"></el-input>
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
                                <el-dropdown-item v-for="(item, index) in searchDiv_3_list" :key="index" v-if="index >= 6" command="item.id">
                                    <div @click="dropClick(item,2)" :class="{'textColor':item.type}">{{item.text}}</div>
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </li>
                </ul>
                <div class="clear"></div>
            </div>
            <div class="imgList">
                <div style="padding-left: 10px;margin-bottom: 10px;">
                    <el-checkbox v-model="isIndeterminate" @change="handleCheckAllChange">全选</el-checkbox>
                </div>

                <el-row :gutter="20">
                    <el-col :span="6" v-for="(item, index) in imgList" :key="index">
                        <el-card :body-style="{ padding: '0px'}" shadow="hover" style="margin-bottom: 10px;">
                            <transition name="el-fade-in-linear">
                                <div style="position: relative;" @mouseover="item.show = true" @mouseout="item.show = false">
                                    <el-image :src="item.masterUrl" class="widthImg" :class="{'heightImg':item.type==1}" :alt="item.labelName" lazy>
                                        <div slot="error" class="image-slot">
                                            <i class="el-icon-picture-outline"></i>
                                        </div>
                                    </el-image>
                                    <div class="topZhezhaoBg" v-show="item.show">
                                        <div class="topZhezhao"></div>
                                        <div class="topZhezhaoBtn">
                                            <div style="margin: 0 auto;">
                                                <el-button type="primary" size="mini" @click="upImgTo(item)">编辑</el-button>
                                                <el-button type="info" size="mini" @click="yulanWidth=item.width,yulanUrl=item.masterUrl,yulanFormVisible=true">预览</el-button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </transition>

                            <div style="padding: 10px;">
                                <div class="bottom clearfix" style="display: flex;height: 16px;">
                                    <div style="width: 100%;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">
                                        <el-checkbox v-model="item.select" @change="imgchange(item)"></el-checkbox>
                                        <span style="color: #409EFF;font-weight: bold;"> {{item.labelName}}  </span>
                                        <span>- {{ item.sceneName }} - </span>
                                        <span>{{item.width}} X {{item.height}}</span>
                                        <time class="time"> {{ item.createTime|replaceDate_1 }} </time>
                                    </div>
                                    <!--<i style="margin-right: 5px;" @click="removeClick(item.photoId)" class="icon iconfont icon-shanchu"></i>-->
                                    <span style="float: right;" class="color01">{{item.brandName}}</span>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
                <el-pagination
                    style="text-align: center;margin-top: 20px;"
                    @current-change="indexAxios"
                    @size-change="handleSizeChange"
                    :current-page.sync="currentPage"
                    :page-sizes="[12, 24, 36, 48]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
                </el-pagination>
            </div>
        </div>
        <div class="rightdaohang">
            <div class="rightdaohangList" @click='goTop' style="padding-top: 15px;padding-bottom: 8px;background: #EFEDED">
                <div style="position: relative;width: 22px;height: 22px;margin: 0 auto;">
                    <i class="el-icon-shopping-cart-full iconHover" style="color: #C6C2C2;font-size: 22px;"></i>
                    <div style="border-radius: 12px;position: absolute;top: -12px;right: -8px;background: rgb(255, 255, 255);width: 14px;height: 14px;line-height: 14px;color: #657081">{{checkedImgs.length}}</div>
                </div>
            </div>
            <div class="rightdaohangList" @click="pijiage()">
                <p class="iconHover"><i class="el-icon-edit"></i></p>
                <p>批价格</p>
            </div>
            <div class="rightdaohangList" @click="daochuClick">
                <p class="iconHover"><i class="icon iconfont icon-xiazai"></i></p>
                <p>下载</p>
            </div>
            <div class="rightdaohangList" @click="removeClick">
                <p class="iconHover"><i class="el-icon-delete"></i></p>
                <p>删除</p>
            </div>
        </div>
        <el-dialog :width="yulanWidth+'px'" title="图片预览" :visible.sync="yulanFormVisible" :append-to-body="true" :close-on-click-modal="false" custom-class="yulanClass">
            <el-image :src="yulanUrl" style="width: 100%;height: auto;">
                <div slot="placeholder" class="image-slot" style="height: 100px;text-align: center;line-height: 100px;">
                    加载中...
                </div>
            </el-image>
        </el-dialog>
    </div>
</template>
<script>
    import $ from "jquery";
    import {
        constQuery,
        myphotoList,
        download_photo,
        delete_model
    } from "../../api/picturePs/home";
    import {
        queryBrand,
    } from "../../api/auth/picturePs";
    import {
        replaceDate_1,
        replaceDate_2
    } from "../../utils/public";
    export default {
        data() {
            return {
                yulanWidth: "",
                yulanFormVisible: false,
                yulanUrl: "",
                loading: false,
                search: {
                    brandName1: "",
                    brandName2: []
                },
                brandNameList: [],
                srcList: [],
                worksQuery:this.$route.query,
                dataTop:{
                    createTime:this.$route.query.createTime,
                    brandName:this.$route.query.brandName,
                    photoNum:this.$route.query.photoNum,
                    photoType:this.$route.query.photoType==1?"批图片":"批价格",
                },
                searchVal: "",
                searchDiv_3_1_bt: "primary",
                searchDiv_3_2_bt: "primary",
                searchDiv_3_3_bt: "primary",
                searchDiv_3_4_bt: "primary",
                searchDiv_3_list: [{text:'PC智钻',type:false},{text:'PC品销宝',type:false},{text:'PC品销宝（轮播）',type:false},{text:'MOBIL钻展',type:false},{text:'MOBIL品销宝',type:false},{text:'MOBIL品销宝（轮播）',type:false},{text:'PC Banner',type:false}],
                searchDiv_4_list: [{text:'618',type:false},{text:'双11',type:false},{text:'双12',type:false},{text:'38大促',type:false},{text:'99大促',type:false},{text:'年货节',type:false}],
                searchDiv_5_list: [{text:'宽图',type:false,id:'1'},{text:'超宽图',type:false,id:'2'},{text:'方正图',type:false,id:'3'},{text:'窄图',type:false,id:'4'}],
                searchDiv_6_list: [{text:'博朗',type:false,id:'1'},{text:'欧乐B',type:false,id:'2'},{text:'科莱丽',type:false,id:'3'},{text:'博雅',type:false,id:'4'},{text:'南孚',type:false,id:'5'},{text:'耐克',type:false,id:'6'}],
                searchVal_7_time:"",
                searchVal_7:"",
                searchSelect_7:"",
                photoType:"0",
                imgList: [],
                imgLength: "0",
                isIndeterminate:false,
                checkedImgsAll:[],
                checkedImgs:[],
                currentPage: 1,
                pageSize: 12,
                total: 100
            };
        },
        created() {
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
            upImgTo(data) {
                this.$router.push({path: "/picturePs/index/works/upImges", query:{username:data.labelName+"-"+data.sceneName,photoId:data.photoId,width:data.width,height:data.height,worksQuery:JSON.stringify(this.worksQuery)}});
            },
            handleSizeChange(val){
                this.pageSize = val;
                this.currentPage = 1;
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
            indexAxios() {
                this.isIndeterminate = false;
                let data = {
                    compoundBatch:this.$route.query.compoundBatch,
                    sceneName: "",
                    labelId: "",
                    brandId: this.search.brandName2.join(","),
                    startTime: this.searchVal_7_time[0]||"0",
                    endTime: this.searchVal_7_time[1]||"0",
                    priceType: this.searchSelect_7,//价格类型
                    price: this.searchVal_7,//价格
                    searchTerm: this.searchVal,
                    photoType:this.photoType,//图片类型
                    pageNo: this.currentPage,
                    pageSize: this.pageSize
                };
                if (this.searchDiv_3_1_bt === "primary") {
                    data.sceneName = "";
                } else {
                    let list = [];
                    this.searchDiv_3_list.map((item) =>{
                        if(item.type == true) {
                            list.push(item.id);
                        }
                    });
                    data.sceneName = list.join(",");
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
                myphotoList(data)
                    .then(response => {
                        response.data.map((item)=>{
                            if (item.width / item.height > 2) {
                                item.type = 0;
                            } else {
                                item.type = 1;
                            }
                        });
                        let checkedImgsAll = [];
                        let srcList = [];
                        response.data.map(item=>{
                            item.select = false;
                            item.show = false;
                            checkedImgsAll.push(item.photoId)
                            srcList.push(item.masterUrl)
                        })
                        this.srcList = srcList;
                        this.checkedImgsAll = checkedImgsAll;
                        this.imgList = response.data;
                        this.total = response.total;
                    })
                    .catch(() => {});
            },
            removeClick() {
                if(this.checkedImgs.length === 0){
                    this.$message.error("请选择需要删除的图片");
                    return;
                }
                let data ={
                    photoId:this.checkedImgs.join(",")
                };
                this.$confirm('此操作将删除该图片, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    delete_model(data)
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
                        let datalist5 = [];
                        response.data.scenes.map((item)=>{
                            datalist3.push({
                                text: item.sceneName,
                                id: item.sceneName,
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
                            datalist5.push({
                                text: item.brandName,
                                id: item.id,
                                type: false
                            });
                        });
                        this.searchDiv_3_list = datalist3;
                        this.searchDiv_4_list = datalist4;
                        this.searchDiv_6_list = datalist5;
                    })
                    .catch(() => {

                    });
            },
            searchItemsClick(val, index) {
                val.type = !val.type;
                if (index === 1) {
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
                } else if (index === 3) {
                    let allType_3 = true;
                    this.searchDiv_5_list.map((item)=>{
                        if (item.type === true) {
                            allType_3 = false;
                        }
                    });
                    allType_3 ? this.searchDiv_3_3_bt = "primary" : this.searchDiv_3_3_bt = "text";
                } else if (index === 4) {
                    let allType_4 = true;
                    this.searchDiv_6_list.map((item)=>{
                        if (item.type === true) {
                            allType_4 = false;
                        }
                    });
                    allType_4 ? this.searchDiv_3_4_bt = "primary" : this.searchDiv_3_4_bt = "text";
                }
                this.indexAxios();
            },
            searchItemsAllClick(val) {
                if (val === 1) {
                    this.searchDiv_3_1_bt = "primary";
                    this.searchDiv_3_list.map((item) => {
                        item.type = false;
                    });
                } else if (val === 2) {
                    this.searchDiv_3_2_bt = "primary";
                    this.searchDiv_4_list.map((item) => {
                        item.type = false;
                    });
                } else if (val === 3) {
                    this.searchDiv_3_3_bt = "primary";
                    this.searchDiv_5_list.map((item) => {
                        item.type = false;
                    });
                } else if (val === 4) {
                    this.searchDiv_3_4_bt = "primary";
                    this.searchDiv_6_list.map((item) => {
                        item.type = false;
                    });
                }
                this.indexAxios();
            },
            dropClick(data, index) {
                data.type = !data.type;
                if (index === 1) {
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
            pijiage(val) {
                let formList = [];
                val.map(item => {
                    if(item.select) {
                        formList.push(item.id)
                    }
                });
                if (formList.length === 0){
                    this.$message.error("请选择需要的图片！");
                    return false;
                }
                this.$router.push({path: "/picturePs/index/price", query: {id:formList}});
            },
            imgchange() {
                let checkedImgs = [];
                this.imgList.map(item => {
                    if (item.select) {
                        checkedImgs.push(item.photoId);
                    }
                })
                this.checkedImgs = checkedImgs;
                this.isIndeterminate = this.checkedImgs.length === this.checkedImgsAll.length;
            },
            handleCheckAllChange() {
                if (this.isIndeterminate === false) {
                    this.imgList.map(item => {
                        item.select = false;
                    })
                    this.checkedImgs=[];
                } else {
                    this.imgList.map(item => {
                        item.select = true;
                    })
                    this.checkedImgs = this.checkedImgsAll;
                }
            },
            daochuClick() {
                if(this.checkedImgs.length === 0){
                    this.$message.error("请选择需要下载的图片");
                    return;
                }
                let data ={
                    photoId:this.checkedImgs.join(",")
                }
                this.loading = true;
                download_photo(data)
                    .then(response => {
                        this.loading = false;
                        this.download(response)
                    })
                    .catch(() => {});
            },
            download (data) {
                if (!data) {
                    return
                }
                if(window.navigator.msSaveBlob == undefined){
                    let url = window.URL.createObjectURL(new Blob([data]));
                    let link = document.createElement('a');
                    link.style.display = 'none';
                    link.href = url;
                    link.setAttribute('download', '导出.zip');
                    document.body.appendChild(link);
                    link.click();
                } else {
                    let fileObj = new Blob([data]);
                    window.navigator.msSaveBlob(fileObj,'BlobDemo.zip');
                }
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
            replaceDate_1: replaceDate_1,
            replaceDate_2: replaceDate_2
        }
    };
</script>

<style type="text/scss" lang="scss">
    #worksMain {
        .el-loading-spinner {
            top: 20%;
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
    }
    .yulanClass {
        .el-dialog__title {
            font-size: 16px;
        }
        .el-dialog__body {
            padding: 10px;
        }
        .el-dialog__header {
            padding: 5px;
        }
        .el-dialog__headerbtn {
            right: 5px;
            top:5px;
        }
    }
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
    #worksMain .name {
        width: 90px;
    }
    .searchDiv_2 ,.searchDiv_3 ,.searchDiv_4 ,.searchDiv_5,.searchDiv_6,.searchDiv_7,.searchDiv_8,.searchDiv_9 {
        width: 90%;
        margin: 0 auto;
        padding: 10px;
        display: flex;
    }
    .name {
        flex: none;
    }
    .searchDiv_2 ,.searchDiv_6 {
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
        height: 150px;
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
    .xuanzhuan:hover{
        transform:rotateY(360deg);
        -ms-transform:rotateY(360deg); 	/* IE 9 */
        -moz-transform:rotateY(360deg); 	/* Firefox */
        -webkit-transform:rotateY(360deg); /* Safari 和 Chrome */
        -o-transform:rotateY(360deg);
        -webkit-transition:-webkit-transform 1s linear;
        transition:transform 1s linear;
    }
    .color01{
        float: right;
        background: #409EFF;
        color: #fff;
        border-radius: 4px;
        padding: 0 4px;
        width: 60px;
        text-align: center;
    }
    .color02{
        float: right;
        background: #FF9800;
        color: #fff;
        border-radius: 4px;
        padding: 0 4px;
        width: 60px;
        text-align: center;
    }
    .rightdaohang{
        position: fixed;
        right: 40px;
        top: 40%;
        text-align: center;
        color: #657081;
        cursor: pointer;
        background: #fff;
    }
    .rightdaohangList{
        border: 1px solid #ccc;
        border-radius: 4px;
        align-items: center;
        font-size: 12px;
        padding: 6px 5px;
    }
    .rightdaohangList i{
        font-size: 18px;
    }
    .rightdaohangList:hover .iconHover{
        transform: scale(1.2);
    }
    .rightdaohangList:hover {
        background: #66b1ff;
        color: #fff;
    }
    .imgList .el-image-viewer__canvas img{
        width: 50%;
        height: auto;
    }
</style>
