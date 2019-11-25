/*!
 * {
 *   "buildtime": "2019-07-17 10:58:50",
 *   "workspace": "F:\\project\\x-book4\\js",
 *   "username": "Administrator",
 *   "hostname": "PC201608171616",
 *   "platform": "win32",
 *   "git": {
 *     "branch": "master",
 *     "hash": "a51842995",
 *     "message": [
 *       "commit a51842995ac312d7b576d646ab99c7a4f3f34d0b",
 *       "Author: YangZai <552396385@qq.com>",
 *       "Date:   Wed Jul 17 10:58:23 2019 +0800",
 *       "    xxx"
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
(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{1098:function(t,e,s){"use strict";var n=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"page-user"},[s("div",{staticClass:"bg bg-bg-house"}),s("div",{staticClass:"page-user__bg"},[s("div",{staticClass:"page-user__top icon-user_bg"},[s("div",{directives:[{name:"show",rawName:"v-show",value:t.needCompleteInfo,expression:"needCompleteInfo"}],staticClass:"page-user__fix tr"},[s("button",{staticClass:"c_f f14",on:{click:function(e){return t.$go("/info")}}},[t._v("完善信息")])]),s("div",{staticClass:"page-user__info"},[s("div",{staticClass:"page-user__pic"},[t.$user&&t.$user.picture_absolute?s("img",{attrs:{src:t.$user.picture_absolute},on:{click:t.viewInfo}}):s("div",{staticClass:"icon icon-avatar",on:{click:t.viewInfo}})]),s("div",{staticClass:"page-user__name c_f"},[s("p",{staticClass:"username"},[t._v(t._s(t.$user&&t.$user.name))]),s("p",{staticClass:"intro info_width f12"},[t._v(t._s(t.$user&&t.$user.summary))])]),t.$user?t._e():s("div",{staticClass:"page-user__unlogin"},[s("p",{staticClass:"c_f",on:{click:t.openLogin}},[t._v("点击登录")])])])]),s("div",{staticClass:"page-user__menu mt30"},[s("Item",{attrs:{name:"book",label:"我的书房",path:"/bookroom"}}),s("Item",{attrs:{name:"note",label:"我的笔记",path:"/note"}}),s("Item",{attrs:{name:"read",label:"阅读历史",path:"/read-history"}}),s("Item",{attrs:{name:"bookcard",label:"我的书签",path:"/bookmark"}}),s("Item",{attrs:{name:"shopcar",label:"购买记录",path:"/shop-record"}})],1),s("div",{staticClass:"page-user__menu mt20"},[s("Item",{attrs:{name:"help",label:"帮助中心",path:"/help"}}),s("Item",{attrs:{name:"message",label:"消息中心",path:"/message"}})],1),s("p",{staticClass:"tc f14"},[s("button",{staticClass:"btn-logout",on:{click:t.openLogin}},[t._v(t._s(t.$user?"退出登录":"登录"))])])])])},a=[];s.d(e,"a",function(){return n}),s.d(e,"b",function(){return a})},1113:function(t,e,s){"use strict";var n=function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"comp-item",on:{click:this.goIn}},[e("p",{staticClass:"icon"},[e("span",{class:["icon-"+this.name]})]),e("div",{staticClass:"comp-item__name f14"},[e("p",[this._v(this._s(this.label))]),e("div",{staticClass:"icon icon-left-arrow-dark rt180"})])])},a=[];s.d(e,"a",function(){return n}),s.d(e,"b",function(){return a})},595:function(t,e,s){"use strict";s.r(e);var n=s(1098),a=s(744);for(var i in a)"default"!==i&&function(t){s.d(e,t,function(){return a[t]})}(i);s(974);var o=s(0),r=Object(o.a)(a.default,n.a,n.b,!1,null,null,null);e.default=r.exports},744:function(t,e,s){"use strict";s.r(e);var n=s(745),a=s.n(n);for(var i in n)"default"!==i&&function(t){s.d(e,t,function(){return n[t]})}(i);e.default=a.a},745:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n,a=s(972),i=(n=a)&&n.__esModule?n:{default:n};e.default={components:{Item:i.default},data:function(){return{}},computed:{needCompleteInfo:function(){var t=this;return this.$user&&["sex","date_of_birth","email","duties","phone"].some(function(e){return!t.$user[e]})}},methods:{openLogin:function(){this.$user?this.$logOut():this.$openLogin()},viewInfo:function(){this.$user&&this.$go("/info")}}}},746:function(t,e,s){"use strict";s.r(e);var n=s(747),a=s.n(n);for(var i in n)"default"!==i&&function(t){s.d(e,t,function(){return n[t]})}(i);e.default=a.a},747:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:["name","label","path"],methods:{goIn:function(){this.$user?this.$go(this.path):this.$openLogin()}}}},748:function(t,e,s){},749:function(t,e,s){},972:function(t,e,s){"use strict";s.r(e);var n=s(1113),a=s(746);for(var i in a)"default"!==i&&function(t){s.d(e,t,function(){return a[t]})}(i);s(973);var o=s(0),r=Object(o.a)(a.default,n.a,n.b,!1,null,null,null);e.default=r.exports},973:function(t,e,s){"use strict";var n=s(748);s.n(n).a},974:function(t,e,s){"use strict";var n=s(749);s.n(n).a}}]);