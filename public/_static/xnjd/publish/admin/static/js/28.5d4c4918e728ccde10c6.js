(window.webpackJsonp=window.webpackJsonp||[]).push([[28],{1158:function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"index clearfix"},[a("Top",{attrs:{currentPlant:"X-PUBLISH"}}),a("Menu",{attrs:{curr:"/contentLibrary/H5"}}),a("div",{staticClass:"mainRight"},[a("div",{staticClass:"contentWrap"},[a("div",{staticClass:"contentLeft"},[a("div",{staticClass:"maindata"},[a("div",{staticClass:"serachWrap",on:{keyup:function(e){if(!("button"in e)&&t._k(e.keyCode,"enter",13,e.key,"Enter"))return null;t.query()}}},[a("div",{staticClass:"title"}),a("form",{attrs:{id:"mainForm"}},[a("span",{staticClass:"group-inline"},[a("el-input",{attrs:{placeholder:"名称",name:"name",clearable:""}})],1),a("span",{staticClass:"group-inline"},[a("el-input",{attrs:{placeholder:"标签",name:"tag",clearable:""}})],1),a("span",{staticClass:"group-inline"},[a("TimePick",{attrs:{inputsName:["start_time","end_time"]}})],1),a("span",{staticClass:"group-inline float-right"},[a("el-button",{attrs:{size:"mediu",type:"primary",plain:"",icon:"el-icon-search"},on:{click:t.query}},[t._v("搜索")]),a("el-button",{attrs:{size:"mediu",type:"primary",icon:"el-icon-plus"},on:{click:function(e){t.opneDetailDialogAdd("xq",!0)}}},[t._v("新建")])],1)])]),a("div",{staticClass:"tableWrap"},[t.list?a("div",{staticClass:"div"},[a("div",{staticClass:"tableTop"},[a("div",{staticClass:"title vel-line"},[a("span",[t._v("全部 "),t.page?a("span",{staticClass:"totalNum"},[t._v("("+t._s(t.page.total)+")")]):t._e()]),a("input",{attrs:{type:"checkbox"},on:{click:function(e){t.checkAll(e)}}}),a("div",{staticClass:"btns"},[a("el-button",{attrs:{size:"mini",type:"primary",plain:""},on:{click:t.moveToOther}},[t._v("移动分组")]),a("el-button",{attrs:{size:"mini",type:"primary",plain:""},on:{click:t.importSomething}},[t._v("导入")]),a("el-button",{attrs:{size:"mini",type:"primary",plain:""},on:{click:t.exportSomething}},[t._v("导出")]),a("el-button",{attrs:{size:"mini",type:"primary",plain:""},on:{click:t.exportSomething2}},[t._v("全部导出")]),a("el-button",{attrs:{size:"mini",type:"primary",plain:""},on:{click:function(e){t.delChoosen(!1)}}},[t._v("删除")])],1)])]),a("div",{staticClass:"mediaList"},[a("ul",t._l(t.list,function(e){return a("li",{staticClass:"itemWrap"},[a("div",{staticClass:"imgWrap"},[a("div",{staticClass:"name"},[a("span",[a("input",{attrs:{type:"checkbox",name:"ids"},domProps:{value:e.id}})]),a("span",{attrs:{title:e.name},domProps:{textContent:t._s(e.name)}})]),a("a",{attrs:{href:e.preview,target:"_blank"}},[a("div",{staticClass:"imgcontent"},[a("img",{attrs:{src:e.img_src}}),a("div",{staticClass:"cover"},[a("div",{staticClass:"tag"},[a("div",{staticClass:"div"},[t._v("标签:")]),a("div",{staticClass:"name"},[t._v(t._s(e.tag))])]),a("div",{staticClass:"time"},[t._v(t._s(e.create_time))])])])])]),a("div",{staticClass:"btns"},[a("span",{staticClass:"icon icon-detail",attrs:{title:"详情",size:"mini",type:"primary",plain:""},on:{click:function(a){t.opneDetailDialog("xq",e)}}}),a("span",{staticClass:"icon icon-link",attrs:{size:"mini",title:"链接",type:"primary",plain:""},on:{click:function(a){t.opneImgLinkDialog(e)}}}),a("span",{staticClass:"icon icon-data",attrs:{size:"mini",title:"元数据",type:"primary",plain:""},on:{click:function(a){t.opneDetailDialog("data",e)}}}),a("span",{staticClass:"icon icon-delete",attrs:{size:"mini",title:"删除",type:"primary",plain:""},on:{click:function(a){t.delChoosen(e.id)}}})])])}))]),a("div",{staticClass:"pageWrap"},[a("el-pagination",{attrs:{small:!1,background:"","current-page":t.page.num,"page-sizes":[12,48,96],"page-size":t.page.offset,layout:"total, sizes, prev, pager, next, jumper",total:t.page.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1)]):t._e()]),a("div",{staticClass:"gruopList"},[a("GroupList",{attrs:{groupList:t.groupList,currGroup:t.currGroup},on:{addGroup:t.addGroup,updateGroup:t.updateGroup,delGroup:t.delGroup,groupChange:t.groupChange}})],1)])])])]),t.detailImgDialog?a("div",{staticClass:"myDialogWrap"},[a("div",{staticClass:"content"},[a("span",{staticClass:"imgWrap"},[a("video",{attrs:{src:t.detailSrc.preview,poster:t.detailSrc.img,controls:""}}),a("span",{staticClass:"closeBtn",on:{click:function(e){t.detailImgDialog=!1}}})])])]):t._e(),a("div",{staticClass:"dialogs"},[a("el-dialog",{attrs:{center:!1,visible:t.detailDialog,"close-on-click-modal":!1,"lock-scroll":!0,top:"50px",width:"1000px"},on:{"update:visible":function(e){t.detailDialog=e}}},[a("div",{staticClass:"content",attrs:{slot:"title"},slot:"title"},[t.detailDialog?a("Detail",{attrs:{type:t.detailDialoaType,currGroup:t.currGroup,detailDialog:t.detailDialog,detailData:t.detailData||{}},on:{detailBack:t.detailBack,"update:detailDialog":function(e){t.detailDialog=e}}}):t._e()],1)]),a("el-dialog",{attrs:{center:!1,visible:t.uploadDialog,"close-on-click-modal":!1,top:"100px"},on:{"update:visible":function(e){t.uploadDialog=e}}},[a("div",{staticClass:"content",attrs:{slot:"title"},slot:"title"},[a("UploadAll",{ref:"upload",on:{upload:t.importFiles}})],1)]),a("el-dialog",{attrs:{center:!1,visible:t.publishDialog,"close-on-click-modal":!1,top:"50px",width:"1000px"},on:{"update:visible":function(e){t.publishDialog=e}}},[a("span",[t._v("发布内容")]),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.publishDialog=!1}}},[t._v("返回")])],1)]),t.imgLinkDialog?a("LinkDialog",{attrs:{imgLinkDialog:t.imgLinkDialog,imgSrc:t.linkDialogObj.img_src,link:t.linkDialogObj.link},on:{back:function(e){t.imgLinkDialog=!1}}}):t._e(),a("el-dialog",{attrs:{center:!1,visible:t.moveToOtherDiaolog,"close-on-click-modal":!1,title:"移动分组",width:"500px"},on:{"update:visible":function(e){t.moveToOtherDiaolog=e}}},[a("span",{}),a("div",{staticClass:"group"},[a("div",{staticClass:"label"},[t._v("移动到")]),a("select",{ref:"moveToId",staticClass:"form-control",attrs:{placeholder:"请选择"}},t._l(t.groupList,function(e,i){return e.id!=t.currGroup&&""!=e.id?a("option",{domProps:{value:e.id,textContent:t._s(e.name)}}):t._e()}))]),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{type:"info"},on:{click:function(e){t.moveToOtherDiaolog=!1}}},[t._v("返回")]),a("el-button",{attrs:{type:"primary"},on:{click:t.moveToSubmit}},[t._v(" 确定")])],1)])],1)],1)},n=[];a.d(e,"a",function(){return i}),a.d(e,"b",function(){return n})},1174:function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"div"},[t.percentage?a("UploadProgress",{attrs:{percentage:t.percentage}}):t._e(),t.detailReadOnly?a("el-button",{staticClass:"modifyBtn",attrs:{type:"primary",size:"small",plain:""},on:{click:function(e){t.detailReadOnly=!1}}},[t._v("修改")]):t._e(),a("el-tabs",{attrs:{value:t.type},on:{"tab-click":t.handleClick}},[a("el-tab-pane",{attrs:{label:"详情",name:"xq"}},[a("div",{staticClass:"div"},[a("VaForm",{ref:"detailFormVali"},[a("form",{ref:"detailForm",staticClass:"detailForm"},[a("fieldset",{attrs:{disabled:t.detailReadOnly}},[a("div",{staticClass:"group"},[a("div",{staticClass:"label"},[t._v("*名称:")]),a("input",{directives:[{name:"va",rawName:"v-va",value:{type:"required"},expression:"{ type:'required' }"},{name:"model",rawName:"v-model",value:t.detailDataOwn.name,expression:"detailDataOwn.name"}],staticClass:"form-control",attrs:{type:"text"},domProps:{value:t.detailDataOwn.name},on:{input:function(e){e.target.composing||t.$set(t.detailDataOwn,"name",e.target.value)}}})]),a("TypeMsg",{attrs:{detailDataOwn:t.detailDataOwn,name:"H5"}}),a("div",{staticClass:"group"},[a("div",{staticClass:"label"},[t._v("标签:")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.detailDataOwn.tag,expression:"detailDataOwn.tag"}],staticClass:"form-control",attrs:{type:"text"},domProps:{value:t.detailDataOwn.tag},on:{input:function(e){e.target.composing||t.$set(t.detailDataOwn,"tag",e.target.value)}}})]),a("div",{staticClass:"group"},[a("div",{staticClass:"label"},[t._v("简介:")]),a("textarea",{directives:[{name:"model",rawName:"v-model",value:t.detailDataOwn.abs,expression:"detailDataOwn.abs"}],staticClass:"textarea",attrs:{type:"text"},domProps:{value:t.detailDataOwn.abs},on:{input:function(e){e.target.composing||t.$set(t.detailDataOwn,"abs",e.target.value)}}})]),a("div",{staticClass:"group"},[a("div",{staticClass:"label"},[t._v("详情:")]),a("span",[a("span",[a("input",{attrs:{type:"radio",name:"method",checked:"true"}}),t._v("外链")])])]),"wailian"==t.detailType?a("div",{staticClass:"group wailianinput"},[a("div",{staticClass:"label"}),a("span",[a("input",{directives:[{name:"va",rawName:"v-va",value:{type:"required"},expression:"{type:'required'}"}],ref:"otherImgInput",staticClass:"form-control",attrs:{placeholder:"请输入链接"},domProps:{value:t.previewOtherFileUrl||t.detailDataOwn.preview},on:{input:t.otherFile}}),a("div",{directives:[{name:"show",rawName:"v-show",value:"bendi"==t.detailType,expression:"detailType == 'bendi'"}],staticClass:"group detailmain"},[a("div",{staticClass:"label"}),a("span",{staticClass:"wrap"},[a("span",{staticClass:"msg"},[a("div",{staticClass:"size"},[t._v("大小:"),a("span",{staticClass:"val",domProps:{textContent:t._s((t.detailDataOwn.size/1024).toFixed(2)+"KB")}})]),a("el-button",{attrs:{size:"mini",type:"primary",plain:""},on:{click:function(e){t.$refs.meidaFile.click()}}},[t._v("导入")]),a("el-button",{attrs:{size:"mini",type:"primary",plain:""},on:{click:function(t){}}},[t._v("导出")]),a("el-button",{attrs:{size:"mini",type:"primary",plain:""},on:{click:function(e){t.$refs.coverInput.click()}}},[t._v("上传封面")])],1)])]),a("div",{directives:[{name:"show",rawName:"v-show",value:"wailian"==t.detailType,expression:"detailType == 'wailian'"}],staticClass:"group detailmain wailian"},[a("div",{staticClass:"label"}),a("span",{staticClass:"wrap"},[a("span",{staticClass:"msg"},[a("el-button",{attrs:{size:"mini",type:"primary",plain:""},on:{click:function(e){t.$refs.coverInput.click()}}},[t._v("导入封面")])],1)])]),a("div",{staticClass:"group detailmain"},[a("div",{staticClass:"label"}),a("span",{staticClass:"wrap"},[a("img",{staticClass:"coverImg",attrs:{src:t.detailDataOwn.img_src||t.previewImgUrl}})])]),a("p",{staticClass:"imgSizeWrap"},[a("span",{staticClass:"imgSize"},[t._v("建议图片大小：118*160px")])]),a("div",{staticClass:"hide"},[a("input",{ref:"coverInput",staticClass:"hide",attrs:{type:"file",accept:t.$config.imgAccept},on:{change:t.previewImg}}),a("input",{ref:"meidaFile",staticClass:"hide",attrs:{type:"file",accept:t.$config.videoAccept},on:{change:t.previewMedia}})])])]):t._e()],1)])]),a("div",{staticClass:"btns"},[a("el-button",{attrs:{type:"info"},on:{click:function(e){t.$emit("update:detailDialog",!1)}}},[t._v("取消")]),t.detailReadOnly?t._e():a("el-button",{attrs:{type:"primary"},on:{click:function(e){t.submitDetail("detailForm")}}},[t._v("确定")])],1)],1)]),a("el-tab-pane",{attrs:{label:"元数据",name:"data"}},[a("MetaData",{attrs:{metadata:t.metadata,readOnly:t.detailReadOnly},on:{submit:t.submitDetail,back:function(e){t.$emit("update:detailDialog",!1)}}})],1)],1)],1)},n=[];a.d(e,"a",function(){return i}),a.d(e,"b",function(){return n})},330:function(t,e,a){"use strict";a.r(e);var i=a(1158),n=a(687);for(var r in n)"default"!==r&&function(t){a.d(e,t,function(){return n[t]})}(r);a(924);var s=a(0),l=Object(s.a)(n.default,i.a,i.b,!1,null,"5fb8fe31",null);l.options.__file="index.vue",e.default=l.exports},362:function(t,e,a){"use strict";a.r(e);var i=a(363),n=a.n(i);for(var r in i)"default"!==r&&function(t){a.d(e,t,function(){return i[t]})}(r);e.default=n.a},363:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:["groupList","currGroup"],data:function(){return{newGroupDialogOpen:!1,updateGroupDialogOpen:!1,currEditGroup:null}},created:function(){},computed:{},methods:{groupChange:function(t){this.$emit("groupChange",t)},addGroupDialog:function(){},delGroup:function(t){var e=this;this.$confirm("是否删除分组:"+t.name).then(function(a){dir(a),e.$emit("delGroup",t.id)}).catch(function(t){dir(t)})},updateGroupDialog:function(t){this.updateGroupDialogOpen=!0,this.currEditGroup=t},addGroup:function(){if(this.$refs.addGroupForm.valiAll()){var t=document.querySelector("#addGroupForm");this.$emit("addGroup",t),this.newGroupDialogOpen=!1}},updateGroup:function(){if(this.$refs.updateGroupForm.valiAll()){var t=document.querySelector("#updateGroupForm");this.$emit("updateGroup",t),this.updateGroupDialogOpen=!1}}}}},364:function(t,e,a){},365:function(t,e,a){"use strict";a.r(e);var i=a(370),n=a(362);for(var r in n)"default"!==r&&function(t){a.d(e,t,function(){return n[t]})}(r);a(366);var s=a(0),l=Object(s.a)(n.default,i.a,i.b,!1,null,"176cd962",null);l.options.__file="GroupList.vue",e.default=l.exports},366:function(t,e,a){"use strict";var i=a(364);a.n(i).a},370:function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"div"},[a("div",{staticClass:"groupWrap"},[a("div",{staticClass:"list"},[a("ul",t._l(t.groupList,function(e){return a("li",{staticClass:"licontent",class:{red:e.id==t.currGroup}},[a("div",{staticClass:"name ellipsis",attrs:{title:e.name+"("+e.num+")"},on:{click:function(a){t.groupChange(e.id)}}},[a("span",{staticClass:"title"},[t._v(t._s(e.name))]),a("span",[t._v(t._s("("+e.num+")"))])]),""!=e.id&&"non"!=e.id?a("div",{staticClass:"btns"},[a("span",{on:{click:function(a){t.updateGroupDialog(e)}}},[a("i",{staticClass:"el-icon-edit"})]),a("span",{on:{click:function(a){t.delGroup(e)}}},[a("i",{staticClass:"el-icon-delete"})])]):t._e()])}))]),a("div",{staticClass:"addGroupBtnWrap"},[a("el-button",{attrs:{type:"primary",plain:""},on:{click:function(e){t.newGroupDialogOpen=!0}}},[a("i",{staticClass:"el-icon-plus"},[t._v("新建分组")])])],1)]),a("div",{staticClass:"dialogs"},[t.newGroupDialogOpen?a("el-dialog",{attrs:{title:"新增",visible:t.newGroupDialogOpen,width:"500px"},on:{"update:visible":function(e){t.newGroupDialogOpen=e}}},[a("div",{staticClass:"formWrap"},[a("VaForm",{ref:"addGroupForm"},[a("form",{attrs:{id:"addGroupForm"}},[a("div",{staticClass:"group"},[a("input",{directives:[{name:"va",rawName:"v-va",value:{type:"required"},expression:"{ type:'required' }"}],staticClass:"form-control",attrs:{name:"name"}})])])])],1),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{type:"info"},on:{click:function(e){t.newGroupDialogOpen=!1}}},[t._v("取消")]),a("el-button",{attrs:{type:"primary"},on:{click:t.addGroup}},[t._v("确定")])],1)]):t._e(),t.updateGroupDialogOpen?a("el-dialog",{attrs:{title:"修改",visible:t.updateGroupDialogOpen,width:"500px"},on:{"update:visible":function(e){t.updateGroupDialogOpen=e}}},[a("div",{staticClass:"formWrap"},[a("VaForm",{ref:"updateGroupForm"},[t.currEditGroup?a("form",{attrs:{id:"updateGroupForm"}},[a("div",{staticClass:"group"},[a("input",{directives:[{name:"va",rawName:"v-va",value:{type:"required"},expression:"{ type:'required' }"}],staticClass:"form-control",attrs:{name:"name"},domProps:{value:t.currEditGroup.name}}),a("input",{staticClass:"hide",attrs:{name:"id"},domProps:{value:t.currEditGroup.id}})])]):t._e()])],1),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{type:"info"},on:{click:function(e){t.updateGroupDialogOpen=!1}}},[t._v("取消")]),a("el-button",{attrs:{type:"primary"},on:{click:t.updateGroup}},[t._v("确定")])],1)]):t._e()],1)])},n=[];a.d(e,"a",function(){return i}),a.d(e,"b",function(){return n})},687:function(t,e,a){"use strict";a.r(e);var i=a(688),n=a.n(i);for(var r in i)"default"!==r&&function(t){a.d(e,t,function(){return i[t]})}(r);e.default=n.a},688:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=p(a(3)),n=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var a=arguments[e];for(var i in a)Object.prototype.hasOwnProperty.call(a,i)&&(t[i]=a[i])}return t},r=(p(a(82)),p(a(155))),s=p(a(154)),l=p(a(157)),o=p(a(365)),u=p(a(922)),c=function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e.default=t,e}(a(846)),d=a(122);function p(t){return t&&t.__esModule?t:{default:t}}e.default={mixins:[d.main],components:{Menu:r.default,Top:s.default,GroupList:o.default,Detail:u.default,UploadAll:l.default},data:function(){return{services:c,list:null,page:null,groupList:null,uploadDialog:!1,detailDialog:!1,detailDialoaType:"xq",detailData:{},timePick:null,imgLinkDialog:!1,publishDialog:!1,moveToOtherDiaolog:!1,moveIds:null,toId:null,detailImgDialog:!1,detailSrc:null}},methods:{getList:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.page&&this.page.num||1,e=this,a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:this.page&&this.page.offset||12,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;c.listLibrary(n({pageNum:t,pageOffset:a,group_id:this.currGroup},i)).then(function(t){log(33,t),e.list=t.data,e.page=t.page})},opneDetailDialog:function(t,e){this.detailDialog=!0,this.detailData=e,this.detailDialoaType=t},opneDetailDialogAdd:function(t){this.detailDialog=!0,this.detailDialoaType=t,this.detailData=null,this.metadata=null},copyLink:function(t){try{document.querySelector("#"+t).select();document.execCommand("copy"),this.$message.success("复制成功!")}catch(t){this.$message.error("请使用ctrl+c 实现复制")}},opnePublishDialog:function(t){this.detailData=t,this.publishDialog=!0},del:function(){var t,e=(t=i.default.mark(function t(e){return i.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",this.services.deleteLibrary(e));case 1:case"end":return t.stop()}},t,this)}),function(){var e=t.apply(this,arguments);return new Promise(function(t,a){return function i(n,r){try{var s=e[n](r),l=s.value}catch(t){return void a(t)}if(!s.done)return Promise.resolve(l).then(function(t){i("next",t)},function(t){i("throw",t)});t(l)}("next")})});return function(t){return e.apply(this,arguments)}}(),openDetailImgDialog:function(t){this.detailSrc=t,this.detailImgDialog=!0},clear:function(){document.getElementById("text").value=""},clear2:function(){document.getElementById("text2").value=""}}}},689:function(t,e,a){"use strict";a.r(e);var i=a(690),n=a.n(i);for(var r in i)"default"!==r&&function(t){a.d(e,t,function(){return i[t]})}(r);e.default=n.a},690:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=c(a(3)),n=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var a=arguments[e];for(var i in a)Object.prototype.hasOwnProperty.call(a,i)&&(t[i]=a[i])}return t},r=(c(a(82)),u(a(27))),s=u(a(846)),l=c(a(124)),o=a(122);function u(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e.default=t,e}function c(t){return t&&t.__esModule?t:{default:t}}function d(t){return function(){var e=t.apply(this,arguments);return new Promise(function(t,a){return function i(n,r){try{var s=e[n](r),l=s.value}catch(t){return void a(t)}if(!s.done)return Promise.resolve(l).then(function(t){i("next",t)},function(t){i("throw",t)});t(l)}("next")})}}e.default={mixins:[o.getIconStyle],props:["type","detailData","detailDialog","currGroup","detailBack"],components:{UploadProgress:l.default},created:function(){var t=this;this.detailData.id?(log("查询元数据, 目录 , 数据本地化"),s.detailLibrary({id:this.detailData.id}).then(function(e){log(111,e),t.detailDataOwn=e.data,t.metadata=e.data.attributes}),"non"!=this.currGroup&&(this.detailDataOwn.group_id=this.currGroup)):this.metadata=this.detailDataOwn.attributes},data:function(){return{detailDataOwn:{img_status:!1,attributes:[]},metadata:[],previewImgUrl:null,previewMediaUrl:null,previewOtherFileUrl:null,imgUrl:null,fileMsg:{size:"",format:""},mediaFile:null,coverFile:null,percentage:0}},computed:{detailType:function(){return this.detailDataOwn.img_status,"wailian"}},methods:{handleClick:function(t,e){},addMetadata:function(){this.metadata.push({key:"",name:"",value:""})},delMetadata:function(t){this.metadata.splice(t,1)},previewImg:function(t){var e=t.target;this.coverFile=e.files[0],this.previewImgUrl=URL.createObjectURL(this.coverFile)},otherFile:function(){var t=this.$refs.otherImgInput.value;t&&(this.previewOtherFileUrl=t)},previewMedia:function(t){var e=t.target.files[0];this.mediaFile=e,dir(e),e&&e.size>3221225472e3?this.$message.errot("文件过大!请小于3G"):(this.detailDataOwn.size=e.size,this.detailDataOwn.format=e.name.substr(e.name.lastIndexOf(".")+1),this.previewMediaUrl=URL.createObjectURL(e))},submitDetail:function(){var t=d(i.default.mark(function t(e){var a,l,o,u,c=this;return i.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(log("提交"),this.$refs.detailFormVali.valiAll()){t.next=4;break}return t.abrupt("return");case 4:if(a=null,l=null,"wailian"!==this.detailType){t.next=29;break}if(log("外"),o=this.previewOtherFileUrl,this.detailDataOwn.preview=o,l=this.fileMsg,a=this.$loading({text:"正在上传",background:"rgba(0, 0, 0, 0.8)"}),!this.coverFile){t.next=17;break}return t.next=15,r.getTask(this.coverFile).then(function(t){log("本地",t),c.detailDataOwn.img=t.data.path}).catch(function(t){c.$message.error("图片上传失败!")});case 15:t.next=18;break;case 17:this.detailDataOwn.img=null;case 18:if(u=n({},this.detailDataOwn,l),!this.detailDataOwn.id){t.next=24;break}return t.next=22,s.modifyLibrary(u).then(function(t){c.$emit("detailBack")});case 22:t.next=26;break;case 24:return t.next=26,s.addLibrary(u).then(function(t){c.$emit("detailBack")});case 26:this.$nextTick(function(t){a.close()}),t.next=58;break;case 29:if(log("本地"),t.prev=30,!this.mediaFile){t.next=36;break}return t.next=34,r.getTask(this.mediaFile,{is_chunk:!0,size:1048576},function(t){c.percentage=t}).then(function(t){c.detailDataOwn.preview=t.data.path});case 34:t.next=37;break;case 36:this.detailDataOwn.preview=null;case 37:if(!this.coverFile){t.next=42;break}return t.next=40,r.getTask(this.coverFile).then(function(t){c.detailDataOwn.img=t.data.path});case 40:t.next=43;break;case 42:this.detailDataOwn.img=null;case 43:t.next=50;break;case 45:return t.prev=45,t.t0=t.catch(30),this.$message.error("媒体文件上传失败!"),this.percentage=0,t.abrupt("return");case 50:if(!this.detailDataOwn.id){t.next=55;break}return t.next=53,s.modifyLibrary(this.detailDataOwn).then(function(t){c.$emit("detailBack")});case 53:t.next=57;break;case 55:return t.next=57,s.addLibrary(this.detailDataOwn).then(function(t){c.$emit("detailBack")});case 57:this.percentage=0;case 58:case"end":return t.stop()}},t,this,[[30,45]])}));return function(e){return t.apply(this,arguments)}}(),submitMetadata:function(){for(var t=!0,e=0;e<this.metadata.length;e++)""!==this.metadata[e].key.trim()&&""!==this.metadata[e].value.trim()||(t=!1);t?(this.detailDataOwn.id?s.modifyLibrary({id:this.detailDataOwn.id,attributes:this.metadata}):s.addLibrary({attributes:this.metadata}),this.$emit("detailBack")):this.$message.error("元数据不能为空!")},confirmUploadFile:function(){var t=d(i.default.mark(function t(){return i.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}()}}},691:function(t,e,a){},692:function(t,e,a){},846:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.addLibrary=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,n.request_post)("/api/librarys",t).then(function(t){var e=t.data,a=e.id,i=e.name,n=e.abs,r=e.author,s=e.tag,o=e.type_name;return(0,l.addResListener)({res_id:a,res_type:o,res_name:i,res_exp:n,res_author:r,res_lables:[s]}),t})},e.modifyLibrary=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=t.id,a=o(t,["id"]);return(0,n.request_put)(u({id:e}),a)},e.listLibrary=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,n.request_get)("/api/librarys",t)},e.educe=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,l.educeResListener)({res_url:getFullPath("/api/librarys/export"+qs.stringify(t,{addQueryPrefix:!0}))}),(0,n.request_get)("/api/librarys/export",t)},e.putin=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,n.request_post)("/api/librarys/import",t)},e.deleteLibrary=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,n.request_post)("/api/librarys/delete",t)},e.detailLibrary=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,n.request_get)(u(t))},e.modifyGroup=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=t.id,a=o(t,["id"]);return(0,n.request_put)(c({id:e}),a)},e.deleteGroup=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,n.request_post)("/api/librarys/groups/delete",t)},e.addGroup=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,n.request_post)("/api/librarys/groups",t)},e.listGroup=function(){return(0,n.request_get)("/api/librarys/groups")},e.moveGroup=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,n.request_put)("/api/librarys/groups",t)};var i,n=a(4),r=a(8),s=(i=r)&&i.__esModule?i:{default:i},l=a(83);function o(t,e){var a={};for(var i in t)e.indexOf(i)>=0||Object.prototype.hasOwnProperty.call(t,i)&&(a[i]=t[i]);return a}var u=s.default.compile("/api/librarys/:id"),c=s.default.compile("/api/librarys/groups/:id")},922:function(t,e,a){"use strict";a.r(e);var i=a(1174),n=a(689);for(var r in n)"default"!==r&&function(t){a.d(e,t,function(){return n[t]})}(r);a(923);var s=a(0),l=Object(s.a)(n.default,i.a,i.b,!1,null,"430a7fef",null);l.options.__file="detail.vue",e.default=l.exports},923:function(t,e,a){"use strict";var i=a(691);a.n(i).a},924:function(t,e,a){"use strict";var i=a(692);a.n(i).a}}]);