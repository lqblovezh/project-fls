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
(window.webpackJsonp=window.webpackJsonp||[]).push([[20],{1227:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.getList=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,i.request_get)("/api/discover/list",t)},e.del=function(t){var e=t.id;return(0,i.request_delete)(s({id:e[0]}))},e.save=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,i.request_post)("/api/discover/add",t)};var n,i=a(45),r=a(77);var s=((n=r)&&n.__esModule?n:{default:n}).default.compile("/api/discover/:id")},1228:function(t,e,a){"use strict";var n=a(573);a.n(n).a},1274:function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"clearfix"},[a("div",{staticClass:"mainRight"},[a("div",{staticClass:"contentWrap"},[a("div",{staticClass:"contentLeft"},[a("div",{staticClass:"maindata"},[a("div",{staticClass:"tableWrap",staticStyle:{position:"relative",top:"20px"}},[a("div",{staticClass:"tableTop"},[a("div",{staticClass:"title"},[a("el-button",{attrs:{size:"mini",type:"primary",icon:"el-icon-plus"},on:{click:function(e){t.detailAddDialog=!0}}},[t._v("新增")])],1)]),a("table",{staticClass:"table"},[t._m(0),t.list?a("tbody",{ref:"mainBody"},t._l(t.list,function(e){return a("tr",[a("th",[t._v(t._s(e.books_info?e.books_info.name:""))]),a("th",[t._v(t._s(e.type_name))]),a("th",[a("Icon",{attrs:{type:"icon-delete",title:"删除"},on:{click:function(a){return t.del(e.discover_id)}}})],1)])}),0):t._e()])])])])])]),t.detailAddDialog?a("Resource",{attrs:{detailAddDialog:t.detailAddDialog,curSoucesList:t.list},on:{"update:detailAddDialog":function(e){t.detailAddDialog=e},"update:detail-add-dialog":function(e){t.detailAddDialog=e},select:t.addSelection}}):t._e()],1)},i=[function(){var t=this.$createElement,e=this._self._c||t;return e("thead",[e("tr",[e("th",[this._v("名称")]),e("th",[this._v("类型")]),e("th",{attrs:{width:"100"}},[this._v("操作")])])])}];a.d(e,"a",function(){return n}),a.d(e,"b",function(){return i})},237:function(t,e,a){"use strict";a.r(e);var n=a(1274),i=a(571);for(var r in i)"default"!==r&&function(t){a.d(e,t,function(){return i[t]})}(r);a(1228);var s=a(0),o=Object(s.a)(i.default,n.a,n.b,!1,null,"0ca94202",null);e.default=o.exports},377:function(t,e,a){"use strict";a.r(e);var n=a(378),i=a.n(n);for(var r in n)"default"!==r&&function(t){a.d(e,t,function(){return n[t]})}(r);e.default=i.a},378:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=c(a(19)),i=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var a=arguments[e];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(t[n]=a[n])}return t},r=(a(373),function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e.default=t,e}(a(439))),s=c(a(258)),o=a(265);function c(t){return t&&t.__esModule?t:{default:t}}e.default={mixins:[o.publicMixin],props:{detailAddDialog:{type:Boolean,default:!1},singleElection:Boolean,curSoucesList:{type:Array,default:[]}},data:function(){return{dataList:[],page:null,currentType:"book",contentType:[{name:"图书",value:"book"},{name:"主题",value:"theme"},{name:"听读",value:"audio"},{name:"视读",value:"video"},{name:"课件",value:"course"}]}},created:function(){log(this.curSoucesList)},methods:{getList:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.page&&this.page.num||1,e=this,a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:this.page&&this.page.offset||10,n=arguments[2],s=i({pageNum:t,pageOffset:a,shelf:!0},n,{type:this.currentType||this.contentType[0].value});r.getMainList(s).then(function(t){e.dataList=t.data,e.page=t.page})},colse:function(){this.$emit("update:detailAddDialog",!1)},seareHandeler:function(){var t=(0,s.default)(document.querySelector("#detailSearchForm"),{hash:!0});this.getList(1,this.page.offset,t)},addSelection:function(){var t,e=this;return(t=n.default.mark(function t(){var a,i,r,s,o,c,u,l,d,f;return n.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(a=document.querySelector(".addBookForm"),i=a.querySelectorAll('input[name="ids"]:checked'),r=[],i.length){t.next=5;break}return t.abrupt("return",e.$message.warning("请选择添加内容"));case 5:s=function(t){if(e.curSoucesList.findIndex(function(e){return e.b_id==t.value||e.id==t.value})>-1)return"continue";r.push(e.dataList.find(function(e){return e.id==t.value}).id)},o=!0,c=!1,u=void 0,t.prev=9,l=i[Symbol.iterator]();case 11:if(o=(d=l.next()).done){t.next=19;break}if(f=d.value,"continue"!==s(f)){t.next=16;break}return t.abrupt("continue",16);case 16:o=!0,t.next=11;break;case 19:t.next=25;break;case 21:t.prev=21,t.t0=t.catch(9),c=!0,u=t.t0;case 25:t.prev=25,t.prev=26,!o&&l.return&&l.return();case 28:if(t.prev=28,!c){t.next=31;break}throw u;case 31:return t.finish(28);case 32:return t.finish(25);case 33:e.$emit("select",r);case 34:case"end":return t.stop()}},t,e,[[9,21,25,33],[26,,28,32]])}),function(){var e=t.apply(this,arguments);return new Promise(function(t,a){return function n(i,r){try{var s=e[i](r),o=s.value}catch(t){return void a(t)}if(!s.done)return Promise.resolve(o).then(function(t){n("next",t)},function(t){n("throw",t)});t(o)}("next")})})()},checkAll:function(t,e){document.querySelector("."+e).querySelectorAll('input[name="ids"]').forEach(function(e,a){e.checked=t.target.checked})},uncheckedAll:function(t){this.singleElection||(this.$refs.ids.forEach(function(t){return t.checked=!1}),t.target.checked=!0)},isChecked:function(t){return this.curSoucesList.findIndex(function(e){return e.b_id===t||e.id===t})>-1},handleSizeChange:function(t){var e=(0,s.default)(document.querySelector("#detailSearchForm"),{hash:!0});this.getList(1,t,e)},handleCurrentChange:function(t){var e=(0,s.default)(document.querySelector("#detailSearchForm"),{hash:!0});this.getList(t,this.page.offset,e)}},watch:{currentType:function(t){this.getList(1)}}}},379:function(t,e,a){},565:function(t,e,a){"use strict";a.r(e);var n=a(626),i=a(377);for(var r in i)"default"!==r&&function(t){a.d(e,t,function(){return i[t]})}(r);a(566);var s=a(0),o=Object(s.a)(i.default,n.a,n.b,!1,null,"30b808ce",null);e.default=o.exports},566:function(t,e,a){"use strict";var n=a(379);a.n(n).a},571:function(t,e,a){"use strict";a.r(e);var n=a(572),i=a.n(n);for(var r in n)"default"!==r&&function(t){a.d(e,t,function(){return n[t]})}(r);e.default=i.a},572:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n,i=c(a(1227)),r=(c(a(439)),a(265)),s=a(565),o=(n=s)&&n.__esModule?n:{default:n};a(46);function c(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e.default=t,e}e.default={components:{Resource:o.default},mixins:[r.publicMixin,r.circleMixin],data:function(){return{detailAddDialog:!1,constitute:[],services:i}},methods:{addSelection:function(t){var e=this;log(t),i.save({id:t}).then(function(t){e.getList(),e.detailAddDialog=!1}).catch(function(t){var a=t.payload;for(var n in a.messages){e.$message.error(a.messages[n]);break}})}}}},573:function(t,e,a){},626:function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("el-dialog",{attrs:{center:!1,visible:t.detailAddDialog,width:"1000px",top:"50px","show-close":!1,"append-to-body":""}},[a("div",{staticClass:"header",attrs:{slot:"title"},slot:"title"},[a("span",{staticClass:"el-icon-close",on:{click:t.colse}}),a("el-tabs",{attrs:{value:"detail"}},[a("el-tab-pane",{attrs:{label:"添加",name:"detail"}})],1)],1),a("el-form",{staticClass:"addBookForm"},[a("span",{staticClass:"group-inline",staticStyle:{margin:"0 20px"}},[a("el-radio-group",{model:{value:t.currentType,callback:function(e){t.currentType=e},expression:"currentType"}},t._l(t.contentType,function(e){return a("el-radio-button",{key:e.id,attrs:{label:e.value}},[t._v(t._s(e.name))])}),1)],1),a("div",{staticClass:"serachWrap"},[a("form",{attrs:{id:"detailSearchForm"}},[a("span",{staticClass:"group-inline"},[a("input",{staticClass:"form-control",attrs:{placeholder:"输入名称",name:"name"}})]),a("span",{staticClass:"group-inline"},[a("TimePick",{attrs:{inputsName:["start_time","end_time"]}})],1),a("span",{staticClass:"group-inline right"},[a("el-button",{attrs:{type:"primary",icon:"el-icon-search",plain:""},on:{click:t.seareHandeler}},[t._v("搜索")]),a("el-button",{attrs:{type:"primary",plain:""},on:{click:t.addSelection}},[t._v("添加选中")])],1)])]),a("table",{staticClass:"table",attrs:{width:"100%"}},[a("thead",[a("tr",[a("th",{attrs:{width:"50"}},[t._v("选择")]),a("th",[t._v("名称")]),a("th",[t._v("标签")]),a("th",[t._v("类型")]),a("th",[t._v("创建时间")])])]),t.dataList.length?a("tbody",t._l(t.dataList,function(e,n){return a("tr",[a("td",[a("input",{attrs:{type:"checkbox","data-type":e.status,name:"ids"},domProps:{value:e.id,checked:t.isChecked(e.id)}})]),a("td",[t._v(t._s(e.books_info.name))]),a("td",[t._v(t._s(e.books_info.tag))]),a("td",[t._v(t._s(e.type_name))]),a("td",[t._v(t._s(e.create_time))])])}),0):t._e()]),t.page?a("div",{staticClass:"pageWrap"},[a("el-pagination",{attrs:{small:!1,background:"","current-page":t.page.num,"page-sizes":[10,50,100],"page-size":t.page.offset,layout:"total, sizes,prev, pager, next, jumper",total:t.page.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1):t._e()]),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{type:"info"},on:{click:t.colse}},[t._v("取消")]),a("el-button",{attrs:{type:"primary"},on:{click:t.addSelection}},[t._v("确定")])],1)],1)],1)},i=[];a.d(e,"a",function(){return n}),a.d(e,"b",function(){return i})}}]);