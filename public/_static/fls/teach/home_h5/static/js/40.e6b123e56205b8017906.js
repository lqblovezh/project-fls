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
(window.webpackJsonp=window.webpackJsonp||[]).push([[40],{173:function(t,s,n){"use strict";n.r(s);var e=n(821),i=n(309);for(var a in i)"default"!==a&&function(t){n.d(s,t,function(){return i[t]})}(a);n(585);var o=n(0),c=Object(o.a)(i.default,e.a,e.b,!1,null,"9478e718",null);s.default=c.exports},253:function(t,s,n){"use strict";n.r(s);var e=n(254),i=n.n(e);for(var a in e)"default"!==a&&function(t){n.d(s,t,function(){return e[t]})}(a);s.default=i.a},254:function(t,s,n){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var e=Object.assign||function(t){for(var s=1;s<arguments.length;s++){var n=arguments[s];for(var e in n)Object.prototype.hasOwnProperty.call(n,e)&&(t[e]=n[e])}return t},i=n(6);s.default={data:function(){return{isShowFooter:!0,routes:["home","study","messages","shopCar","user"]}},computed:e({},(0,i.mapState)("user",["messageInfo"]),{cur:function(){var t=this,s=void 0;return this.routes.forEach(function(n){-1!==t.$route.path.indexOf(n)&&(s=n)}),this.isShowFooter=!!s,s},num:function(){if(this.messageInfo){var t=0;return this.messageInfo.forEach(function(s){t+=s.total}),t}return 0}}),methods:e({},(0,i.mapMutations)("user",["setMessageInfo"]),{go:function(t){this.$replace(t)}})}},255:function(t,s,n){},309:function(t,s,n){"use strict";n.r(s);var e=n(310),i=n.n(e);for(var a in e)"default"!==a&&function(t){n.d(s,t,function(){return e[t]})}(a);s.default=i.a},310:function(t,s,n){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var e,i=Object.assign||function(t){for(var s=1;s<arguments.length;s++){var n=arguments[s];for(var e in n)Object.prototype.hasOwnProperty.call(n,e)&&(t[e]=n[e])}return t},a=n(6),o=n(311),c=(e=o)&&e.__esModule?e:{default:e};s.default={computed:i({},(0,a.mapState)("user",{userInfo:function(t){return t.userInfo}})),components:{Footer:c.default},methods:i({},(0,a.mapMutations)("user",["clearState"]),{go:function(t){null!==this.userInfo?this.$router.push({path:t}):this.goToLogin()},goToLogin:function(){this.$router.push({path:"login"})},logout:function(){var t=this;this.$service.user.logout().then(function(s){t.clearState()})}})}},311:function(t,s,n){"use strict";n.r(s);var e=n(537),i=n(253);for(var a in i)"default"!==a&&function(t){n.d(s,t,function(){return i[t]})}(a);n(312);var o=n(0),c=Object(o.a)(i.default,e.a,e.b,!1,null,"60d027c9",null);s.default=c.exports},312:function(t,s,n){"use strict";var e=n(255);n.n(e).a},313:function(t,s,n){},537:function(t,s,n){"use strict";var e=function(){var t=this,s=t.$createElement,n=t._self._c||s;return n("div",{directives:[{name:"show",rawName:"v-show",value:t.isShowFooter,expression:"isShowFooter"}],staticClass:"footer"},[n("div",{staticClass:"content"},[n("div",{staticClass:"nav",class:{active:"home"===t.cur},on:{click:function(s){return t.go("home")}}},[n("div",{staticClass:"icon icon-home"}),n("div",{staticClass:"name"},[t._v("首页")])]),n("div",{staticClass:"nav",class:{active:"study"===t.cur},on:{click:function(s){return t.go("study")}}},[n("div",{staticClass:"icon icon-study"}),n("div",{staticClass:"name"},[t._v("学习")])]),n("div",{staticClass:"nav",class:{active:"messages"===t.cur},on:{click:function(s){return t.go("messages")}}},[n("div",{staticClass:"icon icon-message"}),n("div",{staticClass:"name"},[t._v("消息")]),n("span",{directives:[{name:"show",rawName:"v-show",value:t.num>0,expression:"num > 0"}],staticClass:"badage"},[t._v(t._s(t.num))])]),n("div",{staticClass:"nav",class:{active:"shopCar"===t.cur},on:{click:function(s){return t.go("shopCar")}}},[n("div",{staticClass:"icon icon-shop-car"}),n("div",{staticClass:"name"},[t._v("购物车")])]),n("div",{staticClass:"nav",class:{active:"user"===t.cur},on:{click:function(s){return t.go("user")}}},[n("div",{staticClass:"icon icon-my"}),n("div",{staticClass:"name"},[t._v("我的")])])])])},i=[];n.d(s,"a",function(){return e}),n.d(s,"b",function(){return i})},585:function(t,s,n){"use strict";var e=n(313);n.n(e).a},821:function(t,s,n){"use strict";var e=function(){var t=this,s=t.$createElement,n=t._self._c||s;return n("div",{staticClass:"full-layer main-color"},[n("div",{staticClass:"user"},[n("div",{staticClass:"user-info text-center icon-user_bg"},[t.userInfo?n("img",{staticClass:"avatar",attrs:{src:t.userInfo.picture_absolute}}):n("div",{staticClass:"avatar icon-default_avatar",on:{click:t.goToLogin}}),t.userInfo?n("div",{staticClass:"user-info__detail"},[n("div",{staticClass:"user-info__name"},[t._v(t._s(t.userInfo.nick_name)),n("span",{staticClass:"sex",class:["男"==t.userInfo.sex?"icon-male":"icon-female"]})]),n("div",{staticClass:"user-info__school"},[t._v("学校："+t._s(t.userInfo.school||"西南交通大学")),n("span",[t._v("|")]),t._v("学院："+t._s(t.userInfo.college||"未知"))])]):t._e()]),n("div",{staticClass:"line-part"}),n("div",{staticClass:"user-menus"},[n("div",{staticClass:"p3 c-bg-f"},[n("div",{staticClass:"menu-item",on:{click:function(s){return t.go("info")}}},[t._m(0),n("span",{staticClass:"icon-small icon-enter"})]),n("div",{staticClass:"line-part"}),n("div",{staticClass:"menu-item",on:{click:function(s){return t.go("testReport")}}},[t._m(1),n("span",{staticClass:"icon-small icon-enter"})]),n("div",{staticClass:"menu-item",on:{click:function(s){return t.go("follow")}}},[t._m(2),n("span",{staticClass:"icon-small icon-enter"})]),n("div",{staticClass:"menu-item",on:{click:function(s){return t.go("orderDetail")}}},[t._m(3),n("span",{staticClass:"icon-small icon-enter"})]),n("div",{staticClass:"menu-item",on:{click:function(s){return t.go("scoreShop")}}},[t._m(4),n("span",{staticClass:"icon-small icon-enter"})])])]),n("div",{staticClass:"line-part"}),n("button",{directives:[{name:"show",rawName:"v-show",value:t.userInfo,expression:"userInfo"}],staticClass:"btn-default",on:{click:t.logout}},[t._v("退出登录")])])])},i=[function(){var t=this.$createElement,s=this._self._c||t;return s("p",[s("span",{staticClass:"icon icon-info"}),this._v("个人资料")])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[s("span",{staticClass:"icon icon-test_u"}),this._v("测试报告")])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[s("span",{staticClass:"icon icon-follow"}),this._v("关注教师")])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[s("span",{staticClass:"icon icon-order"}),this._v("订单详情")])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[s("span",{staticClass:"icon icon-jifen"}),this._v("积分物品")])}];n.d(s,"a",function(){return e}),n.d(s,"b",function(){return i})}}]);