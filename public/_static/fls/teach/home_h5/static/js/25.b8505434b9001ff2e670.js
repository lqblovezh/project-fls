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
(window.webpackJsonp=window.webpackJsonp||[]).push([[25],{210:function(t,e,i){"use strict";i.r(e);var n=i(817),s=i(484);for(var o in s)"default"!==o&&function(t){i.d(e,t,function(){return s[t]})}(o);i(780);var a=i(0),r=Object(a.a)(s.default,n.a,n.b,!1,null,"3b3d59c2",null);e.default=r.exports},221:function(t,e,i){"use strict";i.r(e);var n=i(222),s=i.n(n);for(var o in n)"default"!==o&&function(t){i.d(e,t,function(){return n[t]})}(o);e.default=s.a},222:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{hideBack:{},type:{},privateStyle:{},isRewrite:{type:Boolean,default:!1}},computed:{isShowSearch:function(){return!!this.isSearch},isShowBack:function(){return!this.hideBack}},methods:{goBack:function(){this.isRewrite?this.$emit("back"):this.$router.go(-1)},goSearch:function(){this.$router.push({name:"search"})},share:function(){}}}},223:function(t,e,i){},224:function(t,e,i){"use strict";i.r(e);var n=i(226),s=i(221);for(var o in s)"default"!==o&&function(t){i.d(e,t,function(){return s[t]})}(o);i(225);var a=i(0),r=Object(a.a)(s.default,n.a,n.b,!1,null,"bc7c4e9e",null);e.default=r.exports},225:function(t,e,i){"use strict";var n=i(223);i.n(n).a},226:function(t,e,i){"use strict";var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"header",style:t.privateStyle},[i("div",{staticClass:"header-left"},[t._t("left",[i("span",{staticClass:"icon-go-back icon-back",on:{click:t.goBack}})])],2),i("div",{staticClass:"header-center text-center"},[t._t("center")],2),i("div",{staticClass:"header-right text-right"},[t._t("right",["share"===t.type?i("span",{staticClass:"icon-share",on:{click:t.share}}):"search"===t.type?i("span",{staticClass:"icon-search_h",on:{click:t.goSearch}}):i("span",{staticClass:"placeholder"})])],2)])},s=[];i.d(e,"a",function(){return n}),i.d(e,"b",function(){return s})},227:function(t,e,i){"use strict";function n(t){return t&&"[object Array]"===Object.prototype.toString.call(t)}Object.defineProperty(e,"__esModule",{value:!0}),e.findItem=function(t,e){return e.filter(function(e){return e.id===t||e.children.some(function(e){return e.id===t})})},e.isArray=n,e.isEmptyObj=function(t){for(var e in t)return!1;return!0},e.getResource=function(t,e){var i={};return t&&e&&e.forEach(function(e){t.forEach(function(t){t.teaching_plan.forEach(function(t){t.teaching_plan_info.forEach(function(t){t.b_id===e.b_id&&(i[e.b_id]=t)})})})}),i},e.extract=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"reply";t.forEach(function(t){!function i(s){s.forEach(function(s){n(s[e])&&s[e].length>0&&i(s[e]),s.layer>2&&t[e].push(s)})}(t[e]),t[e].sort(function(t,e){return Date.parse(e.create_time)-Date.parse(t.create_time)})})},e.getInfoOfResource=function(t,e){var i={};return i.course_id=t.id,t.course_period_list&&t.course_period_list.forEach(function(t){t.teaching_plan&&t.teaching_plan.forEach(function(n){n.teaching_plan_info&&n.teaching_plan_info.forEach(function(s){s.id===e&&(i.course_hour_id=t.id,i.course_teaching_id=n.id,i.type=s.type)})})}),i.course_teaching_plan_id=e,i},e.getNextResource=function(t,e){var i={course_teaching_plan_id:-1},n=0;return t.course_period_list&&t.course_period_list.forEach(function(t){t.teaching_plan&&t.teaching_plan.forEach(function(s){s.teaching_plan_info&&s.teaching_plan_info.forEach(function(o){1!==n&&o.id!==e||(i.type=o.type,i.course_teaching_plan_id=o.id,i.course_teaching_id=s.id,i.course_hour_id=t.id),n=o.id===e?1:0})})}),i},e.getCurResource=function(t,e){var i={ids:{},data:null};return t.course_period_list&&t.course_period_list.forEach(function(n){n.teaching_plan&&n.teaching_plan.forEach(function(s){s.teaching_plan_info&&s.teaching_plan_info.forEach(function(o){o.id===e&&(i.data=o,i.ids={course_id:t.id,course_hour_id:n.id,course_plan_id:s.id,course_plan_info_id:o.id})})})}),i}},229:function(t,e,i){"use strict";var n=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var i=arguments[e];for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&(t[n]=i[n])}return t},s=u(i(235)),o=i(227),a=i(230),r=i(6),c=u(i(239));function u(t){return t&&t.__esModule?t:{default:t}}var d=new s.default({phone:{required:!0,length:11,message:{required:"请输入手机号",length:"手机号码长度应为11位"}}}),l={data:function(){return{img_code:{code_id:null,code_img:null},img_code_val:null,code_tip:"发送验证码",duration:60,timer:null}},methods:{getImgCode:function(){var t=this;this.$service.user.codeImage().then(function(e){t.img_code=e.data})},validatePhone:function(){var t=d.validate({phone:this.info.phone});return!(t.length>0)||(this.$Toast({message:t[0].toString()}),!1)},setTimer:function(){var t=this;if(null===this.timer){var e=this.duration;!function i(){t.code_tip=e+"秒后再试",e-- >0?t.timer=setTimeout(i,1e3):(t.code_tip="发送验证码",t.timer=null)}()}},sendCheckCode:function(){var t=this;null!==this.img_code_val?this.validatePhone()&&!this.timer&&this.$service.user.codePhone({phone:this.info.phone,code_id_img:this.img_code.code_id,code_val_img:this.img_code_val,not_check_user_exist:1}).then(function(e){t.$Toast({message:"发送成功",iconClass:"icon-toast icon-success"}),t.setTimer(),t.info.code_id=e.data.code_id}).catch(function(e){t.$Toast({iconClass:"icon-toast icon-failed",message:"发送失败"})}):this.$Toast({message:"请输入图片验证码"})}}},f={computed:n({},(0,r.mapState)("user",["userInfo"])),methods:n({},(0,r.mapMutations)("common",["setLoginLayer"]),{checkIsLogin:function(){return!!this.userInfo||(this.setLoginLayer(!0),!1)}})},h={data:function(){return{next:null}},computed:n({},(0,r.mapState)("course",["courseInfo","curResources"])),mounted:function(){this.next=(0,o.getNextResource)(JSON.parse(JSON.stringify(this.courseInfo)),this.curResources.id)}},_={computed:n({},(0,r.mapState)("course",{courseInfo:function(t){return t.courseInfo}}),(0,r.mapGetters)("course",["cItem"])),methods:n({},(0,r.mapMutations)("course",["SET_RESOURCE"]),{continueStudy:function(){var t=this.getCurrent();if(t){var e=t.data;this.SET_RESOURCE(e);switch(e.type){case 1:this.goReader(t);break;case 3:this.goPlayer("pic",t);break;case 4:this.goPlayer("audio",t);break;case 5:this.goPlayer("video",t)}}},goPlayer:function(t,e){var i=e.ids;this.$goByName(t,{query:n({},i)})},goReader:function(t,e){var i=this,s=e.ids,o=e.data;c.default.setItem("access_code",o.access_code).then(function(){i.$goByName("reader",{query:n({book_id:o.b_id,product_id:i.courseInfo.publish_id},s)})})},getCurrent:function(){return this.courseInfo.end_speed_info?(0,o.getCurResource)(JSON.parse(JSON.stringify(this.courseInfo)),this.courseInfo.end_speed_info.course_teaching_plan_id):this.cItem[0]}})},p={computed:n({},(0,r.mapState)("course",["courseInfo"])),methods:n({},(0,r.mapMutations)("course",["SET_RESOURCE"]),{viewResource:function(t){var e=(0,a.getRelatedRescourse)(JSON.parse(JSON.stringify(this.courseInfo)),t.b_id);switch(e.data&&this.SET_RESOURCE(e.data),e.data.type){case 1:this.goReader(e);break;case 3:this.goPlayer("pic",e);break;case 4:this.goPlayer("audio",e);break;case 5:this.goPlayer("video",e)}},goPlayer:function(t,e){var i=e.ids;this.$goByName(t,{query:n({},i)})},goReader:function(t){var e=this,i=t.ids,s=t.data;c.default.setItem("access_code",s.access_code).then(function(){e.$goByName("reader",{query:n({book_id:s.b_id,product_id:e.courseInfo.publish_id},i)})})}})},g={computed:n({},(0,r.mapState)("course",["courseInfo"])),beforeMount:function(){!this.courseInfo&&this.$route.query.cid&&this.SET_COURSE_INFO(this.$route.query.cid)},methods:n({},(0,r.mapActions)("course",["SET_COURSE_INFO"]))};t.exports={code:l,user:f,inputArea:{data:function(){return{isShowTextField:!1,commentList:[],word:"",myReply:null}},methods:{showTextField:function(){var t=this;this.$refs.layer.show(),this.$nextTick(function(){t.$refs.myInput.focus()})},hideTextField:function(t){this.isShowTextField=!1,this.initState()},initState:function(){this.word="",this.myph="发表评论",this.myReply=null}}},charEll:{data:function(){return{maxLength:46}},methods:{maxSlice:function(t){return"string"==typeof t&&t.length>this.maxLength?t.slice(0,this.maxLength)+"...":t}}},nextResource:h,continueStudy:_,releateToResource:p,CourseInfo:g}},230:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.getRelatedRescourse=function(t,e){var i={ids:{},data:null};return t.course_period_list&&t.course_period_list.forEach(function(n){n.teaching_plan&&n.teaching_plan.forEach(function(s){s.teaching_plan_info&&s.teaching_plan_info.forEach(function(o){o.b_id===e&&(i.ids={course_id:t.id,course_hour_id:n.id,course_plan_id:s.id,course_plan_info_id:o.id},i.data=o)})})}),i}},484:function(t,e,i){"use strict";i.r(e);var n=i(485),s=i.n(n);for(var o in n)"default"!==o&&function(t){i.d(e,t,function(){return n[t]})}(o);e.default=s.a},485:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n,s=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var i=arguments[e];for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&(t[n]=i[n])}return t},o=i(224),a=(n=o)&&n.__esModule?n:{default:n},r=i(229);e.default={mixins:[r.inputArea],data:function(){return{list:null,sendOpts:{}}},components:{Head:a.default},mounted:function(){this.getList()},methods:{getList:function(){var t=this;this.sendOpts.course_id=this.$route.params.course_id,this.sendOpts.to_user_id=this.$route.query.teacher_id,this.$service.message.getTeacherAnswer({to_user_id:this.sendOpts.to_user_id,course_id:this.sendOpts.course_id}).then(function(e){t.list=e.data}).catch(console.error)},sendQuestion:function(){var t=this;this.sendOpts.title&&this.sendOpts.content?this.$service.message.sendMsg(s({},this.sendOpts,{type:"answering_question"})).then(function(e){t.hideTextField(Symbol("close")),t.sendOpts={},t.getList()}).catch(console.error):this.$Toast("提问和内容不能为空")},delMyQuestion:function(t){var e=this;this.$MessageBox.confirm("确认删除？").then(function(i){e.$service.message.delMsg({id:t.id}).then(function(t){e.getList()}).catch(console.warn)}).catch(function(t){})}}}},486:function(t,e,i){},780:function(t,e,i){"use strict";var n=i(486);i.n(n).a},817:function(t,e,i){"use strict";var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"pt88"},[i("Head",{attrs:{type:"share"}},[i("p",{attrs:{slot:"center"},slot:"center"},[t._v("教师答疑")])]),i("div",{staticClass:"container"},t._l(t.list,function(e){return i("div",{staticClass:"ta-item"},[i("div",{staticClass:"ta-question"},[i("div",{staticClass:"ta-question__title"},[i("p",[t._v(t._s(e.title))]),i("span",{staticClass:"icon-trash__a",on:{click:function(i){return t.delMyQuestion(e)}}})]),i("div",{staticClass:"ta-question__detail"},[t._v(t._s(e.content))]),i("div",{staticClass:"time"},[t._v(t._s(e.create_time))])]),t._l(e.reply,function(e){return i("section",{staticClass:"ta-answer"},[i("img",{attrs:{src:e.from_user_picture}}),i("div",{staticClass:"ta-content"},[i("div",{staticClass:"ta-content__bar"},[t._v(t._s(e.from_user_name)),i("span",{staticClass:"icon-teacher__label"})]),i("div",{staticClass:"ta-content__txt"},[t._v(t._s(e.content))]),i("div",{staticClass:"time"},[t._v(t._s(e.create_time))]),i("a",[t._v("查看全部")])])])})],2)}),0),i("div",{staticClass:"fixed-bottom ui-textarea c-bg-f"},[i("div",{staticClass:"ui-textarea__bottom flex flex-center-sb"},[t._m(0),i("p",{staticClass:"txt ib f15",on:{click:function(e){return t.$refs.layer.show()}}},[t._v("发表提问")]),i("a",{staticClass:"ib"},[t._v("提问")])])]),i("ui-fixed-layer",{ref:"layer"},[i("div",{staticClass:"fixed-bottom ui-textarea c-bg-f"},[i("div",{staticClass:"ui-textarea__body p20"},[i("p",{staticClass:"text-right"},[i("span",{staticClass:"icon-close__a",on:{click:function(e){return t.$refs.layer.hide()}}})]),i("input",{directives:[{name:"model",rawName:"v-model",value:t.sendOpts.title,expression:"sendOpts.title"}],staticClass:"qt f14",attrs:{type:"text",placeholder:"提问标题"},domProps:{value:t.sendOpts.title},on:{input:function(e){e.target.composing||t.$set(t.sendOpts,"title",e.target.value)}}}),i("textarea",{directives:[{name:"model",rawName:"v-model",value:t.sendOpts.content,expression:"sendOpts.content"}],ref:"myInput",staticClass:"f15 reset-bo c-3",attrs:{placeholder:"发表提问",rows:"5"},domProps:{value:t.sendOpts.content},on:{input:function(e){e.target.composing||t.$set(t.sendOpts,"content",e.target.value)}}})]),i("div",{staticClass:"ui-textarea__bottom flex flex-center-sb"},[i("button",{staticClass:"parent-bg reset-bo"},[i("span",{staticClass:"icon-img"})]),i("a",{staticClass:"ib",on:{click:t.sendQuestion}},[t._v("提问")])])])])],1)},s=[function(){var t=this.$createElement,e=this._self._c||t;return e("button",{staticClass:"parent-bg reset-bo"},[e("span",{staticClass:"icon-img"})])}];i.d(e,"a",function(){return n}),i.d(e,"b",function(){return s})}}]);