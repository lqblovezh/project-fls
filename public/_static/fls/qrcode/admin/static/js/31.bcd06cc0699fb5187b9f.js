(window.webpackJsonp=window.webpackJsonp||[]).push([[31],{1592:function(t,e,i){"use strict";i.r(e);var a=i(1707),s=i(857);for(var n in s)"default"!==n&&function(t){i.d(e,t,function(){return s[t]})}(n);i(1593);var r=i(0),o=Object(r.a)(s.default,a.a,a.b,!1,null,"21a18a34",null);e.default=o.exports},1593:function(t,e,i){"use strict";var a=i(859);i.n(a).a},1594:function(t,e,i){"use strict";var a=i(860);i.n(a).a},1683:function(t,e,i){"use strict";var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"index clearfix"},[i("div",{staticClass:"mainRight"},[i("div",{staticClass:"contentWrap"},[i("div",{staticClass:"contentLeft"},[i("div",{staticClass:"maindata"},[i("div",{staticClass:"btnGroup"},[i("el-button-group",[i("el-button",{attrs:{type:"primary"}},[t._v("扫码用户列表")]),i("el-button",{attrs:{type:"primary",plain:""},on:{click:function(e){return t.$router.push({path:"/wms/analys",query:{index:t.$route.query.index,id:t.$route.query.id}})}}},[t._v("数据分析")]),i("el-button",{attrs:{type:"primary",plain:""},on:{click:function(e){return t.$router.push({path:"/wms/scanRecord",query:{index:t.$route.query.index,id:t.$route.query.id}})}}},[t._v("扫码记录")])],1)],1),i("div",{staticClass:"tableWrap"},[i("div",{staticClass:"tableTop"},[i("div",{staticClass:"title vel-line"},[i("span",[t._v("全部 "),t.page?i("span",{staticClass:"totalNum"},[t._v("("+t._s(t.page.total)+")")]):t._e()]),i("div",{staticClass:"btns"},[i("el-button",{attrs:{size:"mini",type:"primary",plain:""},on:{click:t.scanExport}},[t._v("导出")])],1)])]),i("table",{staticClass:"table"},[i("thead",[i("tr",[i("th",{attrs:{width:"70"}},[i("input",{attrs:{type:"checkbox"},on:{click:function(e){return t.$checkAll(e)}}}),i("span",[t._v("选择")])]),i("th",[t._v("昵称")]),i("th",[t._v("性别")]),i("th",[t._v("地域")]),i("th",[t._v("电话")]),i("th",[t._v("累计时长")]),i("th",{attrs:{width:"80"}},[t._v("操作")])])]),t.list?i("tbody",t._l(t.list,function(e){return i("tr",[i("th",[i("input",{ref:"ids",refInFor:!0,attrs:{type:"checkbox",name:"ids"},domProps:{value:e.user_id}})]),i("th",[t._v(t._s(e.nick_name))]),i("th",[t._v(t._s(e.sex))]),i("th",[t._v(t._s(e.pro))]),i("th",[t._v(t._s(e.phone))]),i("th",[t._v(t._s(e.total))]),i("th",[i("Icon",{attrs:{type:"icon-detail",title:"用户统计"},on:{click:function(i){return t.openDetail(e)}}})],1)])}),0):t._e()]),t.page?i("div",{staticClass:"pageWrap"},[i("el-pagination",{attrs:{small:!1,background:"","current-page":t.page.num,"page-sizes":[10,50,100],"page-size":t.page.offset,layout:"total, sizes,prev, pager, next, jumper",total:t.page.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1):t._e()]),t.detailVisible?i("Detail",{attrs:{detailVisible:t.detailVisible,detailDate:t.detailDate},on:{"update:detailVisible":function(e){t.detailVisible=e},"update:detail-visible":function(e){t.detailVisible=e}}}):t._e()],1)])])])])},s=[];i.d(e,"a",function(){return a}),i.d(e,"b",function(){return s})},1707:function(t,e,i){"use strict";var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"div"},[i("el-dialog",{attrs:{visible:t.detailVisible,width:"1000px",top:"50px","append-to-body":"","before-close":t.colse}},[i("div",{staticClass:"header",attrs:{slot:"title"},slot:"title"},[i("el-tabs",{attrs:{value:"detail"}},[i("el-tab-pane",{attrs:{label:"用户统计",name:"detail"}})],1)],1),i("div",{staticClass:"info"},[i("div",{staticClass:"group"},[i("div",{staticClass:"label"},[t._v("昵称:")]),i("span",[t._v(t._s(t.infoDate.nick_name))])]),i("div",{staticClass:"group"},[i("div",{staticClass:"label"},[t._v("电话:")]),i("span",[t._v(t._s(t.infoDate.phone))])]),i("div",{staticClass:"group"},[i("div",{staticClass:"label"},[t._v("性别:")]),i("span",[t._v(t._s(t.infoDate.sex))])]),i("div",{staticClass:"group"},[i("div",{staticClass:"label"},[t._v("地域:")]),i("span",[t._v(t._s(t.infoDate.pro))])]),i("div",{staticClass:"group"},[i("div",{staticClass:"label"},[t._v("转发次数:")]),i("span",[t._v(t._s(t.infoDate.share_count))])]),i("div",{staticClass:"group"},[i("div",{staticClass:"label"},[t._v("首次扫码时间:")]),i("span",[t._v(t._s(t.infoDate.first_time))])]),i("div",{staticClass:"group"},[i("div",{staticClass:"label"},[t._v("最高停留时长:")]),i("span",[t._v(t._s(t.infoDate.max_stop))])]),i("div",{staticClass:"group"},[i("div",{staticClass:"label"},[t._v("累计停留时长:")]),i("span",[t._v(t._s(t.infoDate.total_stop))])])]),i("div",{staticClass:"tail"},[i("div",{staticClass:"group"},[i("div",{staticClass:"name"},[t._v("7日停留时长")]),i("div",{ref:"charts1",staticClass:"draw"})]),i("div",{staticClass:"group"},[i("div",{staticClass:"name"},[t._v("7日扫码次数")]),i("div",{ref:"charts2",staticClass:"draw"})])]),i("div",{staticClass:"record"},[i("div",{staticClass:"name"},[t._v("扫码历史记录")]),i("table",{staticClass:"table"},[i("thead",[i("tr",[i("th",[t._v("扫码时间")]),i("th",[t._v("产品名称")]),i("th",[t._v("二维码名称")]),i("th",[t._v("停留时间")])])]),i("tbody",t._l(t.historyList,function(e){return i("tr",[i("th",[t._v(t._s(e.create_time))]),i("th",[t._v(t._s(e.product_name))]),i("th",[t._v(t._s(e.qrcode_name))]),i("th",[t._v(t._s(e.duration))])])}),0)]),t.page?i("div",{staticClass:"pageWrap"},[i("el-pagination",{attrs:{small:!1,background:"","current-page":t.page.pageNum,"page-sizes":[10,50,100],"page-size":t.page.pageOffset,layout:"total, sizes,prev, pager, next, jumper",total:t.page.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1):t._e()]),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{type:"info",size:"small"},on:{click:function(e){return t.$emit("update:detailVisible",!1)}}},[t._v("取消")])],1)])],1)},s=[];i.d(e,"a",function(){return a}),i.d(e,"b",function(){return s})},254:function(t,e,i){"use strict";i.r(e);var a=i(1683),s=i(855);for(var n in s)"default"!==n&&function(t){i.d(e,t,function(){return s[t]})}(n);i(1594);var r=i(0),o=Object(r.a)(s.default,a.a,a.b,!1,null,"3729e429",null);e.default=o.exports},282:function(t,e){var i=/^(?:submit|button|image|reset|file)$/i,a=/^(?:input|select|textarea|keygen)/i,s=/(\[[^\[\]]*\])/g;function n(t,e,i){if(e.match(s)){!function t(e,i,a){if(0===i.length)return e=a;var s=i.shift(),n=s.match(/^\[(.+?)\]$/);if("[]"===s)return e=e||[],Array.isArray(e)?e.push(t(null,i,a)):(e._values=e._values||[],e._values.push(t(null,i,a))),e;if(n){var r=n[1],o=+r;isNaN(o)?(e=e||{})[r]=t(e[r],i,a):(e=e||[])[o]=t(e[o],i,a)}else e[s]=t(e[s],i,a);return e}(t,function(t){var e=[],i=new RegExp(s),a=/^([^\[\]]*)/.exec(t);for(a[1]&&e.push(a[1]);null!==(a=i.exec(t));)e.push(a[1]);return e}(e),i)}else{var a=t[e];a?(Array.isArray(a)||(t[e]=[a]),t[e].push(i)):t[e]=i}return t}function r(t,e,i){return i=i.replace(/(\r)?\n/g,"\r\n"),i=(i=encodeURIComponent(i)).replace(/%20/g,"+"),t+(t?"&":"")+encodeURIComponent(e)+"="+i}t.exports=function(t,e){"object"!=typeof e?e={hash:!!e}:void 0===e.hash&&(e.hash=!0);for(var s=e.hash?{}:"",o=e.serializer||(e.hash?n:r),u=t&&t.elements?t.elements:[],l=Object.create(null),c=0;c<u.length;++c){var d=u[c];if((e.disabled||!d.disabled)&&d.name&&a.test(d.nodeName)&&!i.test(d.type)){var p=d.name,f=d.value;if("checkbox"!==d.type&&"radio"!==d.type||d.checked||(f=void 0),e.empty){if("checkbox"!==d.type||d.checked||(f=""),"radio"===d.type&&(l[d.name]||d.checked?d.checked&&(l[d.name]=!0):l[d.name]=!1),void 0==f&&"radio"==d.type)continue}else if(!f)continue;if("select-multiple"!==d.type)s=o(s,p,f);else{f=[];for(var v=d.options,h=!1,_=0;_<v.length;++_){var g=v[_],y=e.empty&&!g.value,m=g.value||y;g.selected&&m&&(h=!0,s=e.hash&&"[]"!==p.slice(p.length-2)?o(s,p+"[]",g.value):o(s,p,g.value))}!h&&e.empty&&(s=o(s,p,""))}}}if(e.empty)for(var p in l)l[p]||(s=o(s,p,""));return s}},566:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.analysAll=e.analysisData=e.userStatics=void 0;var a,s,n,r=l(i(15));e.userStatics=(a=c(r.default.mark(function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return r.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",(0,o.request_get)("/api/statistics/user",e));case 1:case"end":return t.stop()}},t,this)})),function(){return a.apply(this,arguments)}),e.analysisData=(s=c(r.default.mark(function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return r.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return"/wms/proStatics"==e.type?e.product_id=e.id:"/wms/bookStatics"==e.type&&(e.book_id=e.id),t.abrupt("return",(0,o.request_get)("/api/statistics/data_analysis",e));case 2:case"end":return t.stop()}},t,this)})),function(){return s.apply(this,arguments)}),e.analysAll=(n=c(r.default.mark(function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return r.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",(0,o.request_get)("/api/statistics/all",e));case 1:case"end":return t.stop()}},t,this)})),function(){return n.apply(this,arguments)});e.getList=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,o.request_get)("/api/statistics/product_list",t)},e.getBookList=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,o.request_get)("/api/statistics/book_list",t)},e.del=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,o.request_post)("/api/statistics/product_list",t)},e.detail=d,e.scanList=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};"/wms/proStatics"==t.type?t.product_id=t.id:"/wms/bookStatics"==t.type&&(t.book_id=t.id);return(0,o.request_get)("/api/statistics/scan_record_list",t)},e.userList=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};"/wms/proStatics"==t.type?t.product_id=t.id:"/wms/bookStatics"==t.type&&(t.book_id=t.id);return(0,o.request_get)("/api/statistics/user_list",t)},e.scanExport=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};"/wms/proStatics"==t.type?t.product_id=t.ids:"/wms/bookStatics"==t.type&&(t.book_id=t.ids);return(0,o.request_get)("/api/statistics/scan_record_list_export",t)},e.userExport=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};"/wms/proStatics"==t.type?(t.product_ids=t.ids,t.product_id=t.id):"/wms/bookStatics"==t.type&&(t.book_ids=t.ids,t.book_id=t.id);return(0,o.request_get)("/api/statistics/user_list_export",t)};var o=i(16),u=l(i(21));function l(t){return t&&t.__esModule?t:{default:t}}function c(t){return function(){var e=t.apply(this,arguments);return new Promise(function(t,i){return function a(s,n){try{var r=e[s](n),o=r.value}catch(t){return void i(t)}if(!r.done)return Promise.resolve(o).then(function(t){a("next",t)},function(t){a("throw",t)});t(o)}("next")})}}u.default.compile("/api/statistics/product_list/:id");var d=u.default.compile("/api/statistics/product_list/:id");function d(t){var e=t.id,i=function(t,e){var i={};for(var a in t)e.indexOf(a)>=0||Object.prototype.hasOwnProperty.call(t,a)&&(i[a]=t[a]);return i}(t,["id"]);return(0,o.request_get)(d({id:e}),i)}},855:function(t,e,i){"use strict";i.r(e);var a=i(856),s=i.n(a);for(var n in a)"default"!==n&&function(t){i.d(e,t,function(){return a[t]})}(n);e.default=s.a},856:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var i=arguments[e];for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(t[a]=i[a])}return t},s=(i(293),o(i(282)),function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e.default=t,e}(i(566))),n=i(49),r=o(i(1592));function o(t){return t&&t.__esModule?t:{default:t}}e.default={components:{Detail:r.default},data:function(){return{services:s,detailVisible:!1,detailDialoaType:"info",detailDate:{}}},created:function(){this.resetPage(),this.getList()},methods:a({getList:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.page&&this.page.num||1,e=this,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:this.page&&this.page.offset||10,s=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};this.services.userList(a({type:this.$route.query.index,id:this.$route.query.id,pageNum:t,pageOffset:i},this.parameter,s)).then(function(t){e.setList(t.data),e.setPage(t.page)})},handleSizeChange:function(t){this.page.num=1,this.getList(1,t,this.query)},handleCurrentChange:function(t){t!==this.page.nun&&this.getList(t,this.page.offset,this.query)},scanExport:function(){var t;t=this.$getChecked({isShowMessage:!1}),s.userExport({type:this.$route.query.index,id:this.$route.query.id,ids:t}).then(function(t){window.location.href=t.data})},setList:function(t){this.setQrcodelist(t)},setPage:function(t){this.setQrcodelistPage(t)},openDetail:function(t){this.detailDate=t,this.detailVisible=!0}},(0,n.mapMutations)(["setQrcodelist","setQrcodelistPage","resetPage"])),computed:a({},(0,n.mapState)({list:function(t){return t.qrcode.list},page:function(t){return t.qrcode.page}}))}},857:function(t,e,i){"use strict";i.r(e);var a=i(858),s=i.n(a);for(var n in a)"default"!==n&&function(t){i.d(e,t,function(){return a[t]})}(n);e.default=s.a},858:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a,s=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var i=arguments[e];for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(t[a]=i[a])}return t},n=function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e.default=t,e}(i(566)),r=i(630),o=(a=r)&&a.__esModule?a:{default:a};e.default={props:["detailVisible","detailDate"],data:function(){return{infoDate:{},historyList:[],page:{pageNum:1,pageOffset:10,total:1}}},created:function(){this.getDetail(),this.getList()},methods:{init:function(){this.draw1(),this.draw2()},getList:function(){var t=this;n.scanList(s({user_id:this.detailDate.user_id},this.page)).then(function(e){t.historyList=e.data,t.page.total=e.page.total,t.page.pageNum=e.page.num})},getDetail:function(){var t=this;n.userStatics({user_id:this.detailDate.user_id}).then(function(e){t.infoDate=e.data,t.init()})},draw1:function(){o.default.init(this.$refs.charts1).setOption({title:{text:"读者停留时长分析",subtext:"纯属虚构",x:"center"},tooltip:{trigger:"axis"},xAxis:{type:"category",data:this.infoDate.list.map(function(t){return t.date})},yAxis:{type:"value"},series:[{data:this.infoDate.list.map(function(t){return t.stay}),type:"line",smooth:!0}]})},draw2:function(){o.default.init(this.$refs.charts2).setOption({title:{text:"读者扫码次数分析",x:"center"},tooltip:{trigger:"axis"},xAxis:{type:"category",data:this.infoDate.list.map(function(t){return t.date})},yAxis:{type:"value"},series:[{data:this.infoDate.list.map(function(t){return t.scan}),type:"line",smooth:!0}]})},handleSizeChange:function(t){this.page.pageNum=1,this.page.pageOffset=t,this.getList()},handleCurrentChange:function(t){this.page.pageNum=t,this.getList()},colse:function(){this.$emit("update:detailVisible",!1)}}}},859:function(t,e,i){},860:function(t,e,i){}}]);