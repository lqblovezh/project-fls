(window.webpackJsonp=window.webpackJsonp||[]).push([[33],{1021:function(t,e,a){"use strict";var n=a(641);a.n(n).a},1419:function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"clearfix"},[a("div",{staticClass:"mainRight"},[a("div",{staticClass:"contentWrap"},[a("div",{staticClass:"contentLeft"},[a("div",{staticClass:"maindata"},[a("div",{staticClass:"serachWrap"},[a("div",{staticClass:"title"}),a("form",{attrs:{id:"mainForm"}},[a("span",{staticClass:"group-inline"},[a("el-input",{attrs:{placeholder:"输入单号搜索",name:"order",clearable:""}})],1),a("span",{staticClass:"group-inline"},[a("el-input",{attrs:{placeholder:"输入用户搜索",name:"user_name",clearable:""}})],1),a("span",{staticClass:"group-inline"},[a("el-input",{attrs:{placeholder:"输入手机号搜索",name:"phone",clearable:""}})],1),a("span",{staticClass:"group-inline"},[a("TimePick",{attrs:{inputsName:["start_time","end_time"]}})],1),t._m(0),a("span",{staticClass:"group-inline right"},[a("el-button",{attrs:{size:"mediu",type:"primary",icon:"el-icon-search",plain:""},on:{click:t.seareHandeler}},[t._v("搜索")])],1)])]),a("div",{staticClass:"tableWrap"},[a("table",{staticClass:"table"},[t._m(1),t.list?a("tbody",t._l(t.list,function(e,n){return a("tr",[a("td",[a("div",{staticClass:"th-name"},[t._v(t._s(n+1))])]),a("td",[a("div",{staticClass:"th-name"},[t._v(t._s(e.order_number))])]),a("td",[a("div",{staticClass:"th-name"},[t._v(t._s(e.user_name))])]),a("td",[a("div",{staticClass:"th-name"},[t._v(t._s(e.phone))])]),a("td",[a("div",{staticClass:"th-name"},[t._v(t._s(e.orde_amount))])]),a("td",[a("div",{staticClass:"th-name"},[t._v(t._s(e.create_time))])]),a("td",[a("div",{staticClass:"th-name"},[t._v(t._s(e.pay_type))])]),a("td",[a("div",{staticClass:"th-name"},[t._v(t._s(e.is_pay))])]),a("td",[a("Icon",{attrs:{size:"mini",title:"详情",type:"icon-detail",plain:""},on:{click:function(a){return t.opneDetail(e)}}})],1)])}),0):t._e()])]),t.page?a("div",{staticClass:"pageWrap"},[a("el-pagination",{attrs:{small:!1,background:"","current-page":t.page.num,"page-sizes":[10,50,100],"page-size":t.page.offset,layout:"total, sizes,prev, pager, next, jumper",total:t.page.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1):t._e()])]),t.orderVisible?a("Detail",{attrs:{orderVisible:t.orderVisible,detailDate:t.detailDate},on:{"update:orderVisible":function(e){t.orderVisible=e},"update:order-visible":function(e){t.orderVisible=e}}}):t._e()],1)])])},i=[function(){var t=this.$createElement,e=this._self._c||t;return e("span",{staticClass:"group-inline"},[e("select",{staticClass:"form-control width-small",attrs:{name:"pay_status"}},[e("option",{attrs:{value:""}},[this._v("所有")]),e("option",{attrs:{value:"0"}},[this._v("等待支付")]),e("option",{attrs:{value:"1"}},[this._v("支付完成")]),e("option",{attrs:{value:"-1"}},[this._v("支付关闭")])])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("thead",[a("tr",[a("th",[t._v("序号")]),a("th",[t._v("单号")]),a("th",[t._v("用户")]),a("th",[t._v("手机")]),a("th",[t._v("金额")]),a("th",[t._v("交易时间")]),a("th",[t._v("渠道")]),a("th",[t._v("订单状态")]),a("th",[t._v("操作")])])])}];a.d(e,"a",function(){return n}),a.d(e,"b",function(){return i})},276:function(t,e,a){"use strict";a.r(e);var n=a(1419),i=a(639);for(var r in i)"default"!==r&&function(t){a.d(e,t,function(){return i[t]})}(r);a(1021);var s=a(0),l=Object(s.a)(i.default,n.a,n.b,!1,null,"738fc56d",null);e.default=l.exports},310:function(t,e){var a=/^(?:submit|button|image|reset|file)$/i,n=/^(?:input|select|textarea|keygen)/i,i=/(\[[^\[\]]*\])/g;function r(t,e,a){if(e.match(i)){!function t(e,a,n){if(0===a.length)return e=n;var i=a.shift(),r=i.match(/^\[(.+?)\]$/);if("[]"===i)return e=e||[],Array.isArray(e)?e.push(t(null,a,n)):(e._values=e._values||[],e._values.push(t(null,a,n))),e;if(r){var s=r[1],l=+s;isNaN(l)?(e=e||{})[s]=t(e[s],a,n):(e=e||[])[l]=t(e[l],a,n)}else e[i]=t(e[i],a,n);return e}(t,function(t){var e=[],a=new RegExp(i),n=/^([^\[\]]*)/.exec(t);for(n[1]&&e.push(n[1]);null!==(n=a.exec(t));)e.push(n[1]);return e}(e),a)}else{var n=t[e];n?(Array.isArray(n)||(t[e]=[n]),t[e].push(a)):t[e]=a}return t}function s(t,e,a){return a=a.replace(/(\r)?\n/g,"\r\n"),a=(a=encodeURIComponent(a)).replace(/%20/g,"+"),t+(t?"&":"")+encodeURIComponent(e)+"="+a}t.exports=function(t,e){"object"!=typeof e?e={hash:!!e}:void 0===e.hash&&(e.hash=!0);for(var i=e.hash?{}:"",l=e.serializer||(e.hash?r:s),o=t&&t.elements?t.elements:[],u=Object.create(null),c=0;c<o.length;++c){var d=o[c];if((e.disabled||!d.disabled)&&d.name&&n.test(d.nodeName)&&!a.test(d.type)){var p=d.name,f=d.value;if("checkbox"!==d.type&&"radio"!==d.type||d.checked||(f=void 0),e.empty){if("checkbox"!==d.type||d.checked||(f=""),"radio"===d.type&&(u[d.name]||d.checked?d.checked&&(u[d.name]=!0):u[d.name]=!1),void 0==f&&"radio"==d.type)continue}else if(!f)continue;if("select-multiple"!==d.type)i=l(i,p,f);else{f=[];for(var v=d.options,_=!1,h=0;h<v.length;++h){var m=v[h],b=e.empty&&!m.value,g=m.value||b;m.selected&&g&&(_=!0,i=e.hash&&"[]"!==p.slice(p.length-2)?l(i,p+"[]",m.value):l(i,p,m.value))}!_&&e.empty&&(i=l(i,p,""))}}}if(e.empty)for(var p in u)u[p]||(i=l(i,p,""));return i}},343:function(t,e,a){"use strict";a.r(e);var n=a(344),i=a.n(n);for(var r in n)"default"!==r&&function(t){a.d(e,t,function(){return n[t]})}(r);e.default=i.a},344:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e.default=t,e}(a(356));e.default={props:["orderVisible","detailDate"],data:function(){return{infoDate:{}}},created:function(){this.getDetail()},computed:{totalPrice:function(){var t=0;return this.infoDate.order_info.forEach(function(e){t+=e.goods_price}),t.toFixed(2)}},methods:{getDetail:function(){var t=this;n.detail({id:this.detailDate.id}).then(function(e){t.infoDate=e.data})},colse:function(){this.$emit("update:orderVisible",!1)}}}},356:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.getList=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,i.request_get)("/api/order/list",t)},e.del=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,i.request_post)("/api/order/delete",t)},e.detail=l,e.statics=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,i.request_get)("/api/order/statistics",t)};var n,i=a(16),r=a(22),s=(n=r)&&n.__esModule?n:{default:n};s.default.compile("/api/order/:id");var l=s.default.compile("/api/order/info/:id");function l(t){var e=t.id,a=function(t,e){var a={};for(var n in t)e.indexOf(n)>=0||Object.prototype.hasOwnProperty.call(t,n)&&(a[n]=t[n]);return a}(t,["id"]);return(0,i.request_get)(l({id:e}),a)}},419:function(t,e,a){"use strict";a.r(e);var n=a(442),i=a(343);for(var r in i)"default"!==r&&function(t){a.d(e,t,function(){return i[t]})}(r);var s=a(0),l=Object(s.a)(i.default,n.a,n.b,!1,null,"e0d3a9e2",null);e.default=l.exports},442:function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"div"},[a("el-dialog",{attrs:{visible:t.orderVisible,width:"1000px",top:"50px","append-to-body":"","before-close":t.colse}},[a("div",{staticClass:"header",attrs:{slot:"title"},slot:"title"},[a("el-tabs",{attrs:{value:"detail"}},[a("el-tab-pane",{attrs:{label:"订单详情",name:"detail"}})],1)],1),a("el-form",[a("el-form-item",{attrs:{label:"订单信息:","label-width":"120px"}},[a("p",[a("span",[t._v("订单编号：")]),a("span",[t._v(t._s(t.infoDate.order_number))])]),a("p",[a("span",[t._v("订单状态：")]),a("span",[t._v(t._s(t.infoDate.is_pay))])]),a("p",[a("span",[t._v("创建时间：")]),a("span",[t._v(t._s(t.infoDate.create_time))])])]),a("el-form-item",{attrs:{label:"商品信息","label-width":"120px"}},[a("table",{staticClass:"table",attrs:{width:"100%"}},[a("thead",[a("tr",[a("th",[t._v("商品序号")]),a("th",[t._v("商品名称")]),a("th",[t._v("类型")]),a("th",[t._v("价格")])])]),t.infoDate.order_info&&t.infoDate.order_info.length?a("tbody",[t._l(t.infoDate.order_info,function(e,n){return a("tr",[a("td",{domProps:{textContent:t._s(n+1)}}),a("td",[t._v(t._s(e.goods_name))]),a("td",[t._v(t._s(e.goods_type))]),a("td",[t._v(t._s(e.goods_price))])])}),a("tr",[a("td",{staticStyle:{"text-align":"right"},attrs:{colspan:"3"}},[t._v("合计:")]),a("td",{domProps:{textContent:t._s(t.totalPrice)}})])],2):t._e()])]),a("el-form-item",{attrs:{label:"用户信息:","label-width":"120px"}},[a("p",[a("span",[t._v("用户名：")]),a("span",[t._v(t._s(t.infoDate.user_nick||t.infoDate.user_name))])]),a("p",[a("span",[t._v("绑定手机号：")]),a("span",[t._v(t._s(t.infoDate.phone))])])]),a("el-form-item",{attrs:{label:"支付信息:","label-width":"120px"}},[a("p",[a("span",[t._v("支付方式：")]),a("span",[t._v(t._s(t.infoDate.pay_type))])]),a("p",[a("span",[t._v("支付金额：")]),a("span",[t._v(t._s(t.infoDate.pay_price))])]),a("p",[a("span",[t._v("支付时间：")]),a("span",[t._v(t._s(t.infoDate.pay_time))])]),a("p",[a("span",[t._v("优惠券：")]),a("span",[t._v(t._s(t.infoDate.user_coupons))])]),a("p",[a("span",[t._v("实际付款：")]),a("span",[t._v(t._s(t.infoDate.pay_price))])])])],1),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{type:"info",size:"small"},on:{click:function(e){return t.$emit("update:orderVisible",!1)}}},[t._v("取消")])],1)],1)],1)},i=[];a.d(e,"a",function(){return n}),a.d(e,"b",function(){return i})},639:function(t,e,a){"use strict";a.r(e);var n=a(640),i=a.n(n);for(var r in n)"default"!==r&&function(t){a.d(e,t,function(){return n[t]})}(r);e.default=i.a},640:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=o(a(9)),i=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var a=arguments[e];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(t[n]=a[n])}return t},r=a(313),s=(o(a(310)),function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e.default=t,e}(a(356))),l=o(a(419));function o(t){return t&&t.__esModule?t:{default:t}}e.default={mixins:[r.publicMixin],components:{Detail:l.default},data:function(){return{services:s,list:null,page:null,type:{value:"",list:[{name:"所有",value:""},{name:"等待支付",value:"0"},{name:"支付完成",value:"1"},{name:"支付关闭",value:"-1"}]},timePick:null,ctimePick:null,orderVisible:null,detailDate:null}},methods:{getList:function(){var t,e=(t=n.default.mark(function t(){var e,a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.page&&this.page.num||1,r=this,l=arguments.length>1&&void 0!==arguments[1]?arguments[1]:this.page&&this.page.offset||10,o=arguments[2];return n.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return e=i({pageNum:a,pageOffset:l},o),t.next=3,s.getList(e).then(function(t){r.page=t.page,r.list=t.data,log(r.list)});case 3:case"end":return t.stop()}},t,this)}),function(){var e=t.apply(this,arguments);return new Promise(function(t,a){return function n(i,r){try{var s=e[i](r),l=s.value}catch(t){return void a(t)}if(!s.done)return Promise.resolve(l).then(function(t){n("next",t)},function(t){n("throw",t)});t(l)}("next")})});return function(){return e.apply(this,arguments)}}(),opneDetail:function(t){this.detailDate=t,this.orderVisible=!0}}}},641:function(t,e,a){}}]);