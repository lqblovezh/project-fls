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
(window.webpackJsonp=window.webpackJsonp||[]).push([[46],{182:function(t,e,n){"use strict";n.r(e);var a=n(832),i=n(337);for(var s in i)"default"!==s&&function(t){n.d(e,t,function(){return i[t]})}(s);n(597);var r=n(0),c=Object(r.a)(i.default,a.a,a.b,!1,null,"84018d54",null);e.default=c.exports},221:function(t,e,n){"use strict";n.r(e);var a=n(222),i=n.n(a);for(var s in a)"default"!==s&&function(t){n.d(e,t,function(){return a[t]})}(s);e.default=i.a},222:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{hideBack:{},type:{},privateStyle:{},isRewrite:{type:Boolean,default:!1}},computed:{isShowSearch:function(){return!!this.isSearch},isShowBack:function(){return!this.hideBack}},methods:{goBack:function(){this.isRewrite?this.$emit("back"):this.$router.go(-1)},goSearch:function(){this.$router.push({name:"search"})},share:function(){}}}},223:function(t,e,n){},224:function(t,e,n){"use strict";n.r(e);var a=n(226),i=n(221);for(var s in i)"default"!==s&&function(t){n.d(e,t,function(){return i[t]})}(s);n(225);var r=n(0),c=Object(r.a)(i.default,a.a,a.b,!1,null,"bc7c4e9e",null);e.default=c.exports},225:function(t,e,n){"use strict";var a=n(223);n.n(a).a},226:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"header",style:t.privateStyle},[n("div",{staticClass:"header-left"},[t._t("left",[n("span",{staticClass:"icon-go-back icon-back",on:{click:t.goBack}})])],2),n("div",{staticClass:"header-center text-center"},[t._t("center")],2),n("div",{staticClass:"header-right text-right"},[t._t("right",["share"===t.type?n("span",{staticClass:"icon-share",on:{click:t.share}}):"search"===t.type?n("span",{staticClass:"icon-search_h",on:{click:t.goSearch}}):n("span",{staticClass:"placeholder"})])],2)])},i=[];n.d(e,"a",function(){return a}),n.d(e,"b",function(){return i})},337:function(t,e,n){"use strict";n.r(e);var a=n(338),i=n.n(a);for(var s in a)"default"!==s&&function(t){n.d(e,t,function(){return a[t]})}(s);e.default=i.a},338:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a,i=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(t[a]=n[a])}return t},s=n(6),r=n(224),c=(a=r)&&a.__esModule?a:{default:a};e.default={data:function(){return{nickname:""}},components:{Head:c.default},mounted:function(){this.nickname=this.userInfo.nick_name},computed:i({},(0,s.mapState)("user",{userInfo:function(t){return t.userInfo}}),{hasChanged:function(){return this.nickname!==this.userInfo.nick_name}}),methods:i({},(0,s.mapMutations)("user",["setUserInfo"]),{clear:function(){this.nickname=""},save:function(){var t=this;this.nickname!==this.userInfo.nick_name&&this.$service.user.changeUserInfo({nick_name:this.nickname}).then(function(e){t.setUserInfo(e.data),t.$Toast({message:"修改成功",iconClass:"icon-toast icon-success",duration:400}),setTimeout(function(){t.$router.go(-1)},400)}).catch(console.info)}})}},339:function(t,e,n){},597:function(t,e,n){"use strict";var a=n(339);n.n(a).a},832:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"pt88-static__vh main-color"},[n("Head",[n("p",{attrs:{slot:"center"},slot:"center"},[t._v("修改昵称")]),n("div",{attrs:{slot:"right"},slot:"right"},[n("p",{directives:[{name:"show",rawName:"v-show",value:t.hasChanged,expression:"hasChanged"}],on:{click:t.save}},[t._v("保存")])])]),n("div",[n("div",{staticClass:"input-box"},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.nickname,expression:"nickname"}],attrs:{type:"text"},domProps:{value:t.nickname},on:{input:function(e){e.target.composing||(t.nickname=e.target.value)}}}),n("span",{directives:[{name:"show",rawName:"v-show",value:""!=t.nickname,expression:"nickname != ''"}],staticClass:"icon-close_u",on:{click:t.clear}})])])],1)},i=[];n.d(e,"a",function(){return a}),n.d(e,"b",function(){return i})}}]);