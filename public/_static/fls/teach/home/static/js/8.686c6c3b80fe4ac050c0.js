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
(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{1018:function(e,t,a){"use strict";var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("NormalWrap",[a("div",{staticClass:"page-userInfo cbox"},[a("div",{staticClass:"conatiner"},[a("div",{staticClass:"nav c_f_bg"},[a("div",{staticClass:"ls c_e0_bd"},e._l(e.navs,function(t,i){return a("div",{key:i,staticClass:"item active_border ib",class:{active:e.infoType===i},on:{click:function(t){return e.changeKey(i)}}},[e._v(e._s(t.name))])}),0)]),a("div",{staticClass:"body c_f_bg"},["personal"===e.infoType?a("Personal"):a("Account")],1)])])])],1)},n=[];a.d(t,"a",function(){return i}),a.d(t,"b",function(){return n})},1048:function(e,t,a){"use strict";var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"comp-user-account"},[a("div",{staticClass:"box c_6 f14"},[a("div",{staticClass:"item flex"},[e._m(0),a("div",{staticClass:"ib ellipsis"},[e._v(e._s(e.user.name))])]),a("div",{staticClass:"item"},[e._m(1),a("div",{staticClass:"ib"},[e._v(e._s(e.user.phone))]),a("div",{staticClass:"ib cp",on:{click:function(t){return e.phoneCheck()}}},[a("div",{staticClass:"icon icon-user-edit"}),a("span",[e._v("修改")])])]),a("div",{staticClass:"item"},[e._m(2),a("div",{staticClass:"ib"},[e._v("******")]),a("div",{staticClass:"ib cp",on:{click:function(t){return e.passChange()}}},[a("div",{staticClass:"icon icon-user-edit"}),a("span",[e._v("直接修改")])]),a("div",{staticClass:"ib cp",on:{click:function(t){return e.passUpdateChange()}}},[a("div",{staticClass:"icon icon-user-edit"}),a("span",[e._v("短信修改")])])]),a("div",{staticClass:"item"},[e._m(3),a("div",{staticClass:"ib trilateral"},[a("div",{staticClass:"item"},[a("div",{staticClass:"icon",class:[e.$user.third_qq?"icon-user-qq-s":"icon-user-qq"]}),a("span",[e._v("QQ")]),a("Tbutton",{staticClass:"ib fr",attrs:{type:"og_plain",size:"default"},nativeOn:{click:function(e){}}},[e._v("绑定QQ")])],1),a("div",{staticClass:"item"},[a("div",{staticClass:"icon",class:[e.$user.third_weixin?"icon-wechat-s":"icon-wechat"]}),a("span",[e._v("微信")]),a("Tbutton",{staticClass:"ib fr",attrs:{type:"og_plain",size:"default"},nativeOn:{click:function(e){}}},[e._v("绑定微信")])],1)])])]),e.detailDialog?a("PhoneCheck",{attrs:{detailDialog:e.detailDialog,phone:e.user.phone,detailDialog:e.detailDialog},on:{"update:detailDialog":function(t){e.detailDialog=t},"update:detail-dialog":function(t){e.detailDialog=t},status:e.checkStatus}}):e._e(),e.changeDialog?a("PhoneChange",{attrs:{changeDialog:e.changeDialog,phone:e.user.phone,changeDialog:e.changeDialog},on:{"update:changeDialog":function(t){e.changeDialog=t},"update:change-dialog":function(t){e.changeDialog=t}}}):e._e(),e.passDialog?a("PasswordChange",{attrs:{passDialog:e.passDialog,passDialog:e.passDialog},on:{"update:passDialog":function(t){e.passDialog=t},"update:pass-dialog":function(t){e.passDialog=t}}}):e._e(),e.passUpdateDialog?a("PassUpdateByPhone",{attrs:{passUpdateDialog:e.passUpdateDialog,passUpdateDialog:e.passUpdateDialog},on:{"update:passUpdateDialog":function(t){e.passUpdateDialog=t},"update:pass-update-dialog":function(t){e.passUpdateDialog=t}}}):e._e()],1)},n=[function(){var e=this.$createElement,t=this._self._c||e;return t("label",{staticClass:"ib"},[t("span",{staticClass:"spacing3"},[this._v("账")]),t("span",[this._v("户:")])])},function(){var e=this.$createElement,t=this._self._c||e;return t("label",{staticClass:"ib"},[t("span",{staticClass:"spacing3"},[this._v("电")]),t("span",[this._v("话:")])])},function(){var e=this.$createElement,t=this._self._c||e;return t("label",{staticClass:"ib"},[t("span",{staticClass:"spacing3"},[this._v("密")]),t("span",[this._v("码:")])])},function(){var e=this.$createElement,t=this._self._c||e;return t("label",{staticClass:"ib vt"},[t("span",[this._v("第三方账号")]),t("span",[this._v(":")])])}];a.d(t,"a",function(){return i}),a.d(t,"b",function(){return n})},1055:function(e,t,a){"use strict";var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"comp-user-personal"},[e.user?a("div",{staticClass:"top tc"},[a("div",{staticClass:"img"},[a("img",{attrs:{src:e.previewImgUrl||e.user.picture_absolute,alt:"alt"}}),e.isEdit?a("div",{staticClass:"changeImg f16",on:{click:function(t){return e.$refs.file.click()}}},[e._v("更换头像"),a("input",{ref:"file",staticClass:"hide",attrs:{type:"file",accept:"image/jpeg,image/jpg,image/png"},on:{change:e.previewImg}})]):e._e(),a("div",{staticClass:"modify",on:{click:function(t){return e.reset()}}},[a("el-button",{attrs:{icon:"el-icon-edit",circle:""}})],1)]),e.isEdit&&e.isThridName?a("div",{staticClass:"name f20 ib"},[a("el-input",{model:{value:e.info.name,callback:function(t){e.$set(e.info,"name",t)},expression:"info.name"}})],1):a("div",{staticClass:"name f20 ellipsis"},[e._v(e._s(e.user.name))]),e.user.is_teacher?e._e():a("Tbutton",{attrs:{type:"og_plain",size:"default"},nativeOn:{click:function(t){return e.$go("/apply")}}},[e._v("升级为教师")])],1):e._e(),e.user?a("div",{staticClass:"box c_6 f14"},[a("div",{staticClass:"item"},[e._m(0),e.isEdit?a("div",{staticClass:"ib"},[a("el-input",{attrs:{maxlength:"20",minlength:"1"},model:{value:e.info.nick_name,callback:function(t){e.$set(e.info,"nick_name",t)},expression:"info.nick_name"}})],1):a("div",{staticClass:"ib"},[e._v(e._s(e.user.nick_name))])]),a("div",{staticClass:"item"},[e._m(1),e.isEdit?a("el-radio-group",{model:{value:e.info.sex,callback:function(t){e.$set(e.info,"sex",t)},expression:"info.sex"}},[a("el-radio",{attrs:{label:"男"}},[e._v("男")]),a("el-radio",{attrs:{label:"女"}},[e._v("女")]),a("el-radio",{attrs:{label:"保密"}},[e._v("保密")])],1):a("div",{staticClass:"ib"},[e._v(e._s(e.user.sex))])],1),a("div",{staticClass:"item"},[e._m(2),e.isEdit?a("div",{staticClass:"ib"},[a("el-input",{model:{value:e.info.school,callback:function(t){e.$set(e.info,"school",t)},expression:"info.school"}})],1):a("div",{staticClass:"ib"},[e._v(e._s(e.user.school))])]),a("div",{staticClass:"item"},[e._m(3),e.isEdit?a("div",{staticClass:"ib"},[a("el-input",{model:{value:e.info.college,callback:function(t){e.$set(e.info,"college",t)},expression:"info.college"}})],1):a("div",{staticClass:"ib"},[e._v(e._s(e.user.college))])]),e.isEdit?a("div",{staticClass:"btn tc"},[a("el-button",{attrs:{type:"primary",size:"small"},on:{click:e.save}},[e._v("保存")])],1):e._e()]):e._e()])},n=[function(){var e=this.$createElement,t=this._self._c||e;return t("label",{staticClass:"ib"},[t("span",{staticClass:"spacing2"},[this._v("昵")]),t("span",[this._v("称:")])])},function(){var e=this.$createElement,t=this._self._c||e;return t("label",{staticClass:"ib"},[t("span",{staticClass:"spacing2"},[this._v("性")]),t("span",[this._v("别:")])])},function(){var e=this.$createElement,t=this._self._c||e;return t("label",{staticClass:"ib"},[t("span",{staticClass:"spacing2"},[this._v("学")]),t("span",[this._v("校:")])])},function(){var e=this.$createElement,t=this._self._c||e;return t("label",{staticClass:"ib"},[t("span",{staticClass:"spacing2"},[this._v("学")]),t("span",[this._v("院:")])])}];a.d(t,"a",function(){return i}),a.d(t,"b",function(){return n})},1061:function(e,t,a){"use strict";var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"comp-phone-change"},[a("div",{staticClass:"dialog"},[a("el-dialog",{attrs:{title:"修改密码",visible:e.passDialog,width:"600px",top:"20%","before-close":e.close},on:{"update:visible":function(t){e.passDialog=t}}},[a("div",{staticClass:"group"},e._l(e.valiData,function(e,t){return a("LoginInput",{key:t,ref:"inp_"+t,refInFor:!0,attrs:{name:t,data:e}})}),1),a("div",{staticClass:"dialog-footer tc",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{size:"small"},on:{click:function(t){return e.close()}}},[e._v("取消")]),a("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(t){return e.save()}}},[e._v("确认")])],1)])],1)])},n=[];a.d(t,"a",function(){return i}),a.d(t,"b",function(){return n})},1063:function(e,t,a){"use strict";var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"comp-phone-change"},[a("div",{staticClass:"dialog"},[a("el-dialog",{attrs:{title:"绑定手机号",visible:e.changeDialog,width:"530px",top:"20%","before-close":e.close},on:{"update:visible":function(t){e.changeDialog=t}}},[a("div",{staticClass:"group"},e._l(e.valiData,function(t,i){return t.noRender?e._e():a("LoginInput",{key:i,ref:"inp_"+i,refInFor:!0,attrs:{name:i,data:t},on:{imgClickHander:e.getImgCode,phoneClickHander:e.getPhoneCodeHander}})}),1),a("div",{staticClass:"dialog-footer tc",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(t){return e.save()}}},[e._v("确认")])],1)])],1)])},n=[];a.d(t,"a",function(){return i}),a.d(t,"b",function(){return n})},1064:function(e,t,a){"use strict";var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"comp-phone-check"},[a("div",{staticClass:"dialog"},[a("el-dialog",{attrs:{title:"验证",visible:e.detailDialog,width:"530px",top:"20%","before-close":e.close},on:{"update:visible":function(t){e.detailDialog=t}}},[a("div",{staticClass:"group"},[a("label",{staticClass:"ib"},[e._v("手机号：")]),a("span",{staticClass:"phone"},[e._v(e._s(e.phone))])]),a("div",{staticClass:"group"},e._l(e.valiData,function(t,i){return t.noRender?e._e():a("LoginInput",{key:i,ref:"inp_"+i,refInFor:!0,attrs:{name:i,data:t},on:{imgClickHander:e.getImgCode,phoneClickHander:e.getPhoneCodeHander}})}),1),a("div",{staticClass:"dialog-footer tc",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(t){return e.validate()}}},[e._v("验证")])],1)])],1)])},n=[];a.d(t,"a",function(){return i}),a.d(t,"b",function(){return n})},1065:function(e,t,a){"use strict";var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"comp-phone-change"},[a("div",{staticClass:"dialog"},[a("el-dialog",{attrs:{title:"修改密码",visible:e.passUpdateDialog,width:"600px",top:"20%","before-close":e.close},on:{"update:visible":function(t){e.passUpdateDialog=t}}},[a("div",{staticClass:"group"},[a("form",{ref:"form"},e._l(e.valiData,function(t,i){return a("LoginInput",{key:i,ref:"inp_"+i,refInFor:!0,attrs:{name:i,data:t},on:{imgClickHander:e.getImgCode,phoneClickHander:e.getPhoneCodeBackHander}})}),1)]),a("div",{staticClass:"dialog-footer tc",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{size:"small"},on:{click:function(t){return e.close()}}},[e._v("取消")]),a("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(t){return e.save()}}},[e._v("确认")])],1)])],1)])},n=[];a.d(t,"a",function(){return i}),a.d(t,"b",function(){return n})},437:function(e,t,a){"use strict";a.r(t);var i=a(1018),n=a(661);for(var s in n)"default"!==s&&function(e){a.d(t,e,function(){return n[e]})}(s);a(972);var r=a(0),o=Object(r.a)(n.default,i.a,i.b,!1,null,null,null);t.default=o.exports},455:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={methods:{isPass:function(){var e=this;return this.valiAll(),new Promise(function(t,a){var i={};for(var n in e.valiData)if(e.valiData.hasOwnProperty(n)){var s=e.valiData[n];s.isError&&(s.message=s.display,a(s)),i[n]=s.value}t(i)})},valiAll:function(){for(var e in this.$refs){if(this.$refs.hasOwnProperty(e)&&/^inp_/.test(e))this.$refs[e][0].vali()}},getImgCode:function(){var e=this;return this.$service.signin.codeImage().then(function(t){e.valiData.code_img.img_src=t.data.code_img,e.valiData.code_img.code_id_img=t.data.code_id})},getPhoneCodeHander:function(){var e=this;if(this.$refs.inp_phone[0].vali(),!this.valiData.phone||!this.valiData.phone.isError){var t={code_id_img:this.valiData.code_img.code_id_img,code_val_img:this.valiData.code_img.value,phone:this.valiData.phone.value,not_check_user_exist:1};this.$service.signin.codePhone(t).then(function(t){e.$message({type:"success",message:"短信发送成功!"}),e.valiData.code_id.value=t.data.code_id,e.$refs.inp_code_val[0].wait()}).catch(function(t){"图片验证码错误"===t.message?(e.valiData.code_img.isError=!0,e.$message({type:"error",message:"图片验证码错误!"})):(console.error(t),e.$message({type:"error",message:"短信发送失败! 请稍后再试"}))})}}}}},487:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.getTask=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},a=arguments[2];return e.size,e.size>=1048576?(t.is_chunk=!0,(0,i.request_post)("/common/api/files/upload_task?r="+Math.random(5)).then(function(n){if(n.status)return t.task_id=n.data.task_id,(0,i.request_file)("/common/api/files/upload",{file:e,data:t},a);throw new Error(n.messages)}).catch(function(e){throw new Error("上传失败")})):(t.is_chunk=!1,(0,i.request_file)("/common/api/files/upload",{file:e,data:t}))},t.getAppId=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,i.request_get)("/common/api/app/search_name",e).then(function(e){return n.default.app_id=e.data.id,sessionStorage.app_id=e.data.id,e})},t.getClientToken=function(){return(0,i.request_post)("/common/api/auth/token/pcclient")},t.platInfo=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,i.request_get)(o(e)).then(function(e){return n.default.app_id=e.data.id,sessionStorage.app_id=e.data.id,document.title=e.data.name,e})},t.commonPreview=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,i.request_get)(u(e))},t.getDefaultCover=function(){return(0,i.request_get)("/api/videos/images")},t.generate=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,i.request_post)("/common/api/qr_code/generate",e)},t.commonPreviewCode=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,i.request_post)("/api/preview",e)},t.getQrcode=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,i.request_get)("/common/api/get_qrcode",e)},t.synchronization=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,i.request_get)(c(e)).then(function(e){return e})},t.getAuthor=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,i.request_get)("/api/ecommerce/author",e)},t.addAuthor=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,i.request_post)("/api/ecommerce/author",e)},t.getWeixinConfig=function(e){return(0,i.request_get)("/common/api/third/wx_js_sdk/config",e)},t.getIndexInfo=function(){return(0,i.request_get)("/common/api/current")};r(a(26));var i=a(2),n=r(a(123)),s=r(a(6));function r(e){return e&&e.__esModule?e:{default:e}}s.default.compile("/common/api/files/upload_task/:id"),s.default.compile("/common/api/manager/managers/:id"),s.default.compile("/common/api/manager/roles/:id");var o=s.default.compile("/common/api/app/apps/:id"),c=s.default.compile("/common/api/dragon_infos/:id");var u=s.default.compile("/api/preview/:id")},661:function(e,t,a){"use strict";a.r(t);var i=a(662),n=a.n(i);for(var s in i)"default"!==s&&function(e){a.d(t,e,function(){return i[e]})}(s);t.default=n.a},662:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=s(a(960)),n=s(a(962));function s(e){return e&&e.__esModule?e:{default:e}}t.default={components:{Personal:i.default,Account:n.default},data:function(){return{navs:{personal:{name:"个人信息"},account:{name:"账户资料"}},infoType:"personal"}},methods:{changeKey:function(e){this.infoType=e}}}},663:function(e,t,a){"use strict";a.r(t);var i=a(664),n=a.n(i);for(var s in i)"default"!==s&&function(e){a.d(t,e,function(){return i[e]})}(s);t.default=n.a},664:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i,n=a(5),s=(i=n)&&i.__esModule?i:{default:i},r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var i in a)Object.prototype.hasOwnProperty.call(a,i)&&(e[i]=a[i])}return e},o=a(22),c=a(487);t.default={data:function(){return{isEdit:!1,previewImgUrl:null,info:{}}},computed:r({},(0,o.mapState)({user:function(e){return e.user}}),{isThridName:function(){return/^(qq_|weixin_|gli_oauth|sina_)/.test(this.user.name)}}),created:function(){this.info=r({},this.user)},methods:{save:function(){var e,t=this;return(e=s.default.mark(function e(){var a;return s.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!(a=t.$refs.file.files[0])){e.next=4;break}return e.next=4,(0,c.getTask)(a).then(function(e){t.info.picture=e.data.path});case 4:t.$service.user.changeUserInfo(t.info).then(function(e){t.$message.success("修改成功！"),t.$service.user.isLogin().then(function(e){t.$loginBackHander(e.data)})}).catch(function(e){t.info.nick_name.match("^S+[a-z A-Z]$")?t.$message.error("修改失败！"):t.$message.error("昵称不能为空！")});case 5:case"end":return e.stop()}},e,t)}),function(){var t=e.apply(this,arguments);return new Promise(function(e,a){return function i(n,s){try{var r=t[n](s),o=r.value}catch(e){return void a(e)}if(!r.done)return Promise.resolve(o).then(function(e){i("next",e)},function(e){i("throw",e)});e(o)}("next")})})()},reset:function(){this.info=r({},this.user),this.isEdit=!this.isEdit,this.previewImgUrl=null},previewImg:function(e){var t=e.target.files[0];this.imgFile=t,this.info.size=t.size,this.info.format=t.name.substr(t.name.lastIndexOf(".")+1),this.previewImgUrl=URL.createObjectURL(t)}}}},665:function(e,t,a){},666:function(e,t,a){"use strict";a.r(t);var i=a(667),n=a.n(i);for(var s in i)"default"!==s&&function(e){a.d(t,e,function(){return i[e]})}(s);t.default=n.a},667:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var i in a)Object.prototype.hasOwnProperty.call(a,i)&&(e[i]=a[i])}return e},n=a(22),s=u(a(963)),r=u(a(965)),o=u(a(967)),c=u(a(969));function u(e){return e&&e.__esModule?e:{default:e}}t.default={components:{PhoneCheck:s.default,PhoneChange:r.default,PasswordChange:o.default,PassUpdateByPhone:c.default},computed:i({},(0,n.mapState)({user:function(e){return e.user}})),data:function(){return{detailDialog:!1,changeDialog:!1,passDialog:!1,passUpdateDialog:!1}},methods:{phoneCheck:function(){this.changeDialog=!0},checkStatus:function(){this.detailDialog=!1,this.changeDialog=!0},passChange:function(){this.passDialog=!0},passUpdateChange:function(){this.passUpdateDialog=!0},change:function(){this.changeDialog=this.detailDialog=!1}}}},668:function(e,t,a){"use strict";a.r(t);var i=a(669),n=a.n(i);for(var s in i)"default"!==s&&function(e){a.d(t,e,function(){return i[e]})}(s);t.default=n.a},669:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i,n=a(455),s=(i=n)&&i.__esModule?i:{default:i};t.default={mixins:[s.default],props:["detailDialog","phone"],data:function(){return{valiData:{code_img:{display:"验证码错误",rules:"min_length(1)",cname:"验证码",type:"text",isCode:!0,isError:!1,value:"",img_src:"",code_id_img:""},code_val:{display:"短信错误",rules:"min_length(4)",cname:"短信验证",type:"text",isPhoneCode:!0,isError:!1,value:""},code_id:{value:"",noRender:!0}}}},mounted:function(){var e=this;this.$nextTick(function(){e.getImgCode()})},methods:{close:function(){this.$emit("update:detailDialog",!1)},validate:function(){var e=this;this.isPass().then(function(t){e.$service.signin.codeCheck({code_val:t.code_val,code_id:t.code_id}).then(function(t){e.$emit("status",t)}).catch(function(t){var a=t.payload;e.$message.error(a.message)})}).catch(function(t){e.$message.error(t)})},getPhoneCodeHander:function(){var e=this,t={code_id_img:this.valiData.code_img.code_id_img,code_val_img:this.valiData.code_img.value,phone:this.phone};this.$service.signin.codePhone(t).then(function(t){e.$message.success("短信发送成功"),e.valiData.code_id.value=t.data.code_id,e.$refs.inp_code_val[0].wait()}).catch(function(t){"图片验证码错误"===t.message?(e.valiData.code_img.isError=!0,e.$message.error("图片验证码错误!")):e.$message.error("短信发送失败! 请稍后再试")})}}}},670:function(e,t,a){},671:function(e,t,a){"use strict";a.r(t);var i=a(672),n=a.n(i);for(var s in i)"default"!==s&&function(e){a.d(t,e,function(){return i[e]})}(s);t.default=n.a},672:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=s(a(5)),n=s(a(455));function s(e){return e&&e.__esModule?e:{default:e}}t.default={mixins:[n.default],props:["changeDialog","phone"],data:function(){return{valiData:{phone:{display:"号码错误",rules:"is_phone",cname:"新手机号",type:"text",value:"",isError:!1},code_img:{display:"验证码错误",rules:"min_length(1)",cname:"验证码",type:"text",isCode:!0,isError:!1,value:"",img_src:"",code_id_img:""},code_val:{display:"短信错误",rules:"min_length(4)",cname:"短信验证",type:"text",isPhoneCode:!0,isError:!1,value:""},code_id:{value:"",noRender:!0}}}},mounted:function(){var e=this;this.$nextTick(function(){e.getImgCode()})},methods:{close:function(){this.$emit("update:changeDialog",!1)},save:function(){var e,t,a=this;this.isPass().then((e=i.default.mark(function e(t){var n;return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,a.$service.signin.codeCheck({code_val:t.code_val,code_id:t.code_id});case 3:return e.next=5,a.$service.user.changeUserInfo({phone:a.valiData.phone.value});case 5:return e.next=7,a.$service.user.isLogin().then(function(e){a.close(),a.$message.success("修改成功"),a.$loginBackHander(e.data)});case 7:e.next=13;break;case 9:e.prev=9,e.t0=e.catch(0),n=e.t0.payload,a.$message.error(n.message);case 13:case"end":return e.stop()}},e,a,[[0,9]])}),t=function(){var t=e.apply(this,arguments);return new Promise(function(e,a){return function i(n,s){try{var r=t[n](s),o=r.value}catch(e){return void a(e)}if(!r.done)return Promise.resolve(o).then(function(e){i("next",e)},function(e){i("throw",e)});e(o)}("next")})},function(e){return t.apply(this,arguments)})).catch(function(e){})}}}},673:function(e,t,a){},674:function(e,t,a){"use strict";a.r(t);var i=a(675),n=a.n(i);for(var s in i)"default"!==s&&function(e){a.d(t,e,function(){return i[e]})}(s);t.default=n.a},675:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=s(a(5)),n=s(a(455));function s(e){return e&&e.__esModule?e:{default:e}}t.default={mixins:[n.default],props:["passDialog"],data:function(){return{valiData:{oldPassword:{display:"密码不能小于6位",rules:"min_length(6)",cname:"原 密 码",type:"password",value:"",isError:!1},password:{display:"密码不能小于6位",rules:"min_length(6)",cname:"新 密 码",type:"password",value:"",isError:!1,id:"register_pwd"},repassword:{display:"两次密码不相等",rules:"same2(register_pwd)|min_length(1)",cname:"确认密码",type:"password",value:"",isError:!1}}}},methods:{close:function(){this.$emit("update:passDialog",!1)},save:function(){var e,t,a=this;this.isPass().then((e=i.default.mark(function e(t){return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,a.$service.signin.changePass({old_pass:t.oldPassword,new_pass:t.password,new_pass_confirm:t.repassword});case 2:return e.next=4,a.$service.user.isLogin().then(function(e){a.close(),a.$message.success("修改成功"),a.$loginBackHander(e.data)});case 4:case"end":return e.stop()}},e,a)}),t=function(){var t=e.apply(this,arguments);return new Promise(function(e,a){return function i(n,s){try{var r=t[n](s),o=r.value}catch(e){return void a(e)}if(!r.done)return Promise.resolve(o).then(function(e){i("next",e)},function(e){i("throw",e)});e(o)}("next")})},function(e){return t.apply(this,arguments)})).catch(function(e){a.$message.error(e)})}}}},676:function(e,t,a){},677:function(e,t,a){"use strict";a.r(t);var i=a(678),n=a.n(i);for(var s in i)"default"!==s&&function(e){a.d(t,e,function(){return i[e]})}(s);t.default=n.a},678:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=s(a(5)),n=s(a(455));function s(e){return e&&e.__esModule?e:{default:e}}t.default={mixins:[n.default],props:["passUpdateDialog"],data:function(){return{valiData:{code_img:{display:"验证码错误",rules:"min_length(1)",cname:"验证码",type:"text",isCode:!0,isError:!1,value:"",img_src:"",code_id_img:""},code_val:{display:"验证码错误",rules:"min_length(1)",cname:"短信验证",type:"text",isPhoneCode:!0,isError:!1,value:""},pass:{display:"密码过短",rules:"min_length(5)",cname:"新密码",type:"password",value:"",id:"lq_pwd_back_reset",isError:!1},pass_confirm:{display:"两次密码不相等",rules:"same2(lq_pwd_back_reset)|min_length(1)",cname:"确认密码",type:"password",value:"",isError:!1}}}},mounted:function(){this.getImgCode()},methods:{close:function(){this.$emit("update:passUpdateDialog",!1)},save:function(){var e,t,a=this;this.isPass().then((e=i.default.mark(function e(t){var n,s,r,o,c;return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(n=a.valiData.code_val,s=n.user_id,r=n.value,o=t.pass,c=t.pass_confirm,!s||!r){e.next=7;break}return e.next=5,a.$service.signin.pwdBackRestPwd({user_id:s,code_val:r,pass:o,pass_confirm:c});case 5:return e.next=7,a.$service.user.isLogin().then(function(e){a.close(),a.$message.success("修改成功"),a.$loginBackHander(e.data)});case 7:case"end":return e.stop()}},e,a)}),t=function(){var t=e.apply(this,arguments);return new Promise(function(e,a){return function i(n,s){try{var r=t[n](s),o=r.value}catch(e){return void a(e)}if(!r.done)return Promise.resolve(o).then(function(e){i("next",e)},function(e){i("throw",e)});e(o)}("next")})},function(e){return t.apply(this,arguments)})).catch(function(e){a.$message.error(e)})},getPhoneCodeBackHander:function(){var e=this;if(!this.$user||this.$user.phone){var t={user_name:this.$user.name,code_val:this.valiData.code_img.value,code_id:this.valiData.code_img.code_id_img};this.$service.signin.pwdBackPhoneCode(t).then(function(t){e.$message({type:"success",message:"已向账户:"+e.$user.name+"发送短信! 请注意查收!"}),e.valiData.code_val.user_id=t.data.user_id,e.$refs.inp_code_val[0].wait()}).catch(function(t){switch(console.error("短信发送错误",t),t.message){case"短信发送错误":e.valiData.code_img.isError=!0}e.$message({type:"error",message:t.message})})}else this.$message.warning("请绑定手机号！")}}}},679:function(e,t,a){},680:function(e,t,a){},681:function(e,t,a){},960:function(e,t,a){"use strict";a.r(t);var i=a(1055),n=a(663);for(var s in n)"default"!==s&&function(e){a.d(t,e,function(){return n[e]})}(s);a(961);var r=a(0),o=Object(r.a)(n.default,i.a,i.b,!1,null,null,null);t.default=o.exports},961:function(e,t,a){"use strict";var i=a(665);a.n(i).a},962:function(e,t,a){"use strict";a.r(t);var i=a(1048),n=a(666);for(var s in n)"default"!==s&&function(e){a.d(t,e,function(){return n[e]})}(s);a(971);var r=a(0),o=Object(r.a)(n.default,i.a,i.b,!1,null,null,null);t.default=o.exports},963:function(e,t,a){"use strict";a.r(t);var i=a(1064),n=a(668);for(var s in n)"default"!==s&&function(e){a.d(t,e,function(){return n[e]})}(s);a(964);var r=a(0),o=Object(r.a)(n.default,i.a,i.b,!1,null,null,null);t.default=o.exports},964:function(e,t,a){"use strict";var i=a(670);a.n(i).a},965:function(e,t,a){"use strict";a.r(t);var i=a(1063),n=a(671);for(var s in n)"default"!==s&&function(e){a.d(t,e,function(){return n[e]})}(s);a(966);var r=a(0),o=Object(r.a)(n.default,i.a,i.b,!1,null,null,null);t.default=o.exports},966:function(e,t,a){"use strict";var i=a(673);a.n(i).a},967:function(e,t,a){"use strict";a.r(t);var i=a(1061),n=a(674);for(var s in n)"default"!==s&&function(e){a.d(t,e,function(){return n[e]})}(s);a(968);var r=a(0),o=Object(r.a)(n.default,i.a,i.b,!1,null,null,null);t.default=o.exports},968:function(e,t,a){"use strict";var i=a(676);a.n(i).a},969:function(e,t,a){"use strict";a.r(t);var i=a(1065),n=a(677);for(var s in n)"default"!==s&&function(e){a.d(t,e,function(){return n[e]})}(s);a(970);var r=a(0),o=Object(r.a)(n.default,i.a,i.b,!1,null,null,null);t.default=o.exports},970:function(e,t,a){"use strict";var i=a(679);a.n(i).a},971:function(e,t,a){"use strict";var i=a(680);a.n(i).a},972:function(e,t,a){"use strict";var i=a(681);a.n(i).a}}]);