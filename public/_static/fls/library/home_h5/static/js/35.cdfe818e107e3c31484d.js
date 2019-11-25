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
(window.webpackJsonp=window.webpackJsonp||[]).push([[35],{1013:function(t,a,e){"use strict";var i=e(841);e.n(i).a},1076:function(t,a,e){"use strict";var i=function(){var t=this,a=t.$createElement,e=t._self._c||a;return t.subject?e("div",{staticClass:"page-taoxi taoxi-bg c_f"},[e("div",{staticClass:"bg-bg-book2"}),e("Head",{attrs:{type:"dark",name:t.subject.name}}),e("div",{staticClass:"taoxi-info-bg"},[e("div",{staticClass:"page-taoxi__info"},[e("div",{staticClass:"page-taoxi__title img_title"},[e("img",{attrs:{src:t.subject.img_src}}),e("span",{staticClass:"page-taoxi__name taoxiname"},[t._v(t._s(t.subject.name))]),t.subject.user_status?t._e():e("div",{staticClass:"addcircle icon icon-add-circle",on:{click:t.addCircle}}),e("div",{staticClass:"clear"})]),e("div",{staticClass:"page-taoxi__author"},[e("TopicTitle",{attrs:{name:"内容简介",rname:"",icon:"false"}})],1),e("div",{staticClass:"page-taoxi__intro ellipsis-4"},[t._v(t._s(t.subject.abs))]),e("div",{staticClass:"page-taoxi__author flex-between-center"},[e("div",{staticClass:"page-taoxi__pic flex-between-center"},[e("div",{staticClass:"page-taoxi__author"},[e("TopicTitle",{attrs:{name:"作者介绍",rname:"",icon:"false"}},[e("img",{attrs:{src:t.subject.components.author_img}}),e("span",{staticClass:"anther"},[t._v(t._s(t.subject.author))])])],1)])]),e("div",{staticClass:"page-taoxi__publish"},t._l(t.subject.attributes,function(a){return e("div",{staticClass:"flex-between"},[e("p",[t._v("出版者")]),e("p",[t._v("法律出版社")])])}),0)])]),e("div",{staticClass:"page-taoxi__wrap"},[e("div",{staticClass:"page-taoxi__menu"},t._l(t.subject.components.columns_info,function(a){return e("SubjectCard",{key:a.id,attrs:{title:a.name,intro:a.abs,num:a.number,img:a.img_src},nativeOn:{click:function(e){return t.navClickHandler(a)}}})}),1)])],1):t._e()},s=[];e.d(a,"a",function(){return i}),e.d(a,"b",function(){return s})},615:function(t,a,e){"use strict";e.r(a);var i=e(1076),s=e(839);for(var n in s)"default"!==n&&function(t){e.d(a,t,function(){return s[t]})}(n);e(1013);var c=e(0),r=Object(c.a)(s.default,i.a,i.b,!1,null,null,null);a.default=r.exports},839:function(t,a,e){"use strict";e.r(a);var i=e(840),s=e.n(i);for(var n in i)"default"!==n&&function(t){e.d(a,t,function(){return i[t]})}(n);a.default=s.a},840:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var i=Object.assign||function(t){for(var a=1;a<arguments.length;a++){var e=arguments[a];for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])}return t},s=e(15);a.default={components:{},asyncData:function(t){var a=t.store,e=t.route;return a.dispatch("category/getSubjectDetailPageData",e.query)},beforeDestroy:function(){this.$store.state.category.subjectDetail=null},data:function(){return{circle:{}}},computed:i({},(0,s.mapState)({subject:function(t){return t.category.subjectDetail}})),methods:{navClickHandler:function(t){this.$go("/subject-detail-list",{class_id:t.id,product_id:this.subject.product_id,name:t.name})},addCircle:function(){this.$addCircle(this.subject,"book_circle_id")}}}},841:function(t,a,e){}}]);