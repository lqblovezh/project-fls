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
(window.webpackJsonp=window.webpackJsonp||[]).push([[27],{1090:function(t,n,e){"use strict";var a=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"page-keys"},[e("Head",{attrs:{name:"关联法规",type:"dark"}}),e("div",{staticClass:"content f14"},[e("div",{staticClass:"tips f12"},[t._v("当前法规"),e("span",[t._v(t._s(t.list&&t.list.length))]),t._v("条")]),e("div",{staticClass:"keyword-list"},t._l(t.list,function(n,a){return e("div",{staticClass:"keyword-item flex",on:{click:function(e){return t.goDetail(n)}}},[e("div",{staticClass:"text"},[t._v(t._s(n.name))]),e("div",{staticClass:"icon-more"})])}),0)])],1)},i=[];e.d(n,"a",function(){return a}),e.d(n,"b",function(){return i})},601:function(t,n,e){"use strict";e.r(n);var a=e(1090),i=e(784);for(var r in i)"default"!==r&&function(t){e.d(n,t,function(){return i[t]})}(r);e(992);var s=e(0),o=Object(s.a)(i.default,a.a,a.b,!1,null,null,null);n.default=o.exports},784:function(t,n,e){"use strict";e.r(n);var a=e(785),i=e.n(a);for(var r in a)"default"!==r&&function(t){e.d(n,t,function(){return a[t]})}(r);n.default=i.a},785:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var a=Object.assign||function(t){for(var n=1;n<arguments.length;n++){var e=arguments[n];for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&(t[a]=e[a])}return t},i=e(15);n.default={asyncData:function(t){var n=t.store,e=t.route;return n.dispatch("normal/getLawList",e.query)},computed:a({},(0,i.mapState)("normal",{list:function(t){return t.law_list}})),methods:{goDetail:function(t){this.$go("/column-detail",{id:t.book_info.product_id,name:t.type_name})}}}},786:function(t,n,e){},992:function(t,n,e){"use strict";var a=e(786);e.n(a).a}}]);