/*!
 * {
 *   "buildtime": "2019-06-17 15:13:29",
 *   "workspace": "F:\\project\\x-book4\\js",
 *   "username": "Administrator",
 *   "hostname": "PC201608171616",
 *   "platform": "win32",
 *   "git": {
 *     "branch": "master",
 *     "hash": "ecb058dd8",
 *     "message": [
 *       "commit ecb058dd8be16255580b36968fc3831fa41d5989",
 *       "Author: YangZai <552396385@qq.com>",
 *       "Date:   Mon Jun 17 15:12:32 2019 +0800",
 *       "    'xxxxx'"
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
(window.webpackJsonp=window.webpackJsonp||[]).push([[39],{1009:function(t,s,i){"use strict";var e=function(){var t=this,s=t.$createElement,i=t._self._c||s;return i("div",{staticClass:"page-course-examlist"},[i("div",{staticClass:"wrap"},[i("div",{staticClass:"head fix"},[i("div",{staticClass:"name tc f20 c_3"},[t._v("在线评测")]),i("div",{staticClass:"btns fr"},[t.isHistoryPaperList?t._e():i("Tbutton",{attrs:{type:"og"},nativeOn:{click:function(s){return t.goHistory(s)}}},[i("span",{staticClass:"icon icon-wrong-book"}),i("span",[t._v("历史错题")])]),t.isHistoryPaperList?i("Tbutton",{attrs:{type:"og"},nativeOn:{click:function(s){return t.goHistory(s)}}},[i("span",[t._v("全部试卷")])]):t._e()],1)]),i("table",{staticClass:"table"},[t._m(0),i("tbody",t._l(t.paperList,function(s){return i("tr",{key:s.id},[i("td",[i("div",{staticClass:"div"},[t._v(t._s(s.name)+"    ")])]),i("td",{attrs:{width:"400"},on:{click:function(i){return t.btnClickHandler(s,i)}}},[i("div",{staticClass:"btns hover"},["1"==s.status?i("div",{staticClass:"ib review"},[i("span",{staticClass:"icon icon-review review"}),i("span",{staticClass:"review"},[t._v(t._s(s.paper_status||"查看"))])]):t._e()])])])}),0)])])])},a=[function(){var t=this.$createElement,s=this._self._c||t;return s("thead",[s("tr",[s("th",[this._v("名称")]),s("th",[this._v("操作")])])])}];i.d(s,"a",function(){return e}),i.d(s,"b",function(){return a})},427:function(t,s,i){"use strict";i.r(s);var e=i(1009),a=i(620);for(var r in a)"default"!==r&&function(t){i.d(s,t,function(){return a[t]})}(r);i(946);var n=i(0),o=Object(n.a)(a.default,e.a,e.b,!1,null,null,null);s.default=o.exports},620:function(t,s,i){"use strict";i.r(s);var e=i(621),a=i.n(e);for(var r in e)"default"!==r&&function(t){i.d(s,t,function(){return e[t]})}(r);s.default=a.a},621:function(t,s,i){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var e=Object.assign||function(t){for(var s=1;s<arguments.length;s++){var i=arguments[s];for(var e in i)Object.prototype.hasOwnProperty.call(i,e)&&(t[e]=i[e])}return t},a=i(22);s.default={created:function(){},asyncData:function(t){t.store,t.route},mounted:function(){this.$store.dispatch("exam/getExamData",this.$route.query)},data:function(){return{goMsg:{},isMistake:!1}},computed:e({},(0,a.mapState)({paperList:function(t){return t.exam.paperList},isHistoryPaperList:function(t){return t.exam.isHistoryPaperList}})),methods:{btnClickHandler:function(t,s){s.target.className;var i=this.$route.query.id,e=t.id,a=t.paper_status||"测试";"查看成绩"===a?this.$go("/course/exam",{id:i,exam_id:e,type:"answer"}):"审评中"===a?this.$go("/course/exam",{id:i,exam_id:e,type:"answer"}):this.isMistake?this.$go("/course/exam",{id:i,exam_id:e,type:"mistake"}):this.$go("/course/exam",{id:i,exam_id:e})},goHistory:function(){this.isMistake=!this.isMistake,this.isHistoryPaperList?this.$store.dispatch("exam/getPaper",this.$route.query):this.$store.dispatch("exam/getHistory",this.$route.query)}}}},622:function(t,s,i){},946:function(t,s,i){"use strict";var e=i(622);i.n(e).a}}]);