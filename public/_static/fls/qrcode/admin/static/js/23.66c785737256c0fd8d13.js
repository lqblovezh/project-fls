(window.webpackJsonp=window.webpackJsonp||[]).push([[23,51],{1652:function(t,e,a){"use strict";var i=a(965);a.n(i).a},1657:function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"index clearfix"},[a("div",{staticClass:"mainRight"},[a("div",{staticClass:"contentWrap"},[a("div",{staticClass:"contentLeft"},[a("div",{staticClass:"maindata"},[a("div",{staticClass:"serachWrap"},[a("div",{staticClass:"title"}),a("form",{staticClass:"clearfix",attrs:{id:"mainForm"}},[a("span",{staticClass:"group-inline"},[a("el-input",{attrs:{placeholder:"名称",name:"name",clearable:""},model:{value:t.searchQuery.name,callback:function(e){t.$set(t.searchQuery,"name",e)},expression:"searchQuery.name"}})],1),a("span",{staticClass:"group-inline"},[a("TimePick",{attrs:{inputsName:["start_time","end_time"]}})],1),t._m(0),a("span",{staticClass:"group-inline float-right"},[a("el-button",{attrs:{size:"mediu",type:"primary",icon:"el-icon-search",plain:""},on:{click:t.query}},[t._v("搜索")]),a("el-button",{attrs:{size:"mediu",type:"primary",plain:""},on:{click:function(e){return t.opneDetailDialog("info")}}},[t._v("新建")])],1)])]),a("div",{staticClass:"tableWrap"},[a("div",{staticClass:"tableTop"},[a("div",{staticClass:"title vel-line"},[a("span",[t._v("全部 "),t.page?a("span",{staticClass:"totalNum"},[t._v("("+t._s(t.page.total)+")")]):t._e()]),a("div",{staticClass:"btns"},[a("el-button",{attrs:{size:"mini",type:"primary",plain:""},on:{click:function(e){return t.delChoosen(!1)}}},[t._v("删除")])],1)])]),a("table",{staticClass:"table"},[a("thead",[a("tr",[a("th",{staticClass:"table-check"},[a("input",{attrs:{type:"checkbox"},on:{click:function(e){return t.$checkAll(e)}}})]),a("th",[t._v("名称")]),a("th",[t._v("创建时间")]),a("th",[t._v("使用状态")]),a("th",{attrs:{width:"80"}},[t._v("操作")])])]),t.list?a("tbody",t._l(t.list,function(e){return a("tr",[a("th",[a("input",{ref:"ids",refInFor:!0,attrs:{type:"checkbox",name:"ids"},domProps:{value:e.id}})]),a("th",[a("img",{staticClass:"cover-photo",attrs:{src:e.img_src}}),a("div",{staticClass:"th-name bookName",attrs:{title:e.name}},[t._v(t._s(e.name))])]),a("th",[a("div",{staticClass:"th-name"},[t._v(t._s(e.create_time))])]),a("th",[a("div",{staticClass:"th-name"},[t._v(t._s(e.status_name))])]),a("th",[a("div",{staticClass:"btns"},[a("Icon",{attrs:{type:"icon-detail",title:"详情"},on:{click:function(a){return t.opneDetailDialog("info",e.id)}}}),a("Icon",{attrs:{type:"icon-preview",title:"记录"},on:{click:function(a){return t.opneDetailDialog("record",e.id)}}}),a("Icon",{attrs:{type:"icon-delete",title:"删除"},on:{click:function(a){return t.delChoosen(e.id)}}})],1)])])}),0):t._e()]),t.page?a("div",{staticClass:"pageWrap"},[a("el-pagination",{attrs:{small:!1,background:"","current-page":t.page.num,"page-sizes":[10,50,100],"page-size":t.page.offset,layout:"total, sizes,prev, pager, next, jumper",total:t.page.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1):t._e(),a("div",{staticClass:"dialogs"},[a("el-dialog",{attrs:{center:!1,visible:t.detailVisible,"append-to-body":"",to:"50px",width:"1200px"},on:{"update:visible":function(e){t.detailVisible=e}}},[a("div",{staticClass:"content",attrs:{slot:"title"},slot:"title"},[t.detailVisible?a("Detail",{attrs:{detailVisible:t.detailVisible,type:t.detailDialoaType,detailData:t.detailData,por_type:t.parameter.type},on:{"update:detailVisible":function(e){t.detailVisible=e},"update:detail-visible":function(e){t.detailVisible=e},saveok:t.saveok}}):t._e()],1)])],1)])])])])])])},n=[function(){var t=this.$createElement,e=this._self._c||t;return e("span",{staticClass:"group-inline"},[e("select",{staticClass:"form-control width-small",attrs:{placeholder:"标签",name:"status"}},[e("option",{attrs:{value:""}},[this._v("全部")]),e("option",{attrs:{value:"true"}},[this._v("使用中")]),e("option",{attrs:{value:"false"}},[this._v("未使用")])])])}];a.d(e,"a",function(){return i}),a.d(e,"b",function(){return n})},233:function(t,e,a){"use strict";a.r(e);var i=a(646),n=a(563);for(var s in n)"default"!==s&&function(t){a.d(e,t,function(){return n[t]})}(s);a(620);var r=a(0),o=Object(r.a)(n.default,i.a,i.b,!1,null,"b07243a2",null);e.default=o.exports},279:function(t,e,a){"use strict";a.r(e);var i=a(1657),n=a(961);for(var s in n)"default"!==s&&function(t){a.d(e,t,function(){return n[t]})}(s);a(1652);var r=a(0),o=Object(r.a)(n.default,i.a,i.b,!1,null,"e167775e",null);e.default=o.exports},282:function(t,e){var a=/^(?:submit|button|image|reset|file)$/i,i=/^(?:input|select|textarea|keygen)/i,n=/(\[[^\[\]]*\])/g;function s(t,e,a){if(e.match(n)){!function t(e,a,i){if(0===a.length)return e=i;var n=a.shift(),s=n.match(/^\[(.+?)\]$/);if("[]"===n)return e=e||[],Array.isArray(e)?e.push(t(null,a,i)):(e._values=e._values||[],e._values.push(t(null,a,i))),e;if(s){var r=s[1],o=+r;isNaN(o)?(e=e||{})[r]=t(e[r],a,i):(e=e||[])[o]=t(e[o],a,i)}else e[n]=t(e[n],a,i);return e}(t,function(t){var e=[],a=new RegExp(n),i=/^([^\[\]]*)/.exec(t);for(i[1]&&e.push(i[1]);null!==(i=a.exec(t));)e.push(i[1]);return e}(e),a)}else{var i=t[e];i?(Array.isArray(i)||(t[e]=[i]),t[e].push(a)):t[e]=a}return t}function r(t,e,a){return a=a.replace(/(\r)?\n/g,"\r\n"),a=(a=encodeURIComponent(a)).replace(/%20/g,"+"),t+(t?"&":"")+encodeURIComponent(e)+"="+a}t.exports=function(t,e){"object"!=typeof e?e={hash:!!e}:void 0===e.hash&&(e.hash=!0);for(var n=e.hash?{}:"",o=e.serializer||(e.hash?s:r),l=t&&t.elements?t.elements:[],u=Object.create(null),c=0;c<l.length;++c){var d=l[c];if((e.disabled||!d.disabled)&&d.name&&i.test(d.nodeName)&&!a.test(d.type)){var p=d.name,f=d.value;if("checkbox"!==d.type&&"radio"!==d.type||d.checked||(f=void 0),e.empty){if("checkbox"!==d.type||d.checked||(f=""),"radio"===d.type&&(u[d.name]||d.checked?d.checked&&(u[d.name]=!0):u[d.name]=!1),void 0==f&&"radio"==d.type)continue}else if(!f)continue;if("select-multiple"!==d.type)n=o(n,p,f);else{f=[];for(var v=d.options,h=!1,m=0;m<v.length;++m){var _=v[m],g=e.empty&&!_.value,b=_.value||g;_.selected&&b&&(h=!0,n=e.hash&&"[]"!==p.slice(p.length-2)?o(n,p+"[]",_.value):o(n,p,_.value))}!h&&e.empty&&(n=o(n,p,""))}}}if(e.empty)for(var p in u)u[p]||(n=o(n,p,""));return n}},563:function(t,e,a){"use strict";a.r(e);var i=a(564),n=a.n(i);for(var s in i)"default"!==s&&function(t){a.d(e,t,function(){return i[t]})}(s);e.default=n.a},564:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i,n=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var a=arguments[e];for(var i in a)Object.prototype.hasOwnProperty.call(a,i)&&(t[i]=a[i])}return t},s=a(293),r=a(282),o=((i=r)&&i.__esModule,a(49));e.default={mixins:[s.main],props:["detailData","services","readOnly"],data:function(){return{type:"info"}},methods:n({getList:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.page&&this.page.num||1,a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:this.page&&this.page.offset||10;if(!this.detailData.id)return this.setList([]),void this.setPage({});this.services.getUseList({pageNum:e,pageOffset:a,special_id:this.detailData.id}).then(function(e){t.setList(e.data),t.setPage(e.page)})},setList:function(t){this.setUselist(t)},setPage:function(t){this.setUselistPage(t)}},(0,o.mapMutations)(["setUselist","setUselistPage"])),computed:n({},(0,o.mapState)({list:function(t){return t.using.list},page:function(t){return t.using.page}}))}},565:function(t,e,a){},585:function(t,e){},586:function(t,e){},620:function(t,e,a){"use strict";var i=a(565);a.n(i).a},641:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.getList=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,n.request_get)("/api/marketing",t)},e.del=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,n.request_post)("/api/marketing/delete",t)},e.detail=function(t){var e=t.id,a=o(t,["id"]);return(0,n.request_get)(l({id:e}),a)},e.save=function(t){var e=t.id,a=o(t,["id"]);if(e)return(0,n.request_put)(l({id:e}),a);return(0,n.request_post)("/api/marketing",a)},e.getUseList=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,n.request_get)(c(t))},e.getRecord=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,n.request_get)(u(t))};var i,n=a(16),s=a(21),r=(i=s)&&i.__esModule?i:{default:i};function o(t,e){var a={};for(var i in t)e.indexOf(i)>=0||Object.prototype.hasOwnProperty.call(t,i)&&(a[i]=t[i]);return a}var l=r.default.compile("/api/marketing/:id"),u=r.default.compile("/api/marketing/record/:id"),c=r.default.compile("/api/marketing/used/:special_id")},643:function(t,e,a){"use strict";a.r(e);var i=a(644),n=a.n(i);for(var s in i)"default"!==s&&function(t){a.d(e,t,function(){return i[t]})}(s);e.default=n.a},644:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i,n=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var a=arguments[e];for(var i in a)Object.prototype.hasOwnProperty.call(a,i)&&(t[i]=a[i])}return t},s=function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e.default=t,e}(a(641)),r=a(663),o=a(233),l=(i=o)&&i.__esModule?i:{default:i};e.default={props:["type","detailVisible","readOnly","detailData","por_type"],data:function(){return{services:s,types:[],infoDate:{},record:[]}},created:function(){this.infoDate=n({},this.detailData),this.getTypes(),this.getRecord()},components:{Using:l.default},methods:{getTypes:function(){var t=this;(0,r.awardList)().then(function(e){t.types=e.data})},getRecord:function(){var t=this;this.detailData&&this.detailData.id&&s.getRecord({id:this.detailData.id}).then(function(e){t.record=e.data})},submitInfo:function(){var t=this;s.save(n({type:this.por_type},this.infoDate)).then(function(e){t.$emit("saveok")})}}}},645:function(t,e,a){},646:function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"box"},[a("div",{staticClass:"maindata"},[a("table",{staticClass:"table"},[t._m(0),t.list?a("tbody",t._l(t.list,function(e){return a("tr",[a("th",[a("img",{staticClass:"cover-photo",attrs:{src:e.img_src}}),a("div",{staticClass:"th-name bookName",attrs:{title:e.name}},[t._v(t._s(e.name))])]),a("th",[a("div",{staticClass:"th-name"},[t._v(t._s(e.abs))])]),a("th",[a("div",{staticClass:"th-name"},[t._v(t._s(e.create_time))])])])}),0):t._e()])]),t.page?a("div",{staticClass:"pageWrap"},[a("el-pagination",{attrs:{small:!1,background:"","current-page":t.page.num,"page-sizes":[10,50,100],"page-size":t.page.offset,layout:"total, sizes,prev, pager, next, jumper",total:t.page.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1):t._e()])},n=[function(){var t=this.$createElement,e=this._self._c||t;return e("thead",[e("tr",[e("th",[this._v("名称")]),e("th",{attrs:{width:"150"}},[this._v("产品简介")]),e("th",[this._v("创建时间")])])])}];a.d(e,"a",function(){return i}),a.d(e,"b",function(){return n})},663:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.getList=function(t){return(0,n.request_get)("/api/lottery",t)},e.save=function(t){var e=t.id,a=function(t,e){var a={};for(var i in t)e.indexOf(i)>=0||Object.prototype.hasOwnProperty.call(t,i)&&(a[i]=t[i]);return a}(t,["id"]);if(e)return(0,n.request_put)("/api/lottery/"+e,a);return(0,n.request_post)("/api/lottery",a)},e.del=function(t){return(0,n.request_post)("/api/lottery/delete",t)},e.detail=function(t){var e=t.id;return(0,n.request_get)("/api/lottery/"+e)},e.awardList=function(t){return(0,n.request_get)("/api/award",t)},e.awardRecord=function(t){var e=t.id;return(0,n.request_get)("/api/lottery_record/"+e)},e.saveAward=function(t){return(0,n.request_post)("/api/award",t)},e.delAward=function(t){return(0,n.request_post)("/api/award/delete",t)};var i,n=a(16),s=a(21);(i=s)&&i.__esModule,a(569)},961:function(t,e,a){"use strict";a.r(e);var i=a(962),n=a.n(i);for(var s in i)"default"!==s&&function(t){a.d(e,t,function(){return i[t]})}(s);e.default=n.a},962:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var a=arguments[e];for(var i in a)Object.prototype.hasOwnProperty.call(a,i)&&(t[i]=a[i])}return t},n=a(293),s=(l(a(282)),function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e.default=t,e}(a(641))),r=l(a(963)),o=a(49);function l(t){return t&&t.__esModule?t:{default:t}}e.default={components:{Detail:r.default},mixins:[n.main],data:function(){return{services:s,detailVisible:!1,detailDialoaType:"info",detailData:{},parameter:{type:"show_order"}}},methods:i({setList:function(t){this.setSerieslist(t)},setPage:function(t){this.setSerieslistPage(t)},saveok:function(){this.detailVisible=!1,this.getList()}},(0,o.mapMutations)(["setSerieslist","setSerieslistPage"])),computed:i({},(0,o.mapState)({list:function(t){return t.series.list},page:function(t){return t.series.page}}))}},963:function(t,e,a){"use strict";a.r(e);var i=a(972),n=a(643);for(var s in n)"default"!==s&&function(t){a.d(e,t,function(){return n[t]})}(s);a(964);var r=a(0),o=Object(r.a)(n.default,i.a,i.b,!1,null,"de2bf2a0",null);e.default=o.exports},964:function(t,e,a){"use strict";var i=a(645);a.n(i).a},965:function(t,e,a){},972:function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"div"},[a("el-tabs",{attrs:{value:t.type}},[a("el-tab-pane",{attrs:{label:"详情",name:"info"}},[a("VaForm",{ref:"detailForm"},[a("form",{ref:"detailForm",staticClass:"detailForm"},[a("fieldset",{attrs:{disabled:t.readOnly}},[a("div",{staticClass:"group"},[a("div",{staticClass:"label"},[t._v("*名称:")]),a("input",{directives:[{name:"va",rawName:"v-va",value:{type:"required"},expression:"{ type:'required' }"},{name:"model",rawName:"v-model",value:t.infoDate.name,expression:"infoDate.name"}],staticClass:"form-control",attrs:{type:"text"},domProps:{value:t.infoDate.name},on:{input:function(e){e.target.composing||t.$set(t.infoDate,"name",e.target.value)}}})]),a("div",{staticClass:"group"},[a("div",{staticClass:"label"},[t._v("*简介:")]),a("input",{directives:[{name:"va",rawName:"v-va",value:{type:"required"},expression:"{ type:'required' }"},{name:"model",rawName:"v-model",value:t.infoDate.abs,expression:"infoDate.abs"}],staticClass:"form-control",attrs:{type:"text"},domProps:{value:t.infoDate.abs},on:{input:function(e){e.target.composing||t.$set(t.infoDate,"abs",e.target.value)}}})]),a("div",{staticClass:"group"},[a("div",{staticClass:"label"},[t._v("*晒单奖品:")]),a("el-select",{model:{value:t.infoDate.award_id,callback:function(e){t.$set(t.infoDate,"award_id",e)},expression:"infoDate.award_id"}},t._l(t.types,function(t){return a("el-option",{key:t.id,attrs:{label:t.name,value:t.id}})}),1)],1)])]),t.readOnly?t._e():a("div",{staticClass:"btns"},[a("el-button",{attrs:{type:"info"},on:{click:function(e){return t.$emit("update:detailVisible",!1)}}},[t._v("取消")]),a("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.submitInfo("detailForm")}}},[t._v("确定")])],1)])],1),a("el-tab-pane",{attrs:{label:"获取记录",name:"record"}},[a("table",{staticClass:"table"},[a("thead",[a("tr",[a("th",[t._v("昵称")]),a("th",[t._v("时间")]),a("th",[t._v("电话")]),a("th",[t._v("二维码产品")]),a("th",[t._v("奖品")])])]),a("tbody",t._l(t.record,function(e){return a("tr",[a("td",[t._v(t._s(e.user_name))]),a("td",[t._v(t._s(e.create_time))]),a("td",[t._v(t._s(e.phone))]),a("td",[t._v(t._s(e.product_name))]),a("td",[t._v(t._s(e.award_name))])])}),0)])]),t.detailData.id?a("el-tab-pane",{attrs:{label:"使用中产品",name:"using"}},[a("Using",{attrs:{detailData:t.detailData,services:t.services,readOnly:t.readOnly}})],1):t._e()],1)],1)},n=[];a.d(e,"a",function(){return i}),a.d(e,"b",function(){return n})}}]);