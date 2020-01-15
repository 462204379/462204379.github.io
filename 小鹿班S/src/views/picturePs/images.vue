<template>
    <div>
        <div :style="{'top':scrollTop+'px'}" style="color: #fff;background: #657081;height: 40px;line-height: 40px;padding: 0 20px;position: fixed;width: 100%;z-index: 99;">
            <span style="margin-left: 20px;cursor: pointer;"  @click="$router.go(-1)"><i class="el-icon-arrow-left"></i>返回</span>
        </div>
        <div id="psImages" v-loading="loadings"
             element-loading-text="正在加载中"
             element-loading-spinner="el-icon-loading">
            <el-row style="display: flex;align-items: center;border: 1px solid #ebeef5;border-bottom: none;" v-if="indexId==0">
                <el-col :span="4" style="text-align: center;">
                    常量
                </el-col>
                <el-col :span="20" style="border-left: 1px solid #ebeef5;">
                    <div v-for="(item, index) in formData[indexId]" :key="index" style="align-items: center;display: flex;padding: 10px" v-if="list1.indexOf(item.layerNum) != '-1'">
                        <span class="spanLabel">{{item.layerName}}:</span>
                        <el-input v-model="item.textContent" size="mini" style="width: 50%;" v-if="item.textContent" :disabled="true"></el-input>
                        <div v-else>
                                <el-image v-if="item.imageUrl" :src="item.imageUrl" class="avatar" style="width: 200px;height: 100px;line-height: 100px;border: 1px solid #ccc;" fit="contain">
                                    <div slot="error" class="image-slot">
                                        <i class="el-icon-picture-outline"></i>
                                    </div>
                                </el-image>
                                <div style="text-align: center;">{{item.width}}X{{item.height}}</div>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <el-row style="display: flex;align-items: center;border: 1px solid #ebeef5;">
                <el-col :span="4" style="text-align: center;">
                    变量
                </el-col>
                <el-col :span="20" style="border-left: 1px solid #ebeef5;">
                    <div v-for="(item, index) in formData[indexId]" :key="index" style="align-items: center;display: flex;padding: 10px" v-if="list2.indexOf(item.layerNum) != '-1'">
                        <span class="spanLabel">{{item.layerName}}:</span>
                        <el-input v-model="item.textContent" size="mini" style="width: 50%;" v-if="item.imageUrl == null" name="formInput"></el-input>
                        <div v-else style="position: relative;">
                                <el-image @click="imgClick(index)" v-if="item.imageUrl" :src="item.imageUrl" class="avatar" style="width: 200px;height: 100px;line-height: 100px;border: 1px solid #ccc;cursor: pointer;" fit="contain">
                                    <div slot="error" class="image-slot" @click="imgClick(index)">
                                        <i class="el-icon-picture-outline"></i>
                                    </div>
                                </el-image>
                                <div>{{item.width}}X{{item.height}}</div>
                        </div>
                        <div style="margin-left: 20px" @click="caijianClick(item)" v-if="item.imageUrl != null">
                            <el-button type="primary" size="mini">裁剪</el-button></div>
                        <div style="margin-left: 10px" @click="zhinengcaijian(item)" v-if="item.imageUrl != null">
                            <el-button type="primary" size="mini">智能裁剪</el-button>
                        </div>
                    </div>
                    <div style="padding: 10px;">
                        <span class="spanLabel">品牌:</span>
                        <!--<el-select size="mini" style="width: 50%;" v-model="brandName[indexId]" filterable allow-create default-first-option placeholder="请添加品牌">
                            <el-option :label="item.id" :value="item.id" v-for="(item,index) in brandList" :key="index"></el-option>
                        </el-select>-->
                        <el-select @change="upfileBrandChange"  v-model="firstType[indexId]" placeholder="请选择" size="mini" filterable allow-create default-first-option >
                            <el-option
                                v-for="item in brandList"
                                :key="item.value"
                                :label="item.text"
                                :value="item.text">
                            </el-option>
                        </el-select>
                        <el-select  v-model="brandName[indexId]" placeholder="请选择" size="mini" filterable allow-create default-first-option style="margin-left: 5px">
                            <el-option
                                v-for="item in upbrandNameList"
                                :key="item.id"
                                :label="item.brandName"
                                :value="item.brandName">
                            </el-option>
                        </el-select>
                    </div>
                    <div style="text-align: center;margin: 20px;">
                        <el-button type="primary" size="mini" @click="previous" v-if="indexId===0" style="background: #c0c4cc;border: 1px solid #c0c4cc;" disabled>上一页</el-button>
                        <el-button type="primary" size="mini" @click="previous" v-else>上一页</el-button>
                        <el-button type="primary" size="mini" @click="next">下一页</el-button>
                        <div style="float: left">共{{formData.length}}页，当前页：{{indexId+1}}</div>
                    </div>
                </el-col>
            </el-row>
            <div style="text-align: center;margin-top: 20px;">
                <el-button type="primary" size="mini" style="width: 120px;" @click="formSubmit">完成({{brandName.length}})</el-button>
            </div>
        </div>
        <div class="backtop">
            <div class="backtop_bt" @click='goTop'>
                <div><i class="el-icon-caret-top"></i></div>
                <div>TOP</div>
            </div>
            <div class="backtop_text" @click="yulanClick">
                <i class="el-icon-view"></i>
                <p>预览</p>
            </div>
        </div>
        <el-dialog title="预览" :visible.sync="dialogTableVisible">
            <div v-loading="loading">
                <div class="demo-image__preview" v-for="(item,index) in yulanImg" :key="index" style="float: left;margin-right: 10px;width: 25%;">
                    <el-image style="width: 100%; height: auto;" :src="item" :preview-src-list="yulanList[index]" fit="fill"></el-image>
                </div>
                <div style="clear: both"></div>
            </div>
        </el-dialog>
        <div v-if="caijian" style="    position: fixed;width: 100%;height: 100%;background: rgb(0, 0, 0);opacity: 0.6;z-index: 99998;top: 100px;"></div>
        <transition name="el-zoom-in-top">
            <div style="width: 800px;height: 400px;margin: 0px auto;top: 200px;z-index: 99999;position: fixed;left: 50%;margin-left: -400px;" v-if="caijian">
                <vueCropper
                    ref="cropper"
                    :img="option.img"
                    :outputSize="option.size"
                    :outputType="option.outputType"
                    :info="true"
                    :full="option.full"
                    :canMove="option.canMove"
                    :canMoveBox="option.canMoveBox"
                    :fixedBox="option.fixedBox"
                    :original="option.original"
                    :autoCrop="option.autoCrop"
                    :centerBox="option.centerBox"
                    :high="option.high"
                    :infoTrue="option.infoTrue"
                    :enlarge="option.enlarge"
                ></vueCropper>
                <div style="position: absolute;right: 10px;bottom: 10px;font-size: 24px;background: #fff;-webkit-box-shadow: 0 0 10px #cecece;box-shadow: 0 0 10px #cecece;cursor: pointer;padding: 3px;">
                    <div class="caijian_yn">
                        <i style="color: #67C23A" class="el-icon-check" @click="jietuClick"></i>
                    </div>
                    <div class="caijian_yn">
                        <i style="color: #F56C6C" class="el-icon-close" @click="caijian=false"></i>
                    </div>
                </div>
            </div>
        </transition>

        <el-dialog :visible.sync="UpDataVisible" custom-class="UpDataVisible" top="35vh">
            <ul>
                <li class="title">插入图片</li>
                <li @click="upSucaiku"><i class="el-icon-picture"></i>从素材库<span class="liulan">浏览<i class="el-icon-caret-right"></i></span></li>
                <el-upload
                    class="avatar-uploader"
                    :action="BASE_URL+'/wow/sys/file/upFile'"
                    :show-file-list="false"
                    :before-upload="imgPreview"
                    :on-success="addimgPreview"
                >
                    <li><i class="el-icon-upload"></i>从本地<span class="liulan">浏览<i class="el-icon-caret-right"></i></span></li>
                </el-upload>
            </ul>
        </el-dialog>
        <el-collapse-transition>
            <matirialItem :matiriaVal="matiriaVal" @showhide="matiriaVisible=false" @enterClick="enterClick" v-show="matiriaVisible" ref="baseInfo"></matirialItem>
        </el-collapse-transition>
    </div>
</template>
<script>
    import { BASE_URL } from "../../config/app";
    import $ from "jquery";
    import { VueCropper }  from 'vue-cropper';
    import {
        psdTemplateItem,
        compoundImage,
        constQuery,
        model_preview,
        resizeImage,
        images_upload
    } from "../../api/picturePs/home";
    import {
        queryBrand,
    } from "../../api/auth/picturePs";
    import matirialItem from "./items/matirialItem.vue";
    import PicturepsItem from "./picturePsItem.vue";
    export default {
        data() {
            return {
                loadings:false,
                matiriaVisible: false,
                UpDataVisible: false,
                matiriaVal: {
                    imgLength: true,
                    mainHeight: "",
                    conterHeight: ""
                },
                BASE_URL: BASE_URL,
                caijian: false,
                caijianData: "",
                scrollTopZt: true,
                scrollTop: 130,
                indexId:0,
                list1:[],
                list2:[],
                listdata:"",
                formData:[],
                brandList:[],
                upbrandNameList:[],
                brandName:[],
                firstType:[],
                imgURL:"",
                yulanImg:[],
                yulanList:[],
                dialogTableVisible:false,
                loading:false,
                option: {
                    img: "",
                    size: 1,
                    outputType: "png",
                    full: false,
                    canMove: true,
                    canMoveBox: true,
                    fixedBox: false,
                    original: false,
                    autoCrop: true ,
                    centerBox: true ,
                    high: true,
                    infoTrue: true,//框框大小或原始图片大小
                    enlarge: 1
                }
            }
        },
        components: {
            PicturepsItem,
            VueCropper,
            matirialItem
        },
        created() {
            this.scrollTopZt = true;
            this.list1 = this.$route.query.list1||[];
            this.list2 = this.$route.query.list2||[];
            let form = {
                modelId: this.$route.query.id.split(",")[0]
            };
            psdTemplateItem(form)
                .then(response => {
                    this.listdata = JSON.parse(JSON.stringify(response.data));
                    this.formData.push(JSON.parse(JSON.stringify(response.data))) ;
                    //this.brandName.push("博朗");
                })
                .catch(() => {

                });
            constQuery()
                .then(response => {
                    let datalist1 = [];
                    response.data.brands.map((item, index)=>{
                            datalist1.push({
                                text: item.brandName,
                                id: item.id,
                                type: false
                            });
                    });
                    this.brandList = datalist1;
                })
                .catch(() => {

                });
        },
        mounted(){
            var that = this;
            this.matiriaVal.mainHeight = $(".main").height() - $("#pictureitem").height() - 38;
            this.matiriaVal.conterHeight = this.matiriaVal.mainHeight - 83 - 90;
            if (this.mainHeight > Number(that.height) + 88) {
                this.marginTop = (this.mainHeight - Number(this.height) - 88) / 2;
            }
            window.onresize = function () {  // 定义窗口大小变更通知事件
                that.matiriaVal.mainHeight = $(".main").height() - $("#pictureitem").height() - 38;
                that.matiriaVal.conterHeight = that.matiriaVal.mainHeight - 83 - 90;
            };
                $(".el-main").scroll(function(){
                    if(that.scrollTopZt) {
                        if (130 - $(this).scrollTop() > 60) {
                            that.scrollTop = 130 - $(this).scrollTop();
                        } else {
                            that.scrollTop = 60;
                        }
                    }
                });
        },
        methods: {
            upfileBrandChange(val) {
                this.upbrandNameList = [];
                this.brandName[this.indexId] = "";
                let subType = false;
                let brandId = "";
                this.brandList.map((item)=>{
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
            upSucaiku() {
                this.matiriaVisible=true;
                this.UpDataVisible=false;
                this.matiriaType='up';
                this.$refs.baseInfo.indexAxios();
                this.$refs.baseInfo.brandAxios();
                this.$refs.baseInfo.querySortList();
            },
            enterClick(val) {
                if(val.length > 1){
                    this.matiriaVisible = false;
                    if (!this.brandName[this.indexId]){
                        this.$message.warning("请先选择品牌！");
                        return;
                    }
                    let brandName = this.brandName[this.indexId];
                    let firstType = this.firstType[this.indexId];
                    val.map((item,index)=>{
                        if (index==0){
                            if (this.formData[this.indexId][this.imgURL].layerName.indexOf("产品图") != -1) {
                                this.formData[this.indexId][this.imgURL].layerName = "产品图-" + item.name;
                            }
                            this.formData[this.indexId][this.imgURL].imageUrl = item.url;
                        } else {
                            let formData = JSON.parse(JSON.stringify(this.formData[this.indexId]));
                            this.indexId+=1;
                            if (formData[this.imgURL].layerName.indexOf("产品图") != -1) {
                                formData[this.imgURL].layerName = "产品图-" + item.name;
                            }
                            formData[this.imgURL].imageUrl = item.url;
                            this.formData.push(formData);
                            this.brandName.push(brandName);
                            this.firstType.push(firstType);
                        }
                    });
                } else {
                    if (this.formData[this.indexId][this.imgURL].layerName.indexOf("产品图") != -1) {
                        this.formData[this.indexId][this.imgURL].layerName = "产品图-" + val[0].name;
                    }
                    this.formData[this.indexId][this.imgURL].imageUrl = val[0].url;
                    this.matiriaVisible = false;
                }
            },
            jietuClick() {
                this.$refs.cropper.startCrop();
                // 获取截图的blob数据
                this.$refs.cropper.getCropBlob((data) => {
                    let form = data;
                    images_upload(form)
                        .then(response => {
                            this.caijianData.imageUrl = response.data.url;
                            this.caijian = false;
                        })
                        .catch(() => {
                        });
                })
            },
            caijianClick (val){
                this.option.img = val.imageUrl;
                this.caijianData = val;
                this.caijian = true;
            },
            zhinengcaijian (itemurl){
                resizeImage({imagePath:itemurl.imageUrl})
                    .then(response => {
                        this.loading = false;
                        if (response.code) {
                            return false;
                        } else {
                            itemurl.imageUrl = response.data;
                            this.$message({
                                type: "success",
                                message: "裁剪成功!"
                            });
                        }
                    })
                    .catch(() => {
                        this.dialogVisible = false;
                    });
            },
            imgClick(index) {
                this.imgURL = index;
                this.UpDataVisible = true;
            },
            imgPreview(file) {
                const isJPG = file.type === 'image/jpeg'||file.type === 'image/png';
                const isLt2M = file.size / 1024 / 1024 < 10;

                if (!isJPG) {
                    this.$message.error('请上传正确的图片!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 10MB!');
                }
                return isJPG && isLt2M;
            },
            addimgPreview(response) {
                if (response.code) {
                    this.$message.error(response.msg);
                } else {
                    this.formData[this.indexId][this.imgURL].imageUrl = response.data.url;
                    this.UpDataVisible = false;
                }
            },
            previous(){
                if(!this.brandName[this.indexId]){
                    this.$message({
                        message: '请填写完整表单',
                        type: 'warning'
                    });
                    return;
                }
                this.indexId-=1;
            },
            next(){
                let submitType = true;
                $.each($("input[name='formInput']"),function (i,v) {
                    if($(v).val()===""){
                        submitType = false;
                    }
                });
                if(!this.brandName[this.indexId]){
                    submitType = false;
                }
                if(submitType===false){
                    this.$message({
                        message: '请填写完整表单',
                        type: 'warning'
                    });
                    return;
                }
                 this.indexId+=1;
                 if(this.indexId == this.formData.length){
                     this.formData.push(JSON.parse(JSON.stringify(this.formData[0])))
                     //this.brandName.push("博朗")
                 }
            },
            formSubmit() {
                let data = [];
                if(!this.brandName[this.indexId]){
                    this.$message({
                        message: '请填写完整表单',
                        type: 'warning'
                    });
                    return;
                }
                this.formData.map((item, index)=>{
                    let bianliang = [];
                    item.map(items=>{
                        if(this.list2.indexOf(items.layerNum) != "-1"){
                            bianliang.push(items)
                        }
                    })
                    data.push({
                        modelItems:bianliang,
                        brandName:this.brandName[index],
                        firstType:this.firstType[index]
                    })
                });
                let formData ={
                    modelIds:this.$route.query.id.split(","),
                    list:data
                };
                this.loadings = true;
                compoundImage(formData)
                    .then(response => {
                        this.loadings = false;
                        if (response.code) {
                            this.$message.error(response.msg);
                        } else {
                            this.$router.push({path: "/picturePs/index/works"});
                        }
                    })
                    .catch(() => {});
            },
            yulanClick() {
                let data = [];
                let bianliang = [];
                this.formData[this.indexId].map(items=>{
                    if(this.list2.indexOf(items.layerNum) != "-1"){
                        bianliang.push(items)
                    }
                });
                data.push({
                    modelItems:bianliang,
                    brandName:this.brandName[this.indexId]
                });
                let formData ={
                    modelIds:this.$route.query.id.split(","),
                    list:data
                };
                this.loading = true;
                this.dialogTableVisible = true;
                model_preview(formData)
                    .then(response => {
                        if (response.code) {
                            this.$message.error(response.msg);
                        } else {
                            this.loading = false;
                            let yulanImg =[];
                            response.data.map((item,index)=>{
                                let imglist = [item];
                                yulanImg.push(imglist)
                            });
                            this.yulanList = yulanImg;
                            this.yulanImg = response.data;
                        }
                    })
                    .catch(() => {});
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
        beforeDestroy() {
            this.scrollTopZt = false;
        }
    }
</script>

<style type="text/scss" lang="scss">
#psImages {
    padding: 10px 20%;
    margin-top: 70px;
}
#psImages .spanLabel{
    display: inline-block;
    width: 160px;
}
.UpDataVisible {
    width: 400px;
    .el-upload{
        width: 100%;
    }
    .el-dialog__body {
        padding: 60px 40px;
        padding-top: 0;
    }
    .el-dialog__header {
        border:none;
    }
    ul {
        .title {
            font-size: 18px;
            color: #409eff;
        }
        li{
            padding: 10px 0;
            border-bottom: 1px solid #ccc;
            cursor: pointer;
            display: flex;
            align-items: center;
            position: relative;
            .el-icon-picture,.el-icon-upload {
                margin-right: 5px;
                font-size: 16px;
            }
            .liulan {
                position: absolute;
                right: 50px;
                display: flex;
                align-items: center;
            }
            .el-icon-caret-right {
                margin-left: 10px;
                font-size: 20px;
            }
        }
    }
}
</style>
