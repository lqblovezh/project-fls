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
(window.webpackJsonp=window.webpackJsonp||[]).push([[33],{1082:function(t,e,r){"use strict";var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"page-search-normal"},[r("div",{staticClass:"wrapper"},[r("Head",{attrs:{name:"检索结果"}}),r("div",{staticClass:"content"},[t.list.length?r("div",{staticClass:"main"},[r("div",{staticClass:"pageResult"},[r("TopicTitle",{attrs:{name:"检索结果 ("+t.resPage.total+"条)",leftIcon:"results",icon:"",rname:" "}})],1),r("Scroll",{attrs:{top:"90px"},on:{loadMore:t.loadMore}},[r("div",{staticClass:"ls",on:{click:t.curr}},t._l(t.list,function(e,n){return r("ResultCard",{key:n,attrs:{parent:e,from:e.name,name:e.chapter_name,keyword:t.$route.query.name,content:e.strip_text,chapters:e.chapters},on:{chapterclick:t.chapterClick},nativeOn:{click:function(r){return t.goDetail(e)}}})}),1)])],1):r("NoData")],1)],1)])},a=[];r.d(e,"a",function(){return n}),r.d(e,"b",function(){return a})},608:function(t,e,r){"use strict";r.r(e);var n=r(1082),a=r(803);for(var o in a)"default"!==o&&function(t){r.d(e,t,function(){return a[t]})}(o);r(998);var c=r(0),i=Object(c.a)(a.default,n.a,n.b,!1,null,null,null);e.default=i.exports},803:function(t,e,r){"use strict";r.r(e);var n=r(804),a=r.n(n);for(var o in n)"default"!==o&&function(t){r.d(e,t,function(){return n[t]})}(o);e.default=a.a},804:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=i(r(9)),a=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var r=arguments[e];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(t[n]=r[n])}return t},o=r(15),c=i(r(10));function i(t){return t&&t.__esModule?t:{default:t}}function s(t){return function(){var e=t.apply(this,arguments);return new Promise(function(t,r){return function n(a,o){try{var c=e[a](o),i=c.value}catch(t){return void r(t)}if(!c.done)return Promise.resolve(i).then(function(t){n("next",t)},function(t){n("throw",t)});t(i)}("next")})}}e.default={asyncData:function(t){var e=t.store,r=t.route;r.query.formData&&JSON.parse(r.query.formData);return e.dispatch("search/getSimpleSearch",a({clean:!0},r.query))},computed:a({},(0,o.mapState)("search",{list:function(t){return t.list},resPage:function(t){return t.resPage}})),mounted:function(){document.title="Xbook 小数据库"},data:function(){return{isFilter:!1,params:{},page:{pageStart:0,pageOffset:20}}},beforeRouteUpdate:function(t,e,r){this.clean(),r()},beforeDestroy:function(){this.clean()},methods:a({},(0,o.mapMutations)("search",["SET_LIST"]),(0,o.mapActions)("search",["getSimpleSearch"]),{openPanel:function(){this.$refs.panel.open()},loadMore:function(t){var e=this.$route.query.formData;e&&JSON.parse(e);this.getSimpleSearch(a({pageStart:this.list.length},this.$route.query)).then(function(e){t(e)})},goDetail:function(t){var e=this;return s(n.default.mark(function r(){var a,o,i,s,u,l;return n.default.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return a=t.book_id,o=t.index,i=t.id,s=t.read_product,u=t.article_id,r.next=3,c.default.category.getAccessCode({id:u});case 3:l=r.sent,localStorage.access_code=l.data,e.$go("/reader",{product_id:s,chapter_root:o,chapter_id:i,book_id:a});case 6:case"end":return r.stop()}},r,e)}))()},curr:function(t){},clean:function(){this.$store.state.search.list=[]},chapterClick:function(t,e){var r=this;return s(n.default.mark(function a(){var o,i,s,u,l;return n.default.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return o=t.book_id,i=t.index,s=t.id,n.next=3,c.default.category.getAccessCode({id:e.article_id});case 3:u=n.sent,localStorage.access_code=u.data,l=e.books_info.components,r.$go("/reader",{product_id:l.read_product,chapter_root:i,chapter_id:s,book_id:o});case 7:case"end":return n.stop()}},a,r)}))()}})}},805:function(t,e,r){},998:function(t,e,r){"use strict";var n=r(805);r.n(n).a}}]);