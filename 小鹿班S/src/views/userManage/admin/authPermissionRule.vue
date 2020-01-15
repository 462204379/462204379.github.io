<template>
    <div style="padding: 0 20px;">
        <el-table
            :data="tableData"
            style="width: 100%;"
            row-key="id"
            :default-expand-all="false"
            :tree-props="{children: 'list', hasChildren: 'hasChildren'}">
            <el-table-column
                prop="permissionName"
                label="模块名称"
                >
            </el-table-column>
            <el-table-column
                prop="lastModifyTime"
                label="修改时间"
                >
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span>{{ scope.row.lastModifyTime|replaceDate_2 }}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="status"
                label="状态"
                >
                <template slot-scope="scope">
                    <span v-if="scope.row.status == 0">正常</span>
                    <span v-else>禁用</span>
                </template>
            </el-table-column>
            <el-table-column
                label="操作"
            >
                <template slot-scope="scope">
                    <el-button size="mini" type="primary" @click="handleForm(scope.row,'add')">添加子菜单</el-button>
                    <el-button size="mini" type="primary" @click="handleForm(scope.row,'edit')">编辑</el-button>
                    <el-button size="mini" type="danger" v-if="scope.row.status == 0" @click="statusClick(scope.row.id)">禁用</el-button>
                    <el-button size="mini" type="success" @click="statusClick(scope.row.id)" v-else>启动</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--表单界面-->
        <el-dialog
            :title="formMap[formName]"
            :visible.sync="formVisible"
            :before-close="hideForm"
            :close-on-click-modal="false"
            width="60%"
            top="5vh">
            <el-form :model="formData" :rules="formRules" ref="dataForm">
                <el-form-item label="父ID" prop="pid">
                    <el-select v-model="formData.pid" placeholder="顶级">
                        <el-option
                            label="最高级"
                            value="0">
                            <span style="float: left"><span></span>最高级</span>
                        </el-option>
                        <el-option
                            v-for="(item, index) in treeList"
                            :key="index"
                            :label="item.permissionName"
                            :value="item.id">
                            <span style="float: left"><span v-html="item.html"></span>{{ item.permissionName }}</span>
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="模块名称" prop="name">
                    <el-input type="" v-model="formData.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="模块url" prop="url">
                    <el-input type="" v-model="formData.url" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="模块唯一标识" prop="code">
                    <el-input type="" v-model="formData.code" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="hideForm">取消</el-button>
                <el-button type="primary" @click.native="formSubmit()" :loading="formLoading">提交</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import {
    getRuleList,
    addupRuleList,
    modifyStatus
} from "../../../api/auth/authPermissionRule";
import {
    replaceDate_2
} from "../../../utils/public";
const formJson = {
    id: "",
    pid: "",
    name: "",
    code: "",
    url: ""
};
export default {
    data() {
        return {
            query: {
                name: "",
                status: ""
            },
            tableData: [],
            node: null,
            treeList: [],
            loading: true,
            index: null,
            formName: null,
            formMap: {
                add: "添加子菜单",
                edit: "编辑"
            },
            formLoading: false,
            formVisible: false,
            formData: formJson,
            formRules: {
                name: [
                    { required: true, message: "请输入模块名称", trigger: "blur" }
                ],
                url: [
                    { required: true, message: "请输入模块url", trigger: "blur" }
                ],
                code: [
                    { required: true, message: "请输入模块唯一标识", trigger: "blur" }
                ]
            },
            pidData: {},
            deleteLoading: false,
            expands: []
        };
    },
    methods: {
        getList() {
            this.loading = true;
            getRuleList({type : 0})
                .then(response => {
                    this.loading = false;
                    if (response.code) {
                        this.$message.error(response.msg);
                        return false;
                    }
                    const that = this;
                    this.tableData = response.data || [];
                    this.treeList = [];
                    getTreeList(this.tableData, "");
                    function getTreeList(data, html) {
                        data.map((item) => {
                            that.treeList.push({
                                permissionName: item.permissionName,
                                id: item.id+ "",
                                html: html
                            })
                            if(item.list.length > 0){
                                getTreeList(item.list, html + "├");
                            }
                        })
                    }
                })
                .catch(() => {
                    this.loading = false;
                    this.tableData = [];
                    this.treeList = [];
                });
        },
        // 刷新表单
        resetForm() {
            if (this.$refs["dataForm"]) {
                // 清空验证信息表单
                this.$refs["dataForm"].clearValidate();
                // 刷新表单
                this.$refs["dataForm"].resetFields();
            }
        },
        // 隐藏表单
        hideForm() {
            // 更改值
            this.formVisible = !this.formVisible;
            return true;
        },
        // 显示表单
        handleForm(data, formName) {
            this.resetForm();
            this.formVisible = true;
            this.formName = formName;
            this.formData.pid = data.pId + "";
            this.formData.id = data.id + "";
            this.formData.code = data.code;
            this.formData.url = data.url;
            this.formData.name = data.permissionName;
            if(this.formName === 'add'){
                this.formData.name = "";
                this.formData.code = "";
                this.formData.url = "";
                this.formData.pid = data.id + "";
            }
        },
        formSubmit() {
            this.$refs["dataForm"].validate(valid => {
                if (valid) {
                    this.formLoading = true;
                    let data;
                    if(this.formName === 'add'){
                        data = {
                            name: this.formData.name,
                            url: this.formData.url,
                            code: this.formData.code,
                            parentId: this.formData.pid
                        };
                    } else {
                        data = {
                            menuId: this.formData.id,
                            name: this.formData.name,
                            url: this.formData.url,
                            code: this.formData.code,
                            parentMenuId: this.formData.pid
                        };
                    }
                    addupRuleList(data, this.formName)
                        .then(response => {
                            this.formLoading = false;
                            if (response.code) {
                                this.$message.error(response.msg);
                                return false;
                            }
                            this.$message.success("操作成功");
                            this.formVisible = false;
                            // 刷新表单
                            this.resetForm();
                            //刷新列表
                            this.getList();
                        })
                        .catch(() => {
                            this.formLoading = false;
                        });
                }
            });
        },
        // 启动或禁用
        statusClick(data) {
                this.$confirm("确认进行此操作?", "提示", {
                    type: "warning"
                })
                    .then(() => {
                        this.deleteLoading = true;
                        modifyStatus({menuId:data})
                            .then(response => {
                                this.deleteLoading = false;
                                if (response.code) {
                                    this.$message.error(response.message);
                                    return false;
                                }
                                this.$message.success("操作成功");
                                this.getList();
                            })
                            .catch(() => {
                                this.deleteLoading = false;
                            });
                    })
                    .catch(() => {
                        this.$message.info("取消操作");
                    });
        }
    },
    filters: {
        statusFilterType(status) {
            const statusMap = {
                0: "gray",
                1: "success"
            };
            return statusMap[status];
        },
        statusFilterName(status) {
            const statusMap = {
                0: "禁用",
                1: "正常"
            };
            return statusMap[status];
        },
        replaceDate_2: replaceDate_2
    },
    created() {
        // 加载表格数据
        this.getList();
    },
    mounted() {

    }
};
</script>

<style type="text/scss" lang="scss">
</style>
