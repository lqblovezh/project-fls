(window.webpackJsonp=window.webpackJsonp||[]).push([[25],{177:function(t,e,n){"use strict";n.r(e);var o=n(178),a=n.n(o);for(var r in o)"default"!==r&&function(t){n.d(e,t,function(){return o[t]})}(r);e.default=a.a},178:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(88),a=n(18);e.default={mixins:[o.main],data:function(){return{total:100,is_answer:!1,n:0,formData:{id:"",qrcode_product_id:"",answer:"",type:"vote"}}},methods:{getList:function(){var t=this,e=this.$route.query.id;this.formData.qrcode_product_id=this.$route.query.qrcode_product_id,(0,a.get_content)({id:e}).then(function(e){t.info=e.data,t.formData.id=e.data.id;var n=0;for(var o in t.info.answer)n+=t.info.answer[o].count,t.info.answer[o].is_answer&&(t.is_answer=!0,t.n=o);n>t.total&&(t.total=n),t.info.answer.map(function(e){return e.progress=e.count/t.total,e})})},sendVote:function(t){var e=this;this.formData.answer=t,(0,a.vote)(this.formData).then(function(t){t.status&&(e.getList(),e.$dialog.toast({mes:"投票成功",timeout:1500,icon:"success"}))}).catch(function(t){e.$dialog.toast({mes:"投票失败",timeout:1500,icon:"error"})})}}}},179:function(t,e,n){},410:function(t,e,n){"use strict";var o=n(179);n.n(o).a},453:function(t,e,n){"use strict";var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("yd-layout",{staticClass:"body"},[n("yd-navbar",{attrs:{slot:"navbar",title:"投票",color:"#fff",bgcolor:"#ff6955"},slot:"navbar"},[n("a",{attrs:{slot:"left",href:"javascript:history.back(-1)"},slot:"left"},[n("yd-navbar-back-icon",{attrs:{color:"#fff"}},[t._v("返回")])],1)]),n("div",{staticClass:"content"},[n("div",{staticClass:"qus"},[n("span",[t._v(t._s(t.info.name))])]),n("ul",{staticClass:"voteChoose"},t._l(t.info.answer,function(e){return n("li",[n("div",{staticClass:"info"},[n("div",{staticClass:"vote"},[n("span",{staticClass:"ans"},[t._v(t._s(e.answer))]),n("yd-progressbar",{staticClass:"pro",attrs:{type:"line",progress:e.progress,"trail-width":"3","trail-color":"#FE5D51"}}),n("span",{staticClass:"total"},[n("span",{staticClass:"c1"},[t._v(t._s(e.count))]),n("span",[t._v("票")])])],1)]),n("div",{staticClass:"btn"},[t.is_answer?n("yd-button",{attrs:{size:"mini",type:"disabled",disabled:""}},[t._v("投票")]):n("yd-button",{attrs:{size:"mini",color:"#fff",bgcolor:"#ff6955"},nativeOn:{click:function(n){return t.sendVote(e.answer)}}},[t._v("投票")])],1)])}),0),t.is_answer&&t.info.answer?n("div",{staticClass:"msgInfo"},[n("span",{staticClass:"c1"},[t._v("注： ")]),n("span",[t._v("你已经为 ")]),n("span",{staticClass:"c1"},[t._v(t._s(t.info.answer[t.n].answer)+" ")]),n("span",[t._v("投票")])]):t._e()])],1)},a=[];n.d(e,"a",function(){return o}),n.d(e,"b",function(){return a})},67:function(t,e,n){"use strict";n.r(e);var o=n(453),a=n(177);for(var r in a)"default"!==r&&function(t){n.d(e,t,function(){return a[t]})}(r);n(410);var i=n(9),s=Object(i.a)(a.default,o.a,o.b,!1,null,"11e3a367",null);e.default=s.exports},87:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.getList=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,a.request_get)("/system/app_manager/managers",t)},e.del=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,a.request_post)("/system/app_manager/managers/delete",t)},e.detail=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,a.request_get)(i(t),t)},e.save=function(t){var e=t.id,n=function(t,e){var n={};for(var o in t)e.indexOf(o)>=0||Object.prototype.hasOwnProperty.call(t,o)&&(n[o]=t[o]);return n}(t,["id"]);if(e)return(0,a.request_put)(i({id:e}),n);return(0,a.request_post)("/system/app_manager/managers",n).then(function(t){n.apps.forEach(function(e){s({manager_id:t.data.id,app_id:e.id})})})},e.getApps=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,a.request_get)("/system/app/apps",t)},e.authorize=s,e.revoke=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,a.request_post)("/system/app_manager/managers/app_revoke",t)},e.codeImage=function(){arguments.length>0&&void 0!==arguments[0]&&arguments[0];var t=Math.random().toFixed(3);return(0,a.request_get)("/common/api/captcha/image?code="+t)},e.codePhone=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,a.request_post)("/common/api/captcha/mobile",t)},e.userLogin=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,a.request_post)("/common/api/auth/login/user",t).then(function(t){return window.sessionStorage.setItem("token",t.data.token),window.localStorage.setItem("token",t.data.token),config.token=t.data.token,t})},e.userReg=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,a.request_post)("/common/api/user/register",t)},e.backPwdCode=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,a.request_post)("/common/api/user/pass_reset/send",t)},e.setPwd=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,a.request_post)("/common/api/user/pass_reset/set",t)},e.phoneLogin=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,a.request_post)("/common/api/auth/login_by_phone/user",t).then(function(t){return window.sessionStorage.setItem("token",t.data.token),window.localStorage.setItem("token",t.data.token),config.token=t.data.token,t})};var o,a=n(5),r=n(10);var i=((o=r)&&o.__esModule?o:{default:o}).default.compile("/system/api/app_manager/managers/:id");function s(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,a.request_post)("/system/app_manager/managers/app_authorize",t)}},88:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.code=e.main=void 0;var o=s(n(8)),a=s(n(89)),r=n(17),i=(n(11),n(87));function s(t){return t&&t.__esModule?t:{default:t}}var u=new a.default({phone:{required:!0,length:11,message:{required:"请输入手机号",length:"手机号码长度应为11位"}}}),c={data:function(){return{list:[],info:{},qrcode_id:this.$route.query.qrcode_id,page:{}}},created:function(){var t,e=this;return(t=o.default.mark(function t(){return o.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(e.$route.query.token_id&&window.sessionStorage.setItem("token",e.$route.query.token_id),window.sessionStorage.getItem("token")){t.next=5;break}return alert(123456),e.$router.push({path:"/login"}),t.abrupt("return");case 5:e.getList();case 6:case"end":return t.stop()}},t,e)}),function(){var e=t.apply(this,arguments);return new Promise(function(t,n){return function o(a,r){try{var i=e[a](r),s=i.value}catch(t){return void n(t)}if(!i.done)return Promise.resolve(s).then(function(t){o("next",t)},function(t){o("throw",t)});t(s)}("next")})})()},methods:{loadList:function(t){var e=this;t&&(0,r.setTimeout)(function(){e.list=[].concat(function(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return Array.from(t)}(e.list),[{txt:"xxxxx"}]),e.$refs.infinitescroll.$emit("ydui.infinitescroll.finishLoad")},1e3)},go:function(t,e){this.$router.push({name:t,params:e})},to:function(t,e){this.$router.push({path:t,query:e})},outLink:function(t){location.href=t},pay:function(){},fetch:function(){return JSON.parse(window.localStorage.getItem("params")||"[]")},save:function(t){window.localStorage.setItem("params",JSON.stringify(t))}},computed:{unescapeHTML:function(){return function(t){return(t=""+t).replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&amp;/g,"&").replace(/&quot;/g,'"').replace(/&apos;/g,"'")}}},watch:{params:{handler:function(t){this.save(t)},deep:!0}}},d={data:function(){return{img_code:{code_id:null,code_img:null},img_code_val:null,code_tip:"发送验证码",duration:60,timer:null}},methods:{getImgCode:function(){var t=this;(0,i.codeImage)().then(function(e){t.img_code=e.data})},validatePhone:function(){var t=u.validate({phone:this.info.phone});return!(t.length>0)||(this.$Toast({message:t[0].toString()}),!1)},setTimer:function(){var t=this;if(null===this.timer){var e=this.duration;!function n(){t.code_tip=e+"秒后再试",e-- >0?t.timer=(0,r.setTimeout)(n,1e3):(t.code_tip="发送验证码",t.timer=null)}()}},sendCheckCode:function(){var t=this;null!==this.img_code_val?this.validatePhone()&&!this.timer&&(0,i.codePhone)({phone:this.info.phone,code_id_img:this.img_code.code_id,code_val_img:this.img_code_val,not_check_user_exist:1}).then(function(e){t.$dialog.toast({mes:e.message||"发送成功",icon:"success",timeout:1500}),t.setTimer(),t.info.code_id=e.data.code_id}).catch(function(e){t.$dialog.toast({icon:"error",timeout:1500,mes:"发送失败"})}):this.$dialog.toast({mes:"请输入图片验证码",timeout:1e3})}}};e.main=c,e.code=d}}]);