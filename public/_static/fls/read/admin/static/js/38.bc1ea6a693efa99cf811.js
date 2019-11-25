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
(window.webpackJsonp=window.webpackJsonp||[]).push([[38],{221:function(t,n,e){"use strict";e.r(n);var i=e(380),a=e(305);for(var r in a)"default"!==r&&function(t){e.d(n,t,function(){return a[t]})}(r);e(376);var c=e(0),u=Object(c.a)(a.default,i.a,i.b,!1,null,"3e65aec9",null);n.default=u.exports},305:function(t,n,e){"use strict";e.r(n);var i=e(306),a=e.n(i);for(var r in i)"default"!==r&&function(t){e.d(n,t,function(){return i[t]})}(r);n.default=a.a},306:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default={data:function(){return{navTab:[{txt:"Banner设置",href:"/wms/indexSettings/banner",active:"active"},{txt:"栏目设置",href:"/wms/indexSettings/columns",active:""},{txt:"按钮设置",href:"/wms/indexSettings/button",active:""}]}},methods:{handleNavClick:function(t){this.$router.push({path:this.navTab[t].href,query:{index:"/wms/indexSettings"}})},checkSrc:function(){var t=!0,n=!1,e=void 0;try{for(var i,a=this.navTab[Symbol.iterator]();!(t=(i=a.next()).done);t=!0){var r=i.value;this.$route.path==r.href?r.active="active":"/wms/indexSettings"==this.$route.path?this.navTab[0].active="active":r.active=""}}catch(t){n=!0,e=t}finally{try{!t&&a.return&&a.return()}finally{if(n)throw e}}}},created:function(){this.checkSrc()},watch:{$route:function(){this.checkSrc()}}}},307:function(t,n,e){},376:function(t,n,e){"use strict";var i=e(307);e.n(i).a},380:function(t,n,e){"use strict";var i=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",[e("div",{staticClass:"settingsNavTab"},[e("ul",t._l(t.navTab,function(n,i){return e("li",{class:n.active,on:{click:function(n){return t.handleNavClick(i)}}},[t._v(t._s(n.txt))])}),0)]),e("router-view")],1)},a=[];e.d(n,"a",function(){return i}),e.d(n,"b",function(){return a})}}]);