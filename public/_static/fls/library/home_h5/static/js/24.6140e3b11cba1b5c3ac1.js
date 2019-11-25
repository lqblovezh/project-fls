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
(window.webpackJsonp=window.webpackJsonp||[]).push([[24],{1057:function(t,e){},1058:function(t,e,n){"use strict";var r=n(928);n.n(r).a},1059:function(t,e,n){"use strict";var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"page-read"},[n("Head",{attrs:{type:"dark",name:"全文阅读"}}),n("div",{staticClass:"read-container"},[n("div",{staticClass:"read-content"},[n("div",{staticClass:"read-title flex-between-center"},[t.info?n("div",{staticClass:"name"},[t._v("【"+t._s(t.info.name)+"】")]):t._e(),n("div",{staticClass:"total"},[t._v("共"+t._s(t.list.length)+"章")])]),t._l(t.list,function(e){return n("div",{staticClass:"read-list f14",on:{click:function(n){return t.goReader(e)}}},[n("div",{staticClass:"item"},[t._v(t._s(e.chapter_name))])])})],2)])],1)},i=[];n.d(e,"a",function(){return r}),n.d(e,"b",function(){return i})},631:function(t,e,n){"use strict";n.r(e);var r=n(1059),i=n(926);for(var a in i)"default"!==a&&function(t){n.d(e,t,function(){return i[t]})}(a);n(1058);var o=n(0),c=Object(o.a)(i.default,r.a,r.b,!1,null,null,null);e.default=c.exports},926:function(t,e,n){"use strict";n.r(e);var r=n(927),i=n.n(r);for(var a in r)"default"!==a&&function(t){n.d(e,t,function(){return r[t]})}(a);e.default=i.a},927:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=a(n(9)),i=a(n(10));n(1057);function a(t){return t&&t.__esModule?t:{default:t}}e.default={data:function(){return{list:[],info:null,book_id:this.$route.query.id}},created:function(){var t=this;i.default.db.bookInfo({id:this.book_id}).then(function(e){t.list=e.data.chapters.filter(function(t){if("root"==t.pid)return t}),t.info=e.data})},methods:{goReader:function(t){var e,n=this;return(e=r.default.mark(function e(){var a,o,c,u,s;return r.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.book_id,o=t.index,c=t.id,e.next=3,i.default.category.getAccessCode({id:n.info.article_id});case 3:u=e.sent,localStorage.access_code=u.data,s=n.info.components,n.$go("/reader",{product_id:s&&s.read_product,chapter_root:o,chapter_id:c,book_id:a});case 7:case"end":return e.stop()}},e,n)}),function(){var t=e.apply(this,arguments);return new Promise(function(e,n){return function r(i,a){try{var o=t[i](a),c=o.value}catch(t){return void n(t)}if(!o.done)return Promise.resolve(c).then(function(t){r("next",t)},function(t){r("throw",t)});e(c)}("next")})})()}}}},928:function(t,e,n){}}]);