<template>
    <div class="zhezhao">
        <div id="matirialItem" :style="{'height':matiriaVal.mainHeight-30+'px'}" style="min-height: 300px;">
            <div>
                <el-tabs v-model="sucaiListSeach.commonOrPerson" @tab-click="handleClick" :tab-position="'top'">
                    <el-tab-pane label="公共素材" name="common"></el-tab-pane>
                    <el-tab-pane label="系统推荐" name="system"></el-tab-pane>
                    <el-tab-pane label="个人收藏" name="person"></el-tab-pane>
                </el-tabs>
                <i class="el-icon-close" style="position: absolute;right: 8px;top: 8px;cursor: pointer;color: #909399;font-size: 16px;" @click="showhide"></i>
            </div>
            <div class="matirial-search">
                <div class="left">
                    <el-input placeholder="请输入素材名称" v-model="sucaiListSeach.materialName" size="mini" @keyup.enter.native="enterClick"></el-input>
                </div>
                <div class="right">
                    <span class="selectName">{{optionszidian[searchRightSelect[0]]}}</span>
                    <el-select :popper-append-to-body="false" v-model="searchRightSelect" placeholder="请选择" size="mini" multiple collapse-tags @change="selectChange" style="width: 120px">
                        <el-option-group
                            v-for="group in options"
                            :key="group.label"
                            :label="group.label">
                            <el-option
                                v-for="item in group.options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-option-group>
                    </el-select>
                    <i class="el-icon-s-operation" :class="{'searchActive':searchActive==1}" @click="searchActive=1,sucaiListSeach.pageSize=10,seacchIndexAxios()"></i>
                    <i class="el-icon-menu" :class="{'searchActive':searchActive==2}" @click="searchActive=2,sucaiListSeach.pageSize=30,seacchIndexAxios()"></i>
                </div>
                <div class="clearboth"></div>
            </div>
            <div class="conter">
                <div class="conterLeft" :style="{'height':matiriaVal.conterHeight+'px'}" v-show="folderType==false">
                    <div v-if="sucaiListSeach.commonOrPerson!='system'" @click="sucaiListSeach.brandId=0,seacchIndexAxios()" class="leftQuanbu" style="height: 35px;line-height: 35px;padding-left: 10px;cursor: pointer;" :class="{'conterLeftActive':sucaiListSeach.brandId==0}">全部</div>
                    <div v-else @click="sucaiListSeach.materialSortId=0,seacchIndexAxios(),sortName='全部'" class="leftQuanbu" style="height: 35px;line-height: 35px;padding-left: 10px;cursor: pointer;" :class="{'conterLeftActive':sucaiListSeach.materialSortId==0}">全部</div>
                    <el-collapse v-model="conterLeftName" accordion v-if="sucaiListSeach.commonOrPerson!='system'">
                        <el-collapse-item :title="item.brandName" v-for="(item,index) in brandList" :name="index" :key="index">
                            <ul>
                                <li v-for="(items,index) in item.brandList" :key="index" :class="{'conterLeftActive':items.id==sucaiListSeach.brandId}" @click="sucaiListSeach.brandId=items.id,seacchIndexAxios()">
                                    <div class="left">{{items.brandName}}</div>
                                    <!--<div class="right">{{items.number}}</div>-->
                                </li>
                            </ul>
                        </el-collapse-item>
                    </el-collapse>
                    <ul v-else>
                        <li v-for="(items,index) in addForm_list_3" :key="index" :class="{'conterLeftActive':items.id==sucaiListSeach.materialSortId}" @click="sucaiListSeach.materialSortId=items.id,seacchIndexAxios(),sortName=items.sortName">
                            <div class="left">{{items.sortName}}</div>
                        </li>
                     </ul>
                </div>
                <div class="conterLeft" :style="{'height':matiriaVal.conterHeight+'px'}" v-show="folderType==true">
                    <div @click="sucaiListSeach.folderIds=folderIdsAll,seacchIndexAxios()" class="leftQuanbu" style="height: 35px;line-height: 35px;padding-left: 10px;cursor: pointer;" :class="{'conterLeftActive':sucaiListSeach.folderIds==folderIdsAll}">全部<i style="float: right;font-size: 17px;margin-top: 9px;margin-right: 7.5px;color: #409eff;" class="el-icon-circle-plus-outline iconsize" @click.stop="shoucangFildFormVisible=true"></i></div>
                    <ul>
                        <li v-for="(items,index) in folderList" :key="index" :class="{'conterLeftActive':items.id==sucaiListSeach.folderIds}" @click="folderClick(items.id)" @dblclick="upFolderName(items)">
                            <div class="left" v-show="items.type==false" :class="{'borderColor':items.type}">
                                {{items.folderName}}
                            </div>
                            <div v-show="items.type==true" class="left" :class="{'borderColor':items.type}">
                                <input style="height: 100%;" @click.stop="items.type=true" type="text" v-model="items.folderName" @blur="items.type=false" @change="folderChange(items)">
                            </div>
                            <div class="right" @click.stop="folderRemoveClick(items.id)"><i class="el-icon-delete"></i></div>
                        </li>
                    </ul>
                </div>
                <div class="conterRight" :style="{'height':matiriaVal.conterHeight+'px'}">
                    <div class="conterRightTop">
                        <div class="left">
                            <div class="heightCenter">
                                <i class="el-icon-s-fold iconsize"></i>
                                <div class="icontext" v-show="sucaiListSeach.commonOrPerson=='system'">所选分类 <span style="color:#409eff">{{sortName}}</span></div>
                                <div class="icontext" v-show="sucaiListSeach.commonOrPerson!='system'">素材分类</div>
                            </div>
                        </div>
                        <div class="right">
                            <div v-if="(authRules.indexOf('xitongUpImg') != '-1'||sucaiListSeach.commonOrPerson =='common')&&sucaiListSeach.commonOrPerson!='person'" class="heightCenter" @click="addsucaiClick" style="cursor: pointer">
                                <i class="el-icon-circle-plus-outline iconsize"></i><div class="icontext">上传素材</div>
                            </div>
                        </div>
                        <div class="clearboth"></div>
                        <el-radio-group v-model="sucaiListSeach.materialSortId" size="mini" @change="seacchIndexAxios" v-show="sucaiListSeach.commonOrPerson!='system'">
                            <el-radio-button label="0">全部</el-radio-button>
                            <el-radio-button :label="item.id" v-for="(item,index) in addForm_list_3" :key="index">{{item.sortName}}</el-radio-button>
                        </el-radio-group>
                    </div>
                    <div class="sucai-list" :style="{'height':sucaiListSeach.commonOrPerson=='system'?matiriaVal.conterHeight-71+'px':matiriaVal.conterHeight-99+'px'}">
                        <el-checkbox v-show="sucaiList.length > 0" style="margin-left: 10px;" :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                        <ul v-if="searchActive==1">
                            <el-checkbox-group v-model="selectId" @change="handleCheckedCitiesChange">
                                <li v-for="(item,index) in sucaiList" :key="index" v-show="searchActive==1" @dblclick="zhiruClick(item)">
                                    <el-checkbox  :label="item.id" :key="item.id" style="margin-right: 10px;"></el-checkbox>
                                    <div class="sucaiList_1">
                                        <!--<img @click="yulanUrl=item.linkUrl,yulanFormVisible=true" :src="item.linkUrl" :class="{'linkUrlClass':item.width > item.height}">-->
                                        <el-image @click="yulanUrl=item.linkUrl,yulanFormVisible=true" :src="item.linkUrl" :class="{'linkUrlClass':item.width > item.height}" lazy>
                                            <div slot="placeholder" class="image-slot" style="height: 58px;text-align: center;line-height: 58px;width: 58px;font-size: 12px;">
                                                加载中
                                            </div>
                                        </el-image>
                                        <i @click="shoucangClick(item)" :class="{'shoucangC':item.isCollect}" class="el-icon-star-off" style="position: absolute;right: 2px;bottom: 2px;    font-size: 12px;"></i>
                                    </div>
                                    <div style="flex: 1;font-size: 12px;">
                                        <div v-show="sucaiListSeach.commonOrPerson == 'common'">
                                            <span>产品名称: {{item.materialName}}</span>
                                            <span style="margin-left: 10px">图片尺寸: {{item.width}}x{{item.height}}</span>
                                            <span style="margin-left: 10px">图片大小: {{item.fileSize|getFileSize}}</span>
                                        </div>
                                        <div v-show="sucaiListSeach.commonOrPerson != 'common'">
                                            <span>产品名称: {{item.materialName}}</span>
                                        </div>
                                        <div style="margin: 5px 0;color: #727C8B;" v-show="sucaiListSeach.commonOrPerson == 'common'">
                                            <span>一级<span style="background: #A9A9A9;color: #fff;padding: 0 18px 0 5px;border-radius: 3px;margin-left: 10px;height: 14px;line-height: 1.2;display: inline-block;">{{item.firstType}}</span></span>
                                            <span style="margin-left: 20px;">二级<span style="background: #A9A9A9;color: #fff;padding: 0 18px 0 5px;border-radius: 3px;margin-left: 10px;height: 14px;line-height: 1.2;display: inline-block;">{{item.brandName}}</span></span>
                                            <span style="margin-left: 20px;">素材分类：<span style="background: #A9A9A9;color: #fff;padding: 0 18px 0 5px;border-radius: 3px;margin-left: 10px;height: 14px;line-height: 1.2;display: inline-block;">{{item.sortName}}</span></span>
                                        </div>
                                        <div style="margin: 5px 0;color: #727C8B;" v-show="sucaiListSeach.commonOrPerson != 'common'">
                                            <span>图片属性：<span style="margin-left: 10px;">{{item.width}}x{{item.height}}/{{item.fileSize|getFileSize}}</span></span>
                                        </div>
                                        <div style="color: #727C8B;">
                                            <span>上传者: {{item.userName}}</span>
                                            <span style="margin-left: 10px">上传时间: {{item.createTime|replaceDate_2}}</span>
                                        </div>
                                    </div>
                                    <div style="margin-right: 20px;">
                                        <i v-if="(getAdminId == item.userId||authRules.indexOf('material_modify') != '-1')&&sucaiListSeach.commonOrPerson !='person'" class="el-icon-delete" style="font-size: 16px;margin-right: 10px;" @click="removesucaiClick(item.id)"></i>
                                        <i v-if="(getAdminId == item.userId||authRules.indexOf('material_modify') != '-1')&&sucaiListSeach.commonOrPerson !='person'" class="el-icon-edit" style="font-size: 16px;" @click="upsucaiClick(item)"></i>
                                        <i v-if="folderType==true" class="el-icon-share" style="font-size: 16px;margin-left: 10px;" @click="movesucaiClick(item)"></i>
                                    </div>
                                </li>
                            </el-checkbox-group>
                        </ul>
                        <ul v-else>
                            <el-checkbox-group v-model="selectId" @change="handleCheckedCitiesChange">
                                <li v-for="(item,index) in sucaiList" :key="index" v-show="searchActive==2" style="width: 100px;height: 100px;border: 1px solid #ccc;margin: 10px;padding: 0;float: left" @dblclick="zhiruClick(item)">
                                    <div class="sucaiList_2">
                                        <!--<img @click="yulanUrl=item.linkUrl,yulanWidth=item.width,yulanFormVisible=true" :src="item.linkUrl" :class="{'linkUrlClass':item.width > item.height}">-->
                                        <el-image @click="yulanUrl=item.linkUrl,yulanFormVisible=true" :src="item.linkUrl" :class="{'linkUrlClass':item.width > item.height}" lazy>
                                            <div slot="placeholder" class="image-slot" style="height: 98px;text-align: center;line-height: 98px;width: 98px;font-size: 12px;">
                                                加载中
                                            </div>
                                        </el-image>
                                        <el-checkbox  :label="item.id" :key="item.id" style="position: absolute;left: 5px;bottom: 2px;"></el-checkbox>
                                        <i @click="shoucangClick(item)" :class="{'shoucangC':item.isCollect}" class="el-icon-star-off" style="position: absolute;right: 2px;bottom: 2px;font-size: 16px;"></i>
                                    </div>
                                </li>
                            </el-checkbox-group>
                        </ul>
                    </div>
                    <el-pagination
                        style="position: absolute;bottom: 28px;z-index: 9;padding-left: 0;"
                        v-show="sucaiList.length"
                        small
                        layout="sizes, prev, pager, next"
                        :current-page="sucaiListSeach.pageNo"
                        :page-size="sucaiListSeach.pageSize"
                        :page-sizes="[10, 20, 30, 40, 50, 60, 70, 80, 90, 100]"
                        @current-change="currentChange"
                        @size-change="handleSizeChange"
                        :total="total">
                    </el-pagination>
                    <div class="conFooter">
                        <span class="conFooterLeft">已选 {{selectId.length}}</span>
                        <span class="conFooterRight">
                                <!--<i class="el-icon-edit"></i>-->
                                <i v-if="sucaiListSeach.commonOrPerson!='person'" class="el-icon-star-off" @click="shoucangClick('all')"></i>
                                <i v-if="sucaiListSeach.commonOrPerson=='person'" class="el-icon-star-off shoucangC" @click="shoucangNoClick('all')"></i>
                                <i v-if="folderType==true" class="el-icon-share" style="margin-left: 10px;" @click="movesucaiAllClick"></i>
                                <!--<i class="el-icon-delete"></i>-->
                            </span>
                    </div>
                </div>
                <div class="clearboth"></div>
            </div>
            <div class="footer">
                <el-button type="primary" size="mini" @click="showhide">取消</el-button>
                <el-button type="primary" size="mini" v-if="selectId.length != 0" @click="zhiruClick('')">置入模板</el-button>
                <el-button type="primary" size="mini" disabled v-else>置入模板</el-button>
            </div>
        </div>
        <el-dialog title="上传素材" :visible.sync="dialogFormVisible" :append-to-body="true" :close-on-click-modal="false" custom-class="addsucai">
            <el-form :model="addForm" ref="addForm" size="small" label-position="left" style="padding: 0 10px;">
                <el-form-item>
                    <div>1.选择素材</div>
                    <el-upload
                        class="upload-demo"
                        drag
                        :limit="20"
                        :action="BASE_URL+'/wow/sys/file/upFile'"
                        :on-success="upSuccess"
                        :before-upload="imgPreview"
                        :before-remove="upRemove"
                        :file-list="ruleForm.fileList"
                        :on-exceed="handleExceed"
                        multiple>
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text" style="line-height: 1.4;">将文件拖到此处，或<em>点击上传</em><div>*除了背景图外，其他图片必须是透明底的PNG图片</div></div>
                    </el-upload>
                </el-form-item>
                <el-form-item label="2.一级文件夹(可自定义)" label-width="160px" v-show="sucaiListSeach.commonOrPerson != 'system'">
                    <el-select v-model="ruleForm.fileName" @change="fileBrandChange" filterable allow-create default-first-option placeholder="请添加一级文件夹">
                        <el-option size="mini" :label="item.brandName" :value="item.brandName" v-for="(item,index) in brandList" :key="index"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="3.二级文件夹(可自定义)" label-width="160px" v-show="sucaiListSeach.commonOrPerson != 'system'">
                    <el-select v-model="ruleForm.brandName" filterable allow-create default-first-option placeholder="请添加二级文件夹">
                        <el-option size="mini" :label="item.brandName" :value="item.brandName" v-for="(item,index) in addForm_list_2" :key="index"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="4.素材分类(点击选择)" label-width="160px" v-if="sucaiListSeach.commonOrPerson != 'system'">
                    <el-select v-model="ruleForm.sceneName" filterable allow-create placeholder="请添加素材分类">
                        <el-option size="mini" :label="item.sortName" :value="item.id" v-for="(item,index) in addForm_list_3" :key="index"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="2.素材分类(点击选择)" label-width="160px" v-else>
                    <el-select v-model="ruleForm.sceneName" filterable allow-create placeholder="请添加素材分类">
                        <el-option size="mini" :label="item.sortName" :value="item.id" v-for="(item,index) in addForm_list_3" :key="index"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="chongzhiClick" size="mini">重置</el-button>
                <el-button type="primary" @click="addsucaiSubmit" size="mini">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog title="修改素材" :visible.sync="updialogFormVisible" :append-to-body="true" :close-on-click-modal="false" custom-class="upsucai">
            <el-form :model="upForm" size="small" label-position="left" style="padding: 0 10px;">
                <el-form-item label="1.素材名称(可自定义)" label-width="160px">
                    <el-input v-model="upForm.materialName" placeholder="请输入内容" style="width: 203px;"></el-input>
                </el-form-item>
                <el-form-item label="2.一级文件夹(可自定义)" label-width="160px" v-show="sucaiListSeach.commonOrPerson == 'common'">
                    <el-select v-model="upForm.fileName" @change="fileBrandChange" filterable allow-create default-first-option placeholder="请添加一级文件夹">
                        <el-option size="mini" :label="item.brandName" :value="item.brandName" v-for="(item,index) in brandList" :key="index"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="3.二级文件夹(可自定义)" label-width="160px" v-show="sucaiListSeach.commonOrPerson == 'common'">
                    <el-select v-model="upForm.brandName" filterable allow-create default-first-option placeholder="请添加二级文件夹">
                        <el-option size="mini" :label="item.brandName" :value="item.brandName" v-for="(item,index) in addForm_list_2" :key="index"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="4.素材分类(点击选择)" label-width="160px" v-if="sucaiListSeach.commonOrPerson == 'common'">
                    <el-select v-model="upForm.sceneName" filterable allow-create placeholder="请添加素材分类">
                        <el-option size="mini" :label="item.sortName" :value="item.id" v-for="(item,index) in addForm_list_3" :key="index"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="2.素材分类(点击选择)" label-width="160px" v-else>
                    <el-select v-model="upForm.sceneName" filterable allow-create placeholder="请添加素材分类">
                        <el-option size="mini" :label="item.sortName" :value="item.id" v-for="(item,index) in addForm_list_3" :key="index"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="updialogFormVisible = false" size="mini">取 消</el-button>
                <el-button type="primary" @click="upsucaiSubmit" size="mini">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog width="500px" title="添加收藏" :visible.sync="shoucangFormVisible" :append-to-body="true" :close-on-click-modal="false" custom-class="addshoucangClass">
            <ul>
                <li v-for="(item, index) in folderList" :key="index" style="display: flex;align-items: center;padding: 10px 0;border-bottom: 1px solid #C7C7C7;margin: 0 20px">
                    <div style="flex: 1">
                        <div>{{item.folderName}}</div>
                        <div></div>
                    </div>
                    <div><el-button type="primary" plain size="mini" @click="addshoucangSubmit(item.id)">收藏</el-button></div>
                </li>
            </ul>
            <div slot="footer" class="dialog-footer" style="text-align: center;">
                <el-button type="primary" @click="shoucangFildFormVisible=true" size="mini">创建收藏文件夹</el-button>
            </div>
        </el-dialog>

        <el-dialog width="400px" title="创建新的收藏文件夹" :visible.sync="shoucangFildFormVisible" :append-to-body="true" :close-on-click-modal="false" custom-class="addshoucangFild">
            <el-form :model="shoucangFildForm">
                <el-form-item label="">
                    <el-input v-model="shoucangFildForm.folderName" autocomplete="off" placeholder="收藏标题"></el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-input
                        type="textarea"
                        :rows="6"
                        placeholder="收藏描述"
                        v-model="shoucangFildForm.remarks">
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="shoucangFildFormVisible=false" size="mini">取消</el-button>
                <el-button type="primary" @click="addFileClick" size="mini">确认</el-button>
            </div>
        </el-dialog>
        <el-dialog :width="yulanWidth+'px'" title="图片预览" :visible.sync="yulanFormVisible" :append-to-body="true" :close-on-click-modal="false" custom-class="addshoucangClass">
            <!--<img :src="yulanUrl" alt="" style="width: 100%;height: auto;padding: 20px;">-->
            <el-image :src="yulanUrl" style="width: 100%;height: auto;padding: 20px;">
                <div slot="placeholder" class="image-slot" style="height: 100px;text-align: center;line-height: 100px;">
                    加载中...
                </div>
            </el-image>
        </el-dialog>

        <el-dialog title="编辑" :visible.sync="movesucaiForm" :append-to-body="true" :close-on-click-modal="false" custom-class="upsucai">
            <el-form :model="upForm" size="small" label-position="left" style="padding: 0 10px;">
                <el-form-item label="文件夹">
                    <el-select v-model="movesucaiFormList.folderId"  placeholder="请选择文件夹">
                        <el-option size="mini" :label="item.folderName" :value="item.id" v-for="(item,index) in folderList" :key="index"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="movesucaiForm = false" size="mini">取 消</el-button>
                <el-button type="primary" @click="movesucaiSubmit" size="mini">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { BASE_URL } from "../../../config/app";
import {
    replaceDate_2,
    getFileSize
} from "../../../utils/public";
import {
    getSessionStorage
} from "../../../utils/auth";
import { getAdminId } from "../../../utils/auth";
import {
    queryMaterialLibrary, //素材列表
    addMaterialLibrary, //批量新增素材
    upMaterialLibrary, //修改素材
    querySort, //素材分类
    remove_collect_material, //删除素材
    collect_material, //收藏素材
    queryFolder, //查询收藏文件夹列表
    addFolder, //添加收藏文件夹
    removeFolder, // 删除收藏文件夹
    upFolder, // 修改收藏文件夹
    move_collect_material //移动收藏素材
} from "../../../api/picturePs/items";
import {
    queryBrand
} from "../../../api/auth/picturePs";
export default {
    name: "matirialItem",
    data() {
        return {
            sortName: "全部",
            authRules: getSessionStorage("authRules"),
            yulanFormVisible: false,
            yulanUrl: "",
            yulanWidth: "800",
            getAdminId: getAdminId(),
            selectChangeCunchu: ["material_name", "desc"],
            updialogFormVisible: false,
            upForm: {
                fileName: "",
                brandName: "",
                sceneName: "",
                materialName: "",
                materialId: ""
            },
            shoucangFildFormVisible: false,
            shoucangFildForm: {
                folderName: "",
                remarks: ""
            },
            folderIdsAll: "",
            folderList: [],
            folderType: false,
            movesucaiForm: false,
            movesucaiFormList: {},
            addshoucangForm: {
                name: "",
                firstTypeId: "",
                type: "",
                materialIds:""
            },
            shoucangFormVisible: false,
            checkAll: false,
            isIndeterminate: true,
            selectAllId: [],
            selectId: [],
            fileListUrl: [],
            brandList: [],
            sucaiListSeach: {
                brandId: 0, //品牌 默认传0
                materialSortId: 0, //素材分类 默认传0
                orderBy: "desc", //排序 desc asc
                orderByField: "material_name", //排序字段 file_size大小 material_name名称
                materialName: "", //素材名称
                commonOrPerson: "common", //个人或公共 common公共 person个人 system系统
                userId: 0, //上传人id 默认传0
                folderIds: 0, //文件夹id
                pageNo: 1,
                pageSize: 10
            },
            sucaiList: [],
            total: 50,
            ruleForm: {
                fileList: [],
                fileName: "",
                brandName: "",
                sceneName: ""
            },
            BASE_URL: BASE_URL,
            dialogImageUrl: "",
            dialogVisible: false,
            disabled: false,
            dialogFormVisible: false,
            addForm: {},
            activeName: "first",
            searchLeft: "",
            searchRightSelect: ["material_name", "desc"],
            conterLeftName: "",
            radioVal: "全部",
            searchActive: "1",
            addForm_list_1: [],
            addForm_list_2: [],
            addForm_list_3: [],
            optionszidian: {
                "material_name": "名称",
                "file_size": "大小",
                "create_time": "创建时间"
            },
            options: [
                {
                    label: "名称",
                    options: [
                        {
                            value: "material_name",
                            label: "名称"
                        },
                        {
                            value: "file_size" ,
                            label: "大小"
                        },
                        {
                            value: "create_time",
                            label: "创建时间"
                        }
                    ]
                },
                {
                    label: "排序",
                    options: [
                        {
                            value: "asc",
                            label: "升序"
                        },
                        {
                            value: "desc",
                            label: "降序"
                        }
                    ]
                }
            ],
            conterLeftId: "1",
            conterLeftData: [
                {
                    name: "经销",
                    chil: [
                        {
                            name: "bolang",
                            number: "10",
                            id: "1"
                        },
                        {
                            name: "kelaili",
                            number: "10",
                            id: "2"
                        }
                    ]
                },
                {
                    name: "TP",
                    chil: [
                        {
                            name: "bolang",
                            number: "10",
                            id: "3"
                        },
                        {
                            name: "kelaili",
                            number: "10",
                            id: "4"
                        }
                    ]
                }
            ],
            clickTimer: null
        };
    },
    filters: {
        replaceDate_2: replaceDate_2,
        getFileSize: getFileSize
    },
    props: ["matiriaVal"],
    created() {},
    computed: {},
    mounted() {
        /*this.indexAxios();
        this.brandAxios();
        this.querySortList();*/
    },
    methods: {
        chongzhiClick() {
            this.ruleForm.fileList = [];
            this.ruleForm.fileName = "";
            this.ruleForm.brandName = "";
            this.ruleForm.sceneName = "";
        },
        handleExceed(files, fileList) {
            this.$message.warning(`最多选择 20 个文件，本次选择了 ${files.length} 个文件`);
        },
        handleSizeChange(val) {
            this.sucaiListSeach.pageSize = val;
            this.seacchIndexAxios();
        },
        seacchIndexAxios() {
            this.sucaiListSeach.pageNo = 1;
            this.indexAxios();
        },
        currentChange(val) {
            this.sucaiListSeach.pageNo = val;
            this.indexAxios();
        },
        zhiruClick(url) {
            if(url){
                if (this.matiriaVal.imgLength){
                    this.$emit("enterClick", [
                        {
                            url: url.linkUrl,
                            name: url.materialName
                        }
                    ]);
                } else {
                    this.$emit("enterClick", {
                        url: url.linkUrl,
                        name: url.materialName
                    });
                }
                return;
            }
            let ulrList = [];
            this.sucaiList.map((item)=>{
                if(this.selectId.indexOf(item.id) != "-1"){
                    ulrList.push({
                        url: item.linkUrl,
                        name: item.materialName
                    })
                }
            });
            if (this.matiriaVal.imgLength){
                this.$emit("enterClick", ulrList);
            } else {
                if(ulrList.length > 1){
                    this.$message.warning("最多选择一张图片");
                    return;
                }
                this.$emit("enterClick", ulrList[0]);
            }
        },
        upsucaiSubmit(){
            if(this.upForm.materialName == ""){
                this.$message({
                    message: '请先输入素材名称',
                    type: 'warning'
                });
                return;
            }
            if(this.upForm.fileName == ""&&this.sucaiListSeach.commonOrPerson != 'common'){
                this.$message({
                    message: '请先选择一级文件夹',
                    type: 'warning'
                });
                return;
            }
            if(this.upForm.brandName == ""&&this.sucaiListSeach.commonOrPerson != 'common'){
                this.$message({
                    message: '请先选择二级文件夹',
                    type: 'warning'
                });
                return;
            }
            if(this.upForm.sceneName == ""){
                this.$message({
                    message: '请先选择素材名称',
                    type: 'warning'
                });
                return;
            }
            let commonOrPerson =  (this.sucaiListSeach.commonOrPerson == "common")?"common":"";
            let form = {
                firstType: this.upForm.fileName, //一级类目
                brandName: this.upForm.brandName, //品牌
                sortId: this.upForm.sceneName, //分类id
                materialName: this.upForm.materialName, //素材名称
                materialId: this.upForm.materialId, //素材id
                commonOrPerson: commonOrPerson
            };
            upMaterialLibrary(form)
                .then(response => {
                    if(response.code==0){
                        this.updialogFormVisible = false;
                        this.$message({
                            message: response.msg,
                            type: 'success'
                        });
                        this.indexAxios();
                        this.brandAxios();
                    }
                })
                .catch(() => {

                });
        },
        addFileClick() {
            if(this.shoucangFildForm.folderName == ""){
                this.$message({
                    message: '请先输入名称',
                    type: 'warning'
                });
                return;
            }
            addFolder(this.shoucangFildForm)
                .then(response => {
                    if(response.code==0){
                        this.$message({
                            message: response.msg,
                            type: 'success'
                        });
                        this.shoucangFildFormVisible = false;
                        this.folderIdsAllList();
                    }
                })
                .catch(() => {

                });
        },
        handleCheckAllChange(val) {
            this.selectId = val ? this.selectAllId : [];
            this.isIndeterminate = false;
        },
        handleCheckedCitiesChange(value) {
            let checkedCount = value.length;
            this.checkAll = checkedCount === this.selectAllId.length;
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.selectAllId.length;
        },
        shoucangNoClick() {
            if(this.selectId.length == 0){
                this.$message({
                    message: '请先选择素材',
                    type: 'warning'
                });
                return;
            }
            this.$confirm('取消收藏, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                    let form = {
                        materialIds: this.selectId.join(","), //素材id（必传，逗号分隔）
                        type: "cancel", //操作类型 collect收藏 cancel取消收藏
                        folderId: 0 //文件夹id（取消收藏时传0）
                    };
                    collect_material(form)
                        .then(response => {
                            if(response.code==0){
                                this.$message({
                                    message: response.msg,
                                    type: 'success'
                                });
                                this.indexAxios();
                            }
                        })
                        .catch(() => {});
            }).catch(() => {

            });
        },
        shoucangClick(data){
            if(data == "all"){
                this.addshoucangForm.name = "all";
                if(this.selectId.length == 0){
                    this.$message({
                        message: '请先选择素材',
                        type: 'warning'
                    });
                    return;
                }
                this.shoucangFormVisible = true;
                this.folderIdsAllList();
            } else {
                if(data.isCollect){
                    let form = {
                        materialIds : data.id, //素材id（必传，逗号分隔）
                        type: "cancel",  //操作类型 collect收藏 cancel取消收藏
                        folderId: 0  //文件夹id（取消收藏时传0）
                    };
                    collect_material(form)
                        .then(response => {
                            if(response.code==0){
                                this.$message({
                                    message: response.msg,
                                    type: 'success'
                                });
                                this.shoucangFormVisible = false;
                                this.indexAxios();
                            }
                        })
                        .catch(() => {

                        });
                    return;
                }
                this.addshoucangForm.name = "";
                this.addshoucangForm.materialIds = data.id;
                this.shoucangFormVisible = true;
                this.folderIdsAllList();
            }
        },
        addshoucangSubmit(id){
            let form = "";
            if(this.addshoucangForm.name == "all"){
                form = {
                    materialIds: this.selectId.join(","), //素材id（必传，逗号分隔）
                    type: "collect",  //操作类型 collect收藏 cancel取消收藏
                    folderId: id  //文件夹id（取消收藏时传0）
                };
            } else {
                form = {
                    materialIds : this.addshoucangForm.materialIds, //素材id（必传，逗号分隔）
                    type: "collect",  //操作类型 collect收藏 cancel取消收藏
                    folderId: id  //文件夹id（取消收藏时传0）
                };
            }
            collect_material(form)
                .then(response => {
                    if(response.code==0){
                        this.$message({
                            message: response.msg,
                            type: 'success'
                        });
                        this.shoucangFormVisible = false;
                        this.indexAxios();
                    }
                })
                .catch(() => {

                });
        },
        removesucaiClick(id){
            this.$confirm('确认删除, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                remove_collect_material(id)
                    .then(response => {
                        if(response.code==0){
                            this.dialogFormVisible = false;
                            this.$message({
                                message: response.msg,
                                type: 'success'
                            });
                            this.indexAxios();
                        }
                    })
                    .catch(() => {

                    });
            }).catch(() => {

            });
        },
        upsucaiClick(data) {
            this.upForm.fileName = data.firstType;
            this.upForm.brandName = data.brandName;
            this.upForm.sceneName = data.sortId;
            this.upForm.materialName = data.materialName;
            this.upForm.materialId = data.id;
            this.updialogFormVisible = true;
            this.querySortList();
            queryBrand(data.brandId)
                .then(response => {
                    this.addForm_list_2 = response.data;
                })
                .catch(() => {

                });
        },
        addsucaiClick() {
            this.ruleForm.fileList = [];
            this.ruleForm.fileName = "";
            this.ruleForm.brandName = "";
            this.ruleForm.sceneName = "";
            this.fileListUrl = [];
            this.dialogFormVisible = true;
            this.querySortList();
        },
        querySortList() {
            querySort()
                .then(response => {
                    this.addForm_list_3 = response.data;
                })
                .catch(() => {

                });
        },
        fileBrandChange(val){
            this.ruleForm.brandName = "";
            this.upForm.brandName = "";
            let subType = false;
            let brandId = "";
            this.brandList.map((item)=>{
                if(item.brandName==val){
                    brandId = item.id;
                    subType = true;
                }
            })
            if(subType){
                queryBrand(brandId)
                    .then(response => {
                        this.addForm_list_2 = response.data;
                    })
                    .catch(() => {

                    });
            } else {
                this.addForm_list_2 = [];
            }
        },
        indexAxios() {
            this.sucaiList = [];
            this.checkAll = false;
            this.isIndeterminate = false;
            this.selectId = [];
            this.sucaiListSeach.orderBy = this.searchRightSelect[1];
            this.sucaiListSeach.orderByField = this.searchRightSelect[0];
            queryMaterialLibrary(this.sucaiListSeach)
                .then(response => {
                    this.sucaiList = response.data;
                    this.total = response.total;
                    this.selectAllId = [];
                    response.data.map((item)=>{
                        this.selectAllId.push(item.id);
                    })
                })
                .catch(() => {

                });
        },
        brandAxios() {
            queryBrand(-1)
                .then(response => {
                    this.brandList = response.data;
                })
                .catch(() => {

                });
        },
        upRemove(file, fileList){
            let list = [];
            fileList.map((item) => {
                if(item.uid != file.uid){
                    list.push({
                        linkUrl: item.response.data.url,
                        materialName: item.response.data.fileName.split(".")[0]
                    });
                }
            });
            this.fileListUrl = list;
        },
        imgPreview(file) {
            const isJPG = file.type === 'image/jpeg'||file.type === 'image/png';
            const isLt2M = file.size / 1024 / 1024 < 100;
            if (!isJPG) {
                this.$message.error('请上传正确的图片!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 100MB!');
            }
            return isJPG && isLt2M;
        },
        upSuccess(response, file, fileList){
            this.fileListUrl.push({
                linkUrl: response.data.url,
                materialName: response.data.fileName.split(".")[0]
            });
        },
        addsucaiSubmit(){
            if(this.sucaiListSeach.commonOrPerson.length ==0){
                this.$message({
                    message: '请先上传素材',
                    type: 'warning'
                });
                return;
            }
            if(this.ruleForm.fileName==""&&this.sucaiListSeach.commonOrPerson != 'system'){
                this.$message({
                    message: '请先选择类目',
                    type: 'warning'
                });
                return;
            }
            if(this.ruleForm.brandName==""&&this.sucaiListSeach.commonOrPerson != 'system'){
                this.$message({
                    message: '请先选择品牌',
                    type: 'warning'
                });
                return;
            }
            if(this.ruleForm.sceneName==""){
                this.$message({
                    message: '请选择分类',
                    type: 'warning'
                });
                return;
            }
            let form = {
                firstType: this.ruleForm.fileName, //一级类目
                brandName: this.ruleForm.brandName, //品牌
                sortId: this.ruleForm.sceneName, //分类id
                inlet: this.sucaiListSeach.commonOrPerson //入口 common公共 //system系统
            };
            addMaterialLibrary(form,this.fileListUrl)
                .then(response => {
                    if(response.code==0){
                        this.dialogFormVisible = false;
                        this.$message({
                            message: response.msg,
                            type: 'success'
                        });
                        this.indexAxios();
                        this.brandAxios();
                    }
                })
                .catch(() => {

                });
        },
        handleRemove(file) {
            console.log(file);
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        handleDownload(file) {
            console.log(file);
        },
        handleClick() {
            this.sortName = "全部";
            this.sucaiListSeach.materialSortId = 0;
            this.sucaiListSeach.brandId = 0;
            this.sucaiListSeach.folderIds = 0;
            if(this.sucaiListSeach.commonOrPerson == "person"){
                this.folderType = true;
                this.folderIdsAllList("person");
            } else {
                this.folderType = false;
                this.seacchIndexAxios();
            }
        },
        folderIdsAllList(val){
            queryFolder()
                .then(response => {
                    let folderIdsAll = [];
                    response.data.map(item=>{
                        folderIdsAll.push(item.id);
                        item.type = false;
                    });
                    this.folderList = response.data;
                    this.folderIdsAll = folderIdsAll.join(",");
                    this.sucaiListSeach.folderIds = this.folderIdsAll;
                    if(val==="person") {
                        this.seacchIndexAxios();
                    }
                })
                .catch(() => {

                });
        },
        folderRemoveClick(id) {
            this.$confirm("确认删除, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                removeFolder({folderId:id})
                    .then(response => {
                        this.folderIdsAllList();
                    })
                    .catch(() => {

                    });
            }).catch(() => {

            });
        },
        movesucaiClick(item) {
            this.movesucaiForm = true;
            this.movesucaiFormList = item;
        },
        movesucaiAllClick(item) {
            if(this.selectId.length == 0){
                this.$message({
                    message: '请先选择素材',
                    type: 'warning'
                });
                return;
            }
            this.movesucaiForm = true;
            this.movesucaiFormList.id = this.selectId.join(",");
        },
        movesucaiSubmit() {
            let form = {
                materialIds: this.movesucaiFormList.id, //文件夹id（必传）
                folderId: this.movesucaiFormList.folderId //文件夹ID
            };
            move_collect_material(form)
                .then(response => {
                    this.movesucaiForm = false;
                    this.seacchIndexAxios();
                })
                .catch(() => {

                });
        },
        folderClick(id) {
            this.folderList.map(item=>{
                item.type = false;
            });
            let that = this;
            this.clickTimer = true;
            window.setTimeout(function() {
                if(that.clickTimer){
                    that.sucaiListSeach.folderIds = id;
                    that.seacchIndexAxios();
                }
            }, 300);
        },
        upFolderName(items) {
            items.type = true;
            this.clickTimer = null;
        },
        folderChange(items) {
            let form = {
                folderId: items.id,
                folderName: items.folderName
            };
            upFolder(form)
                .then(response => {
                    this.$message({
                        message: '修改成功',
                        type: 'success'
                    });
                    this.folderIdsAllList();
                })
                .catch(() => {

                });
        },
        selectChange(val) {
            if(val.length==1){
                this.searchRightSelect = [this.selectChangeCunchu[0],this.selectChangeCunchu[1]];
                return;
            }
            this.selectChangeCunchu = val;
            if(val[val.length-1]=="material_name"||val[val.length-1]=="file_size"||val[val.length-1]=="create_time"){
                this.searchRightSelect[0] = val[val.length-1];
            } else {
                this.searchRightSelect[1] = val[val.length-1];
            }
            this.searchRightSelect = [this.searchRightSelect[0],this.searchRightSelect[1]];
            this.seacchIndexAxios();
        },
        enterClick() {
            this.seacchIndexAxios();
        },
        showhide() {
            this.$emit("showhide", false);
        }
    }
};
</script>

<style type="text/scss" lang="scss">
.addsucai {
    .el-dialog__body {
        padding: 0 20px;
    }
    .upload-demo {
        display: flex;
    }
    .el-upload {
        width: 360px;
    }
    .el-upload-list {
        flex: 1;
        margin-left: 20px;
        overflow: auto;
        height: 180px;
    }
}
.zhezhao {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    position: fixed;
    left: 0;
    top: 0;
    z-index: 999;
}
#matirialItem {
    .el-image {
        height: auto;
    }
    .image-slot {
        background: #f5f7fa;
        color: #909399;
    }
    font-size: 12px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    width: 80%;
    height: 400px;
    position: absolute;
    top: 75px;
    left: 10%;
    z-index: 999;
    background: #fff;
    border-radius: 4px;
    .el-tabs__nav {
        left: 50%;
        transform: translateX(-50%) !important;
    }
    .el-tabs__item.is-active{
        color: #E51C23;
    }
    .el-tabs__active-bar{
        background-color: #E51C23;
    }
    .el-tabs__item:hover {
        color: #E51C23;
    }
    .el-tabs__header {
        margin: 0px 0 7px;
    }
    .matirial-search {
        padding: 0 10px;
        padding-bottom: 7px;
        border-bottom: 1px solid #E5E7EA;
        .left {
            float: left;
        }
        .right {
            float: right;
            position: relative;
            .el-icon-s-operation {
                font-size: 16px;
                margin: 0 10px;
                cursor: pointer;
            }
            .el-icon-menu {
                font-size: 16px;
                cursor: pointer;
            }
            .searchActive {
                color: #409eff;
            }
            .el-tag.el-tag--info .el-tag__close{
                display: none;
            }
            .el-tag.el-tag--info {
                display: none;
            }
            .selectName {
                position: absolute;
                left: 10px;
                color: #909399;
                font-size: 12px;
                display: inline-block;
                height: 28px;
                line-height: 28px;
                z-index: 9;
            }
            .el-select-dropdown__item{
                font-size: 12px;
                height: 24px;
                line-height: 24px;
            }
            .el-select-group__wrap:not(:last-of-type) {
                padding-bottom: 10px;
            }
            .el-select-group__wrap:not(:last-of-type)::after {
                left: 10px;
                right: 10px;
                bottom: 4.5px;
            }
            .el-select-dropdown__item {
                padding: 0 10px;
            }
            .el-select-group__title {
                padding-left: 10px;
                display: none;
            }
            .el-select-dropdown__list {
                padding: 5px 0;
            }
            .el-select-dropdown.is-multiple .el-select-dropdown__item.selected::after {
                right: 10px;
            }
        }
    }
    .conter {
        border-bottom: 1px solid #E5E7EA;
        .conterLeftActive {
            color: #409eff;
            background: #fff;
        }
        .leftQuanbu:hover {
            background: #EDEDED;
        }
        .conterLeft {
            ul {
                li {
                    height: 35px;
                    line-height: 35px;
                    padding: 0 10px;
                }
            }
            min-height: 150px;
            overflow: auto;
            float: left;
            width: 200px;
            background: #F7F7F7;
            height: 278px;
            border-right: 1px solid #E5E7EA;
            .el-collapse-item__header {
                padding-left: 10px;
                height: 35px;
            }
            .el-collapse-item__header,.el-collapse-item__wrap {
                background: #F7F7F7;
            }
            .left {
                width: 100%;
            }
            .right {

            }
            .el-collapse-item__content {
                ul li {
                    padding-left: 15px;
                }
            }
            ul li {
                display: flex;
                cursor: pointer;
            }
            ul li:hover {
                background: #EDEDED;
            }
            ul .conterLeftActive:hover {
                background-color: #ffffff;
            }
            .el-collapse-item__header {
                border-bottom: 1px solid #E9E9E9;
            }
            .el-collapse-item__content {
                padding-bottom: 0;
            }
        }
        .conterRight {
            float: left;
            width: calc(100% - 200px);
            width: -webkit-calc(100% - 200px);
            width: -moz-calc(100% - 200px);
            min-height: 150px;
            .icontext {
                margin-left: 3px;
                display: inline-block;
            }
            .left {
                float: left;
                height: 30px;
                line-height: 30px;
            }
            .right {
                float: right;
                height: 30px;
                line-height: 30px;
                color: #409eff;
            }
            .iconsize {
                font-size: 14px;
            }
            .el-radio-button {
                margin-right: 10px;
            }
            .el-radio-button:first-child .el-radio-button__inner {
                border: 1px solid #DCDFE6;
                border-radius: 4px;
            }
            .el-radio-button__inner {
                border: 1px solid #DCDFE6;
                border-radius: 4px;
            }
            .el-radio-button__orig-radio:checked+.el-radio-button__inner {
                box-shadow: none;
            }
            .conterRightTop {
                border-bottom: 1px solid #E5E7EA;
                padding: 0 10px;
                padding-bottom: 10px;
            }
            .sucai-list {
                padding: 10px 0;
                padding-bottom: 30px;
                overflow: auto;
                li:hover {
                    background: #F2F2F2;
                }
                li {
                    cursor: pointer;
                    padding: 10px;
                    display: flex;
                    align-items: center;
                    border-bottom: 1px solid #ccc;
                    .el-checkbox__label {
                        display: none;
                    }
                    .sucaiList_1 {
                        position: relative;
                        border: 1px solid #ccc;
                        img {
                            height: 60px;
                            width: auto;
                        }
                        align-items: center;
                        display: flex;
                        width: 60px;
                        height: 60px;
                        text-align: center;
                        margin-right: 20px;
                        .linkUrlClass {
                            width: 100%;
                            height: auto;
                        }
                    }
                    .sucaiList_2 {
                        position: relative;
                        width: 100%;
                        height: 100%;
                        img {
                            height: 100px;
                            width: auto;
                        }
                        align-items: center;
                        display: flex;
                        text-align: center;
                        .linkUrlClass {
                            width: 100%;
                            height: auto;
                        }
                    }
                }
            }
            position: relative;
            .conFooter {
                height: 30px;
                line-height: 30px;
                position: absolute;
                bottom: 0;
                left: 0;
                background: #F7F7F7;
                padding-left: 10px;
                width: 100%;
                display: flex;
                align-items: center;
                border-top: 1px solid #E5E7EA;
                .conFooterLeft {
                    flex: 1;
                }
                .conFooterRight {
                    cursor: pointer;
                    font-size: 13px;
                    padding-right: 10px;
                    .el-icon-edit, .el-icon-star-off {
                        margin-right: 5px;
                    }
                }
            }
        }
    }
    .footer {
        position: absolute;
        right: 20px;
        bottom: 16px;
    }
    .shoucangC {
        color: #E51C23;
    }
    .el-pagination {
        .el-pagination__sizes {
            margin: 0;
            background: #fff;
        }
        .el-input__inner {
            height: 22px;
            line-height: 22px;
            border: none;
        }
        .el-input__icon {
            line-height: 22px;
        }
    }
}
.addshoucangClass {
    .el-dialog__body{
        padding: 0;
    }
    .el-dialog__footer {
        padding: 20px;
    }
}
</style>
