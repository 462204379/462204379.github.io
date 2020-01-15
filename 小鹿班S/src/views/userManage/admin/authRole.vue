<template>
    <div style="padding: 0 20px;">
        <el-form :inline="true" :model="query" class="query-form" size="mini">
            <el-form-item class="query-form-item">
                <el-input v-model="query.name" placeholder="角色名称"></el-input>
            </el-form-item>
            <el-form-item class="query-form-item">
                <el-select v-model="query.status" placeholder="状态">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="禁用" value="0"></el-option>
                    <el-option label="正常" value="1"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item>
                <el-button-group>
                    <el-button type="primary" icon="el-icon-refresh" @click="onReset"></el-button>
                    <el-button type="primary" icon="search" @click="onSubmit">查询</el-button>
                    <el-button type="primary" @click.native="handleForm(null,null)">新增</el-button>
                </el-button-group>
            </el-form-item>
        </el-form>
        <el-table
            v-loading="loading"
            :data="list"
            style="width: 100%;"
            max-height="500">
            <el-table-column
                label="角色 ID"
                prop="id">
            </el-table-column>
            <el-table-column
                label="角色名称"
                prop="roleName">
            </el-table-column>
            <el-table-column
                label="状态">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.status | statusFilterType">{{scope.row.status | statusFilterName}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column
                label="描述"
                :show-overflow-tooltip="true">
                <template slot-scope="scope">
                    <span>{{ scope.row.remark }}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="操作"
                width="250">
                <template slot-scope="scope">
                    <el-button size="mini" type="primary" @click.native="handleForm(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="mini" type="warning" v-if="scope.row.status == 0" @click="statusClick(scope.row.id)">禁用</el-button>
                    <el-button size="mini" type="success" @click="statusClick(scope.row.id)" v-else>启动</el-button>
                    <el-button size="mini" type="danger" @click.native="handleDel(scope.row)" :loading="deleteLoading">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

       <!-- <el-pagination
            :page-size="query.limit"
            @current-change="handleCurrentChange"
            layout="prev, pager, next"
            :total="total">
        </el-pagination>-->

        <!--授权界面-->
        <el-dialog
            title="授权"
            :visible.sync="authFormVisible"
            :close-on-click-modal="false"
            class="dialog">

            <div slot="footer" class="dialog-footer">
                <el-button @click.native="authFormVisible = !authFormVisible">取消</el-button>
                <el-button type="primary" @click.native="authSubmit()" :loading="authLoading">提交
                </el-button>
            </div>
        </el-dialog>

        <!--表单-->
        <el-dialog
            :title="formMap[formName]"
            :visible.sync="formVisible"
            :before-close="hideForm"
            :close-on-click-modal="false"
            width="60%"
            top="5vh">
            <el-form :model="formData" :rules="formRules" ref="dataForm">
                <el-form-item label="权限">
                <el-tree
                    style="display: inline-block;margin-top: 7px;margin-left: 20px;"
                    :data="authList"
                    show-checkbox=""
                    default-expand-all=""
                    node-key="id"
                    ref="tree"
                    :props="defaultProps"
                    :default-checked-keys="authDefaultCheckedKeys">
                </el-tree>
                </el-form-item>
                <el-form-item label="角色名称" prop="roleName">
                    <el-input v-model="formData.roleName" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="描述">
                    <el-input type="textarea" v-model="formData.remark"></el-input>
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
    getRoleList,
    getRoleMean,
    removeRole,
    upRoleStatus,
    addupRoleModify
} from "../../../api/auth/authRole";
const formJson = {
    id: "",
    roleName: "",
    remark: ""
};
export default {
    data() {
        return {
            query: {
                name: "",
                status: "",
                page: 1,
                limit: 20
            },
            list: [],
            total: 0,
            loading: true,
            authList: [],
            defaultProps: {
                children: "list",
                label: "permissionName"
            },
            authLoading: false,
            authFormVisible: false,
            authFormData: {
                role_id: "",
                auth_rules: []
            },
            authDefaultCheckedKeys: [],
            index: null,
            formName: null,
            formMap: {
                add: "新增角色",
                edit: "编辑角色"
            },
            formLoading: false,
            formVisible: false,
            formData: formJson,
            formRules: {
                roleName: [
                    { required: true, message: "请输入名称", trigger: "blur" }
                ],
                status: [
                    { required: true, message: "请选择状态", trigger: "change" }
                ]
            },
            deleteLoading: false
        };
    },
    methods: {
        onReset() {
            this.$router.push({
                path: ""
            });
            this.query = {
                name: "",
                status: "",
                page: 1,
                limit: 20
            };
            this.getList();
        },
        onSubmit() {
            this.getList();
        },
        handleCurrentChange(val) {
            this.query.page = val;
            this.getList();
        },
        getList() {
            this.loading = true;
            getRoleList({ type: 0 })
                .then(response => {
                    this.loading = false;
                    if (response.code) {
                        this.$message.error(response.msg);
                        return false;
                    }
                    this.list = response.data || [];
                    this.total = response.data.total || 0;
                })
                .catch(() => {
                    this.loading = false;
                    this.list = [];
                    this.total = 0;
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
        statusClick(row) {
            upRoleStatus({ roleId: row })
                .then(response => {
                    this.formLoading = false;
                    if (response.code) {
                        this.$message.error(response.msg);
                        return false;
                    }
                    this.$message.success(response.msg);
                    this.getList();
                })
                .catch(() => {
                    this.formLoading = false;
                });
        },
        // 显示表单
        handleForm(index, row) {
            /*getRoleMean*/
            if (row === null) {
                this.formVisible = true;
                this.formData = {};
                this.formName = "add";
                return;
            }
            getRoleMean({ roleId: row.id })
                .then(response => {
                    this.formLoading = false;
                    if (response.code) {
                        this.$message.error(response.msg);
                        return false;
                    }
                    let checkid = [];
                    let tempCheckedKeys = [];
                    let node = null;
                    response.data.map((item) =>{
                        checkid.push(item.id);
                    });
                    let getTreeNode = function(arr, id) {
                        for (let i in arr) {
                            let tempNode = arr[i];
                            if (tempNode.id === id) {
                                // 找到了，就不找了
                                node = tempNode;
                            }
                            // 如果还有子节点，再继续找
                            getTreeNode(tempNode.list, id);
                        }
                    };
                    for (let i in checkid) {
                        let id = checkid[i];
                        getTreeNode(this.authList, id);
                        if (node && node.list.length <= 0) {
                            // 如果下面没有子节点，则加入
                            tempCheckedKeys.push(id);
                        }
                    }
                    this.$refs.tree.setCheckedKeys(tempCheckedKeys);
                })
                .catch(() => {
                    this.formLoading = false;
                });
            this.formVisible = true;
            this.formData = JSON.parse(JSON.stringify(formJson));
            if (row !== null) {
                this.formData = Object.assign({}, row);
            }
            this.index = index;
            this.formName = "edit";
        },
        formSubmit() {
            this.$refs["dataForm"].validate(valid => {
                if (valid) {
                    let getNodeParents = function(node) {
                        let arr = [];
                        let id = node.data.id || null;
                        if (id) {
                            arr.push(node.data.id);
                        }
                        if (node.parent) {
                            arr = arr.concat(getNodeParents(node.parent));
                        }
                        return arr;
                    };
                    let checkedKeys = this.$refs.tree.getCheckedKeys();
                    let arr = [];
                    for (let checkedKey of checkedKeys) {
                        let node = this.$refs.tree.getNode(checkedKey);
                        arr = arr.concat(getNodeParents(node));
                    }
                    let setArr = new Set(arr);
                    this.authFormData.auth_rules = [...setArr];

                    this.formLoading = true;
                    let data = {
                        roleName: this.formData.roleName,
                        remark: this.formData.remark,
                        permissions: this.authFormData.auth_rules.join(","),
                        roleId: this.formData.id
                    };
                    addupRoleModify(data, this.formName)
                        .then(response => {
                            this.formLoading = false;
                            if (response.code) {
                                this.$message.error(response.msg);
                                return false;
                            }
                            this.$message.success(response.msg);
                            this.formVisible = false;
                            // 刷新表单
                            this.resetForm();
                            this.getList();
                        })
                        .catch(() => {
                            this.formLoading = false;
                        });
                }
            });
        },
        // 删除
        handleDel(row) {
            if (row.id) {
                this.$confirm("确认删除该记录吗?", "提示", {
                    type: "warning"
                })
                    .then(() => {
                        this.deleteLoading = true;
                        let para = { roleId: row.id };
                        removeRole(para)
                            .then(response => {
                                this.deleteLoading = false;
                                if (response.code) {
                                    this.$message.error(response.msg);
                                    return false;
                                }
                                this.$message.success(response.msg);
                                // 刷新数据
                                this.getList();
                            })
                            .catch(() => {
                                this.deleteLoading = false;
                            });
                    })
                    .catch(() => {
                        this.$message.info("取消删除");
                    });
            }
        }
    },
    filters: {
        statusFilterType(status) {
            const statusMap = {
                0: "success",
                1: "gray"
            };
            return statusMap[status];
        },
        statusFilterName(status) {
            const statusMap = {
                0: "正常",
                1: "禁用"
            };
            return statusMap[status];
        }
    },
    mounted() {},
    created() {
        this.getList();
        // 加载表格数据
        getRuleList({type : 1})
            .then(response => {
                if (response.code) {
                    this.$message({
                        message: response.message,
                        type: "error"
                    });
                    return;
                }
                this.authList = response.data;
            })
            .catch(() => {});
    }
};
</script>

<style type="text/scss" lang="scss">
.el-tree-node__label {
    margin-left: 5px;
}
.el-tree-node__content{
    padding: 0 20px;
}
</style>
