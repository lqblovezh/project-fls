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
(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{207:function(t,e,n){"use strict";n.r(e);var a=n(592),r=n(343);for(var i in r)"default"!==i&&function(t){n.d(e,t,function(){return r[t]})}(i);n(588);var s=n(3),c=Object(s.a)(r.default,a.a,a.b,!1,null,"5478f61c",null);e.default=c.exports},343:function(t,e,n){"use strict";n.r(e);var a=n(344),r=n.n(a);for(var i in a)"default"!==i&&function(t){n.d(e,t,function(){return a[t]})}(i);e.default=r.a},344:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(t[a]=n[a])}return t},r=n(90),i=n(88);e.default={data:function(){return{}},computed:a({},(0,i.mapState)({list:function(t){return t.personal.list},page:function(t){return t.personal.page}})),mounted:function(){this.getList()},methods:a({prevew:function(t){window.location.href=t},handleSizeChange:function(t){this.page.pageOffset=t,this.getList(a({},this.page,this.query))},handleCurrentChange:function(t){this.page.pageNum=t,this.getList(a({},this.page,this.query))},getStatus:function(t){return"success"==t.status?"成功":"sleep"==t.status?t.info.speed+"%":"失败"},del:function(t){var e=this;this.$confirm("是否确认退出?").then(function(n){(0,r.del)({id:t}).then(function(t){e.getList(),e.$message.success("删除成功")})}).catch(function(t){})}},(0,i.mapActions)("personal",["getList"]))}},345:function(t,e,n){},588:function(t,e,n){"use strict";var a=n(345);n.n(a).a},592:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"container makeDetail personal"},[n("div",{staticClass:"content"},[n("p",{staticClass:"typeName"},[t._v("个人作品")]),n("table",{staticClass:"table"},[t._m(0),n("tbody",t._l(t.list,function(e){return n("tr",[n("th",[t._v(t._s(e.name))]),n("th",[t._v(t._s(e.type_name))]),n("th",[t._v(t._s(t.getStatus(e)))]),n("th",[n("div",{staticClass:"btns"},[n("el-popover",{attrs:{placement:"top-start",trigger:"hover",content:""}},[n("img",{ref:"reference",refInFor:!0,attrs:{src:e.base_url}}),n("el-button",{attrs:{slot:"reference",size:"mini",type:"primary",plain:""},on:{click:function(n){return t.prevew(e.url)}},slot:"reference"},[t._v("预览")])],1),n("el-button",{attrs:{size:"mini",type:"primary",plain:""},on:{click:function(n){return t.del(e.id)}}},[t._v("删除")])],1)])])}),0)]),t.page?n("div",{staticClass:"pageWrap"},[n("el-pagination",{attrs:{background:"",layout:"prev, pager, next",total:t.page.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1):t._e()])])},r=[function(){var t=this.$createElement,e=this._self._c||t;return e("thead",[e("tr",[e("th",[this._v("名称")]),e("th",[this._v("类型")]),e("th",{attrs:{width:"160"}},[this._v("制作中")]),e("th",{staticStyle:{"text-align":"center"}},[this._v("操作")])])])}];n.d(e,"a",function(){return a}),n.d(e,"b",function(){return r})}}]);