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
(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{202:function(t,e,s){"use strict";s.r(e);var i=s(596),n=s(262);for(var a in n)"default"!==a&&function(t){s.d(e,t,function(){return n[t]})}(a);s(395);var c=s(3),r=Object(c.a)(n.default,i.a,i.b,!1,null,"03fdbae1",null);e.default=r.exports},260:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.getList=function(t){return(0,n.request_get)("/system/api/home/demo_demo",t)};var i,n=s(62),a=s(63);(i=a)&&i.__esModule},262:function(t,e,s){"use strict";s.r(e);var i=s(263),n=s.n(i);for(var a in i)"default"!==a&&function(t){s.d(e,t,function(){return i[t]})}(a);e.default=n.a},263:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i,n=s(394),a=s(260),c=s(89),r=(i=c)&&i.__esModule?i:{default:i};e.default={components:{},data:function(){return{leftMenu:[],crumbs:"",rightMenu:[],currentIndex:0}},mounted:function(){var t=this;this.demoList(),(0,n.getList)().then(function(e){e.data.length&&(t.crumbs=e.data[0].name),t.leftMenu=e.data.map(function(t,e){return t.isActive=0==e,t}),t.leftMenu.push({name:"演示Demo",type:"demo"}),t.leftMenu})},methods:{demoList:function(){var t=this;(0,a.getList)().then(function(e){t.rightMenu=e.data})},change:function(t){var e=this;this.leftMenu.forEach(function(s,i){i==t&&(e.crumbs=s.name),s.isActive=i==t})},go:function(t){this.$router.push({path:(0,r.default)("/",t)})}}}},264:function(t,e,s){},394:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.getList=function(t){return(0,n.request_get)("/system/api/home/xbooks",t)};var i,n=s(62),a=s(63);(i=a)&&i.__esModule},395:function(t,e,s){"use strict";var i=s(264);s.n(i).a},596:function(t,e,s){"use strict";var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"demo"},[s("div",{staticClass:"banner"}),s("div",{staticClass:"dy"},[s("div",{staticClass:"content"},[s("ul",{staticClass:"leftMenu"},t._l(t.leftMenu,function(e,i){return s("li",[s("p",{class:{active:e.isActive},on:{click:function(e){return t.change(i)}}},[t._v(t._s(e.name))])])}),0),t._l(t.leftMenu,function(e){return e.isActive?s("div",{staticClass:"discribe"},["demo"!=e.type?s("div",{staticClass:"div"},[s("div",{staticClass:"pic"},[s("video",{attrs:{src:e.video_src,height:"500px",width:"880px",controls:"controls"}})]),s("div",{staticClass:"text"},[s("div",{staticClass:"title"},[s("div",{staticClass:"left"},[t._v(t._s(e.name)+"介绍")]),s("div",{staticClass:"right"},[s("a",{attrs:{href:e.file__src}},[t._v("文档下载")])])]),s("div",{staticClass:"w"},[s("pre",[t._v(t._s(e.text))])])])]):s("div",{staticClass:"rightMenu"},[s("ul",{staticClass:"nav"},t._l(t.rightMenu,function(e,i){return s("li",{class:{active:t.currentIndex==i},on:{click:function(e){t.currentIndex=i}}},[t._v(t._s(e.name))])}),0),t._l(t.rightMenu,function(e,i){return t.currentIndex==i?s("div",{staticClass:"div"},[s("div",{staticClass:"pic"},[s("img",{staticClass:"big",attrs:{src:e.img_src}}),s("img",{staticClass:"small",attrs:{src:e.img_code_src}})]),s("div",{staticClass:"text"},[s("div",{staticClass:"title"},[s("div",{staticClass:"left"},[t._v(t._s(e.name)+"介绍")])]),s("div",{staticClass:"w"},[s("pre",[t._v(t._s(e.text))])])])]):t._e()})],2)]):t._e()})],2)])])},n=[];s.d(e,"a",function(){return i}),s.d(e,"b",function(){return n})}}]);