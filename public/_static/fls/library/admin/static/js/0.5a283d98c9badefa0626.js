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
(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{306:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.circleMixin=t.publicMixin=t.main=void 0;var i=p(r(16)),s=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var i in r)Object.prototype.hasOwnProperty.call(r,i)&&(e[i]=r[i])}return e},n=p(r(277)),o=r(50),u=function(e){{if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t.default=e,t}}(r(950)),a=r(83),c=r(951);function p(e){return e&&e.__esModule?e:{default:e}}function d(e){return function(){var s=e.apply(this,arguments);return new Promise(function(o,u){return function t(e,r){try{var i=s[e](r),n=i.value}catch(e){return void u(e)}if(!i.done)return Promise.resolve(n).then(function(e){t("next",e)},function(e){t("throw",e)});o(n)}("next")})}}var l={created:function(){var t=this;return d(i.default.mark(function e(){return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:t.init();case 1:case"end":return e.stop()}},e,t)}))()},beforeRouteUpdate:function(e,t,r){this.currGroup=e.query.id,this.getList(1,10),this.$unCheck(),r()},data:function(){return{currGroup:"",upShelfDiaolog:!1,currentShelf:null}},methods:{init:function(){var t=this;return d(i.default.mark(function e(){return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:t.getGroupList(),t.getList();case 2:case"end":return e.stop()}},e,t)}))()},opneDetailDialog:function(t,e){var r=this;if(!e)return this.detailData={},this.detailDialoaType=t,void(this.detailVisible=!0);this.services.detail({id:e}).then(function(e){r.detailData=e.data,11==(r.detailDialoaType=t)&&(r.detailType=e.data.components.type.toString()),r.detailVisible=!0})},query:function(){var e=(0,n.default)(document.querySelector("#mainForm"),{hash:!0});this.getList(1,this.page.offset,e)},getList:function(e,t,r){var i=0<arguments.length&&void 0!==e?e:this.page&&this.page.num||1,n=this,o=1<arguments.length&&void 0!==t?t:this.page&&this.page.offset||10,u=2<arguments.length&&void 0!==r?r:{};u.group_id=this.currGroup,this.services.getList(s({pageNum:i,pageOffset:o},u)).then(function(e){n.setList(e.data),n.setPage(e.page)})},getGroupList:function(){var t=this;return this.services.groupList&&this.services.groupList().then(function(e){"function"==typeof t.setGroupList&&t.setGroupList(e.data)})},groupChange:function(e){this.$router.push({path:this.$route.path,query:{id:e}})},addGroup:function(e){var t=this;this.services.group((0,n.default)(e,{hash:!0})).then(function(e){t.getGroupList()}).catch(function(e){t.$message.error(e)})},updateGroup:function(e){var t=this;this.services.group((0,n.default)(e,{hash:!0})).then(function(e){t.getGroupList()})},delGroup:function(t){var r=this;log("删除分组",t),this.services.groupDel({id:t}).then(function(e){t===r.currGroup&&r.$router.push({path:r.$route.path,query:{id:"non"}}),r.getGroupList()})},handleSizeChange:function(e){this.$unCheck(),void 0!==this.getList&&(this.page.num=1,this.getList(1,e))},handleCurrentChange:function(e){if(this.$unCheck(),e!==this.page.nun){var t=(0,n.default)(document.querySelector("#mainForm"),{hash:!0});void 0!==this.getList&&this.getList(e,this.page.offset,t)}},moveToOther:function(e){var t=this.$getChecked();t?(this.moveIds=t,this.moveToOtherDiaolog=!0):this.$message.error("请先选中")},detailBack:function(e){this.detailDialog=!1,this.getGroupList(),this.query()},moveToSubmit:function(e){var t=this;this.moveIds&&this.services.groupMove({old_group_id:this.currGroup,new_group_id:e,rel_id:this.moveIds,id:this.moveIds}).then(function(e){t.moveToOtherDiaolog=!1,t.getList(),t.getGroupList()})},showUpShelf:function(t,e){var r=this;(t||this.$getChecked({data:this.list,name:"set",value:"0",error:"请设置价格后再上架!"}))&&this.services.getClass({rel_id:t.product_id,type:e}).then(function(e){r.columnList=e.data,r.currentShelf=t,r.upShelfDiaolog=!0})},upShelf:function(e){var r=this,t=[];if(e)t.push(e);else if(!(t=this.$getChecked({data:this.list,name:"set",value:"0",error:"请设置价格后再上架!"})))return;this.services.put({id:t}).then(function(e){r.upShelfDiaolog=!1,r.getList(),r.declare&&r.declare(t,"上架")}).catch(function(e){var t=e.payload;r.$message.error(t.messages)})},downShelf:function(e){var i=this,t=[];if(e)t.push(e);else if(!(t=this.$getChecked({data:this.list,name:"status",value:"0",error:"未上架的不能下架"})))return;this.services.pull({id:t}).then(function(e){i.getList(),i.declare&&i.declare(t,"下架")}).catch(function(e){var t=e.payload;for(var r in t.messages){i.$message.error(t.messages[r]);break}})},declare:function(e,r){var i=this;if(Array.isArray(e))e.forEach(function(e){var t=i.getDetailById(e);t&&i.declareOne(e,r,t)});else{var t=this.getDetailById(e);t&&this.declareOne(e,r,t)}},declareOne:function(e,t,r){var i,n,o="";try{o=(0,a.getUserInfo)().id}catch(e){console.error("JSON.parse(sessionStorage.userInfo)获取错误")}i={event_class:"PDAMBook",event_target:e,event_type:t,event_source:"WEB",event_operator:o},n={data:[{res_id:r.id,res_type:r.type_name,res_name:r.books_info.name,res_cover:r.books_info.img_src,res_exp:r.books_info.abs,res_author:r.books_info.author,res_lables:r.books_info.tag,res_attr:r.books_info.attributes,res_money:r.audio_price}]},u.declare(i,n,function(e){})},getDetailById:function(t){return this.list.find(function(e){return e.id===t})},delChoosen:function(e){var i=this,t=[];if(e)t.push(e);else if(!(t=this.$getChecked()))return;this.$confirm("是否删除？").then(function(e){i.services.del({id:t}).then(function(e){i.getList(),i.getGroupList()}).catch(function(e){var t=e.payload;for(var r in t.messages){i.$message.error(t.messages[r]);break}})}).catch(function(e){})},versionChage:function(e,r){var i=this;(0,c.setVersion)({id:e.target.value,type:r.type}).then(function(e){i.$message.success("切换版本成功!");var t=i.list.findIndex(function(e){return e.id===r.id});i.$set(i.list,t,e.data)}).catch(function(e){var t=e.payload;for(var r in t.messages){i.$message.error(t.messages[r]);break}})},putSet:function(e){var n=this;this.services.putInfo({id:e}).then(function(e){var t=!1,r=e.data.prices;for(var i in r)if(r[i]&&r[i].chapters&&0<r[i].chapters.length){t=!0;break}if(!t)return n.$message.error("该书没有内容,请重新发布!");n.putDetailData=e.data,n.pustSetDialog=!0})},pustChange:function(e,t){this.putSet(e.target.value)},close:function(){this.pustSetDialog=!1},save:function(){this.pustSetDialog=!1,this.getList()}}},f={created:function(){var t=this;return d(i.default.mark(function e(){return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.getList();case 2:case"end":return e.stop()}},e,t)}))()},data:function(){return{query:null,type:{value:""}}},methods:{handleNavClick:function(e){this.$router.push({path:"/wms/"+this.path+"/"+e.name})},seareHandeler:function(){this.query=(0,n.default)(document.querySelector("#mainForm"),{hash:!0}),this.getList(1,10,this.query)},handleSizeChange:function(e){this.page.num=1,this.getList(1,e,this.query)},handleCurrentChange:function(e){e!==this.page.nun&&this.getList(e,this.page.offset,this.query)},selcetAll:function(t){Array.from(document.querySelectorAll("[name='ids']")).forEach(function(e){e.checked=t.target.checked})},handleClose:function(){this.$refs.detailDialog.resetFields(),this.detailVisible=!1},educe:function(){var e=this.$getChecked({isShowMessage:!1}),t=(0,n.default)(document.querySelector("#mainForm"),{hash:!0});this.services.educe(s({id:e},t)).then(function(e){window.location.href=e.data.url})}}},h={data:function(){return{page:null,detailImgDialog:!1,previewDate:[]}},computed:s({},(0,o.mapState)({list:function(e){return e.circle.list}})),methods:{getList:function(e,t,r){var i=0<arguments.length&&void 0!==e?e:this.page&&this.page.num||1,n=this,o=1<arguments.length&&void 0!==t?t:this.page&&this.page.offset||10,u=2<arguments.length&&void 0!==r?r:{};this.services.getList(s({pageNum:i,pageOffset:o,id:this.$route.query.id},u,{status:this.type.value})).then(function(e){n.$store.state.circle.list=e.data,n.page=e.page})},del:function(e){var i=this,t=[];if(e)t.push(e);else if(!(t=this.$getChecked()))return this.$message.error("错误");this.$confirm("是否删除？").then(function(e){log(i.services),i.services.del({id:t}).then(function(e){i.getList()}).catch(function(e){var t=e.payload;for(var r in t.messages){i.$message.error(t.messages[r]);break}})}).catch(function(e){})},modify:function(e,t){var r=this,i=1<arguments.length&&void 0!==t?t:[];i.length||(i=this.$getChecked()),i.length&&this.services.modify({status:e,id:i,user_book_circle_id:this.$route.query.pid}).then(function(e){r.$message.success("修改成功！"),r.getList()})},enclosure:function(e){this.previewDate=e.img_src,this.detailImgDialog=!0}}};t.main=l,t.publicMixin=f,t.circleMixin=h},950:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.declare=function(e){var t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{},r=2<arguments.length&&void 0!==arguments[2]?arguments[2]:function(){};if(!window.DBI)return;var i=function(e){var t=e.event_class,r=void 0===t?"":t,i=e.event_data,n=void 0===i?{}:i,o=e.event_target,u=void 0===o?"":o,s=e.event_type,a=void 0===s?"":s,c=e.event_source,p=void 0===c?"WEB":c,d=e.event_sources,l=void 0===d?"":d,f=e.event_operator,h=void 0===f?"":f,v=e.event_temporary,g=void 0===v?"":v,_=e.event_system,m=void 0===_?"":_,y=e.event_system_verison,b=void 0===y?"":y,q=e.event_terminal,k=void 0===q?"":q,w=e.event_terminal_verison,L=void 0===w?"":w;return window.DBI?DBI.createEvent({event_class:r,event_data:n,event_target:u,event_type:a,event_source:p,event_sources:l,event_operator:h,event_temporary:g,event_system:m,event_system_verison:b,event_terminal:k,event_terminal_verison:L}):void console.error("DBI对象不存在")}(e),n=Object.prototype.toString.call(t);"[object Object]"===n?i.addData(t):"[object Array]"===n&&t.forEach(function(e){i.addData(e)});DBI.declare(i,r)}},951:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.setVersion=function(e){return(0,i.request_put)("/api/course_ware/set_versions",e)},t.getMainList=function(e){var t=e.type,r=function(e,t){var r={};for(var i in e)0<=t.indexOf(i)||Object.prototype.hasOwnProperty.call(e,i)&&(r[i]=e[i]);return r}(e,["type"]);switch(t){case"book":return(0,n.getList)(r);case"theme":return(0,o.getList)(r);case"audio":return(0,u.getList)(r);case"video":return(0,s.getList)(r);case"course":default:return(0,a.getList)(r)}};var i=r(15),n=r(952),o=r(953),u=r(954),s=r(955),a=r(956)},952:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.getList=function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};return(0,n.request_get)("/api/books",e)},t.detail=function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};return(0,n.request_get)(p(e),e)},t.del=function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};return(0,n.request_post)("/api/books/delete",e)},t.put=function(e){return(0,n.request_put)("/api/books/put",e)},t.pull=function(e){return(0,n.request_put)("/api/books/pull",e)},t.groupList=function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};return(0,n.request_get)("/api/books/groups",e)},t.group=function(e){var t=e.id,r=s(e,["id"]);if(t)return(0,n.request_put)(c({id:t}),r);return(0,n.request_post)("/api/books/groups",r)},t.groupDel=function(e){return(0,n.request_delete)(a(e),e)},t.groupMove=function(e){return(0,n.request_put)("/api/groups/books",e)},t.putInfo=function(e){return(0,n.request_get)(d(e),e)},t.putSave=function(e){return(0,n.request_put)("/api/books/save_data",e)},t.computePrice=function(e){return(0,n.request_put)("/api/books/compute_price",e)},t.preview=function(e){var t=e.type,r=s(e,["type"]);switch(t){case 16:case 1:r.type="book";break;case 3:r.type="picture";break;case 4:r.type="audio";break;case 5:r.type="video";break;case 14:r.type="resource"}return(0,n.request_get)("/api/books/preview",r)};var i,n=r(15),o=r(22),u=(i=o)&&i.__esModule?i:{default:i};function s(e,t){var r={};for(var i in e)0<=t.indexOf(i)||Object.prototype.hasOwnProperty.call(e,i)&&(r[i]=e[i]);return r}var a=u.default.compile("/api/books/groups/:id"),c=u.default.compile("/api/books/:id/groups"),p=u.default.compile("/api/books/:id"),d=u.default.compile("/api/books/setting_info/:id")},953:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.getList=function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};return(0,n.request_get)("/api/theme",e)},t.detail=function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};return(0,n.request_get)(c(e),e).then(function(e){return e.data.books_info.components.forEach(function(e){var t=e,r=t.content,i=t.id;(e=Object.assign(e,r)).id=i}),e})},t.del=function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};return(0,n.request_post)("/api/theme/delete",e)},t.put=function(e){return(0,n.request_put)("/api/theme/put",e)},t.pull=function(e){return(0,n.request_put)("/api/theme/pull",e)},t.groupList=function(){return(0,n.request_get)("/api/theme/groups")},t.group=function(e){var t=e.id,r=function(e,t){var r={};for(var i in e)0<=t.indexOf(i)||Object.prototype.hasOwnProperty.call(e,i)&&(r[i]=e[i]);return r}(e,["id"]);if(t)return(0,n.request_put)(a({id:t}),r);return(0,n.request_post)("/api/theme/groups",r)},t.groupDel=function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};return(0,n.request_delete)(s(e),e)},t.groupMove=function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};return(0,n.request_put)("/api/groups/theme",e)},t.putSave=function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};return(0,n.request_put)("/api/theme/set_price",e)},t.preview=function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};return(0,n.request_get)("/api/theme/preview",e)};var i,n=r(15),o=r(22),u=(i=o)&&i.__esModule?i:{default:i};var s=u.default.compile("/api/theme/groups/:id"),a=u.default.compile("/api/theme/:id/groups"),c=u.default.compile("/api/theme/:id");u.default.compile("/api/theme/setting_info/:id")},954:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.getList=function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};return(0,n.request_get)("/api/audio_product",e)},t.detail=function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};return(0,n.request_get)(p(e),e)},t.del=function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};return(0,n.request_post)("/api/books/delete",e)},t.put=function(e){return(0,n.request_put)("/api/audio_product/put",e)},t.pull=function(e){return(0,n.request_put)("/api/audio_product/pull",e)},t.groupList=function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};return(0,n.request_get)("/api/audio_product/groups",e)},t.group=function(e){var t=e.id,r=s(e,["id"]);if(t)return(0,n.request_put)(c({id:t}),r);return(0,n.request_post)("/api/audio_product/groups",r)},t.groupDel=function(e){return(0,n.request_delete)(a(e),e)},t.groupMove=function(e){return(0,n.request_put)("/api/groups/audio_product",e)},t.putInfo=function(e){return(0,n.request_get)(d(e),e)},t.putSave=function(e){return(0,n.request_put)("/api/books/save_data",e)},t.computePrice=function(e){return(0,n.request_put)("/api/books/compute_price",e)},t.preview=function(e){var t=e.type,r=s(e,["type"]);switch(t){case 16:r.type="book";break;case 3:r.type="picture";break;case 4:r.type="audio";break;case 5:r.type="video"}return(0,n.request_get)("/api/books/preview",r)};var i,n=r(15),o=r(22),u=(i=o)&&i.__esModule?i:{default:i};function s(e,t){var r={};for(var i in e)0<=t.indexOf(i)||Object.prototype.hasOwnProperty.call(e,i)&&(r[i]=e[i]);return r}var a=u.default.compile("/api/audio_product/groups/:id"),c=u.default.compile("/api/audio_product/:id/groups"),p=u.default.compile("/api/audio_product/:id"),d=u.default.compile("/api/books/setting_info/:id")},955:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.getList=function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};return(0,n.request_get)("/api/video_product",e)},t.detail=function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};return(0,n.request_get)(p(e),e)},t.del=function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};return(0,n.request_post)("/api/books/delete",e)},t.put=function(e){return(0,n.request_put)("/api/video_product/put",e)},t.pull=function(e){return(0,n.request_put)("/api/video_product/pull",e)},t.groupList=function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};return(0,n.request_get)("/api/video_product/groups",e)},t.group=function(e){var t=e.id,r=s(e,["id"]);if(t)return(0,n.request_put)(c({id:t}),r);return(0,n.request_post)("/api/video_product/groups",r)},t.groupDel=function(e){return(0,n.request_delete)(a(e),e)},t.groupMove=function(e){return(0,n.request_put)("/api/groups/video_product",e)},t.putInfo=function(e){return(0,n.request_get)(d(e),e)},t.putSave=function(e){return(0,n.request_put)("/api/books/save_data",e)},t.computePrice=function(e){return(0,n.request_put)("/api/books/compute_price",e)},t.preview=function(e){var t=e.type,r=s(e,["type"]);switch(t){case 16:r.type="book";break;case 3:r.type="picture";break;case 4:r.type="audio";break;case 5:r.type="video"}return(0,n.request_get)("/api/books/preview",r)};var i,n=r(15),o=r(22),u=(i=o)&&i.__esModule?i:{default:i};function s(e,t){var r={};for(var i in e)0<=t.indexOf(i)||Object.prototype.hasOwnProperty.call(e,i)&&(r[i]=e[i]);return r}var a=u.default.compile("/api/video_product/groups/:id"),c=u.default.compile("/api/video_product/:id/groups"),p=u.default.compile("/api/video_product/:id"),d=u.default.compile("/api/books/setting_info/:id")},956:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.getList=function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};return(0,n.request_get)("/api/course_ware",e)},t.detail=function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};return(0,n.request_get)(c(e),e)},t.del=function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};return(0,n.request_post)("/api/theme/delete",e)},t.putInfo=d,t.put=function(e){return(0,n.request_put)("/api/theme/put",e)},t.pull=function(e){return(0,n.request_put)("/api/theme/pull",e)},t.groupList=function(){return(0,n.request_get)("/api/course_ware/groups")},t.group=function(e){var t=e.id,r=function(e,t){var r={};for(var i in e)0<=t.indexOf(i)||Object.prototype.hasOwnProperty.call(e,i)&&(r[i]=e[i]);return r}(e,["id"]);if(t)return(0,n.request_put)(a({id:t}),r);return(0,n.request_post)("/api/course_ware/groups",r)},t.groupDel=function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};return(0,n.request_delete)(s(e),e)},t.groupMove=function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};return(0,n.request_put)("/api/groups/course_ware",e)},t.putSave=function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};return(0,n.request_post)("/api/course_ware/save_price",e)},t.preview=function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};return(0,n.request_get)("/api/theme/preview",e)},t.courseSetInfo=function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};return(0,n.request_get)(p(e))};var i,n=r(15),o=r(22),u=(i=o)&&i.__esModule?i:{default:i};var s=u.default.compile("/api/course_ware/groups/:id"),a=u.default.compile("/api/course_ware/:id/groups"),c=u.default.compile("/api/theme/:id"),p=u.default.compile("/api/course_ware/:id/setting"),d=u.default.compile("/api/books/setting_info/:id");function d(e){return(0,n.request_get)(d(e),e)}}}]);