(window.webpackJsonp=window.webpackJsonp||[]).push([[24],{1197:function(e,t,i){"use strict";var a=i(616);i.n(a).a},1263:function(e,t,i){"use strict";var a=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("TPL",{ref:"child",attrs:{total:e.total},on:{sizeChange:e.handleSizeChange,currentChange:e.handleCurrentChange}},[i("div",{staticClass:"search",attrs:{slot:"search"},slot:"search"},[i("el-input",{staticClass:"dy_inputWidth",attrs:{placeholder:"直播名称",clearable:""},model:{value:e.query.title,callback:function(t){e.$set(e.query,"title",t)},expression:"query.title"}}),i("el-input",{staticClass:"dy_inputWidth",attrs:{placeholder:"教师名称"}}),i("TimePick",{on:{getTime:e.getTime}}),i("el-button",{staticClass:"el-icon-search",attrs:{type:"primary"},on:{click:function(t){e.seareHandeler(e.query)}}},[e._v("搜索")])],1),i("div",{staticClass:"list",attrs:{slot:"list"},slot:"list"},[i("el-table",{ref:"table",staticStyle:{width:"100%"},attrs:{stripe:"",data:e.tableData,"tooltip-effect":"dark"},on:{"selection-change":e.handleSelectionChange}},[i("el-table-column",{attrs:{type:"selection",width:"55",fixed:""}}),i("el-table-column",{attrs:{prop:"title",label:"直播标题"}}),i("el-table-column",{attrs:{prop:"state",label:"教师"}}),i("el-table-column",{attrs:{prop:"introduce",label:"简介"}}),i("el-table-column",{attrs:{prop:"start_time",label:"直播时间"}}),i("el-table-column",{attrs:{prop:"audit_time",label:"提交审核时间"}}),i("el-table-column",{attrs:{label:"操作",fixed:"right"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(i){e.approve(t.row.id,"success")}}},[e._v("通过")]),i("el-button",{attrs:{type:"info",size:"small"},on:{click:function(i){e.detail(t.row.id,"fail")}}},[e._v("驳回")])]}}])})],1),i("el-dialog",{staticClass:"detail",attrs:{visible:e.dialogVisible,width:"600px","before-close":e.handleClose},on:{"update:visible":function(t){e.dialogVisible=t}}},[i("div",{staticClass:"title dy_primary",attrs:{slot:"title"},slot:"title"},[e._v("驳回理由"),i("el-input",{staticClass:"form",attrs:{type:"textarea",rows:6},model:{value:e.form.message,callback:function(t){e.$set(e.form,"message",t)},expression:"form.message"}})],1),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{type:"primary",size:"small"},on:{click:e.send}},[e._v("确定")])],1)])],1)])},n=[];i.d(t,"a",function(){return a}),i.d(t,"b",function(){return n})},283:function(e,t,i){"use strict";i.r(t);var a=i(1263),n=i(614);for(var r in n)"default"!==r&&function(e){i.d(t,e,function(){return n[e]})}(r);i(1197);var s=i(0),o=Object(s.a)(n.default,a.a,a.b,!1,null,"421ac3a0",null);o.options.__file="verify.vue",t.default=o.exports},308:function(e,t){var i=/^(?:submit|button|image|reset|file)$/i,a=/^(?:input|select|textarea|keygen)/i,n=/(\[[^\[\]]*\])/g;function r(e,t,i){if(t.match(n)){!function e(t,i,a){if(0===i.length)return t=a;var n=i.shift(),r=n.match(/^\[(.+?)\]$/);if("[]"===n)return t=t||[],Array.isArray(t)?t.push(e(null,i,a)):(t._values=t._values||[],t._values.push(e(null,i,a))),t;if(r){var s=r[1],o=+s;isNaN(o)?(t=t||{})[s]=e(t[s],i,a):(t=t||[])[o]=e(t[o],i,a)}else t[n]=e(t[n],i,a);return t}(e,function(e){var t=[],i=new RegExp(n),a=/^([^\[\]]*)/.exec(e);for(a[1]&&t.push(a[1]);null!==(a=i.exec(e));)t.push(a[1]);return t}(t),i)}else{var a=e[t];a?(Array.isArray(a)||(e[t]=[a]),e[t].push(i)):e[t]=i}return e}function s(e,t,i){return i=i.replace(/(\r)?\n/g,"\r\n"),i=(i=encodeURIComponent(i)).replace(/%20/g,"+"),e+(e?"&":"")+encodeURIComponent(t)+"="+i}e.exports=function(e,t){"object"!=typeof t?t={hash:!!t}:void 0===t.hash&&(t.hash=!0);for(var n=t.hash?{}:"",o=t.serializer||(t.hash?r:s),l=e&&e.elements?e.elements:[],u=Object.create(null),c=0;c<l.length;++c){var d=l[c];if((t.disabled||!d.disabled)&&d.name&&a.test(d.nodeName)&&!i.test(d.type)){var f=d.name,p=d.value;if("checkbox"!==d.type&&"radio"!==d.type||d.checked||(p=void 0),t.empty){if("checkbox"!==d.type||d.checked||(p=""),"radio"===d.type&&(u[d.name]||d.checked?d.checked&&(u[d.name]=!0):u[d.name]=!1),void 0==p&&"radio"==d.type)continue}else if(!p)continue;if("select-multiple"!==d.type)n=o(n,f,p);else{p=[];for(var h=d.options,m=!1,v=0;v<h.length;++v){var g=h[v],_=t.empty&&!g.value,b=g.value||_;g.selected&&b&&(m=!0,n=t.hash&&"[]"!==f.slice(f.length-2)?o(n,f+"[]",g.value):o(n,f,g.value))}!m&&t.empty&&(n=o(n,f,""))}}}if(t.empty)for(var f in u)u[f]||(n=o(n,f,""));return n}},309:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.main=void 0;var a,n=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var i=arguments[t];for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(e[a]=i[a])}return e},r=i(308);(a=r)&&a.__esModule;var s={data:function(){return{tableData:[],total:0,page:{pageOffset:10,pageNum:1},ids:[],isTeacher:"",dialogVisible:!1,detailVisible:!1,detailData:[],productType:null}},created:function(){this.isTeacher=this.$config.isTeacher,this.getList(n({},this.query,this.page))},methods:{seareHandeler:function(){this.page.pageNum=1,this.getList(n({},this.query))},getList:function(e){var t=this;this.service&&this.service.getList(e).then(function(e){e&&e.status&&(t.tableData=e.data,t.total=e.page.total)})},handleSelectionChange:function(e){this.ids=e.map(function(e){return e.id}),this.multipleSelection=e},update:function(e,t){this.$refs[t].src=URL.createObjectURL(e.target.files[0])},getTime:function(e){e||(e=["",""]),this.query.time_start=e[0],this.query.time_end=e[1],this.query.start_time=e[0],this.query.end_time=e[1]},handleSizeChange:function(e){this.page.pageOffset=e,this.getList(n({},this.page,this.query))},handleCurrentChange:function(e){this.page.pageNum=e,this.getList(n({},this.page,this.query))},handleClose:function(){this.detailVisible=!1,this.dialogVisible=!1},del:function(e){var t=this;this.$confirm("你真的要删除该数据吗？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t.service.del({id:e}).then(function(e){e&&e.status&&(t.getList(n({},t.page,t.query)),t.$message.success("删除成功"))},function(e){var i=e.payload;t.$message.error(i.message)})}).catch(function(){})},save:function(e){var t=this;e||(e=this.form),this.service.save(e).then(function(e){e.status&&(t.$message.success("保存成功"),t.getList(t.query)),t.dialogVisible=!1,t.$refs.child.dialogVisible=!1},function(e){t.$message.error(e.payload.message)})},educe:function(e){this.service.educe({id:e}).then(function(e){window.location.href=e.data.url})},detail:function(e){var t=this;this.service.detail({id:e}).then(function(e){t.detailData=e.data,log(e,"detail")}),this.$refs.child.dialogVisible=!0},showDetail:function(e,t){var i=this;log("------------"),this.service.detail({id:e}).then(function(e){log(e,"detailInfo"),i.detailData=e.data,i.productType=t,i.detailVisible=!0})}}};t.main=s},314:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.getTask=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},i=arguments[2];return e.size,e.size>=1048576?(t.is_chunk=!0,(0,a.request_post)("/common/api/files/upload_task?r="+Math.random(5)).then(function(n){if(n.status)return t.task_id=n.data.task_id,(0,a.request_file)("/common/api/files/upload",{file:e,data:t},i);throw new Error(n.messages)}).catch(function(e){throw new Error("上传失败")})):(t.is_chunk=!1,(0,a.request_file)("/common/api/files/upload",{file:e,data:t}))},t.getAppId=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,a.request_get)("/common/api/app/search_name",e).then(function(e){return n.default.app_id=e.data.id,sessionStorage.app_id=e.data.id,e})},t.getClientToken=function(){return(0,a.request_post)("/common/api/auth/token/pcclient")},t.platInfo=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,a.request_get)(o(e)).then(function(e){return n.default.app_id=e.data.id,sessionStorage.app_id=e.data.id,document.title=e.data.name,e})},t.commonPreview=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,a.request_get)(u(e))},t.commonPreviewCode=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,a.request_post)("/api/preview",e)},t.getQrcode=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,a.request_get)("/common/api/get_qrcode",e)},t.synchronization=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,a.request_get)(l(e)).then(function(e){return e})},t.getAuthor=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,a.request_get)("/api/ecommerce/author",e)},t.addAuthor=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,a.request_post)("/api/ecommerce/author",e)},t.getWeixinConfig=function(e){return(0,a.request_get)("/common/api/third/wx_js_sdk/config",e)};s(i(52));var a=i(51),n=s(i(53)),r=s(i(85));function s(e){return e&&e.__esModule?e:{default:e}}r.default.compile("/common/api/files/upload_task/:id"),r.default.compile("/common/api/manager/managers/:id"),r.default.compile("/common/api/manager/roles/:id");var o=r.default.compile("/common/api/app/apps/:id"),l=r.default.compile("/common/api/dragon_infos/:id");var u=r.default.compile("/api/preview/:id")},326:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.getList=function(e){return log(e,"abcd"),n.request_get("/api/live/backstage_all",e).then(function(e){return e.data=e.data.map(function(e){switch(log(e.online),"true"==e.online?e.online="已上架":e.online="未上架",e.state){case"not_approve":e.state="未审核";break;case"approveing":e.state="审核中";break;case"success":e.state="审核已通过";break;case"fail":e.state="审核未通过"}return e}),e})},t.getListPrimery=function(e){return n.request_get("/api/live/state_list",e).then(function(e){return e.data=e.data.map(function(e){return"approveing"==e.state&&(e.state="审核中"),e}),e})},t.save=function(e){if(e.id)return n.request_put(o(e),e);return n.request_post("/api/live",e)},t.isOnLine=function(e){return n.request_put(l(e),e)},t.approve=function(e){return n.request_put(u(e),e)},t.del=function(e){return n.request_delete("/api/live",e)},t.getLiveLists=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return n.request_get("/api/live/front_all",e)};var a,n=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i]);return t.default=e,t}(i(51)),r=i(85),s=(a=r)&&a.__esModule?a:{default:a};var o=s.default.compile("/api/live/:id"),l=s.default.compile("/api/live/online/:id"),u=s.default.compile("/api/live/state/:id")},614:function(e,t,i){"use strict";i.r(t);var a=i(615),n=i.n(a);for(var r in a)"default"!==r&&function(e){i.d(t,e,function(){return a[e]})}(r);t.default=n.a},615:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var i=arguments[t];for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(e[a]=i[a])}return e},n=i(309),r=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i]);return t.default=e,t}(i(326));i(314);t.default={mixins:[n.main],data:function(){return{query:{title:"",time_start:"",time_end:""},service:r,ids:[],dialogVisible:!1,form:{id:"",message:"",state:"fail"}}},methods:{getList:function(e){var t=this;this.service.getListPrimery(e).then(function(e){e&&e.status&&(t.total=e.page.total,t.tableData=e.data)})},handleClose:function(){this.dialogVisible=!1},detail:function(e){this.form.id=e,this.dialogVisible=!0},approve:function(e,t){var i=this;r.approve({id:e,state:t}).then(function(e){e.status&&i.getList()})},send:function(){var e=this;r.approve(a({},this.form)).then(function(t){e.dialogVisible=!1,e.getList()})}}}},616:function(e,t,i){}}]);