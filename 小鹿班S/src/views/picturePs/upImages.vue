<template>
    <div>
        <div id="upImages">
            <el-row  style="margin: 20px 20px;font-size: 16px;">
                <el-col>
                    <span @click="fanhuiClick" style="color: #409EFF;">我的收藏</span>
                    <span style="padding: 0 10px"> > </span>
                    <span style="color: rgb(229, 28, 35);">(*图片预览请下拉)</span>
                </el-col>
            </el-row>
            <el-row :gutter="12" style="margin: 40px 20px;margin-top: 0;">
                <el-col :span="12" class="leftForms">
                    <el-card shadow="hover" style="padding: 20px">
                        <div class="form">
                            <div class="title">1、主模板<span>（同类图层可进行拖拽排序）</span></div>
                            <div class="content">
                                <div style="width: 100%;">
                                    <div class="th bg">
                                        <div class="td2">图层编号</div>
                                        <div class="td3">图层名称</div>
                                        <div class="td1"><el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange">常量</el-checkbox></div>
                                    </div>
                                    <div class="tr bg" v-if="indexData.logo.length != 0">
                                        <div class="leftForm-left td2">
                                            <div v-for="(item, index) in leftData.logo" :key="index">{{item}}-{{index+1}}</div>
                                        </div>
                                        <div class="leftForm-right td3">
                                            <div class="list-group-item list-group-right" v-for="(item, index) in indexData.logo" :key="index">
                                                <span style="flex: 1;line-height: 1;">{{item.layerName}}</span>
                                                <img class="list-group-item-img" v-if="item.imageUrl" :src="item.imageUrl" alt="">
                                            </div>
                                        </div>
                                        <div class="leftForm-left td1">
                                            <div v-for="(item, index) in indexData.logo" :key="index" style="height: 40px;line-height: 40px;">
                                                <el-checkbox  v-model="item.isConstant" name="type"></el-checkbox>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="tr bg" v-if="indexData.chanpinImg.length != 0">
                                        <div class="leftForm-left td2">
                                            <div v-for="(item, index) in leftData.chanpinImg" :key="index">{{item}}-{{index+1}}</div>
                                        </div>
                                        <div class="leftForm-right td3">
                                            <div class="list-group-item list-group-right" v-for="(item, index) in indexData.chanpinImg" :key="index">
                                                <span style="flex: 1;line-height: 1;">{{item.layerName}}</span>
                                                <img class="list-group-item-img" v-if="item.imageUrl" :src="item.imageUrl" alt="">
                                            </div>
                                        </div>
                                        <div class="leftForm-left td1">
                                            <div v-for="(item, index) in indexData.chanpinImg" :key="index" style="height: 40px;line-height: 40px;">
                                                <el-checkbox  v-model="item.isConstant" name="type"></el-checkbox>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="tr bg" v-if="indexData.wenan.length != 0">
                                        <div class="leftForm-left td2">
                                            <div v-for="(item, index) in leftData.wenan" :key="index">{{item}}-{{index+1}}</div>
                                        </div>
                                        <div class="leftForm-right td3">
                                            <div class="list-group-item" v-for="(item, index) in indexData.wenan" :key="index">{{item.layerName}}</div>
                                        </div>
                                        <div class="leftForm-left td1">
                                            <div v-for="(item, index) in indexData.wenan" :key="index" style="height: 40px;line-height: 40px;">
                                                <el-checkbox  v-model="item.isConstant" name="type"></el-checkbox>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="tr bg" v-if="indexData.money.length != 0">
                                        <div class="leftForm-left td2">
                                            <div v-for="(item, index) in leftData.money" :key="index">{{item}}-{{index+1}}</div>
                                        </div>
                                        <div class="leftForm-right td3">
                                            <div class="list-group-item" v-for="(item, index) in indexData.money" :key="index">{{item.layerName}}</div>
                                        </div>
                                        <div class="leftForm-left td1">
                                            <div v-for="(item, index) in indexData.money" :key="index" style="height: 40px;line-height: 40px;">
                                                <el-checkbox  v-model="item.isConstant" name="type"></el-checkbox>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="tr bg" v-if="indexData.rest.length != 0">
                                        <div class="leftForm-left td2">
                                            <div v-for="(item, index) in leftData.rest" :key="index">{{item}}-{{index+1}}</div>
                                        </div>
                                        <div class="leftForm-right td3">
                                            <div class="list-group-item list-group-right" v-for="(item, index) in indexData.rest" :key="index">
                                                <span style="flex: 1;line-height: 1;">{{item.layerName}}</span>
                                                <img class="list-group-item-img" v-if="item.imageUrl" :src="item.imageUrl" alt="">
                                            </div>
                                        </div>
                                        <div class="leftForm-left td1">
                                            <div v-for="(item, index) in indexData.rest" :key="index" style="height: 40px;line-height: 40px;">
                                                <el-checkbox  v-model="item.isConstant" name="type"></el-checkbox>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="tr bg" v-if="indexData.backImg.length != 0">
                                        <div class="leftForm-left td2">
                                            <div v-for="(item, index) in leftData.backImg" :key="index">{{item}}-{{index+1}}</div>
                                        </div>
                                        <div class="leftForm-right td3">
                                            <div class="list-group-item list-group-right" v-for="(item, index) in indexData.backImg" :key="index">
                                                <span style="flex: 1;line-height: 1;">{{item.layerName}}</span>
                                                <img class="list-group-item-img" v-if="item.imageUrl" :src="item.imageUrl" alt="">
                                            </div>
                                        </div>
                                        <div class="leftForm-left td1">
                                            <div v-for="(item, index) in indexData.backImg" :key="index" style="height: 40px;line-height: 40px;">
                                                <el-checkbox  v-model="item.isConstant" name="type"></el-checkbox>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style="height: 50px"></div>
                    </el-card>
                </el-col>
                <el-col :span="12" class="rightForms">
                    <el-card shadow="hover" style="padding: 20px">
                        <div class="form">
                            <div class="title">2、子模板的模板:设置图层对应关系: {{rightIndex+1}}.{{rightData[rightIndex].templateData.labelName}}-{{rightData[rightIndex].templateData.sceneName}}</div>
                            <div class="content">
                                <div style="width: 100%;border-right: 1px solid #ccc;">
                                    <div class="th bg">
                                        <div>图层编号</div>
                                        <div>图层名称<span style="color:#E51C23;">（同类图层可进行拖拽排序）</span></div>
                                    </div>
                                    <div class="tr bg" v-if="leftData.logo.length != 0">
                                        <div class="leftForm-left right-td1">
                                            <div v-for="(item, index) in leftData.logo" :key="index">{{item}}-{{index+1}}</div>
                                        </div>
                                        <div class="leftForm-right right-td2">
                                            <draggable class="list-group" :list="rightData[rightIndex].logo" group="people1">
                                                <div class="list-group-item list-group-right" v-for="(item, index) in rightData[rightIndex].logo" :key="index">
                                                    <span style="flex: 1;line-height: 1;">{{item.layerName}}</span>
                                                    <img class="list-group-item-img" v-if="item.imageUrl" :src="item.imageUrl" alt="">
                                                </div>
                                            </draggable>
                                        </div>
                                    </div>
                                    <div class="tr bg" v-if="leftData.chanpinImg.length != 0">
                                        <div class="leftForm-left right-td1">
                                            <div v-for="(item, index) in leftData.chanpinImg" :key="index">{{item}}-{{index+1}}</div>
                                        </div>
                                        <div class="leftForm-right right-td2">
                                            <draggable class="list-group" :list="rightData[rightIndex].chanpinImg" group="people2">
                                                <div class="list-group-item list-group-right" v-for="(item, index) in rightData[rightIndex].chanpinImg" :key="index">
                                                    <span style="flex: 1;line-height: 1;">{{item.layerName}}</span>
                                                    <img class="list-group-item-img" v-if="item.imageUrl" :src="item.imageUrl" alt="">
                                                </div>
                                            </draggable>
                                        </div>
                                    </div>
                                    <div class="tr bg" v-if="leftData.wenan.length != 0">
                                        <div class="leftForm-left right-td1">
                                            <div v-for="(item, index) in leftData.wenan" :key="index">{{item}}-{{index+1}}</div>
                                        </div>
                                        <div class="leftForm-right right-td2">
                                            <draggable class="list-group" :list="rightData[rightIndex].wenan" group="people3">
                                                <div class="list-group-item" v-for="(item, index) in rightData[rightIndex].wenan" :key="index">{{item.layerName}}</div>
                                            </draggable>
                                        </div>
                                    </div>
                                    <div class="tr bg" v-if="leftData.money.length != 0">
                                        <div class="leftForm-left right-td1">
                                            <div v-for="(item, index) in leftData.money" :key="index">{{item}}-{{index+1}}</div>
                                        </div>
                                        <div class="leftForm-right right-td2">
                                            <draggable class="list-group" :list="rightData[rightIndex].money" group="people4">
                                                <div class="list-group-item" v-for="(item, index) in rightData[rightIndex].money" :key="index">{{item.layerName}}</div>
                                            </draggable>
                                        </div>
                                    </div>
                                    <div class="tr bg" v-if="leftData.rest.length != 0">
                                        <div class="leftForm-left right-td1">
                                            <div v-for="(item, index) in leftData.rest" :key="index">{{item}}-{{index+1}}</div>
                                        </div>
                                        <div class="leftForm-right right-td2">
                                            <draggable class="list-group" :list="rightData[rightIndex].rest" group="people5">
                                                <div class="list-group-item list-group-right" v-for="(item, index) in rightData[rightIndex].rest" :key="index">
                                                    <span style="flex: 1;line-height: 1;">{{item.layerName}}</span>
                                                    <img class="list-group-item-img" v-if="item.imageUrl" :src="item.imageUrl" alt="">
                                                </div>
                                            </draggable>
                                        </div>
                                    </div>
                                    <div class="tr bg" v-if="leftData.backImg.length != 0">
                                        <div class="leftForm-left right-td1">
                                            <div v-for="(item, index) in leftData.backImg" :key="index">{{item}}-{{index+1}}</div>
                                        </div>
                                        <div class="leftForm-right right-td2">
                                            <draggable class="list-group" :list="rightData[rightIndex].backImg" group="people6">
                                                <div class="list-group-item list-group-right" v-for="(item, index) in rightData[rightIndex].backImg" :key="index">
                                                    <span style="flex: 1;line-height: 1;">{{item.layerName}}</span>
                                                    <img class="list-group-item-img" v-if="item.imageUrl" :src="item.imageUrl" alt="">
                                                </div>
                                            </draggable>
                                        </div>
                                    </div>
                                </div>
                                <div class="alt">请确认图层的对应关系</div>
                            </div>
                        </div>
                        <div class="right-index">
                            <div v-for="(item, index) in rightData" :key="index" style="position: relative;margin-right: 10px;">
                                <div @click="item.templateData.isNumber=1,rightIndex=index" class="noNumber" :class="{'isBianji':item.templateData.isNumber==1}">{{index+1}}</div>
                                <div class="indexBianji" v-show="rightIndex == index"></div>
                            </div>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
            <el-row  style="margin: 0 20px">
                <el-col>
                    <el-button type="primary" size="mini" @click="okClick(1)">保存修改，并进入下一步</el-button>
                    <el-button type="primary" size="mini" @click="okClick(2)">保存修改，并返回上一页</el-button>
                    <el-button type="primary" size="mini" @click="fanhuiClick">取消</el-button>
                </el-col>
            </el-row>
            <el-row  style="margin: 40px 20px" :gutter="12">
                <el-col :span="12">
                    <img style="max-width: 100%;" :src="indexData.templateData.masterUrl" alt="" :style="{'width': indexData.templateData.width+'px'}">
                </el-col>
                <el-col :span="12">
                    <img style="max-width: 100%;" :src="rightData[rightIndex].templateData.masterUrl" alt="" :style="{'width': indexData.templateData.width+'px'}">
                </el-col>
            </el-row>
        </div>
    </div>
</template>


<script>
import {
    number_model,
    save_layer_number
} from "../../api/picturePs/home";
import draggable from "vuedraggable";
export default {
    data() {
        return {
            checkAll: false,
            isIndeterminate: true,
            rightIndex: 0,
            leftData: {
                logo: ["logo","logo"],
                chanpinImg: ["产品","产品"],
                wenan: ["文案","文案"],
                money: ["价格","价格"],
                rest: ["额外","额外"],
                backImg: ["背景","背景图"]
            },
            indexData:{
                templateData: "",
                logo: [
                    {name:"1",isConstant:1},
                    {name:"2",isConstant:1}
                ],
                chanpinImg: [
                    {name:"1",isConstant:1},
                    {name:"2",isConstant:1}
                ],
                wenan: [
                    {name:"1",isConstant:1},
                    {name:"2",isConstant:1}
                ],
                money: [
                    {name:"1",isConstant:1},
                    {name:"2",isConstant:1}
                ],
                rest: [
                    {name:"1",isConstant:1},
                    {name:"2",isConstant:1}
                ],
                backImg: [
                    {name:"1",isConstant:1},
                    {name:"2",isConstant:1}
                ]
            },
            rightData: [
                {
                    templateData: "",
                    logo: [
                        {name:"1"},
                        {name:"2"}
                    ],
                    chanpinImg: [
                        {name:"1"},
                        {name:"2"}
                    ],
                    wenan: [
                        {name:"1"},
                        {name:"2"}
                    ],
                    money: [
                        {name:"1"},
                        {name:"2"}
                    ],
                    rest: [
                        {name:"1"},
                        {name:"2"}
                    ],
                    backImg: [
                        {name:"1"},
                        {name:"2"}
                    ]
                }
            ]
        };
    },
    components: {
        draggable
    },
    methods: {
        handleCheckAllChange() {
            this.isIndeterminate = false;
            if(this.checkAll){
                this.indexData.logo.map(item=>{
                    item.isConstant = true;
                });
                this.indexData.chanpinImg.map(item=>{
                    item.isConstant = true;
                });
                this.indexData.wenan.map(item=>{
                    item.isConstant = true;
                });
                this.indexData.money.map(item=>{
                    item.isConstant = true;
                });
                this.indexData.backImg.map(item=>{
                    item.isConstant = true;
                });
                this.indexData.rest.map(item=>{
                    item.isConstant = true;
                });
            } else {
                this.indexData.logo.map(item=>{
                    item.isConstant = false;
                });
                this.indexData.chanpinImg.map(item=>{
                    item.isConstant = false;
                });
                this.indexData.wenan.map(item=>{
                    item.isConstant = false;
                });
                this.indexData.money.map(item=>{
                    item.isConstant = false;
                });
                this.indexData.backImg.map(item=>{
                    item.isConstant = false;
                });
                this.indexData.rest.map(item=>{
                    item.isConstant = false;
                });
            }
        },
        indexAxios() {
            let formData = {
                modelIds: this.$route.query.id
            };
            number_model(formData)
                .then(response => {
                    let leftData0 = [];
                    let leftData1 = [];
                    let leftData2 = [];
                    let leftData3 = [];
                    let leftData4 = [];
                    let leftData5 = [];
                    let datalist0 = [];
                    let datalist1 = [];
                    let datalist2 = [];
                    let datalist3 = [];
                    let datalist4 = [];
                    let datalist5 = [];
                    let rightData = [];
                    response.data.map(item => {
                        if(item.status == 3){
                                item.layerList.map(itemss =>{
                                    itemss.isConstant = itemss.isConstant==0?false:true
                                })
                                this.indexData.templateData = item;
                                item.layerList.map(items => {
                                if(items.layerSort == "logo"){
                                    datalist0.push(items);
                                    leftData0.push("logo");
                                } else if (items.layerSort == "产品图") {
                                    datalist1.push(items);
                                    leftData1.push("产品图");
                                } else if (items.layerSort == "文案") {
                                    datalist2.push(items);
                                    leftData2.push("文案");
                                } else if (items.layerSort == "价格") {
                                    datalist3.push(items);
                                    leftData3.push("价格");
                                } else if (items.layerSort == "额外") {
                                    datalist4.push(items);
                                    leftData4.push("额外");
                                } else if (items.layerSort == "背景") {
                                    datalist5.push(items);
                                    leftData5.push("背景");
                                }
                            })
                        } else {
                            let rightData0 = [];
                            let rightData1 = [];
                            let rightData2 = [];
                            let rightData3 = [];
                            let rightData4 = [];
                            let rightData5 = [];
                            item.layerList.map(items => {
                                if(items.layerSort == "logo"){
                                    rightData0.push(items);
                                } else if (items.layerSort == "产品图") {
                                    rightData1.push(items);
                                } else if (items.layerSort == "文案") {
                                    rightData2.push(items);
                                } else if (items.layerSort == "价格") {
                                    rightData3.push(items);
                                } else if (items.layerSort == "额外") {
                                    rightData4.push(items);
                                } else if (items.layerSort == "背景") {
                                    rightData5.push(items);
                                }
                            });
                            rightData.push({
                                templateData: item,
                                logo: rightData0.sort(this.compare),
                                chanpinImg: rightData1.sort(this.compare),
                                wenan: rightData2.sort(this.compare),
                                money: rightData3.sort(this.compare),
                                rest: rightData4.sort(this.compare),
                                backImg: rightData5.sort(this.compare)
                            });
                        }
                    });
                    this.leftData.logo = leftData0;
                    this.leftData.chanpinImg = leftData1;
                    this.leftData.wenan = leftData2;
                    this.leftData.money = leftData3;
                    this.leftData.rest = leftData4;
                    this.leftData.backImg = leftData5;
                    this.indexData.logo = datalist0;
                    this.indexData.chanpinImg = datalist1;
                    this.indexData.wenan = datalist2;
                    this.indexData.money = datalist3;
                    this.indexData.rest = datalist4;
                    this.indexData.backImg = datalist5;
                    this.rightData = rightData;
                })
                .catch(() => {

                });
        },
        compare(x, y){
            if(x.layerNum==null || y.layerNum==null){
                return;
            }
            var val1 = Number(x.layerNum.split("-")[1]);
            var val2 = Number(y.layerNum.split("-")[1]);
            if (val1 < val2) {
                return -1;
            } else if (val1 > val2) {
                return 1;
            } else {
                return 0;
            }
        },
        fanhuiClick() {
            this.$router.push({path: "/picturePs/index/collection"});
        },
        okClick(indexId) {
            let submit = true;
            this.rightData.map(item => {
                if(item.templateData.isNumber != 1){
                    submit = false;
                }
            });
            if(submit == false){
                this.$message({
                    message: '请先确认图层的对应关系',
                    type: 'warning'
                });
                return;
            }
            let formData = [];
            this.rightData.map(item=>{
                let data = {
                    modelId: item.templateData.id,
                    numberList: []
                };
                item.logo.map((items, index)=> {
                    data.numberList.push({
                        modelItemId: items.modelItemId,
                        numberId: items.id,
                        numberName: items.layerSort + "-" + (index+1)
                    })
                });
                item.chanpinImg.map((items, index) => {
                    data.numberList.push({
                        modelItemId: items.modelItemId,
                        numberId: items.id,
                        numberName: items.layerSort + "-" + (index+1)
                    })
                });
                item.wenan.map((items, index) => {
                    data.numberList.push({
                        modelItemId: items.modelItemId,
                        numberId: items.id,
                        numberName: items.layerSort + "-" + (index+1)
                    })
                });
                item.money.map((items, index) => {
                    data.numberList.push({
                        modelItemId: items.modelItemId,
                        numberId: items.id,
                        numberName: items.layerSort + "-" + (index+1)
                    })
                });
                item.rest.map((items, index) => {
                    data.numberList.push({
                        modelItemId: items.modelItemId,
                        numberId: items.id,
                        numberName: items.layerSort + "-" + (index+1)
                    })
                });
                item.backImg.map((items, index) => {
                    data.numberList.push({
                        modelItemId: items.modelItemId,
                        numberId: items.id,
                        numberName: items.layerSort + "-" + (index+1)
                    })
                });
                formData.push(data)
            });
            let data = {
                modelId: this.indexData.templateData.id,
                numberList: []
            };
            let list1 = [];
            let list2 = [];
            this.indexData.logo.map((items, index)=> {
                data.numberList.push({
                    isConstant: items.isConstant==true?1:0,
                    modelItemId: items.modelItemId,
                    numberId: items.id,
                    numberName: items.layerSort + "-" + (index+1)
                })
                if (items.isConstant == true){
                    list1.push(items.layerSort + "-" + (index+1))
                } else {
                    list2.push(items.layerSort + "-" + (index+1))
                }
            });
            this.indexData.chanpinImg.map((items, index) => {
                data.numberList.push({
                    isConstant: items.isConstant==true?1:0,
                    modelItemId: items.modelItemId,
                    numberId: items.id,
                    numberName: items.layerSort + "-" + (index+1)
                })
                if (items.isConstant == true){
                    list1.push(items.layerSort + "-" + (index+1))
                } else {
                    list2.push(items.layerSort + "-" + (index+1))
                }
            });
            this.indexData.wenan.map((items, index) => {
                data.numberList.push({
                    isConstant: items.isConstant==true?1:0,
                    modelItemId: items.modelItemId,
                    numberId: items.id,
                    numberName: items.layerSort + "-" + (index+1)
                })
                if (items.isConstant == true){
                    list1.push(items.layerSort + "-" + (index+1))
                } else {
                    list2.push(items.layerSort + "-" + (index+1))
                }
            });
            this.indexData.money.map((items, index) => {
                data.numberList.push({
                    isConstant: items.isConstant==true?1:0,
                    modelItemId: items.modelItemId,
                    numberId: items.id,
                    numberName: items.layerSort + "-" + (index+1)
                })
                if (items.isConstant == true){
                    list1.push(items.layerSort + "-" + (index+1))
                } else {
                    list2.push(items.layerSort + "-" + (index+1))
                }
            });
            this.indexData.rest.map((items, index) => {
                data.numberList.push({
                    isConstant: items.isConstant==true?1:0,
                    modelItemId: items.modelItemId,
                    numberId: items.id,
                    numberName: items.layerSort + "-" + (index+1)
                })
                if (items.isConstant == true){
                    list1.push(items.layerSort + "-" + (index+1))
                } else {
                    list2.push(items.layerSort + "-" + (index+1))
                }
            });
            this.indexData.backImg.map((items, index) => {
                data.numberList.push({
                    isConstant: items.isConstant==true?1:0,
                    modelItemId: items.modelItemId,
                    numberId: items.id,
                    numberName: items.layerSort + "-" + (index+1)
                })
                if (items.isConstant == true){
                    list1.push(items.layerSort + "-" + (index+1))
                } else {
                    list2.push(items.layerSort + "-" + (index+1))
                }
            });
            formData.push(data)
            save_layer_number(formData)
                .then(response => {
                    if(response.code == 0){
                        if(indexId==1){
                            this.$router.push({path: "/picturePs/index/collection/upImages/images", query:{id:this.$route.query.id,list1:list1,list2:list2}});
                        } else {
                            this.$message({
                                message: '保存成功',
                                type: 'success'
                            });
                            this.$router.push({path: "/picturePs/index/collection"});
                        }
                    }
                })
                .catch(() => {

                });
        }
    },
    created() {
        this.indexAxios();
    },
    mounted() {}
};
</script>

<style type="text/scss" lang="scss" scoped>
#upImages {
    .list-group-item-img {
        height: 40px;
        width: 100px;
        margin-right: 10px;
        object-fit: contain;
    }
    .list-group-right {
        display: flex;
        align-items: center;
    }
.el-checkbox__label {
    margin-left: 4px;
}
.el-card__body {
    padding: 20px;
}
.leftForms{
    .el-checkbox__inner {
        width: 12px;
        height: 12px;
    }
    .th .td1 {
        width: 20%;
        font-size: 14px;
    }
    .th .td2 {
        width: 20%;
        font-size: 14px;
    }
    .th .td3 {
        width: 60%;
        font-size: 14px;
    }
    .tr .td1 {
        width: 20%;
        font-size: 14px;
        text-align: center;
    }
    .tr .td2 {
        width: 20%;
        font-size: 14px;
        div {
            text-align: center;
            height: 40px;
            line-height: 40px;
        }
    }
    .tr .td3 {
        width: 60%;
        font-size: 14px;
    }
}
.form {
    border:1px solid #ccc;
}
.title {
    background: #657081;
    height: 40px;
    line-height: 40px;
    color: #fff;
    padding: 0 10px;
}
.th {
    display: flex;
    text-align: center;
    padding: 15px 0;
    font-size: 14px;
}
.th div:nth-child(1){
    width: 30%;
}
.th div:nth-child(2){
    width: 70%;
}
.tr {
    display: flex;
    padding: 6px 0;
    align-items: center;
}
.tr .right-td1{
    width: 30%;
    font-size: 14px;
    text-align: center;
    div {
        width: 100%;
        height: 40px;
        line-height: 40px;
    }
}
.tr .right-td2{
    width: 70%;
    font-size: 14px;
    div {
        width: 100%;
    }
}
.leftForms .content {
    .leftForm-right div{
        text-align: left;
    }
}
.rightForms .content {
    display: flex;
    align-items: center;
    .leftForm-right div{
        text-align: left;
    }
    .tr {
        .list-group-item {
            cursor: all-scroll;
            height: 40px;
            line-height: 40px;
            display: flex;
        }
    }
}
.alt {
    width: 20px;
    text-align: center;
    margin: 0 20px;
}
.bg:nth-of-type(odd) {
    background-color: #E1E1E1;
}
.tr {
    .list-group-item {
        border: none;
        margin: 0;
        width: 100%;
        height: 40px;
        line-height: 40px;
        padding: 0 10px;
    }
}
.el-card body {
    padding:  20px;
    background: #F8F8F8;
    font-size: 14px;
}
.right-index {
    display: flex;
    padding-top: 20px;
    height: 50px;
    align-items: center;
    .noNumber {
        width: 20px;
        height: 20px;
        text-align: center;
        line-height: 20px;
        border: 1px solid;
        border-radius: 20px;
        font-family: -webkit-body;
        cursor: pointer;
        position: relative;
    }
    .noNumber:hover {
        color: #1890FF;
        border: 1px solid #1890FF;
    }
    .isBianji {
        color: #1890FF;
        border: 1px solid #1890FF;
    }
    .indexBianji {
        width: 4px;
        height: 4px;
        border-radius: 4px;
        background-color: #1890FF;
        margin: 0 auto;
        position: absolute;
        bottom: -9px;
        left: 50%;
        margin-left: -2px;
    }
}
}
</style>
