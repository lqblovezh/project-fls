(window.webpackJsonp=window.webpackJsonp||[]).push([[34],{1097:function(t,e,i){"use strict";var a=i(802);i.n(a).a},1128:function(t,e,i){"use strict";var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"index clearfix"},[i("Top",{attrs:{currentPlant:"X-PUBLISH"}}),i("Menu"),i("div",{staticClass:"mainRight"},[i("div",{staticClass:"contentWrap"},[i("div",{staticClass:"contentLeft"},[i("div",{staticClass:"maindata"},[i("div",{staticClass:"serachWrap"},[i("div",{staticClass:"title"}),i("form",{staticClass:"clearfix",attrs:{id:"mainForm"}},[i("span",{staticClass:"group-inline"},[i("el-input",{attrs:{placeholder:"资源名称",name:"name",clearable:""}})],1),i("span",{staticClass:"group-inline"},[i("TimePick",{attrs:{inputsName:["start_time","end_time"]}})],1),i("span",{staticClass:"group-inline"},[i("select",{staticClass:"form-control",staticStyle:{width:"110px"},attrs:{placeholder:"状态",name:"status"}},[i("option",{attrs:{value:""}},[t._v("审核状态")]),t._l(t.status,function(e,a){return i("option",{domProps:{value:a}},[t._v(t._s(e))])})],2)]),i("span",{staticClass:"group-inline right"},[i("el-button",{attrs:{size:"mediu",type:"primary",icon:"el-icon-search",plain:""},on:{click:t.query}},[t._v("搜索")]),i("el-button",{attrs:{size:"mediu",type:"primary",icon:"el-icon-plus"},on:{click:function(e){t.opneDetailDialog("info")}}},[t._v("新建")])],1)])]),i("div",{staticClass:"tableWrap"},[i("div",{staticClass:"tableTop"},[i("div",{staticClass:"title vel-line"},[i("span",[t._v("全部 "),t.page?i("span",{staticClass:"totalNum"},[t._v("("+t._s(t.page.total)+")")]):t._e()]),i("div",{staticClass:"btns"},[i("el-button",{attrs:{size:"mini",type:"primary",plain:""},on:{click:function(e){t.auditsPass()}}},[t._v("审核")]),i("el-button",{attrs:{size:"mini",type:"primary",plain:""},on:{click:t.urgentDigital}},[t._v("加急审核")]),i("el-button",{attrs:{size:"mini",type:"primary",plain:""},on:{click:function(e){t.delChoosen(!1)}}},[t._v("删除")])],1)])]),i("table",{staticClass:"table"},[i("thead",[i("tr",[i("th",{staticClass:"allBtn"},[i("input",{attrs:{type:"checkbox"},on:{click:function(e){t.checkAll(e)}}})]),i("th",[t._v("名称")]),i("th",[t._v("所含内容")]),i("th",{attrs:{width:"70"}},[t._v("审核状态")]),i("th",{attrs:{width:"70"}},[t._v("分发状态")]),i("th",{staticClass:"time"},[t._v("分发时间")]),i("th",[t._v("所属用户")]),i("th",[t._v("授权价格")]),i("th",{staticClass:"operate"},[t._v("操作")])])]),t.list?i("tbody",t._l(t.list,function(e){return i("tr",[i("td",[i("input",{ref:"ids",refInFor:!0,attrs:{type:"checkbox",name:"ids"},domProps:{value:e.id}})]),i("td",[i("img",{staticClass:"cover-photo",attrs:{src:e.img_src}}),i("div",{staticClass:"th-name bookName",attrs:{title:e.name}},[t._v(t._s(e.name))])]),i("td",[t._v("视频 音频")]),i("td",{class:t.getColor(e.status)},[t._v(t._s(e.status))]),i("td",[t._v(t._s(e.release_status_name||"-"))]),i("td",[t._v(t._s(e.release_time||"-"))]),i("td",[t._v(t._s(e.belong||"暂无用户"))]),i("td",[t._v(t._s(e.price||"15"))]),i("td",[i("div",{staticClass:"btns"},[i("span",{staticClass:"icon icon-detail",attrs:{size:"mini",title:"详情",type:"primary",plain:""},on:{click:function(i){t.opneDetailDialog("info",e)}}}),1!=e.audits_status?i("span",{staticClass:"icon icon-publish",attrs:{size:"mini",title:"审核",type:"primary",plain:""},on:{click:function(i){t.auditsPass(e.id)}}}):t._e(),3==e.audits_status?i("span",{staticClass:"icon icon-fenfa",attrs:{size:"mini",title:"分发",type:"primary",plain:""},on:{click:function(i){t.opnePublishDialog(e)}}}):t._e(),1!=e.audits_status?i("span",{staticClass:"icon icon-delete",attrs:{size:"mini",title:"删除",type:"primary",plain:""},on:{click:function(i){t.delChoosen(e.id)}}}):t._e()])])])})):t._e()]),t.page?i("div",{staticClass:"pageWrap"},[i("el-pagination",{attrs:{small:!1,background:"","current-page":t.page.num,"page-sizes":[10,50,100],"page-size":t.page.offset,layout:"total, sizes,prev, pager, next, jumper",total:t.page.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1):t._e()])])])])]),i("div",{staticClass:"dialogs"},[i("Examine",{attrs:{examineDialog:t.examineDialog},on:{"update:examineDialog":function(e){t.examineDialog=e},saveExamine:t.saveExamine}}),t.publishDialog?i("Dispense",{attrs:{publishDialog:t.publishDialog,item:t.detailData},on:{"update:publishDialog":function(e){t.publishDialog=e},dispenseOk:t.dispenseOk}}):t._e(),i("el-dialog",{staticClass:"no-footer",attrs:{center:!1,visible:t.detailDialog,"close-on-click-modal":!1,top:"50px",width:"1200px"},on:{"update:visible":function(e){t.detailDialog=e}}},[i("div",{staticClass:"content",attrs:{slot:"title"},slot:"title"},[t.detailDialog?i("Detail",{attrs:{type:t.detailDialoaType,detailDialog:t.detailDialog,detailData:t.detailData,services:t.services,media:2,readOnly:t.readOnly},on:{saveok:t.saveOk,"update:detailDialog":function(e){t.detailDialog=e}}}):t._e()],1)])],1)],1)},s=[];i.d(e,"a",function(){return a}),i.d(e,"b",function(){return s})},351:function(t,e,i){"use strict";i.r(e);var a=i(1128),s=i(800);for(var n in s)"default"!==n&&function(t){i.d(e,t,function(){return s[t]})}(n);i(1097);var o=i(0),r=Object(o.a)(s.default,a.a,a.b,!1,null,"589aa9e4",null);r.options.__file="index.vue",e.default=r.exports},362:function(t,e,i){"use strict";i.r(e);var a=i(363),s=i.n(a);for(var n in a)"default"!==n&&function(t){i.d(e,t,function(){return a[t]})}(n);e.default=s.a},363:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:["groupList","currGroup"],data:function(){return{newGroupDialogOpen:!1,updateGroupDialogOpen:!1,currEditGroup:null}},created:function(){},computed:{},methods:{groupChange:function(t){this.$emit("groupChange",t)},addGroupDialog:function(){},delGroup:function(t){var e=this;this.$confirm("是否删除分组:"+t.name).then(function(i){dir(i),e.$emit("delGroup",t.id)}).catch(function(t){dir(t)})},updateGroupDialog:function(t){this.updateGroupDialogOpen=!0,this.currEditGroup=t},addGroup:function(){if(this.$refs.addGroupForm.valiAll()){var t=document.querySelector("#addGroupForm");this.$emit("addGroup",t),this.newGroupDialogOpen=!1}},updateGroup:function(){if(this.$refs.updateGroupForm.valiAll()){var t=document.querySelector("#updateGroupForm");this.$emit("updateGroup",t),this.updateGroupDialogOpen=!1}}}}},364:function(t,e,i){},365:function(t,e,i){"use strict";i.r(e);var a=i(370),s=i(362);for(var n in s)"default"!==n&&function(t){i.d(e,t,function(){return s[t]})}(n);i(366);var o=i(0),r=Object(o.a)(s.default,a.a,a.b,!1,null,"176cd962",null);r.options.__file="GroupList.vue",e.default=r.exports},366:function(t,e,i){"use strict";var a=i(364);i.n(a).a},367:function(t,e,i){"use strict";i.r(e);var a=i(368),s=i.n(a);for(var n in a)"default"!==n&&function(t){i.d(e,t,function(){return a[t]})}(n);e.default=s.a},368:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i(122),s=i(123);e.default={mixins:[a.getIconStyle],props:{publishDialog:{type:Boolean,default:!1},item:{type:Object,default:{}},is_release:Boolean},data:function(){return{list:null,coverDialog:!1,choiceDialog:!1,currentItem:null,currentVersion:null}},created:function(){this.getList()},methods:{getList:function(){var t=this;(0,s.getDispense)({entity_type:this.item.type_number||this.item.type,id:this.item.id}).then(function(e){t.list=e.data}).catch(function(e){var i=e.payload;for(var a in i.messages){t.$message.error(i.messages[a]);break}})},colse:function(){this.$emit("update:publishDialog",!1)},save:function(){var t=[];this.$refs.dispense.querySelectorAll("input[type=checkbox]:checked").forEach(function(e){t.push(e.value)}),t.length?this.$emit("dispenseSave",t):this.$message.error("请选择你要发布的平台")},pushTime:function(t){return t?"最近"+t+"发布过":"最近暂无分发"},push:function(t){var e=this;this.currentItem=t,this.is_release&&t.release_msg.length?this.$confirm("信息不全是否分发?").then(function(i){t.version?e.coverDialog=!0:e.dispense()},function(t){var e=t.payload;log(e.message)}).catch(function(t){log("cancel")}):t.version&&t.version.length?this.coverDialog=!0:this.dispense()},dispense:function(t,e){var i=this;(0,s.dispense)({platform_id:this.currentItem.id,audits_id:this.item.audits_id,is_cover:t,version_id:e}).then(function(t){i.$message.success("分发提交成功,请稍后查看结果!"),i.$emit("dispenseOk")}).catch(function(t){var e=t.payload;for(var a in e.messages){i.$message.error(e.messages[a]);break}})},getdefect:function(t){return"缺失字段: "+t.release_msg.join("/")},getBtnName:function(t){return this.is_release&&!t.is_release?"缺少关键信息不能分发":t.release_msg&&t.release_msg.length?"确认分发":"分发"},coverDispense:function(){var t=this;if(!this.currentVersion)return this.$message.warning("请选择你要覆盖的版本号!");var e=this.currentItem.version.find(function(e){return e.xread_book_id===t.currentVersion}).version_id;this.dispense(this.currentVersion,e)}}}},369:function(t,e,i){},370:function(t,e,i){"use strict";var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"div"},[i("div",{staticClass:"groupWrap"},[i("div",{staticClass:"list"},[i("ul",t._l(t.groupList,function(e){return i("li",{staticClass:"licontent",class:{red:e.id==t.currGroup}},[i("div",{staticClass:"name ellipsis",attrs:{title:e.name+"("+e.num+")"},on:{click:function(i){t.groupChange(e.id)}}},[i("span",{staticClass:"title"},[t._v(t._s(e.name))]),i("span",[t._v(t._s("("+e.num+")"))])]),""!=e.id&&"non"!=e.id?i("div",{staticClass:"btns"},[i("span",{on:{click:function(i){t.updateGroupDialog(e)}}},[i("i",{staticClass:"el-icon-edit"})]),i("span",{on:{click:function(i){t.delGroup(e)}}},[i("i",{staticClass:"el-icon-delete"})])]):t._e()])}))]),i("div",{staticClass:"addGroupBtnWrap"},[i("el-button",{attrs:{type:"primary",plain:""},on:{click:function(e){t.newGroupDialogOpen=!0}}},[i("i",{staticClass:"el-icon-plus"},[t._v("新建分组")])])],1)]),i("div",{staticClass:"dialogs"},[t.newGroupDialogOpen?i("el-dialog",{attrs:{title:"新增",visible:t.newGroupDialogOpen,width:"500px"},on:{"update:visible":function(e){t.newGroupDialogOpen=e}}},[i("div",{staticClass:"formWrap"},[i("VaForm",{ref:"addGroupForm"},[i("form",{attrs:{id:"addGroupForm"}},[i("div",{staticClass:"group"},[i("input",{directives:[{name:"va",rawName:"v-va",value:{type:"required"},expression:"{ type:'required' }"}],staticClass:"form-control",attrs:{name:"name"}})])])])],1),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{type:"info"},on:{click:function(e){t.newGroupDialogOpen=!1}}},[t._v("取消")]),i("el-button",{attrs:{type:"primary"},on:{click:t.addGroup}},[t._v("确定")])],1)]):t._e(),t.updateGroupDialogOpen?i("el-dialog",{attrs:{title:"修改",visible:t.updateGroupDialogOpen,width:"500px"},on:{"update:visible":function(e){t.updateGroupDialogOpen=e}}},[i("div",{staticClass:"formWrap"},[i("VaForm",{ref:"updateGroupForm"},[t.currEditGroup?i("form",{attrs:{id:"updateGroupForm"}},[i("div",{staticClass:"group"},[i("input",{directives:[{name:"va",rawName:"v-va",value:{type:"required"},expression:"{ type:'required' }"}],staticClass:"form-control",attrs:{name:"name"},domProps:{value:t.currEditGroup.name}}),i("input",{staticClass:"hide",attrs:{name:"id"},domProps:{value:t.currEditGroup.id}})])]):t._e()])],1),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{type:"info"},on:{click:function(e){t.updateGroupDialogOpen=!1}}},[t._v("取消")]),i("el-button",{attrs:{type:"primary"},on:{click:t.updateGroup}},[t._v("确定")])],1)]):t._e()],1)])},s=[];i.d(e,"a",function(){return a}),i.d(e,"b",function(){return s})},376:function(t,e,i){"use strict";i.r(e);var a=i(378),s=i(367);for(var n in s)"default"!==n&&function(t){i.d(e,t,function(){return s[t]})}(n);i(377);var o=i(0),r=Object(o.a)(s.default,a.a,a.b,!1,null,"1fd5a38b",null);r.options.__file="Dispense.vue",e.default=r.exports},377:function(t,e,i){"use strict";var a=i(369);i.n(a).a},378:function(t,e,i){"use strict";var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("el-dialog",{attrs:{center:!1,visible:t.coverDialog,top:"50px",width:"500px","show-close":!1,title:"x-read系统中已有该产品，选择你的操作"}},[i("div",{staticClass:"coverContent"},[i("el-button",{attrs:{type:"primary"},on:{click:function(e){t.choiceDialog=!0}}},[t._v("覆盖原有产品")]),i("el-button",{attrs:{type:"primary"},on:{click:function(e){t.dispense()}}},[t._v("创建新的产品版本")])],1),i("div",{staticClass:"footer dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{type:"info"},on:{click:function(e){t.coverDialog=!1}}},[t._v("取消")])],1)]),t.choiceDialog?i("el-dialog",{attrs:{center:!1,visible:t.choiceDialog,top:"50px",width:"500px","show-close":!1,title:"选择版本号"}},[i("div",{staticClass:"coverContent"},[i("el-radio-group",{model:{value:t.currentVersion,callback:function(e){t.currentVersion=e},expression:"currentVersion"}},t._l(t.currentItem.version,function(e){return i("el-radio",{key:e.xread_book_id,attrs:{label:e.xread_book_id}},[t._v(t._s(e.version_id))])}))],1),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{type:"primary"},on:{click:t.coverDispense}},[t._v("确定")]),i("el-button",{attrs:{type:"info"},on:{click:function(e){t.choiceDialog=!1}}},[t._v("取消")])],1)]):t._e(),i("el-dialog",{attrs:{center:!1,visible:t.publishDialog,top:"50px",width:"1000px","show-close":!1}},[i("div",{staticClass:"header",attrs:{slot:"title"},slot:"title"},[i("div",{staticClass:"el-icon-close",on:{click:t.colse}}),i("el-tabs",{attrs:{value:"ff"}},[i("el-tab-pane",{attrs:{label:"分发",name:"ff"}})],1)],1),i("ul",{ref:"dispense",staticClass:"content modular"},t._l(t.list,function(e){return i("li",[i("div",{staticClass:"icon"},[i("div",{class:t.getStyle(e.type)}),i("span",{domProps:{textContent:t._s(e.name)}})]),i("ul",{staticClass:"defect"},[e.release_msg&&!e.release_msg.length?i("li",{staticClass:"pass"},[t._v("可正常分发")]):t._e(),e.release_msg&&e.release_msg.length?i("li",{domProps:{textContent:t._s(t.getdefect(e))}}):t._e()]),i("el-button",{attrs:{type:!t.is_release||e.is_release?"primary":"info",size:"mini",plain:""},domProps:{textContent:t._s(t.getBtnName(e))},on:{click:function(i){(!t.is_release||e.is_release)&&t.push(e)}}})],1)})),i("div",{staticClass:"footer dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{type:"info"},on:{click:t.colse}},[t._v("取消")])],1)])],1)},s=[];i.d(e,"a",function(){return a}),i.d(e,"b",function(){return s})},403:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={0:"未审核",1:"待审核",2:"未通过",3:"已通过"}},800:function(t,e,i){"use strict";i.r(e);var a=i(801),s=i.n(a);for(var n in a)"default"!==n&&function(t){i.d(e,t,function(){return a[t]})}(n);e.default=s.a},801:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=f(i(3)),s=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var i=arguments[e];for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(t[a]=i[a])}return t},n=(f(i(82)),f(i(376))),o=f(i(155)),r=f(i(154)),l=f(i(365)),u=f(i(508)),c=f(i(403)),d=i(122),p=function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e.default=t,e}(i(509));function f(t){return t&&t.__esModule?t:{default:t}}e.default={mixins:[d.main],components:{Menu:o.default,Top:r.default,GroupList:l.default,Detail:u.default,Dispense:n.default},data:function(){return{services:p,list:null,page:null,groupList:null,detailDialog:!1,detailDialoaType:"info",detailData:{},publishDialog:!1,moveToOtherDiaolog:!1,moveIds:null,toId:null,status:c.default,chocesArray:[]}},methods:{getList:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.page&&this.page.num||1,e=this,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:this.page&&this.page.offset||10,a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;p.getList(s({pageNum:t,pageOffset:i},a)).then(function(t){e.list=t.data,e.page=t.page})},saveOk:function(t){this.detailData.id||(this.detailData=t),this.getList()},urgentDigital:function(){for(var t=this,e=this.getChecked(),i=0,a=e.length;i<a;i++)for(var s=0,n=this.list.length;s<n;s++)if(this.list[s].id==e[i]&&1!=this.list[s].audits_status)return void this.$message.error("只能勾选待审核数据");e&&this.services.urgentDigital({id:e}).then(function(e){return t.$message.success("已提交加急审核")})},opneDetailDialog:function(){var t,e=(t=a.default.mark(function t(e,i){var s=this;return a.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(this.detailData={},!i){t.next=4;break}return t.next=4,p.getInfo(i.id).then(function(t){s.readOnly=!(!i||1!=i.audits_status),s.detailData=t.data});case 4:this.detailDialog=!0;case 5:case"end":return t.stop()}},t,this)}),function(){var e=t.apply(this,arguments);return new Promise(function(t,i){return function a(s,n){try{var o=e[s](n),r=o.value}catch(t){return void i(t)}if(!o.done)return Promise.resolve(r).then(function(t){a("next",t)},function(t){a("throw",t)});t(r)}("next")})});return function(t,i){return e.apply(this,arguments)}}()}}},802:function(t,e,i){}}]);