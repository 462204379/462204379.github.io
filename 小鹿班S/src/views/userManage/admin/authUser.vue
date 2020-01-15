<template>
    <div style="padding:10px 20px;">
        <el-page-header @back="$router.push({ path:'/userManage/authAdmin'})" content="用户登录详情"></el-page-header>
        <el-form :inline="true" :model="query" class="query-form" size="mini">
            <el-form-item class="query-form-item">
                <el-input v-model="query.phone" placeholder="用户名"></el-input>
            </el-form-item>
            <el-form-item class="query-form-item">
                <el-select v-model="query.status" placeholder="状态">
                    <el-option label="全部" value="-1"></el-option>
                    <el-option label="禁用" value="0"></el-option>
                    <el-option label="正常" value="1"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button-group>
                    <el-button type="primary" icon="el-icon-refresh" @click="onReset"></el-button>
                    <el-button type="primary" icon="search" @click="onSubmit">查询</el-button>
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
                label="登录时间"
                :show-overflow-tooltip="true">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span>{{ scope.row.createDate|replaceDate_2 }}</span>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination
            :page-size="query.pageSize"
            @current-change="handleCurrentChange"
            layout="prev, pager, next"
            :total="total">
        </el-pagination>
    </div>
</template>

<script>
import {
    getUserList
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
