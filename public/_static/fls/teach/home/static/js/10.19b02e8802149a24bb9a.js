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
(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{1032:function(e,t,r){"use strict";var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"page-video c_3_bg c_f"},[e.detail?r("div",{staticClass:"wrap ui-video"},[r("div",{staticClass:"head tc f20"},[r("div",{staticClass:"btns fl"},[r("Tbutton",{attrs:{icon:"arrow-left",type:"b7_plain",size:"small"},nativeOn:{click:function(t){return e.back(t)}}},[e._v("返回课程")])],1),r("div",{staticClass:"text-center"},[r("span",[e._v(e._s(e.currMedia.name))])])]),r("div",{staticClass:"container fix c_5_bg f13 ui-video-container"},[r("VideoList",{on:{sendMsg:e.sendMsg,goVideo:e.goVideo}}),r("div",{ref:"videoWrap",staticClass:"mediaWrap fl c_2_bg tc",class:{hasPadding:1!==e.currMedia.type}},[e.$isVideo(e.currMedia.preview)||e.$isAudio(e.currMedia.preview)?r("div",[r("MyVideo",{ref:"video",attrs:{src:e.currMedia.preview,poster:e.currMedia.img_src,seekTime:e.currMedia.user_time},on:{play:e.playHandler,ended:e.endedHandler,timeupdate:e.timeupdateHandler}})],1):3==e.currMedia.type?r("div",[r("img",{attrs:{src:e.currMedia.preview_path}})]):1==e.currMedia.type?r("div",{staticClass:"reader ib reader-layout"},[r("Reader",{attrs:{params:{book_id:e.currMedia.b_id,product_id:e.detail.publish_id}}})],1):r("div",[r("span",[e._v("错误资源")])]),r("div",{directives:[{name:"show",rawName:"v-show",value:1!==e.currMedia.type,expression:"currMedia.type !== 1"}],staticClass:"name"},[e._v(" 简介: "+e._s(e.currMedia.abs))]),r("div",{directives:[{name:"show",rawName:"v-show",value:e.timeShow,expression:"timeShow"}],staticClass:"timecalculate",class:{black:1===e.currMedia.type}},[e._v(e._s(e._f("formatTime")(e.rest_time)))])])],1),r("div",{staticClass:"other"})]):e._e()])},i=[];r.d(t,"a",function(){return n}),r.d(t,"b",function(){return i})},1036:function(e,t,r){"use strict";var n=function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"div reader-layout"},[t("div",{ref:"root",staticClass:"root"})])},i=[];r.d(t,"a",function(){return n}),r.d(t,"b",function(){return i})},1047:function(e,t,r){"use strict";var n=function(){var e=this.$createElement;this._self._c;return this._m(0)},i=[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"comp-my-video pr"},[t("div",{staticClass:"wrap"},[t("video",{staticClass:"video-js",attrs:{id:"myvideo"}})])])}];r.d(t,"a",function(){return n}),r.d(t,"b",function(){return i})},1052:function(e,t,r){"use strict";var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"comp-study-video-menu-list"},[r("div",{staticClass:"left fl"},[e._m(0),r("div",{staticClass:"ls"},e._l(e.hourList,function(t,n){return t.id===e.allMedia.ids.course_hour_id?r("div",{key:t.id,staticClass:"item"},[r("div",{staticClass:"gp"},e._l(t.teaching_plan,function(n,i){return r("div",{staticClass:"pitem"},[r("div",{staticClass:"gp"},[r("div",{staticClass:"f15",class:{c_og_2:n.checkedVideo}},[e._v("计划"+e._s(i+1)),r("span",{staticClass:"ib f13"},[e._v(e._s(n.name))]),r("span",{staticClass:"f14 fr"},[e._v(e._s(e._f("formatTime")(n.time)))])]),e._l(n.teaching_plan_info,function(i){return r("div",{key:i.id,staticClass:"citem"},[r("div",{staticClass:"gp cp",on:{click:function(r){return e.goVideo(t,n,i)}}},[r("div",{staticClass:"name cp f14 ellipsis",class:{c_theme:i.checkedVideo}},[e._v(e._s(i.name))])])])})],2)])}),0)]):e._e()}),0)])])},i=[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"mtop"},[t("div",{staticClass:"ib active_border active"},[this._v("目录")])])}];r.d(t,"a",function(){return n}),r.d(t,"b",function(){return i})},419:function(e,t,r){"use strict";r.r(t);var n=r(1032),i=r(555);for(var o in i)"default"!==o&&function(e){r.d(t,e,function(){return i[e]})}(o);r(930);var a=r(0),s=Object(a.a)(i.default,n.a,n.b,!1,null,null,null);t.default=s.exports},555:function(e,t,r){"use strict";r.r(t);var n=r(556),i=r.n(n);for(var o in n)"default"!==o&&function(e){r.d(t,e,function(){return n[e]})}(o);t.default=i.a},556:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=l(r(5)),i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},o=l(r(557)),a=r(22),s=l(r(803)),u=l(r(805)),c=l(r(811)),d=l(r(929));function l(e){return e&&e.__esModule?e:{default:e}}function f(e){return function(){var t=e.apply(this,arguments);return new Promise(function(e,r){return function n(i,o){try{var a=t[i](o),s=a.value}catch(e){return void r(e)}if(!a.done)return Promise.resolve(s).then(function(e){n("next",e)},function(e){n("throw",e)});e(s)}("next")})}}t.default={mixins:[d.default],components:{VideoList:s.default,MyVideo:u.default,Reader:c.default},asyncData:function(e){var t=e.store,r=e.route.query.course_id;return t.dispatch("exam/getExamData",{id:r})},mounted:function(){var e=this;return f(n.default.mark(function t(){var r;return n.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,e.isError=!1,t.next=4,e.$store.dispatch("course/getVideoData",e.$route.query);case 4:t.next=12;break;case 6:return t.prev=6,t.t0=t.catch(0),e.isError=!0,e.$message.error("没有课程资源!"),setTimeout(function(){e.$go("/home")},1500),t.abrupt("return");case 12:e.initEvent(),r=e.$route.query,r.course_id,r.course_hour_id,r.course_teaching_id,r.course_teaching_plan_id||setTimeout(function(){e.$replace("/video",i({},e.$route.query,e.allMedia.ids)),e.timeShow=!0},0),e.$nextTick(function(){e.initTimer()});case 16:case"end":return t.stop()}},t,e,[[0,6]])}))()},beforeDestroy:function(){window.removeEventListener("beforeunload",this.browserCloseHandler),window.removeEventListener("load",this.browserReloadHandler)},beforeRouteLeave:function(e,t,r){var i=this;return f(n.default.mark(function e(){return n.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=1,i.clearTimer(),e.next=5,i.sendMsg();case 5:e.next=9;break;case 7:e.prev=7,e.t0=e.catch(1);case 9:r();case 10:case"end":return e.stop()}},e,i,[[1,7]])}))()},beforeRouteUpdate:function(e,t,r){r()},data:function(){return{startTime:Date.now(),timeShow:!1,jumpToNextPlan:null}},computed:i({},(0,a.mapState)({detail:function(e){return e.course.courseVideoDetail},papers:function(e){return e.exam.paperList}}),(0,a.mapGetters)({allMedia:"course/allMedia"}),{currMedia:function(){return this.allMedia.citem},hour:function(){return this.allMedia.pitem.time/60}}),methods:{back:function(){this.$router.go(-1)},changeIndex:function(e){},goVideo:function(e){var t=this,r=e.item,n=e.pitem,i=e.citem;this.clearTimer();var o={course_id:this.$route.query.course_id,course_hour_id:r.id,course_teaching_id:n.id,course_teaching_plan_id:i.id};this.$store.dispatch("course/getVideoDetail",o).then(function(){t.$replace("/video",o),t.startTime=Date.now(),t.initTimer()})},changeRoute:function(e){var t=this;this.clearTimer(),this.$store.dispatch("course/getVideoDetail",e).then(function(){t.$replace("/video",e),t.startTime=Date.now(),t.initTimer()})},sendMsg:function(){var e=this,t=this.getSendData();return t.course_time>=1?this.$service.course.leaveVideoPonit(t).then(function(r){Date.now(),e.allMedia.pitem.user_time=Number(e.allMedia.pitem.user_time)+t.course_time}):Promise.resolve()},getSendData:function(){var e=this.getTime();return i({},this.$route.query,e)},getTime:function(){return{course_time:(Date.now()-this.startTime)/1e3,resources_time:1}},initEvent:function(){window.addEventListener("beforeunload",this.browserCloseHandler),window.addEventListener("load",this.browserReloadHandler)},browserCloseHandler:function(e){this.sendMsg()},browserReloadHandler:function(e){},playHandler:function(e){e.target.player},endedHandler:function(e){this.sendMsg(),this.next()},next:function(){var e=this.allMedia,t=e.itemList,r=e.pitemList,n=e.citemList,i=e.item,o=e.pitem,a=(e.citem,e.mediaIndex),s=(e.ids,t[a.itemIndex+1],r[a.pitemIndex+1],n[a.citemIndex+1]);try{s&&this.goVideo({item:i,pitem:o,citem:s})}catch(e){console.error("下一首计算错误!"),console.error(e)}},timeupdateHandler:function(e){},videoMountedHandler:function(){},goReader:function(){var e=this,t={book_id:this.currMedia.b_id,product_id:this.detail.publish_id};o.default.setItem("access_code",this.currMedia.access_code).then(function(){e.sendMsg(),e.$go("/reader",t)})}},filters:{formatTime:function(e){if(e<=0)return"已学完";var t=Math.floor(e/60),r=parseInt(e%60),n=void 0;return n=t>=1?t+"分钟":"",n+=0!==r?r+"秒":""}}}},558:function(e,t,r){"use strict";r.r(t);var n=r(559),i=r.n(n);for(var o in n)"default"!==o&&function(e){r.d(t,e,function(){return n[e]})}(o);t.default=i.a},559:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},i=r(22);t.default={created:function(){},beforeDestroy:function(){},data:function(){return{courseHour:null}},computed:n({},(0,i.mapGetters)({allMedia:"course/allMedia"}),(0,i.mapState)("course",{detail:function(e){return e.courseVideoDetail},hourList:function(e){return e.courseVideoDetail.course_period_list},study:function(e){return e.study}})),beforeMount:function(){},methods:{back:function(){this.$router.go(-1)},initEvent:function(){window.addEventListener("beforeunload",this.browserCloseHandler),window.addEventListener("load",this.browserReloadHandler)},browserCloseHandler:function(e){},browserReloadHandler:function(e){},goVideo:function(e,t,r){var n=this;this.$emit("sendMsg"),setTimeout(function(){n.$emit("goVideo",{item:e,pitem:t,citem:r})},20)},getPercentage:function(e){var t=e.user_time,r=e.resources_time;return t&&r?100*t/r:0}},filters:{formatTime:function(e){var t=Math.floor(e/60),r=e%60,n=void 0;return n=t>=1?t+"分钟":"",n+=0!==r?r+"秒":""}}}},560:function(e,t,r){},561:function(e,t,r){"use strict";r.r(t);var n=r(562),i=r.n(n);for(var o in n)"default"!==o&&function(e){r.d(t,e,function(){return n[e]})}(o);t.default=i.a},562:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n,i=r(5),o=(n=i)&&n.__esModule?n:{default:n},a=r(124),s=(r(744),r(563));function u(e){return function(){var t=e.apply(this,arguments);return new Promise(function(e,r){return function n(i,o){try{var a=t[i](o),s=a.value}catch(e){return void r(e)}if(!a.done)return Promise.resolve(s).then(function(e){n("next",e)},function(e){n("throw",e)});e(s)}("next")})}}t.default={props:{src:{},poster:{},seekTime:{}},created:function(){},beforeDestroy:function(){this.player.dispose()},mounted:function(){var e=this;return u(o.default.mark(function t(){return o.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,e.addVideoJs();case 3:t.next=8;break;case 5:t.prev=5,t.t0=t.catch(0),console.error("video.js   加载失败");case 8:e.initVideo(),e.initEvent();case 10:case"end":return t.stop()}},t,e,[[0,5]])}))()},watch:{src:function(){var e=this;this.player.src(this.src),setTimeout(function(){e.player.play()},20)}},methods:{next:function(){var e=this;setTimeout(function(){e.player.src(e.src),e.player.play()},20)},getTime:function(){return{course_time:this.player.currentTime().toFixed(2),resources_time:this.player.duration().toFixed(2)}},initVideo:function(){this.player=videojs("myvideo",{muted:!1,controls:!0,loop:!1,preload:"auto",autoplay:!0,poster:this.poster,src:this.src,language:"zh-CN",sources:[{src:this.src}],techOrder:["html5"]})},seek:function(){if(this.seekTime){var e=this.player.duration().toFixed(2);Math.abs(e-this.seekTime)<1.3||this.player.currentTime(this.seekTime)}},initEvent:function(){var e=this,t=this.player;t.on("play",function(t){e.$emit("play",t)}),t.on("pause",function(t){e.$emit("pause",t)}),t.on("ended",function(t){e.$emit("ended",t)}),t.on("timeupdate",function(t){e.$emit("timeupdate",s.error)}),t.on("loadedmetadata",function(t){e.seek()})},addVideoJs:function(){var e=this;return u(o.default.mark(function t(){return o.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!window.videojs){e.next=2;break}return e.abrupt("return");case 2:return e.prev=2,(0,a.addLinks)("https://cdnjs.cloudflare.com/ajax/libs/video.js/7.3.0/video-js.min.css","css"),e.next=6,(0,a.addLinks)("https://cdnjs.cloudflare.com/ajax/libs/video.js/7.3.0/video.js");case 6:return e.next=8,(0,a.addLinks)("https://cdnjs.cloudflare.com/ajax/libs/video.js/7.3.0/lang/zh-CN.js");case 8:e.next=17;break;case 10:return e.prev=10,e.t0=e.catch(2),(0,a.addLinks)("//static/video/video-js.min.css","css"),e.next=15,(0,a.addLinks)("//static/video/video.min.js");case 15:return e.next=17,(0,a.addLinks)("//static/video/zh-CN.js");case 17:case"end":return e.stop()}},t,e,[[2,10]])}))()}}}},564:function(e,t,r){},565:function(e,t,r){"use strict";r.r(t);var n=r(566),i=r.n(n);for(var o in n)"default"!==o&&function(e){r.d(t,e,function(){return n[e]})}(o);t.default=i.a},566:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=f(r(5)),i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},a=f(r(557)),s=r(22),u=l(r(567)),c=l(r(581)),d=l(r(582));function l(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t.default=e,t}function f(e){return e&&e.__esModule?e:{default:e}}function p(e){return function(){var t=e.apply(this,arguments);return new Promise(function(e,r){return function n(i,o){try{var a=t[i](o),s=a.value}catch(e){return void r(e)}if(!a.done)return Promise.resolve(s).then(function(e){n("next",e)},function(e){n("throw",e)});e(s)}("next")})}}t.default={name:"Reader",props:{params:{}},created:function(){this.query=this.params},mounted:function(){var e=this;a.default.getItem("access_code").then(function(t){e.access_code=t,e.init()})},data:function(){return{access_code:"",isNav:!0,query:{},isShowX:!1,infoData:null,preChapterId:0,curChapterId:0}},computed:o({},(0,s.mapState)({})),methods:{init:function(){var e=this;return p(n.default.mark(function t(){var r;return n.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(reader3){t.next=2;break}return t.abrupt("return");case 2:({id:e.query.id,type:3}),null,e.query.range&&JSON.parse(e.query.range).start,!0,void 0,e.query.chapter_root?e.query.chapter_root.split(" ")[1]:null,e.isShowX=!1,(r=new reader3.Desktop({restUrl:"http://xcloud.kf.gli.cn/publish/reader",imagePath:"/res",services:o({},u,{go_back:function(){r.unmount(),r=null,e.$router.go(-1)},request_full_screen:function(){e.isNav=!1},exit_full_screen:function(){e.isNav=!0},show_toast:function(t){e.$message.error(t)},show_confirm:function(t){return e.$confirm(t).then(function(e){return!0}).catch(console.log)},goXknow:function(){},do_share:function(e,t){e.bookId,e.bookName,e.chapterRid,e.chapterName;isWeixin()},action_control:function(t,r){t.type,t.action;var n=!0,i=!1,o=void 0;try{for(var a,s=t[Symbol.iterator]();!(n=(a=s.next()).done);n=!0){var u=a.value,c=u.type;return"read"!=u.action||"chapter"!=c&&"section"!=c||(e.$confirm("您还未购买该章节，前往购买？").then(function(t){if(void 0!==e.$route.query.from){var r={type:"Read",id:e.$route.query.id,inType:"Read"};e.$go("/bookMedia",r)}e.$router.go(-1)}).catch(function(){void 0!==e.$route.query.from&&e.$router.go(-1)}),!1)}}catch(e){i=!0,o=e}finally{try{!n&&s.return&&s.return()}finally{if(i)throw o}}}}),fontSize:{list:[{title:"小",value:"14px"},{title:"中",value:"16px"},{title:"大",value:"18px"},{title:"特大",value:"20px"}],index:0},copyEnabled:!0,fullScreenEnabled:!1,preloadEnabled:!0,goBackEnabled:!0,toolBarActions:[].filter(function(e){return e}),defaultPageLayout:"slide",defaultTextLayout:"lr/auto",readModeList:[{title:"无",pageLayout:"slide",textLayout:"lr/static",scope:"mobile"},{title:"分页",pageLayout:"normal",textLayout:"lr/auto"},{title:"平滑",pageLayout:"slide",textLayout:"lr/auto",scope:"mobile"}]})).emitter.on("updateURL",function(t){if(void 0!=i(t.chapterRid)){var r=decodeURIComponent(e.$route.fullPath),n=void 0,o=void 0;void 0===e.$route.query.chapter_id?(o=t.chapterRid,n=(n=r.replace("index=root","index=root "+o))+"&chapter_id="+o):(o=e.$route.query.chapter_id,n=r.replace(new RegExp("\\b"+o+"\\b","g"),t.chapterRid)),e.preChapterId=o,e.curChapterId=t.chapterRid,e.$router.replace(n)}}),r.extraParams={version:"release",content_version:"release",access_code:e.access_code,product_id:e.query.product_id,user_id:e.$user&&e.$user.id,release_id:e.query.id},setTimeout(function(){r.mount(e.$refs.root,{bookId:e.query.book_id})},30);case 13:case"end":return t.stop()}},t,e)}))()},getUserId:function(){if(sessionStorage.userInfo){var e=JSON.parse(sessionStorage.userInfo);return e&&e.id||""}return""},getThemeBookDetail:function(){var e=this;c.getThemeBookDetail({id:this.query}).then(function(t){return e.all=t.data})},declareOne:function(e,t,r){var n,i;n={event_class:"PDAMBook",event_target:e,event_type:t,event_source:"WEB",event_operator:this.$user&&this.$user.id},i={data:[{res_id:r.id,res_type:r.type_name,res_name:r.books_info.name,res_cover:r.books_info.img_src,res_exp:r.books_info.abs,res_author:r.books_info.author,res_lables:r.books_info.tag,res_attr:r.books_info.attributes,res_money:r.audio_price}]},d.declare(n,i,function(e){})},getAccessCodes:function(e){var t=this;return p(n.default.mark(function r(){return n.default.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:if("theme"!==t.query.from){r.next=4;break}t.access_code=sessionStorage.getItem("access_code"),r.next=7;break;case 4:return r.next=6,c.getAccessCode(e).then(function(e){t.access_code=e.data});case 6:return r.abrupt("return",r.sent);case 7:case"end":return r.stop()}},r,t)}))()},closeNav:function(){this.isNav=!1},openNav:function(){this.isNav=!0},getInfo:function(){return c.info({id:this.query.book_id})}}}},567:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(){return function(e,t){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return function(e,t){var r=[],n=!0,i=!1,o=void 0;try{for(var a,s=e[Symbol.iterator]();!(n=(a=s.next()).done)&&(r.push(a.value),!t||r.length!==t);n=!0);}catch(e){i=!0,o=e}finally{try{!n&&s.return&&s.return()}finally{if(i)throw o}}return r}(e,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e};t.get_book=function(e,t){var r=e.bookId,n=t.extraParams;return(0,u.request_post)(c+"/reader/books",i({book_id:r},n)).then(function(e){var t=e.data;return t})},t.get_catalogs=function(e,t){var r=e.bookId,n=e.chapterId,o=t.extraParams;return(0,u.request_post)(c+"/reader/catalogs",i({book_id:r,catalog_pid:n},o)).then(function(e){var t=e.data;return t})},t.get_chapters=function(e,t){var r=e.bookId,n=e.chapterIds,o=t.extraParams;return(0,u.request_post)(c+"/reader/chapters",i({chapter_id:n,book_id:r},o)).then(function(e){var t=e.data;return t})},t.search=function(e,t){var r=e.keyword,n=e.bookId,o=e.page,a=e.chapterRid,s=t.extraParams;return(0,u.request_post)(c+"/reader/search",i({keyword:r,book_id:n,chapter_id:a,pageStart:o.start,pageOffset:o.offset},s)).then(function(e){var t=e.data,r=e.page;return{list:t,page:r}})},t.get_labels=function(e,t){var r=e.bookId,n=t.extraParams;return(0,u.request_get)("/api/book_notes",{book_id:r,user_id:n.user_id}).then(function(e){var t=e.data;return t})},t.add_label=function(e,t){var r=e.bookId,n=e.chapterRid,o=e.chapterName,a=e.userText,s=e.rangeJSON,c=e.selectedText,d=e.status,l=t.extraParams;return(0,u.request_post)("/api/book_notes",i({book_id:r,chapter_id:n,chapter_name:o,chapter_value:c,comm_text:a,range:s,protected:d},l)).then(function(e){var t=e.data;return t})},t.get_bookmarks=function(e,t){var r=e.bookId,n=t.extraParams;return(0,u.request_get)("/api/book_marks",{book_id:r,user_id:n.user_id}).then(function(e){var t=e.data;return t})},t.add_bookmark=function(e,t){var r=e.bookId,n=e.chapterRid,o=e.chapterName,a=e.rangeJSON,s=e.text,c=t.extraParams;return(0,u.request_post)("/api/book_marks",i({book_id:r,chapter_id:n,chapter_name:o,chapter_value:s,range:a},c)).then(function(e){var t=e.data;return t})},t.remove_bookmarks=function(e,t){d(e,t)},t.remove_labels=function(e,t){d(e,t)},t.modify_label=function(e){return e.range=JSON.stringify(e.range),e.comm_text=e.userText,delete e.userText,(0,u.request_put)("/api/book_notes",i({},e)).then(function(e){return e.data})},t.backup_setting=function(e){return(0,u.request_post)("/api/user_read_setting",{data:JSON.stringify(e)})},t.restore_setting=function(){arguments.length>0&&void 0!==arguments[0]&&arguments[0];return(0,u.request_get)("/api/user_read_setting").then(function(e){var t=e.data,r=s.default.isArray(t)&&t[0]||t;return r?JSON.parse(r):{}})},t.set_progress=function(e,t){var r=e.bookId,n=(e.chapterRid,e.progressJSON),i=e.percentJSON,o=t.extraParams;return(0,u.request_post)("/api/read_record",{data:n,proportion:i,release_id:o.release_id,book_id:r})},t.get_progress=function(e,t){var r=e.bookId,i=t.extraParams;return(0,u.request_get)("/api/read_record",{book_id:r,release_id:i.release_id}).then(function(e){var t=n(e.data,1),r=t[0];return r})};var o,a=r(745),s=(o=a)&&o.__esModule?o:{default:o},u=r(2);var c="publish"=="teach"?"/api":"/common/api";function d(e,t){var r=e.ids,n=t.extraParams;return(0,u.request_post)("/api/book_exegesis/delete",i({id:r},n)).then(function(e){return e.data})}},581:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.info=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,i.request_get)(u(e),e)},t.xList=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,i.request_get)(s(e),e)},t.xInfo=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,i.request_put)(s(e),e)},t.getMedia=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,i.request_get)("/api/books/get_content",e)},t.getCourse=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,i.request_get)(d(e),e)},t.bookComment=function(e){return(0,i.request_post)("/api/home/book_comments",e)},t.getBookComment=function(e){return(0,i.request_get)("/api/home/book_comments",e)},t.bookCommentUp=function(e){return(0,i.request_put)("/api/home/book_comments",e)},t.bookRelate=function(e){return(0,i.request_get)("/api/relation",e)},t.getAccessCode=function(e){return(0,i.request_get)("/api/books/get_access_code",e)},t.getThemeBookDetail=function(e){return(0,i.request_get)(c(e),e)};var n,i=r(2),o=r(6),a=(n=o)&&n.__esModule?n:{default:n};var s=a.default.compile("/api/books/:id/XSearch"),u=a.default.compile("/api/books/:id/home_info"),c=a.default.compile("/api/theme/:id/book_info"),d=a.default.compile("/api/course_ware/:id/home_info")},582:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.declare=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:function(){};if(!window.DBI)return;var n=function(e){var t=e.event_class,r=void 0===t?"":t,n=e.event_data,i=void 0===n?{}:n,o=e.event_target,a=void 0===o?"":o,s=e.event_type,u=void 0===s?"":s,c=e.event_source,d=void 0===c?"WEB":c,l=e.event_sources,f=void 0===l?"":l,p=e.event_operator,v=void 0===p?"":p,_=e.event_temporary,m=void 0===_?"":_,h=e.event_system,b=void 0===h?"":h,g=e.event_system_verison,y=void 0===g?"":g,k=e.event_terminal,x=void 0===k?"":k,w=e.event_terminal_verison,M=void 0===w?"":w;if(!window.DBI)return void console.error("DBI对象不存在");return DBI.createEvent({event_class:r,event_data:i,event_target:a,event_type:u,event_source:d,event_sources:f,event_operator:v,event_temporary:m,event_system:b,event_system_verison:y,event_terminal:x,event_terminal_verison:M})}(e),i=Object.prototype.toString.call(t);"[object Object]"===i?n.addData(t):"[object Array]"===i&&t.forEach(function(e){n.addData(e)});DBI.declare(n,r)}},583:function(e,t,r){},584:function(e,t,r){},803:function(e,t,r){"use strict";r.r(t);var n=r(1052),i=r(558);for(var o in i)"default"!==o&&function(e){r.d(t,e,function(){return i[e]})}(o);r(804);var a=r(0),s=Object(a.a)(i.default,n.a,n.b,!1,null,null,null);t.default=s.exports},804:function(e,t,r){"use strict";var n=r(560);r.n(n).a},805:function(e,t,r){"use strict";r.r(t);var n=r(1047),i=r(561);for(var o in i)"default"!==o&&function(e){r.d(t,e,function(){return i[e]})}(o);r(810);var a=r(0),s=Object(a.a)(i.default,n.a,n.b,!1,null,null,null);t.default=s.exports},810:function(e,t,r){"use strict";var n=r(564);r.n(n).a},811:function(e,t,r){"use strict";r.r(t);var n=r(1036),i=r(565);for(var o in i)"default"!==o&&function(e){r.d(t,e,function(){return i[e]})}(o);r(928);var a=r(0),s=Object(a.a)(i.default,n.a,n.b,!1,null,"38cd631e",null);t.default=s.exports},928:function(e,t,r){"use strict";var n=r(583);r.n(n).a},929:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={data:function(){return{core_timer:null,rest_time:0}},methods:{initTimer:function(){var e=this.allMedia.pitem,t=1e3*(e.time-e.user_time),r=t>0?this.allMedia.pitem.study_time?this.allMedia.pitem.study_time:e.time-e.user_time:0;this.rest_time=parseInt(r),t>0&&!this.core_timer&&this.start()},start:function(){var e=this;this.core_timer=setTimeout(function(){e.allMedia.pitem.study_time=--e.rest_time,0===parseInt(e.rest_time)&&e.sendMsg().then(e.whichDialog),e.rest_time>0&&e.start()},1e3)},whichDialog:function(){var e=this;this.allMedia.pitemList.filter(function(t){return t.id!==e.allMedia.pitem.id}).every(function(e){return e.user_time/e.time>1})?this.showDia():this.getNextPlan()&&this.nextPlanDia()},getNextPlan:function(){var e=this,t=!1,r=null;return this.allMedia.pitemList.forEach(function(n,i){t&&n.user_time/n.time<1&&n.teaching_plan_info.length>0&&(r={pid:n.id,item:n.teaching_plan_info[0]},t=!1),n.id===e.allMedia.pitem.id&&(t=!0)}),r},nextPlanDia:function(){var e=this;this.$UIDialog({message:"将在5s内自动跳转至下一计划...",duration:5e3}).then(function(){e.clearTimer(),e.jumpToNextItem()}).catch(this.clearTimer)},clearTimer:function(){console.warn("clear timer at first"),clearTimeout(this.core_timer),this.core_timer=null},jumpToNextItem:function(){var e=this.getNextPlan(),t=e.pid,r=e.item;this.changeRoute({course_teaching_id:t,course_teaching_plan_id:r.id,course_id:this.$route.query.course_id,course_hour_id:this.$route.query.course_hour_id})},showDia:function(){var e=this,t=this.allMedia.ids.course_hour_id,r=this.papers.filter(function(e){return e.period_id===t});r[0]&&this.$confirm("你已完成该课时，去在线评测测试一下吧",{confirmButtonText:"确定",cancelButtonText:"取消",type:"info"}).then(function(){e.sendMsg().then(function(){e.$go("/course/exam",{id:r[0].course_id,exam_id:r[0].id})})}).catch(console.error)}}}},930:function(e,t,r){"use strict";var n=r(584);r.n(n).a}}]);