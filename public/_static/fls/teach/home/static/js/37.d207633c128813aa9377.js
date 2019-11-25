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
(window.webpackJsonp=window.webpackJsonp||[]).push([[37],{1015:function(t,n,e){"use strict";var r=function(){var t=this.$createElement,n=this._self._c||t;return n("div",{staticClass:"page-course-detail"},[n("div",{staticClass:"group"},[n("div",{staticClass:"name f18 c_3"},[this._v("课程概述")]),n("div",{staticClass:"des f14 c_5"},[this._v(this._s(this.detail.abs))])])])},u=[];e.d(n,"a",function(){return r}),e.d(n,"b",function(){return u})},423:function(t,n,e){"use strict";e.r(n);var r=e(1015),u=e(599);for(var a in u)"default"!==a&&function(t){e.d(n,t,function(){return u[t]})}(a);e(937);var i=e(0),s=Object(i.a)(u.default,r.a,r.b,!1,null,null,null);n.default=s.exports},599:function(t,n,e){"use strict";e.r(n);var r=e(600),u=e.n(r);for(var a in r)"default"!==a&&function(t){e.d(n,t,function(){return r[t]})}(a);n.default=u.a},600:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var r,u=e(5),a=(r=u)&&r.__esModule?r:{default:r},i=Object.assign||function(t){for(var n=1;n<arguments.length;n++){var e=arguments[n];for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r])}return t},s=e(22);n.default={asyncData:function(t){var n,e=this,r=(t.store,t.route);return(n=a.default.mark(function t(){return a.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return r.params.id,t.abrupt("return",!0);case 2:case"end":return t.stop()}},t,e)}),function(){var t=n.apply(this,arguments);return new Promise(function(n,e){return function r(u,a){try{var i=t[u](a),s=i.value}catch(t){return void e(t)}if(!i.done)return Promise.resolve(s).then(function(t){r("next",t)},function(t){r("throw",t)});n(s)}("next")})})()},data:function(){return{}},computed:i({},(0,s.mapState)({detail:function(t){return t.course.courseDetail}})),methods:{}}},601:function(t,n,e){},937:function(t,n,e){"use strict";var r=e(601);e.n(r).a}}]);