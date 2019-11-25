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
(window.webpackJsonp=window.webpackJsonp||[]).push([[42],{180:function(t,e,n){"use strict";n.r(e);var i=n(856),c=n(332);for(var a in c)"default"!==a&&function(t){n.d(e,t,function(){return c[t]})}(a);n(596);var s=n(0),r=Object(s.a)(c.default,i.a,i.b,!1,null,"60985f99",null);e.default=r.exports},221:function(t,e,n){"use strict";n.r(e);var i=n(222),c=n.n(i);for(var a in i)"default"!==a&&function(t){n.d(e,t,function(){return i[t]})}(a);e.default=c.a},222:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{hideBack:{},type:{},privateStyle:{},isRewrite:{type:Boolean,default:!1}},computed:{isShowSearch:function(){return!!this.isSearch},isShowBack:function(){return!this.hideBack}},methods:{goBack:function(){this.isRewrite?this.$emit("back"):this.$router.go(-1)},goSearch:function(){this.$router.push({name:"search"})},share:function(){}}}},223:function(t,e,n){},224:function(t,e,n){"use strict";n.r(e);var i=n(226),c=n(221);for(var a in c)"default"!==a&&function(t){n.d(e,t,function(){return c[t]})}(a);n(225);var s=n(0),r=Object(s.a)(c.default,i.a,i.b,!1,null,"bc7c4e9e",null);e.default=r.exports},225:function(t,e,n){"use strict";var i=n(223);n.n(i).a},226:function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"header",style:t.privateStyle},[n("div",{staticClass:"header-left"},[t._t("left",[n("span",{staticClass:"icon-go-back icon-back",on:{click:t.goBack}})])],2),n("div",{staticClass:"header-center text-center"},[t._t("center")],2),n("div",{staticClass:"header-right text-right"},[t._t("right",["share"===t.type?n("span",{staticClass:"icon-share",on:{click:t.share}}):"search"===t.type?n("span",{staticClass:"icon-search_h",on:{click:t.goSearch}}):n("span",{staticClass:"placeholder"})])],2)])},c=[];n.d(e,"a",function(){return i}),n.d(e,"b",function(){return c})},332:function(t,e,n){"use strict";n.r(e);var i=n(333),c=n.n(i);for(var a in i)"default"!==a&&function(t){n.d(e,t,function(){return i[t]})}(a);e.default=c.a},333:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i,c=n(224),a=(i=c)&&i.__esModule?i:{default:i};e.default={data:function(){return{myTitle:"关注教师",list:null}},components:{Head:a.default},mounted:function(){this.init()},methods:{init:function(){this.getList()},getList:function(){var t=this;this.$service.teacher.getMyFollowList().then(function(e){t.list=e.data})},viewTeaccherInfo:function(t){this.$router.push({path:"teacherDetail",query:{userId:t.id}})},cancelMyFollow:function(t){var e=this;this.$service.teacher.cancelFollowedRequest({id:t.id}).then(function(t){e.init()}).catch(console.warn)}}}},334:function(t,e,n){},596:function(t,e,n){"use strict";var i=n(334);n.n(i).a},856:function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"pt88-static__vh"},[n("Head",{attrs:{type:"search"}},[n("p",{attrs:{slot:"center"},slot:"center"},[t._v("关注老师")])]),n("div",{staticClass:"c-bg-f"},[n("div",{staticClass:"p3"},t._l(t.list,function(e){return n("div",{staticClass:"teacher-item"},[n("img",{attrs:{src:e.picture_absolute},on:{click:function(n){return t.viewTeaccherInfo(e)}}}),n("div",{staticClass:"teacher-info"},[n("p",{staticClass:"techer-info__name"},[t._v(t._s(e.name))]),n("p",{staticClass:"teacher-info__intro"},[t._v("简介："+t._s(e.tags))]),n("p",{staticClass:"teacher-info__company"},[t._v("单位名称："+t._s(e.company||"未知"))])]),n("a",{staticClass:"btn circle btn-selected",on:{click:function(n){return t.cancelMyFollow(e)}}},[t._v("已关注")])])}),0)])],1)},c=[];n.d(e,"a",function(){return i}),n.d(e,"b",function(){return c})}}]);