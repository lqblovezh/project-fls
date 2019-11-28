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
(window.webpackJsonp=window.webpackJsonp||[]).push([[47],{197:function(t,n,e){"use strict";e.r(n);var s=e(805),r=e(425);for(var a in r)"default"!==a&&function(t){e.d(n,t,function(){return r[t]})}(a);var o=e(0),i=Object(o.a)(r.default,s.a,s.b,!1,null,null,null);n.default=i.exports},253:function(t,n,e){"use strict";e.r(n);var s=e(254),r=e.n(s);for(var a in s)"default"!==a&&function(t){e.d(n,t,function(){return s[t]})}(a);n.default=r.a},254:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var s=Object.assign||function(t){for(var n=1;n<arguments.length;n++){var e=arguments[n];for(var s in e)Object.prototype.hasOwnProperty.call(e,s)&&(t[s]=e[s])}return t},r=e(6);n.default={data:function(){return{isShowFooter:!0,routes:["home","study","messages","shopCar","user"]}},computed:s({},(0,r.mapState)("user",["messageInfo"]),{cur:function(){var t=this,n=void 0;return this.routes.forEach(function(e){-1!==t.$route.path.indexOf(e)&&(n=e)}),this.isShowFooter=!!n,n},num:function(){if(this.messageInfo){var t=0;return this.messageInfo.forEach(function(n){t+=n.total}),t}return 0}}),methods:s({},(0,r.mapMutations)("user",["setMessageInfo"]),{go:function(t){this.$replace(t)}})}},255:function(t,n,e){},311:function(t,n,e){"use strict";e.r(n);var s=e(537),r=e(253);for(var a in r)"default"!==a&&function(t){e.d(n,t,function(){return r[t]})}(a);e(312);var o=e(0),i=Object(o.a)(r.default,s.a,s.b,!1,null,"60d027c9",null);n.default=i.exports},312:function(t,n,e){"use strict";var s=e(255);e.n(s).a},425:function(t,n,e){"use strict";e.r(n);var s=e(426),r=e.n(s);for(var a in s)"default"!==a&&function(t){e.d(n,t,function(){return s[t]})}(a);n.default=r.a},426:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var s=i(e(5)),r=Object.assign||function(t){for(var n=1;n<arguments.length;n++){var e=arguments[n];for(var s in e)Object.prototype.hasOwnProperty.call(e,s)&&(t[s]=e[s])}return t},a=e(6),o=i(e(311));function i(t){return t&&t.__esModule?t:{default:t}}n.default={components:{Footer:o.default},computed:r({},(0,a.mapState)("user",["userInfo"])),mounted:function(){var t,n=this;return(t=s.default.mark(function t(){return s.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:n.GET_USER_INFO().catch(function(t){n.$route.meta.auth&&n.$go("login")});case 1:case"end":return t.stop()}},t,n)}),function(){var n=t.apply(this,arguments);return new Promise(function(t,e){return function s(r,a){try{var o=n[r](a),i=o.value}catch(t){return void e(t)}if(!o.done)return Promise.resolve(i).then(function(t){s("next",t)},function(t){s("throw",t)});t(i)}("next")})})()},beforeRouteUpdate:function(t,n,e){!this.userInfo&&t.meta.auth?e({name:"login",query:{redirect:n.fullPath}}):e()},methods:r({},(0,a.mapMutations)("user",["setUserInfo"]),(0,a.mapActions)("user",["GET_USER_INFO"]))}},537:function(t,n,e){"use strict";var s=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{directives:[{name:"show",rawName:"v-show",value:t.isShowFooter,expression:"isShowFooter"}],staticClass:"footer"},[e("div",{staticClass:"content"},[e("div",{staticClass:"nav",class:{active:"home"===t.cur},on:{click:function(n){return t.go("home")}}},[e("div",{staticClass:"icon icon-home"}),e("div",{staticClass:"name"},[t._v("首页")])]),e("div",{staticClass:"nav",class:{active:"study"===t.cur},on:{click:function(n){return t.go("study")}}},[e("div",{staticClass:"icon icon-study"}),e("div",{staticClass:"name"},[t._v("学习")])]),e("div",{staticClass:"nav",class:{active:"messages"===t.cur},on:{click:function(n){return t.go("messages")}}},[e("div",{staticClass:"icon icon-message"}),e("div",{staticClass:"name"},[t._v("消息")]),e("span",{directives:[{name:"show",rawName:"v-show",value:t.num>0,expression:"num > 0"}],staticClass:"badage"},[t._v(t._s(t.num))])]),e("div",{staticClass:"nav",class:{active:"shopCar"===t.cur},on:{click:function(n){return t.go("shopCar")}}},[e("div",{staticClass:"icon icon-shop-car"}),e("div",{staticClass:"name"},[t._v("购物车")])]),e("div",{staticClass:"nav",class:{active:"user"===t.cur},on:{click:function(n){return t.go("user")}}},[e("div",{staticClass:"icon icon-my"}),e("div",{staticClass:"name"},[t._v("我的")])])])])},r=[];e.d(n,"a",function(){return s}),e.d(n,"b",function(){return r})},805:function(t,n,e){"use strict";var s=function(){var t=this.$createElement,n=this._self._c||t;return n("div",{attrs:{id:"root"}},[n("router-view"),n("Footer")],1)},r=[];e.d(n,"a",function(){return s}),e.d(n,"b",function(){return r})}}]);