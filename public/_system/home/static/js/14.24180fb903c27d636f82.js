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
(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{200:function(t,s,i){"use strict";i.r(s);var n=i(600),e=i(255);for(var a in e)"default"!==a&&function(t){i.d(s,t,function(){return e[t]})}(a);i(392);var c=i(3),r=Object(c.a)(e.default,n.a,n.b,!1,null,"56dc4eca",null);s.default=r.exports},255:function(t,s,i){"use strict";i.r(s);var n=i(256),e=i.n(n);for(var a in n)"default"!==a&&function(t){i.d(s,t,function(){return n[t]})}(a);s.default=e.a},256:function(t,s,i){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var n,e=i(65),a=i(0);(n=a)&&n.__esModule;s.default={data:function(){return{info:null,ecosphere:[{name:"X-PUBLISH",abs:"多媒体数字产品发布平台",ref:"xp"},{name:"X-READ",abs:"阅读视听社交生态圈",ref:"xr"},{name:"X-DATA",abs:"出版大数据分析管理",ref:"xd"},{name:"X-SYSTEM",abs:"出版社多账户管理",ref:"xs"},{name:"X-TEACH",abs:"在线教育学习平台",ref:"xt"}]}},mounted:function(){var t=this;(0,e.getInfo)().then(function(s){t.info=s})},methods:{scroll:function(t){var s=document.documentElement.scrollTop||document.body.scrollTop;this.scrollAnimation(s,t)},scrollAnimation:function(t,s){var i=this,n=s-t,e=t;setTimeout(function(){var a=Math.ceil(n/10);e+=a,window.scrollTo(e,t),n>10||n<-10?i.scrollAnimation(e,s):window.scrollTo(e,s)},1)},show:function(){this.$refs.contact.style.display="block"},hide:function(){this.$refs.contact.style.display="none"},login:function(){this.$refs.login.style.display="none"}}}},257:function(t,s,i){},392:function(t,s,i){"use strict";var n=i(257);i.n(n).a},600:function(t,s,i){"use strict";var n=function(){var t=this,s=t.$createElement,i=t._self._c||s;return i("div",{staticClass:"box"},[t.info?i("div",{staticClass:"banner",style:{backgroundImage:"url("+t.info.loginInfo.banner.value+")"}}):t._e(),i("div",{staticClass:"group"},[i("div",{staticClass:"title"}),i("p",[t._v("数字化，一体化，专业化，生态化，助你打造自己的数字出版生态圈")]),i("div",{staticClass:"part cfx"},t._l(t.ecosphere,function(s,n){return i("div",{staticClass:"core core1",class:"core"+(n+1),on:{click:function(i){return t.scroll(t.$refs[s.ref].offsetTop)}}},[i("div",{staticClass:"img"}),i("h3",[t._v(t._s(s.name))]),i("span",[t._v(t._s(s.abs))])])}),0)]),i("div",{ref:"xp",staticClass:"xp"},[t._m(0)]),i("div",{ref:"xr",staticClass:"xr"},[t._m(1)]),i("div",{ref:"xd",staticClass:"xd"},[t._m(2)]),i("div",{ref:"xs",staticClass:"xs"},[t._m(3)]),i("div",{ref:"xt",staticClass:"xt"},[t._m(4)])])},e=[function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"xp-text"},[s("div",{staticClass:"line"}),s("h2",[this._v("X-PUBLISH")]),s("span",[this._v("专业的数字内容生产平台")]),s("p",[this._v("多形态内容生产，数字图书，文章制作，多媒体，3D，H5,AR/VR")]),s("p",[this._v("多渠道内容发布，亚马逊，当当，京东，x-read等平台")]),s("p",[this._v("自由化组装图书，创建你的多媒体图书")]),s("p",[this._v("智能化知识整合，提供跨内容知识点一键组合")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"xr-text"},[s("div",{staticClass:"line"}),s("h2",[this._v("X-READ")]),s("span",[this._v("便捷的移动分发平台")]),s("p",[this._v("针对移动互联网分发数字多媒体图书产品")]),s("p",[this._v("高度契合x-pulish生产平台，提供专业阅读体验")]),s("p",[this._v("结合阅读，社交，学习为一体的分发平台")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"xd-box"},[s("div",{staticClass:"xd-text"},[s("div",{staticClass:"line"}),s("h2",[this._v("X-DATA")]),s("span",[this._v("图书大数据，提高营业率")]),s("p",[this._v("随时跟进全国图书数据变化")]),s("p",[this._v("掌握图书最新数据流向")]),s("p",[this._v("全面提高出版社营业额")])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"xs-box"},[s("div",{staticClass:"xs-text"},[s("div",{staticClass:"line"}),s("h2",[this._v("X-SYSTEM")]),s("span",[this._v("出版社管理系统")]),s("p",[this._v("针对大型出版管理下属出版社")]),s("p",[this._v("随时监控，管理下属出版社权限")])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"xs-box"},[s("div",{staticClass:"xs-text"},[s("div",{staticClass:"line"}),s("h2",[this._v("X-TEACH")]),s("span",[this._v("在线教育学习平台")]),s("p",[this._v("针对高校，出版社机构创建的在线教育平台，拥有移动端，pc端，")]),s("p",[this._v("为用户提供高效的课程创作与学习平台")])])])}];i.d(s,"a",function(){return n}),i.d(s,"b",function(){return e})}}]);