/*!
 * {
 *   "buildtime": "2019-07-19 15:10:33",
 *   "workspace": "F:\\project\\x-book4\\js",
 *   "username": "Administrator",
 *   "hostname": "PC201608171616",
 *   "platform": "win32",
 *   "git": {
 *     "branch": "master",
 *     "hash": "95ac4eac7",
 *     "message": [
 *       "commit 95ac4eac704fa029807f3f814b494e89f845f835",
 *       "Author: YangZai <552396385@qq.com>",
 *       "Date:   Fri Jul 19 15:09:46 2019 +0800",
 *       "    xx"
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
(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{1106:function(t,e,a){"use strict";a.r(e);var i=a(1450),n=a(683);for(var s in n)"default"!==s&&function(t){a.d(e,t,function(){return n[t]})}(s);a(1107);var r=a(1),l=Object(r.a)(n.default,i.a,i.b,!1,null,"2681b87a",null);e.default=l.exports},1107:function(t,e,a){"use strict";var i=a(685);a.n(i).a},1108:function(t,e,a){"use strict";var i=a(686);a.n(i).a},1443:function(t,e,a){"use strict";function i(){var a=this,t=a.$createElement,i=a._self._c||t;return i("div",{staticClass:"index clearfix"},[i("div",{staticClass:"dialogs"},[a.detailVisible?i("el-dialog",{attrs:{center:!1,visible:a.detailVisible,"close-on-click-modal":!1,top:"50px",width:"1000px"},on:{"update:visible":function(t){a.detailVisible=t}}},[i("div",{staticClass:"content",attrs:{slot:"title"},slot:"title"},[i("Detail",{attrs:{detailData:a.detailData},on:{saveOk:a.saveOk}})],1)]):a._e()],1),i("div",{staticClass:"mainRight"},[i("div",{staticClass:"contentWrap"},[i("div",{staticClass:"contentLeft"},[i("div",{staticClass:"maindata"},[i("div",{staticClass:"serachWrap"},[i("div",{staticClass:"title"}),i("form",{staticClass:"clearfix",attrs:{id:"mainForm"}},[i("span",{staticClass:"group-inline"},[i("el-input",{attrs:{placeholder:"名称",name:"name",clearable:""},model:{value:a.searchQuery.name,callback:function(t){a.$set(a.searchQuery,"name",t)},expression:"searchQuery.name"}})],1),i("span",{staticClass:"group-inline"},[i("el-input",{attrs:{placeholder:"标签",name:"tag",clearable:""},model:{value:a.searchQuery.tag,callback:function(t){a.$set(a.searchQuery,"tag",t)},expression:"searchQuery.tag"}})],1),i("span",{staticClass:"group-inline"},[i("TimePick",{attrs:{inputsName:["start_time","end_time"]}})],1),i("span",{staticClass:"group-inline float-right"},[i("el-button",{attrs:{size:"mediu",type:"primary",icon:"el-icon-search",plain:""},on:{click:a.query}},[a._v("搜索")]),i("el-button",{attrs:{size:"mediu",type:"primary",icon:"el-icon-plus",plain:""},on:{click:function(t){return a.opneDetailDialog("xq")}}},[a._v("新建")])],1)])]),i("div",{staticClass:"tableWrap"},[i("div",{staticClass:"tableTop"},[i("div",{staticClass:"title vel-line"},[i("span",[a._v("全部 "),a.page?i("span",{staticClass:"totalNum"},[a._v("("+a._s(a.page.total)+")")]):a._e()]),i("div",{staticClass:"btns"},[i("el-button",{attrs:{size:"mini",type:"primary",plain:""},on:{click:function(t){return a.delChoosen(!1)}}},[a._v("删除")])],1)])]),i("table",{staticClass:"table"},[i("thead",[i("tr",[i("th",{staticClass:"table-check"},[i("input",{attrs:{type:"checkbox"},on:{click:function(t){return a.$checkAll(t)}}})]),i("th",[a._v("名称")]),i("th",[a._v("创建时间")]),i("th",{attrs:{width:"100"}},[a._v("操作")])])]),a.list?i("tbody",a._l(a.list,function(e){return i("tr",[i("th",[i("input",{ref:"ids",refInFor:!0,attrs:{type:"checkbox",name:"ids"},domProps:{value:e.id}})]),i("th",[i("img",{staticClass:"cover-photo"}),i("div",{staticClass:"th-name bookName",attrs:{title:e.name}},[a._v(a._s(e.name))])]),i("th",[i("div",{staticClass:"th-name"},[a._v(a._s(e.create_time))])]),i("th",[i("div",{staticClass:"btns"},[i("Icon",{attrs:{type:"icon-detail",title:"详情"},on:{click:function(t){return a.opneDetailDialog("xq",e.id)}}}),i("Icon",{attrs:{type:"icon-delete",title:"删除"},on:{click:function(t){return a.delChoosen(e.id)}}})],1)])])}),0):a._e()])])]),a.page?i("div",{staticClass:"pageWrap"},[i("el-pagination",{attrs:{small:!1,background:"","current-page":a.page.num,"page-sizes":[10,50,100],"page-size":a.page.offset,layout:"total, sizes,prev, pager, next, jumper",total:a.page.total},on:{"size-change":a.handleSizeChange,"current-change":a.handleCurrentChange}})],1):a._e()])]),a.detailAddDialog?i("Resource",{attrs:{detailAddDialog:a.detailAddDialog,curSoucesList:a.list},on:{"update:detailAddDialog":function(t){a.detailAddDialog=t},"update:detail-add-dialog":function(t){a.detailAddDialog=t},select:a.addSelection}}):a._e()],1)])}var n=[];a.d(e,"a",function(){return i}),a.d(e,"b",function(){return n})},1450:function(t,e,a){"use strict";function i(){var a=this,t=a.$createElement,i=a._self._c||t;return i("div",{staticClass:"div"},[a.resourceDialog?i("Resource",{attrs:{resourceDialog:a.resourceDialog,curSoucesList:[],singleElection:!1},on:{"update:resourceDialog":function(t){a.resourceDialog=t},"update:resource-dialog":function(t){a.resourceDialog=t},select:a.addSelcet}}):a._e(),i("div",{staticClass:"top"},[i("span",[a._v("首部")]),i("div",{staticClass:"left"},[i("el-input",{attrs:{placeholder:"文章标题"},model:{value:a.detailDate.name,callback:function(t){a.$set(a.detailDate,"name",t)},expression:"detailDate.name"}}),i("el-input",{attrs:{placeholder:"链接设置"},model:{value:a.detailDate.link,callback:function(t){a.$set(a.detailDate,"link",t)},expression:"detailDate.link"}}),i("span",{domProps:{textContent:a._s(a.detailDate.book_name)}}),i("el-button",{attrs:{type:"primary",size:"small",plain:""},on:{click:function(t){return a.openResources()}}},[a._v("选择本地资源")])],1),i("div",{staticClass:"right"},[i("img",{ref:"mainImage",staticClass:"img",attrs:{src:a.detailDate.img_src}}),i("el-button",{attrs:{type:"primary",size:"small",plain:""},on:{click:function(t){return a.updateImg()}}},[a._v("上传")])],1)]),i("div",{staticClass:"bottom"},[i("span",[a._v("次级")]),i("div",{staticClass:"box"},a._l(a.list,function(e){return i("div",{staticClass:"list"},[i("div",{staticClass:"left"},[i("el-input",{attrs:{placeholder:"文章标题"},model:{value:e.name,callback:function(t){a.$set(e,"name",t)},expression:"item.name"}}),i("el-input",{attrs:{placeholder:"链接设置"},model:{value:e.link,callback:function(t){a.$set(e,"link",t)},expression:"item.link"}}),i("span",{domProps:{textContent:a._s(e.book_name)}}),i("el-button",{attrs:{type:"primary",size:"small",plain:""},on:{click:function(t){return a.openResources(e.id)}}},[a._v("选择本地资源")])],1),i("div",{staticClass:"right"},[i("img",{ref:e.id,refInFor:!0,staticClass:"img",attrs:{src:e.img_src}}),i("el-button",{attrs:{type:"primary",size:"small",plain:""},on:{click:function(t){return a.updateImg(e.id)}}},[a._v("上传")])],1)])}),0),i("div",{staticClass:"btn"},[i("el-button",{staticClass:"el-icon-plus",attrs:{type:"primary",size:"small"},on:{click:function(t){return a.add()}}},[a._v("增加次级")])],1)]),i("div",{staticClass:"btns"},[i("input",{ref:"updateImg",staticClass:"hide",attrs:{type:"file",accept:"image/jpeg,image/jpg,image/png"},on:{change:function(t){return a.update(t)}}}),i("el-button",{attrs:{type:"primary"},on:{click:function(t){return a.save()}}},[a._v("保存")])],1)],1)}var n=[];a.d(e,"a",function(){return i}),a.d(e,"b",function(){return n})},261:function(t,e,a){"use strict";a.r(e);var i=a(1443),n=a(681);for(var s in n)"default"!==s&&function(t){a.d(e,t,function(){return n[t]})}(s);a(1108);var r=a(1),l=Object(r.a)(n.default,i.a,i.b,!1,null,"491c4d66",null);e.default=l.exports},681:function(t,e,a){"use strict";a.r(e);var i=a(682),n=a.n(i);for(var s in i)"default"!==s&&function(t){a.d(e,t,function(){return i[t]})}(s);e.default=n.a},682:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var a=arguments[e];for(var i in a)Object.prototype.hasOwnProperty.call(a,i)&&(t[i]=a[i])}return t},n=a(306),s=(c(a(277)),function(t){{if(t&&t.__esModule)return t;var e={};if(null!=t)for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e.default=t,e}}(a(847))),r=a(50),l=c(a(1106)),o=c(a(288));function c(t){return t&&t.__esModule?t:{default:t}}e.default={components:{Detail:l.default,Resource:o.default},mixins:[n.main],data:function(){return{services:s,detailVisible:!1,detailAddDialog:!1,detailDialoaType:"xq",detailData:{},pustSetDialog:!1,currentPut:null,fabuIds:[]}},methods:i({addSelection:function(t){var i=this;log(t),s.save({id:t}).then(function(t){i.getList(),i.detailAddDialog=!1}).catch(function(t){var e=t.payload;for(var a in e.messages){i.$message.error(e.messages[a]);break}})},setList:function(t){this.setMediaThemelist(t)},setPage:function(t){this.setMediaThemelistPage(t)},saveOk:function(){this.detailVisible=!1,this.getList()}},(0,r.mapMutations)(["setMediaThemelist","setMediaThemelistPage"])),computed:i({},(0,r.mapState)({list:function(t){return t.mediaTheme.list},page:function(t){return t.mediaTheme.page}}))}},683:function(t,e,a){"use strict";a.r(e);var i=a(684),n=a.n(i);for(var s in i)"default"!==s&&function(t){a.d(e,t,function(){return i[t]})}(s);e.default=n.a},684:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i,n=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var a=arguments[e];for(var i in a)Object.prototype.hasOwnProperty.call(a,i)&&(t[i]=a[i])}return t},s=a(80),r=function(t){{if(t&&t.__esModule)return t;var e={};if(null!=t)for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e.default=t,e}}(a(847)),l=a(288),o=(i=l)&&i.__esModule?i:{default:i};e.default={props:["detailData"],components:{Resource:o.default},data:function(){return{currentRef:null,detailDate:{img_src:null,src:null,name:null,book_id:"",link:""},resourceDialog:!1,list:[],id:1e5}},created:function(){this.list=this.detailData.childrens||[],this.detailDate=this.detailData},methods:{update:function(t){var a=this;this.currentRef,(0,s.getTask)(t.target.files[0]).then(function(t){if(a.currentRef){var e=a.list.findIndex(function(t){return t.id===a.currentRef});a.$set(a.list[e],"img_src",t.data.url),a.$set(a.list[e],"src",t.data.path)}else a.$set(a.detailDate,"img_src",t.data.url),a.$set(a.detailDate,"src",t.data.path)})},updateImg:function(t){this.currentRef=t,this.$refs.updateImg.click()},add:function(){this.id+=1,this.list.push({act:"add",name:"",link:"",src:"",book_id:"",id:this.id})},save:function(){var e=this;[].concat(function(t){if(Array.isArray(t)){for(var e=0,a=Array(t.length);e<t.length;e++)a[e]=t[e];return a}return Array.from(t)}(this.list)).forEach(function(t){"add"==t.act&&(t.id=null)});var t=n({},this.detailDate,{childrens:this.list});r.save(t).then(function(t){e.$emit("saveOk")})},openResources:function(t){this.currentRef=t,this.resourceDialog=!0},addSelcet:function(t,e){var a=this;if(this.resourceDialog=!1,this.currentRef){var i=this.list.findIndex(function(t){return t.id===a.currentRef});this.$set(this.list[i],"book_id",e[0].product_id)}else this.$set(this.detailDate,"book_id",e[0].product_id)}}}},685:function(t,e,a){},686:function(t,e,a){},847:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.getList=function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};return(0,n.request_get)("/api/data_discover",t)},e.detail=r,e.del=function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};return(0,n.request_post)("/api/data_discover/delete",t)},e.save=function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{},e=t.id,a=function(t,e){var a={};for(var i in t)0<=e.indexOf(i)||Object.prototype.hasOwnProperty.call(t,i)&&(a[i]=t[i]);return a}(t,["id"]);if(e)return(0,n.request_put)(r({id:e}),a);return(0,n.request_post)("/api/data_discover",a)};var i,n=a(15),s=a(22);var r=((i=s)&&i.__esModule?i:{default:i}).default.compile("/api/data_discover/:id");function r(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};return(0,n.request_get)(r(t))}}}]);