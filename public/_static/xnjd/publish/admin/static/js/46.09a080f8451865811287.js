(window.webpackJsonp=window.webpackJsonp||[]).push([[46],{1148:function(t,e,i){"use strict";var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"indexs"},[i("Top",{attrs:{currentPlant:"X-PUBLISH"}}),i("Menu",{attrs:{curr:"/thirdParty"}}),i("div",{staticClass:"mainRight"},[i("div",{staticClass:"thirdParty modular"},[i("div",{staticClass:"title"},[t._v("公众平台授权")]),i("div",{staticClass:"content"},[i("ul",{staticClass:"left"},[i("li",{staticClass:"weChat",on:{click:function(e){t.accredit("weChat")}}},[i("div"),i("span",[t._v("授权微信公众号")])]),i("li",{staticClass:"sina",on:{click:function(e){t.accredit("sina")}}},[i("div"),i("span",[t._v("授权新浪微博")])])]),i("div",{staticClass:"right"},[i("table",{staticClass:"table",attrs:{width:"100%"}},[t._m(0),i("tbody",[i("tr",[i("td",[i("ul",{staticClass:"accountExec"},[t._l(t.list,function(e){return i("li",{class:t.getStyle(e.type)},[i("div"),i("span",[t._v(t._s(e.name)+" ("),i("span",{staticClass:"noAccount"},[t._v("已授权")]),t._v(")")])])}),t.list?t._e():i("li",{staticClass:"weChat"},[i("div"),t._m(1)]),t.list?t._e():i("li",{staticClass:"sina"},[i("div"),t._m(2)])],2)]),t._m(3)])])])])])]),i("el-dialog",{staticClass:"restBody",attrs:{center:!1,visible:t.accreditDialog,top:"50px",width:"1200px","append-to-body":""},on:{"update:visible":function(e){t.accreditDialog=e}}},[i("div",{staticClass:"header",attrs:{slot:"title"},slot:"title"},[i("el-tabs",{attrs:{value:"reader"}},[i("el-tab-pane",{attrs:{label:"授权",name:"reader"}})],1)],1),i("div",{ref:"readerIframe",staticClass:"content"},[i("iframe",{attrs:{id:"readerIframe"}})]),i("div",{staticClass:"footer dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{type:"info"},on:{click:function(e){t.accreditDialog=!1}}},[t._v("关闭")])],1)])],1)],1)},s=[function(){var t=this.$createElement,e=this._self._c||t;return e("thead",[e("tr",[e("th",[this._v("已授权账号")]),e("th",[this._v("授权说明")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("span",[this._v("还 "),e("span",{staticClass:"noAccount"},[this._v("未授权")]),this._v(" 微信公众号，点击右边的按钮进行授权")])},function(){var t=this.$createElement,e=this._self._c||t;return e("span",[this._v("还 "),e("span",{staticClass:"noAccount"},[this._v("未授权")]),this._v(" 新浪微博，点击右边的按钮进行授权")])},function(){var t=this.$createElement,e=this._self._c||t;return e("td",[e("h3",[this._v("授权其他平台")]),e("p",[this._v("本平台方正式授权应用，不会记录你的任何账号、密码信息，更不会泄露授权平台的隐私信息和影响任何功能，授权后可以随时取消授权。")]),e("h3",[this._v("公众号授权")]),e("p",[this._v("微信公众号授权给本平台，你可以在平台上进行内容推送与同步操作。"),e("br"),this._v("如何解除授权：进入微信公众号， 点击“+添加功能插件”，进入授权管理，解除授权。")]),e("h3",[this._v("新浪微博解除授权")]),e("p",[this._v("登录个人主页-点击“管理中心”-进入“我的应用”，解除授权。")])])}];i.d(e,"a",function(){return a}),i.d(e,"b",function(){return s})},338:function(t,e,i){"use strict";i.r(e);var a=i(1148),s=i(724);for(var n in s)"default"!==n&&function(t){i.d(e,t,function(){return s[t]})}(n);i(945);var r=i(0),c=Object(r.a)(s.default,a.a,a.b,!1,null,"3d143e2c",null);c.options.__file="index.vue",e.default=c.exports},724:function(t,e,i){"use strict";i.r(e);var a=i(725),s=i.n(a);for(var n in a)"default"!==n&&function(t){i.d(e,t,function(){return a[t]})}(n);e.default=s.a},725:function(t,e,i){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0});var a=c(i(155)),s=c(i(154)),n=function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e.default=t,e}(i(944)),r=i(122);function c(t){return t&&t.__esModule?t:{default:t}}e.default={mixins:[r.getIconStyle],components:{Menu:a.default,Top:s.default},data:function(){return{accreditDialog:!1,list:null}},created:function(){this.getList(),t.testID=this},methods:{getList:function(){var t=this;n.getList({type:"weChat"}).then(function(e){t.list=e.data,log(t.list)})},accredit:function(t){var e=this;"weChat"==t?n.detail().then(function(t){e.accreditDialog=!0,e.$nextTick(function(){document.getElementById("readerIframe").setAttribute("src",t.data.url)})}).catch(function(t){log(t)}):this.$message.error("新浪授权暂无!")}}}}).call(this,i(5))},726:function(t,e,i){},944:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.getList=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,s.request_get)("/api/platforms",t)},e.cancelAuthorize=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,s.request_put)(r(t),t)},e.detail=function(){arguments.length>0&&void 0!==arguments[0]&&arguments[0];return(0,s.request_get)("/api/wechat/wxauth")};var a,s=i(4),n=i(8);var r=((a=n)&&a.__esModule?a:{default:a}).default.compile("/api/platforms/cancel/:id")},945:function(t,e,i){"use strict";var a=i(726);i.n(a).a}}]);