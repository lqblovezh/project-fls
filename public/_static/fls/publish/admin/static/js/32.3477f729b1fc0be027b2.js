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
(window.webpackJsonp=window.webpackJsonp||[]).push([[32],{1219:function(t,e,n){"use strict";n.r(e);var i=n(1411),r=n(815);for(var a in r)"default"!==a&&function(t){n.d(e,t,function(){return r[t]})}(a);n(1220);var o=n(0),s=Object(o.a)(r.default,i.a,i.b,!1,null,"8be0d83e",null);e.default=s.exports},1220:function(t,e,n){"use strict";var i=n(820);n.n(i).a},1221:function(t,e,n){"use strict";var i=n(821);n.n(i).a},1373:function(t,e,n){"use strict";function i(){var n=this,t=n.$createElement,i=n._self._c||t;return i("div",{staticClass:"index clearfix"},[i("Top",{attrs:{currentPlant:"X-PUBLISH"}}),i("Menu",{attrs:{curr:"/contentLibrary/digitalBook"}}),i("div",{staticClass:"mainRight"},[i("div",{staticClass:"contentWrap"},[i("div",{staticClass:"contentLeft"},[i("div",{staticClass:"maindata"},[i("div",{staticClass:"serachWrap",on:{keyup:function(t){return!t.type.indexOf("key")&&n._k(t.keyCode,"enter",13,t.key,"Enter")?null:n.query()}}},[i("div",{staticClass:"title"}),i("form",{attrs:{id:"mainForm"}},[i("span",{staticClass:"group-inline"},[i("el-input",{attrs:{placeholder:"请输入名称",name:"name",clearable:""},model:{value:n.searchQuery.name,callback:function(t){n.$set(n.searchQuery,"name",t)},expression:"searchQuery.name"}})],1),i("span",{staticClass:"group-inline"},[i("TimePick",{attrs:{inputsName:["start_time","end_time"]}})],1),i("span",{staticClass:"group-inline"},[i("el-button",{attrs:{size:"mediu",type:"primary",icon:"el-icon-search",plain:""},on:{click:n.query}},[n._v("搜索")]),i("el-button",{attrs:{size:"mediu",type:"primary",icon:"el-icon-plus",plain:""},on:{click:function(t){return n.opneDetailDialog("xq")}}},[n._v("新建文本")])],1)])]),i("div",{staticClass:"tableWrap"},[i("div",{staticClass:"tableTop"},[i("div",{staticClass:"title vel-line"},[i("span",[n._v("全部 "),n.page?i("span",{staticClass:"totalNum"},[n._v("("+n._s(n.page.total)+")")]):n._e()]),i("div",{staticClass:"btns"},[i("el-button",{attrs:{size:"mini",type:"primary",plain:""},on:{click:n.moveToOther}},[n._v("移动分组")]),i("el-button",{attrs:{size:"mini",type:"primary",plain:""},on:{click:function(t){return n.delChoosen(!1)}}},[n._v("删除")])],1)])]),i("table",{staticClass:"table"},[i("thead",[i("tr",[i("th",{staticClass:"allBtn"},[i("input",{attrs:{type:"checkbox"},on:{click:function(t){return n.checkAll(t)}}})]),i("th",[n._v("名称")]),i("th",[n._v("标签")]),i("th",[n._v("大小")]),i("th",{staticClass:"time"},[n._v("创建时间")]),i("th",{staticClass:"operate"},[n._v("操作")])])]),n.list?i("tbody",n._l(n.list,function(e){return i("tr",[i("th",[i("input",{key:e.id,ref:"ids",refInFor:!0,attrs:{type:"checkbox",name:"ids"},domProps:{value:e.id}})]),i("th",[i("img",{staticClass:"cover-photo",attrs:{src:e.img_src}}),i("div",{staticClass:"th-name bookName",attrs:{title:e.name}},[n._v(n._s(e.name))])]),i("th",[i("div",{staticClass:"th-name",attrs:{title:e.tag}},[n._v(n._s(e.tag))])]),i("th",[i("div",{staticClass:"th-name",attrs:{title:e.author}},[n._v(n._s(e.author))])]),i("th",[i("div",{staticClass:"th-name"},[n._v(n._s(e.create_time))])]),i("th",[i("div",{staticClass:"btns"},[i("Icon",{attrs:{title:"详情",size:"mini",type:"icon-detail",plain:""},on:{click:function(t){return n.opneDetailDialog("xq",e)}}}),i("Icon",{attrs:{title:"删除",size:"mini",type:"icon-delete",plain:""},on:{click:function(t){return n.delChoosen(e.id)}}})],1)])])}),0):n._e()]),n.page?i("div",{staticClass:"pageWrap"},[i("el-pagination",{attrs:{small:!1,background:"","current-page":n.page.num,"page-sizes":[10,50,100],"page-size":n.page.offset,layout:"total, sizes, prev, pager, next, jumper",total:n.page.total},on:{"size-change":n.handleSizeChange,"current-change":n.handleCurrentChange}})],1):n._e()]),i("div",{staticClass:"gruopList"},[i("GroupList",{attrs:{groupList:n.groupList,currGroup:n.currGroup},on:{addGroup:n.addGroup,updateGroup:n.updateGroup,delGroup:n.delGroup,groupChange:n.groupChange}})],1)])])])]),i("div",{staticClass:"dialogs"},[i("el-dialog",{attrs:{center:!1,visible:n.detailDialog,"close-on-click-modal":!1,top:"50px",width:"1000px"},on:{"update:visible":function(t){n.detailDialog=t}}},[i("div",{staticClass:"content",attrs:{slot:"title"},slot:"title"},[n.detailDialog?i("Detail",{attrs:{type:n.detailDialogType,detailDialog:n.detailDialog,detailData:n.detailData},on:{detailBack:n.detailBack,"update:detailDialog":function(t){n.detailDialog=t},"update:detail-dialog":function(t){n.detailDialog=t}}}):n._e()],1)]),i("el-dialog",{attrs:{center:!1,visible:n.moveToOtherDiaolog,"close-on-click-modal":!1,title:"移动分组",width:"500px"},on:{"update:visible":function(t){n.moveToOtherDiaolog=t}}},[i("span",{}),i("div",{staticClass:"group"},[i("div",{staticClass:"label"},[n._v("移动到")]),i("select",{ref:"moveToId",staticClass:"form-control",attrs:{placeholder:"请选择"}},n._l(n.groupList,function(t,e){return t.id!=n.currGroup&&""!=t.id?i("option",{domProps:{value:t.id,textContent:n._s(t.name)}}):n._e()}),0)]),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{type:"primary"},on:{click:n.moveToSubmit}},[n._v(" 确定")]),i("el-button",{on:{click:function(t){n.moveToOtherDiaolog=!1}}},[n._v("返回")])],1)])],1)],1)}var r=[];n.d(e,"a",function(){return i}),n.d(e,"b",function(){return r})},1411:function(t,e,n){"use strict";function i(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"div"},[n("div",{staticClass:"dialogs"},[e.uploadDialog?n("el-dialog",{staticClass:"testclass",attrs:{center:!1,visible:e.uploadDialog,"close-on-click-modal":!1,top:"50px",width:"800px",title:"上传"+e.switchTypeName,"append-to-body":""},on:{"update:visible":function(t){e.uploadDialog=t}}},[n("UeUpload",{attrs:{ue:e.ue,type:e.uploadType},on:{cancle:function(t){e.uploadDialog=!1}}})],1):e._e()],1),e.detailReadOnly?n("el-button",{staticClass:"modifyBtn",attrs:{type:"primary",size:"small",plain:""},on:{click:function(t){e.detailReadOnly=!1}}},[e._v("修改")]):e._e(),n("el-tabs",{attrs:{value:e.type}},[n("el-tab-pane",{attrs:{label:"基本信息",name:"xq"}},[n("div",{staticClass:"div"},[n("VaForm",{ref:"detailForm"},[n("form",{ref:"detailForm",staticClass:"detailForm"},[n("fieldset",{attrs:{disabled:e.detailReadOnly}},[n("div",{staticClass:"group"},[n("div",{staticClass:"label"},[e._v("*内容名称:")]),n("input",{directives:[{name:"va",rawName:"v-va",value:{type:"required"},expression:"{ type:'required' }"},{name:"model",rawName:"v-model",value:e.detailDataOwn.name,expression:"detailDataOwn.name"}],staticClass:"form-control",attrs:{type:"text",maxlength:"20"},domProps:{value:e.detailDataOwn.name},on:{input:function(t){t.target.composing||e.$set(e.detailDataOwn,"name",t.target.value)}}})]),n("div",{staticClass:"group"},[n("div",{staticClass:"label"},[n("span",{staticClass:"types"},[e._v("类型:"),n("span",{staticClass:"shallow-color"})]),n("span",[e._v("大小："),n("span",{staticClass:"shallow-color"},[e._v(e._s(e.detailDataOwn.word_size))])]),n("span",[e._v(" 资源序号:"),n("span",{staticClass:"shallow-color"},[e._v(e._s(e.detailDataOwn.id))])]),n("span",[e._v(" 创建时间:"),n("span",{staticClass:"shallow-color"},[e._v(e._s(e.detailDataOwn.create_time))])])])]),n("div",{staticClass:"group"},[n("div",{staticClass:"label"},[e._v("*内容详情:")]),n("div",{staticClass:"editorWrap"},[n("div",{attrs:{id:"editor"}},[n("script",{staticStyle:{width:"1024px",height:"500px"},attrs:{id:"editor",type:"text/plain"}})])])])]),n("div",{staticClass:"btns"},[n("el-button",{attrs:{type:"info"},on:{click:function(t){return e.$emit("update:detailDialog",!1)}}},[e._v("取消")]),n("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.submitDetail()}}},[e._v("确定")])],1)])])],1)])],1)],1)}var r=[];n.d(e,"a",function(){return i}),n.d(e,"b",function(){return r})},337:function(t,e,n){"use strict";n.r(e);var i=n(1373),r=n(813);for(var a in r)"default"!==a&&function(t){n.d(e,t,function(){return r[t]})}(a);n(1221);var o=n(0),s=Object(o.a)(r.default,i.a,i.b,!1,null,"6ed0fcd6",null);e.default=s.exports},375:function(t,e,n){"use strict";n.r(e);var i=n(376),r=n.n(i);for(var a in i)"default"!==a&&function(t){n.d(e,t,function(){return i[t]})}(a);e.default=r.a},376:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:["groupList","currGroup"],data:function(){return{newGroupDialogOpen:!1,updateGroupDialogOpen:!1,currEditGroup:null}},created:function(){},computed:{},methods:{groupChange:function(t){this.$emit("groupChange",t)},addGroupDialog:function(){},delGroup:function(e){var n=this;this.$confirm("是否删除分组:"+e.name).then(function(t){dir(t),n.$emit("delGroup",e.id)}).catch(function(t){dir(t)})},updateGroupDialog:function(t){this.updateGroupDialogOpen=!0,this.currEditGroup=t},addGroup:function(){if(this.$refs.addGroupForm.valiAll()){var t=document.querySelector("#addGroupForm");this.$emit("addGroup",t),this.newGroupDialogOpen=!1}},updateGroup:function(){if(this.$refs.updateGroupForm.valiAll()){var t=document.querySelector("#updateGroupForm");this.$emit("updateGroup",t),this.updateGroupDialogOpen=!1}}}}},377:function(t,e,n){},384:function(t,e,n){"use strict";n.r(e);var i=n(386),r=n(375);for(var a in r)"default"!==a&&function(t){n.d(e,t,function(){return r[t]})}(a);n(385);var o=n(0),s=Object(o.a)(r.default,i.a,i.b,!1,null,"82bd0f98",null);e.default=s.exports},385:function(t,e,n){"use strict";var i=n(377);n.n(i).a},386:function(t,e,n){"use strict";function i(){var n=this,t=n.$createElement,i=n._self._c||t;return i("div",{staticClass:"div"},[i("div",{staticClass:"groupWrap"},[i("div",{staticClass:"list"},[i("ul",n._l(n.groupList,function(e){return i("li",{staticClass:"licontent",class:{red:e.id==n.currGroup}},[i("div",{staticClass:"name ellipsis",attrs:{title:e.name+"("+e.num+")"},on:{click:function(t){return n.groupChange(e.id)}}},[i("span",{staticClass:"title"},[n._v(n._s(e.name))]),i("span",[n._v(n._s("("+e.num+")"))])]),""!=e.id&&"non"!=e.id?i("div",{staticClass:"btns"},[i("span",{on:{click:function(t){return n.updateGroupDialog(e)}}},[i("i",{staticClass:"el-icon-edit"})]),i("span",{on:{click:function(t){return n.delGroup(e)}}},[i("i",{staticClass:"el-icon-delete"})])]):n._e()])}),0)]),i("div",{staticClass:"addGroupBtnWrap"},[i("el-button",{attrs:{type:"primary",plain:""},on:{click:function(t){n.newGroupDialogOpen=!0}}},[i("i",{staticClass:"el-icon-plus"},[n._v("新建分组")])])],1)]),i("div",{staticClass:"dialogs"},[n.newGroupDialogOpen?i("el-dialog",{attrs:{title:"新增",visible:n.newGroupDialogOpen,width:"500px"},on:{"update:visible":function(t){n.newGroupDialogOpen=t}}},[i("div",{staticClass:"formWrap"},[i("VaForm",{ref:"addGroupForm"},[i("form",{attrs:{id:"addGroupForm"}},[i("div",{staticClass:"group"},[i("input",{directives:[{name:"va",rawName:"v-va",value:{type:"required"},expression:"{ type:'required' }"}],staticClass:"form-control",attrs:{name:"name"}})])])])],1),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{type:"info"},on:{click:function(t){n.newGroupDialogOpen=!1}}},[n._v("取消")]),i("el-button",{attrs:{type:"primary"},on:{click:n.addGroup}},[n._v("确定")])],1)]):n._e(),n.updateGroupDialogOpen?i("el-dialog",{attrs:{title:"修改",visible:n.updateGroupDialogOpen,width:"500px"},on:{"update:visible":function(t){n.updateGroupDialogOpen=t}}},[i("div",{staticClass:"formWrap"},[i("VaForm",{ref:"updateGroupForm"},[n.currEditGroup?i("form",{attrs:{id:"updateGroupForm"}},[i("div",{staticClass:"group"},[i("input",{directives:[{name:"va",rawName:"v-va",value:{type:"required"},expression:"{ type:'required' }"}],staticClass:"form-control",attrs:{name:"name"},domProps:{value:n.currEditGroup.name}}),i("input",{staticClass:"hide",attrs:{name:"id"},domProps:{value:n.currEditGroup.id}})])]):n._e()])],1),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{type:"info"},on:{click:function(t){n.updateGroupDialogOpen=!1}}},[n._v("取消")]),i("el-button",{attrs:{type:"primary"},on:{click:n.updateGroup}},[n._v("确定")])],1)]):n._e()],1)])}var r=[];n.d(e,"a",function(){return i}),n.d(e,"b",function(){return r})},436:function(t,e,n){"use strict";n.r(e);var i=n(437),r=n.n(i);for(var a in i)"default"!==a&&function(t){n.d(e,t,function(){return i[t]})}(a);e.default=r.a},437:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=o(n(5)),r=function(t){{if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e.default=t,e}}(n(25)),a=o(n(128));function o(t){return t&&t.__esModule?t:{default:t}}e.default={components:{Progress:a.default},props:["ue","type"],created:function(){this.ue},mounted:function(){},data:function(){return{showImgUrl:null,localUrl:null,linkUrl:null,file:null,percentage:0,fileUrl:null,importType:"local"}},computed:{accept:function(){var t=this.type+"Accept";return this.$config[t]},command:function(){var t=this.type+"Command";return this.$config[t]}},methods:{showImgLocal:function(t){var e=t.target.files[0];e&&(this.file=e,this.localUrl=URL.createObjectURL(e))},back:function(){this.$emit("cancle")},commit:function(){var n=this;return function(t){return function(){var s=t.apply(this,arguments);return new Promise(function(a,o){return function e(t,n){try{var i=s[t](n),r=i.value}catch(t){return void o(t)}if(!i.done)return Promise.resolve(r).then(function(t){e("next",t)},function(t){e("throw",t)});a(r)}("next")})}}(i.default.mark(function t(){var e;return i.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if("local"!=n.importType){t.next=10;break}if(n.file)return e=n.$progress(),t.next=5,r.getTask(n.file,{is_chunk:!0,size:1048576},function(t){e.percentage=t}).then(function(t){n.fileUrl=t.data.url,n.ue.execCommand(n.command,{src:t.data.url,url:t.data.url}),e.close(),n.back()});t.next=7;break;case 5:t.next=8;break;case 7:n.$message.error("请先选择文件!");case 8:t.next=11;break;case 10:"link"==n.importType&&(n.ue.execCommand(n.command,{src:n.linkUrl,url:n.linkUrl}),n.back());case 11:case"end":return t.stop()}},t,n)}))()}}}},438:function(t,e,n){},452:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.debrisList=function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};return(0,r.request_get)(restUrl_publish+"/api/chapters",t)},e.addDebris=function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};return(0,r.request_post)(restUrl_publish+"/api/chapters",t)},e.modifyDebris=function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{},e=o.default.compile(restUrl_publish+"/api/chapters/:id");return(0,r.request_put)(e(t),t)},e.publishWork=function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{},e=o.default.compile(restUrl_publish+"/api/chapters/books");return(0,r.request_post)(e(t),t)},e.deleteDbris=function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};return(0,r.request_post)(restUrl_publish+"/api/chapters/delete",t)},e.detailDebris=function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{},e=t.id,n=s(t,["id"]),i=o.default.compile(restUrl_publish+"/api/chapters/:id");return(0,r.request_get)(i({id:e}),n)},e.listGroup=function(){return(0,r.request_get)(restUrl_publish+"/api/chapters/groups")},e.addGroup=function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};return(0,r.request_post)(restUrl_publish+"/api/chapters/groups",t)},e.modifyGroup=function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{},e=t.id,n=s(t,["id"]),i=o.default.compile(restUrl_publish+"/api/chapters/groups/:id");return(0,r.request_put)(i({id:e}),n)},e.deleteGroup=function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{},e=t.id,n=s(t,["id"]),i=o.default.compile(restUrl_publish+"/api/chapters/groups/:id");return(0,r.request_delete)(i({id:e}),n)},e.moveGroup=function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};return(0,r.request_put)(restUrl_publish+"/api/groups/chapters",t)};var i,r=n(7),a=n(9),o=(i=a)&&i.__esModule?i:{default:i};function s(t,e){var n={};for(var i in t)0<=e.indexOf(i)||Object.prototype.hasOwnProperty.call(t,i)&&(n[i]=t[i]);return n}},562:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.imgUploadBtn=function(t,e,n){UE.registerUI("img-upload-btn",function(e,n){e.registerCommand(n,{execCommand:function(){t.openUploadDialog("img")}});var i=new UE.ui.Button({name:n,title:n,cssRules:"background-position: -380px 0;",onclick:function(){e.execCommand(n)}});return e.addListener("selectionchange",function(){var t=e.queryCommandState(n);-1==t?(i.setDisabled(!0),i.setChecked(!1)):(i.setDisabled(!1),i.setChecked(t))}),i},e,n)},e.videoUploadBtn=function(t,e,n){UE.registerUI("video-upload-btn",function(e,n){e.registerCommand(n,{execCommand:function(){t.openUploadDialog("video")}});var i=new UE.ui.Button({name:n,title:n,cssRules:"background-position: -320px -20px;",onclick:function(){e.execCommand(n)}});return e.addListener("selectionchange",function(){var t=e.queryCommandState(n);-1==t?(i.setDisabled(!0),i.setChecked(!1)):(i.setDisabled(!1),i.setChecked(t))}),i},e,n)},e.voiceUploadBtn=function(t,e,n){UE.registerUI("voice-upload-btn",function(e,n){e.registerCommand(n,{execCommand:function(){t.openUploadDialog("voice")}});var i=new UE.ui.Button({name:n,title:n,cssRules:"background-position: -18px -40px;",onclick:function(){e.execCommand(n)}});return e.addListener("selectionchange",function(){var t=e.queryCommandState(n);-1==t?(i.setDisabled(!0),i.setChecked(!1)):(i.setDisabled(!1),i.setChecked(t))}),i},e,n)}},563:function(t,e,n){"use strict";n.r(e);var i=n(569),r=n(436);for(var a in r)"default"!==a&&function(t){n.d(e,t,function(){return r[t]})}(a);n(564);var o=n(0),s=Object(o.a)(r.default,i.a,i.b,!1,null,"d1e1d4f8",null);e.default=s.exports},564:function(t,e,n){"use strict";var i=n(438);n.n(i).a},569:function(t,e,n){"use strict";function i(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"div"},[n("div",{staticClass:"wrap"},[n("form",{staticClass:"detailForm"},[n("div",{staticClass:"group"},[n("div",{staticClass:"label"},[e._v("导入方式:")]),n("span",[n("span",[n("input",{directives:[{name:"model",rawName:"v-model",value:e.importType,expression:"importType"}],attrs:{type:"radio",name:"methd",value:"local"},domProps:{checked:e._q(e.importType,"local")},on:{change:function(t){e.importType="local"}}}),e._v("本地")]),n("span",[n("input",{directives:[{name:"model",rawName:"v-model",value:e.importType,expression:"importType"}],attrs:{type:"radio",name:"methd",value:"link"},domProps:{checked:e._q(e.importType,"link")},on:{change:function(t){e.importType="link"}}}),e._v("外链")])])]),"local"==e.importType?n("div",{staticClass:"local"},[n("div",{staticClass:"group"},[n("div",{staticClass:"label"}),n("el-button",{attrs:{type:"primary",size:"small",plain:""},on:{click:function(t){return e.$refs.media.click()}}},[e._v("选择")]),n("input",{ref:"media",staticClass:"hide",attrs:{type:"file",accept:e.accept},on:{change:e.showImgLocal}})],1),n("div",{staticClass:"group"},[n("div",{staticClass:"label"}),n("span",{staticClass:"imgShow"},["img"==e.type&&e.localUrl?n("img",{attrs:{src:e.localUrl}}):e._e(),"video"==e.type&&e.localUrl?n("video",{attrs:{src:e.localUrl,controls:""}}):e._e(),"audio"==e.type&&e.localUrl?n("audio",{attrs:{src:e.localUrl,controls:""}}):e._e()])])]):e._e(),"link"==e.importType?n("div",{staticClass:"link"},[n("div",{staticClass:"group"},[n("div",{staticClass:"label"},[e._v("外链")]),n("input",{directives:[{name:"model",rawName:"v-model",value:e.linkUrl,expression:"linkUrl"}],ref:"link",staticClass:"short form-control",domProps:{value:e.linkUrl},on:{input:function(t){t.target.composing||(e.linkUrl=t.target.value)}}})]),n("div",{staticClass:"group"},[n("div",{staticClass:"label"}),n("span",{staticClass:"imgShow"},["img"==e.type&&e.linkUrl?n("img",{attrs:{src:e.linkUrl}}):e._e(),"video"==e.type&&e.linkUrl?n("video",{attrs:{src:e.linkUrl,controls:""}}):e._e(),"audio"==e.type&&e.linkUrl?n("audio",{attrs:{src:e.linkUrl,controls:""}}):e._e()])])]):e._e()])]),n("div",{staticClass:"btns"},[n("el-button",{attrs:{type:"info"},on:{click:e.back}},[e._v("取消")]),n("el-button",{attrs:{type:"primary"},on:{click:e.commit}},[e._v("确定")])],1)])}var r=[];n.d(e,"a",function(){return i}),n.d(e,"b",function(){return r})},813:function(t,e,n){"use strict";n.r(e);var i=n(814),r=n.n(i);for(var a in i)"default"!==a&&function(t){n.d(e,t,function(){return i[t]})}(a);e.default=r.a},814:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=v(n(5)),s=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(t[i]=n[i])}return t},a=v(n(84)),i=(m(n(19)),v(n(158))),o=v(n(157)),l=v(n(161)),u=v(n(420)),c=v(n(384)),p=v(n(1219)),d=n(126),f=m(n(452));function m(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e.default=t,e}function v(t){return t&&t.__esModule?t:{default:t}}e.default={components:{Menu:i.default,Top:o.default,Detail:p.default,GroupList:c.default,Reader:u.default,UploadAll:l.default},mixins:[d.main],data:function(){return{services:f,list:null,readerDialog:!1,readerId:"",page:null,recomId:null,groupList:null,uploadDialog:!1,detailDialog:!1,detailDialogType:"xq",detailData:null,timePick:null,imgLinkDialog:!1,publishDialog:!1,moveToOtherDiaolog:!1,moveIds:null,toId:null,fabuIds:[],tableData:[],detailType:{list:[{name:"文本",value:"0"},{name:"图片",value:"1"}]}}},methods:{getList:function(t,e,n){var i=0<arguments.length&&void 0!==t?t:this.page&&this.page.num||1,r=this,a=1<arguments.length&&void 0!==e?e:this.page&&this.page.offset||10,o=2<arguments.length&&void 0!==n?n:null;this.services.debrisList(s({pageNum:i,pageOffset:a,group_id:this.currGroup},o)).then(function(t){r.list=t.data,r.page=t.page})},opneDetailDialog:function(t,e){this.detailData=e||null,this.detailDialogType=t,this.detailDialog=!0},addDebris:function(t,e){this.detailDialog=!0,this.detailDialogType=e,this.detailData=null,this.metadata=null},delGroup:function(e){var n=this;this.services.deleteGroup({id:e}).then(function(t){e===n.currGroup&&n.$router.push({path:n.$route.path,query:{id:"non"}}),n.getGroupList()})},releaseBack:function(t){this.publishDialog=!1},openReader:function(t){this.readerId=t.id,this.readerDialog=!0},del:function(n){var i=this;return function(t){return function(){var s=t.apply(this,arguments);return new Promise(function(a,o){return function e(t,n){try{var i=s[t](n),r=i.value}catch(t){return void o(t)}if(!i.done)return Promise.resolve(r).then(function(t){e("next",t)},function(t){e("throw",t)});a(r)}("next")})}}(r.default.mark(function t(){return r.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",i.services.deleteDbris(n).then(function(t){}).catch(function(t){var e=t.payload;"204001"==e.code?i.$confirm(e.message,"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){i.services.deleteDbris(s({confirm:"1"},n)).then(function(t){var e=(0,a.default)(document.querySelector("#mainForm"),{hash:!0});i.getList(i.page.num,i.page.offset,e),i.getGroupList()})}).catch(function(){}):i.$message.error(e.message)}));case 1:case"end":return t.stop()}},t,i)}))()},products:function(t){var i=this;this.services.products({id:t}).then(function(t){i.$message.success("生成成功!")}).catch(function(t){var e=t.payload;for(var n in e.messages){i.$message.error(e.messages[n]);break}})}}}},815:function(t,e,n){"use strict";n.r(e);var i=n(816),r=n.n(i);for(var a in i)"default"!==a&&function(t){n.d(e,t,function(){return i[t]})}(a);e.default=r.a},816:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=c(n(5)),a=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(t[i]=n[i])}return t},o=(u(n(25)),u(n(452))),i=n(126),s=(c(n(84)),n(562)),l=c(n(563));n(817);function u(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e.default=t,e}function c(t){return t&&t.__esModule?t:{default:t}}function p(t){return function(){var s=t.apply(this,arguments);return new Promise(function(a,o){return function e(t,n){try{var i=s[t](n),r=i.value}catch(t){return void o(t)}if(!i.done)return Promise.resolve(r).then(function(t){e("next",t)},function(t){e("throw",t)});a(r)}("next")})}}e.default={props:["type","detailData","detailDialog"],components:{UeUpload:l.default},created:function(){this.detailData?this.getDetail():this.metadata=this.detailDataOwn.attributes},mixins:[i.getIconStyle],data:function(){return{detailDataOwn:{},metadata:[],uploadDialog:!1,testDialog:!1,uploadType:"img",ue:null}},mounted:function(){var e=this;return p(r.default.mark(function t(){return r.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.getDetail();case 2:e.UeUploadBtn(),e.ue=UE.getEditor("editor"),e.ue.addListener("ready",function(){e.ueIsReady=!0,e.ue.setHeight(350),e.ue.execCommand("insertHtml",e.detailDataOwn.text)});case 5:case"end":return t.stop()}},t,e)}))()},destroyed:function(){this.ue.destroy()},methods:{UeUploadBtn:function(){(0,s.imgUploadBtn)(this,null,"editor"),(0,s.videoUploadBtn)(this,"","editor"),(0,s.voiceUploadBtn)(this,"","editor")},getDetail:function(){var e=this;if(this.detailData&&this.detailData.id)return o.detailDebris({id:this.detailData.id}).then(function(t){e.detailDataOwn=t.data,t.data.attributes||(t.data.attributes=[]),e.metadata=t.data.attributes})},openUploadDialog:function(t){this.uploadType=t,this.uploadDialog=!0,this.uploadDialog},submitDetail:function(){var i=this;return p(r.default.mark(function t(){var e,n;return r.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(i.$refs.detailForm.valiAll()){t.next=3;break}return t.abrupt("return");case 3:if(t.prev=3,i.detailDataOwn.id)return t.next=7,o.modifyDebris(a({},i.detailDataOwn,{text:i.ue.getContent()}));t.next=9;break;case 7:t.next=11;break;case 9:return t.next=11,o.addDebris(a({},i.detailDataOwn,{text:i.ue.getContent()}));case 11:i.$emit("detailBack"),t.next=24;break;case 14:t.prev=14,t.t0=t.catch(3),e=t.t0.payload,t.t1=r.default.keys(e.messages);case 18:if((t.t2=t.t1()).done){t.next=24;break}return n=t.t2.value,i.$message.error(e.messages[n]),t.abrupt("break",24);case 24:case"end":return t.stop()}},t,i,[[3,14]])}))()},submitMetadata:function(){}},computed:{switchTypeName:function(){switch(this.uploadType){case"img":return"图片";case"video":return"视频";case"voice":return"音乐"}}},watch:{ueIsReady:function(){}}}},817:function(t,j,T){"use strict";(function(o){var e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},n=Object.getOwnPropertyDescriptors||function(t){for(var e=Object.keys(t),n={},i=0;i<e.length;i++)n[e[i]]=Object.getOwnPropertyDescriptor(t,e[i]);return n},s=/%[sdj%]/g;j.format=function(t){if(!b(t)){for(var e=[],n=0;n<arguments.length;n++)e.push(l(arguments[n]));return e.join(" ")}n=1;for(var i=arguments,r=i.length,a=String(t).replace(s,function(t){if("%%"===t)return"%";if(r<=n)return t;switch(t){case"%s":return String(i[n++]);case"%d":return Number(i[n++]);case"%j":try{return JSON.stringify(i[n++])}catch(t){return"[Circular]"}default:return t}}),o=i[n];n<r;o=i[++n])h(o)||!u(o)?a+=" "+o:a+=" "+l(o);return a},j.deprecate=function(t,e){if(void 0!==o&&!0===o.noDeprecation)return t;if(void 0===o)return function(){return j.deprecate(t,e).apply(this,arguments)};var n=!1;return function(){if(!n){if(o.throwDeprecation)throw new Error(e);o.traceDeprecation?console.trace(e):console.error(e),n=!0}return t.apply(this,arguments)}};var t,i={};function l(t,e){var n={seen:[],stylize:a};return 3<=arguments.length&&(n.depth=arguments[2]),4<=arguments.length&&(n.colors=arguments[3]),g(e)?n.showHidden=e:e&&j._extend(n,e),_(n.showHidden)&&(n.showHidden=!1),_(n.depth)&&(n.depth=2),_(n.colors)&&(n.colors=!1),_(n.customInspect)&&(n.customInspect=!0),n.colors&&(n.stylize=r),d(n,t,n.depth)}function r(t,e){var n=l.styles[e];return n?"["+l.colors[n][0]+"m"+t+"["+l.colors[n][1]+"m":t}function a(t,e){return t}function d(e,n,i){if(e.customInspect&&n&&w(n.inspect)&&n.inspect!==j.inspect&&(!n.constructor||n.constructor.prototype!==n)){var t=n.inspect(i,e);return b(t)||(t=d(e,t,i)),t}var r=function(t,e){if(_(e))return t.stylize("undefined","undefined");if(b(e)){var n="'"+JSON.stringify(e).replace(/^"|"$/g,"").replace(/'/g,"\\'").replace(/\\"/g,'"')+"'";return t.stylize(n,"string")}if(y(e))return t.stylize(""+e,"number");if(g(e))return t.stylize(""+e,"boolean");if(h(e))return t.stylize("null","null")}(e,n);if(r)return r;var a=Object.keys(n),o=function(t){var n={};return t.forEach(function(t,e){n[t]=!0}),n}(a);if(e.showHidden&&(a=Object.getOwnPropertyNames(n)),k(n)&&(0<=a.indexOf("message")||0<=a.indexOf("description")))return f(n);if(0===a.length){if(w(n)){var s=n.name?": "+n.name:"";return e.stylize("[Function"+s+"]","special")}if(C(n))return e.stylize(RegExp.prototype.toString.call(n),"regexp");if(D(n))return e.stylize(Date.prototype.toString.call(n),"date");if(k(n))return f(n)}var l,u="",c=!1,p=["{","}"];v(n)&&(c=!0,p=["[","]"]),w(n)&&(u=" [Function"+(n.name?": "+n.name:"")+"]");return C(n)&&(u=" "+RegExp.prototype.toString.call(n)),D(n)&&(u=" "+Date.prototype.toUTCString.call(n)),k(n)&&(u=" "+f(n)),0!==a.length||c&&0!=n.length?i<0?C(n)?e.stylize(RegExp.prototype.toString.call(n),"regexp"):e.stylize("[Object]","special"):(e.seen.push(n),l=c?function(e,n,i,r,t){for(var a=[],o=0,s=n.length;o<s;++o)x(n,String(o))?a.push(m(e,n,i,r,String(o),!0)):a.push("");return t.forEach(function(t){t.match(/^\d+$/)||a.push(m(e,n,i,r,t,!0))}),a}(e,n,i,o,a):a.map(function(t){return m(e,n,i,o,t,c)}),e.seen.pop(),function(t,e,n){if(60<t.reduce(function(t,e){return 0,0<=e.indexOf("\n")&&0,t+e.replace(/\u001b\[\d\d?m/g,"").length+1},0))return n[0]+(""===e?"":e+"\n ")+" "+t.join(",\n  ")+" "+n[1];return n[0]+e+" "+t.join(", ")+" "+n[1]}(l,u,p)):p[0]+u+p[1]}function f(t){return"["+Error.prototype.toString.call(t)+"]"}function m(t,e,n,i,r,a){var o,s,l;if((l=Object.getOwnPropertyDescriptor(e,r)||{value:e[r]}).get?s=l.set?t.stylize("[Getter/Setter]","special"):t.stylize("[Getter]","special"):l.set&&(s=t.stylize("[Setter]","special")),x(i,r)||(o="["+r+"]"),s||(t.seen.indexOf(l.value)<0?-1<(s=h(n)?d(t,l.value,null):d(t,l.value,n-1)).indexOf("\n")&&(s=a?s.split("\n").map(function(t){return"  "+t}).join("\n").substr(2):"\n"+s.split("\n").map(function(t){return"   "+t}).join("\n")):s=t.stylize("[Circular]","special")),_(o)){if(a&&r.match(/^\d+$/))return s;o=(o=JSON.stringify(""+r)).match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)?(o=o.substr(1,o.length-2),t.stylize(o,"name")):(o=o.replace(/'/g,"\\'").replace(/\\"/g,'"').replace(/(^"|"$)/g,"'"),t.stylize(o,"string"))}return o+": "+s}function v(t){return Array.isArray(t)}function g(t){return"boolean"==typeof t}function h(t){return null===t}function y(t){return"number"==typeof t}function b(t){return"string"==typeof t}function _(t){return void 0===t}function C(t){return u(t)&&"[object RegExp]"===c(t)}function u(t){return"object"===(void 0===t?"undefined":e(t))&&null!==t}function D(t){return u(t)&&"[object Date]"===c(t)}function k(t){return u(t)&&("[object Error]"===c(t)||t instanceof Error)}function w(t){return"function"==typeof t}function c(t){return Object.prototype.toString.call(t)}function p(t){return t<10?"0"+t.toString(10):t.toString(10)}j.debuglog=function(e){if(_(t)&&(t=o.env.NODE_DEBUG||""),e=e.toUpperCase(),!i[e])if(new RegExp("\\b"+e+"\\b","i").test(t)){var n=o.pid;i[e]=function(){var t=j.format.apply(j,arguments);console.error("%s %d: %s",e,n,t)}}else i[e]=function(){};return i[e]},(j.inspect=l).colors={bold:[1,22],italic:[3,23],underline:[4,24],inverse:[7,27],white:[37,39],grey:[90,39],black:[30,39],blue:[34,39],cyan:[36,39],green:[32,39],magenta:[35,39],red:[31,39],yellow:[33,39]},l.styles={special:"cyan",number:"yellow",boolean:"yellow",undefined:"grey",null:"bold",string:"green",date:"magenta",regexp:"red"},j.isArray=v,j.isBoolean=g,j.isNull=h,j.isNullOrUndefined=function(t){return null==t},j.isNumber=y,j.isString=b,j.isSymbol=function(t){return"symbol"===(void 0===t?"undefined":e(t))},j.isUndefined=_,j.isRegExp=C,j.isObject=u,j.isDate=D,j.isError=k,j.isFunction=w,j.isPrimitive=function(t){return null===t||"boolean"==typeof t||"number"==typeof t||"string"==typeof t||"symbol"===(void 0===t?"undefined":e(t))||void 0===t},j.isBuffer=T(818);var O=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function x(t,e){return Object.prototype.hasOwnProperty.call(t,e)}j.log=function(){(function(){var t=new Date,e=[p(t.getHours()),p(t.getMinutes()),p(t.getSeconds())].join(":");[t.getDate(),O[t.getMonth()],e].join(" ")})(),j.format.apply(j,arguments)},j.inherits=T(819),j._extend=function(t,e){if(!e||!u(e))return t;for(var n=Object.keys(e),i=n.length;i--;)t[n[i]]=e[n[i]];return t};var U="undefined"!=typeof Symbol?Symbol("util.promisify.custom"):void 0;function G(t,e){if(!t){var n=new Error("Promise was rejected with a falsy value");n.reason=t,t=n}return e(t)}j.promisify=function(a){if("function"!=typeof a)throw new TypeError('The "original" argument must be of type Function');if(U&&a[U]){var t;if("function"!=typeof(t=a[U]))throw new TypeError('The "util.promisify.custom" argument must be of type Function');return Object.defineProperty(t,U,{value:t,enumerable:!1,writable:!1,configurable:!0}),t}function t(){for(var n,i,t=new Promise(function(t,e){n=t,i=e}),e=[],r=0;r<arguments.length;r++)e.push(arguments[r]);e.push(function(t,e){t?i(t):n(e)});try{a.apply(this,e)}catch(t){i(t)}return t}return Object.setPrototypeOf(t,Object.getPrototypeOf(a)),U&&Object.defineProperty(t,U,{value:t,enumerable:!1,writable:!1,configurable:!0}),Object.defineProperties(t,n(a))},j.promisify.custom=U,j.callbackify=function(a){if("function"!=typeof a)throw new TypeError('The "original" argument must be of type Function');function t(){for(var t=[],e=0;e<arguments.length;e++)t.push(arguments[e]);var n=t.pop();if("function"!=typeof n)throw new TypeError("The last argument must be of type Function");function i(){return n.apply(r,arguments)}var r=this;a.apply(this,t).then(function(t){o.nextTick(i,null,t)},function(t){o.nextTick(G,t,i)})}return Object.setPrototypeOf(t,Object.getPrototypeOf(a)),Object.defineProperties(t,n(a)),t}}).call(this,T(162))},818:function(t,e,n){"use strict";var i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};t.exports=function(t){return t&&"object"===(void 0===t?"undefined":i(t))&&"function"==typeof t.copy&&"function"==typeof t.fill&&"function"==typeof t.readUInt8}},819:function(t,e,n){"use strict";"function"==typeof Object.create?t.exports=function(t,e){e&&(t.super_=e,t.prototype=Object.create(e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}))}:t.exports=function(t,e){if(e){t.super_=e;var n=function(){};n.prototype=e.prototype,t.prototype=new n,t.prototype.constructor=t}}},820:function(t,e,n){},821:function(t,e,n){}}]);