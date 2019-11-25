/*!
 * {
 *   "buildtime": "2019-07-17 10:58:50",
 *   "workspace": "F:\\project\\x-book4\\js",
 *   "username": "Administrator",
 *   "hostname": "PC201608171616",
 *   "platform": "win32",
 *   "git": {
 *     "branch": "master",
 *     "hash": "a51842995",
 *     "message": [
 *       "commit a51842995ac312d7b576d646ab99c7a4f3f34d0b",
 *       "Author: YangZai <552396385@qq.com>",
 *       "Date:   Wed Jul 17 10:58:23 2019 +0800",
 *       "    xxx"
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
(window.webpackJsonp=window.webpackJsonp||[]).push([[44],{1088:function(e,t,r){"use strict";var n=function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"page-search"},[t("SearchHead",{on:{nameChangeHandler:this.nameChangeHandler}}),t("router-view",{attrs:{nameChangeHandler:this.nameChangeHandler}})],1)},a=[];r.d(t,"a",function(){return n}),r.d(t,"b",function(){return a})},603:function(e,t,r){"use strict";r.r(t);var n=r(1088),a=r(790);for(var i in a)"default"!==i&&function(e){r.d(t,e,function(){return a[e]})}(i);var s=r(0),o=Object(s.a)(a.default,n.a,n.b,!1,null,null,null);t.default=o.exports},790:function(e,t,r){"use strict";r.r(t);var n=r(791),a=r.n(n);for(var i in n)"default"!==i&&function(e){r.d(t,e,function(){return n[e]})}(i);t.default=a.a},791:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},a=r(15);t.default={asyncData:function(e){var t=e.store,r=e.route.path;return!/\/search\/result/g.test(r)&&t.dispatch("search/initTab",{hot:!0})},computed:n({},(0,a.mapState)("search",{firstCategory:function(e){return e.cates},secondCategory:function(e){return e.cateSecond}})),data:function(){return{type:this.$route.query.type}},methods:{nameChangeHandler:function(e){var t=this.$route.query,r=t.cid,n=t.pid;if(r&&n)this.$replace("/search/result",{cid:r,pid:n,name:e});else if("simple"==this.type){var a={where_type:"or",keyword:e},i={formData:JSON.stringify(a)};this.$go("/search-simple",i)}else this.$go("/search/result",{cid:this.secondCategory[0].id,pid:this.secondCategory[0].pid,name:e})}}}}}]);