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
(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{201:function(t,e,s){"use strict";s.r(e);var n=s(601),i=s(258);for(var a in i)"default"!==a&&function(t){s.d(e,t,function(){return i[t]})}(a);s(393);var c=s(3),u=Object(c.a)(i.default,n.a,n.b,!1,null,"26f03d90",null);e.default=u.exports},258:function(t,e,s){"use strict";s.r(e);var n=s(259),i=s.n(n);for(var a in n)"default"!==a&&function(t){s.d(e,t,function(){return n[t]})}(a);e.default=i.a},259:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n,i=s(260),a=s(89),c=(n=a)&&n.__esModule?n:{default:n};e.default={components:{},data:function(){return{leftMenu:[],crumbs:""}},mounted:function(){var t=this;(0,i.getList)().then(function(e){e.data.length&&(t.crumbs=e.data[0].name),t.leftMenu=e.data.map(function(t,e){return t.isActive=0==e,t})})},methods:{change:function(t){var e=this;this.leftMenu.forEach(function(s,n){n==t&&(e.crumbs=s.name),s.isActive=n==t})},go:function(t){this.$router.push({path:(0,c.default)("/",t)})}}}},260:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.getList=function(t){return(0,i.request_get)("/system/api/home/demo_demo",t)};var n,i=s(62),a=s(63);(n=a)&&n.__esModule},261:function(t,e,s){},393:function(t,e,s){"use strict";var n=s(261);s.n(n).a},601:function(t,e,s){"use strict";var n=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"demo"},[s("div",{staticClass:"banner"}),s("div",{staticClass:"dy"},[s("ul",{staticClass:"crumbs"},[s("li",{on:{click:function(e){return t.go("home")}}},[t._v("X-BOOK云平台")]),s("li",[t._v("/")]),s("li",[t._v("产品demo")]),s("li",[t._v("/")]),s("li",{staticClass:"ops"},[t._v(t._s(t.crumbs))])]),s("div",{staticClass:"content"},[s("ul",{staticClass:"leftMenu"},t._l(t.leftMenu,function(e,n){return s("li",[s("p",{class:{active:e.isActive},on:{click:function(e){return t.change(n)}}},[t._v(t._s(e.name))])])}),0),t._l(t.leftMenu,function(e){return e.isActive?s("div",{staticClass:"discribe"},[s("div",{staticClass:"pic"},[s("img",{staticClass:"big",attrs:{src:e.img_src}}),s("img",{staticClass:"small",attrs:{src:e.img_code_src}})]),s("div",{staticClass:"text"},[s("div",{staticClass:"title"},[s("div",{staticClass:"left"},[t._v(t._s(e.name)+"介绍")])]),s("div",{staticClass:"w"},[s("pre",[t._v(t._s(e.text))])])])]):t._e()})],2)])])},i=[];s.d(e,"a",function(){return n}),s.d(e,"b",function(){return i})}}]);