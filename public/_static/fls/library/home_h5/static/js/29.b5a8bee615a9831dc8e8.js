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
(window.webpackJsonp=window.webpackJsonp||[]).push([[29],{1089:function(t,n,e){"use strict";var o=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"page-keys"},[e("Head",{attrs:{name:"关联资源",type:"dark"}}),e("div",{staticClass:"content f14"},[e("div",{staticClass:"tips f12"},[t._v("当前资源"),e("span",[t._v(t._s(t.list&&t.list.length))]),t._v("条")]),e("div",{staticClass:"keyword-list"},t._l(t.list,function(n,o){return e("div",{staticClass:"keyword-item flex",on:{click:function(e){return t.goDetail(n)}}},[e("div",{staticClass:"text"},[t._v(t._s(n.name))]),e("div",{staticClass:"icon-more"})])}),0)])],1)},i=[];e.d(n,"a",function(){return o}),e.d(n,"b",function(){return i})},602:function(t,n,e){"use strict";e.r(n);var o=e(1089),i=e(787);for(var a in i)"default"!==a&&function(t){e.d(n,t,function(){return i[t]})}(a);e(993);var r=e(0),s=Object(r.a)(i.default,o.a,o.b,!1,null,null,null);n.default=s.exports},787:function(t,n,e){"use strict";e.r(n);var o=e(788),i=e.n(o);for(var a in o)"default"!==a&&function(t){e.d(n,t,function(){return o[t]})}(a);n.default=i.a},788:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var o=Object.assign||function(t){for(var n=1;n<arguments.length;n++){var e=arguments[n];for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o])}return t},i=e(15);n.default={asyncData:function(t){var n=t.store,e=t.route;return n.dispatch("normal/getLawList",e.query)},computed:o({},(0,i.mapState)("normal",{list:function(t){return t.law_list}})),created:function(){this.list},methods:{goDetail:function(t){6!=t.book_info.components.type&&8!=t.book_info.components.type?this.$go("/column-detail",{id:t.book_info.product_id,name:t.type_name}):this.$go("/column-bookproduct",{id:t.book_info.product_id,name:t.book_info.components.type_name})}}}},789:function(t,n,e){},993:function(t,n,e){"use strict";var o=e(789);e.n(o).a}}]);