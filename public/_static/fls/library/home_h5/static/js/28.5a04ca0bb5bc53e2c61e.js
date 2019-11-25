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
(window.webpackJsonp=window.webpackJsonp||[]).push([[28],{1096:function(t,n,e){"use strict";var a=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"page-column-index"},[e("div",{staticClass:"bg-bg2"}),e("Head",{attrs:{name:"资源导航",type:"dark"}}),e("div",{staticClass:"wrapper"},[e("div",{staticClass:"head f34 tc c_f bg-bg-column"}),e("div",{staticClass:"content flex"},t._l(t.column,function(n){return e("MenuItem",{attrs:{type:"dark",name:n.name,des:n.abs,img:n.img_src,num:n.number},nativeOn:{click:function(e){return t.go(n)}}})}),1)])],1)},r=[];e.d(n,"a",function(){return a}),e.d(n,"b",function(){return r})},596:function(t,n,e){"use strict";e.r(n);var a=e(1096),r=e(750);for(var u in r)"default"!==u&&function(t){e.d(n,t,function(){return r[t]})}(u);e(975);var c=e(0),i=Object(c.a)(r.default,a.a,a.b,!1,null,null,null);n.default=i.exports},750:function(t,n,e){"use strict";e.r(n);var a=e(751),r=e.n(a);for(var u in a)"default"!==u&&function(t){e.d(n,t,function(){return a[t]})}(u);n.default=r.a},751:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var a=Object.assign||function(t){for(var n=1;n<arguments.length;n++){var e=arguments[n];for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&(t[a]=e[a])}return t},r=e(15);n.default={asyncData:function(t){var n=t.store;t.route;return n.dispatch("category/getColumnPageData")},computed:a({},(0,r.mapState)({column:function(t){return t.category.column}})),methods:{go:function(t){this.$go("/column-nav",{name:t.name,id:t.id})}}}},752:function(t,n,e){},975:function(t,n,e){"use strict";var a=e(752);e.n(a).a}}]);