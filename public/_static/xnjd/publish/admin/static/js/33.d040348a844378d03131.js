(window.webpackJsonp=window.webpackJsonp||[]).push([[33],{1147:function(t,a,e){"use strict";var i=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"index clearfix"},[e("Top",{attrs:{currentPlant:"X-PUBLISH"}}),e("Menu",{attrs:{curr:"/contentLibrary/voices"}}),e("div",{staticClass:"mainRight"},[e("div",{staticClass:"contentWrap"},[e("div",{staticClass:"contentLeft"},[e("div",{staticClass:"maindata"},[e("div",{staticClass:"serachWrap",on:{keyup:function(a){if(!("button"in a)&&t._k(a.keyCode,"enter",13,a.key,"Enter"))return null;t.query()}}},[e("div",{staticClass:"title"}),e("form",{attrs:{id:"mainForm"}},[e("span",{staticClass:"group-inline"},[e("el-input",{attrs:{placeholder:"名称",name:"name",clearable:""}})],1),e("span",{staticClass:"group-inline"},[e("el-input",{attrs:{placeholder:"标签",name:"tag",clearable:""}})],1),e("span",{staticClass:"group-inline"},[e("TimePick",{attrs:{inputsName:["start_time","end_time"]}})],1),e("span",{staticClass:"group-inline float-right"},[e("el-button",{attrs:{size:"mediu",type:"primary",plain:"",icon:"el-icon-search"},on:{click:t.query}},[t._v("搜索")]),e("el-button",{attrs:{size:"mediu",type:"primary",icon:"el-icon-plus"},on:{click:function(a){t.opneDetailDialogAdd("xq",!0)}}},[t._v("新建")])],1)])]),e("div",{staticClass:"tableWrap"},[t.list?e("div",{staticClass:"div"},[e("div",{staticClass:"tableTop"},[e("div",{staticClass:"title vel-line"},[e("span",[t._v("全部 "),t.page?e("span",{staticClass:"totalNum"},[t._v("("+t._s(t.page.total)+")")]):t._e()]),e("input",{attrs:{type:"checkbox"},on:{click:function(a){t.checkAll(a)}}}),e("div",{staticClass:"btns"},[e("el-button",{attrs:{size:"mini",type:"primary",plain:""},on:{click:t.moveToOther}},[t._v("移动分组")]),e("el-button",{attrs:{size:"mini",type:"primary",plain:""},on:{click:t.importSomething}},[t._v("导入")]),e("el-button",{attrs:{size:"mini",type:"primary",plain:""},on:{click:t.exportSomething}},[t._v("导出")]),e("el-button",{attrs:{size:"mini",type:"primary",plain:""},on:{click:t.exportSomething2}},[t._v("全部导出")]),e("el-button",{attrs:{size:"mini",type:"primary",plain:""},on:{click:function(a){t.delChoosen(!1)}}},[t._v("删除")])],1)])]),e("div",{staticClass:"mediaList"},[e("ul",t._l(t.list,function(a){return e("li",{staticClass:"itemWrap"},[e("div",{staticClass:"imgWrap"},[e("div",{staticClass:"name"},[e("span",[e("input",{attrs:{type:"checkbox",name:"ids"},domProps:{value:a.id}})]),e("span",{attrs:{title:a.name},domProps:{textContent:t._s(a.name)}})]),e("div",{staticClass:"imgcontent",on:{click:function(e){t.openDetailImgDialog(a)}}},[e("img",{attrs:{src:a.img_src}}),e("div",{staticClass:"cover"},[e("div",{staticClass:"tag"},[e("div",{staticClass:"div"},[t._v("标签:")]),e("div",{staticClass:"name"},[t._v(t._s(a.tag))])]),e("div",{staticClass:"time"},[t._v(t._s(a.create_time))])])])]),e("div",{staticClass:"btns"},[e("span",{staticClass:"icon icon-detail",attrs:{title:"详情",size:"mini",type:"primary",plain:""},on:{click:function(e){t.opneDetailDialog("xq",a)}}}),e("span",{staticClass:"icon icon-link",attrs:{size:"mini",title:"链接",type:"primary",plain:""},on:{click:function(e){t.opneImgLinkDialog(a)}}}),e("span",{staticClass:"icon icon-data",attrs:{size:"mini",title:"元数据",type:"primary",plain:""},on:{click:function(e){t.opneDetailDialog("data",a)}}}),e("span",{staticClass:"icon icon-delete",attrs:{size:"mini",title:"删除",type:"primary",plain:""},on:{click:function(e){t.delChoosen(a.id)}}})])])}))]),e("div",{staticClass:"pageWrap"},[e("el-pagination",{attrs:{small:!1,background:"","current-page":t.page.num,"page-sizes":[12,48,96],"page-size":t.page.offset,layout:"total, sizes, prev, pager, next, jumper",total:t.page.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1)]):t._e()]),e("div",{staticClass:"gruopList"},[e("GroupList",{attrs:{groupList:t.groupList,currGroup:t.currGroup},on:{addGroup:t.addGroup,updateGroup:t.updateGroup,delGroup:t.delGroup,groupChange:t.groupChange}})],1)])])])]),t.detailImgDialog?e("div",{staticClass:"myDialogWrap"},[e("div",{staticClass:"content"},[e("span",{staticClass:"imgWrap"},[e("audio",{attrs:{src:t.detailSrc.preview,poster:t.detailSrc.img,controls:""}}),e("span",{staticClass:"closeBtn",on:{click:function(a){t.detailImgDialog=!1}}})])])]):t._e(),e("div",{staticClass:"dialogs"},[e("el-dialog",{attrs:{center:!1,visible:t.detailDialog,"close-on-click-modal":!1,"lock-scroll":!0,top:"50px",width:"1000px"},on:{"update:visible":function(a){t.detailDialog=a}}},[e("div",{staticClass:"content",attrs:{slot:"title"},slot:"title"},[t.detailDialog?e("Detail",{attrs:{type:t.detailDialoaType,currGroup:t.currGroup,detailDialog:t.detailDialog,detailData:t.detailData||{}},on:{detailBack:t.detailBack,"update:detailDialog":function(a){t.detailDialog=a}}}):t._e()],1)]),e("el-dialog",{attrs:{center:!1,visible:t.uploadDialog,"close-on-click-modal":!1,top:"100px"},on:{"update:visible":function(a){t.uploadDialog=a}}},[e("div",{staticClass:"content",attrs:{slot:"title"},slot:"title"},[e("UploadAll",{ref:"upload",on:{upload:t.importFiles}})],1)]),e("el-dialog",{attrs:{center:!1,visible:t.publishDialog,"close-on-click-modal":!1,top:"50px",width:"1000px"},on:{"update:visible":function(a){t.publishDialog=a}}},[e("span",[t._v("发布内容")]),e("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[e("el-button",{on:{click:function(a){t.publishDialog=!1}}},[t._v("返回")])],1)]),t.imgLinkDialog?e("LinkDialog",{attrs:{imgLinkDialog:t.imgLinkDialog,imgSrc:t.linkDialogObj.img_src,link:t.linkDialogObj.link},on:{back:function(a){t.imgLinkDialog=!1}}}):t._e(),e("el-dialog",{attrs:{center:!1,visible:t.moveToOtherDiaolog,"close-on-click-modal":!1,title:"移动分组",width:"500px"},on:{"update:visible":function(a){t.moveToOtherDiaolog=a}}},[e("span",{}),e("div",{staticClass:"group"},[e("div",{staticClass:"label"},[t._v("移动到")]),e("select",{ref:"moveToId",staticClass:"form-control",attrs:{placeholder:"请选择"}},t._l(t.groupList,function(a,i){return a.id!=t.currGroup&&""!=a.id?e("option",{domProps:{value:a.id,textContent:t._s(a.name)}}):t._e()}))]),e("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[e("el-button",{attrs:{type:"info"},on:{click:function(a){t.moveToOtherDiaolog=!1}}},[t._v("返回")]),e("el-button",{attrs:{type:"primary"},on:{click:t.moveToSubmit}},[t._v(" 确定")])],1)])],1)],1)},n=[];e.d(a,"a",function(){return i}),e.d(a,"b",function(){return n})},1168:function(t,a,e){"use strict";var i=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"div"},[t.percentage?e("UploadProgress",{attrs:{percentage:t.percentage}}):t._e(),t.detailReadOnly?e("el-button",{staticClass:"modifyBtn",attrs:{type:"primary",size:"small",plain:""},on:{click:function(a){t.detailReadOnly=!1}}},[t._v("修改")]):t._e(),e("el-tabs",{attrs:{value:t.type},on:{"tab-click":t.handleClick}},[e("el-tab-pane",{attrs:{label:"详情",name:"xq"}},[e("div",{staticClass:"div"},[e("VaForm",{ref:"detailFormVali"},[e("form",{ref:"detailForm",staticClass:"detailForm"},[e("fieldset",{attrs:{disabled:t.detailReadOnly}},[e("div",{staticClass:"group"},[e("div",{staticClass:"label"},[t._v("*名称:")]),e("input",{directives:[{name:"va",rawName:"v-va",value:{type:"required"},expression:"{ type:'required' }"},{name:"model",rawName:"v-model",value:t.detailDataOwn.name,expression:"detailDataOwn.name"}],staticClass:"form-control",attrs:{type:"text"},domProps:{value:t.detailDataOwn.name},on:{input:function(a){a.target.composing||t.$set(t.detailDataOwn,"name",a.target.value)}}})]),e("div",{staticClass:"group"},[e("div",{staticClass:"label"},[t._v("类型:")]),e("span",{staticClass:"types"},[e("span",{staticClass:"shallow-color",domProps:{textContent:t._s(t.mediaTypeName||"视频")}}),e("span",[t._v(" 创建时间:"),e("span",{staticClass:"shallow-color"},[t._v(t._s(t.detailDataOwn.create_time))])])])]),e("div",{staticClass:"group"},[e("div",{staticClass:"label"},[t._v("标签:")]),e("input",{directives:[{name:"model",rawName:"v-model",value:t.detailDataOwn.tag,expression:"detailDataOwn.tag"}],staticClass:"form-control",attrs:{type:"text"},domProps:{value:t.detailDataOwn.tag},on:{input:function(a){a.target.composing||t.$set(t.detailDataOwn,"tag",a.target.value)}}})]),e("div",{staticClass:"group"},[e("div",{staticClass:"label"},[t._v("简介:")]),e("textarea",{directives:[{name:"model",rawName:"v-model",value:t.detailDataOwn.abs,expression:"detailDataOwn.abs"}],staticClass:"textarea",attrs:{type:"text"},domProps:{value:t.detailDataOwn.abs},on:{input:function(a){a.target.composing||t.$set(t.detailDataOwn,"abs",a.target.value)}}})]),e("div",{staticClass:"group"},[e("div",{staticClass:"label"},[t._v("详情:")]),e("span",[e("span",[e("input",{directives:[{name:"model",rawName:"v-model",value:t.detailDataOwn.img_status,expression:"detailDataOwn.img_status"}],attrs:{type:"radio",name:"method"},domProps:{value:!1,checked:t._q(t.detailDataOwn.img_status,!1)},on:{change:function(a){t.$set(t.detailDataOwn,"img_status",!1)}}}),t._v("本地")]),e("span",[e("input",{directives:[{name:"model",rawName:"v-model",value:t.detailDataOwn.img_status,expression:"detailDataOwn.img_status"}],attrs:{type:"radio",name:"method"},domProps:{value:!0,checked:t._q(t.detailDataOwn.img_status,!0)},on:{change:function(a){t.$set(t.detailDataOwn,"img_status",!0)}}}),t._v("外链")])])]),"wailian"==t.detailType?e("div",{staticClass:"group wailianinput"},[e("div",{staticClass:"label"}),e("span",[e("input",{directives:[{name:"va",rawName:"v-va",value:{type:"required"},expression:"{type:'required'}"}],ref:"otherImgInput",staticClass:"form-control",attrs:{placeholder:"请输入链接"},domProps:{value:t.previewOtherFileUrl||t.detailDataOwn.preview},on:{input:t.otherFile}})])]):t._e(),e("div",{staticClass:"group"},[e("div",{staticClass:"label"},[t._v("封面")]),e("div",{staticClass:"coverBox"},[e("div",{staticClass:"left"},[e("span",{staticClass:"wrap"},[e("img",{staticClass:"coverImg",attrs:{src:t.previewImgUrl||t.detailDataOwn.img_src}})])]),e("div",{staticClass:"right"},["bendi"==t.detailType?e("div",{staticClass:"detailmain"},[e("span",{staticClass:"wrap"},[t.mediaType&&"voice"!=t.mediaType?e("video",{ref:"media",attrs:{src:t.previewMediaUrl||t.detailDataOwn.preview,controls:""}}):t._e(),t.mediaType&&"voice"==t.mediaType?e("audio",{ref:"media",attrs:{src:t.previewMediaUrl||t.detailDataOwn.preview,controls:""}}):t._e(),e("span",{staticClass:"msg"},[e("div",{staticClass:"type"},[t._v("格式:"),e("span",{staticClass:"val",domProps:{textContent:t._s(t.detailDataOwn.format)}})]),t.detailDataOwn.size?e("div",{staticClass:"size"},[t._v("大小:"),e("span",{staticClass:"val",domProps:{textContent:t._s((t.detailDataOwn.size/1024).toFixed(2)+"KB")}})]):t._e(),e("el-button",{attrs:{size:"mini",type:"primary",plain:""},on:{click:function(a){t.$refs.meidaFile.click()}}},[t._v("导入")]),e("a",{attrs:{href:t.detailDataOwn.preview,target:"_black"}},[e("el-button",{attrs:{size:"mini",type:"primary",plain:""},on:{click:function(t){}}},[t._v("导出")])],1),e("el-button",{attrs:{size:"mini",type:"primary",plain:""},on:{click:function(a){t.$refs.coverInput.click()}}},[t._v("上传封面")]),e("el-button",{attrs:{size:"mini",type:"primary",plain:""},on:{click:t.setDefaultCover}},[t._v(" 使用默认封面")])],1)])]):t._e(),"wailian"==t.detailType?e("div",{staticClass:"detailmain wailian"},[e("span",{staticClass:"wrap"},[t.mediaType&&"voice"!=t.mediaType?e("video",{ref:"media",attrs:{src:t.previewOtherFileUrl||t.detailDataOwn.preview,controls:""}}):t._e(),t.mediaType&&"voice"==t.mediaType?e("audio",{ref:"media",attrs:{src:t.previewOtherFileUrl||t.detailDataOwn.preview,controls:""}}):t._e(),e("span",{staticClass:"msg"},[e("div",{staticClass:"type"},[t._v("格式:"),e("span",{staticClass:"val",domProps:{textContent:t._s(t.fileMsg.format||t.detailDataOwn.format)}})]),e("el-button",{attrs:{size:"mini",type:"primary",plain:""},on:{click:function(a){t.$refs.coverInput.click()}}},[t._v("上传封面")]),e("el-button",{attrs:{size:"mini",type:"primary",plain:""},on:{click:t.setDefaultCover}},[t._v(" 使用默认封面")])],1)])]):t._e()])])]),e("p",{staticClass:"imgSizeWrap"},[e("span",{staticClass:"imgSize"},[t._v("建议图片大小：250*140px")])]),e("div",{staticClass:"hide"},[e("input",{ref:"coverInput",staticClass:"hide",attrs:{type:"file",accept:t.$config.imgAccept},on:{change:t.previewImg}}),e("input",{ref:"meidaFile",staticClass:"hide",attrs:{type:"file",accept:t.mediaType&&"voice"==t.mediaType?t.$config.voiceAccept:t.$config.videoAccept},on:{change:t.previewMedia}})])])])])],1),e("div",{staticClass:"btns"},[e("el-button",{attrs:{type:"info"},on:{click:function(a){t.$emit("update:detailDialog",!1)}}},[t._v("取消")]),t.detailReadOnly?t._e():e("el-button",{attrs:{type:"primary"},on:{click:function(a){t.submitDetail("detailForm")}}},[t._v("确定")])],1)]),e("el-tab-pane",{attrs:{label:"元数据",name:"data"}},[e("MetaData",{attrs:{metadata:t.metadata,readOnly:t.detailReadOnly},on:{submit:t.submitDetail,back:function(a){t.$emit("update:detailDialog",!1)}}})],1)],1)],1)},n=[];e.d(a,"a",function(){return i}),e.d(a,"b",function(){return n})},324:function(t,a,e){"use strict";e.r(a);var i=e(1147),n=e(651);for(var s in n)"default"!==s&&function(t){e.d(a,t,function(){return n[t]})}(s);e(906);var o=e(0),l=Object(o.a)(n.default,i.a,i.b,!1,null,"e0f77d40",null);l.options.__file="index.vue",a.default=l.exports},362:function(t,a,e){"use strict";e.r(a);var i=e(363),n=e.n(i);for(var s in i)"default"!==s&&function(t){e.d(a,t,function(){return i[t]})}(s);a.default=n.a},363:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.default={props:["groupList","currGroup"],data:function(){return{newGroupDialogOpen:!1,updateGroupDialogOpen:!1,currEditGroup:null}},created:function(){},computed:{},methods:{groupChange:function(t){this.$emit("groupChange",t)},addGroupDialog:function(){},delGroup:function(t){var a=this;this.$confirm("是否删除分组:"+t.name).then(function(e){dir(e),a.$emit("delGroup",t.id)}).catch(function(t){dir(t)})},updateGroupDialog:function(t){this.updateGroupDialogOpen=!0,this.currEditGroup=t},addGroup:function(){if(this.$refs.addGroupForm.valiAll()){var t=document.querySelector("#addGroupForm");this.$emit("addGroup",t),this.newGroupDialogOpen=!1}},updateGroup:function(){if(this.$refs.updateGroupForm.valiAll()){var t=document.querySelector("#updateGroupForm");this.$emit("updateGroup",t),this.updateGroupDialogOpen=!1}}}}},364:function(t,a,e){},365:function(t,a,e){"use strict";e.r(a);var i=e(370),n=e(362);for(var s in n)"default"!==s&&function(t){e.d(a,t,function(){return n[t]})}(s);e(366);var o=e(0),l=Object(o.a)(n.default,i.a,i.b,!1,null,"176cd962",null);l.options.__file="GroupList.vue",a.default=l.exports},366:function(t,a,e){"use strict";var i=e(364);e.n(i).a},370:function(t,a,e){"use strict";var i=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"div"},[e("div",{staticClass:"groupWrap"},[e("div",{staticClass:"list"},[e("ul",t._l(t.groupList,function(a){return e("li",{staticClass:"licontent",class:{red:a.id==t.currGroup}},[e("div",{staticClass:"name ellipsis",attrs:{title:a.name+"("+a.num+")"},on:{click:function(e){t.groupChange(a.id)}}},[e("span",{staticClass:"title"},[t._v(t._s(a.name))]),e("span",[t._v(t._s("("+a.num+")"))])]),""!=a.id&&"non"!=a.id?e("div",{staticClass:"btns"},[e("span",{on:{click:function(e){t.updateGroupDialog(a)}}},[e("i",{staticClass:"el-icon-edit"})]),e("span",{on:{click:function(e){t.delGroup(a)}}},[e("i",{staticClass:"el-icon-delete"})])]):t._e()])}))]),e("div",{staticClass:"addGroupBtnWrap"},[e("el-button",{attrs:{type:"primary",plain:""},on:{click:function(a){t.newGroupDialogOpen=!0}}},[e("i",{staticClass:"el-icon-plus"},[t._v("新建分组")])])],1)]),e("div",{staticClass:"dialogs"},[t.newGroupDialogOpen?e("el-dialog",{attrs:{title:"新增",visible:t.newGroupDialogOpen,width:"500px"},on:{"update:visible":function(a){t.newGroupDialogOpen=a}}},[e("div",{staticClass:"formWrap"},[e("VaForm",{ref:"addGroupForm"},[e("form",{attrs:{id:"addGroupForm"}},[e("div",{staticClass:"group"},[e("input",{directives:[{name:"va",rawName:"v-va",value:{type:"required"},expression:"{ type:'required' }"}],staticClass:"form-control",attrs:{name:"name"}})])])])],1),e("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[e("el-button",{attrs:{type:"info"},on:{click:function(a){t.newGroupDialogOpen=!1}}},[t._v("取消")]),e("el-button",{attrs:{type:"primary"},on:{click:t.addGroup}},[t._v("确定")])],1)]):t._e(),t.updateGroupDialogOpen?e("el-dialog",{attrs:{title:"修改",visible:t.updateGroupDialogOpen,width:"500px"},on:{"update:visible":function(a){t.updateGroupDialogOpen=a}}},[e("div",{staticClass:"formWrap"},[e("VaForm",{ref:"updateGroupForm"},[t.currEditGroup?e("form",{attrs:{id:"updateGroupForm"}},[e("div",{staticClass:"group"},[e("input",{directives:[{name:"va",rawName:"v-va",value:{type:"required"},expression:"{ type:'required' }"}],staticClass:"form-control",attrs:{name:"name"},domProps:{value:t.currEditGroup.name}}),e("input",{staticClass:"hide",attrs:{name:"id"},domProps:{value:t.currEditGroup.id}})])]):t._e()])],1),e("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[e("el-button",{attrs:{type:"info"},on:{click:function(a){t.updateGroupDialogOpen=!1}}},[t._v("取消")]),e("el-button",{attrs:{type:"primary"},on:{click:t.updateGroup}},[t._v("确定")])],1)]):t._e()],1)])},n=[];e.d(a,"a",function(){return i}),e.d(a,"b",function(){return n})},490:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.add=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,i.request_post)("/api/audios",t).then(function(t){var a=t.data,e=a._id,i=a.name,n=a.abs,s=a.author,l=a.tag,r=a.type_name;return(0,o.addResListener)({res_id:e,res_type:r,res_name:i,res_exp:n,res_author:s,res_lables:[l]}),t})},a.modify=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},a=t.id,e=r(t,["id"]);return(0,i.request_put)(u({id:a}),e)},a.listAudio=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,i.request_get)("/api/audios",t)},a.educe=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,o.educeResListener)({res_url:getFullPath("/api/audios/export"+s.default.stringify(t,{addQueryPrefix:!0}))}),(0,i.request_get)("/api/audios/export",t)},a.putin=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,i.request_post)("/api/audios/import",t)},a.deleteAudio=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,i.request_post)("/api/audios/delete",t)},a.detailAudio=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,i.request_get)(u(t),t)},a.modifyGroup=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},a=t.id,e=r(t,["id"]);return(0,i.request_put)(c({id:a}),e)},a.deleteGroup=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,i.request_post)("/api/audios/groups/delete",t)},a.addGroup=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,i.request_post)("/api/audios/groups",t)},a.listGroup=function(){return(0,i.request_get)("/api/audios/groups")},a.moveGroup=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,i.request_put)("/api/audios/groups",t)};var i=e(4),n=l(e(8)),s=l(e(12)),o=e(83);function l(t){return t&&t.__esModule?t:{default:t}}function r(t,a){var e={};for(var i in t)a.indexOf(i)>=0||Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e}var u=n.default.compile("/api/audios/:id"),c=n.default.compile("/api/audios/groups/:id")},651:function(t,a,e){"use strict";e.r(a);var i=e(652),n=e.n(i);for(var s in i)"default"!==s&&function(t){e.d(a,t,function(){return i[t]})}(s);a.default=n.a},652:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var i=v(e(3)),n=Object.assign||function(t){for(var a=1;a<arguments.length;a++){var e=arguments[a];for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])}return t},s=(v(e(82)),p(e(20)),v(e(155))),o=v(e(154)),l=v(e(157)),r=v(e(365)),u=v(e(904)),c=p(e(490)),d=e(122);function p(t){if(t&&t.__esModule)return t;var a={};if(null!=t)for(var e in t)Object.prototype.hasOwnProperty.call(t,e)&&(a[e]=t[e]);return a.default=t,a}function v(t){return t&&t.__esModule?t:{default:t}}a.default={mixins:[d.main],components:{Menu:s.default,Top:o.default,GroupList:r.default,Detail:u.default,UploadAll:l.default},data:function(){return{services:c,list:null,page:null,groupList:null,uploadDialog:!1,detailDialog:!1,detailDialoaType:"xq",detailData:{},timePick:null,imgLinkDialog:!1,publishDialog:!1,moveToOtherDiaolog:!1,moveIds:null,toId:null,detailImgDialog:!1,detailSrc:null}},methods:{getList:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.page&&this.page.num||1,a=this,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:this.page&&this.page.offset||48,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;c.listAudio(n({pageNum:t,pageOffset:e,group_id:this.currGroup},i)).then(function(t){log(33,t),a.list=t.data,a.page=t.page})},opneDetailDialog:function(t,a){this.detailDialog=!0,this.detailData=a,this.detailDialoaType=t},opneDetailDialogAdd:function(t){this.detailDialog=!0,this.detailDialoaType=t,this.detailData=null,this.metadata=null},opnePublishDialog:function(t){this.detailData=t,this.publishDialog=!0},getChecked:function(){var t=[],a=Array.from(document.querySelectorAll('input[name="ids"]:checked'));return a.forEach(function(a){t.push(a.value)}),a.length?t:(this.$message.error("请先选中!"),!1)},del:function(){var t,a=(t=i.default.mark(function t(a){return i.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",this.services.deleteAudio(a));case 1:case"end":return t.stop()}},t,this)}),function(){var a=t.apply(this,arguments);return new Promise(function(t,e){return function i(n,s){try{var o=a[n](s),l=o.value}catch(t){return void e(t)}if(!o.done)return Promise.resolve(l).then(function(t){i("next",t)},function(t){i("throw",t)});t(l)}("next")})});return function(t){return a.apply(this,arguments)}}(),openDetailImgDialog:function(t){this.detailSrc=t,this.detailImgDialog=!0},clear:function(){document.getElementById("text").value=""},clear2:function(){document.getElementById("text2").value=""}}}},653:function(t,a,e){"use strict";e.r(a);var i=e(654),n=e.n(i);for(var s in i)"default"!==s&&function(t){e.d(a,t,function(){return i[t]})}(s);a.default=n.a},654:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var i=l(e(158)),n=(e(156),l(e(82)),l(e(124))),s=function(t){if(t&&t.__esModule)return t;var a={};if(null!=t)for(var e in t)Object.prototype.hasOwnProperty.call(t,e)&&(a[e]=t[e]);return a.default=t,a}(e(490)),o=e(122);function l(t){return t&&t.__esModule?t:{default:t}}a.default={mixins:[o.detailVideo,o.getIconStyle],props:["type","detailData","detailDialog","currGroup","detailBack"],components:{UploadProgress:n.default,VaForm:i.default},created:function(){var t=this;this.detailData.id?(log("查询元数据, 目录 , 数据本地化"),s.detailAudio({id:this.detailData.id}).then(function(a){log(a),t.detailDataOwn=a.data,t.metadata=a.data.attributes||[]}),"non"!=this.currGroup&&(this.detailDataOwn.group_id=this.currGroup)):this.metadata=this.detailDataOwn.attributes},mounted:function(){},data:function(){return{services:s,detailDataOwn:{img_status:!1,attributes:[]},metadata:[],previewImgUrl:null,previewMediaUrl:null,previewOtherFileUrl:null,imgUrl:null,fileMsg:{size:"",format:""},mediaFile:null,coverFile:null,percentage:0,mediaType:"voice",mediaTypeName:"音频"}},computed:{detailType:function(){return this.detailDataOwn.img_status?"wailian":"bendi"}},methods:{}}},655:function(t,a,e){},656:function(t,a,e){},904:function(t,a,e){"use strict";e.r(a);var i=e(1168),n=e(653);for(var s in n)"default"!==s&&function(t){e.d(a,t,function(){return n[t]})}(s);e(905);var o=e(0),l=Object(o.a)(n.default,i.a,i.b,!1,null,"a18af996",null);l.options.__file="detail.vue",a.default=l.exports},905:function(t,a,e){"use strict";var i=e(655);e.n(i).a},906:function(t,a,e){"use strict";var i=e(656);e.n(i).a}}]);