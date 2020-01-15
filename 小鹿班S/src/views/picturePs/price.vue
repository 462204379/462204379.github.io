<template>
    <div>
        <div id="price">
            <div style="color: #fff;background: #657081;height: 40px;line-height: 40px;text-align: center;">
                <span>标题:<span>xxxxx</span></span>
                <span style="margin-left: 10px;">已选中图片8张</span>
            </div>
            <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" class="demo-dynamic" style="text-align: center;">
                <el-form-item
                    style="padding-left: 38px;"
                    v-for="(domain, index) in dynamicValidateForm.domains"
                    :key="domain.key"
                    :prop="'domains.' + index + '.value'"
                    :rules="{required: true, message: '价格不能为空', trigger: 'blur'}"
                >
                    <el-select v-model="domain.select" placeholder="请选择" style="width: 120px;" size="mini">
                        <el-option label="促销价" value="1"></el-option>
                        <el-option label="差价" value="2"></el-option>
                        <el-option label="原价" value="3"></el-option>
                    </el-select>
                    <span style="margin: 0 10px">变更为</span>
                    <el-input v-model="domain.value" style="width: 120px;" placeholder="请输入价格" size="mini"></el-input>
                    <i v-if="dynamicValidateForm.domains.length > 1" class="el-icon-remove" @click.prevent="removeDomain(domain)" style="font-size: 28px;vertical-align: middle;margin-left: 10px;cursor: pointer"></i>
                </el-form-item>
                <el-form-item>
                    <el-button size="mini" type="primary" @click="submitForm('dynamicValidateForm')">替换价格</el-button>
                    <el-button size="mini" v-if="dynamicValidateForm.domains.length<3" @click="addDomain">新增</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
    import PicturepsItem from "./picturePsItem.vue";
    export default {
        data() {
            return {
                dynamicValidateForm: {
                    domains: [{
                        select: "1",
                        value: ""
                    }]
                }
            }
        },
        components: {
            PicturepsItem
        },
        created() {

        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    console.log(this.dynamicValidateForm.domains)
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            removeDomain(item) {
                var index = this.dynamicValidateForm.domains.indexOf(item)
                if (index !== -1) {
                    this.dynamicValidateForm.domains.splice(index, 1)
                }
            },
            addDomain() {
                this.dynamicValidateForm.domains.push({
                    value: '',
                    select: '1'
                });
            }
        }
    }
</script>

<style>
   #price .el-form-item {
        margin-bottom: 10px;
    }
   #price .el-form-item__error {
       padding-top: 0;
       left: 45%;
   }
</style>
