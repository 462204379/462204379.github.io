<template>
    <div style="padding: 0 20px;">
        <el-form :inline="true" :model="query" class="query-form" size="mini">
            <el-form-item class="query-form-item">
                <el-input v-model="query.phone" placeholder="用户名"></el-input>
            </el-form-item>
            <el-form-item class="query-form-item">
                <el-select v-model="query.status" placeholder="状态">
                    <el-option label="全部" value="-1"></el-option>
                    <el-option label="禁用" value="1"></el-option>
                    <el-option label="正常" value="0"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button-group>
                    <el-button type="primary" icon="el-icon-refresh" @click="onReset"></el-button>
                    <el-button type="primary" icon="search" @click="onSubmit">查询</el-button>
                    <!--<el-button type="primary" icon="search" @click="$router.push({ path:'/userManage/authAdmin/authUser'})">用户登录详情</el-button>-->
                    <!--<el-button type="primary" @click.native="handleForm(null,null)">新增</el-button>-->
                </el-button-group>
            </el-form-item>
        </el-form>
        <el-table
            v-loading="loading"
            :data="list"
            style="width: 100%;"
            max-height="500">
            <el-table-column
                label="用户名"
                prop="username"
                >
            </el-table-column>
            <el-table-column
                label="状态">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.status | statusFilterType">{{scope.row.status | statusFilterName}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column
                label="创建时间"
                :show-overflow-tooltip="true">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span>{{ scope.row.createDate|replaceDate_2 }}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="操作"
                >
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click.native="handleForm(scope.row,'edit')">编辑</el-button>
                    <el-button type="primary" size="mini" @click.native="upPassword(scope.row)">重置密码</el-button>
                    <el-button size="mini" type="warning" v-if="scope.row.status == 0" @click="statusClick(scope.row.userId)">禁用</el-button>
                    <el-button size="mini" type="success" @click="statusClick(scope.row.userId)" v-else>启动</el-button>
                    <el-button type="danger" size="mini" @click.native="handleDel(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination
            :page-size="query.pageSize"
            @current-change="handleCurrentChange"
            layout="prev, pager, next"
            :total="total">
        </el-pagination>

        <!--表单-->
        <el-dialog
            :title="formMap[formName]"
            :visible.sync="formVisible"
            :before-close="hideForm"
            :close-on-click-modal="false"
            width="60%"
            top="5vh">
            <el-form :model="formData" :rules="formRules" ref="dataForm">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="formData.username" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="角色">
                    <el-checkbox-group v-model="formData.roles">
                        <el-checkbox v-for="item in roles" :key="item.id" :label="item.id">{{item.roleName}}</el-checkbox>
                    </el-checkbox-group>
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
    getUserList,
    getRoleList,
    resetPassword,
    modifyStatus,
    upUser,
    getUserRoleList
} from "../../../api/auth/authAdmin";
import {
    replaceDate_2
} from "../../../utils/public";
const formJson = {
    userId: "",
    username: "",
    roles: []
};
export default {
    data() {
        return {
            roles: [],
            query: {
                phone: "",
                status: "-1",
                pageNo: 1,
                pageSize: 20
            },
            list: [],
            total: 0,
            loading: true,
            index: null,
            formName: null,
            formMap: {
                add: "新增用户",
                edit: "编辑用户"
            },
            formLoading: false,
            formVisible: false,
            formData: formJson,
            formRules: {},
            addRules: {
                username: [
                    { required: true, message: "请输入姓名", trigger: "blur" }
                ]
            },
            editRules: {
                username: [
                    { required: true, message: "请输入姓名", trigger: "blur" }
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
            this.getList();
        },
        onSubmit() {
            this.$router.push({
                path: "",
                query: this.query
            });
            this.getList();
        },
        handleCurrentChange(val) {
            this.query.pageSize = val;
            this.getList();
        },
        getList() {
            this.loading = true;
            getUserList(this.query)
                .then(response => {
                    this.loading = false;
                    this.list = response.data || [];
                    this.total = response.total || 0;
                })
                .catch(() => {
                    this.loading = false;
                    this.list = [];
                    this.total = 0;
                    this.roles = [];
                });
        },
        getRoleList() {
            getRoleList({ type: 1 })
                .then(response => {
                    console.log(response.data)
                    this.roles = response.data || [];
                })
                .catch(() => {
                    this.roles = [];
                });
        },
        //禁用或启动
        statusClick(row) {
            this.$confirm("确认操作?", "提示", {
                type: "warning"
            })
                .then(() => {
                    modifyStatus({ userId: row, type: 1 })
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
                })
                .catch(() => {
                    this.$message.info("取消操作");
                });
        },
        //重置密码
        upPassword(row){
            this.$confirm("确认重置密码吗?", "提示", {
                type: "warning"
            })
                .then(() => {
                    resetPassword({ userId: row.userId })
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
                })
                .catch(() => {
                    this.$message.info("取消");
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
            // 清空表单
            this.$refs["dataForm"].resetFields();
            return true;
        },
        // 显示表单
        handleForm(row, name) {
            this.formName = name;
            this.formData = JSON.parse(JSON.stringify(this.formData));
            this.formData.username = row.username;
            this.formData.userId = row.userId;
            getUserRoleList({ userId: this.formData.userId })
                .then(response => {
                    this.formLoading = false;
                    this.formVisible = true;
                    if (response.code) {
                        this.$message.error(response.msg);
                        return false;
                    }
                    let relosid = [];
                    response.data.map((item) =>{
                        relosid.push(item.id);
                    });
                    this.formData.roles = relosid;
                })
                .catch(() => {

                });
        },
        formSubmit() {
            this.$refs["dataForm"].validate(valid => {
                if (valid) {
                    this.formLoading = true;
                    let data = Object.assign({}, this.formData);
                    data.roles = this.formData.roles.join(",");
                    upUser(data).then(response => {
                        this.formLoading = false;
                        if (response.code) {
                            this.$message.error(response.message);
                            return false;
                        }
                        this.$message.success("操作成功");
                        this.formVisible = false;
                        // 刷新表单
                        this.resetForm();
                        this.getList();
                    });
                }
            });
        },
        // 删除
        handleDel(index, row) {
            if (row.id) {
                this.$confirm("确认删除该记录吗?", "提示", {
                    type: "warning"
                })
                    .then(() => {
                        modifyStatus({ userId: row, type: 2 })
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
                1: "danger"
            };
            return statusMap[status];
        },
        statusFilterName(status) {
            const statusMap = {
                1: "禁用",
                0: "正常"
            };
            return statusMap[status];
        },
        replaceDate_2: replaceDate_2
    },
    mounted() {},
    created() {
        // 加载表格数据
        this.getList();
        // 加载角色列表
        this.getRoleList();
    }
};
</script>

<style type="text/scss" lang="scss">
.el-dialog__body {
    padding: 0 20px;
}
.el-checkbox {
    margin-right: 10px;
}
</style>
