/*!
 * {
 *   "buildtime": "2019-06-17 15:13:29",
 *   "workspace": "F:\\project\\x-book4\\js",
 *   "username": "Administrator",
 *   "hostname": "PC201608171616",
 *   "platform": "win32",
 *   "git": {
 *     "branch": "master",
 *     "hash": "ecb058dd8",
 *     "message": [
 *       "commit ecb058dd8be16255580b36968fc3831fa41d5989",
 *       "Author: YangZai <552396385@qq.com>",
 *       "Date:   Mon Jun 17 15:12:32 2019 +0800",
 *       "    'xxxxx'"
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
(window.webpackJsonp=window.webpackJsonp||[]).push([[40],{1033:function(t,e,n){"use strict";var s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("div",{staticClass:"page-message-base"},[n("div",{staticClass:"conatiner"},[n("div",{staticClass:"nav"},t._l(t.messageNav,function(e,s){return n("div",{key:e.name,staticClass:"item c_blue0_bg c_f",class:{active:t.currActive.indexOf(s)>0},on:{click:function(n){return t.go(e)}}},[n("span",{staticClass:"icon",class:t.setClass(s)}),n("span",[t._v(t._s(e.name))]),e.num?n("span",{staticClass:"tip"},[t._v(t._s(e.num))]):t._e()])}),0),n("div",{staticClass:"router"},[n("router-view")],1)])])])},a=[];n.d(e,"a",function(){return s}),n.d(e,"b",function(){return a})},442:function(t,e,n){"use strict";n.r(e);var s=n(1033),a=n(695);for(var i in a)"default"!==i&&function(t){n.d(e,t,function(){return a[t]})}(i);n(977);var r=n(0),u=Object(r.a)(a.default,s.a,s.b,!1,null,null,null);e.default=u.exports},695:function(t,e,n){"use strict";n.r(e);var s=n(696),a=n.n(s);for(var i in s)"default"!==i&&function(t){n.d(e,t,function(){return s[t]})}(i);e.default=a.a},696:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var s in n)Object.prototype.hasOwnProperty.call(n,s)&&(t[s]=n[s])}return t},a=n(22);e.default={data:function(){return{messageNav:{answer:{name:"教师答疑",path:"/user/message/answer"},discuss:{name:"学习讨论",path:"/user/message/discuss"},private:{name:"私信",path:"/user/message/private"},info:{name:"消息",path:"/user/message/info"}}}},methods:s({go:function(t){-1==this.$route.path.indexOf(t.path)&&(this.setList([]),this.setPage({}),this.$go(t.path),t.num=null)},edit:function(){},setClass:function(t){return this.$route.path.indexOf(t)>0?"icon-"+t+"-s":"icon-"+t}},(0,a.mapMutations)("userCenter/",["setList","setPage"])),mounted:function(){var t=this;this.$service.userCenter.messageStatus().then(function(e){var n=function(n){var s=e.data.find(function(t){return n===t.type});s&&t.$set(t.messageNav[n],"num",s.total||"0")};for(var s in t.messageNav)n(s)})},computed:{currActive:function(){return this.$route.path}}}},697:function(t,e,n){},977:function(t,e,n){"use strict";var s=n(697);n.n(s).a}}]);