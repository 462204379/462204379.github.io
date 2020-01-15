<template>
    <div class="login-container">
        <el-form class="card-box login-form" autoComplete="on" :model="ruleForm" :rules="rules" ref="ruleForm"
                 label-position="left">
            <h3 class="title">账号登录</h3>
            <el-form-item prop="username" class="item">
                <el-input
                    placeholder="账号"
                    name="userName"
                    autoComplete="on"
                    v-model="ruleForm.userName">
                    <i slot="prefix" class="el-input__icon"><icon-svg icon-class="user"/></i>
                </el-input>
            </el-form-item>
            <el-form-item prop="password" class="item">
                <!--<span class="svg-container">-->
                <!--<icon-svg icon-class="pwd"/>-->
                <!--</span>-->
                <el-input
                    placeholder="密码"
                    name="pwd" :type="isShowPwd ? 'text' : 'password'"
                    @keyup.enter.native="handleLogin"
                    v-model="ruleForm.pwd"
                    autoComplete="on">
                    <i slot="prefix" class="el-input__icon"><icon-svg icon-class="pwd"/></i>
                    <i slot="suffix" class="el-input__icon" @click='isShowPwd = !isShowPwd'><icon-svg icon-class="eye"/></i>
                </el-input>
            </el-form-item>
            <div>
                <el-button type="primary" style="width:100%;margin-bottom:30px;" :loading="loading"
                           @click.native="handleLogin()">登录
                </el-button>
            </div>
            <div>
                <el-button type="primary" style="width:100%;margin-bottom:30px;"
                           @click='zhuceDialog = true'>
                    手机号注册
                </el-button>
                <!--<el-button type="primary" style="width:100%;margin-bottom:30px;"
                           @click='showDialog = true'>
                    第三方登录
                </el-button>-->
            </div>
        </el-form>

        <!--<el-dialog title="第三方验证" :visible.sync="showDialog">
            邮箱登录成功,请选择第三方验证<br/>
        </el-dialog>-->
        <el-dialog title="手机号注册" :visible.sync="zhuceDialog" class="zhuce">
            <el-form :model="ruleFormZ" status-icon :rules="rulesZ" ref="ruleFormZ" label-width="100px" class="demo-ruleForm">
                <el-form-item label="手机号" prop="age">
                    <el-input v-model.number="ruleFormZ.age" maxlength="11"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="pass">
                    <el-input type="password" v-model="ruleFormZ.pass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass">
                    <el-input type="password" v-model="ruleFormZ.checkPass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitFormZ('ruleFormZ')">确认</el-button>
                    <el-button @click="resetFormZ('ruleFormZ')">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import {
    loginEnroll
} from "../../api/auth/login";
export default {
    data() {
        var checkAge = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('手机号不能为空'));
            } else {
                const reg = /^1[3|4|5|7|8|9][0-9]\d{8}$/;
                const isPhone = reg.test(value);
                if (!isPhone){
                    return callback(new Error('请输入正确的手机号'));
                }
            }
            setTimeout(() => {
                callback();
            }, 1000);
        };
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else if(value.length < 6) {
                callback(new Error('密码长度不能小于6六位数'));
            } else {
                if (this.ruleFormZ.checkPass !== '') {
                    this.$refs.ruleForm.validateField('checkPass');
                }
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if(value.length < 6) {
                callback(new Error('密码长度不能小于6六位数'));
            } else if (value !== this.ruleFormZ.pass) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        let validatePwd = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入密码"));
            } else {
                callback();
            }
        };
        return {
            ruleForm: {
                userName: "",
                pwd: "",
                checked: true
            },
            rules: {
                userName: [
                    { required: true, message: "请输入登录名", trigger: "blur" }
                ],
                pwd: [{ validator: validatePwd, trigger: "blur" }]
            },
            ruleFormZ: {
                pass: '',
                checkPass: '',
                age: ''
            },
            rulesZ: {
                pass: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                checkPass: [
                    { validator: validatePass2, trigger: 'blur' }
                ],
                age: [
                    { validator: checkAge, trigger: 'blur' }
                ]
            },
            isShowPwd: false, // 是否显示密码
            loading: false, // 登录loading
            showDialog: false, // 显示dialog
            redirect: null, // 回调地址
            zhuceDialog: false
        };
    },
    methods: {
        handleLogin() {
            this.$refs["ruleForm"].validate(valid => {
                if (valid) {
                    this.loading = true;
                    this.$store
                        .dispatch("loginName", this.ruleForm)
                        .then(response => {
                            this.loading = false;
                            if (response.code) {
                                this.$message.error(response.msg);
                                return;
                            }
                            let path = "/";
                            if (this.redirect) {
                                path = this.redirect;
                            }
                            this.$router.push({
                                path: path
                            });
                            //location.reload();
                            // window.location.replace(path);
                            // this.showDialog = true
                        })
                        .catch(() => {
                            this.loading = false;
                        });
                } else {
                    return false;
                }
            });
        },
        submitFormZ(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    loginEnroll(this.ruleFormZ.age, this.ruleFormZ.pass)
                        .then(response => {
                            if(response.code == 0){
                                this.$message({
                                    message: response.msg,
                                    type: 'success'
                                });
                            }
                            this.zhuceDialog = false;
                            this.resetFormZ('ruleFormZ');
                        })
                        .catch(() => {

                        });
                } else {
                    return false;
                }
            });
        },
        resetFormZ(formName) {
            this.zhuceDialog = false;
            this.$refs[formName].resetFields();
        }
    },
    created() {
        // 将参数拷贝进查询对象
        let query = this.$route.query;
        if (query.redirect) {
            // URL Encode
            this.redirect = decodeURIComponent(query.redirect);
        }
    }
};
</script>

<style type="text/scss" lang="scss">
@import "../../styles/mixin";
@import "../../styles/base";
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
.login-container {
    @include relative;
    height: 100%;
    background-color: $bg;
    input:-webkit-autofill {
        -webkit-box-shadow: 0 0 0 1000px #293444 inset !important;
        -webkit-text-fill-color: #fff !important;
    }
    .item {
        .el-form-item__content {
            display: flex;
            flex-flow: row;
        }
    }
    input {
        background: transparent;
        border: 0;
        -webkit-appearance: none;
        border-radius: 0;
        padding: 0.46rem 0.0666rem 0.16rem 0.2rem;
        color: $light_gray;
        height: 100%;
    }
    .el-input {
        display: inline-block;
    }
    .tips {
        font-size: 14px;
        color: #fff;
        margin-bottom: 0.13333rem;
    }
    .svg-container {
        padding: 0.08rem 0.0666rem 0.08rem 0.2rem;
        color: $dark_gray;
        vertical-align: middle;
        display: inline-block;
        &_login {
            font-size: 20px;
        }
    }
    .title {
        font-size: 26px;
        color: $light_gray;
        margin: 0 auto 0.5333rem auto;
        text-align: center;
        font-weight: bold;
    }
    .login-form {
        @include fxied-center;
        top: 40%;
        width: 22em;
        padding: 0.4666rem 0.4666rem 0.2rem 0.4666rem;
    }
    .el-form-item {
        border: 1px solid rgba(255, 255, 255, 0.1);
        background: rgba(0, 0, 0, 0.1);
        border-radius: 0.0666rem;
        color: #454545;
    }
    .show-pwd {
        position: absolute;
        right: 0.1333rem;
        top: 0.09333rem;
        font-size: 16px;
        color: $dark_gray;
        cursor: pointer;
    }
    .thirdparty-button {
        /*position: absolute;*/
        /*right: .4666rem;*/
        /*bottom: .37333rem;*/
    }
}
.zhuce {
    .el-input__inner {
        padding: 5px 10px;
        border: 1px solid #DCDFE6;
        border-radius: 4px;
        color: #606266;
    }
    .el-input {
        width: 80%;
    }
    .el-form-item {
        background: #fff;
    }
    .el-icon-circle-check {
        color: $success;
    }
    .el-dialog__body{
        padding-bottom: 10px;
    }
}
</style>
