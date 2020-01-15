<template>
    <div style="width: 90%;margin: 0 auto;" class="collection">
        <div>
            <div class="searchDiv_2" style="display: block;">
                <div class="searchDiv_2_1">全部 ></div>
                <div class="searchDiv_2_2">共有<span style="color: #409EFF;"> {{pageSize}} </span>个分类</div>
                <div class="clear"></div>
            </div>
            <div class="searchDiv_3">
                <div class="name">活动品牌：</div>
                <el-select v-model="search.brandName1" size="mini" @change="fileBrandChange" style="margin-left: 10px;">
                    <el-option size="mini" label="全部" value=""></el-option>
                    <el-option v-for="item in searchDiv_3_0_list" :key="item.value" :label="item.text" :value="item.id"></el-option>
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
                                <el-dropdown-item v-for="(item, index) in searchDiv_4_list" :key="index" v-if="index >= 6" command="item.id">
                                    <div @click="dropClick(item,2)" :class="{'textColor':item.type}">{{item.text}}</div>
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </li>
                </ul>
                <div class="clear"></div>
            </div>
            <div class="clear"></div>
            <el-card shadow="never" style="margin-top: 20px;"  v-show="imglist1.length != 0">
                <el-row style="display: flex;align-items: center;cursor: auto;" :class="{border_bottom:index != imglist1.length-1}" v-for="(item ,index) in imglist1" :key="index">
                    <el-col :span="3" style="text-align: center">
                        <div>
                            <div>分类{{index+1}}</div>
                            <div>（共{{item.length}}个模板）</div>
                            <div style="margin-top: 5px;">
                                <el-button type="primary" size="mini" @click="imgclick(imglist1[index],index)">批图片</el-button>
                                <div style="display: inline-block;margin-left: 10px;" v-if="imglist1[index][0].isTop==0">
                                    <el-button type="success" size="mini" @click="zhidngclick(imglist1[index],false)">取消置顶</el-button>
                                    <i class="icon iconfont icon-top" style="color: #FAA725;font-size: 60px;position: absolute;left: 0;top: -2.8px;"></i>
                                </div>
                                <div style="display: inline-block;margin-left: 10px;" v-else>
                                    <el-button type="success" size="mini" @click="zhidngclick(imglist1[index],true)">置顶</el-button>
                                </div>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="21" style="border-left: 1px solid #EBEEF5;">
                        <div style="border-bottom: 1px solid #EBEEF5;padding: 10px;display: none">
                            <div style="display: flex;margin-bottom: 10px;align-items: center;">
                                <span class="spanName">常量</span>
                                <draggable class="list-group" :list="list1[index]" group="people" style="width: 70%;">
                                    <div class="list-group-item" v-for="(element, index) in list1[index]" :key="index">
                                        {{ element }}
                                    </div>
                                </draggable>
                            </div>
                            <div style="display: flex;align-items: center;">
                                <span class="spanName">变量</span>
                                <draggable class="list-group" :list="list2[index]" group="people" style="width: 70%;">
                                    <div class="list-group-item" v-for="(element, index) in list2[index]" :key="index">
                                        {{ element }}
                                    </div>
                                </draggable>
                            </div>
                        </div>
                        <div style="padding: 10px">
                            <div style="margin-bottom: 6px;">
                                <el-checkbox v-model="isIndeterminate[index]" @change="handleCheckAllChange(index)">全选</el-checkbox></div>
                                <draggable class="list-group" :list="imglist1[index]" :group="index">
                                    <div
                                        class="list-group-item"
                                        v-for="element in item"
                                        :key="element.id"
                                        style="float: left;width: 25%;padding: 10px;position: relative;margin: 0;border:none;position: relative"
                                    >
                                        <img v-show="element.status == 2" src="../../assets/image/yixiajia.png" style="z-index: 9;width: 15%;position: absolute;left: 10px;top: 10px;" alt="">
                                        <div style="border: 1px solid rgba(0, 0, 0, 0.125);">
                                            <el-image style="cursor: pointer" :src="element.masterUrl" class="widthImg" :class="{'heightImg':element.type==1}" @click.native="imgToClick(element)" :alt="element.labelName" lazy></el-image>
                                            <div class="bottom clearfix" style="padding: 0 10px 10px 10px;display: flex;">
                                                <div style="width: 100%;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;height: 16px;">
                                                    <span style="color: #409EFF;font-weight: bold; ">{{ element.labelName }}</span>
                                                    <span> - {{ element.sceneName }} - {{ element.width }} x {{ element.height }}</span>
                                                    <span> - </span>
                                                    <time class="time">{{ element.createTime|replaceDate_1 }}</time>
                                                </div>
                                            </div>
                                            <div style="padding: 0 10px;display: flex;padding-bottom: 2px;">
                                                <i @click="shoucangClick(2,element.id)" class="icon iconfont icon-zan1 icon-zan1-hover" style="color: #FF0000;cursor: pointer;"></i><span style="color: #ccc;margin-left: 10px;font-size: 13px;flex: 1;">图层数：{{element.layerCount}}</span>
                                                <span style="float: right;">
                                                    <el-checkbox v-model="element.select" @change="imgchange(index)"></el-checkbox>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </draggable>
                            <div style="float: left;width: 25%;padding: 10px;position: relative;margin: 0;border:none;cursor: pointer;">
                                <div style="border: 1px solid rgba(0, 0, 0, 0.125);height: 201.2px;" @click="addjinsi.sortLogo=imglist1[index][0].sortLogo,addjinsi.alertType = true">
                                    <div style="height: 170px;line-height: 190px;text-align: center;">
                                        <i class="el-icon-circle-plus-outline" style="font-size: 50px;color: #657081;"></i>
                                    </div>
                                    <div class="bottom clearfix" style="text-align: center">添加近似模板</div>
                                </div>
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </el-card>
            <div style="text-align: center;margin-top: 20px;color: #DCDFE6;" v-if="list1.length == 0&&list2.length == 0">暂无数据，请到首页收藏模板</div>
            <el-pagination
                style="text-align: center;margin: 20px;"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                :page-sizes="[2,4, 8, 12, 16]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
                v-show="imglist1.length != 0">
            </el-pagination>
        </div>

        <el-dialog title="选择方式" :visible.sync="addjinsi.alertType">
            <el-form size="mini">
                <el-form-item>
                    <el-radio v-model="addjinsi.form.radio" label="1">按距离</el-radio>
                </el-form-item>
                <el-form-item>
                    <el-radio v-model="addjinsi.form.radio" label="2">按主题</el-radio>
                    <span>选择活动</span>
                    <el-select v-model="addjinsi.form.labelId" size="mini" style="margin-left: 10px;">
                        <el-option v-for="item in searchDiv_4_list" :key="item.value" :label="item.text" :value="item.id"></el-option>
                    </el-select>
                    <span style="margin-left: 20px;">选择场景</span>
                    <el-select v-model="addjinsi.form.sceneName" size="mini" style="margin-left: 10px;">
                        <el-option v-for="item in searchDiv_3_list" :key="item.value" :label="item.text" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-radio v-model="addjinsi.form.radio" label="3">按品牌</el-radio>
                    <span>一级分类</span>
                    <el-select v-model="addjinsi.form.brandName1" size="mini" @change="addjinsiBrandChange" style="margin-left: 10px;">
                        <el-option v-for="item in searchDiv_3_0_list" :key="item.value" :label="item.text" :value="item.id"></el-option>
                    </el-select>
                    <span style="margin-left: 20px;">选择品牌</span>
                    <el-select
                        v-model="addjinsi.form.brandName2"
                        style="margin-left: 10px;"
                        size="mini"
                        placeholder="请选择">
                        <el-option
                            v-for="(item, index) in addjinsi.brandNameList"
                            :key="index"
                            :label="item.brandName"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-radio v-model="addjinsi.form.radio" label="4">按尺寸</el-radio>
                    <span>长</span>
                    <el-input style="width:100px;margin-left: 10px" size="mini" v-model="addjinsi.form.width" placeholder="请输入长"></el-input>
                    <span style="margin-left: 20px;">宽</span>
                    <el-input style="width:100px;margin-left: 10px" size="mini" v-model="addjinsi.form.height" placeholder="请输入宽"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addjinsi.alertType = false" size="mini">取 消</el-button>
                <el-button type="primary" @click="addjinsiSubmit" size="mini">下一步</el-button>
            </div>
        </el-dialog>

        <el-dialog title="选择模板" :visible.sync="addjinsi.alertType2" width="80%">
            <el-checkbox v-model="addjinsi.checkedAll" @change="checkedAllClick" style="margin-bottom: 10px;">全选</el-checkbox>
            <ul id="addjinsiUl">
                <li v-for="(item, index) in addjinsi.imgList" :key="index" v-show="index>=(addjinsi.number-1)*5&&index<addjinsi.number*5">
                    <el-checkbox @change="checkedClick" v-model="item.checked" style="position: absolute;top: 0;left: 5px;"></el-checkbox>
                    <el-image :src="item.masterUrl" fit="contain"></el-image>
                    <div class="bottom clearfix" style="display: flex;height: 16px;font-size: 12px; position: absolute;bottom: -20px;width: 100%">
                        <div style="width: 100%;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">
                            <span style="color: #409EFF;font-weight: bold; ">{{ item.labelName }}</span>
                            <span> - {{ item.sceneName }} - {{ item.width }} x {{ item.height }}</span>
                            <span style="color: #ccc;margin-left: 10px;">图层数：{{item.layerCount}}</span>
                        </div>
                    </div>
                </li>
            </ul>
            <div style="font-size: 13px;text-align: right;margin-top: 30px;">
                <span @click="nextImg" style="cursor: pointer;color: #409EFF;padding-right: 20px;"><i class="el-icon-refresh"></i>下一批</span>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addjinsi.alertType=true,addjinsi.alertType2=false" size="mini">上一步</el-button>
                <el-button type="primary" @click="addjinsiSubmit2" size="mini">下一步</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
import $ from "jquery";
import draggable from "vuedraggable";
import {
    recommendModel,
    constQuery,
    queryCollectList,
    homeCollect,
    sort_top //置顶
} from "../../api/picturePs/home";
import {
    queryBrand,
} from "../../api/auth/picturePs";
import {
    replaceDate_1
} from "../../utils/public";
export default {
    data() {
        return {
            addjinsi: {
                sortLogo: "",
                number: 1,
                checkedAll: false,
                alertType: false,
                alertType2: false,
                brandNameList: [],
                imgList: [],
                form: {
                    radio: "1",
                    zhuti: "",
                    labelId: "",
                    sceneName: "",
                    brandName: "",
                    brandName2: "",
                    width: "",
                    height: ""
                }
            },
            search: {
                brandName1: "",
                brandName2: []
            },
            brandNameList: [],
            radioSearch: "来自模板",
            searchVal: "",
            searchDiv_3_1_bt: "primary",
            searchDiv_3_2_bt: "primary",
            searchDiv_3_0_bt: "primary",
            searchDiv_3_0_list: [],
            searchDiv_3_list: [],
            searchDiv_4_list: [],
            list1: [],
            list2: [],
            imglistAll: [],
            imglist1: [
                [{isTop:""}]
            ],
            checkedImgsAll: [],
            checkedImgs: [],
            isIndeterminate: [],
            currentPage: 1,
            pageSize: 8,
            total: 0
        };
    },
    components: {
        draggable
    },
    beforeCreate (){

    },
    created() {
        constQuery()
            .then(response => {
                let datalist3 = [];
                let datalist4 = [];
                let datalist0 = [];
                response.data.brands.map((item)=>{
                    datalist0.push({
                        text: item.brandName,
                        id: item.id,
                        type: false
                    });
                });
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
                this.searchDiv_3_list = datalist3;
                this.searchDiv_4_list = datalist4;
                this.searchDiv_3_0_list = datalist0;
            })
            .catch(() => {

            });
        this.indexAxios();
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
        checkedAllClick() {
            if(this.addjinsi.checkedAll){
                this.addjinsi.imgList.map((item, index)=>{
                    if(index>=(this.addjinsi.number-1)*5&&index<this.addjinsi.number*5) {
                        item.checked = true;
                    }
                })
            } else {
                this.addjinsi.imgList.map(item=>{
                    item.checked = false;
                });
            }
        },
        checkedClick() {
            let checkNumber = 0;
            this.addjinsi.imgList.map(item=>{
                if (item.checked) {
                    checkNumber += 1;
                }
            });
            if(this.addjinsi.number == Math.ceil(this.addjinsi.imgList.length/5)){
                let newNumber = this.addjinsi.imgList.length % 5;
                newNumber = newNumber==0?5:newNumber;
                if (checkNumber === newNumber) {
                    this.addjinsi.checkedAll = true;
                } else {
                    this.addjinsi.checkedAll = false;
                }
            } else {
                if (checkNumber === 5) {
                    this.addjinsi.checkedAll = true;
                } else {
                    this.addjinsi.checkedAll = false;
                }
            }
        },
        nextImg() {
            this.addjinsi.number += 1;
            this.addjinsi.imgList.map(item=>{
                item.checked = false;
            });
            this.addjinsi.checkedAll = false;
            if(this.addjinsi.number>Math.ceil(this.addjinsi.imgList.length/5)){
                this.addjinsi.number = 1;
            }
        },
        addjinsiSubmit() {
            let submit2 = false;
            let submit3 = false;
            let submit4 = false;
            let form = {
                sortLogo: this.addjinsi.sortLogo, //分类标识 （必传）
                sceneName: this.addjinsi.form.sceneName, //场景（默认 空字符串）
                labelId: this.addjinsi.form.labelId, //标签id（默认0）
                brandId: this.addjinsi.form.brandName2, //品牌id（默认0）
                width: this.addjinsi.form.width,
                height: this.addjinsi.form.height,
                type: this.addjinsi.form.radio //推荐方式 1按距离 2按主题 3按品牌（必传）
            };
            if(this.addjinsi.form.radio==2) {
                if(this.addjinsi.form.sceneName==""||this.addjinsi.form.labelId==""){
                    submit2 = true;
                }
            } else if(this.addjinsi.form.radio==3) {
                if(this.addjinsi.form.brandName2==""){
                    submit3 = true;
                }
            } else if(this.addjinsi.form.radio==4) {
                if(this.addjinsi.form.width==""||this.addjinsi.form.height==""){
                    submit4 = true;
                }
            }
            if(submit2) {
                this.$message.error('请填写完整模板主题！');
                return;
            }
            if(submit3) {
                this.$message.error('请填写完整模板品牌！');
                return;
            }
            if(submit4) {
                this.$message.error('请填写完整模板尺寸！');
                return;
            }
            recommendModel(form)
                .then(response => {
                    if(response.data.length == 0){
                        this.$message({
                            message: '未搜索到可用模板，请换个条件试试！',
                            type: 'warning'
                        });
                        return;
                    }
                    this.addjinsi.alertType = false;
                    this.addjinsi.alertType2 = true;
                    response.data.map(item=>{
                        item.checked = false;
                    });
                    this.addjinsi.imgList = response.data;
                })
                .catch(() => {

                });
        },
        addjinsiSubmit2() {
            let id = [];
            let textVal = [];
            this.addjinsi.imgList.map(item=>{
                if(item.checked) {
                    id.push(item.id)
                    textVal.push({username:item.labelName+"-"+item.sceneName,width:item.width,height:item.height})
                }
            });
            if (id.length == 0) {
                this.$message.error('请先选择模板！');
                return;
            }
            let sortLogo = {
                background: this.addjinsi.sortLogo.split("：")[1].split("product")[0],
                product: this.addjinsi.sortLogo.split("：")[2].split("logo")[0],
                logo: this.addjinsi.sortLogo.split("：")[3].split("price")[0],
                price: this.addjinsi.sortLogo.split("：")[4].split("text")[0],
                text: this.addjinsi.sortLogo.split("：")[5].split("extra")[0],
                extra: this.addjinsi.sortLogo.split("：")[6]
            };
            console.log(sortLogo)
            this.$router.push({path: "/picturePs/index/collection/recommendImg", query: {id:id.join(","),sortLogo:JSON.stringify(sortLogo),textVal:JSON.stringify(textVal)}});
        },
        addjinsiBrandChange() {
            this.addjinsi.brandNameList = [];
            this.addjinsi.form.brandName2 = "";
            queryBrand(this.addjinsi.form.brandName1)
                .then(response => {
                    this.addjinsi.brandNameList = response.data;
                })
                .catch(() => {

                });
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
        zhidngclick(val,type) {
            sort_top({sortLogo :val[0].sortLogo,type :type==true?"save":"cancel"})
                .then(response => {
                    if(response.code == "0"){
                        this.$message({
                            type: 'success',
                            message: response.msg,
                            duration:1500
                        });
                        this.indexAxios();
                    }
                })
                .catch(() => {});
        },
        handleSizeChange(val) {
            this.currentPage = 1;
            this.pageSize = Number(`${val}`);
            this.handleCurrentChange();
        },
        handleCurrentChange(){
            this.imglist1 = this.imglistAll.slice((this.currentPage-1)*this.pageSize,this.pageSize*this.currentPage);
        },
        fontChange(data){
            data.fontStyle = data.fontFamile[1];
        },
        indexAxios() {
            let data = {
                brandId: this.search.brandName2.join(","),
                sceneName: "",
                labelId: ""
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
            queryCollectList(data)
                .then(response => {
                    if(response.code){
                        this.imglist1 = [];
                        return;
                    }
                    let imgList = new Array();
                    response.data.map((item)=>{
                        this.checkedImgsAll.push(item.id);
                        if (item.width / item.height > 2) {
                            item.type = 0;
                        } else {
                            item.type = 1;
                        }
                        item.select = false;
                        this.checkedImgs[item.sortNo - 1] = [];
                        this.checkedImgsAll[item.sortNo - 1] = [];
                        this.isIndeterminate[[item.sortNo - 1]] = false;
                        imgList[item.sortNo - 1] = [];
                    });
                    response.data.map((item)=>{
                        imgList[item.sortNo - 1].push(item);
                        this.checkedImgsAll[item.sortNo - 1].push(item.id);
                    });
                    imgList.map(item => {
                        this.list2.push(item[0].layerNames);
                        this.list1.push([]);
                    });
                    this.total = imgList.length;
                    this.imglistAll = imgList;
                    this.imglist1 = this.imglistAll.slice((this.currentPage-1)*this.pageSize,this.pageSize*this.currentPage);
                })
                .catch(() => {});
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
        searteitemClick(val) {
            this.searchVal = val;
            this.indexAxios();
        },
        handleCheckAllChange(index) {
            if (this.isIndeterminate[index] === false) {
                this.imglist1[index].map(item => {
                    item.select = false;
                })
                this.checkedImgs[index]=[];
            } else {
                this.imglist1[index].map(item => {
                    item.select = true;
                })
                this.checkedImgs[index] = this.checkedImgsAll[index];
            }
            /*this.isIndeterminate[index] = !this.isIndeterminate[index];*/
        },
        imgclick(val, index) {
            let formList = [];
            let submit = true;
            val.map(item => {
                if(item.select) {
                    formList.push(item.id)
                }
                if(item.status == 2) {
                    submit = false;
                }
            });
            if (formList.length === 0) {
                this.$message.error("请选择需要的模板！");
                return false;
            }
            if (submit == false) {
                this.$message.error("已下架模板不能选择使用！");
                return false;
            }
            this.$router.push({path: "/picturePs/index/collection/upImages", query: {id:formList.join(","),list1:this.list1[index],list2:this.list2[index]}});
        },
        imgToClick(val) {
            this.$router.push({path: "/picturePs/index/collection/next", query: {id:val.id,username:val.username+"-"+val.labelName+"-"+val.sceneName,width:val.width,height:val.height}});
        },
        imgchange(index) {
            let checkedImgs = [];
            this.imglist1[index].map(item => {
                if (item.select) {
                    checkedImgs.push(item.id);
                }
            });
            this.checkedImgs[index] = checkedImgs;
            this.isIndeterminate[index] = this.checkedImgs[index].length === this.checkedImgsAll[index].length;
        },
        shoucangClick(val, id) {
            let form = {
                modelId: id,
                type: val
            };
            homeCollect(form)
                .then(response => {
                    this.indexAxios();
                })
                .catch(() => {

                });
        }
    },
    filters: {
        clickType(type) {
            return type ? "primary" : "text";
        },
        replaceDate_1: replaceDate_1
    },
    mounted: function() {},
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
#addjinsiUl {
    display: flex;
    align-items: center;
    li {
        width: 20%;
        margin-right: 20px;
        padding: 0;
        height: 200px;
        border: 1px solid #ccc;
        position: relative;
        line-height: initial;
        .el-image {
            width: 100%;
            height: 100%;
        }
    }
}
.collection {
    .el-dialog {
        min-width: 800px;
    }
}
.clear {
    clear: both;
}
.radioSearch {
    text-align: center;
    margin-top: 20px;
}
.radioSearch .el-radio-button:first-child .el-radio-button__inner {
    border-radius: 0;
}
.el-radio-button:last-child .el-radio-button__inner {
    border-radius: 0;
}
.searchDiv_1 {
    width: 40%;
    margin: 0 auto;
    margin-top: 20px;
}
.searchDiv_2 {
    border-bottom: 1px solid #ccc;
}
.collection .searchDiv_2,.collection .searchDiv_3,.collection .searchDiv_4 {
    width: 100%;
    margin: 0 auto;
    padding: 10px;
    display: flex;
    align-items: center;
}
.collection .el-dropdown {
    font-size: 12px;
    color: #000;
}
.collection ul li {
    float: left;
    line-height: 30px;
    height: 30px;
    padding: 0 10px;
}
.collection .el-button--text {
    color: #000;
}
.collection .el-button--text:focus {
    color: #000;
}
.collection .searchDiv_2_1 {
    float: left;
}
.collection .searchDiv_2_2 {
    float: right;
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
.spanName {
    padding: 4px 10px;
    background: #409EFF;
    color: #fff;
    margin-right: 20px;
    flex: none;
    margin-bottom: 10px;
}
.collection .list-group-item {
    display: inline-block;
    border: 1px solid rgba(0,0,0,.125);
    padding: 4px 20px;
    margin-right: 20px;
    cursor: move;
    margin-bottom: 10px;
    height: 222px;
}
.list-group {
    width: 100%;
}
.el-card__body {
    padding: 0;
}
.el-checkbox-group .el-checkbox__input.is-checked + .el-checkbox__label {
    display: none;
}
.el-checkbox-group .el-checkbox__label {
    display: none;
}
#app .widthImg {
    text-align: center;
    line-height: 150px;
    width: 100%;
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
.border_bottom {
    border-bottom: 1px solid rgb(235, 238, 245);
}
</style>
