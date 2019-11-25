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
(window.webpackJsonp=window.webpackJsonp||[]).push([[37],{222:function(t,n,e){"use strict";e.r(n);var a=e(418),r=e(319);for(var i in r)"default"!==i&&function(t){e.d(n,t,function(){return r[t]})}(i);e(416);var c=e(0),u=Object(c.a)(r.default,a.a,a.b,!1,null,"10bb6774",null);n.default=u.exports},319:function(t,n,e){"use strict";e.r(n);var a=e(320),r=e.n(a);for(var i in a)"default"!==i&&function(t){e.d(n,t,function(){return a[t]})}(i);n.default=r.a},320:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default={data:function(){return{navTab:[{txt:"书城头部设置",href:"/wms/bookSettings/header",active:"active"},{txt:"分类设置",href:"/wms/bookSettings/sort",active:""}]}},methods:{handleNavClick:function(t){this.$router.push({path:this.navTab[t].href})},checkSrc:function(){var t=!0,n=!1,e=void 0;try{for(var a,r=this.navTab[Symbol.iterator]();!(t=(a=r.next()).done);t=!0){var i=a.value;this.$route.path==i.href?i.active="active":"/wms/bookSettings"==this.$route.path?this.navTab[0].active="active":i.active=""}}catch(t){n=!0,e=t}finally{try{!t&&r.return&&r.return()}finally{if(n)throw e}}}},created:function(){this.checkSrc()},watch:{$route:function(){this.checkSrc()}}}},321:function(t,n,e){},416:function(t,n,e){"use strict";var a=e(321);e.n(a).a},418:function(t,n,e){"use strict";var a=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",[e("div",{staticClass:"settingsNavTab"},[e("ul",t._l(t.navTab,function(n,a){return e("li",{class:n.active,on:{click:function(n){return t.handleNavClick(a)}}},[t._v(t._s(n.txt))])}),0)]),e("router-view")],1)},r=[];e.d(n,"a",function(){return a}),e.d(n,"b",function(){return r})}}]);