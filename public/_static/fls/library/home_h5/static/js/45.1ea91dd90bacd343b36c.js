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
(window.webpackJsonp=window.webpackJsonp||[]).push([[45],{1075:function(t,e,n){"use strict";var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"page-subject-detail-list"},[n("ColumnRightSelect",{ref:"panel",on:{getColumn:t.getColumn}}),n("Head",{attrs:{name:t.$route.query.name}}),n("div",{staticClass:"wrapper"},[n("ColumnSortBy",{attrs:{top:"45px"},on:{select:t.select,openPanel:t.openPanel}}),n("div",{staticClass:"content"},[t.list.length?n("div",{staticClass:"main"},[n("ResultCount",{attrs:{top:"80px",num:t.resPage.total}}),n("Scroll",{attrs:{isAutoLoad:!1,top:"100px"},on:{loadMore:t.loadMore}},[n("div",{staticClass:"main"},t._l(t.list,function(e){return n("ResultCard",{key:e.id,attrs:{name:e.name,type:e.book_info.components.base_type||e.book_info.components.type,des:e.book_info.components.副标题,time:e.book_info.components.发布时间,fire:e.book_info.hot,cpts:e.book_info.components,number:e.book_info.components.案例编号},nativeOn:{click:function(n){return t.goDetail(e)}}})}),1)])],1):n("NoData",{attrs:{top:"30px"}})],1)],1)],1)},r=[];n.d(e,"a",function(){return o}),n.d(e,"b",function(){return r})},616:function(t,e,n){"use strict";n.r(e);var o=n(1075),r=n(842);for(var a in r)"default"!==a&&function(t){n.d(e,t,function(){return r[t]})}(a);var i=n(0),s=Object(i.a)(r.default,o.a,o.b,!1,null,null,null);e.default=s.exports},842:function(t,e,n){"use strict";n.r(e);var o=n(843),r=n.n(o);for(var a in o)"default"!==a&&function(t){n.d(e,t,function(){return o[t]})}(a);e.default=r.a},843:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o,r=n(9),a=(o=r)&&o.__esModule?o:{default:o},i=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[o]=n[o])}return t},s=n(15);e.default={asyncData:function(t){var e=t.store,n=t.route;return e.dispatch("category/getSubjectDetailList",i({clean:!0},n.query))},computed:i({},(0,s.mapState)({list:function(t){return t.category.subjectDetailList},resPage:function(t){return t.category.resPage}})),data:function(){return{order:{},params:{}}},methods:{select:function(t){this.order=t,this.getList()},openPanel:function(){var t,e=this;return(t=a.default.mark(function t(){var n,o,r;return a.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return n=e.$route.query,o=n.product_id,r=n.class_id,t.next=3,e.$store.dispatch("filter/getList",{id:o,category_filter:r,type:"taoxi"});case 3:e.$refs.panel.open();case 4:case"end":return t.stop()}},t,e)}),function(){var e=t.apply(this,arguments);return new Promise(function(t,n){return function o(r,a){try{var i=e[r](a),s=i.value}catch(t){return void n(t)}if(!i.done)return Promise.resolve(s).then(function(t){o("next",t)},function(t){o("throw",t)});t(s)}("next")})})()},loadMore:function(t){this.getList(!1).then(t)},goDetail:function(t){this.$go("/column-detail",{id:t.product_id,book_id:t.book_id,name:this.$route.query.name})},getList:function(){var t=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];return this.$store.dispatch("category/getSubjectDetailList",i({pageStart:t?0:this.list.length,clean:t,order:this.order},this.params,this.$route.query))},getColumn:function(t){this.params=t,this.getList()}}}}}]);