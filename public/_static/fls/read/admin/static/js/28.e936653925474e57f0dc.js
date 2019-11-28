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
(window.webpackJsonp=window.webpackJsonp||[]).push([[28],{1243:function(t,e,i){"use strict";var a=i(601);i.n(a).a},1263:function(t,e,i){"use strict";var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"box"},[i("div",{staticClass:"top serachWrap"},[i("form",{attrs:{id:"mainForm"}},[i("span",{staticClass:"group-inline"},[i("el-input",{attrs:{placeholder:"输入单号搜索",name:"order",clearable:""},model:{value:t.where.order,callback:function(e){t.$set(t.where,"order",e)},expression:"where.order"}})],1),i("span",{staticClass:"group-inline"},[i("el-input",{attrs:{placeholder:"输入用户搜索",name:"user_name",clearable:""},model:{value:t.where.user_name,callback:function(e){t.$set(t.where,"user_name",e)},expression:"where.user_name"}})],1),i("span",{staticClass:"group-inline"},[i("el-input",{attrs:{placeholder:"输入手机号搜索",name:"phone",clearable:""},model:{value:t.where.phone,callback:function(e){t.$set(t.where,"phone",e)},expression:"where.phone"}})],1),i("span",{staticClass:"group-inline"},[i("TimePick",{attrs:{inputsName:["start_time","end_time"],placeholder:["创建起始时间","创建结束时间"]}})],1),i("span",{staticClass:"group-inline"},[i("el-select",{attrs:{placeholder:"选择状态搜索"},model:{value:t.where.status,callback:function(e){t.$set(t.where,"status",e)},expression:"where.status"}},t._l(t.status,function(t){return i("el-option",{key:t.txt,attrs:{label:t.txt,value:t.value}})}),1)],1),i("span",{staticClass:"group-inline right"},[i("el-button",{attrs:{type:"primary",plain:"",icon:"el-icon-search"},on:{click:t.search}},[t._v("搜索")]),i("el-button",{attrs:{type:"primary",plain:""},on:{click:function(e){return t.educes()}}},[t._v("导出查询")]),i("el-button",{attrs:{type:"primary",plain:""},on:{click:function(e){return t.settlement()}}},[t._v("批量结算")])],1)])]),i("div",{staticClass:"content"},[i("table",{staticClass:"list"},[i("thead",[i("tr",[i("td",[i("input",{attrs:{type:"checkbox"},on:{click:function(e){return t.$checkAll(e)}}})]),i("td",{attrs:{width:"155"}},[t._v("兑现单号 ")]),i("td",[t._v(" 用户名")]),i("td",[t._v(" 绑定手机号")]),i("td",[t._v(" 提交时间")]),i("td",[t._v(" 兑现金额")]),i("td",[t._v(" 手续费")]),i("td",[t._v(" 应付金额")]),i("td",[t._v(" 承兑方式")]),i("td",[t._v(" 状态")]),i("td",[t._v(" 操作")])])]),i("tbody",t._l(t.list,function(e,a){return i("tr",[i("td",[i("input",{ref:"ids",refInFor:!0,attrs:{type:"checkbox"},domProps:{value:e.id}})]),i("td",[t._v(t._s(e.id))]),i("td",[t._v(t._s(e.distributor_info.distributor_nick))]),i("td",[t._v(t._s(e.distributor_info.distributor_phone))]),i("td",[t._v(t._s(e.create_time))]),i("td",[t._v(t._s(e.money))]),i("td",[t._v(t._s(e.service_money))]),i("td",[t._v(t._s(e.reward_money))]),i("td",[t._v(t._s(e.pay_name))]),i("td",[t._v(t._s(e.pay_status))]),i("td",[i("el-button",{attrs:{size:"medium",type:"primary",plain:""},on:{click:function(i){return t.detail(e.id)}}},[t._v("详情")])],1)])}),0)]),i("div",{staticClass:"page"},[i("el-pagination",{attrs:{background:"","current-page":t.currentPage,"page-sizes":[10,50,100],"page-size":10,layout:"total, sizes, prev, pager, next, jumper",total:t.page.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1)]),t.dialogVisible?i("el-dialog",{staticClass:"dialog",attrs:{width:"60%",visible:t.dialogVisible},on:{"update:visible":function(e){t.dialogVisible=e}}},[i("div",{staticClass:"header",attrs:{slot:"title"},slot:"title"},[i("el-tabs",{attrs:{value:"detail"}},[i("el-tab-pane",{attrs:{label:"详情",name:"detail"}})],1)],1),i("div",{staticClass:"part"},[i("div",{staticClass:"lside"},[t._v("单号信息")]),i("div",{staticClass:"rside"},[i("p",[t._v("订单编号： "+t._s(t.infoData.id))]),i("p",[t._v("兑付用户： "+t._s(t.infoData.user_nick))]),i("p",[t._v("绑定手机号： "+t._s(t.infoData.phone))])])]),i("div",{staticClass:"part"},[i("div",{staticClass:"lside"},[t._v("兑换金额来源")]),i("div",{staticClass:"rside"},[i("el-table",{staticStyle:{width:"100%"},attrs:{data:t.infoData.info,border:"","show-summary":""}},[i("el-table-column",{attrs:{prop:"order_id",label:"订单单号",width:"150"}}),i("el-table-column",{attrs:{prop:"user_id",label:"用户名",width:"160"}}),i("el-table-column",{attrs:{prop:"pay_time",label:"支付时间",width:"160"}}),i("el-table-column",{attrs:{prop:"money",label:"订单金额"}}),i("el-table-column",{attrs:{prop:"distribute_money",label:"分销金额"}}),i("el-table-column",{attrs:{prop:"reward_money",label:"奖励金额"}})],1)],1)]),i("div",{staticClass:"part"},[i("div",{staticClass:"lside"},[t._v("承兑信息")]),i("div",{staticClass:"rside"},[i("p",[t._v("兑现金额： "+t._s(t.infoData.money))]),i("p",[t._v("承兑方式： "+t._s(t.infoData.pay_name))]),i("p",[t._v("开户所在行： "+t._s(t.infoData.pay_info.Bank))]),i("p",[t._v("银行卡号： "+t._s(t.infoData.pay_info.account))]),i("p",[t._v("持卡人姓名： "+t._s(t.infoData.pay_info.name))])])]),i("div",{staticClass:"other"},[i("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(e){return t.payback(t.infoData.id,1)}}},[t._v("已结算")]),i("el-button",{attrs:{type:"danger",size:"small"},on:{click:function(e){return t.payback(t.infoData.id,2)}}},[t._v("驳回兑付       ")])],1),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{type:"info"},on:{click:function(e){t.dialogVisible=!1}}},[t._v("关闭")]),i("el-button",{attrs:{type:"primary"},on:{click:function(e){t.dialogVisible=!1}}},[t._v("确定")])],1)]):t._e()],1)},n=[];i.d(e,"a",function(){return a}),i.d(e,"b",function(){return n})},246:function(t,e,i){"use strict";i.r(e);var a=i(1263),n=i(599);for(var s in n)"default"!==s&&function(t){i.d(e,t,function(){return n[t]})}(s);i(1243);var r=i(0),l=Object(r.a)(n.default,a.a,a.b,!1,null,"d231933e",null);e.default=l.exports},258:function(t,e){var i=/^(?:submit|button|image|reset|file)$/i,a=/^(?:input|select|textarea|keygen)/i,n=/(\[[^\[\]]*\])/g;function s(t,e,i){if(e.match(n)){!function t(e,i,a){if(0===i.length)return e=a;var n=i.shift(),s=n.match(/^\[(.+?)\]$/);if("[]"===n)return e=e||[],Array.isArray(e)?e.push(t(null,i,a)):(e._values=e._values||[],e._values.push(t(null,i,a))),e;if(s){var r=s[1],l=+r;isNaN(l)?(e=e||{})[r]=t(e[r],i,a):(e=e||[])[l]=t(e[l],i,a)}else e[n]=t(e[n],i,a);return e}(t,function(t){var e=[],i=new RegExp(n),a=/^([^\[\]]*)/.exec(t);for(a[1]&&e.push(a[1]);null!==(a=i.exec(t));)e.push(a[1]);return e}(e),i)}else{var a=t[e];a?(Array.isArray(a)||(t[e]=[a]),t[e].push(i)):t[e]=i}return t}function r(t,e,i){return i=i.replace(/(\r)?\n/g,"\r\n"),i=(i=encodeURIComponent(i)).replace(/%20/g,"+"),t+(t?"&":"")+encodeURIComponent(e)+"="+i}t.exports=function(t,e){"object"!=typeof e?e={hash:!!e}:void 0===e.hash&&(e.hash=!0);for(var n=e.hash?{}:"",l=e.serializer||(e.hash?s:r),o=t&&t.elements?t.elements:[],u=Object.create(null),c=0;c<o.length;++c){var d=o[c];if((e.disabled||!d.disabled)&&d.name&&a.test(d.nodeName)&&!i.test(d.type)){var p=d.name,h=d.value;if("checkbox"!==d.type&&"radio"!==d.type||d.checked||(h=void 0),e.empty){if("checkbox"!==d.type||d.checked||(h=""),"radio"===d.type&&(u[d.name]||d.checked?d.checked&&(u[d.name]=!0):u[d.name]=!1),void 0==h&&"radio"==d.type)continue}else if(!h)continue;if("select-multiple"!==d.type)n=l(n,p,h);else{h=[];for(var f=d.options,v=!1,_=0;_<f.length;++_){var g=f[_],m=e.empty&&!g.value,b=g.value||m;g.selected&&b&&(v=!0,n=e.hash&&"[]"!==p.slice(p.length-2)?l(n,p+"[]",g.value):l(n,p,g.value))}!v&&e.empty&&(n=l(n,p,""))}}}if(e.empty)for(var p in u)u[p]||(n=l(n,p,""));return n}},417:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.info=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,n.request_get)("/api/distribute/setting",t)},e.save=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,n.request_put)("/api/distribute/setting",t)},e.cashList=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,n.request_get)("/api/distribute/cash",t)},e.cashDetail=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,n.request_get)(l(t),t)},e.cashUpdata=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,n.request_put)(u(t),t)},e.getList=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,n.request_get)("/api/distribute/distributes",t)},e.detail=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,n.request_get)(o(t),t)},e.settlement=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,n.request_put)("/api/distribute/cashs",t)},e.educe=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,n.request_get)("/api/distribute/export",t)},e.educes=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,n.request_get)("/api/cash/export",t)};var a,n=i(45),s=i(77),r=(a=s)&&a.__esModule?a:{default:a};var l=r.default.compile("/api/distribute/cash/:id"),o=r.default.compile("/api/distribute/distributes/:id"),u=r.default.compile("/api/distribute/cash/:id")},599:function(t,e,i){"use strict";i.r(e);var a=i(600),n=i.n(a);for(var s in a)"default"!==s&&function(t){i.d(e,t,function(){return a[t]})}(s);e.default=n.a},600:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a,n=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var i=arguments[e];for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(t[a]=i[a])}return t},s=function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e.default=t,e}(i(417)),r=i(258),l=(a=r)&&a.__esModule?a:{default:a},o=i(265);e.default={mixins:[o.publicMixin],data:function(){return{pickerOptions:{},ctimePick:"",list:[],currentPage:1,page:"",multipleSelection:[],status:[{txt:"未结算",value:"0"},{txt:"已结算",value:"1"},{txt:"驳回兑付",value:"2"}],infoData:null,backMsg:"",stateValue:"",value:"",where:{pageOffset:10,pageStart:0,order:"",user_name:"",phone:"",status:""},dialogVisible:!1,activeName2:"first"}},methods:{getList:function(t){var e=this;s.cashList(t).then(function(t){log(t),e.list=t.data,e.page=t.page})},addInfo:function(){this.dialogVisible=!0},del:function(t){var e=this;s.del({id:t}).then(function(t){e.getList(e.where)})},addsend:function(t){var e=this;this.$refs[t].validate(function(t){if(!t)return alert("error submit!!"),!1;s.save(e.infoAdd).then(function(t){e.getList(e.where)}),e.dialogVisible=!1,e.infoAdd={contents:"",title:"",type:""}})},search:function(){log(this.where),this.getList(this.where)},handleSizeChange:function(t){this.where.pageOffset=t,this.getList(this.where)},handleCurrentChange:function(t){this.where.pageStart=(t-1)*this.where.pageOffset,this.getList(this.where)},handleClick:function(){},detail:function(t){var e=this;s.cashDetail({id:t}).then(function(t){log(t),e.infoData=t.data,e.dialogVisible=!0})},backMsgSend:function(){var t=this;s.save({feedback_id:this.infoData.data.id,content:this.backMsg}).then(function(e){t.$message.success("回复成功"),t.backMsg="",t.detail(t.infoData.data.id)})},payback:function(t,e){var i=this;s.cashUpdata({id:t,status:e}).then(function(t){i.$message.success("结算状态修改成功"),i.getList(i.where)}).catch(function(t){i.$message.error("结算状态修改失败")})},settlement:function(t){var e=this,i=[];if(t)i.push(t);else if(!(i=this.$getChecked()))return;s.settlement({id:i}).then(function(t){e.getList()})},educes:function(){var t=this.$getChecked({isShowMessage:!1}),e=(0,l.default)(document.querySelector("#mainForm"),{hash:!0});s.educes(n({id:t},e)).then(function(t){window.location.href=t.data.url})}},created:function(){this.getList(this.where)},watch:{ctimePick:function(){this.where.time_start=this.ctimePick[0],this.where.time_end=this.ctimePick[1]}}}},601:function(t,e,i){}}]);