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
(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{200:function(e,t,a){"use strict";a.r(t);var n=a(370),i=a(256);for(var s in i)"default"!==s&&function(e){a.d(t,e,function(){return i[e]})}(s);a(337);var r=a(2),o=Object(r.a)(i.default,n.a,n.b,!1,null,"14525fb8",null);t.default=o.exports},210:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.event_terminal_verison=t.event_terminal=void 0,t.cb=function(e){e&&!e.status&&console.warn(e)},t.getUserId=function(){var e=window.sessionStorage.getItem("userInfo");if(e)return e._id||e.id;return""};var n,i=a(217);(n=i)&&n.__esModule;var s=(0,a(220).detect)(),r=s.name,o=s.version;t.event_terminal=r,t.event_terminal_verison=o},213:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.getUserInfo=function(){return n.default.parse(window.sessionStorage.getItem("userInfo"))},t.getDefaultCover=function(){return(0,i.request_get)(restUrl_publish+"/api/videos/images")},t.commonPreview=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,i.request_get)(u(e))},t.commonPreviewCode=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,i.request_post)(restUrl_publish+"/api/preview",e)},t.platInfo=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=r.default.compile(restUrl_publish+"/api/current");return(0,i.request_get)(t(e)).then(function(e){return s.default.app_id=e.data.id,sessionStorage.app_id=e.data.id,document.title=e.data.application?e.data.application.name:e.data.publisher.name,e})},t.fileExport=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,i.request_get)(c(e))},t.groupsDelete=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,i.request_post)(restUrl_publish+"/api/groups/delete",e)};var n=o(a(67)),i=a(65),s=o(a(94)),r=(a(214),o(a(66)));function o(e){return e&&e.__esModule?e:{default:e}}var u=r.default.compile(restUrl_publish+"/api/preview/:id");var c=r.default.compile(restUrl_publish+"/api/content/export/:id")},214:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.suance=t.loginListener=t.createProListener=t.educeResListener=t.addResListener=void 0;var n=u(a(216)),i=u(a(222)),s=u(a(223)),r=u(a(224)),o=u(a(225));function u(e){return e&&e.__esModule?e:{default:e}}t.addResListener=n.default,t.educeResListener=i.default,t.createProListener=s.default,t.loginListener=r.default,t.suance=o.default},216:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){var t=e.res_id,a=e.res_type,i=e.res_name,s=e.res_exp,r=e.res_author,o=void 0===r?"佚名":r,u=e.res_author_id,c=void 0===u?[]:u,l=e.res_tree,d=void 0===l?[]:l,_=e.res_lables,v=void 0===_?[]:_,p=e.res_attr,f=void 0===p?[]:p,h=e.user_id,m=void 0===h?"":h;if(window.DBI){m=m||(0,n.getUserId)();var g=new DBI.createEvent({event_class:"Resources",event_data:{Resources:[{res_id:t,res_type:a,res_name:i,res_exp:s,res_author:o,res_author_id:c,res_tree:d,res_lables:v,res_attr:f,user_id:m,res_total_play:0,res_total_order:0}]},event_target:"",event_type:"创建",event_source:"WEB",event_sources:n.origin,event_operator:m,event_temporary:"",event_system:"",event_system_verison:"",event_terminal:n.event_terminal,event_terminal_verison:n.event_terminal_verison});DBI.declare(g,n.cb)}};var n=a(210)},222:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){var t=e.res_url,a=e.user_id,i=void 0===a?"":a;window.DBI&&(i=i||(0,n.getUserId)(),DBI.declare({event_class:"Resources",event_data:{Resources:[{res_url:t}]},event_target:"",event_type:"导出",event_source:"Web",event_sources:n.origin,event_operator:i,event_temporary:"",event_system:"",event_system_version:"",event_terminal:n.event_terminal,event_terminal_verison:n.event_terminal_verison},n.cb))};var n=a(210)},223:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){var t=e.res_id,a=e.res_type,i=e.res_name,s=e.res_cover,r=e.res_covers,o=e.res_exp,u=e.res_author,c=e.res_author_id,l=e.res_Interpreter,d=e.res_Interpreter_id,_=e.res_lables,v=e.res_money,p=e.res_isbn,f=e.res_isbn_ext,h=e.user_id,m=void 0===h?"":h;if(window.DBI){m=m||(0,n.getUserId)();var g=new DBI.createEvent({event_class:"PDAMBook",event_data:{Resources:[{res_id:t,res_type:a,res_name:i,res_cover:s,res_covers:r,res_exp:o,res_author:u,res_author_id:c,res_Interpreter:l,res_Interpreter_id:d,res_lables:_,res_money:v,res_isbn:p,res_isbn_ext:f}]},event_target:t,event_type:"创建",event_source:"WEB",event_sources:n.origin,event_operator:m,event_temporary:"",event_system:"",event_system_verison:"",event_terminal:n.event_terminal,event_terminal_verison:n.event_terminal_verison});DBI.declare(g,n.cb)}};var n=a(210)},224:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){var t=e.user_id,a=e.user_name,i=e.user_nick_name,s=e.user_phone,r=e.user_picture,o=e.user_picture_absolute,u=e.user_email,c=e.user_sex,l=e.user_date_of_birth,d=e.user_address,_=e.user_city;t=t||(0,n.getUserId)(),window.DBI&&DBI.declare({event_class:"User",event_data:{User:[{user_id:t,user_nick_name:i,user_name:a,user_sex:c,user_email:u,user_phone:s,user_picture:r,user_picture_absolute:o,user_address:d,user_city:_,user_date_of_birth:l}]},event_target:"",event_type:"登录",event_source:"",event_sources:n.origin,event_operator:t,event_temporary:"",event_system:"",event_system_version:"",event_terminal:n.event_terminal,event_terminal_verison:n.event_terminal_verison},n.cb)};var n=a(210)},225:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){var t=e.id,a=e.info,i=e.user_id,s=void 0===i?"":i;s=s||(0,n.getUserId)(),window.DBI&&DBI.declare({event_class:"PDAMBook",event_data:{PDAMBook:[a]},event_target:t,event_type:"分发",event_source:"web",event_sources:n.origin,event_operator:s,event_temporary:"",event_system:"",event_system_version:"",event_terminal:n.event_terminal,event_terminal_verison:n.event_terminal_verison},n.cb)};var n=a(210)},256:function(e,t,a){"use strict";a.r(t);var n=a(257),i=a.n(n);for(var s in n)"default"!==s&&function(e){a.d(t,e,function(){return n[e]})}(s);t.default=i.a},257:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n,i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e},s=c(a(95)),r=c(a(258)),o=a(331),u=(n=o)&&n.__esModule?n:{default:n};function c(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&(t[a]=e[a]);return t.default=e,t}t.default={components:{Detail:u.default},data:function(){return{detailDialog:!1,detail:null,searchData:{name:"",nick_name:"",phone:"",email:"",time_start:"",time_end:""},list:null,page:{offset:10,total:6,num:1},active:null}},mounted:function(){this.init()},methods:{init:function(){this.getList()},getList:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,a=i({pageNum:t,pageOffset:this.page.offset},this.searchData);return r.getList(a).then(function(t){e.list=t.data,e.page=t.page})},currentChange:function(e){this.getList(e)},openDetailDialog:function(){this.detailDialog=!0},getDetail:function(){var e=this;r.detail({id:this.active}).then(function(t){e.detail=t.data,t.data?e.detail.manager_id=e.active:e.detail.manager_id="",e.detailDialog=!0})},add:function(){this.detail=null,this.detailDialog=!0},forbid:function(e,t){var a=this;this.$confirm(t+"该用户，该用户的系统将处于"+t+"状态?").then(function(t){s.disabled(e).then(function(t){a.$message.success("操作成功!"),e.status=!e.status})})},buttonClickHandler:function(e,t){var a=this,n=e.target.title;switch(n){case"禁用":case"启用":this.forbid(t,n);break;case"删除":this.$confirm("危险操作,删除后无法恢复!,是否真的要删除？").then(function(e){a.$confirm("再次确认!").then(function(e){r.del({id:[t.id]}).then(function(e){return a.getList()},function(e){a.$message.error("关联有出版社,无法删除...")})})});break;case"详情":this.active=t.id,this.getDetail()}},detailSave:function(e){this.detailDialog=!1,this.getList()},checkAll:function(e){this.$checkAll(e)},formatType:function(e){return e.join(", ")}}}},258:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.getList=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,i.request_get)("/system/api/app_manager/managers",e)},t.del=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,i.request_post)("/system/api/app_manager/managers/delete",e)},t.detail=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,i.request_get)(r(e),e)},t.save=function(e){var t=e.id,a=function(e,t){var a={};for(var n in e)t.indexOf(n)>=0||Object.prototype.hasOwnProperty.call(e,n)&&(a[n]=e[n]);return a}(e,["id"]);if(t)return(0,i.request_put)(r({id:t}),a);return(0,i.request_post)("/system/api/app_manager/managers",a).then(function(e){return a.apps&&a.apps.length&&a.apps.forEach(function(t){o({manager_id:e.data.id,app_id:t.id})}),e})},t.getApps=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,i.request_get)("/system/api/publishers",e)},t.authorize=o,t.revoke=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,i.request_post)("/system/api/app_manager/managers/app_revoke",e)};var n,i=a(65),s=a(66);var r=((n=s)&&n.__esModule?n:{default:n}).default.compile("/system/api/app_manager/managers/:id");function o(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,i.request_post)("/system/api/app_manager/managers/app_authorize",e)}},259:function(e,t,a){"use strict";a.r(t);var n=a(260),i=a.n(n);for(var s in n)"default"!==s&&function(e){a.d(t,e,function(){return n[e]})}(s);t.default=i.a},260:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});u(a(213));var n,i=u(a(258)),s=a(332),r=(n=s)&&n.__esModule?n:{default:n},o=a(334);function u(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&(t[a]=e[a]);return t.default=e,t}t.default={components:{List:r.default},props:["isVis","detail"],created:function(){this.localVis=this.isVis,this.detail&&(this.data=this.detail),this.initAuthority()},data:function(){return{data:{type:[],accessed_publishers:[]},authority:{publish:"",read:"",data:"",teach:""},localVis:!1,isShow:!1,show:!1}},methods:{addLicensePic:function(){},addApp:function(){this.isShow=!0},delApp:function(e,t){var a=this;this.detail?(this.$confirm("是否删除?").then(function(n){i.revoke({manager_id:a.detail.manager_id,app_id:t.id}).then(function(e){a.$emit("refurbish")},function(t){a.data.accessed_publishers.splice(e,1)})}),this.data=this.detail):this.data.accessed_publishers.splice(e,1)},initAuthority:function(){},authorize:function(e){this.authority[e]=!this.authority[e]},save:function(){var e=this;i.save(this.data).then(function(t){e.data.accessed_publishers&&e.data.accessed_publishers.forEach(function(e){var a={manager_id:t.data.id,app_id:e.id};e.isChecked&&i.authorize(a)}),(0,o.setTimeout)(function(t){e.$emit("save",!0)},100)},function(t){var a=t.payload;if(a)for(var n in a.errors){e.$message.error(a.errors[n]);break}})},interim:function(e){var t=this,a=[];this.data.accessed_publishers.forEach(function(e){a.push(e.id)}),e.forEach(function(e){a.includes(e.id)||t.data.accessed_publishers.push(e)})}},watch:{isVis:function(){this.localVis=this.isVis},detail:function(){this.data=this.detail}}}},261:function(e,t,a){"use strict";a.r(t);var n=a(262),i=a.n(n);for(var s in n)"default"!==s&&function(e){a.d(t,e,function(){return n[e]})}(s);t.default=i.a},262:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n,i=a(18),s=(n=i)&&n.__esModule?n:{default:n},r=a(258);t.default={props:["isShow","detail"],data:function(){return{list:null,page:{offset:10,total:6,num:1},checkAllState:!1,name:"",show:!0}},created:function(){this.getList(),this.show=this.isShow},methods:{getList:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.page&&this.page.num||1,a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:this.page&&this.page.offset||10;(0,r.getApps)({pageNum:t,pageOffset:a}).then(function(t){e.page=t.page,e.pageList=t.data;var a=e.detail.accessed_publishers.map(function(e){return e.id});e.detail.accessed_publishers.length==t.data.length&&(e.checkAllState=!0),e.list=t.data.map(function(t){return a.includes(t.id)?t.isChecked=!0:(t.isChecked=!1,e.checkAllState=!1),t})})},currentChange:function(e){this.getList(e)},add:function(){var e,t=this;return(e=s.default.mark(function e(){var a;return s.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:a=[],t.list.forEach(function(e){e.isChecked&&a.push(e)}),t.$emit("isOpen"),t.$emit("updata",a);case 4:case"end":return e.stop()}},e,t)}),function(){var t=e.apply(this,arguments);return new Promise(function(e,a){return function n(i,s){try{var r=t[i](s),o=r.value}catch(e){return void a(e)}if(!r.done)return Promise.resolve(o).then(function(e){n("next",e)},function(e){n("throw",e)});e(o)}("next")})})()},checkAll:function(e){var t=this;this.checkAllState=!this.checkAllState,this.list.forEach(function(e){e.isChecked=t.checkAllState})},changeChecked:function(e,t){t.isChecked=e.target.checked,e.target.checked||(this.checkAllState=!1)},search:function(){this.getList({name:this.name})}},watch:{isShow:function(){this.show=this.isShow,this.getList()}}}},263:function(e,t,a){},264:function(e,t,a){},265:function(e,t,a){},331:function(e,t,a){"use strict";a.r(t);var n=a(385),i=a(259);for(var s in i)"default"!==s&&function(e){a.d(t,e,function(){return i[e]})}(s);a(336);var r=a(2),o=Object(r.a)(i.default,n.a,n.b,!1,null,"7e848091",null);t.default=o.exports},332:function(e,t,a){"use strict";a.r(t);var n=a(387),i=a(261);for(var s in i)"default"!==s&&function(e){a.d(t,e,function(){return i[e]})}(s);a(333);var r=a(2),o=Object(r.a)(i.default,n.a,n.b,!1,null,"910546d4",null);t.default=o.exports},333:function(e,t,a){"use strict";var n=a(263);a.n(n).a},336:function(e,t,a){"use strict";var n=a(264);a.n(n).a},337:function(e,t,a){"use strict";var n=a(265);a.n(n).a},370:function(e,t,a){"use strict";var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticClass:"comps"},[e.detailDialog?a("Detail",{attrs:{detail:e.detail,isVis:e.detailDialog},on:{save:e.detailSave,"update:isVis":function(t){e.detailDialog=t},"update:is-vis":function(t){e.detailDialog=t},refurbish:function(t){return e.getDetail()}}}):e._e()],1),a("div",{staticClass:"content-wrap"},[a("div",{staticClass:"content"},[a("div",{staticClass:"search",on:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.getList()}}},[a("form",[a("el-input",{attrs:{placeholder:"电话",clearable:""},model:{value:e.searchData.phone,callback:function(t){e.$set(e.searchData,"phone",t)},expression:"searchData.phone"}}),a("el-input",{attrs:{placeholder:"联系人",clearable:""},model:{value:e.searchData.nick_name,callback:function(t){e.$set(e.searchData,"nick_name",t)},expression:"searchData.nick_name"}}),a("div",{staticClass:"seatch-btns"},[a("el-button",{attrs:{plain:"",icon:"el-icon-search",size:"medium",type:"primary"},on:{click:function(t){return e.getList()}}},[e._v("搜索")]),a("el-button",{attrs:{icon:"el-icon-plus",size:"medium",type:"primary"},on:{click:e.add}},[e._v("新建  ")])],1)],1)]),e.list?a("div",{staticClass:"table-warp"},[a("table",{staticClass:"table"},[a("thead",[a("tr",[a("th",{attrs:{width:"60"}},[a("input",{attrs:{type:"checkbox"},on:{click:function(t){return e.checkAll(t)}}})]),a("th",[e._v("账户")]),a("th",[e._v("电话")]),a("th",[e._v("创建时间")]),a("th",[e._v("联系人")]),a("th",[e._v("拥有出版社")]),a("th",[e._v("操作")])])]),a("tbody",e._l(e.list,function(t){return a("tr",{key:t.id},[a("th",[a("input",{ref:"inps",refInFor:!0,attrs:{type:"checkbox"}})]),a("th",[a("div",{staticClass:"ell",attrs:{title:t.name}},[e._v(e._s(t.name)+"   ")])]),a("th",[a("div",{staticClass:"ell",attrs:{title:t.phone}},[e._v(e._s(t.phone)+"   ")])]),a("th",[a("div",{staticClass:"ell"},[e._v(e._s(t.create_time.substr(0,10))+"   ")])]),a("th",[a("div",{staticClass:"ell",attrs:{title:t.nick_name}},[e._v(e._s(t.nick_name)+" ")])]),a("th",e._l(t.accessed_publishers,function(t){return a("div",{staticClass:"ell",attrs:{title:t.name}},[e._v(" "+e._s(t.name)+" ")])}),0),a("th",[a("div",{staticClass:"table-btns",on:{click:function(a){return e.buttonClickHandler(a,t)}}},[a("span",{staticClass:"icon icon-delete",attrs:{title:"删除"}}),a("span",{staticClass:"icon icon-detail",attrs:{title:"详情"}})])])])}),0)]),e.page.total?a("div",{staticClass:"pages"},[a("Pages",{attrs:{currentPage:e.page.num,total:e.page.total,pageSize:e.page.offset,pageSizes:[e.page.offset,20,50,100]},on:{currentChange:e.currentChange}})],1):e._e()]):e._e()])])])},i=[];a.d(t,"a",function(){return n}),a.d(t,"b",function(){return i})},385:function(e,t,a){"use strict";var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("List",{attrs:{isShow:e.isShow,detail:e.data},on:{"update:isShow":function(t){e.isShow=t},"update:is-show":function(t){e.isShow=t},refurbish:function(t){return e.$emit("refurbish")},updata:e.interim,isOpen:function(t){e.isShow=!1}}}),a("el-dialog",{attrs:{visible:e.localVis,width:"1200px"},on:{"update:visible":function(t){e.localVis=t},closed:function(t){return e.$emit("update:isVis",e.localVis)}}},[e.data?a("div",{staticClass:"content"},[a("div",{staticClass:"base fix"},[a("div",{staticClass:"tname"},[e._v("基本信息 ")]),a("div",{staticClass:"form-group"},[a("label",[e._v("账户")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.data.name,expression:"data.name"}],staticClass:"form-control",attrs:{placeholder:"必填"},domProps:{value:e.data.name},on:{input:function(t){t.target.composing||e.$set(e.data,"name",t.target.value)}}})]),a("div",{staticClass:"form-group"},[a("label",[e._v("联系人")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.data.nick_name,expression:"data.nick_name"}],staticClass:"form-control",domProps:{value:e.data.nick_name},on:{input:function(t){t.target.composing||e.$set(e.data,"nick_name",t.target.value)}}})]),a("div",{staticClass:"form-group"},[a("label",[e._v("联系方式")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.data.phone,expression:"data.phone"}],staticClass:"form-control",domProps:{value:e.data.phone},on:{input:function(t){t.target.composing||e.$set(e.data,"phone",t.target.value)}}})]),a("div",{staticClass:"form-group"},[a("label",[e._v("联系邮箱")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.data.email,expression:"data.email"}],staticClass:"form-control",domProps:{value:e.data.email},on:{input:function(t){t.target.composing||e.$set(e.data,"email",t.target.value)}}})])]),a("div",{staticClass:"base sys"},[a("div",{staticClass:"tname"},[e._v("拥有出版社")]),a("span",{staticClass:"sys-list-name"},[e._v("出版社列表  ")]),a("div",{staticClass:"xlist"},[e._l(e.data.accessed_publishers,function(t,n){return e.data.accessed_publishers?a("div",{staticClass:"item"},[a("div",{staticClass:"form-group"},[a("label",[e._v("出版社名称")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.name,expression:"i.name"}],staticClass:"form-control",attrs:{readonly:"readonly"},domProps:{value:t.name},on:{input:function(a){a.target.composing||e.$set(t,"name",a.target.value)}}})]),a("span",{staticClass:"icon icon-delete",on:{click:function(a){return e.delApp(n,t)}}})]):e._e()}),a("div",{staticClass:"fix"},[a("div",{staticClass:"add-btn"},[a("Btn",{on:{click:e.addApp}},[e._v("新增  ")])],1)])],2)]),a("div",{staticClass:"bottom"},[a("el-button",{attrs:{type:"primary"},on:{click:e.save}},[e._v("保存        ")])],1)]):e._e()])],1)},i=[];a.d(t,"a",function(){return n}),a.d(t,"b",function(){return i})},387:function(e,t,a){"use strict";var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-dialog",{attrs:{visible:e.show,width:"1200px"},on:{"update:visible":function(t){e.show=t},close:function(t){return e.$emit("isOpen")}}},[a("div",{staticClass:"box"},[a("el-input",{staticClass:"keys",attrs:{size:"small",placeholder:"出版社名称"},model:{value:e.name,callback:function(t){e.name=t},expression:"name"}}),a("el-button",{attrs:{type:"primary",size:"small"},on:{click:e.search}},[e._v("搜索")])],1),e.list?a("div",{staticClass:"table-warp"},[a("table",{staticClass:"table"},[a("thead",[a("tr",[a("th",{attrs:{width:"60"}},[a("input",{attrs:{type:"checkbox"},domProps:{checked:e.checkAllState},on:{click:function(t){return e.checkAll(t)}}})]),a("th",[e._v("出版社名")]),a("th",[e._v("简介")]),a("th",[e._v("创建时间")])])]),a("tbody",e._l(e.list,function(t,n){return a("tr",{key:t.id},[a("th",[a("input",{ref:"inps",refInFor:!0,attrs:{type:"checkbox","data-index":n},domProps:{value:t.id,checked:t.isChecked},on:{click:function(a){return e.changeChecked(a,t)}}})]),a("th",[a("div",{staticClass:"ell"},[e._v(e._s(t.name)),t.publisher?a("span",[e._v("("+e._s(t.publisher.name)+")")]):e._e()])]),a("th",[a("div",{staticClass:"ell"},[e._v(e._s(t.exp)+"   ")])]),a("th",[a("div",{staticClass:"ell"},[e._v(e._s(t.create_time)+" ")])])])}),0)]),e.page.total?a("div",{staticClass:"pages"},[a("Pages",{attrs:{currentPage:e.page.num,total:e.page.total,pageSize:e.page.offset,pageSizes:[e.page.offset,20,50,100]},on:{currentChange:e.currentChange}})],1):e._e()]):e._e(),a("div",{staticClass:"bottom"},[a("el-button",{attrs:{type:"primary",size:"small"},on:{click:e.add}},[e._v("保存   ")])],1)])},i=[];a.d(t,"a",function(){return n}),a.d(t,"b",function(){return i})}}]);