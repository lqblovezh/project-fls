/*!
 * {
 *   "buildtime": "2019-05-31 16:22:54",
 *   "workspace": "F:\\X-BOOK\\xcloud\\x-book4\\js",
 *   "username": "LQB",
 *   "hostname": "DESKTOP-QL56OJS",
 *   "platform": "win32",
 *   "git": {
 *     "branch": "master",
 *     "hash": "fbc007935",
 *     "message": [
 *       "commit fbc00793544e5767db1868f95f89c64b93f3aa79",
 *       "Author: 骆秋波 <1277678760@qq.com>",
 *       "Date:   Fri May 31 15:21:03 2019 +0800",
 *       "    打包上传"
 *     ],
 *     "user": "骆秋波",
 *     "email": "1277678760@qq.com",
 *     "remote": [
 *       "origin http://gitlab.kf.gli.cn/xcloud/x-book4.git (fetch)",
 *       "origin http://gitlab.kf.gli.cn/xcloud/x-book4.git (push)"
 *     ]
 *   }
 * }
 */
(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{207:function(e,t,a){"use strict";a.r(t);var i=a(372),n=a(299);for(var l in n)"default"!==l&&function(e){a.d(t,e,function(){return n[e]})}(l);a(359);var r=a(2),s=Object(r.a)(n.default,i.a,i.b,!1,null,"75f27987",null);t.default=s.exports},211:function(e,t){var a=/^(?:submit|button|image|reset|file)$/i,i=/^(?:input|select|textarea|keygen)/i,n=/(\[[^\[\]]*\])/g;function l(e,t,a){if(t.match(n)){!function e(t,a,i){if(0===a.length)return t=i;var n=a.shift(),l=n.match(/^\[(.+?)\]$/);if("[]"===n)return t=t||[],Array.isArray(t)?t.push(e(null,a,i)):(t._values=t._values||[],t._values.push(e(null,a,i))),t;if(l){var r=l[1],s=+r;isNaN(s)?(t=t||{})[r]=e(t[r],a,i):(t=t||[])[s]=e(t[s],a,i)}else t[n]=e(t[n],a,i);return t}(e,function(e){var t=[],a=new RegExp(n),i=/^([^\[\]]*)/.exec(e);for(i[1]&&t.push(i[1]);null!==(i=a.exec(e));)t.push(i[1]);return t}(t),a)}else{var i=e[t];i?(Array.isArray(i)||(e[t]=[i]),e[t].push(a)):e[t]=a}return e}function r(e,t,a){return a=a.replace(/(\r)?\n/g,"\r\n"),a=(a=encodeURIComponent(a)).replace(/%20/g,"+"),e+(e?"&":"")+encodeURIComponent(t)+"="+a}e.exports=function(e,t){"object"!=typeof t?t={hash:!!t}:void 0===t.hash&&(t.hash=!0);for(var n=t.hash?{}:"",s=t.serializer||(t.hash?l:r),o=e&&e.elements?e.elements:[],c=Object.create(null),u=0;u<o.length;++u){var d=o[u];if((t.disabled||!d.disabled)&&d.name&&i.test(d.nodeName)&&!a.test(d.type)){var f=d.name,p=d.value;if("checkbox"!==d.type&&"radio"!==d.type||d.checked||(p=void 0),t.empty){if("checkbox"!==d.type||d.checked||(p=""),"radio"===d.type&&(c[d.name]||d.checked?d.checked&&(c[d.name]=!0):c[d.name]=!1),void 0==p&&"radio"==d.type)continue}else if(!p)continue;if("select-multiple"!==d.type)n=s(n,f,p);else{p=[];for(var h=d.options,m=!1,v=0;v<h.length;++v){var g=h[v],_=t.empty&&!g.value,y=g.value||_;g.selected&&y&&(m=!0,n=t.hash&&"[]"!==f.slice(f.length-2)?s(n,f+"[]",g.value):s(n,f,g.value))}!m&&t.empty&&(n=s(n,f,""))}}}if(t.empty)for(var f in c)c[f]||(n=s(n,f,""));return n}},212:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var i in a)Object.prototype.hasOwnProperty.call(a,i)&&(e[i]=a[i])}return e};t.listRole=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,l.request_get)("/system/api/manager/roles",e)},t.listManager=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,l.request_get)("/system/api/manager/managers",e)},t.addManager=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,l.request_post)("/system/api/manager/managers",e)},t.modifyManager=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.id,a=o(e,["id"]);return(0,l.request_put)(c({id:t}),a)},t.detailManager=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.id,a=o(e,["id"]);return(0,l.request_get)(c({id:t}),a)},t.detailRole=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.id,a=o(e,["id"]);return t?(0,l.request_get)(u({id:t}),a).then(function(e){var t={};if(e.status){t=e.data.accesses;var a={allow_create:0,allow_view_all:0,allow_edit_all:0,allow_delete_all:0};return d().then(function(n){if(n.status){var l=n.data,r={};for(var s in l)r[l[s].id]=i({},l[s],a),t[l[s].id]&&(r[l[s].id]=i({},l[s],t[l[s].id]));return n.data=r,log(e,222),n}})}}):f()},t.allJurisdiction=d,t._allJurisdiction=f,t.role=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.id,a=o(e,["id"]);if(log(a),t)return(0,l.request_put)(u({id:t}),a);return(0,l.request_post)("/system/api/manager/roles",a)},t.addRole=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,l.request_post)("/system/api/manager/roles",e)},t.deleteManager=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,l.request_post)("/system/api/manager/managers/delete",e)},t.deleteRole=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,l.request_post)("/system/api/manager/roles/delete",e)},t.logManager=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,l.request_get)("/system/api/manager/logs",e)},t.login=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,l.request_post)("/system/api/auth/login/manager",e)},t.isLogin=function(){return(0,l.request_get)("/system/api/auth/is_login/manager")},t.loginOut=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,l.request_post)("/system/api/auth/logout",e)},t.changePass=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,l.request_put)("/system/api/auth/pass",e).then(function(e){return window.sessionStorage.removeItem("token"),window.sessionStorage.removeItem("userInfo"),config.token=null,e})};var n,l=a(65),r=a(66),s=(n=r)&&n.__esModule?n:{default:n};function o(e,t){var a={};for(var i in e)t.indexOf(i)>=0||Object.prototype.hasOwnProperty.call(e,i)&&(a[i]=e[i]);return a}var c=s.default.compile("/system/api/manager/managers/:id"),u=s.default.compile("/system/api/manager/roles/:id");function d(){return(0,l.request_get)("/system/api/manager/accesses")}function f(){return(0,l.request_get)("/system/api/manager/accesses").then(function(e){if(e.status){var t={allow_create:0,allow_view_all:0,allow_edit_all:0,allow_delete_all:0},a=e.data,n={};for(var l in a)n[a[l].id]=i({},a[l],t);return e.data=n,e}})}},226:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.publicMixin=void 0;var i=r(a(18)),n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},l=r(a(211));function r(e){return e&&e.__esModule?e:{default:e}}var s={mounted:function(){var e,t=this;return(e=i.default.mark(function e(){return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(log("typeof this.getList: "+n(t.getList)),"undefined"===t.getList){e.next=4;break}return e.next=4,t.getList();case 4:case"end":return e.stop()}},e,t)}),function(){var t=e.apply(this,arguments);return new Promise(function(e,a){return function i(n,l){try{var r=t[n](l),s=r.value}catch(e){return void a(e)}if(!r.done)return Promise.resolve(s).then(function(e){i("next",e)},function(e){i("throw",e)});e(s)}("next")})})()},methods:{handleNavClick:function(e){this.$router.push({path:this.path+"/"+e.name})},seareHandeler:function(){this.query=(0,l.default)(document.querySelector("#mainForm"),{hash:!0}),this.getList(1,10,this.query)},handleSizeChange:function(e){this.page.offset=e,this.getList(1,e,this.query)},handleCurrentChange:function(e){this.page.num=e,this.getList(e,this.page.offset,this.query)},selcetAll:function(e){Array.from(document.querySelectorAll("[name='checkbox']")).forEach(function(t){t.checked=e.target.checked})},handleClose:function(){this.$refs.detailDialog.resetFields(),this.detailVisible=!1}}};t.publicMixin=s},299:function(e,t,a){"use strict";a.r(t);var i=a(300),n=a.n(i);for(var l in i)"default"!==l&&function(e){a.d(t,e,function(){return i[e]})}(l);t.default=n.a},300:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var i in a)Object.prototype.hasOwnProperty.call(a,i)&&(e[i]=a[i])}return e},n=(s(a(211)),function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&(t[a]=e[a]);return t.default=e,t}(a(212))),l=a(226),r=s(a(68));function s(e){return e&&e.__esModule?e:{default:e}}t.default={mixins:[l.publicMixin],data:function(){return{pageList:[],query:null,path:(0,r.default)("/","/app/systemManage"),activeName:"role",detailVisible:!1,detailDate:{id:"",name:"",exp:"",accesses:{}},detailRules:{name:[{required:!0,message:"请输入角色名",trigger:"blur"}],exp:[{required:!0,message:"请输入角色描述",trigger:"blur"}]}}},methods:{getList:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,t=this,a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1e3,l=arguments[2],r=i({pageNum:e,pageOffset:a},l);n.listRole(r).then(function(e){t.page=e.page,t.pageList=e.data})},showDetaile:function(e){var t=this;this.detailDate.id=this.detailDate.name=this.detailDate.exp="",n.detailRole({id:e}).then(function(a){if(e){var i=t.pageList.find(function(t){return t.id===e});t.detailDate.id=e,t.detailDate.name=i.name,t.detailDate.exp=i.exp}t.detailDate.accesses=a.data,t.detailVisible=!0})},deleteHandeler:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];if(t.length||Array.from(document.querySelectorAll("[name='checkbox']:checked")).forEach(function(e){t.push(e.value)}),!t.length)return this.$message.error("请确认你要删除的内容！");this.$confirm("确认删除？").then(function(a){n.deleteRole({id:t}).then(function(t){e.getList()},function(t){e.$message.error(t.message)})})},save:function(){var e=this;this.$refs.detailDialog.validate(function(t){if(!t)return!1;n.role(e.detailDate).then(function(t){e.$message.success("保存成功"),e.getList(),e.detailVisible=!1}).catch(function(t){var a=t.payload;for(var i in a.messages){e.$message.error(a.messages[i]);break}})})},handlePageClick:function(e,t){var a=t.target.checked?1:0,i=this.detailDate.accesses[e];a||(this.$refs.checkAll.checked=!1),i.allow_create=a,i.allow_delete_all=a,i.allow_edit_all=a,i.allow_view_all=a},handleOptionsClick:function(e,t){t.target.checked||(this.$refs.checkAll.checked=!1);var a=t.target.getAttribute("data-type");this.detailDate.accesses[e][a]=Number(t.target.checked)},isChecked:function(e){return e.allow_create&&e.allow_delete_all&&e.allow_edit_all&&e.allow_view_all},selectAll:function(e){log(111);var t=e.target.checked?1:0,a=this.detailDate.accesses;for(var i in a)a[i].allow_create=t,a[i].allow_delete_all=t,a[i].allow_edit_all=t,a[i].allow_view_all=t}},computed:{isAllChecked:function(){var e=this.detailDate.accesses,t=!0,a=!1,i=void 0;try{for(var n,l=Object.keys(e)[Symbol.iterator]();!(t=(n=l.next()).done);t=!0){var r=e[n.value];if(!(r.allow_create&&r.allow_delete_all&&r.allow_edit_all&&r.allow_view_all))return!1}}catch(e){a=!0,i=e}finally{try{!t&&l.return&&l.return()}finally{if(a)throw i}}return!0}}}},301:function(e,t,a){},359:function(e,t,a){"use strict";var i=a(301);a.n(i).a},372:function(e,t,a){"use strict";var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"indexs"},[a("div",{staticClass:"mainRight"},[a("div",{staticClass:"maindata"},[a("div",{staticClass:"serachWrap"},[a("div",{staticClass:"NavList"},[a("el-tabs",{on:{"tab-click":e.handleNavClick},model:{value:e.activeName,callback:function(t){e.activeName=t},expression:"activeName"}},[a("el-tab-pane",{attrs:{label:"管理员列表",name:"manager"}}),a("el-tab-pane",{attrs:{label:"操作日志",name:"journal"}}),a("el-tab-pane",{attrs:{label:"角色管理",name:"role"}})],1)],1),a("form",{attrs:{id:"mainForm"}},[a("el-row",{attrs:{gutter:5}},[a("el-col",{attrs:{span:4}},[a("input",{staticClass:"form-control",staticStyle:{height:"40px"},attrs:{name:"name",placeholder:"输入角色名搜索"}})]),a("el-col",{staticClass:"right",attrs:{span:20}},[a("el-button",{attrs:{type:"primary",icon:"el-icon-search",plain:""},on:{click:e.seareHandeler}},[e._v("搜索")]),a("el-button",{attrs:{type:"primary",icon:"el-icon-circle-plus-outline",plain:""},on:{click:function(t){return e.showDetaile()}}},[e._v("新增")])],1)],1)],1)]),a("div",{staticClass:"tableWrap"},[a("table",{staticClass:"table"},[e._m(0),e.pageList.length?a("tbody",e._l(e.pageList,function(t){return a("tr",[a("td",{domProps:{textContent:e._s(t.name)}}),a("td",{domProps:{textContent:e._s(t.exp)}}),a("td",[a("span",{staticClass:"icon icon-detail",attrs:{type:"primary",title:"详情",plain:"",size:"mini"},on:{click:function(a){return e.showDetaile(t.id)}}}),a("span",{staticClass:"icon icon-delete",attrs:{type:"primary",title:"删除",plain:"",size:"mini"},on:{click:function(a){return e.deleteHandeler([t.id])}}})])])}),0):e._e()])])]),a("el-dialog",{attrs:{visible:e.detailVisible,"before-close":e.handleClose,"lock-scroll":!1,width:"70%"},on:{"update:visible":function(t){e.detailVisible=t}}},[a("div",{staticClass:"header",attrs:{slot:"title"},slot:"title"},[a("el-tabs",{attrs:{value:"detail"}},[a("el-tab-pane",{attrs:{label:"详情",name:"detail"}})],1)],1),a("el-form",{ref:"detailDialog",attrs:{model:e.detailDate,rules:e.detailRules}},[a("el-form-item",{attrs:{label:"角色名:","label-width":"120px",prop:"name"}},[a("el-input",{model:{value:e.detailDate.name,callback:function(t){e.$set(e.detailDate,"name",t)},expression:"detailDate.name"}})],1),a("el-form-item",{attrs:{label:"角色描述:","label-width":"120px",prop:"exp"}},[a("el-input",{attrs:{type:"textarea"},model:{value:e.detailDate.exp,callback:function(t){e.$set(e.detailDate,"exp",t)},expression:"detailDate.exp"}})],1)],1),a("table",{staticClass:"table border",attrs:{width:"100%",id:"detailTable"}},[a("thead",[a("tr",[a("th",[a("span",[e._v("页面显示")]),e.detailDate.accesses?a("input",{ref:"checkAll",attrs:{type:"checkbox"},domProps:{checked:e.isAllChecked},on:{click:e.selectAll}}):e._e(),a("span",[e._v("全选")])]),a("th",[e._v("权限功能")])])]),a("tbody",e._l(e.detailDate.accesses,function(t,i){return a("tr",[a("td",{attrs:{align:"center"}},[a("input",{ref:"ids",refInFor:!0,attrs:{type:"checkbox",name:"pages",id:"item_"+t.id},domProps:{checked:e.isChecked(t)},on:{click:function(t){return e.handlePageClick(i,t)}}}),a("label",{attrs:{for:"item_"+t.id},domProps:{textContent:e._s(t.name)}})]),a("td",{attrs:{align:"left"}},[a("ul",{staticClass:"options"},[a("li",[a("input",{attrs:{type:"checkbox",id:"items_"+t.id+"add","data-type":"allow_create"},domProps:{checked:t.allow_create},on:{click:function(t){return e.handleOptionsClick(i,t)}}}),a("label",{attrs:{for:"items_"+t.id+"add"}},[e._v("新增 ")])]),a("li",[a("input",{attrs:{type:"checkbox",id:"items_"+t.id+"del","data-type":"allow_delete_all"},domProps:{checked:t.allow_delete_all},on:{click:function(t){return e.handleOptionsClick(i,t)}}}),a("label",{attrs:{for:"items_"+t.id+"del"}},[e._v("删除")])]),a("li",[a("input",{attrs:{type:"checkbox",id:"items_"+t.id+"mod","data-type":"allow_edit_all"},domProps:{checked:t.allow_edit_all},on:{click:function(t){return e.handleOptionsClick(i,t)}}}),a("label",{attrs:{for:"items_"+t.id+"mod"}},[e._v("修改")])]),a("li",[a("input",{attrs:{type:"checkbox",id:"items_"+t.id+"viw","data-type":"allow_view_all"},domProps:{checked:t.allow_view_all},on:{click:function(t){return e.handleOptionsClick(i,t)}}}),a("label",{attrs:{for:"items_"+t.id+"viw"}},[e._v("查询")])])])])])}),0)]),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{type:"info"},on:{click:e.handleClose}},[e._v("取消")]),a("el-button",{attrs:{type:"primary"},on:{click:e.save}},[e._v("确定")])],1)],1)],1)])},n=[function(){var e=this.$createElement,t=this._self._c||e;return t("thead",[t("tr",[t("th",[this._v("角色名")]),t("th",{attrs:{width:"400"}},[this._v("角色描述")]),t("th",[this._v("操作")])])])}];a.d(t,"a",function(){return i}),a.d(t,"b",function(){return n})}}]);