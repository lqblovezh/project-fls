(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{168:function(t,e,n){"use strict";n.r(e);var o=n(169),r=n.n(o);for(var a in o)"default"!==a&&function(t){n.d(e,t,function(){return o[t]})}(a);e.default=r.a},169:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(88);n(18);e.default={mixins:[o.main],data:function(){return{params:{gather:{}}}},methods:{getList:function(){this.params=this.fetch();var t=this.params.gather;this.info=t.data.components[t.n]}}}},170:function(t,e,n){},406:function(t,e,n){"use strict";var o=n(170);n.n(o).a},450:function(t,e,n){"use strict";var o=function(){var t=this.$createElement,e=this._self._c||t;return e("yd-layout",{staticClass:"body"},[e("yd-navbar",{attrs:{slot:"navbar",title:this.info.name,color:"#fff",bgcolor:"#3998e2"},slot:"navbar"},[e("a",{attrs:{slot:"left",href:"javascript:history.back(-1)"},slot:"left"},[e("yd-navbar-back-icon",{attrs:{color:"#fff"}},[this._v("返回")])],1)]),e("div",{staticClass:"content",domProps:{innerHTML:this._s(this.unescapeHTML(this.info.preview))}})],1)},r=[];n.d(e,"a",function(){return o}),n.d(e,"b",function(){return r})},64:function(t,e,n){"use strict";n.r(e);var o=n(450),r=n(168);for(var a in r)"default"!==a&&function(t){n.d(e,t,function(){return r[t]})}(a);n(406);var i=n(9),s=Object(i.a)(r.default,o.a,o.b,!1,null,"2de6080c",null);e.default=s.exports},87:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.getList=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,r.request_get)("/system/app_manager/managers",t)},e.del=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,r.request_post)("/system/app_manager/managers/delete",t)},e.detail=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,r.request_get)(i(t),t)},e.save=function(t){var e=t.id,n=function(t,e){var n={};for(var o in t)e.indexOf(o)>=0||Object.prototype.hasOwnProperty.call(t,o)&&(n[o]=t[o]);return n}(t,["id"]);if(e)return(0,r.request_put)(i({id:e}),n);return(0,r.request_post)("/system/app_manager/managers",n).then(function(t){n.apps.forEach(function(e){s({manager_id:t.data.id,app_id:e.id})})})},e.getApps=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,r.request_get)("/system/app/apps",t)},e.authorize=s,e.revoke=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,r.request_post)("/system/app_manager/managers/app_revoke",t)},e.codeImage=function(){arguments.length>0&&void 0!==arguments[0]&&arguments[0];var t=Math.random().toFixed(3);return(0,r.request_get)("/common/api/captcha/image?code="+t)},e.codePhone=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,r.request_post)("/common/api/captcha/mobile",t)},e.userLogin=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,r.request_post)("/common/api/auth/login/user",t).then(function(t){return window.sessionStorage.setItem("token",t.data.token),window.localStorage.setItem("token",t.data.token),config.token=t.data.token,t})},e.userReg=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,r.request_post)("/common/api/user/register",t)},e.backPwdCode=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,r.request_post)("/common/api/user/pass_reset/send",t)},e.setPwd=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,r.request_post)("/common/api/user/pass_reset/set",t)},e.phoneLogin=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,r.request_post)("/common/api/auth/login_by_phone/user",t).then(function(t){return window.sessionStorage.setItem("token",t.data.token),window.localStorage.setItem("token",t.data.token),config.token=t.data.token,t})};var o,r=n(5),a=n(10);var i=((o=a)&&o.__esModule?o:{default:o}).default.compile("/system/api/app_manager/managers/:id");function s(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,r.request_post)("/system/app_manager/managers/app_authorize",t)}},88:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.code=e.main=void 0;var o=s(n(8)),r=s(n(89)),a=n(17),i=(n(11),n(87));function s(t){return t&&t.__esModule?t:{default:t}}var u=new r.default({phone:{required:!0,length:11,message:{required:"请输入手机号",length:"手机号码长度应为11位"}}}),c={data:function(){return{list:[],info:{},qrcode_id:this.$route.query.qrcode_id,page:{}}},created:function(){var t,e=this;return(t=o.default.mark(function t(){return o.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(e.$route.query.token_id&&window.sessionStorage.setItem("token",e.$route.query.token_id),window.sessionStorage.getItem("token")){t.next=5;break}return alert(123456),e.$router.push({path:"/login"}),t.abrupt("return");case 5:e.getList();case 6:case"end":return t.stop()}},t,e)}),function(){var e=t.apply(this,arguments);return new Promise(function(t,n){return function o(r,a){try{var i=e[r](a),s=i.value}catch(t){return void n(t)}if(!i.done)return Promise.resolve(s).then(function(t){o("next",t)},function(t){o("throw",t)});t(s)}("next")})})()},methods:{loadList:function(t){var e=this;t&&(0,a.setTimeout)(function(){e.list=[].concat(function(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return Array.from(t)}(e.list),[{txt:"xxxxx"}]),e.$refs.infinitescroll.$emit("ydui.infinitescroll.finishLoad")},1e3)},go:function(t,e){this.$router.push({name:t,params:e})},to:function(t,e){this.$router.push({path:t,query:e})},outLink:function(t){location.href=t},pay:function(){},fetch:function(){return JSON.parse(window.localStorage.getItem("params")||"[]")},save:function(t){window.localStorage.setItem("params",JSON.stringify(t))}},computed:{unescapeHTML:function(){return function(t){return(t=""+t).replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&amp;/g,"&").replace(/&quot;/g,'"').replace(/&apos;/g,"'")}}},watch:{params:{handler:function(t){this.save(t)},deep:!0}}},d={data:function(){return{img_code:{code_id:null,code_img:null},img_code_val:null,code_tip:"发送验证码",duration:60,timer:null}},methods:{getImgCode:function(){var t=this;(0,i.codeImage)().then(function(e){t.img_code=e.data})},validatePhone:function(){var t=u.validate({phone:this.info.phone});return!(t.length>0)||(this.$Toast({message:t[0].toString()}),!1)},setTimer:function(){var t=this;if(null===this.timer){var e=this.duration;!function n(){t.code_tip=e+"秒后再试",e-- >0?t.timer=(0,a.setTimeout)(n,1e3):(t.code_tip="发送验证码",t.timer=null)}()}},sendCheckCode:function(){var t=this;null!==this.img_code_val?this.validatePhone()&&!this.timer&&(0,i.codePhone)({phone:this.info.phone,code_id_img:this.img_code.code_id,code_val_img:this.img_code_val,not_check_user_exist:1}).then(function(e){t.$dialog.toast({mes:e.message||"发送成功",icon:"success",timeout:1500}),t.setTimer(),t.info.code_id=e.data.code_id}).catch(function(e){t.$dialog.toast({icon:"error",timeout:1500,mes:"发送失败"})}):this.$dialog.toast({mes:"请输入图片验证码",timeout:1e3})}}};e.main=c,e.code=d}}]);