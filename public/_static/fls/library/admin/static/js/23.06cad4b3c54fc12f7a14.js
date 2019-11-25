/*!
 * {
 *   "buildtime": "2019-07-19 15:10:33",
 *   "workspace": "F:\\project\\x-book4\\js",
 *   "username": "Administrator",
 *   "hostname": "PC201608171616",
 *   "platform": "win32",
 *   "git": {
 *     "branch": "master",
 *     "hash": "95ac4eac7",
 *     "message": [
 *       "commit 95ac4eac704fa029807f3f814b494e89f845f835",
 *       "Author: YangZai <552396385@qq.com>",
 *       "Date:   Fri Jul 19 15:09:46 2019 +0800",
 *       "    xx"
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
(window.webpackJsonp=window.webpackJsonp||[]).push([[23],{253:function(t,n,e){"use strict";e.r(n);var i=e(464),a=e(293);for(var r in a)"default"!==r&&function(t){e.d(n,t,function(){return a[t]})}(r);e(452);var c=e(1),u=Object(c.a)(a.default,i.a,i.b,!1,null,"3e65aec9",null);n.default=u.exports},293:function(t,n,e){"use strict";e.r(n);var i=e(294),a=e.n(i);for(var r in i)"default"!==r&&function(t){e.d(n,t,function(){return i[t]})}(r);n.default=a.a},294:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default={data:function(){return{navTab:[{txt:"Banner设置",href:"/wms/indexSettings/banner",active:"active"},{txt:"栏目设置",href:"/wms/indexSettings/columns",active:""},{txt:"按钮设置",href:"/wms/indexSettings/button",active:""}]}},methods:{handleNavClick:function(t){this.$router.push({path:this.navTab[t].href,query:{index:"/wms/indexSettings"}})},checkSrc:function(){var t=!0,n=!1,e=void 0;try{for(var i,a=this.navTab[Symbol.iterator]();!(t=(i=a.next()).done);t=!0){var r=i.value;this.$route.path==r.href?r.active="active":"/wms/indexSettings"==this.$route.path?this.navTab[0].active="active":r.active=""}}catch(t){n=!0,e=t}finally{try{!t&&a.return&&a.return()}finally{if(n)throw e}}}},created:function(){this.navTab=[{txt:"Banner设置",href:"/wms/indexSettings/banner",active:"active"},{txt:"按钮设置",href:"/wms/indexSettings/button",active:""},{txt:"首页设置",href:"/wms/indexSettings/home",active:""}],this.checkSrc()},watch:{$route:function(){this.checkSrc()}}}},295:function(t,n,e){},452:function(t,n,e){"use strict";var i=e(295);e.n(i).a},464:function(t,n,e){"use strict";function i(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",[i("div",{staticClass:"settingsNavTab"},[i("ul",e._l(e.navTab,function(t,n){return i("li",{class:t.active,on:{click:function(t){return e.handleNavClick(n)}}},[e._v(e._s(t.txt))])}),0)]),i("router-view")],1)}var a=[];e.d(n,"a",function(){return i}),e.d(n,"b",function(){return a})}}]);