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
(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{1429:function(t,e,n){"use strict";function s(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"div"},[e("Top",{attrs:{currentPlant:"X-TECH"}}),e("Menu"),e("div",{staticClass:"content",attrs:{id:"content"}},[e("router-view")],1)],1)}var i=[];n.d(e,"a",function(){return s}),n.d(e,"b",function(){return i})},1449:function(t,e,n){"use strict";function s(){var t=this,e=t.$createElement,n=t._self._c||e;return t.nav?n("div",{staticClass:"menu",class:{collLeft:t.isCollapse}},[n("gli-menu",{attrs:{menuRecreate:!1,topPx:"50px",keepOneOpen:!0,"default-active":t.$route.path,router:!0,collapse:t.isCollapse,"background-color":"#333744","text-color":"#fff","active-text-color":"#44c3aa"},on:{itemClickHandler:t.menuItemClickHandler,foldHandler:t.menuFoldHandler}},[n("GliMenuTop",{attrs:{txt:"产品管理"}},[t.getAuthority("/wms/article")?n("GliMenuItem",{attrs:{iconClass:"icon-wms_mediaBook",txt:"文章产品",index:"/wms/article"}}):t._e(),t.getAuthority("/wms/seriesProduct")?n("GliMenuItem",{attrs:{iconClass:"icon-wms_theme",txt:"套系产品",index:"/wms/seriesProduct"}}):t._e()],1),n("GliMenuTop",{attrs:{txt:"前台设置"}},[t.getAuthority("/wms/indexSettings")?n("GliMenuItem",{attrs:{iconClass:"icon-wms_indexSettings",txt:"首页设置",index:"/wms/indexSettings"}}):t._e(),t.getAuthority("/wms/findSetting")?n("GliMenuItem",{attrs:{iconClass:"icon-wms_theme",txt:"发现设置",index:"/wms/findSetting"}}):t._e(),t.getAuthority("/wms/typeSetting")?n("GliMenuItem",{attrs:{iconClass:"icon-wms_theme",txt:"分类设置",index:"/wms/typeSetting"}}):t._e()],1),n("GliMenuTop",{attrs:{txt:"用户管理"}},[t.getAuthority("/wms/memberlist")?n("GliMenuItem",{attrs:{iconClass:"icon-wms_memberlist",txt:"会员列表",index:"/wms/memberlist"}}):t._e(),t.getAuthority("/wms/memberfb")?n("GliMenuItem",{attrs:{iconClass:"icon-userMsg",txt:"会员反馈",index:"/wms/memberfb"}}):t._e()],1),t.$config.isTeacher?n("GliMenuTop",{attrs:{txt:"订单管理"}},[t.getAuthority("/wms/orderManage")?n("GliMenuItem",{attrs:{iconClass:"icon-wms_orderManage",txt:"订单查询",index:"/wms/orderManage"}}):t._e()],1):t._e(),t.getAuthority("/wms/bookManage")?n("GliMenuTop",{attrs:{txt:"书圈管理",index:"/wms/bookManage"}},[t.getAuthority("/wms/bookManage")?n("GliMenuItem",{staticStyle:{display:"none"},attrs:{iconClass:"icon-wms_product",txt:"书圈管理",index:"/wms/bookManage"}}):t._e()],1):t._e(),n("GliMenuTop",{attrs:{txt:"统计分析"}},[t.getAuthority("/wms/scaleInfo")?n("GliMenuItem",{attrs:{iconClass:"icon-wms_total",txt:"销售业绩",index:"/wms/scaleInfo"}}):t._e(),t.getAuthority("/wms/statistics")?n("GliMenuItem",{attrs:{iconClass:"icon-wms_mediaBook",txt:"产品数据报表",index:"/wms/statistics"}}):t._e()],1)],1)],1):t._e()}var i=[];n.d(e,"a",function(){return s}),n.d(e,"b",function(){return i})},1453:function(t,e,n){"use strict";function s(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"div"},[n("SwitchSys",{attrs:{currentPlant:t.currentPlant}})],1)}var i=[];n.d(e,"a",function(){return s}),n.d(e,"b",function(){return i})},1457:function(t,e,n){"use strict";function s(){var t,e=this,n=e.$createElement,s=e._self._c||n;return s("div",{staticClass:"menu-main"},[s("div",{staticClass:"title-item",on:{mouseleave:function(t){e.currTip=!1},mouseenter:function(t){e.currTip=!0},click:e.open}},[s("div",{directives:[{name:"show",rawName:"v-show",value:!e.rootMenu.isFold&&e.currTip,expression:"!rootMenu.isFold && currTip"}],staticClass:"rightTip",style:{marginTop:-e.rootMenu.scrollTop+"px"}},[s("div",[s("span",{staticClass:"tiptxt"},[e._v("\n          "+e._s(e.txt)+"\n        ")])])]),e._v(" "),s("div",{staticClass:"submenu__title",class:{isOpen:e.isOpen}},[s("span",{ref:"icon2",staticClass:"icon2",class:(t={isOpen:e.isOpen},t[e.rootMenu.arrowClass]=!0,t)}),e._v(" "),s("span",{staticClass:"name",class:e.rootMenu.isFold?"":"hide"},[e._v(e._s(e.txt))])])]),e._v(" "),s("div",{staticClass:"subs",class:e.isOpen?"open":"close"},[e._t("default")],2)])}var i=[];n.d(e,"a",function(){return s}),n.d(e,"b",function(){return i})},1458:function(t,e,n){"use strict";function s(){var n=this,t=n.$createElement,s=n._self._c||t;return s("div",{staticClass:"div"},[s("div",{staticClass:"alltop",class:{showMoreTop:n.showMoreTop},on:{mouseleave:function(t){n.showMoreTop=!1}}},[s("ul",{staticClass:"otherTop"},[s("li",{class:{active:n.isBase},on:{click:function(t){return n.goPage("/common/admin")}}},[n._m(0)]),n._l(n.outlink,function(e){return s("li",{class:{active:e.is_current},on:{click:function(t){return n.goPage(e)}}},[s("div",{staticClass:"content"},[s("p",{staticClass:"title"},[n._v(n._s(e.title))]),s("p",{staticClass:"name"},[n._v(n._s(e.name))])])])})],2),s("header",{staticClass:"header"},[s("div",{staticClass:"left",domProps:{textContent:n._s(n.left)},on:{click:n.showMore}}),n.plantInfo&&!n.isXDataVisible?s("div",{staticClass:"content"},[n._v("（"+n._s(n.plantInfo.name)+"）")]):n._e(),n.userInfo?s("div",{staticClass:"right"},["system"!=n.type?s("el-dropdown",{on:{command:n.handleCommand}},[s("span",{staticClass:"el-dropdown-link"},[n._v("平台切换"),s("i",{staticClass:"el-icon-arrow-down el-icon--right"})]),s("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},n._l(n.userInfo.publishers,function(t){return s("el-dropdown-item",{key:t.id,attrs:{command:t.base_url,disabled:n.publisher.id==t.id}},[n._v(n._s(t.name))])}),1)],1):n._e(),s("span",{staticClass:"user"},[n._v(n._s(n.userName))]),s("span",{staticClass:"logoutBtn",on:{click:n.logout}},[n._v("退出登录")]),s("span",{staticClass:"logoutBtn",on:{click:n.changePass}},[n._v("修改密码")]),s("span",{staticClass:"logoutBtn",on:{click:n.backHome}},[n._v("返回首页")]),s("el-dialog",{attrs:{visible:n.loginDialog,width:"420px","close-on-click-modal":!1,"lock-scroll":!1,"before-close":n.handleClose,"append-to-body":!0},on:{"update:visible":function(t){n.loginDialog=t}}},[s("div",{staticClass:"top",attrs:{slot:"title"},slot:"title"},[s("el-tabs",{attrs:{value:"pass"}},[s("el-tab-pane",{attrs:{label:"修改密码",name:"pass"}})],1)],1),s("form",{ref:"passForm",staticClass:"passContent"},[s("div",{staticClass:"group"},[s("div",{staticClass:"label"},[n._v("旧密码:")]),s("input",{staticClass:"form-control",attrs:{name:"old_pass",type:"password"},domProps:{value:n.passData.old_pass}})]),s("div",{staticClass:"group"},[s("div",{staticClass:"label"},[n._v("新密码:")]),s("input",{staticClass:"form-control",attrs:{name:"new_pass",type:"password"},domProps:{value:n.passData.new_pass}})]),s("div",{staticClass:"group"},[s("div",{staticClass:"label"},[n._v("新密码确认:")]),s("input",{staticClass:"form-control",attrs:{name:"new_pass_confirm",type:"password"},domProps:{value:n.passData.new_pass_confirm}})])]),s("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[s("el-button",{on:{click:function(t){n.loginDialog=!1}}},[n._v("取 消")]),s("el-button",{attrs:{type:"primary"},on:{click:n.changePassword}},[n._v("确 定")])],1)])],1):n._e()])])])}var i=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"content"},[n("p",{staticClass:"title"}),n("p",{staticClass:"name"},[t._v("基础设置")])])}];n.d(e,"a",function(){return s}),n.d(e,"b",function(){return i})},1459:function(t,e,n){"use strict";function s(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"wrap",class:t.isFold?"open":"close",style:{top:t.topPx}},[n("div",{staticClass:"main",style:t.styleObj,on:{scroll:t.scrollHander}},[n("div",{staticClass:"topbar",class:t.isFold?"":"fold",on:{click:t.fold}},[n("span",{class:t.topBarClass})]),t._v(" "),n("div",{attrs:{color:"red"}},[t._t("default")],2)])])}var i=[];n.d(e,"a",function(){return s}),n.d(e,"b",function(){return i})},1461:function(t,e,n){"use strict";function s(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"item-main curr",style:t.currStyle},[n("div",{on:{click:t.goHref,mouseleave:t.mouseleaveHandler,mouseenter:t.mouseenterHander}},[n("div",{directives:[{name:"show",rawName:"v-show",value:!t.rootMenu.isFold&&t.currTip,expression:"!rootMenu.isFold && currTip"}],staticClass:"rightTip",style:{marginTop:-t.rootMenu.scrollTop+"px"}},[n("div",[n("span",{staticClass:"tiptxt"},[t._v("\n          "+t._s(t.txt)+"\n        ")])])]),t._v(" "),n("div",{staticClass:"title"},[n("span",{staticClass:"icon",class:t.iconClass}),t._v(" "),n("span",{staticClass:"name",class:t.rootMenu.isFold?"":"hide"},[t._v("\n        "+t._s(t.txt)+"\n      ")])])])])}var i=[];n.d(e,"a",function(){return s}),n.d(e,"b",function(){return i})},254:function(t,e,n){"use strict";n.r(e);var s=n(1429),i=n(535);for(var o in i)"default"!==o&&function(t){n.d(e,t,function(){return i[t]})}(o);n(946);var r=n(1),a=Object(r.a)(i.default,s.a,s.b,!1,null,"193814e2",null);e.default=a.exports},277:function(t,e,n){"use strict";var v="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},g=/^(?:submit|button|image|reset|file)$/i,_=/^(?:input|select|textarea|keygen)/i,i=/(\[[^\[\]]*\])/g;function w(t,e,n){if(e.match(i)){!function t(e,n,s){if(0===n.length)return e=s;var i=n.shift(),o=i.match(/^\[(.+?)\]$/);if("[]"===i)return e=e||[],Array.isArray(e)?e.push(t(null,n,s)):(e._values=e._values||[],e._values.push(t(null,n,s))),e;if(o){var r=o[1],a=+r;isNaN(a)?(e=e||{})[r]=t(e[r],n,s):(e=e||[])[a]=t(e[a],n,s)}else e[i]=t(e[i],n,s);return e}(t,function(t){var e=[],n=new RegExp(i),s=/^([^\[\]]*)/.exec(t);for(s[1]&&e.push(s[1]);null!==(s=n.exec(t));)e.push(s[1]);return e}(e),n)}else{var s=t[e];s?(Array.isArray(s)||(t[e]=[s]),t[e].push(n)):t[e]=n}return t}function y(t,e,n){return n=n.replace(/(\r)?\n/g,"\r\n"),n=(n=encodeURIComponent(n)).replace(/%20/g,"+"),t+(t?"&":"")+encodeURIComponent(e)+"="+n}t.exports=function(t,e){"object"!=(void 0===e?"undefined":v(e))?e={hash:!!e}:void 0===e.hash&&(e.hash=!0);for(var n=e.hash?{}:"",s=e.serializer||(e.hash?w:y),i=t&&t.elements?t.elements:[],o=Object.create(null),r=0;r<i.length;++r){var a=i[r];if((e.disabled||!a.disabled)&&a.name&&(_.test(a.nodeName)&&!g.test(a.type))){var u=a.name,l=a.value;if("checkbox"!==a.type&&"radio"!==a.type||a.checked||(l=void 0),e.empty){if("checkbox"!==a.type||a.checked||(l=""),"radio"===a.type&&(o[a.name]||a.checked?a.checked&&(o[a.name]=!0):o[a.name]=!1),null==l&&"radio"==a.type)continue}else if(!l)continue;if("select-multiple"!==a.type)n=s(n,u,l);else{l=[];for(var c=a.options,d=!1,f=0;f<c.length;++f){var p=c[f],m=e.empty&&!p.value,h=p.value||m;p.selected&&h&&(d=!0,n=e.hash&&"[]"!==u.slice(u.length-2)?s(n,u+"[]",p.value):s(n,u,p.value))}!d&&e.empty&&(n=s(n,u,""))}}}if(e.empty)for(var u in o)o[u]||(n=s(n,u,""));return n}},535:function(t,e,n){"use strict";n.r(e);var s=n(536),i=n.n(s);for(var o in s)"default"!==o&&function(t){n.d(e,t,function(){return s[t]})}(o);e.default=i.a},536:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=o(n(931)),i=o(n(935));n(50);function o(t){return t&&t.__esModule?t:{default:t}}e.default={components:{Top:s.default,Menu:i.default},data:function(){return{}},computed:{}}},537:function(t,e,n){"use strict";n.r(e);var s=n(538),i=n.n(s);for(var o in s)"default"!==o&&function(t){n.d(e,t,function(){return s[t]})}(o);e.default=i.a},538:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});i(n(277));var s=i(n(932));function i(t){return t&&t.__esModule?t:{default:t}}e.default={props:["leftName","title","currentPlant"],components:{SwitchSys:s.default}}},539:function(t,e,n){"use strict";n.r(e);var s=n(540),i=n.n(s);for(var o in s)"default"!==o&&function(t){n.d(e,t,function(){return s[t]})}(o);e.default=i.a},540:function(t,h,v){"use strict";(function(e){Object.defineProperty(h,"__esModule",{value:!0});var n=f(v(16)),t=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var s in n)Object.prototype.hasOwnProperty.call(n,s)&&(t[s]=n[s])}return t},i=f(v(277)),o=v(541),r=v(933),s=v(50),a=f(v(17)),u=f(v(111)),l=v(83),c=v(114),d=f(v(112));function f(t){return t&&t.__esModule?t:{default:t}}var p="library",m="system"==p&&!0&&"desktop"=="desktop";h.default={props:["leftName","title","currentPlant"],data:function(){return{userInfo:null,current:"",type:p,plantInfo:null,loginDialog:!1,showMoreTop:!1,outlink:"",isBase:!0,publisher:{},passData:{old_pass:null,new_pass:null,new_pass_confirm:null}}},mounted:function(){var e=this;"system"!=p&&(0,l.platInfo)().then(function(t){e.publisher=t.data.publisher,e.outlink=e.publisher.apps,e.outlink.forEach(function(t){t.is_current&&(e.isBase=!1)})}),this.current=this.currentPlant,sessionStorage.userInfo&&(this.userInfo=a.default.parse(sessionStorage.userInfo)),this.$config.userInfo&&(this.userInfo=this.$config.userInfo),this.$config.userInfo||sessionStorage.userInfo||this.checklogin()},computed:{left:function(){return this.leftName||"显示平台"},isXDataVisible:function(){return this.$store.state.xDataVisible},isXDataTextVisible:function(){return!0},userName:function(){return this.userInfo&&this.userInfo.user?this.userInfo.user.name:null}},methods:t({checklogin:function(){var e=this;return function(t){return function(){var a=t.apply(this,arguments);return new Promise(function(o,r){return function e(t,n){try{var s=a[t](n),i=s.value}catch(t){return void r(t)}if(!s.done)return Promise.resolve(i).then(function(t){e("next",t)},function(t){e("throw",t)});o(i)}("next")})}}(n.default.mark(function t(){return n.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,(0,c.isLogin)().then(function(t){e.userInfo=t.data});case 2:case"end":return t.stop()}},t,e)}))()},update:function(t){this.userInfo=t},handleClose:function(t){this.passData.old_pass=null,this.passDatanew_pass=null,this.passDatanew_pass_confirm=null,this.loginDialog=!1},changeCode:function(t){var e=t.currentTarget;e.src=e.src},logout:function(){this.$confirm("是否确认退出?").then(function(t){(m?r.loginOut:o.loginOut)().then(function(t){sessionStorage.clear(),window.location.href=m?"/system/admin":"/admin"})}).catch(function(t){})},backHome:function(){window.location.href=restUrl_system+"/system"},changePass:function(){this.loginDialog=!0},changePassword:function(){var s=this,t=(0,i.default)(this.$refs.passForm,{hash:!0});(m?r.changePass:o.changePass)(t).then(function(t){s.$message.success("修改密码成功！"),s.loginDialog=!1,window.location.href="../"}).catch(function(t){var e=t.payload;for(var n in e.messages){s.$message.error(e.messages[n]);break}})},goPage:function(t){"string"!=typeof t?t.name!=this.currentPlant?location.href=(0,u.default)(t.base_url,"admin"):this.$message.error("你正处在该平台"):location.href=t},showMore:function(){this.showMoreTop=!this.showMoreTop},handleCommand:function(t){d.default.set("token",sessionStorage.token,{expires:1,path:"/",domain:e.restUrl_system.replace("http://",".")}),location.href=t+"/common/admin"}},(0,s.mapMutations)(["updateUser","openXData","closeXData"]))}}).call(this,v(5))},541:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.register=function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};return(0,s.request_post)("/common/api/user/register",t)},e.login=function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};return(0,s.request_post)("/common/api/auth/login/user",t).then(function(t){return window.sessionStorage.setItem("token",t.data.token),window.localStorage.setItem("token",t.data.token),o.default.token=t.data.token,t})},e.thirdLogin=function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{},e=t.back_url.match(/.*(\?.*)#.*/),n=e&&e[1];n&&(t.back_url=t.back_url.replace(n,""));return(0,s.request_post)("/common/api/auth/third/link",t)},e.phoneLogin=function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};return(0,s.request_post)("/common/api/auth/login_by_phone/phone",t).then(function(t){return window.sessionStorage.setItem("token",t.data.token),window.localStorage.setItem("token",t.data.token),o.default.token=t.data.token,t})},e.codeImage=function(){var t=Math.random().toFixed(3);return(0,s.request_get)("/common/api/captcha/image?code="+t)},e.codeCheck=function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};return(0,s.request_post)("/common/api/captcha/check",t)},e.codePhone=function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};return(0,s.request_post)("/common/api/captcha/mobile",t)},e.codeEmail=function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};return(0,s.request_post)("/common/api/captcha/email",t)},e.getUserInfo=function(){return(0,s.request_get)("/api/auth/is_login/user")},e.save=function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};return(0,s.request_put)("/common/api/user",t)},e.loginOut=function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};return(0,s.request_post)("/common/api/auth/logout",t).then(function(t){return window.sessionStorage.removeItem("token"),window.sessionStorage.removeItem("userInfo"),o.default.token=null,t})},e.changePass=function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};return(0,s.request_put)("/common/api/auth/pass",t).then(function(t){return window.sessionStorage.removeItem("token"),window.sessionStorage.removeItem("userInfo"),o.default.token=null,t})},e.saveMemberData=function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};return(0,s.request_put)(a(t),t)};var s=n(15),i=r(n(22)),o=(r(n(17)),r(n(23)));function r(t){return t&&t.__esModule?t:{default:t}}var a=i.default.compile("/common/api/user/:id")},542:function(t,e,n){},543:function(t,e,n){"use strict";n.r(e);var s=n(544),i=n.n(s);for(var o in s)"default"!==o&&function(t){n.d(e,t,function(){return s[t]})}(o);e.default=i.a},544:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),n(936),n(937);var s=r(n(938)),i=r(n(941)),o=r(n(943));function r(t){return t&&t.__esModule?t:{default:t}}e.default={components:{GliMenu:s.default,GliMenuTop:i.default,GliMenuItem:o.default},data:function(){return{isCollapse:!1}},computed:{defaultActive:function(){var t=this.$route.path;if("/"==t)t="/wms/home";else if(3<t.split("/").length){var e=t.lastIndexOf("/");t=t.substring(0,e)}return t},nav:function(){return this.$store.state.authority}},methods:{handleOpen:function(){},handleClose:function(){},MenuCollapse:function(){this.isCollapse=!this.isCollapse;var t=document.querySelector("#content");this.isCollapse?t.classList.add("mini"):t.classList.remove("mini")},menuItemClickHandler:function(){},menuFoldHandler:function(){this.MenuCollapse()},getAuthority:function(t){return this.nav[t]&&this.nav[t].status}}}},545:function(t,e,n){"use strict";n.r(e);var s=n(546),i=n.n(s);for(var o in s)"default"!==o&&function(t){n.d(e,t,function(){return s[t]})}(o);e.default=i.a},546:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),n(939),e.default={compName:"GliMenu",provide:function(){return{rootMenu:this}},props:{defaultActive:String,keepOneOpen:{type:Boolean,default:!1},menuRecreate:{type:Boolean,default:!0},changedRecreate:{type:Boolean,default:!1},router:{type:Boolean,default:!0},collapse:{type:Boolean,default:!1},topPx:{type:String,default:"10px"},topBarClass:{type:String,default:"icon-menuown-fold"},arrowClass:{type:String,default:"icon-menuown-right"},backgroundColor:{type:String,default:"#333744"},textColor:{type:String,default:"#fff"},activeTextColor:{type:String,default:"#44c3aa"}},created:function(){this.isFold=!this.collapse,this.isFold},mounted:function(){this.findCurrChild(!0)},data:function(){return{isFold:!0,styleObj:{backgroundColor:this.backgroundColor},scrollTop:0,rootMenu:!0}},watch:{defaultActive:function(){this.findCurrChild(!0)}},methods:{fold:function(){this.isFold=!this.isFold,this.isFold||this.hideChildrenName(this.$children),this.$emit("foldHandler",this.isFold)},hideChildrenName:function(t){var e=this;t.forEach(function(t){t.isFold=e.isFold,t.$children&&e.hideChildrenName(t.$children)})},itemClickHandler:function(t){this.$emit("itemClickHandler",t)},findCurrChild:function(t){var e=this,n=0<arguments.length&&void 0!==t&&t;this.$children.forEach(function(t){e.currChild(t,e.defaultActive,n)})},currChild:function(t,e,n){var s=this,i=!1;t.$children.forEach(function(t){t.index==e||t.index==s.$route.query.index?(t.isCurr=!0,i=!0):t.isCurr=!1}),i?n&&(t.isOpen=!0):t.isOpen=!1},normalizeOther:function(e){this.$children.forEach(function(t){t.$children.forEach(function(t){t.index!=e&&(t.isCurr=!1)})})},findEachItem:function(){},closeOtherGroup:function(e){this.$children.forEach(function(t){t.txt!=e&&(t.isOpen=!1)})},scrollHander:function(t){if(!this.isFold){var e=t.target;this.scrollTop=e.scrollTop}}}}},547:function(t,e,n){},548:function(t,e,n){"use strict";n.r(e);var s=n(549),i=n.n(s);for(var o in s)"default"!==o&&function(t){n.d(e,t,function(){return s[t]})}(o);e.default=i.a},549:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={inject:["rootMenu"],props:{txt:{type:String},index:String},created:function(){this.isFold=this.rootMenu.isFold},mounted:function(){var t=this;setTimeout(function(){t.$refs.icon2.style.transition="transform 0.3s ease-in-out"},0)},data:function(){return{isOpen:!1,isFold:!0,currTip:!1}},methods:{open:function(){this.index&&this.$router.push({path:this.index}),this.isOpen=!this.isOpen,this.rootMenu.keepOneOpen&&this.rootMenu.closeOtherGroup(this.txt)}}}},550:function(t,e,n){},551:function(t,e,n){"use strict";n.r(e);var s=n(552),i=n.n(s);for(var o in s)"default"!==o&&function(t){n.d(e,t,function(){return s[t]})}(o);e.default=i.a},552:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={inject:["rootMenu"],props:{index:String,iconClass:String,txt:String},created:function(){},data:function(){return{isFold:!0,isCurr:!1,compType:"menuItem",currTip:!1}},computed:{currStyle:function(){if(this.isCurr)return{color:this.rootMenu.activeTextColor}}},methods:{goHref:function(){var t=this.rootMenu;t.router&&this.$router.push({path:this.index}),t.menuRecreate||(this.isCurr=!0,t.normalizeOther(this.index),t.itemClickHandler(this.index))},findRootMenu:function(t){return t.rootMenu?t:this.findRootMenu(t.$parent)},showRightTip:function(){this.currTip=!0},mouseenterHander:function(t){this.currTip=!0},mouseleaveHandler:function(t){this.currTip=!1}}}},553:function(t,e,n){},554:function(t,e,n){},555:function(t,e,n){},931:function(t,e,n){"use strict";n.r(e);var s=n(1453),i=n(537);for(var o in i)"default"!==o&&function(t){n.d(e,t,function(){return i[t]})}(o);var r=n(1),a=Object(r.a)(i.default,s.a,s.b,!1,null,"1e6bb5e4",null);e.default=a.exports},932:function(t,e,n){"use strict";n.r(e);var s=n(1458),i=n(539);for(var o in i)"default"!==o&&function(t){n.d(e,t,function(){return i[t]})}(o);n(934);var r=n(1),a=Object(r.a)(i.default,s.a,s.b,!1,null,"5d3b1c52",null);e.default=a.exports},933:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var s in n)Object.prototype.hasOwnProperty.call(n,s)&&(t[s]=n[s])}return t};e.listRole=function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};return(0,i.request_get)("/system/api/manager/roles",t)},e.listManager=function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};return(0,i.request_get)("/system/api/manager/managers",t)},e.addManager=function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};return(0,i.request_post)("/system/api/manager/managers",t)},e.modifyManager=function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{},e=t.id,n=u(t,["id"]);return(0,i.request_put)(l({id:e}),n)},e.detailManager=function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{},e=t.id,n=u(t,["id"]);return(0,i.request_get)(l({id:e}),n)},e.detailRole=function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{},e=t.id,n=u(t,["id"]);return e?(0,i.request_get)(c({id:e}),n).then(function(i){var o={};if(i.status){o=i.data.accesses;var r={allow_create:0,allow_view_all:0,allow_edit_all:0,allow_delete_all:0};return d().then(function(t){if(t.status){var e=t.data,n={};for(var s in e)n[e[s].id]=a({},e[s],r),o[e[s].id]&&(n[e[s].id]=a({},e[s],o[e[s].id]));return t.data=n,log(i,222),t}})}}):f()},e.allJurisdiction=d,e._allJurisdiction=f,e.role=function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{},e=t.id,n=u(t,["id"]);if(log(n),e)return(0,i.request_put)(c({id:e}),n);return(0,i.request_post)("/system/api/manager/roles",n)},e.addRole=function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};return(0,i.request_post)("/system/api/manager/roles",t)},e.deleteManager=function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};return(0,i.request_post)("/system/api/manager/managers/delete",t)},e.deleteRole=function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};return(0,i.request_post)("/system/api/manager/roles/delete",t)},e.logManager=function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};return(0,i.request_get)("/system/api/manager/logs",t)},e.login=function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};return(0,i.request_post)("/system/api/auth/login/manager",t)},e.isLogin=function(){return(0,i.request_get)("/system/api/auth/is_login/manager")},e.loginOut=function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};return(0,i.request_post)("/system/api/auth/logout",t)},e.changePass=function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};return(0,i.request_put)("/system/api/auth/pass",t).then(function(t){return window.sessionStorage.removeItem("token"),window.sessionStorage.removeItem("userInfo"),config.token=null,t})};var s,i=n(15),o=n(22),r=(s=o)&&s.__esModule?s:{default:s};function u(t,e){var n={};for(var s in t)0<=e.indexOf(s)||Object.prototype.hasOwnProperty.call(t,s)&&(n[s]=t[s]);return n}var l=r.default.compile("/system/api/manager/managers/:id"),c=r.default.compile("/system/api/manager/roles/:id");function d(){return(0,i.request_get)("/system/api/manager/accesses")}function f(){return(0,i.request_get)("/system/api/manager/accesses").then(function(t){if(t.status){var e={allow_create:0,allow_view_all:0,allow_edit_all:0,allow_delete_all:0},n=t.data,s={};for(var i in n)s[n[i].id]=a({},n[i],e);return t.data=s,t}})}},934:function(t,e,n){"use strict";var s=n(542);n.n(s).a},935:function(t,e,n){"use strict";n.r(e);var s=n(1449),i=n(543);for(var o in i)"default"!==o&&function(t){n.d(e,t,function(){return i[t]})}(o);n(945);var r=n(1),a=Object(r.a)(i.default,s.a,s.b,!1,null,"63c7fb28",null);e.default=a.exports},936:function(t,e,n){},937:function(t,e,n){},938:function(t,e,n){"use strict";n.r(e);var s=n(1459),i=n(545);for(var o in i)"default"!==o&&function(t){n.d(e,t,function(){return i[t]})}(o);n(940);var r=n(1),a=Object(r.a)(i.default,s.a,s.b,!1,null,"21763bd0",null);e.default=a.exports},939:function(t,e,n){},940:function(t,e,n){"use strict";var s=n(547);n.n(s).a},941:function(t,e,n){"use strict";n.r(e);var s=n(1457),i=n(548);for(var o in i)"default"!==o&&function(t){n.d(e,t,function(){return i[t]})}(o);n(942);var r=n(1),a=Object(r.a)(i.default,s.a,s.b,!1,null,null,null);e.default=a.exports},942:function(t,e,n){"use strict";var s=n(550);n.n(s).a},943:function(t,e,n){"use strict";n.r(e);var s=n(1461),i=n(551);for(var o in i)"default"!==o&&function(t){n.d(e,t,function(){return i[t]})}(o);n(944);var r=n(1),a=Object(r.a)(i.default,s.a,s.b,!1,null,"21ea082e",null);e.default=a.exports},944:function(t,e,n){"use strict";var s=n(553);n.n(s).a},945:function(t,e,n){"use strict";var s=n(554);n.n(s).a},946:function(t,e,n){"use strict";var s=n(555);n.n(s).a}}]);