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
(window.webpackJsonp=window.webpackJsonp||[]).push([[34],{1012:function(t,e,n){"use strict";var i=n(838);n.n(i).a},1077:function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"page-subject-more"},[n("Head",{attrs:{name:"套系专题"}}),t.subject.length?n("div",{staticClass:"wrapper"},[n("ColumNav",{attrs:{list:t.subject},on:{itemClickHandler:t.itemClickHandler}}),n("div",{staticClass:"content"},[t.subjectList.length?n("div",{staticClass:"main"},[n("Scroll",{on:{loadMore:t.loadMore}},[n("div",{staticClass:"main"},t._l(t.subjectList,function(e){return n("ResultSubjectCard",{key:e.id,attrs:{name:e.name,book_info:e.book_info,img:e.book_info.components.img_src},nativeOn:{click:function(n){return t.goDetail(e)}}})}),1)])],1):n("NoData")],1)],1):t._e()],1)},r=[];n.d(e,"a",function(){return i}),n.d(e,"b",function(){return r})},614:function(t,e,n){"use strict";n.r(e);var i=n(1077),r=n(836);for(var o in r)"default"!==o&&function(t){n.d(e,t,function(){return r[t]})}(o);n(1012);var a=n(0),u=Object(a.a)(r.default,i.a,i.b,!1,null,null,null);e.default=u.exports},836:function(t,e,n){"use strict";n.r(e);var i=n(837),r=n.n(i);for(var o in i)"default"!==o&&function(t){n.d(e,t,function(){return i[t]})}(o);e.default=r.a},837:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(t[i]=n[i])}return t},r=n(15);e.default={asyncData:function(t){var e=t.store,n=t.route;return e.dispatch("category/getSubjectPageData",n.query)},beforeRouteUpdate:function(t,e,n){n(),this.$store.dispatch("category/getSubjectList",{id:t.query.id,clean:!0}),this.$unCheckedAll(this.subject,t.query.id)},beforeDestroy:function(){this.$store.state.category.subjectList=[]},data:function(){return{list:[]}},computed:i({},(0,r.mapState)({subject:function(t){return t.category.subject},subjectList:function(t){return t.category.subjectList}})),mounted:function(){this.getMore()},methods:{itemClickHandler:function(t){var e=this.$route.query;this.$replace("/subject",i({},e,{id:t.id}))},touchMoveHandler:function(t){t.target.scrollHeight},getMore:function(){var t,e=this,n=void 0;return t=new Promise(function(t,e){n=t,e}),setTimeout(function(){for(var t,i=[],r=0;r<20;r++)i.push({id:Math.random(),name:"item"+r});(t=e.list).push.apply(t,i),n()},1e3),t},goDetail:function(t){this.$go("/taoxi",{id:t.book_info.id,name:this.$route.query.name})},loadMore:function(t){var e=i({},this.$route.query,{pageStart:this.subjectList.length,id:this.$route.query.id});this.$store.dispatch("category/getSubjectList",e).then(t)}}}},838:function(t,e,n){}}]);