/*!
 * {
 *   "buildtime": "2019-07-19 15:01:49",
 *   "workspace": "F:\\project\\x-book4\\js",
 *   "username": "Administrator",
 *   "hostname": "PC201608171616",
 *   "platform": "win32",
 *   "git": {
 *     "branch": "master",
 *     "hash": "b17f442a6",
 *     "message": [
 *       "commit b17f442a62eb78bc9ab78ffe68e3afb76c3e3548",
 *       "Author: YangZai <552396385@qq.com>",
 *       "Date:   Fri Jul 19 14:48:13 2019 +0800",
 *       "    xxxxxx"
 *     ],
 *     "user": "YangZai",
 *     "email": "552396385@qq.com",
 *     "remote": [
 *       "origin http://gitlab.kf.gli.cn/xcloud/x-book4.git (fetch)",
 *       "origin http://gitlab.kf.gli.cn/xcloud/x-book4.git (push)"
 *     ]
 *   }
 * }
 */
(window.webpackJsonp=window.webpackJsonp||[]).push([[37],{1187:function(t,e,a){"use strict";a.r(e);var i=a(1395),r=a(787);for(var s in r)"default"!==s&&function(t){a.d(e,t,function(){return r[t]})}(s);a(1188);var n=a(0),l=Object(n.a)(r.default,i.a,i.b,!1,null,"c211808c",null);e.default=l.exports},1188:function(t,e,a){"use strict";var i=a(789);a.n(i).a},1189:function(t,e,a){"use strict";var i=a(790);a.n(i).a},1379:function(t,e,a){"use strict";function i(){var a=this,t=a.$createElement,i=a._self._c||t;return i("div",{staticClass:"index clearfix"},[i("Top",{attrs:{currentPlant:"X-PUBLISH"}}),i("Menu",{attrs:{curr:"/contentLibrary/ARandVR"}}),i("div",{staticClass:"mainRight"},[i("div",{staticClass:"contentWrap"},[i("div",{staticClass:"contentLeft"},[i("div",{staticClass:"maindata"},[i("div",{staticClass:"serachWrap",on:{keyup:function(t){return!t.type.indexOf("key")&&a._k(t.keyCode,"enter",13,t.key,"Enter")?null:a.query()}}},[i("div",{staticClass:"title"}),i("form",{attrs:{id:"mainForm"}},[i("span",{staticClass:"group-inline"},[i("el-input",{attrs:{placeholder:"名称",name:"name",clearable:""},model:{value:a.searchQuery.name,callback:function(t){a.$set(a.searchQuery,"name",t)},expression:"searchQuery.name"}})],1),i("span",{staticClass:"group-inline"},[i("el-input",{attrs:{placeholder:"标签",name:"tag",clearable:""},model:{value:a.searchQuery.tag,callback:function(t){a.$set(a.searchQuery,"tag",t)},expression:"searchQuery.tag"}})],1),i("span",{staticClass:"group-inline"},[i("TimePick",{attrs:{inputsName:["start_time","end_time"]}})],1),i("span",{staticClass:"group-inline"},[i("el-button",{attrs:{size:"mediu",type:"primary",plain:"",icon:"el-icon-search"},on:{click:a.query}},[a._v("搜索")]),i("el-button",{attrs:{size:"mediu",type:"primary",icon:"el-icon-plus"},on:{click:function(t){return a.opneDetailDialogAdd("xq",!0)}}},[a._v("新建")])],1)])]),i("div",{staticClass:"tableWrap"},[a.list?i("div",{staticClass:"div"},[i("div",{staticClass:"tableTop"},[i("div",{staticClass:"title vel-line"},[i("span",[a._v("全部 "),a.page?i("span",{staticClass:"totalNum"},[a._v("("+a._s(a.page.total)+")")]):a._e()]),i("input",{attrs:{type:"checkbox"},on:{click:function(t){return a.checkAll(t)}}}),i("div",{staticClass:"btns"},[i("el-button",{attrs:{size:"mini",type:"primary",plain:""},on:{click:a.moveToOther}},[a._v("移动分组")]),i("el-button",{attrs:{size:"mini",type:"primary",plain:""},on:{click:a.importSomething}},[a._v("导入")]),i("el-button",{attrs:{size:"mini",type:"primary",plain:""},on:{click:a.exportSomething}},[a._v("导出")]),i("el-button",{attrs:{size:"mini",type:"primary",plain:""},on:{click:a.exportSomething2}},[a._v("全部导出")]),i("el-button",{attrs:{size:"mini",type:"primary",plain:""},on:{click:function(t){return a.delChoosen(!1)}}},[a._v("删除")])],1)])]),i("div",{staticClass:"mediaList"},[i("ul",a._l(a.list,function(e){return i("li",{staticClass:"itemWrap"},[i("div",{staticClass:"imgWrap"},[i("div",{staticClass:"name"},[i("span",[i("input",{ref:"ids",refInFor:!0,attrs:{type:"checkbox",name:"ids"},domProps:{value:e.id}})]),i("span",{attrs:{title:e.name},domProps:{textContent:a._s(e.name)}})]),i("div",{staticClass:"imgcontent",on:{click:function(t){return a.openDetailImgDialog(e)}}},[i("img",{attrs:{src:e.img_src}}),i("div",{staticClass:"cover"},[i("div",{staticClass:"tag"},[i("div",{staticClass:"div"},[a._v("标签:")]),i("div",{staticClass:"name"},[a._v(a._s(e.tag))])]),i("div",{staticClass:"time"},[a._v(a._s(e.create_time))])])])]),i("div",{staticClass:"btns"},[i("Icon",{attrs:{title:"详情",size:"mini",type:".icon-detail",plain:""},on:{click:function(t){return a.opneDetailDialog("xq",e)}}}),i("Icon",{attrs:{size:"mini",title:"链接",type:"icon-link",plain:""},on:{click:function(t){return a.opneImgLinkDialog(e)}}}),i("Icon",{attrs:{size:"mini",title:"扩展属性",type:"icon-data",plain:""},on:{click:function(t){return a.opneDetailDialog("data",e)}}}),i("Icon",{attrs:{size:"mini",title:"删除",type:"icon-delete",plain:""},on:{click:function(t){return a.delChoosen(e.id)}}})],1)])}),0)]),i("div",{staticClass:"pageWrap"},[i("el-pagination",{attrs:{small:!1,background:"","current-page":a.page.num,"page-sizes":[12,48,96],"page-size":a.page.offset,layout:"total, sizes, prev, pager, next, jumper",total:a.page.total},on:{"size-change":a.handleSizeChange,"current-change":a.handleCurrentChange}})],1)]):a._e()]),i("div",{staticClass:"gruopList"},[i("GroupList",{attrs:{groupList:a.groupList,currGroup:a.currGroup},on:{addGroup:a.addGroup,updateGroup:a.updateGroup,delGroup:a.delGroup,groupChange:a.groupChange}})],1)])])])]),a.detailImgDialog?i("div",{staticClass:"myDialogWrap"},[i("div",{staticClass:"content"},[i("span",{staticClass:"imgWrap"},[i("video",{attrs:{src:a.detailSrc.preview,poster:a.detailSrc.img,controls:""}}),i("span",{staticClass:"closeBtn",on:{click:function(t){a.detailImgDialog=!1}}})])])]):a._e(),i("div",{staticClass:"dialogs"},[i("el-dialog",{attrs:{center:!1,visible:a.detailDialog,"close-on-click-modal":!1,"lock-scroll":!0,top:"50px",width:"1000px"},on:{"update:visible":function(t){a.detailDialog=t}}},[i("div",{staticClass:"content",attrs:{slot:"title"},slot:"title"},[a.detailDialog?i("Detail",{attrs:{type:a.detailDialoaType,currGroup:a.currGroup,detailDialog:a.detailDialog,detailData:a.detailData||{}},on:{detailBack:a.detailBack,"update:detailDialog":function(t){a.detailDialog=t},"update:detail-dialog":function(t){a.detailDialog=t}}}):a._e()],1)]),i("el-dialog",{attrs:{center:!1,visible:a.uploadDialog,"close-on-click-modal":!1,top:"100px"},on:{"update:visible":function(t){a.uploadDialog=t}}},[i("div",{staticClass:"content",attrs:{slot:"title"},slot:"title"},[i("UploadAll",{ref:"upload",on:{upload:a.importFiles}})],1)]),i("el-dialog",{attrs:{center:!1,visible:a.publishDialog,"close-on-click-modal":!1,top:"50px",width:"1000px"},on:{"update:visible":function(t){a.publishDialog=t}}},[i("span",[a._v("发布内容")]),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(t){a.publishDialog=!1}}},[a._v("返回")])],1)]),a.imgLinkDialog?i("LinkDialog",{attrs:{imgLinkDialog:a.imgLinkDialog,imgSrc:a.linkDialogObj.img_src,link:a.linkDialogObj.link},on:{back:function(t){a.imgLinkDialog=!1}}}):a._e(),i("el-dialog",{attrs:{center:!1,visible:a.moveToOtherDiaolog,"close-on-click-modal":!1,title:"移动分组",width:"500px"},on:{"update:visible":function(t){a.moveToOtherDiaolog=t}}},[i("span",{}),i("div",{staticClass:"group"},[i("div",{staticClass:"label"},[a._v("移动到")]),i("select",{ref:"moveToId",staticClass:"form-control",attrs:{placeholder:"请选择"}},a._l(a.groupList,function(t,e){return t.id!=a.currGroup&&""!=t.id?i("option",{domProps:{value:t.id,textContent:a._s(t.name)}}):a._e()}),0)]),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{type:"info"},on:{click:function(t){a.moveToOtherDiaolog=!1}}},[a._v("返回")]),i("el-button",{attrs:{type:"primary"},on:{click:a.moveToSubmit}},[a._v(" 确定")])],1)])],1)],1)}var r=[];a.d(e,"a",function(){return i}),a.d(e,"b",function(){return r})},1395:function(t,e,a){"use strict";function i(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"div"},[e.percentage?a("UploadProgress",{attrs:{percentage:e.percentage}}):e._e(),e.detailReadOnly?a("el-button",{staticClass:"modifyBtn",attrs:{type:"primary",size:"small",plain:""},on:{click:function(t){e.detailReadOnly=!1}}},[e._v("修改")]):e._e(),a("el-tabs",{attrs:{value:e.type},on:{"tab-click":e.handleClick}},[a("el-tab-pane",{attrs:{label:"详情",name:"xq"}},[a("div",{staticClass:"div"},[a("VaForm",{ref:"detailFormVali"},[a("form",{ref:"detailForm",staticClass:"detailForm"},[a("fieldset",{attrs:{disabled:e.detailReadOnly}},[a("div",{staticClass:"group"},[a("div",{staticClass:"label"},[e._v("*名称:")]),a("input",{directives:[{name:"va",rawName:"v-va",value:{type:"required"},expression:"{ type:'required' }"},{name:"model",rawName:"v-model",value:e.detailDataOwn.name,expression:"detailDataOwn.name"}],staticClass:"form-control",attrs:{type:"text"},domProps:{value:e.detailDataOwn.name},on:{input:function(t){t.target.composing||e.$set(e.detailDataOwn,"name",t.target.value)}}})]),a("div",{staticClass:"group"},[a("div",{staticClass:"label"},[e._v("类型:")]),a("span",{staticClass:"types"},[a("span",{staticClass:"shallow-color",domProps:{textContent:e._s(e.mediaTypeName||"视频")}}),a("span",[e._v(" 创建时间:"),a("span",{staticClass:"shallow-color"},[e._v(e._s(e.detailDataOwn.create_time))])])])]),a("div",{staticClass:"group"},[a("div",{staticClass:"label"},[e._v("标签:")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.detailDataOwn.tag,expression:"detailDataOwn.tag"}],staticClass:"form-control",attrs:{type:"text"},domProps:{value:e.detailDataOwn.tag},on:{input:function(t){t.target.composing||e.$set(e.detailDataOwn,"tag",t.target.value)}}})]),a("div",{staticClass:"group"},[a("div",{staticClass:"label"},[e._v("简介:")]),a("textarea",{directives:[{name:"model",rawName:"v-model",value:e.detailDataOwn.abs,expression:"detailDataOwn.abs"}],staticClass:"textarea",attrs:{type:"text"},domProps:{value:e.detailDataOwn.abs},on:{input:function(t){t.target.composing||e.$set(e.detailDataOwn,"abs",t.target.value)}}})]),a("div",{staticClass:"group"},[a("div",{staticClass:"label"},[e._v("详情:")]),a("span",[a("span",[a("input",{directives:[{name:"model",rawName:"v-model",value:e.detailDataOwn.img_status,expression:"detailDataOwn.img_status"}],attrs:{type:"radio",name:"method"},domProps:{value:!1,checked:e._q(e.detailDataOwn.img_status,!1)},on:{change:function(t){return e.$set(e.detailDataOwn,"img_status",!1)}}}),e._v("本地")]),a("span",[a("input",{directives:[{name:"model",rawName:"v-model",value:e.detailDataOwn.img_status,expression:"detailDataOwn.img_status"}],attrs:{type:"radio",name:"method"},domProps:{value:!0,checked:e._q(e.detailDataOwn.img_status,!0)},on:{change:function(t){return e.$set(e.detailDataOwn,"img_status",!0)}}}),e._v("外链")])])]),"wailian"==e.detailType?a("div",{staticClass:"group wailianinput"},[a("div",{staticClass:"label"}),a("span",[a("input",{directives:[{name:"va",rawName:"v-va",value:{type:"required"},expression:"{type:'required'}"}],ref:"otherImgInput",staticClass:"form-control",attrs:{placeholder:"请输入链接"},domProps:{value:e.previewOtherFileUrl||e.detailDataOwn.preview},on:{input:e.otherFile}})])]):e._e(),a("div",{staticClass:"group"},[a("div",{staticClass:"label"},[e._v("封面")]),a("div",{staticClass:"coverBox"},[a("div",{staticClass:"left"},[a("span",{staticClass:"wrap"},[a("img",{staticClass:"coverImg",attrs:{src:e.previewImgUrl||e.detailDataOwn.img_src}})])]),a("div",{staticClass:"right"},["bendi"==e.detailType?a("div",{staticClass:"detailmain"},[a("span",{staticClass:"wrap"},[e.mediaType&&"voice"!=e.mediaType?a("video",{ref:"media",attrs:{src:e.previewMediaUrl||e.detailDataOwn.preview,controls:""}}):e._e(),e.mediaType&&"voice"==e.mediaType?a("audio",{ref:"media",attrs:{src:e.previewMediaUrl||e.detailDataOwn.preview,controls:""}}):e._e(),a("span",{staticClass:"msg"},[a("div",{staticClass:"type"},[e._v("格式:"),a("span",{staticClass:"val",domProps:{textContent:e._s(e.detailDataOwn.format)}})]),e.detailDataOwn.size?a("div",{staticClass:"size"},[e._v("大小:"),a("span",{staticClass:"val",domProps:{textContent:e._s((e.detailDataOwn.size/1024).toFixed(2)+"KB")}})]):e._e(),a("el-button",{attrs:{size:"mini",type:"primary",plain:""},on:{click:function(t){return e.$refs.meidaFile.click()}}},[e._v("导入")]),a("a",{attrs:{href:e.detailDataOwn.preview,target:"_black"}},[a("el-button",{attrs:{size:"mini",type:"primary",plain:""},on:{click:function(t){}}},[e._v("导出")])],1),a("el-button",{attrs:{size:"mini",type:"primary",plain:""},on:{click:function(t){return e.$refs.coverInput.click()}}},[e._v("上传封面")]),a("el-button",{attrs:{size:"mini",type:"primary",plain:""},on:{click:e.setDefaultCover}},[e._v(" 使用默认封面")])],1)])]):e._e(),"wailian"==e.detailType?a("div",{staticClass:"detailmain wailian"},[a("span",{staticClass:"wrap"},[e.mediaType&&"voice"!=e.mediaType?a("video",{ref:"media",attrs:{src:e.previewOtherFileUrl||e.detailDataOwn.preview,controls:""}}):e._e(),e.mediaType&&"voice"==e.mediaType?a("audio",{ref:"media",attrs:{src:e.previewOtherFileUrl||e.detailDataOwn.preview,controls:""}}):e._e(),a("span",{staticClass:"msg"},[a("div",{staticClass:"type"},[e._v("格式:"),a("span",{staticClass:"val",domProps:{textContent:e._s(e.fileMsg.format||e.detailDataOwn.format)}})]),a("el-button",{attrs:{size:"mini",type:"primary",plain:""},on:{click:function(t){return e.$refs.coverInput.click()}}},[e._v("上传封面")]),a("el-button",{attrs:{size:"mini",type:"primary",plain:""},on:{click:e.setDefaultCover}},[e._v(" 使用默认封面")])],1)])]):e._e()])])]),a("p",{staticClass:"imgSizeWrap"},[a("span",{staticClass:"imgSize"},[e._v("建议图片大小：250*140px")])]),a("div",{staticClass:"hide"},[a("input",{ref:"coverInput",staticClass:"hide",attrs:{type:"file",accept:e.$config.imgAccept},on:{change:e.previewImg}}),a("input",{ref:"meidaFile",staticClass:"hide",attrs:{type:"file",accept:e.mediaType&&"voice"==e.mediaType?e.$config.voiceAccept:e.$config.videoAccept},on:{change:e.previewMedia}})])])])])],1),a("div",{staticClass:"btns"},[a("el-button",{attrs:{type:"info"},on:{click:function(t){return e.$emit("update:detailDialog",!1)}}},[e._v("取消")]),e.detailReadOnly?e._e():a("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.submitDetail("detailForm")}}},[e._v("确定")])],1)]),a("el-tab-pane",{attrs:{label:"扩展属性",name:"data"}},[a("MetaData",{attrs:{metadata:e.metadata,readOnly:e.detailReadOnly},on:{submit:e.submitDetail,back:function(t){return e.$emit("update:detailDialog",!1)}}})],1)],1)],1)}var r=[];a.d(e,"a",function(){return i}),a.d(e,"b",function(){return r})},332:function(t,e,a){"use strict";a.r(e);var i=a(1379),r=a(785);for(var s in r)"default"!==s&&function(t){a.d(e,t,function(){return r[t]})}(s);a(1189);var n=a(0),l=Object(n.a)(r.default,i.a,i.b,!1,null,"60ef8cc5",null);e.default=l.exports},375:function(t,e,a){"use strict";a.r(e);var i=a(376),r=a.n(i);for(var s in i)"default"!==s&&function(t){a.d(e,t,function(){return i[t]})}(s);e.default=r.a},376:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:["groupList","currGroup"],data:function(){return{newGroupDialogOpen:!1,updateGroupDialogOpen:!1,currEditGroup:null}},created:function(){},computed:{},methods:{groupChange:function(t){this.$emit("groupChange",t)},addGroupDialog:function(){},delGroup:function(e){var a=this;this.$confirm("是否删除分组:"+e.name).then(function(t){dir(t),a.$emit("delGroup",e.id)}).catch(function(t){dir(t)})},updateGroupDialog:function(t){this.updateGroupDialogOpen=!0,this.currEditGroup=t},addGroup:function(){if(this.$refs.addGroupForm.valiAll()){var t=document.querySelector("#addGroupForm");this.$emit("addGroup",t),this.newGroupDialogOpen=!1}},updateGroup:function(){if(this.$refs.updateGroupForm.valiAll()){var t=document.querySelector("#updateGroupForm");this.$emit("updateGroup",t),this.updateGroupDialogOpen=!1}}}}},377:function(t,e,a){},384:function(t,e,a){"use strict";a.r(e);var i=a(386),r=a(375);for(var s in r)"default"!==s&&function(t){a.d(e,t,function(){return r[t]})}(s);a(385);var n=a(0),l=Object(n.a)(r.default,i.a,i.b,!1,null,"82bd0f98",null);e.default=l.exports},385:function(t,e,a){"use strict";var i=a(377);a.n(i).a},386:function(t,e,a){"use strict";function i(){var a=this,t=a.$createElement,i=a._self._c||t;return i("div",{staticClass:"div"},[i("div",{staticClass:"groupWrap"},[i("div",{staticClass:"list"},[i("ul",a._l(a.groupList,function(e){return i("li",{staticClass:"licontent",class:{red:e.id==a.currGroup}},[i("div",{staticClass:"name ellipsis",attrs:{title:e.name+"("+e.num+")"},on:{click:function(t){return a.groupChange(e.id)}}},[i("span",{staticClass:"title"},[a._v(a._s(e.name))]),i("span",[a._v(a._s("("+e.num+")"))])]),""!=e.id&&"non"!=e.id?i("div",{staticClass:"btns"},[i("span",{on:{click:function(t){return a.updateGroupDialog(e)}}},[i("i",{staticClass:"el-icon-edit"})]),i("span",{on:{click:function(t){return a.delGroup(e)}}},[i("i",{staticClass:"el-icon-delete"})])]):a._e()])}),0)]),i("div",{staticClass:"addGroupBtnWrap"},[i("el-button",{attrs:{type:"primary",plain:""},on:{click:function(t){a.newGroupDialogOpen=!0}}},[i("i",{staticClass:"el-icon-plus"},[a._v("新建分组")])])],1)]),i("div",{staticClass:"dialogs"},[a.newGroupDialogOpen?i("el-dialog",{attrs:{title:"新增",visible:a.newGroupDialogOpen,width:"500px"},on:{"update:visible":function(t){a.newGroupDialogOpen=t}}},[i("div",{staticClass:"formWrap"},[i("VaForm",{ref:"addGroupForm"},[i("form",{attrs:{id:"addGroupForm"}},[i("div",{staticClass:"group"},[i("input",{directives:[{name:"va",rawName:"v-va",value:{type:"required"},expression:"{ type:'required' }"}],staticClass:"form-control",attrs:{name:"name"}})])])])],1),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{type:"info"},on:{click:function(t){a.newGroupDialogOpen=!1}}},[a._v("取消")]),i("el-button",{attrs:{type:"primary"},on:{click:a.addGroup}},[a._v("确定")])],1)]):a._e(),a.updateGroupDialogOpen?i("el-dialog",{attrs:{title:"修改",visible:a.updateGroupDialogOpen,width:"500px"},on:{"update:visible":function(t){a.updateGroupDialogOpen=t}}},[i("div",{staticClass:"formWrap"},[i("VaForm",{ref:"updateGroupForm"},[a.currEditGroup?i("form",{attrs:{id:"updateGroupForm"}},[i("div",{staticClass:"group"},[i("input",{directives:[{name:"va",rawName:"v-va",value:{type:"required"},expression:"{ type:'required' }"}],staticClass:"form-control",attrs:{name:"name"},domProps:{value:a.currEditGroup.name}}),i("input",{staticClass:"hide",attrs:{name:"id"},domProps:{value:a.currEditGroup.id}})])]):a._e()])],1),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{type:"info"},on:{click:function(t){a.updateGroupDialogOpen=!1}}},[a._v("取消")]),i("el-button",{attrs:{type:"primary"},on:{click:a.updateGroup}},[a._v("确定")])],1)]):a._e()],1)])}var r=[];a.d(e,"a",function(){return i}),a.d(e,"b",function(){return r})},475:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.add=function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};return(0,r.request_post)(restUrl_publish+"/api/librariess_vr",t).then(function(t){var e=t.data,a=e._id,i=e.name,r=e.abs,s=e.author,n=e.tag,l=e.type_name;return(0,o.addResListener)({res_id:a,res_type:l,res_name:i,res_exp:r,res_author:s,res_lables:[n]}),t})},e.modify=function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{},e=t.id,a=l(t,["id"]),i=s.default.compile(restUrl_publish+"/api/librariess_vr/:id");return(0,r.request_put)(i({id:e}),a)},e.listLibraries=function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};return(0,r.request_get)(restUrl_publish+"/api/librariess_vr",t)},e.educe=function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};return(0,o.educeResListener)({res_url:(0,r.getFullPath)(restUrl_publish+"/api/librariess_vr/export"+i.default.stringify(t,{addQueryPrefix:!0}))}),(0,r.request_get)(restUrl_publish+"/api/librariess_vr/export",t)},e.putin=function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};return(0,r.request_post)(restUrl_publish+"/api/librariess_vr/import",t)},e.deleteLibraries=function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};return(0,r.request_post)(restUrl_publish+"/api/librariess_vr/delete",t)},e.detailLibraries=function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{},e=s.default.compile(restUrl_publish+"/api/librariess_vr/:id");return(0,r.request_get)(e(t))},e.modifyGroup=function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{},e=t.id,a=l(t,["id"]),i=s.default.compile(restUrl_publish+"/api/librariess_vr/groups/:id");return(0,r.request_put)(i({id:e}),a)},e.deleteGroup=function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};return(0,r.request_post)(restUrl_publish+"/api/librariess_vr/groups/delete",t)},e.addGroup=function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};return(0,r.request_post)(restUrl_publish+"/api/librariess_vr/groups",t)},e.listGroup=function(){return(0,r.request_get)(restUrl_publish+"/api/librariess_vr/groups")},e.moveGroup=function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};return(0,r.request_put)(restUrl_publish+"/api/librariess_vr/groups",t)};var r=a(7),i=n(a(10)),s=n(a(9)),o=a(85);function n(t){return t&&t.__esModule?t:{default:t}}function l(t,e){var a={};for(var i in t)0<=e.indexOf(i)||Object.prototype.hasOwnProperty.call(t,i)&&(a[i]=t[i]);return a}},785:function(t,e,a){"use strict";a.r(e);var i=a(786),r=a.n(i);for(var s in i)"default"!==s&&function(t){a.d(e,t,function(){return i[t]})}(s);e.default=r.a},786:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=p(a(5)),l=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var a=arguments[e];for(var i in a)Object.prototype.hasOwnProperty.call(a,i)&&(t[i]=a[i])}return t},r=(p(a(84)),p(a(158))),s=p(a(157)),n=p(a(161)),o=p(a(384)),u=p(a(1187)),c=function(t){{if(t&&t.__esModule)return t;var e={};if(null!=t)for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e.default=t,e}}(a(475)),d=a(126);function p(t){return t&&t.__esModule?t:{default:t}}e.default={mixins:[d.main],components:{Menu:r.default,Top:s.default,GroupList:o.default,Detail:u.default,UploadAll:n.default},data:function(){return{services:c,list:null,page:null,groupList:null,uploadDialog:!1,detailDialog:!1,detailDialoaType:"xq",detailData:{},timePick:null,imgLinkDialog:!1,publishDialog:!1,moveToOtherDiaolog:!1,moveIds:null,toId:null,detailImgDialog:!1,detailSrc:null}},methods:{getList:function(t,e,a){var i=0<arguments.length&&void 0!==t?t:this.page&&this.page.num||1,r=this,s=1<arguments.length&&void 0!==e?e:this.page&&this.page.offset||12,n=2<arguments.length&&void 0!==a?a:null;c.listLibraries(l({pageNum:i,pageOffset:s,group_id:this.currGroup},n)).then(function(t){log(33,t),r.list=t.data,r.page=t.page})},opneDetailDialog:function(t,e){this.detailDialog=!0,this.detailData=e,this.detailDialoaType=t},opneDetailDialogAdd:function(t){this.detailDialog=!0,this.detailDialoaType=t,this.detailData=null,this.metadata=null},copyLink:function(t){try{document.querySelector("#"+t).select();document.execCommand("copy"),this.$message.success("复制成功!")}catch(t){this.$message.error("请使用ctrl+c 实现复制")}},opnePublishDialog:function(t){this.detailData=t,this.publishDialog=!0},del:function(e){var a=this;return function(t){return function(){var l=t.apply(this,arguments);return new Promise(function(s,n){return function e(t,a){try{var i=l[t](a),r=i.value}catch(t){return void n(t)}if(!i.done)return Promise.resolve(r).then(function(t){e("next",t)},function(t){e("throw",t)});s(r)}("next")})}}(i.default.mark(function t(){return i.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",a.services.deleteLibraries(e));case 1:case"end":return t.stop()}},t,a)}))()},openDetailImgDialog:function(t){this.detailSrc=t,this.detailImgDialog=!0},clear:function(){document.getElementById("text").value=""},clear2:function(){document.getElementById("text2").value=""}}}},787:function(t,e,a){"use strict";a.r(e);var i=a(788),r=a.n(i);for(var s in i)"default"!==s&&function(t){a.d(e,t,function(){return i[t]})}(s);e.default=r.a},788:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=l(a(159)),r=(a(160),l(a(84)),function(t){{if(t&&t.__esModule)return t;var e={};if(null!=t)for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e.default=t,e}}(a(475))),s=l(a(128)),n=a(126);function l(t){return t&&t.__esModule?t:{default:t}}e.default={props:["type","detailData","detailDialog","currGroup","detailBack"],mixins:[n.detailVideo,n.getIconStyle],components:{UploadProgress:s.default,VaForm:i.default},created:function(){var e=this;this.detailData.id?(log("查询元数据, 目录 , 数据本地化"),r.detailLibraries({id:this.detailData.id}).then(function(t){log(t),e.detailDataOwn=t.data,e.metadata=t.data.attributes||[]}),"non"!=this.currGroup&&(this.detailDataOwn.group_id=this.currGroup)):this.metadata=this.detailDataOwn.attributes},data:function(){return{services:r,detailDataOwn:{img_status:!1,attributes:[]},metadata:[],previewImgUrl:null,previewMediaUrl:null,previewOtherFileUrl:null,imgUrl:null,fileMsg:{size:"",format:""},mediaFile:null,coverFile:null,percentage:0,mediaTypeName:"视频",mediaType:"video"}},computed:{detailType:function(){return this.detailDataOwn.img_status?"wailian":"bendi"}},methods:{}}},789:function(t,e,a){},790:function(t,e,a){}}]);