/*!
 * {
 *   "buildtime": "2019-07-19 15:10:33",
 *   "workspace": "F:\\project\\x-book4\\js",
 *   "username": "Administrator",
 *   "hostname": "PC201608171616",
 *   "platform": "win32",
 *   "git": {
 *     "branch": "master",
 *     "hash": "95ac4eac7",
 *     "message": [
 *       "commit 95ac4eac704fa029807f3f814b494e89f845f835",
 *       "Author: YangZai <552396385@qq.com>",
 *       "Date:   Fri Jul 19 15:09:46 2019 +0800",
 *       "    xx"
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
(window.webpackJsonp=window.webpackJsonp||[]).push([[10,23],{1100:function(t,e,i){t.exports=i.p+"static/img/u1971.png?4ccd5dc6e2c90efde3407f09855f571e"},1101:function(t,e,i){t.exports=i.p+"static/img/u1973.png?967853f7d646c9bc95f4d30353640681"},1102:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.getList=function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};return(0,a.request_get)("/api/banners",t)},e.save=function(t){var e=t.id,i=c(t,["id"]);if(e)return(0,a.request_put)(o({id:e}),i);return(0,a.request_post)("/api/banners",i)},e.detail=function(t){var e=t.id,i=c(t,["id"]);return(0,a.request_get)(o({id:e}),i)},e.del=function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};return(0,a.request_post)("/api/banners/delete",t)},e.sort=function(t){var e=t.id,i=c(t,["id"]);return(0,a.request_put)(u({id:e}),i)};var n,a=i(15),r=i(22),s=(n=r)&&n.__esModule?n:{default:n};function c(t,e){var i={};for(var n in t)0<=e.indexOf(n)||Object.prototype.hasOwnProperty.call(t,n)&&(i[n]=t[n]);return i}var o=s.default.compile("/api/banners/:id"),u=s.default.compile("/api/banners/sort/:id")},1103:function(t,e,i){"use strict";var n=i(673);i.n(n).a},1446:function(t,e,r){"use strict";function i(){var n=this,t=n.$createElement,a=n._self._c||t;return a("div",[a("Nav"),a("div",{staticClass:"content"},[n._m(0),n._l(n.dataList,function(e,i){return a("div",{staticClass:"list"},[a("div",{staticClass:"leftSide"},[a("img",{staticClass:"thumb",attrs:{src:e.img_src}})]),a("div",{staticClass:"rightSide"},[a("el-form",{attrs:{inline:!0}},[a("div",{staticClass:"operation"},[a("span",[n._v("排序:( "+n._s(i+1)+" )")]),a("img",{staticClass:"icon up",attrs:{src:r(1100),alt:"icon"},on:{click:function(t){return n.up(i)}}}),a("img",{staticClass:"icon down",attrs:{src:r(1101),alt:"icon"},on:{click:function(t){return n.down(i)}}}),a("div",{staticClass:"form-item"},[a("el-form-item",{attrs:{label:"关联:"}},[a("el-input",{attrs:{placeholder:"请输入新的URL地址",value:e.src}})],1),a("el-form-item",[a("el-button",{attrs:{type:"info"},on:{click:function(t){return n.update(i)}}},[n._v("修改")])],1)],1),a("el-button",{attrs:{type:"danger"},on:{click:function(t){return n.del(i,e.id)}}},[n._v("删除")])],1)])],1)])}),a("div",{staticClass:"add"},[a("el-button",{attrs:{type:"primary"},on:{click:n.reset}},[n._v(" 添加图片")]),a("span",{staticClass:"info"},[n._v(" (Banner仅支持jpg、png格式，推荐比例：1125*560 px)")])],1),a("el-dialog",{attrs:{title:"添加图片",width:"30%",visible:n.dialogVisible},on:{"update:visible":function(t){n.dialogVisible=t}}},[a("el-form",{ref:"form"},[a("el-form-item",{attrs:{label:"关联地址"}},[a("el-input",{attrs:{placeholder:"请输入关联URL地址 eg:http://www.baidu.com/x-book.html"},model:{value:n.info.src,callback:function(t){n.$set(n.info,"src",t)},expression:"info.src"}})],1),a("el-form-item",[a("div",[n.dialogImageUrl?a("img",{staticClass:"previewImgUrl",staticStyle:{"max-width":"200px"},attrs:{src:n.dialogImageUrl,alt:"暂无图片"}}):n._e(),a("el-button",{staticStyle:{"margin-left":"20px"},attrs:{size:"mini",type:"primary",plain:""},on:{click:function(t){return n.$refs.banner.click()}}},[n._v("上传Banner图")]),a("input",{ref:"banner",staticClass:"hide",attrs:{type:"file",accept:"image/jpeg,image/jpg,image/png"},on:{change:function(t){return n.previewImg(t)}}}),a("input",{staticClass:"hide",attrs:{name:"img",type:"text"},domProps:{value:n.info.img}})],1),a("p",{staticClass:"imgSize"},[a("span",{staticClass:"bannerSize"},[n._v("建议最大宽度：200px")])])])],1),a("span",{staticClass:"dialg-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){n.dialogVisible=!1}}},[n._v("取消")]),a("el-button",{attrs:{type:"primary"},on:{click:n.add}},[n._v("确定")])],1)],1)],2)],1)}var n=[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"info"},[e("img",{attrs:{src:r(670)}}),e("span",[this._v("最多支持10张banner图片，当图片数量仅为一张时，banner为静态图片无轮播功能。")])])}];r.d(e,"a",function(){return i}),r.d(e,"b",function(){return n})},253:function(t,e,i){"use strict";i.r(e);var n=i(464),a=i(293);for(var r in a)"default"!==r&&function(t){i.d(e,t,function(){return a[t]})}(r);i(452);var s=i(1),c=Object(s.a)(a.default,n.a,n.b,!1,null,"3e65aec9",null);e.default=c.exports},258:function(t,e,i){"use strict";i.r(e);var n=i(1446),a=i(671);for(var r in a)"default"!==r&&function(t){i.d(e,t,function(){return a[t]})}(r);i(1103);var s=i(1),c=Object(s.a)(a.default,n.a,n.b,!1,null,"2a3ac5bd",null);e.default=c.exports},293:function(t,e,i){"use strict";i.r(e);var n=i(294),a=i.n(n);for(var r in n)"default"!==r&&function(t){i.d(e,t,function(){return n[t]})}(r);e.default=a.a},294:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={data:function(){return{navTab:[{txt:"Banner设置",href:"/wms/indexSettings/banner",active:"active"},{txt:"栏目设置",href:"/wms/indexSettings/columns",active:""},{txt:"按钮设置",href:"/wms/indexSettings/button",active:""}]}},methods:{handleNavClick:function(t){this.$router.push({path:this.navTab[t].href,query:{index:"/wms/indexSettings"}})},checkSrc:function(){var t=!0,e=!1,i=void 0;try{for(var n,a=this.navTab[Symbol.iterator]();!(t=(n=a.next()).done);t=!0){var r=n.value;this.$route.path==r.href?r.active="active":"/wms/indexSettings"==this.$route.path?this.navTab[0].active="active":r.active=""}}catch(t){e=!0,i=t}finally{try{!t&&a.return&&a.return()}finally{if(e)throw i}}}},created:function(){this.navTab=[{txt:"Banner设置",href:"/wms/indexSettings/banner",active:"active"},{txt:"按钮设置",href:"/wms/indexSettings/button",active:""},{txt:"首页设置",href:"/wms/indexSettings/home",active:""}],this.checkSrc()},watch:{$route:function(){this.checkSrc()}}}},295:function(t,e,i){},452:function(t,e,i){"use strict";var n=i(295);i.n(n).a},464:function(t,e,i){"use strict";function n(){var i=this,t=i.$createElement,n=i._self._c||t;return n("div",[n("div",{staticClass:"settingsNavTab"},[n("ul",i._l(i.navTab,function(t,e){return n("li",{class:t.active,on:{click:function(t){return i.handleNavClick(e)}}},[i._v(i._s(t.txt))])}),0)]),n("router-view")],1)}var a=[];i.d(e,"a",function(){return n}),i.d(e,"b",function(){return a})},670:function(t,e,i){t.exports=i.p+"static/img/u2001.png?23e21117c7e4bef1ac142340ddacf55a"},671:function(t,e,i){"use strict";i.r(e);var n=i(672),a=i.n(n);for(var r in n)"default"!==r&&function(t){i.d(e,t,function(){return n[t]})}(r);e.default=a.a},672:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=c(i(16)),r=function(t){{if(t&&t.__esModule)return t;var e={};if(null!=t)for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e.default=t,e}}(i(1102)),s=i(80),n=c(i(253));function c(t){return t&&t.__esModule?t:{default:t}}e.default={components:{Nav:n.default},data:function(){return{dataList:{},dialogImageUrl:"",dialogVisible:!1,index:"",info:{id:"",src:"",banner:""}}},methods:{previewImg:function(t){var e=t.target.files[0];this.dialogImageUrl=URL.createObjectURL(e)},add:function(){var n=this;return function(t){return function(){var c=t.apply(this,arguments);return new Promise(function(r,s){return function e(t,i){try{var n=c[t](i),a=n.value}catch(t){return void s(t)}if(!n.done)return Promise.resolve(a).then(function(t){e("next",t)},function(t){e("throw",t)});r(a)}("next")})}}(a.default.mark(function t(){var e,i;return a.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(e=n.$refs.banner.files[0],i=n.$loading({text:"正在上传",background:"rgba(0, 0, 0, 0.8)"}),t.prev=2,e)return t.next=7,(0,s.getTask)(e).then(function(t){n.info.banner=t.data.path});t.next=7;break;case 7:setTimeout(function(){i.close()},500),t.next=13;break;case 10:t.prev=10,t.t0=t.catch(2),i.close();case 13:n.dialogVisible=!1,r.save(n.info).then(function(t){n.getList()});case 15:case"end":return t.stop()}},t,n,[[2,10]])}))()},del:function(e,i){var n=this;this.$confirm("你真的要删除吗？").then(function(t){r.del({id:i}),n.dataList.splice(e,1)}).catch(function(t){})},update:function(t){this.dialogVisible=!0,this.index=t,this.info.src=this.dataList[t].src,this.info.banner=this.dataList[t].banner,this.dialogImageUrl=this.dataList[t].img_src,this.info.id=this.dataList[t].id},reset:function(){this.dialogVisible=!0,this.index="",this.info.src="",this.info.banner="",this.dialogImageUrl="",this.info.id=""},up:function(t){var e=this;r.sort({id:this.dataList[t].id,status:"up"}).then(function(t){e.getList(),e.$message.success("上移成功")})},down:function(t){var e=this;r.sort({id:this.dataList[t].id,status:"down"}).then(function(t){e.getList(),e.$message.success("下移成功")})},getList:function(){var e=this;r.getList().then(function(t){e.dataList=t.data})}},created:function(){this.getList()}}},673:function(t,e,i){}}]);