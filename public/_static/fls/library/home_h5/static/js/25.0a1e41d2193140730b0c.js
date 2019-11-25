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
(window.webpackJsonp=window.webpackJsonp||[]).push([[25],{1091:function(t,e,n){"use strict";var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"page-keys"},[n("Head",{attrs:{name:"关键词列表",type:"dark"}}),n("div",{staticClass:"content f14"},[n("div",{staticClass:"tips f12"},[t._v("当前关键词有"),n("span",[t._v(t._s(t.keyword&&t.keyword.length))]),t._v("个")]),n("div",{staticClass:"keyword-list"},t._l(t.keyword,function(e,r){return n("div",{staticClass:"keyword-item flex",on:{click:function(n){return t.goKeywordPage(e)}}},[n("div",{staticClass:"text"},[t._v(t._s(e))]),n("div",{staticClass:"icon-more"})])}),0)])],1)},a=[];n.d(e,"a",function(){return r}),n.d(e,"b",function(){return a})},600:function(t,e,n){"use strict";n.r(e);var r=n(1091),a=n(781);for(var i in a)"default"!==i&&function(t){n.d(e,t,function(){return a[t]})}(i);n(991);var o=n(0),s=Object(o.a)(a.default,r.a,r.b,!1,null,null,null);e.default=s.exports},781:function(t,e,n){"use strict";n.r(e);var r=n(782),a=n.n(r);for(var i in r)"default"!==i&&function(t){n.d(e,t,function(){return r[t]})}(i);e.default=a.a},782:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},a=n(15);e.default={asyncData:function(t){var e=t.store,n=t.route;return e.dispatch("category/getItemDetail",n.query)},computed:r({},(0,a.mapState)({meta:function(t){return t.category.itemDetail&&t.category.itemDetail.components}}),{keyword:function(){return this.meta&&this.meta.keyword.split(";")}}),methods:{goKeywordPage:function(t){this.$go("/normal-list",{keyword:t})}}}},783:function(t,e,n){},991:function(t,e,n){"use strict";var r=n(783);n.n(r).a}}]);