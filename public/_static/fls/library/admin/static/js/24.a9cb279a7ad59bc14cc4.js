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
(window.webpackJsonp=window.webpackJsonp||[]).push([[24],{1439:function(t,e,n){"use strict";function r(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("div",{staticClass:"content"},[n("Tree",{ref:"tree",attrs:{dataList:t.list}})],1)])}var u=[];n.d(e,"a",function(){return r}),n.d(e,"b",function(){return u})},265:function(t,e,n){"use strict";n.r(e);var r=n(1439),u=n(705);for(var a in u)"default"!==a&&function(t){n.d(e,t,function(){return u[t]})}(a);var i=n(1),f=Object(i.a)(u.default,r.a,r.b,!1,null,"1ad2657c",null);e.default=f.exports},705:function(t,e,n){"use strict";n.r(e);var r=n(706),u=n.n(r);for(var a in r)"default"!==a&&function(t){n.d(e,t,function(){return r[t]})}(a);e.default=u.a},706:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});!function(t){{if(t&&t.__esModule)return;var e={};if(null!=t)for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);e.default=t}}(n(514));var r,u=n(515),a=(r=u)&&r.__esModule?r:{default:r};e.default={components:{Tree:a.default},data:function(){return{list:[]}},mounted:function(){this.$refs.tree.getList()},methods:{},watch:{$route:function(t,e){t.fullPath!=e.fullPath&&this.$refs.tree.getList()}}}}}]);