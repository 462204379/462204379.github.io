<template>
    <div class="upTemplate" id="home-upimg">
        <div class="nameImg">
            <div style="display: flex;align-items: center;">
                <i @click="fanhuiClick" class="el-icon-arrow-left" style="margin-left: 20px;cursor: pointer;"></i>
                <div style="margin-left: 10px;height: 20px;line-height: 20px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;width: 200px;">{{username}}-{{width}}X{{height}}</div>
            </div>
            <div style="display: flex;margin: 0 auto;align-items: center;">
                <div class="topList noClick" v-if="getAdminId == $route.query.userId||activeName == 0||activeName == 1||activeName == 2||activeName == 3||activeName == 4" style="margin-left: 0">
                    <el-tooltip content="ctrl + S" placement="top">
                        <div slot="content" style="text-align: center;">快捷键<div style="color: #bebebe">ctrl + S</div></div>
                        <div>
                            <div>
                                <i class="icon iconfont icon-baocun1"></i>
                            </div>
                            <div>保存</div>
                        </div>
                    </el-tooltip>
                </div>
                <div class="topList" v-else @click="okClick(0)">
                    <el-tooltip content="ctrl + S" placement="top">
                        <div slot="content" style="text-align: center;">快捷键<div style="color: #bebebe">ctrl + S</div></div>
                        <div>
                            <div>
                                <i class="icon iconfont icon-baocun1"></i>
                            </div>
                            <div>保存</div>
                        </div>
                    </el-tooltip>
                </div>
                <div class="topList" @click="houtuiClick" v-if="numberIndex < numberIndex_b">
                    <el-tooltip content="ctrl + Z" placement="top">
                        <div slot="content" style="text-align: center;">快捷键<div style="color: #bebebe">ctrl + Z</div></div>
                        <div>
                            <div>
                                <i class="icon iconfont icon-houtui-shi"></i>
                            </div>
                            <div>撤退</div>
                        </div>
                    </el-tooltip>
                </div>
                <div class="topList noClick" v-else>
                    <el-tooltip content="ctrl + Z" placement="top">
                        <div slot="content" style="text-align: center;">快捷键<div style="color: #bebebe">ctrl + Z</div></div>
                        <div>
                            <div>
                                <i class="icon iconfont icon-houtui-shi"></i>
                            </div>
                            <div>撤退</div>
                        </div>
                    </el-tooltip>
                </div>
                <div class="topList" @click="qianjinClick" v-if="numberIndex > 0">
                    <el-tooltip content="ctrl + Y" placement="top">
                        <div slot="content" style="text-align: center;">快捷键<div style="color: #bebebe">ctrl + Y</div></div>
                        <div>
                            <div>
                                <i class="icon iconfont icon-qianjin-shi"></i>
                            </div>
                            <div>前进</div>
                        </div>
                    </el-tooltip>
                </div>
                <div class="topList noClick" v-else>
                    <el-tooltip content="ctrl + Y" placement="top">
                        <div slot="content" style="text-align: center;">快捷键<div style="color: #bebebe">ctrl + Y</div></div>
                        <div>
                            <div>
                                <i class="icon iconfont icon-qianjin-shi"></i>
                            </div>
                            <div>前进</div>
                        </div>
                    </el-tooltip>
                </div>
                <div class="topList">
                    <el-dropdown placement="bottom" size="mini" @command="caozuoClick">
                        <div>
                            <i class="icon iconfont icon-caozuo"></i>
                            <div class="el-dropdown-link" style="font-size: 12px;color: #000;">操作<i class="el-icon-arrow-down el-icon--right"></i>
                            </div>
                        </div>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="3" v-if="thisdata == ''|| thisdata.imageUrl == null||thisAllid.length>0" disabled>裁剪 <span style="margin-left: 10px;">ctrl + X</span></el-dropdown-item>
                            <el-dropdown-item command="3" v-else>裁剪 <span style="margin-left: 10px;color: #8FA0A9">ctrl + X</span></el-dropdown-item>
                            <el-dropdown-item command="4" v-if="thisdata == ''|| thisdata.imageUrl == null||thisAllid.length>0" disabled>智能裁剪 <span style="margin-left: 10px;">shift + X</span></el-dropdown-item>
                            <el-dropdown-item command="4" v-else>智能裁剪 <span style="margin-left: 10px;">shift + X</span></el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
                <div class="topList">
                    <el-dropdown placement="bottom" size="mini" @command="duiqiClick">
                        <div>
                            <i class="icon iconfont icon-duiqi"></i>
                            <div class="el-dropdown-link" style="font-size: 12px;color: #000;">对齐<i class="el-icon-arrow-down el-icon--right"></i>
                        </div>
                        </div>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="1" v-if="thisAllid.length>1">左对齐 <span style="margin-left: 10px;color: #8FA0A9">Ctrl + Alt + L</span></el-dropdown-item>
                            <el-dropdown-item command="1" v-else disabled>左对齐 <span style="margin-left: 10px;">Ctrl + Alt + K</span></el-dropdown-item>
                            <el-dropdown-item command="5" v-if="thisAllid.length>1">水平居中 <span style="margin-left: 10px;color: #8FA0A9">Ctrl + Alt + C</span></el-dropdown-item>
                            <el-dropdown-item command="5" v-else disabled>水平居中 <span style="margin-left: 10px;">Ctrl + Alt + C</span></el-dropdown-item>
                            <el-dropdown-item command="2" v-if="thisAllid.length>1">右对齐 <span style="margin-left: 10px;color: #8FA0A9">Ctrl + Alt + R</span></el-dropdown-item>
                            <el-dropdown-item command="2" v-else disabled>右对齐 <span style="margin-left: 10px;">Ctrl + Alt + R</span></el-dropdown-item>
                            <el-dropdown-item command="3" v-if="thisAllid.length>1">顶对齐 <span style="margin-left: 10px;color: #8FA0A9">Ctrl + Alt + T</span></el-dropdown-item>
                            <el-dropdown-item command="3" v-else disabled>顶对齐 <span style="margin-left: 10px;">Ctrl + Alt + T</span></el-dropdown-item>
                            <el-dropdown-item command="6" v-if="thisAllid.length>1">垂直居中 <span style="margin-left: 10px;color: #8FA0A9">Ctrl + Alt + V</span></el-dropdown-item>
                            <el-dropdown-item command="6" v-else disabled>垂直居中 <span style="margin-left: 10px;">Ctrl + Alt + V</span></el-dropdown-item>
                            <el-dropdown-item command="4" v-if="thisAllid.length>1">底对齐 <span style="margin-left: 10px;color: #8FA0A9">Ctrl + Alt + B</span></el-dropdown-item>
                            <el-dropdown-item command="4" v-else disabled>底对齐 <span style="margin-left: 10px;">Ctrl + Alt + B</span></el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
                <div class="topList" @mousewheel.prevent="rollScale(this)">
                    <el-tooltip content="ctrl + 鼠标滚动" placement="top">
                        <div slot="content" style="text-align: center;">快捷键<div style="color: #bebebe">鼠标悬停此 + 鼠标滚动</div></div>
                        <div>
                            <div style="height: 16.8px;">
                                <i class="el-icon-minus" @click="scale-=0.1"></i>
                                <span @dblclick="scale=1">{{(scale*100).toFixed(0)}}%</span>
                                <i class="el-icon-plus" @click="scale+=0.1"></i>
                            </div>
                            <div @dblclick="scale=1">缩放</div>
                        </div>
                    </el-tooltip>
                </div>
                <div class="topList" @click="daochuClick">
                    <div>
                        <i class="icon iconfont icon-xiazai"></i>
                    </div>
                    <div>下载</div>
                </div>
                <div class="topList" @click="yulanClick">
                    <div>
                        <i class="el-icon-view"></i>
                    </div>
                    <div>预览</div>
                </div>
            </div>
            <div style="display: flex;margin-right: 20px;width: 200px;position: relative;align-items: center;">
                <div class="topList" style="position: absolute;right: 50px;" @click="xqClick">
                    <div style="height: 18px;">
                        <i class="el-icon-user"></i>
                    </div>
                    <div>详情</div>
                </div>
                <div class="topList" @click="leftKeys = !leftKeys" style="position: absolute;right: 0;">
                    <div style="height: 18px;">
                        <i class="icon iconfont icon-jianpan"></i>
                    </div>
                    <div>快捷键</div>
                </div>
            </div>
        </div>
        <div @mousedown="restoreAll" @mousedown.stop="addMoveLine($event)" style="width: 100%;right:100px;position: absolute;height: 100%;;top:120px;overflow: auto;" :style="{'min-height':mainHeight+'px','height':(height+92)+'px'}" v-loading="loading" element-loading-background="initial">
            <div :style="{'transform': 'scale('+scale+')'}" style="position: absolute;top: 0;width: 100%;height: 100%;background: #666671;">
            <div>
                <div class="moveLine-W" :style="{'top':item.top+'px'}" @mousedown.stop="moveLine($event,'W',item,index)" v-for="(item,index) in moveLineDataW" :key="index"></div>
            </div>
            <div>
                <div class="moveLine-H" :style="{'left':item.left+'px'}" @mousedown.stop="moveLine($event,'H',item,index)" v-for="(item,index) in moveLineDataH" :key="index"></div>
            </div>
            <div id="moveCard" :style="{'background':bgurl,'background-color':bgcolor,'width':width+'px','height':height+'px','margin-top':marginTop+'px'}">
                <div v-for="(item, index) in listdata" :key="index">
                    <div v-if="item.imageUrl != null" class="moveDiv" style="position: absolute;height: auto" :style="{'left':item.leftBox+'px','top':item.topBox+'px','width':item.width+'px','opacity':item.opacity/100,'z-index':item.layerId,'transform': 'rotate('+item.totateAngle+'deg)','display':item.display}" @mousedown.stop="move($event,index,item)">
                        <img :src="item.imageUrl" draggable="false" style="width: 100%;height: auto;float: left;" @load="loadImage(index,item)" ref="imgSize">
                        <div v-if="thisdataid==index||thisAllid.indexOf(index+'') != '-1'">
                            <div class="dashedleft"></div>
                            <div class="dashedright"></div>
                            <div class="dashedtop"></div>
                            <div class="dashedbottom"></div>
                        </div>
                        <div v-show="item.itemLineBorder">
                            <div class="dashedleft"></div>
                            <div class="dashedright"></div>
                            <div class="dashedtop"></div>
                            <div class="dashedbottom"></div>
                        </div>
                        <div v-show="item.itemLine">
                            <div class="leftTopLine-H" v-show="leftTopLineH" :style="{'height':height+'px','top':-height+'px'}"></div>
                            <div class="leftBottomLine-H" v-show="leftBottomLineH" :style="{'height':height+'px','bottom':-height+'px'}"></div>
                            <div class="rightTopLine-H" v-show="rightTopLineH" :style="{'height':height+'px','top':-height+'px'}"></div>
                            <div class="rightBottomLine-H" v-show="rightBottomLineH" :style="{'height':height+'px','bottom':-height+'px'}"></div>
                            <div class="leftTopLine-W" v-show="leftTopLineW" :style="{'width':width+'px','left':-width+'px'}"></div>
                            <div class="leftBottomLine-W" v-show="leftBottomLineW" :style="{'width':width+'px','left':-width+'px'}"></div>
                            <div class="rightTopLine-W" v-show="rightTopLineW" :style="{'width':width+'px','right':-width+'px'}"></div>
                            <div class="rightBottomLine-W" v-show="rightBottomLineW" :style="{'width':width+'px','right':-width+'px'}"></div>
                        </div>
                    </div>
                    <div class="moveItem moveDiv textDiv" :data-id="item.layerId" :class="{'bianjistyle':item.bianjistyle}" v-else @mousedown.stop="move($event,index,item)" @dblclick="dbthisclick(index,item)" style="position: absolute" :style="{'left':item.leftBox+'px','top':item.topBox+'px','color':item.fontColor,'opacity':item.opacity/100,'z-index':item.layerId,'display':item.display}" ref="textSize">
                        <span style="white-space: pre;" :class="{'textDirection':item.textDirection!=0,'textB':item.fauxBold,'textI':item.fauxItalic}">
                            <span :class="{'lineHeight13':fontStyleNew13.indexOf(item.fontStyle) != '-1','lineHeight11':fontStyleNew11.indexOf(item.fontStyle) != '-1','lineHeight10':fontStyleNew10.indexOf(item.fontStyle) != '-1','lineHeight085':fontStyleNew085.indexOf(item.fontStyle) != '-1','lineHeight08':fontStyleNew08.indexOf(item.fontStyle) != '-1','lineHeight07':fontStyleNew07.indexOf(item.fontStyle) != '-1'}" style="outline: none;padding: 0 10px;word-wrap: break-word;word-break: normal;display: block;" @focus="guangbiao=true" @blur="guangbiao=false,item.dbtype = false,item.textContent=$event.target.innerText,item.bianjistyle=false" :contenteditable="item.dbtype" :style="{'font-size':item.fontSize+'px','font-family':item.fontStyle,'letter-spacing':item.fontSpacing+'px'}" v-text="item.textContent" @input="numberIndex_b += 1,cunchuData()"></span>
                        </span>
                        <div v-if="thisdataid==index||thisAllid.indexOf(index+'') != '-1'">
                            <div class="dashedleft"></div>
                            <div class="dashedright"></div>
                            <div class="dashedtop"></div>
                            <div class="dashedbottom"></div>
                        </div>
                        <div v-show="item.itemLineBorder">
                            <div class="dashedleft"></div>
                            <div class="dashedright"></div>
                            <div class="dashedtop"></div>
                            <div class="dashedbottom"></div>
                        </div>
                        <div v-show="item.itemLine">
                            <div class="leftTopLine-H" v-show="leftTopLineH" :style="{'height':height+'px','top':-height+'px'}"></div>
                            <div class="leftBottomLine-H" v-show="leftBottomLineH" :style="{'height':height+'px','bottom':-height+'px'}"></div>
                            <div class="rightTopLine-H" v-show="rightTopLineH" :style="{'height':height+'px','top':-height+'px'}"></div>
                            <div class="rightBottomLine-H" v-show="rightBottomLineH" :style="{'height':height+'px','bottom':-height+'px'}"></div>
                            <div class="leftTopLine-W" v-show="leftTopLineW" :style="{'width':width+'px','left':-width+'px'}"></div>
                            <div class="leftBottomLine-W" v-show="leftBottomLineW" :style="{'width':width+'px','left':-width+'px'}"></div>
                            <div class="rightTopLine-W" v-show="rightTopLineW" :style="{'width':width+'px','right':-width+'px'}"></div>
                            <div class="rightBottomLine-W" v-show="rightBottomLineW" :style="{'width':width+'px','right':-width+'px'}"></div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
        <div class="rightForm" :style="{'min-height':mainHeight+'px','height':(height+92)+'px'}" v-if="rightForm_1==true">
            <div v-if="formTitle == '图片编辑'">
                <div style="margin-bottom: 10px;font-size: 16px;color: #000">
                    <div class="formhover" style="float: left;border-bottom: 2px solid #409EFF;">图层编辑</div>
                    <div class="formhover" @click="formTitle='',thisdataid='-1',thisdata=''" style="float: left;margin-left: 10px;">画布尺寸</div>
                    <i class="el-icon-arrow-right" @click="rightForm_1=false" style="position: absolute;right: 10px;top: 10px;cursor: pointer;font-size: 18px;font-weight: bold;color: #000;"></i>
                    <div style="clear: both"></div>
                </div>
                <el-form @change="updataform" ref="formData" :model="formData" label-width="60px" label-position="left" size="mini" style="overflow: auto;" :style="{'height':mainHeight-70+'px'}">
                    <el-form-item label="名称">
                        <el-input v-model="formData.layerName" @focus="guangbiao=true" @blur="guangbiao=false" @change="numberIndex_b += 1,cunchuData()"></el-input>
                    </el-form-item>
                    <el-form-item label="长">
                        <el-input-number v-model="formData.width" @change="loadImage('-1',thisdata),cunchuData(),numberIndex_b += 1" label="长" @focus="guangbiao=true" @blur="guangbiao=false"></el-input-number>
                    </el-form-item>
                    <el-form-item label="宽" disabled>
                        <el-input-number v-model="formData.height" label="宽"></el-input-number>
                    </el-form-item>
                    <el-form-item label="X">
                        <el-input-number v-model="formData.leftBox" label="X轴距离" @focus="guangbiao=true" @blur="guangbiao=false" @change="numberIndex_b += 1,cunchuData()"></el-input-number>
                    </el-form-item>
                    <el-form-item label="Y">
                        <el-input-number v-model="formData.topBox" label="Y轴距离" @focus="guangbiao=true" @blur="guangbiao=false" @change="numberIndex_b += 1,cunchuData()"></el-input-number>
                    </el-form-item>
                    <el-form-item label="旋转">
                        <el-input-number v-model="formData.totateAngle" label="旋转" @focus="guangbiao=true" @blur="guangbiao=false" @change="numberIndex_b += 1,cunchuData()"></el-input-number>
                    </el-form-item>
                    <el-form-item label="不透明">
                        <div style="display: flex">
                            <el-slider v-model="formData.opacity" @change="numberIndex_b += 1,cunchuData()" style="width: 140px;position: relative;bottom: 5px;"></el-slider>
                            <span style="margin-left:10px ">{{formData.opacity}}%</span>
                        </div>
                    </el-form-item>
                    <el-button type="primary" size="mini" style="width: 100%;margin-bottom: 10px;background: #7AB0E6" @click="zhuanhuaImg">替换颜色</el-button>
                    <el-button type="primary" size="mini" style="width: 100%;margin-bottom: 10px;margin-left: 0;" @click="upSucaiku">替换图片-素材库</el-button>
                    <el-upload
                        :action="BASE_URL+'/wow/sys/file/upFile'"
                        list-type="picture"
                        ref="uploadImg"
                        :auto-upload="false"
                        :show-file-list="false"
                        :on-change="imgPreview"
                        :on-success="okuploadimg"
                        :multiple="false"
                        name="file"
                    >
                        <el-button type="primary" size="mini" style="width: 100%;">替换图片-本地</el-button>
                    </el-upload>
                </el-form>
            </div>
            <div v-else-if="formTitle == '文案编辑'">
                <div style="margin-bottom: 10px;font-size: 16px;color: #000">
                    <div class="formhover" style="float: left;border-bottom: 2px solid #409EFF;">图层编辑</div>
                    <div class="formhover" @click="formTitle='',thisdataid='-1',thisdata=''" style="float: left;margin-left: 10px;">画布尺寸</div>
                    <i class="el-icon-arrow-right" @click="rightForm_1=false" style="position: absolute;right: 10px;top: 10px;cursor: pointer;font-size: 18px;font-weight: bold;color: #000;"></i>
                    <div style="clear: both"></div>
                </div>
                <el-form @change="updataform" ref="formData" :model="formData" label-width="60px" label-position="left" size="mini" style="overflow: auto;" :style="{'height':mainHeight-70+'px'}">
                    <el-form-item label="名称">
                        <el-input v-model="formData.layerName" @focus="guangbiao=true" @blur="guangbiao=false" @change="numberIndex_b += 1,cunchuData()"></el-input>
                    </el-form-item>
                    <el-form-item label="文案">
                        <el-input v-model="formData.textContent" @focus="guangbiao=true" @blur="guangbiao=false" @change="numberIndex_b += 1,cunchuData()"></el-input>
                    </el-form-item>
                    <el-form-item label="字风格">
                        <el-cascader
                            :show-all-levels="false"
                            expand-trigger="hover"
                            size="medium"
                            placeholder="未读取到此字体"
                            v-model="formData.fontFamile"
                            :options="fontList"
                            filterable
                            ref="cascaderAddr"
                            popper-class="upPsdImg"
                            @focus="guangbiao=true"
                            @blur="guangbiao=false"
                            @change="fontChange(formData)"
                        >
                            <template slot-scope="{ node, data }">
                                <span>{{ data.label }}</span>
                                <span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
                            </template>
                        </el-cascader>
                    </el-form-item>
                    <el-form-item label="颜色">
                        <div @click="guangbiao=true">
                            <el-color-picker v-model="formData.fontColor" :predefine="predefineColors" color-format="rgb" @change="numberIndex_b += 1,that.cunchuData()"></el-color-picker>
                        </div>
                    </el-form-item>
                    <el-form-item label="字大小">
                        <el-input-number v-model="formData.fontSize" :min="10" :max="150" label="字大小" @focus="guangbiao=true" @blur="guangbiao=false" @change="numberIndex_b += 1,cunchuData()"></el-input-number>
                    </el-form-item>
                    <el-form-item label="字间距">
                        <el-input-number v-model="formData.fontSpacing" :min="-10" :max="10" label="字间距" @focus="guangbiao=true" @blur="guangbiao=false" @change="numberIndex_b += 1,cunchuData()"></el-input-number>
                    </el-form-item>
                    <el-form-item label="X">
                        <el-input-number v-model="formData.leftBox" label="X轴距离" @focus="guangbiao=true" @blur="guangbiao=false" @change="numberIndex_b += 1,cunchuData()"></el-input-number>
                    </el-form-item>
                    <el-form-item label="Y">
                        <el-input-number v-model="formData.topBox" label="Y轴距离" @focus="guangbiao=true" @blur="guangbiao=false" @change="numberIndex_b += 1,cunchuData()"></el-input-number>
                    </el-form-item>
                    <div style="margin-bottom: 10px;">
                        <div class="typeBtn" @click="textDirectionClick(formData)" style="margin: 0" :class="{'typeBtntrue':formData.textDirection==2}">A</div>
                        <div class="typeBtn" @click="formData.fauxBold = !formData.fauxBold" :class="{'typeBtntrue':formData.fauxBold}">B</div>
                        <div class="typeBtn" style="font-style: italic;" @click="formData.fauxItalic = !formData.fauxItalic" :class="{'typeBtntrue':formData.fauxItalic}">I</div>
                        <div style="clear: both"></div>
                    </div>
                    <el-form-item label="不透明">
                        <div style="display: flex">
                            <el-slider v-model="formData.opacity" style="width: 140px;position: relative;bottom: 5px;" @change="numberIndex_b += 1,cunchuData()"></el-slider>
                            <span style="margin-left:10px ">{{formData.opacity}}%</span>
                        </div>
                    </el-form-item>
                </el-form>
            </div>
            <div v-else>
                <div style="margin-bottom: 10px;font-size: 16px;color: #000">
                    <div>画布尺寸</div>
                    <i class="el-icon-arrow-right" @click="rightForm_1=false" style="position: absolute;right: 10px;top: 10px;cursor: pointer;font-size: 18px;font-weight: bold;color: #000;"></i>
                    <div style="clear: both"></div>
                </div>
                <el-form label-width="80px" label-position="left" size="mini">
                    <el-form-item label="长">
                        <span>{{width}}</span>
                    </el-form-item>
                    <el-form-item label="宽">
                        <span>{{height}}</span>
                    </el-form-item>
                    <el-form-item label="背景颜色">
                        <div @click="guangbiao=true">
                            <el-color-picker v-model="bgcolor" :predefine="predefineColors" color-format="rgb"></el-color-picker>
                        </div>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="rightForm" style="width: 50px;text-align: center;" :style="{'min-height':mainHeight+'px','height':(height+92)+'px'}" v-else>
            <i class="el-icon-arrow-left" @click="rightForm_1=true" style="cursor: pointer;font-size: 18px;font-weight: bold;"></i>
            <div style="font-size: 16px;padding: 5px 5px;">编辑</div>
        </div>
        <transition name="el-zoom-in-top">
            <div class="rightForm rightForm_2" :style="{'min-height':mainHeight+'px','height':(height+92)+'px'}" :class="{rightForm_2_right:rightForm_1==false}" v-if="rightForm_2">
                <div style="font-size: 16px;padding: 5px 5px;">图层元素</div>
                <i class="el-icon-arrow-right" @click="rightForm_2=false" style="position: absolute;right: 10px;top: 10px;cursor: pointer;font-size: 18px;font-weight: bold;"></i>
                <draggable class="list-group" :list="listdata" group="people" @update="updatapaixu" :options = "{animation:500}">
                    <div v-for="(item, index) in listdata" :key="index" class="leftList drag-item" :class="{'active':item.active}" @click="thisclick(index,item)">
                        <div style="display: flex;align-items: center;" :class="{'errorColor': errorColorList.indexOf(item.layerName.split('-')[0]) == -1}">
                            <i style="margin-right: 5px;font-size: 14px;" v-if="item.layerName.split('-')[0]=='额外'" class="icon iconfont icon-tupian"></i>
                            <i style="margin-right: 5px;margin-top: 2px;margin-left: 2px;" v-else-if="item.layerName.split('-')[0]=='背景'" class="el-icon-camera"></i>
                            <i style="margin-right: 5px;margin-top: 2px;" v-else-if="item.layerName.split('-')[0]=='logo'" class="icon iconfont icon-Ggooglelogo"></i>
                            <i style="margin-right: 5px;margin-top: 2px;;font-size: 18px;" v-else-if="item.layerName.split('-')[0]=='产品图'" class="icon iconfont icon-chanpin"></i>
                            <i style="margin-right: 5px;margin-top: 2px;" v-else-if="item.layerName.split('-')[0]=='价格'" class="icon iconfont icon-jiage"></i>
                            <i style="margin-right: 5px;margin-top: 2px;font-size: 14px;" v-else class="icon iconfont icon-wenanbiaoti"></i>
                            <div style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;max-width: 140px;">
                                {{item.layerName}}
                            </div>
                            <div style="position: absolute;right: 20px;">
                                <span style="position: relative" v-if="item.display=='none'" @click="item.display = 'block'">
                                    <span style="position: absolute;left: 5px;">/</span>
                                    <i class="el-icon-view" style="margin-right: 5px;"></i>
                                </span>
                                <i class="el-icon-view" style="margin-right: 5px" v-else @click="item.display = 'none'"></i>
                                <i class="el-icon-lock" v-if="item.suoding" @click="item.suoding = !item.suoding"></i>
                                <i class="el-icon-unlock" v-else @click="item.suoding = !item.suoding"></i>
                            </div>
                        </div>
                    </div>
                </draggable>
            </div>
            <div class="rightForm rightForm_2" style="width: 50px;text-align: center;" :class="{rightForm_2_right:rightForm_1==false}" :style="{'min-height':mainHeight+'px','height':(height+92)+'px'}" v-else>
                <i class="el-icon-arrow-left" @click="rightForm_2=true" style="cursor: pointer;font-size: 18px;font-weight: bold;"></i>
                <div style="font-size: 16px;padding: 5px 5px;">图层元素</div>
            </div>
        </transition>
        <transition name="el-zoom-in-top">
            <div class="leftForm" :style="{'height':mainHeight+'px'}" v-if="leftKeys">
                <div style="font-size: 16px;padding: 5px 5px;">快捷键使用详情</div>
                <i class="el-icon-close" @click="leftKeys=false" style="position: absolute;right: 5px;top: 5px;cursor: pointer;"></i>
                <div v-for="(item, index) in keysList" :key="index">
                    <div class="leftListKeys" style="font-size: 18px;">{{item.title}}</div>
                    <div v-for="(items, index) in item.data" :key="index" class="leftListKeys">
                        <div>{{items.name}}</div>
                        <div style="display: flex;align-items: center;position: absolute;right: 5px">
                            <div v-for="(itemss, index) in items.val" :key="index">
                                <div style="margin-left: 5px" v-if="index%2">{{itemss}}</div>
                                <div style="background: #EDEDED;padding: 3px 6px;margin-left: 5px" v-else>{{itemss}}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <transition name="el-zoom-in-top">
            <div style="width: 800px;height: 400px;margin: 0 auto;top:20px;z-index: 99999;position: relative;" v-if="caijian">
                <vueCropper
                    ref="cropper"
                    :img="option.img"
                    :outputSize="option.size"
                    :outputType="option.outputType"
                    :info="true"
                    :full="option.full"
                    :canMove="option.canMove"
                    :canMoveBox="option.canMoveBox"
                    :fixedBox="option.fixedBox"
                    :original="option.original"
                    :autoCrop="option.autoCrop"
                    :centerBox="option.centerBox"
                    :high="option.high"
                    :infoTrue="option.infoTrue"
                    :enlarge="option.enlarge"
                ></vueCropper>
                <div style="position: absolute;right: 10px;bottom: 10px;font-size: 24px;background: #fff;-webkit-box-shadow: 0 0 10px #cecece;box-shadow: 0 0 10px #cecece;cursor: pointer;padding: 3px;">
                    <div class="caijian_yn">
                        <i style="color: #67C23A" class="el-icon-check" @click="jietuClick"></i>
                    </div>
                    <div class="caijian_yn">
                        <i style="color: #F56C6C" class="el-icon-close" @click="caijian=false,okSubmit = true"></i>
                    </div>
                </div>
            </div>
        </transition>
        <el-dialog
            :visible.sync="dialogVisible"
        >
            <div class="pictureHome-beizhu-top">
                <span class="pictureHome-beizhu-title">模板详情</span>
                <span>--{{ formDataXq.labelName }}</span>
                <span> - {{ formDataXq.sceneName }} - </span>
                <time class="time"> {{ formDataXq.createTime|replaceDate_1 }}</time>
            </div>
            <div style="display: flex;align-items: center;">
                <div class="pictureHome-beizhu-li">
                    <div class="pictureHome-beizhu-img"><img src="../../../assets/image/pictureHome-1.png"></div>
                    <div class="text-slh">上传者:{{formDataXq.username}}</div>
                </div>
                <div class="pictureHome-beizhu-li">
                    <div class="pictureHome-beizhu-img"><img src="../../../assets/image/pictureHome-2.png"></div>
                    <div class="text-slh">{{ formDataXq.createTime|replaceDate_2 }}</div>
                </div>
                <div class="pictureHome-beizhu-li">
                    <div class="pictureHome-beizhu-img"><img src="../../../assets/image/pictureHome-3.png"></div>
                    <div class="text-slh">{{ formDataXq.width }} x {{ formDataXq.height }}</div>
                </div>
                <div class="pictureHome-beizhu-li">
                    <div class="pictureHome-beizhu-img"><img style="padding: 5px;" src="../../../assets/image/pictureHome-4.png"></div>
                    <div class="text-slh">{{formDataXq.widthType|widthType}}</div>
                </div>
            </div>
            <div style="display: flex;margin-top: 20px">
                <div class="pictureHome-beizhu-li">
                    <div class="pictureHome-beizhu-img"><span>Brand</span></div>
                    <div class="text-slh" v-show="submitUp=='1'">
                        <el-select @change="upfileBrandChange" v-model="formDataXq.firstType" placeholder="请选择" size="mini" filterable allow-create default-first-option >
                            <el-option
                                v-for="item in searchDiv_3_0_list"
                                :key="item.value"
                                :label="item.text"
                                :value="item.text">
                            </el-option>
                        </el-select>
                        <br>
                        <el-select v-model="formDataXq.brandName" placeholder="请选择" size="mini" filterable allow-create default-first-option style="margin-top: 5px">
                            <el-option
                                v-for="item in upbrandNameList"
                                :key="item.id"
                                :label="item.brandName"
                                :value="item.brandName">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="text-slh" v-show="submitUp==0">{{formDataXq.brandName}}</div>
                </div>
                <div class="pictureHome-beizhu-li">
                    <div class="pictureHome-beizhu-img"><img style="padding: 5px;" src="../../../assets/image/pictureHome-6.png"></div>
                    <div class="text-slh" v-show="submitUp=='0'">{{formDataXq.sceneDate}}月</div>
                    <div class="text-slh" v-show="submitUp=='1'">
                        <el-select v-model="formDataXq.sceneDate" placeholder="请选择" size="mini">
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
                    </div>
                </div>
                <div class="pictureHome-beizhu-li">
                    <div class="pictureHome-beizhu-img"><img src="../../../assets/image/pictureHome-7.png"></div>
                    <div class="text-slh" v-show="submitUp=='1'">
                        <el-select v-model="formDataXq.labelName" placeholder="请选择" size="mini" filterable allow-create default-first-option >
                            <el-option
                                v-for="item in searchDiv_4_list"
                                :key="item.value"
                                :label="item.text"
                                :value="item.text">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="text-slh" v-show="submitUp=='0'">{{formDataXq.labelName}}</div>
                </div>
                <div class="pictureHome-beizhu-li">
                    <div class="pictureHome-beizhu-img"><img src="../../../assets/image/pictureHome-8.png"></div>
                    <div class="text-slh" v-show="submitUp=='1'">
                        <el-select v-model="formDataXq.sceneName" placeholder="请选择" size="mini" filterable allow-create default-first-option >
                            <el-option
                                v-for="item in searchDiv_3_list"
                                :key="item.value"
                                :label="item.text"
                                :value="item.text">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="text-slh" v-show="submitUp=='0'">{{formDataXq.sceneName}}</div>
                </div>
            </div>
            <div style="margin: 0 12.5%;margin-top: 50px;position: relative;margin-right: 8%;">
                <div style="position: absolute;left: -30px;z-index: 9;top: -30px;" class="pictureHome-beizhu-img"><img src="../../../assets/image/pictureHome-9.png"></div>
                <el-input
                    type="textarea"
                    :autosize="{ minRows: 4, maxRows: 8}"
                    placeholder="暂无备注"
                    v-model="formDataXq.remark"
                    maxlength="100"
                    show-word-limit
                    :disabled="submitUp=='0'"
                >
                </el-input>
            </div>
            <span slot="footer" class="dialog-footer" v-if="getAdminId == $route.query.userId">
                    <el-button type="primary" @click="okFormSubmit" size="mini" v-show="submitUp=='1'">确认</el-button>
                    <el-button type="primary" @click="submitUp = true" size="mini"  v-show="submitUp=='0'">编辑</el-button>
                </span>
        </el-dialog>
        <div style="text-align: center;position: fixed;bottom: 20px;width: 100%;right: 100px;" v-if="loading==false" v-show="okSubmit">
            <el-button type="primary" size="mini" @click="fanhuiClick">取消修改</el-button>
            <el-button type="primary" size="mini" @click="okClick">保存修改</el-button>
        </div>
        <el-dialog :visible.sync="UpDataVisible" custom-class="UpDataVisible" top="35vh">
            <ul>
                <li class="title">插入图片</li>
                <li @click="addSucaiku"><i class="el-icon-picture"></i>从素材库<span class="liulan">浏览<i class="el-icon-caret-right"></i></span></li>
                <el-upload
                    :action="BASE_URL+'/wow/sys/file/upFile'"
                    list-type="picture"
                    ref="adduploadImg1"
                    :auto-upload="false"
                    :show-file-list="false"
                    :on-change="addimgPreview1"
                    :on-success="addokuploadimg"
                    :multiple="false"
                    name="file"
                >
                    <li><i class="el-icon-upload"></i>从本地<span class="liulan">浏览<i class="el-icon-caret-right"></i></span></li>
                </el-upload>
            </ul>
        </el-dialog>
        <el-dialog width="400px" title="选择颜色" :visible.sync="zhuanhuaImgForm" :append-to-body="true" :close-on-click-modal="false">
            <el-form>
                <el-form-item label="颜色">
                    <div @click="guangbiao=true">
                        <el-color-picker v-model="zhuanhuaImgColor" :predefine="predefineColors" color-format="rgb"></el-color-picker>
                    </div>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="zhuanhuaImgForm=false" size="mini">取消</el-button>
                <el-button type="primary" @click="zhuanhuaImgSubmit" size="mini">确认</el-button>
            </div>
        </el-dialog>
        <el-collapse-transition>
            <matirialItem :matiriaVal="matiriaVal" @showhide="matiriaVisible=false" @enterClick="enterClick" v-show="matiriaVisible" ref="baseInfo"></matirialItem>
        </el-collapse-transition>
        <el-dialog :width="width+'px'" drag title="图片预览" :visible.sync="yulanType" :append-to-body="true" :close-on-click-modal="false" custom-class="yulanClass">
            <el-image :src="yulanUrl" style="width: 100%;height: auto;">
                <div slot="placeholder" class="image-slot" style="height: 100px;text-align: center;line-height: 100px;">
                    加载中...
                </div>
                <div slot="error" class="image-slot" style="height: 100px;text-align: center;line-height: 100px;">
                    加载中...
                </div>
            </el-image>
        </el-dialog>
    </div>
</template>

<script>
import { BASE_URL } from "../../../config/app";
import $ from "jquery";
import draggable from "vuedraggable";
import { VueCropper }  from 'vue-cropper'
import matirialItem from "../items/matirialItem.vue";
import {
    images_upload,
    download_model,//下载图片
    save_modify_record,//储存记录
    query_modify_record,//提取记录
    resizeImage,//智能裁剪
    remark_query,
    constQuery,
    remark_modify,
    renderingIntentImage //转化图片文字颜色
} from "../../../api/picturePs/home";
import {
    queryBrand,
} from "../../../api/auth/picturePs";
import {
    queryPhotoItemList
} from "../../../api/picturePs/items";
import {
    getRandomString,
    replaceDate_1,
    replaceDate_2,
    newDate
} from "../../../utils/public";
import {
    blob_base64
} from "../../../utils/image";
import {
    fontStyleData,
    fontStyleNew13,
    fontStyleNew11,
    fontStyleNew10,
    fontStyleNew08,
    fontStyleNew085,
    fontStyleNew07
} from "../../../utils/fontStyle";
import { getAdminId } from "../../../utils/auth";
export default {
    name: "upImgItem",
    props: ["upImgVal"],
    data() {
        return {
            yulanType: false,
            yulanUrl: "",
            errorColorList: ["logo", "产品图", "背景", "价格", "额外", "文案"],
            zhuanhuaImgForm: false,
            zhuanhuaImgColor: "",
            upbrandNameList: [],
            matiriaType: "",
            fontStyleNew13: fontStyleNew13(),
            fontStyleNew11: fontStyleNew11(),
            fontStyleNew10: fontStyleNew10(),
            fontStyleNew085: fontStyleNew085(),
            fontStyleNew08: fontStyleNew08(),
            fontStyleNew07: fontStyleNew07(),
            matiriaVisible: false,
            UpDataVisible: false,
            matiriaVal: {
                imgLength: false,
                mainHeight: "",
                conterHeight: ""
            },
            moveLineDataW: [],
            moveLineDataH: [],
            okSubmit: true,
            leftTopLineH: false,
            leftBottomLineH: false,
            rightTopLineH: false,
            rightBottomLineH: false,
            leftTopLineW: false,
            leftBottomLineW: false,
            rightTopLineW: false,
            rightBottomLineW: false,
            recordId: 0, //存储当前ID
            keydown: true,
            modelId: this.upImgVal.modelId,
            BASE_URL: BASE_URL,
            caijian: false,
            guangbiao: false,
            getAdminId: getAdminId(),
            numberIndex: 0,
            numberIndex_b: 0,
            batch: newDate() + getRandomString(5, "0123456789"),
            marginTop: 20,
            username: this.upImgVal.username,
            activeName: this.upImgVal.activeName,
            loading: true,
            rightForm_1: true,
            rightForm_2: false,
            scale: 1,
            bgurl: "",
            mainHeight: "",
            width: Number(this.upImgVal.width),
            height: Number(this.upImgVal.height),
            bgcolor: "#fff",
            rightTable: false,
            addtextVal: {
                rightBox: "",
                layerName: "请输入名称",
                bottomBox: "",
                reateTime: "",
                fauxBold: false,
                imageUrl: null,
                textContent: "请输入文本",
                leftBox: "10",
                topBox: "10",
                fontColor: "#000",
                id: "",
                modelId: "",
                fontSize: "20",
                fontSpacing: 0,
                opacity: 100,
                fontStyle: "",
                fontFamile: ["", ""],
                layerId: 1000,
                width: "",
                height: "",
                textDirection: 0,
                display: 'block',
                suoding: false,
                active: true
            },
            addimgVal: {
                modelId: "",
                layerName: "请输入名称",
                imageUrl: "",
                text: "",
                fauxItalic: false,
                fontColor: null,
                fontSpacing: 0,
                fontStyle: null,
                leftBox: "10",
                topBox: "10",
                color: "",
                fontSize: "",
                width: "200",
                height: "",
                opacity: 100,
                layerId: 1000,
                display: 'block',
                suoding: false,
                rightBox: "",
                textContent: null,
                textDirection: 0,
                totateAngle: 0,
                id: "",
                bottomBox: "",
                createTime: "",
                fauxBold: "",
                layerType: 1,
                active: true
            },
            listdata: [],
            thisdata: "",
            thisdataid: "-1",
            formTitle: "",
            formData: "",
            bgfileList: [],
            predefineColors: [
                '#ff4500',
                '#ff8c00',
                '#ffd700',
                '#90ee90',
                '#00ced1',
                '#1e90ff',
                '#c71585',
            ],
            leftCommand: false,
            thisAllid: [],
            duoType: false,
            leftKeys: false,
            fontList: fontStyleData(),
            keysList: [
                {
                    title: "缩放类",
                    data: [
                        {
                            name: "字体/图片 变大",
                            val: ["shift", "+", "+"]
                        },
                        {
                            name: "字体图片 变小",
                            val: ["shift", "+", "-"]
                        }
                    ]
                },
                {
                    title: "移动类",
                    data: [
                        {
                            name: "移动",
                            val: ["上下左右"]
                        },
                        {
                            name: "快速移动",
                            val: ["shift", "+", "上下左右"]
                        },
                    ]
                },
                {
                    title: "操作类",
                    data: [
                        {
                            name: "裁剪",
                            val: ["ctrl", "+", "X"]
                        },
                        {
                            name: "智能裁剪",
                            val: ["shift","+",  "X"]
                        },
                        {
                            name: "保存",
                            val: ["ctrl", "+", "S"]
                        },
                        {
                            name: "撤退",
                            val: ["ctrl", "+", "Z"]
                        },
                        {
                            name: "前进",
                            val: ["ctrl", "+", "Y"]
                        },
                        {
                            name: "多选",
                            val: ["ctrl", "+", "鼠标单击"]
                        },
                        /*{
                            name: "全选",
                            val: ["ctrl", "+", "A"]
                        },*/
                        {
                            name: "选择组内元素",
                            val: ["ctrl", "+", "单击"]
                        }
                    ]
                },
                {
                    title: "组件操作",
                    data: [
                        {
                            name: "隐藏",
                            val: ["ctrl", "+", "shift" ,"+", "H"]
                        },
                        {
                            name: "锁定",
                            val: ["ctrl", "+", "shift", "+", "L"]
                        },
                        {
                            name: "文字编辑",
                            val: ["双击后单击"]
                        },
                        {
                            name: "退出编辑",
                            val: ["任意单击"]
                        },
                    ]
                },
                {
                    title: "对齐类",
                    data: [
                        {
                            name: "左对齐",
                            val: ["Ctrl", "+", "Alt" + "K"]
                        },
                        {
                            name: "水平对齐",
                            val: ["Ctrl", "+", "Alt" + "C"]
                        },
                        {
                            name: "右对齐",
                            val: ["Ctrl", "+", "Alt" + "R"]
                        },
                        {
                            name: "顶对齐",
                            val: ["Ctrl", "+", "Alt" + "T"]
                        },
                        {
                            name: "垂直对齐",
                            val: ["Ctrl", "+", "Alt" + "V"]
                        },
                        {
                            name: "底对齐",
                            val: ["Ctrl", "+", "Alt" + "B"]
                        }
                    ]
                }
            ],
            option: {
                img: "",
                size: 1,
                outputType: "png",
                full: false,
                canMove: true,
                canMoveBox: true,
                fixedBox: false,
                original: false,
                autoCrop: true,
                centerBox: true,
                high: true,
                infoTrue: true,//框框大小或原始图片大小
                enlarge: 1
            },
            dialogVisible: false,
            formDataXq: "",
            submitUp: "0",
            searchDiv_3_0_list: "",
            searchDiv_3_list: "",
            searchDiv_4_list: ""
        };
    },
    filters: {
        widthType(type) {
            let typevalue = "";
            if (type == 1){
                typevalue = "方正图";
            } else if (type == 2) {
                typevalue = "宽图";
            } else if (type == 3) {
                typevalue = "窄图";
            } else {
                typevalue = "超宽图";
            }
            return typevalue;
        },
        replaceDate_1: replaceDate_1,
        replaceDate_2: replaceDate_2
    },
    components: {
        draggable,
        VueCropper,
        matirialItem//素材库
    },
    created() {
        this.indexAxios();
    },
    methods: {
        zhuanhuaImg() {
            this.zhuanhuaImgForm = true;
        },
        zhuanhuaImgSubmit() {
            if(!this.zhuanhuaImgColor){
                this.$message.error('请选择图片字体颜色!');
                return;
            }
            let form = {
                imagePath: this.listdata[this.thisdataid].imageUrl,
                rgb: this.zhuanhuaImgColor.split("rgb")[1].split("(")[1].split(")")[0]
            };
            renderingIntentImage(form)
                .then(response => {
                    if(response.code==0){
                        this.zhuanhuaImgForm = false;
                        this.$message({
                            message: response.msg,
                            type: 'success'
                        });
                        this.listdata[this.thisdataid].imageUrl = response.data;
                    }
                })
                .catch(() => {

                });
        },
        addSucaiku() {
            this.matiriaVisible=true;
            this.UpDataVisible=false;
            this.matiriaType='add';
            this.$refs.baseInfo.indexAxios();
            this.$refs.baseInfo.brandAxios();
            this.$refs.baseInfo.querySortList();
        },
        upSucaiku() {
            this.addimgVal.layerName='';
            this.matiriaVisible=true;
            this.matiriaType='up';
            this.$refs.baseInfo.indexAxios();
            this.$refs.baseInfo.brandAxios();
            this.$refs.baseInfo.querySortList();
        },
        upfileBrandChange (val){
            this.upbrandNameList = [];
            this.formDataXq.brandName = "";
            let subType = false;
            let brandId = "";
            this.searchDiv_3_0_list.map((item)=>{
                if(item.text==val){
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
        chushiBrand(id) {
            queryBrand(id)
                .then(response => {
                    this.upbrandNameList = response.data;
                })
                .catch(() => {

                });
        },
        enterClick(val) {
            this.matiriaVisible = false;
            if (this.matiriaType == "up") {
                if (this.listdata[this.thisdataid].layerName.indexOf("产品图") != -1) {
                    this.listdata[this.thisdataid].layerName = "产品图-" + val.name;
                }
                this.listdata[this.thisdataid].imageUrl = val.url;
                this.numberIndex_b += 1;
                this.cunchuData();
                return;
            }
            var addImg = JSON.stringify(this.addimgVal);
            addImg = JSON.parse(addImg);
            if (addImg.layerName.indexOf("产品图") != -1) {
                addImg.layerName = "产品图-" + val.name;
            }
            addImg.imageUrl = val.url;
            let number = [];
            this.listdata.map(item =>{
                item.active = false;
                number.push(item.layerId);
            });
            addImg.layerId = Number(Math.max(...number)) + 1;
            this.listdata.unshift(addImg);
            this.thisdataid = 0;
            this.formData = addImg;
            this.formTitle = "图片编辑";
            this.thisAllid = [];
            this.numberIndex_b += 1;
            this.cunchuData();
        },
        okFormSubmit (){
            let form = {
                modelId: this.formDataXq.modelId,
                sceneName: this.formDataXq.sceneName,//场景id
                labelName: this.formDataXq.labelName,//标签id
                brandName: this.formDataXq.brandName,//品牌ID
                firstType: this.formDataXq.firstType,//文件名
                remark: this.formDataXq.remark,//备注
                sceneDate: this.formDataXq.sceneDate//场景时间
            }
            remark_modify(form)
                .then(response => {
                    if (response.code) {
                        return false;
                    } else {
                        this.$message({
                            type: 'success',
                            message: '修改成功!'
                        });
                        this.indexAxios();
                        this.dialogVisible = false;
                    }
                })
                .catch(() => {});
        },
        xqClick (){
            this.searchAxios();
            this.submitUp = "0";
            remark_query({modelId :this.modelId})
                .then(response => {
                    if (response.code) {
                        return false;
                    } else {
                        this.formDataXq = response.data;
                        this.formDataXq.sceneDate = this.formDataXq.sceneDate+"";
                        this.dialogVisible = true;
                        this.chushiBrand(response.data.firstTypeId);
                    }
                })
                .catch(() => {});
        },
        searchAxios() {
            constQuery()
                .then(response => {
                    let datalist3 = [];
                    let datalist4 = [];
                    let datalist0 = [];
                    response.data.scenes.map((item)=>{
                        datalist3.push({
                            text: item.sceneName,
                            id: item.sceneName,
                            Id: item.id,
                            type: false
                        });
                    });
                    response.data.labels.map((item)=>{
                        datalist4.push({
                            text: item.labelName,
                            id: item.id,
                            type: false
                        });
                    });
                    response.data.brands.map((item)=>{
                        datalist0.push({
                            text: item.brandName,
                            id: item.id,
                            type: false
                        });
                    });
                    this.searchDiv_3_0_list = datalist0;
                    this.searchDiv_3_list = datalist3;
                    this.searchDiv_4_list = datalist4;
                })
                .catch(() => {

                });
        },
        addMoveLine (e){
            let that = this;
            let topBox = e.clientY;
            let leftBox = e.clientX;
            let top = e.layerY;
            let left = e.layerX;
            document.onmouseup = (e) => {
                if(e.clientX - leftBox > 100 || leftBox-e.clientX > 100){
                    that.moveLineDataW.push({
                        top:top,
                        lett:0
                    })
                }
                if(e.clientY - topBox > 200 || topBox-e.clientY > 100){
                    that.moveLineDataH.push({
                        top:0,
                        left:left
                    })
                }
                document.onmouseup = null;
            }
        },
        moveLine (e,type,data,index){
            let that = this;
            let topBox = e.clientY/that.scale - data.top;//单选使用选算法
            let leftBox = e.clientX/that.scale - data.left;//单选使用选算法
            document.onmousemove = (e)=>{
                if(type == "W"){
                    data.top = e.clientY/that.scale - topBox;
                } else {
                    data.left = e.clientX/that.scale - leftBox;
                }
            }
            document.onmouseup = () => {
                if (data.left < 170) {
                    that.moveLineDataH.splice(index,1)
                }
                if (data.top < 0) {
                    that.moveLineDataW.splice(index,1)
                }
                document.onmousemove = null;
                document.onmouseup = null;
            }
        },
        restoreAll (){
            this.thisAllid = [];
            this.formTitle = "";
            this.thisdataid = "-1";
            this.thisdata = "";
            this.listdata.map(item => {
                item.active = false;
            });
        },
        fanhuiClick (){
            this.$confirm('是否返回，返回后系统可能不会保存您所做的更改?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$router.push({ path: this.upImgVal.toUrl,query: JSON.parse(this.upImgVal.worksQuery)});
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消'
                });
            });
        },
        rollScale (){
            if (event.wheelDelta > 0){
                this.scale += 0.1;
            } else {
                this.scale -= 0.1;
            }
        },
        rollScaleAll (){
            if(this.duoType === true){
                if (event.wheelDelta > 0){
                    this.scale += 0.1;
                } else {
                    this.scale -= 0.1;
                }
            }
        },
        jietuClick() {
            this.okSubmit = true;
            this.$refs.cropper.startCrop();
            // 获取截图的blob数据
            this.$refs.cropper.getCropBlob((data) => {
                let form = data;
                images_upload(form)
                .then(response => {
                    this.thisdata.imageUrl = response.data.url;
                    this.caijian = false;
                })
                .catch(() => {
                });
            })
        },
        fontChange(data){
            data.fontStyle = data.fontFamile[1];
            this.numberIndex_b += 1;
            this.cunchuData();
        },
        indexAxios() {
            let form = {
                photoId: this.modelId
            };
            this.addtextVal.modelId = this.modelId;
            this.addimgVal.modelId = this.modelId;
            queryPhotoItemList(form)
                .then(response => {
                    let fonttishi = true;
                    let itemlist = [];
                    this.moveLineDataW = [];
                    this.moveLineDataH = [];
                    this.loading = false;
                    function newSort(x,y){
                        return x.layerId - y.layerId;
                    }
                    itemlist = response.data.sort(newSort);
                    itemlist.map((item, index)=> {
                        item.itemLine = false;
                        item.opacity = item.opacity * 100;
                        item.dbtype = false;
                        item.display = "block";
                        item.suoding = false;
                        item.layerId = index;
                        item.totateAngle = 0;
                        if(item.layerName.split("-")[0] == "背景"){
                            item.suoding = true;
                        }
                        if (item.imageUrl == null){
                            item.fontFamile =["",item.fontStyle];
                            item.leftBox -= 10;
                            this.fontList.map(items=>{
                                items.children.map(itemss=>{
                                    if(itemss.value == item.fontStyle){
                                        item.fontFamile = [items.value,itemss.value];
                                    }
                                })
                            });
                            if(item.fontFamile[0] == ""){
                                fonttishi = false;
                            }
                        };
                    });
                    if(fonttishi == false){
                        this.$message({
                            type: 'info',
                            message: '未检测到字体，请在右侧栏选择字体'
                        });
                    }
                    this.listdata = itemlist.reverse();
                    this.cunchuData();
                })
                .catch(() => {

                });
        },
        houtuiClick(){
            this.numberIndex += 1;
            let formData = {
                number: this.numberIndex,
                batch: this.batch,
                modelId: this.modelId
            };
            query_modify_record(formData)
                .then(response => {
                    this.recordId = response.data.id;
                    this.listdata = JSON.parse(response.data.content);
                    if(this.id != "-1"){
                        this.formData = this.listdata[this.thisdataid];
                    }
                })
                .catch(() => {});
        },
        qianjinClick() {
            this.numberIndex -= 1;
            let formData = {
                number: this.numberIndex,
                batch: this.batch,
                modelId: this.modelId
            };
            query_modify_record(formData)
                .then(response => {
                    this.recordId = response.data.id;
                    this.listdata = JSON.parse(response.data.content);
                    if(this.id != "-1"){
                        this.formData = this.listdata[this.thisdataid];
                    }
                })
                .catch(() => {});
        },
        cunchuData() {
            let formData = {
                recordId:this.recordId,
                batch: this.batch,
                modelId: this.modelId,
                content: JSON.stringify(this.listdata)
            };
            save_modify_record(formData)
                .then(response => {
                     this.numberIndex_b = this.numberIndex_b - this.numberIndex;
                     this.numberIndex = 0;
                })
                .catch(() => {});
        },
        caozuoClick(command) {
            if(command === "3") {
                this.okSubmit = false;
                this.caijian = true;
                this.option.img = this.thisdata.imageUrl;
            } else if(command === "4") {
                this.loading = true;
                resizeImage({imagePath:this.thisdata.imageUrl})
                    .then(response => {
                        this.loading = false;
                        if (response.code) {
                            return false;
                        } else {
                            this.thisdata.imageUrl = response.data;
                            this.$message({
                                type: "success",
                                message: "裁剪成功!"
                            });
                        }
                    })
                    .catch(() => {
                        this.dialogVisible = false;
                    });
            }
        },
        duiqiClick(command) {
            var duiqiList = [];
            if(command === "1"){
                this.listdata.map((item, index)=>{
                    if(this.thisAllid.indexOf(index+'') != '-1'){
                        duiqiList.push(item.leftBox)
                    }
                });
                this.listdata.map((item, index)=>{
                    if(this.thisAllid.indexOf(index+'') != '-1'){
                        item.leftBox = Math.min(...duiqiList);
                    }
                });
                this.numberIndex_b += 1;
                this.cunchuData();
            } else if(command === "2") {
                this.listdata.map((item, index)=>{
                    if(this.thisAllid.indexOf(index+'') != '-1'){
                        duiqiList.push(item.leftBox + item.width)
                    }
                });
                this.listdata.map((item, index)=>{
                    if(this.thisAllid.indexOf(index+'') != '-1'){
                        item.leftBox = Math.max(...duiqiList) - item.width;
                    }
                });
                this.numberIndex_b += 1;
                this.cunchuData();
            } else if(command === "3") {
                this.listdata.map((item, index)=>{
                    if(this.thisAllid.indexOf(index+'') != '-1'){
                        duiqiList.push(item.topBox)
                    }
                });
                this.listdata.map((item, index)=>{
                    if(this.thisAllid.indexOf(index+'') != '-1'){
                        item.topBox = Math.min(...duiqiList);
                    }
                });
                this.numberIndex_b += 1;
                this.cunchuData();
            } else if(command === "4") {
                this.listdata.map((item, index)=>{
                    if(this.thisAllid.indexOf(index+'') != '-1'){
                        duiqiList.push(item.topBox+item.height)
                    }
                });
                this.listdata.map((item, index)=>{
                    if(this.thisAllid.indexOf(index+'') != '-1'){
                        item.topBox = Math.max(...duiqiList)-item.height;
                    }
                });
                this.numberIndex_b += 1;
                this.cunchuData();
            } else if(command === "5") {
                let leftList = [];
                let rightList = [];
                this.listdata.map((item, index)=>{
                    if(this.thisAllid.indexOf(index+'') != '-1'){
                        leftList.push(item.leftBox)
                        rightList.push(item.leftBox+item.width)
                    }
                });
                this.listdata.map((item, index)=>{
                    if(this.thisAllid.indexOf(index+'') != '-1'){
                        item.leftBox = (Math.max(...rightList)-Math.min(...leftList)-item.width)/2+Math.min(...leftList);
                    }
                });
                this.numberIndex_b += 1;
                this.cunchuData();
            } else if(command === "6") {
                let topList = [];
                let bottomList = [];
                this.listdata.map((item, index)=>{
                    if(this.thisAllid.indexOf(index+'') != '-1'){
                        console.log(item.height)
                        topList.push(item.topBox)
                        bottomList.push(item.topBox+item.height)
                    }
                });
                this.listdata.map((item, index)=>{
                    if(this.thisAllid.indexOf(index+'') != '-1'){
                        item.topBox = (Math.max(...bottomList)-Math.min(...topList)-item.height)/2+Math.min(...topList);
                    }
                });
                this.numberIndex_b += 1;
                this.cunchuData();
            }
        },
        dbthisclick(index, item) {
            this.guangbiao = true;
            let that = this;
            item.bianjistyle = true;
            that.listdata.map(item => {
                item.dbtype = false;
            });
            item.dbtype = true;
        },
        paixuChange(val){
            this.listdata.map(item=>{
                if(item.id != val.id){
                    if(item.layerId >= val.layerId){
                        item.layerId += 1;
                    }
                }
            });
            this.numberIndex_b += 1;
            this.cunchuData();
        },
        loadImage(index, item) {
            if(index=="-1"){
                this.$refs['imgSize'].map(items => {
                    if (items.src === item.imageUrl) {
                        setTimeout(function(){
                            item.height = items.height;
                        },60)
                    }
                });
                return;
            }
            this.$refs['imgSize'].map(items => {
                if (items.src === item.imageUrl) {
                    item.width = items.width;
                    item.height = items.height;
                }
            });
        },
        loadText() {
            let that = this;
            $.each($(".textDiv"), function (i,v) {
                that.listdata.map(item=>{
                    if(item.layerId == v.getAttribute("data-id")){
                        item.width = Math.round($(v).width());
                        item.height = Math.round($(v).height());
                    }
                })
            });
        },
        addimgPreview1(file) {
            if (file.name.split(".")[1] === "png"||file.name.split(".")[1] === "jpg"||file.name.split(".")[1] === "jpeg") {
                this.$refs.adduploadImg1.submit();
            } else {
                this.$refs.adduploadImg1.uploadFiles = [];
                this.$message.error("只能上传图片");
            }
        },
        addimgPreview2(file) {
            if (file.name.split(".")[1] === "png"||file.name.split(".")[1] === "jpg"||file.name.split(".")[1] === "jpeg") {
                this.$refs.adduploadImg2.submit();
            } else {
                this.$refs.adduploadImg1.uploadFiles = [];
                this.$message.error("只能上传图片");
            }
        },
        addimgPreview3(file) {
            if (file.name.split(".")[1] === "png"||file.name.split(".")[1] === "jpg"||file.name.split(".")[1] === "jpeg") {
                this.$refs.adduploadImg3.submit();
            } else {
                this.$refs.adduploadImg1.uploadFiles = [];
                this.$message.error("只能上传图片");
            }
        },
        imgPreview(file) {
            if (file.name.split(".")[1] === "png"||file.name.split(".")[1] === "jpg"||file.name.split(".")[1] === "jpeg") {
                this.$refs.uploadImg.submit();
            } else {
                this.$refs.adduploadImg1.uploadFiles = [];
                this.$message.error("只能上传图片");
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
                this.listdata[this.thisdataid].imageUrl = response.data.url;
            }
        },
        addokuploadimg(response) {
            this.UpDataVisible = false;
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
                var addImg = JSON.stringify(this.addimgVal);
                addImg = JSON.parse(addImg);
                addImg.imageUrl = response.data.url;
                let number = [];
                this.listdata.map(item =>{
                    item.active = false;
                    number.push(item.layerId);
                });
                addImg.layerId = Number(Math.max(...number)) + 1;
                this.listdata.unshift(addImg);
                this.thisdataid = 0;
                this.formData = addImg;
                this.formTitle = "图片编辑";
                this.thisAllid = [];
                this.numberIndex_b += 1;
                this.cunchuData();
            }
        },
        move(e, index, data) {
            let that = this;
            this.thisclick(index, data);
            this.loadText();
            if(data.suoding || data.bianjistyle){
                return;
            };
            //算出鼠标相对元素的位置
            let movetype = false;
            let clientX = e.clientX;//多选算法
            let clientY = e.clientY;//多选算法
            let topBox = Math.round(e.clientY/that.scale)-JSON.parse(JSON.stringify(data.topBox));//单选使用选算法
            let leftBox = Math.round(e.clientX/that.scale)-JSON.parse(JSON.stringify(data.leftBox));//单选使用选算法
            document.onmousemove = (e)=>{       //鼠标按下并移动的事件
                //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
                //绑定元素位置到positionX和positionY上面
                if (that.thisAllid.length>0) {
                    that.listdata.map((item, index)=>{
                        if(that.thisAllid.indexOf(index+'') != '-1'){
                            if(item.suoding == false) {
                                item.topBox += Math.round((e.clientY - clientY)/that.scale);
                                item.leftBox += Math.round((e.clientX - clientX)/that.scale);
                            }
                        }
                    });
                } else {
                    data.topBox = Math.round(e.clientY / that.scale) - topBox;
                    data.leftBox = Math.round(e.clientX / that.scale) - leftBox;
                    data.itemLine = false;
                    that.leftTopLineH = false;
                    that.leftBottomLineH = false;
                    that.rightTopLineH = false;
                    that.rightBottomLineH = false;
                    that.leftTopLineW = false;
                    that.leftBottomLineW = false;
                    that.rightTopLineW = false;
                    that.rightBottomLineW = false;
                    that.listdata.map((item)=>{
                        if(data.id != item.id){
                            if(data.leftBox-item.leftBox < 5 && data.leftBox-item.leftBox > -5){
                                data.leftBox = item.leftBox;
                            } else if(data.leftBox-item.leftBox-item.width > -5 && data.leftBox-item.leftBox-item.width < 5) {
                                data.leftBox = item.leftBox + item.width;
                            } else if(data.leftBox+data.width-item.leftBox > -5 && data.leftBox+data.width-item.leftBox < 5) {
                                data.leftBox = item.leftBox-data.width;
                            } else if(data.leftBox+data.width-item.leftBox-item.width > -5 && data.leftBox+data.width-item.leftBox-item.width < 5) {
                                data.leftBox = item.leftBox+item.width-data.width;
                            } else if(data.topBox-item.topBox > -5 && data.topBox-item.topBox < 5) {
                                data.topBox = item.topBox;
                            } else if(data.topBox-item.topBox-item.height > -5 && data.topBox-item.topBox-item.height < 5) {
                                data.topBox = item.topBox+item.height;
                            } else if(data.topBox+data.height-item.topBox > -5 && data.topBox+data.height-item.topBox < 5) {
                                data.topBox = item.topBox-data.height;
                            } else if(data.topBox+data.height-item.topBox-item.height > -5 && data.topBox+data.height-item.topBox-item.height < 5) {
                                data.topBox = item.topBox+item.height-data.height;
                            }
                            if((item.leftBox == data.leftBox||item.leftBox+item.width == data.leftBox) && item.topBox < data.topBox){
                                data.itemLine = true;
                                that.leftTopLineH = true;
                                item.itemLineBorder = true;
                            } else if((item.leftBox == data.leftBox||item.leftBox+item.width == data.leftBox)&& item.topBox > data.topBox){
                                data.itemLine = true;
                                that.leftBottomLineH = true;
                                item.itemLineBorder = true;
                            } else if((item.leftBox == data.leftBox+data.width||item.leftBox+item.width == data.leftBox+data.width) && item.topBox < data.topBox){
                                data.itemLine = true;
                                that.rightTopLineH = true;
                                item.itemLineBorder = true;
                            } else if((item.leftBox == data.leftBox+data.width||item.leftBox+item.width == data.leftBox+data.width) && item.topBox > data.topBox){
                                data.itemLine = true;
                                that.rightBottomLineH = true;
                                item.itemLineBorder = true;
                            } else if((item.topBox == data.topBox||item.topBox+item.height == data.topBox) && item.leftBox > data.leftBox){
                                data.itemLine = true;
                                that.rightTopLineW = true;
                                item.itemLineBorder = true;
                            } else if((item.topBox == data.topBox||item.topBox+item.height == data.topBox) && item.leftBox < data.leftBox){
                                data.itemLine = true;
                                that.leftTopLineW = true;
                                item.itemLineBorder = true;
                            } else if((item.topBox == data.topBox+data.height||item.topBox+item.height == data.topBox+data.height) && item.leftBox > data.leftBox){
                                data.itemLine = true;
                                that.rightBottomLineW = true;
                                item.itemLineBorder = true;
                            } else if((item.topBox == data.topBox+data.height||item.topBox+item.height == data.topBox+data.height) && item.leftBox < data.leftBox){
                                data.itemLine = true;
                                that.leftBottomLineW = true;
                                item.itemLineBorder = true;
                            } else {
                                item.itemLineBorder = false;
                            }
                        }
                    });
                }
                clientX = e.clientX;
                clientY = e.clientY;
                movetype = true;
            };
            document.onmouseup = () => {
                document.onmousemove = null;
                document.onmouseup = null;
                data.itemLine = false;
                that.leftTopLineH = false;
                that.leftBottomLineH = false;
                that.rightTopLineH = false;
                that.rightBottomLineH = false;
                that.leftTopLineW = false;
                that.leftBottomLineW = false;
                that.rightTopLineW = false;
                that.rightBottomLineW = false;
                that.listdata.map((item)=>{
                    item.itemLineBorder = false;
                });
                if(movetype){
                    that.numberIndex_b += 1;
                    that.cunchuData();
                }
            };
        },
        twoclick(data) {
            if (data.imageUrl === null) {
                this.formTitle = "文案编辑";
            } else {
                this.formTitle = "图片编辑";
            }
            this.rightTable = true;
            this.formData = data;
        },
        thisclick(index, data) {
            if(data.dbtype != true){
                this.guangbiao = false;
            }
            let ind = index + "";
            let that = this;
            if(that.duoType === true){
                if(data.suoding){
                    return;
                }
                if(that.thisdataid != "-1"){
                    that.thisAllid.push(that.thisdataid + "");
                }
                if(that.thisAllid.indexOf(ind) == '-1'){
                    that.thisAllid.push(ind);
                } else{
                    that.thisAllid.splice(that.thisAllid.indexOf(ind),1)
                }
                that.listdata.map(item=>{
                    if(that.thisAllid.indexOf(that.listdata.length-1-item.layerId+"") != '-1'){
                        item.active = true;
                    } else {
                        item.active = false;
                    }
                });
                that.formTitle = "";
                that.thisdataid = "-1";
                return;
            }
            if (that.thisAllid.length <= 0) {
                that.listdata.map(i => {
                    i.active = false;
                });
                data.active = true;
                that.thisAllid = [];
                that.thisdataid = index;
                that.thisdata = data;
                if (data.imageUrl === null) {
                    that.formTitle = "文案编辑";
                } else {
                    that.formTitle = "图片编辑";
                }
                that.rightTable = true;
                that.formData = data;
            }
        },
        textDirectionClick (val) {
            if(val.textDirection === 0){
                val.textDirection = 2;
            } else {
                val.textDirection = 0;
            }
            this.numberIndex_b += 1;
            this.cunchuData();
        },
        okClick(val) {
            var listdata = JSON.parse(JSON.stringify(this.listdata)).reverse();
            let itemlist = []
            listdata.map(item =>{
                if (item.imageUrl == null){
                    item.leftBox += 10;
                }
                item.opacity = item.opacity/100;
                if(item.fontColor != null){
                    item.fontColor = rgb2hex(item.fontColor);
                }
                if (item.fontStyle != null){
                    if(item.fontStyle.length == 2){
                        item.fontStyle = item.fontStyle[1]
                    }
                }
                itemlist.push(item);
            });
            function zero_fill_hex(num, digits) {
                var s = num.toString(16);
                while (s.length < digits)
                    s = "0" + s;
                return s;
            }
            function rgb2hex(rgb) {
                if (rgb.charAt(0) == '#')
                    return rgb;
                var ds = rgb.split(/\D+/);
                var decimal = Number(ds[1]) * 65536 + Number(ds[2]) * 256 + Number(ds[3]);
                return "#" + zero_fill_hex(decimal, 6);
            }
            this.$emit("enterClick", {
                    itemlist: itemlist
                });
        },
        updataform() {
            this.numberIndex_b += 1;
            this.cunchuData();
        },
        updatapaixu() {
            let thisAllid = [];
            this.listdata.reverse().map((item, index)=> {
                if(this.thisAllid.length > 1){
                    if(item.active){
                        thisAllid.push(this.listdata.length - 1 - index + "")
                    }
                }else{
                    if(item.active){
                        this.thisdataid = this.listdata.length - 1 - index;
                    }
                }
                item.layerId = index;
            });
            this.thisAllid = thisAllid;
            this.listdata.reverse();
            this.numberIndex_b += 1;
            this.cunchuData();
        },
        yulanClick(){
            let that = this;
            let itemlist = [];
            let listdata = JSON.parse(JSON.stringify(this.listdata)).reverse();
            listdata.map(item =>{
                item.opacity = item.opacity/100;
                if (item.imageUrl == null){
                    item.leftBox += 10;
                }
                itemlist.push(item);
            });
            that.yulanType = true;
            that.yulanUrl = "";
            download_model(itemlist)
                .then(response => {
                    blob_base64(response, function callback(val){
                        that.yulanUrl = val;
                    })
                })
                .catch(() => {});
        },
        daochuClick() {
            let itemlist = [];
            let listdata = JSON.parse(JSON.stringify(this.listdata)).reverse();
            listdata.map(item =>{
                item.opacity = item.opacity/100;
                if (item.imageUrl == null){
                    item.leftBox += 10;
                }
                itemlist.push(item);
            });
            download_model(itemlist)
                .then(response => {
                    this.download(response)
                })
                .catch(() => {});
        },
        download (data) {
            if (!data) {
                return
            }
            if(window.navigator.msSaveBlob == undefined){
                let url = window.URL.createObjectURL(new Blob([data]));
                let link = document.createElement('a');
                link.style.display = 'none';
                link.href = url;
                link.setAttribute('download', "img-"+getRandomString(5,"0123456789")+'.png');
                document.body.appendChild(link);
                link.click();
            } else {
                let fileObj = new Blob([data]);
                window.navigator.msSaveBlob(fileObj,"img-"+getRandomString(5,"0123456789")+'.png');
            }
        }
    },
    mounted: function() {
        let that = this;
        this.mainHeight = $(".main").height() - $("#pictureitem").height() - 88;
        this.matiriaVal.mainHeight = $(".main").height() - $("#pictureitem").height() - 38;
        this.matiriaVal.conterHeight = this.matiriaVal.mainHeight-83-90;
        if (this.mainHeight > Number(that.height) + 88){
            this.marginTop =(this.mainHeight-Number(this.height)-88)/2;
        }
        window.onresize = function() {  // 定义窗口大小变更通知事件
            that.mainHeight = $(".main").height() - $("#pictureitem").height() - 88;
            that.matiriaVal.mainHeight = $(".main").height() - $("#pictureitem").height() - 38;
            that.matiriaVal.conterHeight = that.matiriaVal.mainHeight-83-90;
            if (that.mainHeight > Number(that.height) + 88){
                that.marginTop =(that.mainHeight-Number(that.height)-88)/2
            }
        };
        $("body").keydown(function(event){
            if(that.keydown==false){
                return;
            }
            let e = event ? event :(window.event ? window.event : null);
            if(that.guangbiao == true){
                return;
            }
            if(e.ctrlKey){
                that.duoType = true;
            }
            if((e.ctrlKey)&&(e.keyCode===83)) {
                if(getAdminId != that.$route.query.userId) {
                    that.okClick(0);
                }
            } else if((e.ctrlKey)&&(e.keyCode===89)) {
                if (that.numberIndex > 0) {
                    that.qianjinClick();
                }
            } else if((e.ctrlKey)&&(e.keyCode===90)) {
                if (that.numberIndex < that.numberIndex_b) {
                    that.houtuiClick();
                }
            }
            switch(e.keyCode){
                case 81:
                    /*console.log(that.$refs.addLeftlist1)
                     $("#addLeftlist1").click();
                     that.$refs.addLeftlist1.$el.click();*/
                    break;
                case 67:
                    break;
                case 69:
                    break;
                default:
                    break;
            }
            if (that.thisdata === ""){
                return;
            }
            switch(e.keyCode){
                case 37:
                    if (that.thisAllid.length>0) {
                        that.listdata.map((item, index)=>{
                            if(that.thisAllid.indexOf(index+'') != '-1'){
                                item.leftBox -= 1;
                            }
                        });
                    } else {
                        that.thisdata.leftBox -= 1;
                    }
                    that.numberIndex_b += 1;
                    that.cunchuData();
                    break;
                case 38:
                    if (that.thisAllid.length>0) {
                        that.listdata.map((item, index)=>{
                            if(that.thisAllid.indexOf(index+'') != '-1'){
                                item.topBox -= 1;
                            }
                        });
                    } else {
                        that.thisdata.topBox -= 1;
                    }
                    that.numberIndex_b += 1;
                    that.cunchuData();
                    break;
                case 39:
                    if (that.thisAllid.length>0) {
                        that.listdata.map((item, index)=>{
                            if(that.thisAllid.indexOf(index+'') != '-1'){
                                item.leftBox += 1;
                            }
                        });
                    } else {
                        that.thisdata.leftBox += 1;
                    }
                    that.numberIndex_b += 1;
                    that.cunchuData();
                    break;
                case 40:
                    if (that.thisAllid.length>0) {
                        that.listdata.map((item, index)=>{
                            if(that.thisAllid.indexOf(index+'') != '-1'){
                                item.topBox += 1;
                            }
                        });
                    } else {
                        that.thisdata.topBox += 1;
                    }
                    that.numberIndex_b += 1;
                    that.cunchuData();
                    break;
                default:
                    break;
            }
            if((e.shiftKey)&&(e.keyCode===187)){
                if (that.thisdata.imageUrl === null) {
                    that.thisdata.fontSize += 1;
                } else {
                    that.thisdata.width += 1;
                }
                that.numberIndex_b += 1;
                that.cunchuData();
            } else if((e.shiftKey)&&(e.keyCode===189)){
                if (that.thisdata.imageUrl === null) {
                    that.thisdata.fontSize -= 1;
                } else {
                    that.thisdata.width -= 1;
                }
                that.numberIndex_b += 1;
                that.cunchuData();
            } else if((e.shiftKey)&&(e.keyCode===37)){
                if (that.thisAllid.length>0) {
                    that.listdata.map((item, index)=>{
                        if(that.thisAllid.indexOf(index+'') != '-1'){
                            item.leftBox -= 2;
                        }
                    });
                } else {
                    that.thisdata.leftBox -= 2;
                }
                that.numberIndex_b += 1;
                that.cunchuData();
            } else if((e.shiftKey)&&(e.keyCode===38)){
                if (that.thisAllid.length>0) {
                    that.listdata.map((item, index)=>{
                        if(that.thisAllid.indexOf(index+'') != '-1'){
                            item.topBox -= 2;
                        }
                    });
                } else {
                    that.thisdata.topBox -= 2;
                }
                that.numberIndex_b += 1;
                that.cunchuData();
            } else if((e.shiftKey)&&(e.keyCode===39)){
                if (that.thisAllid.length>0) {
                    that.listdata.map((item, index)=>{
                        if(that.thisAllid.indexOf(index+'') != '-1'){
                            item.leftBox += 2;
                        }
                    });
                } else {
                    that.thisdata.leftBox += 2;
                }
                that.numberIndex_b += 1;
                that.cunchuData();
            } else if((e.shiftKey)&&(e.keyCode===40)){
                if (that.thisAllid.length>0) {
                    that.listdata.map((item, index)=>{
                        if(that.thisAllid.indexOf(index+'') != '-1'){
                            item.topBox += 2;
                        }
                    });
                } else {
                    that.thisdata.topBox += 2;
                }
                that.numberIndex_b += 1;
                that.cunchuData();
            } else if((e.ctrlKey)&&(e.keyCode===88)){
                if(that.thisdata == ''|| that.thisdata.imageUrl == null||that.thisAllid.length>0) {

                } else{
                    that.caozuoClick("3");
                }
            } else if((e.shiftKey)&&(e.keyCode===88)){
                if(that.thisdata == ''|| that.thisdata.imageUrl == null||that.thisAllid.length>0) {

                } else{
                    that.caozuoClick("4");
                }
            } else if((e.ctrlKey)&&(e.altKey)&&(e.keyCode===84)){
                if(that.thisAllid.length>1) {
                    that.duiqiClick("3");
                }
            } else if((e.ctrlKey)&&(e.altKey)&&(e.keyCode===66)){
                if(that.thisAllid.length>1) {
                    that.duiqiClick("4");
                }
            } else if((e.ctrlKey)&&(e.altKey)&&(e.keyCode===67)){
                if(that.thisAllid.length>1) {
                    that.duiqiClick("5");
                }
            } else if((e.ctrlKey)&&(e.altKey)&&(e.keyCode===86)){
                if(that.thisAllid.length>1) {
                    that.duiqiClick("6");
                }
            } else if((e.ctrlKey)&&(e.shiftKey)&&(e.keyCode===72)){
                if(that.thisAllid.length>0) {
                    that.listdata.map((item, index)=>{
                        if(that.thisAllid.indexOf(index+'') != '-1'){
                            item.display = "none";
                        }
                    });
                }else{
                    that.thisdata.display = "none";
                }
            } else if((e.ctrlKey)&&(e.shiftKey)&&(e.keyCode===76)){
                if(that.thisAllid.length>0) {
                    that.listdata.map((item, index)=>{
                        if(that.thisAllid.indexOf(index+'') != '-1'){
                            item.suoding = !item.suoding;
                        }
                    });
                } else {
                    that.thisdata.suoding = !that.thisdata.suoding;

                }
            }
        });
        $("body").keyup(function(){
            that.duoType = false;
        });
    },
    updated: function() {
        //this.loadText();
        /*this.mainHeight = $(".main").height() - $("#pictureitem").height() - 30;*/
    },
    beforeDestroy() {
        this.keydown = false;
    }
};
</script>

<style type="text/scss" lang="scss">
* {
    margin: 0;
    padding: 0;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}
.addLeft {
    position: absolute;
    top: 121px;
    left: 0;
    z-index: 999;
    text-align: center;
    border: 1px solid #d8dce5;
    background: #fff;
    font-size: 12px;
}
.addLeft_list {
    margin: 0 5px;
    padding: 15px 4px;
    border-bottom: 1px solid #ccc;
    cursor: pointer;
}
.addLeft_list i {
    font-size: 20px;
}
.addLeft .addLeft_list:last-child {
    border: none;
}
.nameImg {
    height: 60px;
    font-size: 16px;
    color: #000;
    display: flex;
    border-top: 1px solid #d8dce5;
    align-items: center;
    //justify-content: space-around;
}
.nameImg .topList {
    text-align: center;
    font-size: 12px;
    margin-left: 50px;
    cursor: pointer;
}
.nameImg .topList .el-icon--right {
    display: none;
}
li {
    list-style: none outside none;
}
.el-drawer__body {
    padding-right: 40px;
    padding-left: 20px;
}
.rightForm {
    position: absolute;
    right: 0;
    top: 120px;
    background: #fff;
    padding: 10px;
    width: 260px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    overflow: auto;
    z-index: 200;
}
.rightForm_2{
    right: 260px;
    width: 240px;
}
.rightForm_2_right {
    right: 50px;
}
.leftForm {
    position: absolute;
    left: 0;
    top: 120px;
    background: #fff;
    width: 300px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    overflow: auto;
    z-index: 999;
}
.leftList {
    padding:10px;
    cursor: pointer;
    color: #979393;
}
.leftListKeys {
    padding: 10px 5px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    position: relative;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    border-bottom: 1px solid #EDEDED;
    margin: 0 10px;
}
.rightForm_2 .active{
    background: #657081;
    color: #fff;
}
#moveCard {
    position: relative;
    margin: 40px auto;
    overflow: hidden;
}
.moveDiv {
    cursor: move;
}
.moveItem {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    /*white-space: pre;*/
}
.assetsEditDoBlockFixed {
    border-top: 1px solid #b2b2b2;
    bottom: 0;
    left: 0;
    padding: 22px 24px;
    position: absolute;
    right: 0;
    width: inherit;
    z-index: 1002;
    background: #fff;
}
.buttonGroup {
    display: flex;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}
.buttonGroup .doBtn {
    border: 1px solid #b2b2b2;
    color: #606266;
    font-size: 14px;
    height: 32px;
    line-height: 32px;
    margin-right: -1px;
    position: relative;
    text-align: center;
    width: 71px;
    cursor: pointer;
}
.buttonGroup .doBtn:hover {
    color: #000;
}
.assetsEditDoBlockFixed .buttonGroup .doBtn:first-child {
    border-radius: 2px 0 0 2px;
}
.assetsEditDoBlockFixed .buttonGroup .doBtn:last-child {
    border-radius: 0 2px 2px 0;
    color: #ff3c3c;
}
.formhover {
    padding-bottom: 10px;
    cursor: pointer;
}
.formhover:hover {
    border-bottom: 2px solid #409EFF;
}
.el-upload {
    width: 100%;
}
.dashedleft {
    position: absolute;
    left: 0;
    width: 1px;
    height: 100%;
    top: 0;
    border-left: 1px solid #fff;
}
.dashedleft::after {
    content: " ";
    width: inherit;
    height: inherit;
    border: 0 dashed #666;
    position: absolute;
    z-index: 1;
    top: 0;
    left: -1px;
    border-left-width: 1px;
}
.dashedright {
    position: absolute;
    right: 0;
    width: 1px;
    height: 100%;
    top: 0;
    border-right: 1px solid #fff;
}
.dashedright::after {
    content: " ";
    width: inherit;
    height: inherit;
    border: 0 dashed #666;
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    border-right-width: 1px;
}
.dashedtop {
    position: absolute;
    right: 0;
    width: 100%;
    height: 0;
    top: 0;
    border-bottom: 1px solid #fff;
}
.dashedtop::after {
    content: " ";
    width: inherit;
    height: inherit;
    border: 0 dashed #666;
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    border-bottom-width: 1px;
}
.dashedbottom {
    position: absolute;
    right: 0;
    width: 100%;
    height: 0;
    bottom: 0;
    border-bottom: 1px solid #fff;
}
.dashedbottom::after {
    content: " ";
    width: inherit;
    height: inherit;
    border: 0 dashed #666;
    position: absolute;
    z-index: 1;
    bottom: -1px;
    left: 0;
    border-bottom-width: 1px;
}
.textDirection {
    writing-mode: tb-rl;
}
.textB {
    font-weight: bold;
}
.textI {
    font-style: italic;
}
.typeBtn {
    width: 30px;
    height: 30px;
    line-height: 30px;
    border: 1px solid rgb(102, 102, 113);
    text-align: center;
    margin-left: 20px;
    float: left;
    cursor: pointer;
}
.typeBtntrue {
    background: #292939;
    color: #fff;
}
.typeBtn:hover {
    background: #292939;
    color: #fff;
}
.el-color-picker--mini .el-color-picker__trigger{
    width: 50px;
}
.upTemplate .el-icon-arrow-down:before{
    display: none;
}
.caijian_yn:hover{
    transform: scale(1.2);
}
.bianjistyle {
    cursor: text;
}
.upPsdImg .el-cascader-menu{
    width: 190px;
}
.upPsdImg .el-cascader-menu:last-child {
    width: 250px;
}
.leftTopLine-H {
    position: absolute;
    left: 0;
    height: 100px;
    border-right: 1px solid #fff;
    z-index: 9999;
    top: -100px;
}
.leftTopLine-H:before{
    content: " ";
    position: absolute;
    left: 0;
    height: 100%;
    border-right: 1px dashed red;
    z-index: 9999;
}
.leftBottomLine-H {
    position: absolute;
    left: 0;
    height: 100px;
    border-right: 1px solid #fff;
    z-index: 9999;
    bottom: -100px;
}
.leftBottomLine-H:before {
    content: " ";
    position: absolute;
    left: 0;
    height: 100%;
    border-right: 1px dashed red;
    z-index: 9999;
}
.rightTopLine-H {
    position: absolute;
    right: 0;
    height: 100px;
    border-right: 1px solid #fff;
    z-index: 9999;
    top: -100px;
}
.rightTopLine-H:before {
    content: " ";
    position: absolute;
    left: 0;
    height: 100%;
    border-right: 1px dashed red;
    z-index: 9999;
}
.rightBottomLine-H {
    position: absolute;
    right: 0;
    height: 100px;
    border-right: 1px solid #fff;
    z-index: 9999;
    bottom: -100px;
}
.rightBottomLine-H:before {
    content: " ";
    position: absolute;
    left: 0;
    height: 100%;
    border-right: 1px dashed red;
    z-index: 9999;
}
.leftTopLine-W {
    position: absolute;
    top: 0;
    width: 100px;
    border-bottom: 1px solid #fff;
    z-index: 9999;
    left: -100px;
}
.leftTopLine-W:before {
    content: " ";
    position: absolute;
    top: 0;
    width: 100%;
    border-bottom: 1px dashed red;
    z-index: 9999;
}
.leftBottomLine-W {
    position: absolute;
    bottom: 0;
    width: 100px;
    border-bottom: 1px solid #fff;
    z-index: 9999;
    left: -100px;
}
.leftBottomLine-W:before {
    content: " ";
    position: absolute;
    top: 0;
    width: 100%;
    border-bottom: 1px dashed red;
    z-index: 9999;
}
.rightTopLine-W {
    position: absolute;
    top: 0;
    width: 100px;
    border-bottom: 1px solid #fff;
    z-index: 9999;
    right: -100px;
}
.rightTopLine-W:before {
    content: " ";
    position: absolute;
    top: 0;
    width: 100%;
    border-bottom: 1px dashed red;
    z-index: 9999;
}
.rightBottomLine-W {
    position: absolute;
    bottom: 0;
    width: 100px;
    border-bottom: 1px solid #fff;
    z-index: 9999;
    right: -100px;
}
.rightBottomLine-W:before {
    content: " ";
    position: absolute;
    top: 0;
    width: 100%;
    border-bottom: 1px dashed red;
    z-index: 9999;
}

//基线
.moveLine-W {
    width: 100%;
    height: 4px;
    cursor: pointer;
    position: absolute;
    top: 100px;
    z-index: 199;
}
.moveLine-W:after {
    content: " ";
    position: absolute;
    top: 0;
    width: 100%;
    height: 1px;
    background: #4AFFFF;
}
.moveLine-H {
    height: 100%;
    width: 4px;
    cursor: pointer;
    position: absolute;
    top: 0;
    left: 100px;
    z-index: 199;
}
.moveLine-H:after {
    content: " ";
    position: absolute;
    left: 0;
    height: 100%;
    width: 1px;
    background: #4AFFFF;
}
#home-upimg {
    .topZhezhaoBg {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
    }
    .topZhezhao {
        background: #000;
        width: 100%;
        height: 100%;
        opacity: 0.4;
        position: absolute;
        top: 0;
    }
    .topZhezhaoBtn {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        display: flex;
        align-items: center;
    }
    .pictureHome-beizhu-li {
        width: 25%;
        text-align: center;
        padding: 0 5px;
    }
    .pictureHome-beizhu-img {
        margin: 0 auto;
        text-align: center;
        margin-bottom: 10px;
        width: 60px;
        height: 60px;
        line-height: 40px;
        background: #657081;
        border-radius: 50px;
        padding: 10px;
        color: #fff;
        img {
            width: auto;
            height: 100%;
        }
    }
    .pictureHome-beizhu-top {
        position: absolute;
        top: 10px;
        left: 20px;
        height: 20px;
        line-height: 20px;
    }
    .el-dialog__header {
        padding: 20px 20px 10px;
        border-bottom: 1px solid #ccc;
        height: 40px;
    }
    .UpDataVisible {
        width: 400px;
        .el-dialog__body {
            padding: 60px 40px;
            padding-top: 0;
        }
        .el-dialog__header {
            border:none;
        }
        ul {
            .title {
                font-size: 18px;
                color: #409eff;
            }
            li{
                padding: 10px 0;
                border-bottom: 1px solid #ccc;
                cursor: pointer;
                display: flex;
                align-items: center;
                position: relative;
                .el-icon-picture,.el-icon-upload {
                    margin-right: 5px;
                    font-size: 16px;
                }
                .liulan {
                    position: absolute;
                    right: 50px;
                    display: flex;
                    align-items: center;
                }
                .el-icon-caret-right {
                    margin-left: 10px;
                    font-size: 20px;
                }
            }
        }
    }
    .el-dialog__headerbtn {
        top: 10px;
    }
    .pictureHome-beizhu-title {
        font-size: 16px;
        font-weight: bold;
    }
    .el-textarea__inner{
        padding-top: 20px;
    }
    .el-dialog__body {
        padding: 30px 20px;
    }
}
</style>
