<template>
    <div>
        <p style="text-align: center;margin-top: 40px">系统检测与识别</p>
        <el-table
            :data="tableList"
            :span-method="cellMerge"
            border
            style="width: 60%;margin: 0 auto;margin-top: 20px">
            <el-table-column
                prop="layerSort"
                label="分类"
                >
            </el-table-column>
            <el-table-column
                prop="layerName"
                label="对象"
                >
            </el-table-column>
            <el-table-column
                prop="exist"
                label="是否检测到"
                >
                <template slot-scope="scope">
                    <div style="color: #67C23A" v-if="scope.row.exist === true"><i class="el-icon-circle-check Success"></i></div>
                    <div style="color: #F56C6C" v-else><i class="el-icon-circle-close Danger"></i></div>
                </template>
            </el-table-column>
            <el-table-column
                prop="layerSize"
                label="对象特征-尺寸"
            >
            </el-table-column>
            <el-table-column
                prop="layerNormal"
                label="对象特征-方向"
            >
                <template slot-scope="scope">
                    <div v-if="scope.row.layerNormal==0">横</div>
                    <div v-else>竖</div>
                </template>
            </el-table-column>
            <el-table-column
                prop="labelName"
                label="对象特征-基本信息"
            >
                <template slot-scope="scope">
                    <div>1.{{scope.row.labelName}}</div>
                    <div>2.{{scope.row.sceneName}}</div>
                </template>
            </el-table-column>
        </el-table>
        <div style="width: 60%;margin: 0 auto;margin-top: 10px;font-size: 16px;">
            <div style="float: right;display: flex;">
                <p>*备注*</p>
                <p style="margin-left: 10px">
                    1、宽%高 = 宽高比，当值>2时为超宽图，当值>0.8 and < 1.25时为方正图，当值<=0.8是为窄图，其他为宽图；<br>
                    2、文案方向：仅一个对象时为无，当多个对象时可选择：上下，左右，左右+上下；
                </p>
            </div>
        </div>
        <div style="clear: both"></div>
        <div style="text-align: center;margin-top: 50px;margin-bottom: 20px; ">
            <el-button type="primary" @click="lastClick" style="margin: 0 50px;">上一步</el-button>
            <el-button type="primary" @click="submitForm" style="margin: 0 50px;">下一步</el-button>
        </div>
    </div>
</template>

<script>
    import {
        getSessionStorage,
        setName
    } from "../../../utils/auth";
export default {
    data() {
        return {
            tableList: [
                {name:"背景",name2:"a",address:"1,文件名"},
                {name:"产品图",name2:"a",address:"1,文件名"},
                {name:"logo",name2:"a",address:"1,文件名"},
                {name:"logo",name2:"a",address:"1,文件名"},
                {name:"logo",name2:"a",address:"1,文件名"},
                {name:"价格",name2:"a",address:"1,文件名2，哈哈哈"},
                {name:"文案",name2:"a",address:"1,文件名"},
                {name:"额外",name2:"a",address:"1,文件名"}
                ],
            spanArr_1: [],
            spanArr_2: [],
            spanArr_3: [],
            spanArr_4: [],
            spanArr_5: [],
            spanArr_6: "",
            pos_1: 0,
            pos_2: 0,
            pos_3: 0,
            pos_4: 0,
            pos_5: 0,
            queryData: ""
        };
    },
    props: {
        msg: "" //父子传递数据
    },
    components: {},
    created() {
        this.queryData = getSessionStorage("jsonData");
        this.queryData.modelItemList.map(item => {
            item.labelName = this.queryData.labelName;
            item.sceneName = this.queryData.sceneName;
        });
        this.tableList = this.queryData.modelItemList;
        this.getSpanArr(this.queryData.modelItemList);
        this.spanArr_6 = this.queryData.modelItemList.length;
    },
    methods: {
        getSpanArr(data) {
            for (var i = 0; i < data.length; i++) {
                if (i === 0) {
                    this.spanArr_1.push(1);
                    this.pos_1 = 0
                } else {     // 判断当前元素与上一个元素是否相同
                    if (data[i].layerSort === data[i - 1].layerSort) {
                        this.spanArr_1[this.pos_1] += 1;
                        this.spanArr_1.push(0);
                    } else {
                        this.spanArr_1.push(1);
                        this.pos_1 = i;
                    }
                }
            }
        },
        cellMerge({row, column, rowIndex, columnIndex}) {
            if (columnIndex == 0) {
                const _row = this.spanArr_1[rowIndex];
                const _col = _row > 0 ? 1 : 0;
                return {
                    rowspan: _row,
                    colspan: _col
                }
            }
            if (columnIndex == 1) {
                return {
                    rowspan: 1,
                    colspan: 1
                }
            }
            if (columnIndex == 2) {
                return {
                    rowspan: 1,
                    colspan: 1
                }
            }
            else if(columnIndex == 3){
                if(rowIndex > 1) {
                    return {
                        rowspan: this.spanArr_6,
                        colspan: 1
                    }
                }else{
                    return {
                        rowspan: 1,
                        colspan: 1
                    }
                }
            }
            else if (columnIndex == 4){
                if(rowIndex == 0) {
                    return {
                        rowspan: this.spanArr_6,
                        colspan: 1
                    }
                }else{
                    return {
                        rowspan: 1,
                        colspan: 0
                    }
                }
            }
            else if (columnIndex == 5){
                if(rowIndex == 0) {
                    return {
                        rowspan: this.spanArr_6,
                        colspan: 1
                    }
                }else{
                    return {
                        rowspan: 1,
                        colspan: 0
                    }
                }
            }
        },
        lastClick() {
            this.$router.push({ path: "/picturePs/index/template" });
        },
        submitForm() {
            this.$router.push({ path: "/picturePs/index/template/next/upPSD"});
            setName("templateData", "");
        }
    }
};
</script>

<style type="text/scss" lang="scss"></style>
