/*!
 * {
 *   "buildtime": "2019-07-17 10:58:50",
 *   "workspace": "F:\\project\\x-book4\\js",
 *   "username": "Administrator",
 *   "hostname": "PC201608171616",
 *   "platform": "win32",
 *   "git": {
 *     "branch": "master",
 *     "hash": "a51842995",
 *     "message": [
 *       "commit a51842995ac312d7b576d646ab99c7a4f3f34d0b",
 *       "Author: YangZai <552396385@qq.com>",
 *       "Date:   Wed Jul 17 10:58:23 2019 +0800",
 *       "    xxx"
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
(window.webpackJsonp=window.webpackJsonp||[]).push([[36],{1048:function(t,e,n){"use strict";var i=n(909);n.n(i).a},1062:function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"page-help-detail"},[n("div",{staticClass:"help-detail"},[n("p",{staticClass:"txt-describe f15"},[t._v("描述你的问题")]),n("textarea",{directives:[{name:"model",rawName:"v-model",value:t.content,expression:"content"}],staticClass:"f12",attrs:{placeholder:"请输入内容..."},domProps:{value:t.content},on:{input:function(e){e.target.composing||(t.content=e.target.value)}}}),n("div",{staticClass:"help-pics"},[n("button",{staticClass:"btn-reset icon-take-photo mr10",on:{click:function(e){return t.$refs.file.click()}}}),n("input",{ref:"file",attrs:{type:"file",accept:"image/*",capture:"camera"},on:{change:function(e){return t.previewImg(e)}}}),t._l(t.imgs,function(e){return n("div",{staticClass:"help-img"},[n("img",{attrs:{src:e.url}}),n("button",{staticClass:"btn-reset c_f",on:{click:function(n){return t.remove(e.id)}}},[t._v("X")])])})],2)]),n("div",{staticClass:"help-btn"},[n("button",{staticClass:"linear-btn c_f f16",on:{click:t.postMsg}},[t._v("提交")])])])},s=[];n.d(e,"a",function(){return i}),n.d(e,"b",function(){return s})},628:function(t,e,n){"use strict";n.r(e);var i=n(1062),s=n(907);for(var a in s)"default"!==a&&function(t){n.d(e,t,function(){return s[t]})}(a);n(1048);var c=n(0),r=Object(c.a)(s.default,i.a,i.b,!1,null,null,null);e.default=r.exports},907:function(t,e,n){"use strict";n.r(e);var i=n(908),s=n.n(i);for(var a in i)"default"!==a&&function(t){n.d(e,t,function(){return i[t]})}(a);e.default=s.a},908:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={data:function(){return{imgs:[],maxImgLen:6,content:""}},methods:{previewImg:function(t){var e=t.target.files[0],n=URL.createObjectURL(e);this.imgs.length<this.maxImgLen&&this.imgs.push({id:Date.now().toString(36),url:n})},remove:function(t){var e=this.getImgItemById(t);this.imgs.splice(e,1)},getImgItemById:function(t){var e=void 0;return this.imgs.forEach(function(n,i){n.id===t&&(e=i)}),e},postMsg:function(){var t=this;this.content&&this.$service.feedback.save({content:this.content}).then(function(e){t.$router.go(-1)})}}}},909:function(t,e,n){}}]);