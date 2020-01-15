<template>
    <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm" style="width: 50%;margin: 50px auto;">
            <el-form-item label="1.选择文件" prop="fileList">
                <el-upload
                    style="width:420px;"
                    class="upload-demo"
                    ref="upload"
                    drag
                    :action="BASE_URL+'/wow/sys/file/upFile'"
                    :auto-upload="false"
                    :on-change="uploadimg"
                    :on-success="okuploadimg"
                    name="file"
                    :multiple="false"
                    :file-list="ruleForm.fileList"
                >
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em>(只能上传psd文件)</div>
                </el-upload>
            </el-form-item>
            <el-form-item label="2.添加活动标签（可自定义）" prop="labelName">
                <el-select v-model="ruleForm.labelName" filterable allow-create default-first-option placeholder="请添加活动标签">
                    <el-option :label="item.id" :value="item.id" v-for="(item,index) in searchDiv_2_list" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="3.活动标签时间（点击选择）" prop="sceneDate">
                <el-select v-model="ruleForm.sceneDate" allow-create placeholder="请选择时间标签">
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
            </el-form-item>
            <el-form-item label="4.添加使用场景（可自定义）" prop="sceneName">
                <el-select v-model="ruleForm.sceneName" filterable allow-create default-first-option placeholder="请添加使用场景">
                    <el-option :label="item.id" :value="item.id" v-for="(item,index) in searchDiv_1_list" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="5.添加活动品牌（可自定义）" prop="brandName">
                <el-select @change="upfileBrandChange" v-model="ruleForm.firstType" filterable allow-create default-first-option placeholder="请添加活动品牌">
                    <el-option :label="item.brandName" :value="item.brandName" v-for="(item,index) in searchDiv_3_list" :key="index"></el-option>
                </el-select>
                <el-select v-model="ruleForm.brandName" placeholder="请选择" filterable allow-create default-first-option style="margin-left: 10px">
                    <el-option
                        v-for="item in upbrandNameList"
                        :key="item.id"
                        :label="item.brandName"
                        :value="item.brandName">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')" :loading="loading">下一步</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form>
    </div>
</template>
<script>
import { BASE_URL } from "../../config/app";
import {
    constQuery
} from "../../api/picturePs/home";
import {
    createFile
} from "../../api/file/upload";
import {
    queryBrand,
} from "../../api/auth/picturePs";
import {
    setName,
    getName,
    removeName,
    setSessionStorage
} from "../../utils/auth";
export default {
    data() {
        return {
            upbrandNameList: [],
            BASE_URL: BASE_URL,
            loading: false,
            searchDiv_1_list:[],
            searchDiv_2_list:[],
            searchDiv_3_list:[],
            ruleForm: getName('templateData')|| {
                fileList: [],
                sceneName: "",
                sceneDate: "",
                labelName: "",
                brandName: "",
                imgUrl: "",
                firstType: ""
            },
            rules: {
                fileList:[
                    {required: true, message: '请选择PSD文件', trigger: 'change'}
                ],
                sceneName: [
                    {required: true, message: '请添加使用场景', trigger: 'change'}
                ],
                sceneDate: [
                    {required: true, message: '请添加时间标签', trigger: 'change'}
                ],
                labelName: [
                    {required: true, message: '请添加活动标签', trigger: 'change'}
                ],
                brandName: [
                    {required: true, message: '请添加活动品牌', trigger: 'change'}
                ]
            },
        }
    },
    components: {},
    created() {
        constQuery()
            .then(response => {
                let datalist1 = [];
                let datalist2 = [];
                response.data.scenes.map((item, index)=>{
                    if (index <= 10) {
                        datalist1.push({
                            text: item.sceneName,
                            id: item.sceneName,
                            type: false
                        });
                    }
                });
                response.data.labels.map((item, index)=>{
                    if (index <= 10) {
                        datalist2.push({
                            text: item.labelName,
                            id: item.labelName,
                            type: false
                        });
                    }
                });
                this.searchDiv_3_list = response.data.brands;
                this.searchDiv_1_list = datalist1;
                this.searchDiv_2_list = datalist2;
            })
            .catch(() => {

            });
    },
    methods: {
        upfileBrandChange (val){
            this.upbrandNameList = [];
            this.ruleForm.brandName = "";
            let subType = false;
            let brandId = "";
            this.searchDiv_3_list.map((item)=>{
                if(item.brandName==val){
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
        okuploadimg(response) {
            let that = this;
            if (response.code) {
                if (response.code === 403) {
                    this.$router.push({ path: "/login"});
                } else {
                    setTimeout(function() {
                        that.ruleForm.fileList = [];
                    }, 800);
                    this.$message.error(response.msg);
                }
            } else {
                this.$message({
                    message: response.msg,
                    type: "success"
                });
                that.ruleForm.imgUrl = response.data.url;
            }
        },
        uploadimg(file) {
            if (file.name.split(".")[1] !== "psd") {
                this.$message.error("只能上传PSD文件");
                this.ruleForm.fileList = [];
                return;
            }
            var maxsize = 1024 * 1024 * 100;
            this.ruleForm.fileList = [file];
            if (file.size > maxsize) {
                this.$message.error("上传文件大小不能超过100Mb");
                this.ruleForm.fileList = [];
                return;
            }
            this.$refs.upload.submit();
        },
        submitForm(formName) {
            setName('templateData',this.ruleForm);
            let that = this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.loading = true;
                    createFile({psd: this.ruleForm.imgUrl,firstType: this.ruleForm.firstType, sceneName: this.ruleForm.sceneName,sceneDate:this.ruleForm.sceneDate, labelName: this.ruleForm.labelName,brandName:this.ruleForm.brandName })
                        .then(response => {
                            this.loading = false;
                            if (response.code) {
                                return false;
                            } else {
                                //let jsondata = JSON.stringify(response.data);
                                setSessionStorage("jsonData", response.data)
                                setName("templateData",that.ruleForm);
                                this.$router.push({ path: "/picturePs/index/template/next/upPSD"});
                            }
                        })
                        .catch(() => {
                            this.loading = false;
                        });
                } else {
                    return false;
                }
            });
        },
        resetForm(formName) {
            removeName("templateData");
            this.$refs[formName].resetFields();
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
    }
};
</script>

<style>
.el-upload-dragger{
    width: 420px;
}
</style>
