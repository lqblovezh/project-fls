/*!
 * {
 *   "buildtime": "2019-07-19 15:01:49",
 *   "workspace": "F:\\project\\x-book4\\js",
 *   "username": "Administrator",
 *   "hostname": "PC201608171616",
 *   "platform": "win32",
 *   "git": {
 *     "branch": "master",
 *     "hash": "b17f442a6",
 *     "message": [
 *       "commit b17f442a62eb78bc9ab78ffe68e3afb76c3e3548",
 *       "Author: YangZai <552396385@qq.com>",
 *       "Date:   Fri Jul 19 14:48:13 2019 +0800",
 *       "    xxxxxx"
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
(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{1030:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=function(e,t){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return function(e,t){var r=[],n=!0,a=!1,o=void 0;try{for(var i,u=e[Symbol.iterator]();!(n=(i=u.next()).done)&&(r.push(i.value),!t||r.length!==t);n=!0);}catch(e){a=!0,o=e}finally{try{!n&&u.return&&u.return()}finally{if(a)throw o}}return r}(e,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")},c=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e};t.get_book=function(e,t){var r=e.bookId,n=t.extraParams;return(0,l.request_post)(u+"/reader/books",c({book_id:r},n)).then(function(e){return e.data})},t.get_catalogs=function(e,t){var r=e.bookId,n=e.chapterId,a=t.extraParams;return(0,l.request_post)(u+"/reader/catalogs",c({book_id:r,catalog_pid:n},a)).then(function(e){return e.data})},t.get_chapters=function(e,t){var r=e.bookId,n=e.chapterIds,a=t.extraParams;return(0,l.request_post)(u+"/reader/chapters",c({chapter_id:n,book_id:r},a)).then(function(e){return e.data})},t.search=function(e,t){var r=e.keyword,n=e.bookId,a=e.page,o=e.chapterRid,i=t.extraParams;return(0,l.request_post)(u+"/reader/search",c({keyword:r,book_id:n,chapter_id:o,pageStart:a.start,pageOffset:a.offset},i)).then(function(e){return{list:e.data,page:e.page}})},t.get_labels=function(e,t){var r=e.bookId,n=t.extraParams;return(0,l.request_get)("/api/book_notes",{book_id:r,user_id:n.user_id}).then(function(e){return e.data})},t.add_label=function(e,t){var r=e.bookId,n=e.chapterRid,a=e.chapterName,o=e.userText,i=e.rangeJSON,u=e.selectedText,s=e.status,d=t.extraParams;return(0,l.request_post)("/api/book_notes",c({book_id:r,chapter_id:n,chapter_name:a,chapter_value:u,comm_text:o,range:i,protected:s},d)).then(function(e){return e.data})},t.get_bookmarks=function(e,t){var r=e.bookId,n=t.extraParams;return(0,l.request_get)("/api/book_marks",{book_id:r,user_id:n.user_id}).then(function(e){return e.data})},t.add_bookmark=function(e,t){var r=e.bookId,n=e.chapterRid,a=e.chapterName,o=e.rangeJSON,i=e.text,u=t.extraParams;return(0,l.request_post)("/api/book_marks",c({book_id:r,chapter_id:n,chapter_name:a,chapter_value:i,range:o},u)).then(function(e){return e.data})},t.remove_bookmarks=function(e,t){s(e,t)},t.remove_labels=function(e,t){s(e,t)},t.modify_label=function(e){return e.range=JSON.stringify(e.range),e.comm_text=e.userText,delete e.userText,(0,l.request_put)("/api/book_notes",c({},e)).then(function(e){return e.data})},t.backup_setting=function(e){return(0,l.request_post)("/api/user_read_setting",{data:JSON.stringify(e)})},t.restore_setting=function(){return(0,l.request_get)("/api/user_read_setting").then(function(e){var t=e.data,r=i.default.isArray(t)&&t[0]||t;return r?JSON.parse(r):{}})},t.set_progress=function(e,t){var r=e.bookId,n=(e.chapterRid,e.progressJSON),a=e.percentJSON,o=t.extraParams;return(0,l.request_post)("/api/read_record",{data:n,proportion:a,release_id:o.release_id,book_id:r})},t.get_progress=function(e,t){var r=e.bookId,n=t.extraParams;return(0,l.request_get)("/api/read_record",{book_id:r,release_id:n.release_id}).then(function(e){return a(e.data,1)[0]})};var n,o=r(1031),i=(n=o)&&n.__esModule?n:{default:n},l=r(7);var u="publish"=="publish"?"/api":"/common/api";function s(e,t){var r=e.ids,n=t.extraParams;return(0,l.request_post)("/api/book_exegesis/delete",c({id:r},n)).then(function(e){return e.data})}},1143:function(e,t,r){"use strict";var n=r(730);r.n(n).a},1392:function(e,t,r){"use strict";function n(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("el-dialog",{staticClass:"restBody",attrs:{center:!1,visible:e.readerDialog,top:"50px",width:"1000px","show-close":!1,"append-to-body":""}},[r("div",{staticClass:"header",attrs:{slot:"title"},slot:"title"},[r("i",{staticClass:"el-icon-close",on:{click:e.colse}}),r("el-tabs",{attrs:{value:"reader"}},[r("el-tab-pane",{attrs:{label:e.title,name:"reader"}})],1)],1),r("div",{ref:"readerIframe",staticClass:"content"},[r("div",{attrs:{id:"readerIframe"}})]),r("div",{staticClass:"footer dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{attrs:{type:"info"},on:{click:e.colse}},[e._v("关闭")])],1)])],1)}var a=[];r.d(t,"a",function(){return n}),r.d(t,"b",function(){return a})},420:function(e,t,r){"use strict";r.r(t);var n=r(1392),a=r(717);for(var o in a)"default"!==o&&function(e){r.d(t,e,function(){return a[e]})}(o);r(1143);var i=r(0),u=Object(i.a)(a.default,n.a,n.b,!1,null,"361bb082",null);t.default=u.exports},432:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(r(5));t.modifyNowledges=function(){var r=this,e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{},t=e.id,n=d(e,["id"]),a=u.default.compile(restUrl_publish+"/api/nowledges/:id");return(0,i.request_put)(a({id:t}),n).then(function(){var t=s(o.default.mark(function e(t){return o.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,p({id:n.pid,type:n.type});case 2:return e.abrupt("return",t);case 3:case"end":return e.stop()}},e,r)}));return function(e){return t.apply(this,arguments)}}())},t.deleteNowledges=function(){var r=this,n=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};return(0,i.request_post)(restUrl_publish+"/api/nowledges/delete",n).then(function(){var t=s(o.default.mark(function e(t){return o.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,p({id:n.pid,type:n.type});case 2:return e.abrupt("return",t);case 3:case"end":return e.stop()}},e,r)}));return function(e){return t.apply(this,arguments)}}())},t.addNowledges=function(){var r=this,n=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};return(0,i.request_post)(restUrl_publish+"/api/nowledges",n).then(function(){var t=s(o.default.mark(function e(t){return o.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,p({id:n.pid,type:n.type});case 2:return e.abrupt("return",t);case 3:case"end":return e.stop()}},e,r)}));return function(e){return t.apply(this,arguments)}}())},t.upNowledges=function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};return(0,i.request_put)(restUrl_publish+"/api/nowledges",e)},t.modifyGroup=function(){var r=this,e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{},t=e.id,n=d(e,["id"]),a=u.default.compile(restUrl_publish+"/api/nowledges/groups/:id");return(0,i.request_put)(a({id:t}),n).then(function(){var t=s(o.default.mark(function e(t){return o.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,p({id:n.pid,type:n.type});case 2:return e.abrupt("return",t);case 3:case"end":return e.stop()}},e,r)}));return function(e){return t.apply(this,arguments)}}())},t.listGroup=function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};return(0,i.request_get)(restUrl_publish+"/api/nowledges/groups",e)},t.deleteGroup=function(){var r=this,n=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};return(0,i.request_post)(restUrl_publish+"/api/nowledges/groups/delete",n).then(function(){var t=s(o.default.mark(function e(t){return o.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,p({id:n.pid,type:n.type});case 2:return e.abrupt("return",t);case 3:case"end":return e.stop()}},e,r)}));return function(e){return t.apply(this,arguments)}}())},t.addGroup=function(){var r=this,n=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};return(0,i.request_post)(restUrl_publish+"/api/nowledges/groups",n).then(function(){var t=s(o.default.mark(function e(t){return o.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,p({id:n.pid,type:n.type});case 2:return e.abrupt("return",t);case 3:case"end":return e.stop()}},e,r)}));return function(e){return t.apply(this,arguments)}}())},t.listNowledges=function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{},t=e.id,r=d(e,["id"]),n=u.default.compile(restUrl_publish+"/api/nowledges/book/:id");return(0,i.request_get)(n({id:t}),r)},t.audioNowledges=a,t.searchNowledges=c,t.videoNowledges=l,t.NowledgesList=function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{},t=e.type,r=d(e,["type"]);{if("章节锚点"==t)return c(r);if("音频锚点"==t)return a(r);if("视频锚点"==t)return l(r)}},t.listKnowledge=function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};return(0,i.request_get)(restUrl_publish+"/api/nowledges",e)},t.addAnchor=function(){var r=this,n=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};return(0,i.request_post)(restUrl_publish+"/api/nowledge_info",n).then(function(){var t=s(o.default.mark(function e(t){return o.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,p({id:n.pid,type:n.ptype});case 2:return e.abrupt("return",t);case 3:case"end":return e.stop()}},e,r)}));return function(e){return t.apply(this,arguments)}}())},t.delAnchor=function(){var r=this,n=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};return(0,i.request_post)(restUrl_publish+"/api/nowledge_info/delete",n).then(function(){var t=s(o.default.mark(function e(t){return o.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,p({id:n.pid,type:n.type});case 2:return e.abrupt("return",t);case 3:case"end":return e.stop()}},e,r)}));return function(e){return t.apply(this,arguments)}}())},t.mount=function(){var a=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};return(0,i.request_post)(restUrl_publish+"/api/nowledge_info/mount",a).then(function(e){var t=JSON.parse(window.localStorage.getItem("mounts"))||[],r=t.findIndex(function(e){return e.tid===a.id}),n={tid:a.id,id:e.data.id};-1<r&&t.splice(r,1),t.push(n),window.localStorage.setItem("mounts",JSON.stringify(t))})},t.nowledge_info=function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};return(0,i.request_get)(restUrl_publish+"/api/nowledge_info",e)},t.mountSchedule=function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{},t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:function(){},r=e.id,n=(d(e,["id"]),(JSON.parse(window.localStorage.getItem("mounts"))||[]).find(function(e){return e.tid===r}));if(!n)return"";var a=u.default.compile(restUrl_publish+"/api/nowledge_info/:id");return(0,i.request_progress)(a({id:n.id}),t)},t.nowledge_btn=function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};return(0,i.request_get)(restUrl_publish+"/api/nowledge_button",e)};var i=r(7),u=n(r(9));function n(e){return e&&e.__esModule?e:{default:e}}function s(e){return function(){var u=e.apply(this,arguments);return new Promise(function(o,i){return function t(e,r){try{var n=u[e](r),a=n.value}catch(e){return void i(e)}if(!n.done)return Promise.resolve(a).then(function(e){t("next",e)},function(e){t("throw",e)});o(a)}("next")})}}function d(e,t){var r={};for(var n in e)0<=t.indexOf(n)||Object.prototype.hasOwnProperty.call(e,n)&&(r[n]=e[n]);return r}function a(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{},t=e.id,r=d(e,["id"]),n=u.default.compile(restUrl_publish+"/api/nowledges/audio/:id");return(0,i.request_get)(n({id:t}),r)}function c(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{},t=e.id,r=d(e,["id"]),n=u.default.compile(restUrl_publish+"/api/nowledges/book/catalogs/:id");return(0,i.request_get)(n({id:t}),r)}function l(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{},t=e.id,r=d(e,["id"]),n=u.default.compile(restUrl_publish+"/api/nowledges/video/:id");return(0,i.request_get)(n({id:t}),r)}function p(e){var t=e.id,r=e.type,n=u.default.compile(restUrl_publish+"/api/nowledge_status/:id");return(0,i.request_get)(n({id:t}),{type:r})}},717:function(e,t,r){"use strict";r.r(t);var n=r(718),a=r.n(n);for(var o in n)"default"!==o&&function(e){r.d(t,e,function(){return n[e]})}(o);t.default=a.a},718:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},a=function(e){{if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t.default=e,t}}(r(1030)),s=r(432);t.default={props:{readerDialog:{type:Boolean,default:!1},title:{type:String,default:"阅读器"},readerId:{type:String,default:""},currId:{type:String,default:""},version:{type:String,default:"production"},markBtn:{type:String,default:""},detailData:Object},data:function(){return{}},created:function(){var t=this;this.$nextTick(function(){var e=new reader3.Desktop({markBtnText:t.markBtn,copyEnabled:!1,services:n({},a,{do_mark:t.do_mark}),labelEnabled:!1,bookmarkEnabled:!1,readModeList:[{title:"无",pageLayout:"normal",textLayout:"lr/static"},{title:"分页",pageLayout:"normal",textLayout:"lr/auto"}]});e.extraParams={version:t.version,content_version:t.version,access_code:t.access_code},e.mount(document.getElementById("readerIframe"),{bookId:t.readerId})})},methods:{colse:function(){this.$emit("update:readerDialog",!1)},do_mark:function(e){var n=this,t=e.bookId,r=e.rangeJSON,a=e.selectedText,o=e.chapterRid,i=e.chapterName,u=void 0===i?"":i;(0,s.addAnchor)({name:[u],range:r,point:a,n_id:this.currId,b_id:[o],c_id:[t],type:"内容锚点",pid:this.detailData.id,ptype:this.detailData.type_number}).then(function(e){n.$emit("addAnchorSuccess")}).catch(function(e){var t=e.payload;for(var r in t.messages){n.$message.error(t.messages[r]);break}})}}}},730:function(e,t,r){}}]);