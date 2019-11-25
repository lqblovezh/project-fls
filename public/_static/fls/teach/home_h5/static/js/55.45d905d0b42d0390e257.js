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
(window.webpackJsonp=window.webpackJsonp||[]).push([[55],{206:function(t,e,n){"use strict";n.r(e);var o=n(835),r=n(461);for(var u in r)"default"!==u&&function(t){n.d(e,t,function(){return r[t]})}(u);var a=n(0),c=Object(a.a)(r.default,o.a,o.b,!1,null,null,null);e.default=c.exports},228:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[o]=n[o])}return t},r=n(6);e.default={beforeRouteEnter:function(t,e,n){n(function(t){t.$store.commit("common/TOGGLE_LOADING",!0)})},methods:o({},(0,r.mapMutations)("common",["TOGGLE_LOADING"]))}},461:function(t,e,n){"use strict";n.r(e);var o=n(462),r=n.n(o);for(var u in o)"default"!==u&&function(t){n.d(e,t,function(){return o[t]})}(u);e.default=r.a},462:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o,r=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[o]=n[o])}return t},u=n(6),a=n(228),c=(o=a)&&o.__esModule?o:{default:o};e.default={mixins:[c.default],asyncData:function(t){var e=t.store,n=t.route;return e.dispatch("course/INIT",r({},n.query,n.params)).then(function(){e.commit("common/TOGGLE_LOADING")})},beforeRouteEnter:function(t,e,n){var o=e.path;n(function(t){/\/player\//gi.test(o)&&t.$store.dispatch("course/GET_COURSE_INFO")})},beforeRouteLeave:function(t,e,n){var o=t.path;/\/player\//gi.test(o)||this.SET_COURSE_INFO(null),n()},beforeRouteUpdate:function(t,e,n){t.params.course_id&&t.params.course_id!==e.params.course_id&&this.backToTop();try{this.INIT(r({},t.params)).then(n())}catch(t){n()}},mounted:function(){},methods:r({},(0,u.mapMutations)("course",["SET_COURSE_INFO"]),(0,u.mapActions)("course",["INIT"]),{backToTop:function(){document.body.scrollTop=0,document.documentElement.scrollTop=0}})}},835:function(t,e,n){"use strict";var o=function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"page-course"},[e("router-view")],1)},r=[];n.d(e,"a",function(){return o}),n.d(e,"b",function(){return r})}}]);