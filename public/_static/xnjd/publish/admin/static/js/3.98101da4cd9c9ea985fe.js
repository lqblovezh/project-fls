(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{1179:function(t,e,s){"use strict";var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"div"},[s("div",{staticClass:"top"},[t._v("选择要发布的格式")]),s("ul",{staticClass:"typesWrap"},[s("li",{staticClass:"li"},[s("div",{staticClass:"type",class:{active:1==t.types.EPUB},on:{click:function(e){t.changeType("EPUB")}}},[s("span",[t._v("EPUB")]),1==t.types.EPUB&&t.progress?s("div",{staticClass:"progress"},[s("span",[t._v("发布中")]),s("span",[t._v(t._s(t.progress))])]):t._e()]),s("div",{staticClass:"tip"},[t._v("适用于")]),t._m(0)]),s("li",{staticClass:"li"},[s("div",{staticClass:"type",class:{active:1==t.types.MOBI},on:{click:function(e){t.changeType("MOBI")}}},[s("span",[t._v("MOBI")]),1==t.types.MOBI&&t.progress?s("div",{staticClass:"progress"},[s("span",[t._v("发布中")]),s("span",[t._v(t._s(t.progress))])]):t._e()]),s("div",{staticClass:"tip"},[t._v("适用于")]),t._m(1)]),s("li",{staticClass:"li"},[s("div",{staticClass:"type",class:{active:t.types.PDF},on:{click:function(e){t.changeType("PDF")}}},[s("span",[t._v("PDF")]),1==t.types.PDF&&t.progress?s("div",{staticClass:"progress"},[s("span",[t._v("发布中")]),s("span",[t._v(t._s(t.progress))])]):t._e()]),s("div",{staticClass:"tip"},[t._v("适用于")]),t._m(2)]),s("li",{staticClass:"li"},[s("div",{staticClass:"type",class:{active:t.types.WORD},on:{click:function(e){t.changeType("WORD")}}},[s("span",[t._v(" WORD")]),1==t.types.WORD&&t.progress?s("div",{staticClass:"progress"},[s("span",[t._v("发布中")]),s("span",[t._v(t._s(t.progress))])]):t._e()]),s("div",{staticClass:"tip"},[t._v("适用于")]),t._m(3)]),s("li",{staticClass:"li"},[s("div",{staticClass:"type",class:{active:t.types.HTML},on:{click:function(e){t.changeType("HTML")}}},[s("span",[t._v("HTML")]),1==t.types.HTML&&t.progress?s("div",{staticClass:"progress"},[s("span",[t._v("发布中")]),s("span",[t._v(t._s(t.progress))])]):t._e()]),s("div",{staticClass:"tip"},[t._v("适用于")]),t._m(4)])]),s("div",{staticClass:"btns"},[s("el-button",{attrs:{type:"info"},on:{click:function(e){t.$emit("cancle")}}},[t._v("返回")]),s("el-button",{attrs:{type:"primary"},on:{click:t.confirm}},[t._v("确定")])],1)])},r=[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"releaseList"},[e("div",{staticClass:"dd"}),e("div",{staticClass:"qq"}),e("div",{staticClass:"zhangyue"})])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"releaseList"},[e("div",{staticClass:"amazon"})])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"releaseList"},[e("div",{staticClass:"qq"}),e("div",{staticClass:"zhangyue"}),e("div",{staticClass:"amazon"})])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"releaseList"},[e("div",{staticClass:"qq"}),e("div",{staticClass:"zhangyue"})])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"releaseList"},[e("div",{staticClass:"amazon"}),e("div",{staticClass:"qq"}),e("div",{staticClass:"zhangyue"})])}];s.d(e,"a",function(){return i}),s.d(e,"b",function(){return r})},362:function(t,e,s){"use strict";s.r(e);var i=s(363),r=s.n(i);for(var a in i)"default"!==a&&function(t){s.d(e,t,function(){return i[t]})}(a);e.default=r.a},363:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:["groupList","currGroup"],data:function(){return{newGroupDialogOpen:!1,updateGroupDialogOpen:!1,currEditGroup:null}},created:function(){},computed:{},methods:{groupChange:function(t){this.$emit("groupChange",t)},addGroupDialog:function(){},delGroup:function(t){var e=this;this.$confirm("是否删除分组:"+t.name).then(function(s){dir(s),e.$emit("delGroup",t.id)}).catch(function(t){dir(t)})},updateGroupDialog:function(t){this.updateGroupDialogOpen=!0,this.currEditGroup=t},addGroup:function(){if(this.$refs.addGroupForm.valiAll()){var t=document.querySelector("#addGroupForm");this.$emit("addGroup",t),this.newGroupDialogOpen=!1}},updateGroup:function(){if(this.$refs.updateGroupForm.valiAll()){var t=document.querySelector("#updateGroupForm");this.$emit("updateGroup",t),this.updateGroupDialogOpen=!1}}}}},364:function(t,e,s){},365:function(t,e,s){"use strict";s.r(e);var i=s(370),r=s(362);for(var a in r)"default"!==a&&function(t){s.d(e,t,function(){return r[t]})}(a);s(366);var n=s(0),o=Object(n.a)(r.default,i.a,i.b,!1,null,"176cd962",null);o.options.__file="GroupList.vue",e.default=o.exports},366:function(t,e,s){"use strict";var i=s(364);s.n(i).a},370:function(t,e,s){"use strict";var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"div"},[s("div",{staticClass:"groupWrap"},[s("div",{staticClass:"list"},[s("ul",t._l(t.groupList,function(e){return s("li",{staticClass:"licontent",class:{red:e.id==t.currGroup}},[s("div",{staticClass:"name ellipsis",attrs:{title:e.name+"("+e.num+")"},on:{click:function(s){t.groupChange(e.id)}}},[s("span",{staticClass:"title"},[t._v(t._s(e.name))]),s("span",[t._v(t._s("("+e.num+")"))])]),""!=e.id&&"non"!=e.id?s("div",{staticClass:"btns"},[s("span",{on:{click:function(s){t.updateGroupDialog(e)}}},[s("i",{staticClass:"el-icon-edit"})]),s("span",{on:{click:function(s){t.delGroup(e)}}},[s("i",{staticClass:"el-icon-delete"})])]):t._e()])}))]),s("div",{staticClass:"addGroupBtnWrap"},[s("el-button",{attrs:{type:"primary",plain:""},on:{click:function(e){t.newGroupDialogOpen=!0}}},[s("i",{staticClass:"el-icon-plus"},[t._v("新建分组")])])],1)]),s("div",{staticClass:"dialogs"},[t.newGroupDialogOpen?s("el-dialog",{attrs:{title:"新增",visible:t.newGroupDialogOpen,width:"500px"},on:{"update:visible":function(e){t.newGroupDialogOpen=e}}},[s("div",{staticClass:"formWrap"},[s("VaForm",{ref:"addGroupForm"},[s("form",{attrs:{id:"addGroupForm"}},[s("div",{staticClass:"group"},[s("input",{directives:[{name:"va",rawName:"v-va",value:{type:"required"},expression:"{ type:'required' }"}],staticClass:"form-control",attrs:{name:"name"}})])])])],1),s("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[s("el-button",{attrs:{type:"info"},on:{click:function(e){t.newGroupDialogOpen=!1}}},[t._v("取消")]),s("el-button",{attrs:{type:"primary"},on:{click:t.addGroup}},[t._v("确定")])],1)]):t._e(),t.updateGroupDialogOpen?s("el-dialog",{attrs:{title:"修改",visible:t.updateGroupDialogOpen,width:"500px"},on:{"update:visible":function(e){t.updateGroupDialogOpen=e}}},[s("div",{staticClass:"formWrap"},[s("VaForm",{ref:"updateGroupForm"},[t.currEditGroup?s("form",{attrs:{id:"updateGroupForm"}},[s("div",{staticClass:"group"},[s("input",{directives:[{name:"va",rawName:"v-va",value:{type:"required"},expression:"{ type:'required' }"}],staticClass:"form-control",attrs:{name:"name"},domProps:{value:t.currEditGroup.name}}),s("input",{staticClass:"hide",attrs:{name:"id"},domProps:{value:t.currEditGroup.id}})])]):t._e()])],1),s("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[s("el-button",{attrs:{type:"info"},on:{click:function(e){t.updateGroupDialogOpen=!1}}},[t._v("取消")]),s("el-button",{attrs:{type:"primary"},on:{click:t.updateGroup}},[t._v("确定")])],1)]):t._e()],1)])},r=[];s.d(e,"a",function(){return i}),s.d(e,"b",function(){return r})},404:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.modifyBooks=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=t.id,s=u(t,["id"]);return(0,i.request_put)(c({id:e}),s)},e.educe=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,n.educeResListener)({res_url:(0,i.getFullPath)("/api/books/export"+a.default.stringify(t,{addQueryPrefix:!0}))}),(0,i.request_get)("/api/books/export",t)},e.putin=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,i.request_post)("/api/books/import",t)},e.fabu=function(t){return log("请求等等等等等等等等等等等等"),(0,i.request_post)("/api/mult_books",t)},e.getProgress=function(t){return(0,i.request_get)("/api/mult_book/progress/"+t)},e.deleteBooks=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,i.request_post)("/api/books/delete",t)},e.listBooks=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,i.request_get)("/api/books",t)},e.detailBooks=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=t.id,s=u(t,["id"]);return(0,i.request_get)(c({id:e}),s)},e.addBooks=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,i.request_post)("/api/books",t).then(function(e){(0,n.createProListener)({res_id:e.data.task_id,res_type:"数字图书",res_cover:t.img,res_covers:"",res_exp:t.abs,res_author:t.author,res_author_id:"",res_Interpreter:"",res_Interpreter_id:"",res_lables:"",res_currency:"",res_money:"",res_isbn:"",res_isbn_ext:"",res_publication:""})})},e.getBookCatalog=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=t.id,s=u(t,["id"]);return(0,i.request_get)(l({id:e}),s)},e.modifyGroup=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=t.id,s=u(t,["id"]);return(0,i.request_put)(p({id:e}),s)},e.deleteGroup=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=t.id,s=u(t,["id"]);return(0,i.request_delete)(p({id:e}),s)},e.addGroup=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,i.request_post)("/api/books/groups",t)},e.listGroup=function(){return(0,i.request_get)("/api/books/groups")},e.moveGroup=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,i.request_put)("/api/groups/books",t)},e.siblingSort=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=t.id,s=u(t,["id"]);return(0,i.request_put)(d({id:e}),s)},e.moveCatalog=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=(t.id,u(t,["id"]));return(0,i.request_put)("/api/catalogs/outline",e)},e.products=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,i.request_post)("/api/books/products",t)};var i=s(4),r=o(s(8)),a=o(s(12)),n=s(83);function o(t){return t&&t.__esModule?t:{default:t}}function u(t,e){var s={};for(var i in t)e.indexOf(i)>=0||Object.prototype.hasOwnProperty.call(t,i)&&(s[i]=t[i]);return s}var c=r.default.compile("/api/books/:id"),l=r.default.compile("/api/books/:id/catalogs"),p=r.default.compile("/api/books/groups/:id"),d=r.default.compile("/api/catalogs/sort/:id")},611:function(t,e,s){"use strict";s.r(e);var i=s(1179),r=s(612);for(var a in r)"default"!==a&&function(t){s.d(e,t,function(){return r[t]})}(a);s(881);var n=s(0),o=Object(n.a)(r.default,i.a,i.b,!1,null,"52ff53d8",null);o.options.__file="release.vue",e.default=o.exports},612:function(t,e,s){"use strict";s.r(e);var i=s(613),r=s.n(i);for(var a in i)"default"!==a&&function(t){s.d(e,t,function(){return i[t]})}(a);e.default=r.a},613:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i,r=s(82),a=((i=r)&&i.__esModule,function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var s in t)Object.prototype.hasOwnProperty.call(t,s)&&(e[s]=t[s]);return e.default=t,e}(s(404)));e.default={props:["ids"],data:function(){return{currType:"EPUB",types:{},task_id:"2fcb4bb0117349718b14aab58265e440",progress:null}},methods:{confirm:function(){var t=this;log(this.progress),this.progress&&"100%"!=this.progress?this.$message.error("发布中"):(this.$emit("releaseBack",this.currType),a.fabu({id:this.ids,type:this.getTypes2Arr()}).then(function(e){log("发布结果",e),t.task_id=e.data.task_id,t.progress="0%",t.getProgress(t.task_id)}).catch(function(e){t.$message.error("发布失败!",e)}))},getProgress:function(t){var e=this;log("获取进度"),this.intervalid=setInterval(function(){a.getProgress(t).then(function(t){log("进度",t.data),e.progress=t.data.chunk+"%",100==t.data.chunk&&(e.$message.success("发布成功!"),e.$emit("cancle"),clearInterval(e.intervalid))}).catch(function(t){e.$message.error("获取发布进度失败!"),clearInterval(e.intervalid)})},3e3)},changeType:function(t){this.progress||this.$set(this.types,t,!this.types[t])},getTypes2Arr:function(){var t=[];for(var e in this.types){if(this.types.hasOwnProperty(e))this.types[e]&&t.push(e.toLowerCase())}return t}},destroyed:function(){clearInterval(this.intervalid)}}},614:function(t,e,s){},881:function(t,e,s){"use strict";var i=s(614);s.n(i).a}}]);