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
(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{213:function(t,e,n){"use strict";n.r(e);var i=n(813),s=n(498);for(var r in s)"default"!==r&&function(t){n.d(e,t,function(){return s[t]})}(r);n(793);var a=n(0),o=Object(a.a)(s.default,i.a,i.b,!1,null,"5c74b116",null);e.default=o.exports},221:function(t,e,n){"use strict";n.r(e);var i=n(222),s=n.n(i);for(var r in i)"default"!==r&&function(t){n.d(e,t,function(){return i[t]})}(r);e.default=s.a},222:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{hideBack:{},type:{},privateStyle:{},isRewrite:{type:Boolean,default:!1}},computed:{isShowSearch:function(){return!!this.isSearch},isShowBack:function(){return!this.hideBack}},methods:{goBack:function(){this.isRewrite?this.$emit("back"):this.$router.go(-1)},goSearch:function(){this.$router.push({name:"search"})},share:function(){}}}},223:function(t,e,n){},224:function(t,e,n){"use strict";n.r(e);var i=n(226),s=n(221);for(var r in s)"default"!==r&&function(t){n.d(e,t,function(){return s[t]})}(r);n(225);var a=n(0),o=Object(a.a)(s.default,i.a,i.b,!1,null,"bc7c4e9e",null);e.default=o.exports},225:function(t,e,n){"use strict";var i=n(223);n.n(i).a},226:function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"header",style:t.privateStyle},[n("div",{staticClass:"header-left"},[t._t("left",[n("span",{staticClass:"icon-go-back icon-back",on:{click:t.goBack}})])],2),n("div",{staticClass:"header-center text-center"},[t._t("center")],2),n("div",{staticClass:"header-right text-right"},[t._t("right",["share"===t.type?n("span",{staticClass:"icon-share",on:{click:t.share}}):"search"===t.type?n("span",{staticClass:"icon-search_h",on:{click:t.goSearch}}):n("span",{staticClass:"placeholder"})])],2)])},s=[];n.d(e,"a",function(){return i}),n.d(e,"b",function(){return s})},227:function(t,e,n){"use strict";function i(t){return t&&"[object Array]"===Object.prototype.toString.call(t)}Object.defineProperty(e,"__esModule",{value:!0}),e.findItem=function(t,e){return e.filter(function(e){return e.id===t||e.children.some(function(e){return e.id===t})})},e.isArray=i,e.isEmptyObj=function(t){for(var e in t)return!1;return!0},e.getResource=function(t,e){var n={};return t&&e&&e.forEach(function(e){t.forEach(function(t){t.teaching_plan.forEach(function(t){t.teaching_plan_info.forEach(function(t){t.b_id===e.b_id&&(n[e.b_id]=t)})})})}),n},e.extract=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"reply";t.forEach(function(t){!function n(s){s.forEach(function(s){i(s[e])&&s[e].length>0&&n(s[e]),s.layer>2&&t[e].push(s)})}(t[e]),t[e].sort(function(t,e){return Date.parse(e.create_time)-Date.parse(t.create_time)})})},e.getInfoOfResource=function(t,e){var n={};return n.course_id=t.id,t.course_period_list&&t.course_period_list.forEach(function(t){t.teaching_plan&&t.teaching_plan.forEach(function(i){i.teaching_plan_info&&i.teaching_plan_info.forEach(function(s){s.id===e&&(n.course_hour_id=t.id,n.course_teaching_id=i.id,n.type=s.type)})})}),n.course_teaching_plan_id=e,n},e.getNextResource=function(t,e){var n={course_teaching_plan_id:-1},i=0;return t.course_period_list&&t.course_period_list.forEach(function(t){t.teaching_plan&&t.teaching_plan.forEach(function(s){s.teaching_plan_info&&s.teaching_plan_info.forEach(function(r){1!==i&&r.id!==e||(n.type=r.type,n.course_teaching_plan_id=r.id,n.course_teaching_id=s.id,n.course_hour_id=t.id),i=r.id===e?1:0})})}),n},e.getCurResource=function(t,e){var n={ids:{},data:null};return t.course_period_list&&t.course_period_list.forEach(function(i){i.teaching_plan&&i.teaching_plan.forEach(function(s){s.teaching_plan_info&&s.teaching_plan_info.forEach(function(r){r.id===e&&(n.data=r,n.ids={course_id:t.id,course_hour_id:i.id,course_plan_id:s.id,course_plan_info_id:r.id})})})}),n}},229:function(t,e,n){"use strict";var i=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(t[i]=n[i])}return t},s=u(n(235)),r=n(227),a=n(230),o=n(6),c=u(n(239));function u(t){return t&&t.__esModule?t:{default:t}}var l=new s.default({phone:{required:!0,length:11,message:{required:"请输入手机号",length:"手机号码长度应为11位"}}}),f={data:function(){return{img_code:{code_id:null,code_img:null},img_code_val:null,code_tip:"发送验证码",duration:60,timer:null}},methods:{getImgCode:function(){var t=this;this.$service.user.codeImage().then(function(e){t.img_code=e.data})},validatePhone:function(){var t=l.validate({phone:this.info.phone});return!(t.length>0)||(this.$Toast({message:t[0].toString()}),!1)},setTimer:function(){var t=this;if(null===this.timer){var e=this.duration;!function n(){t.code_tip=e+"秒后再试",e-- >0?t.timer=setTimeout(n,1e3):(t.code_tip="发送验证码",t.timer=null)}()}},sendCheckCode:function(){var t=this;null!==this.img_code_val?this.validatePhone()&&!this.timer&&this.$service.user.codePhone({phone:this.info.phone,code_id_img:this.img_code.code_id,code_val_img:this.img_code_val,not_check_user_exist:1}).then(function(e){t.$Toast({message:"发送成功",iconClass:"icon-toast icon-success"}),t.setTimer(),t.info.code_id=e.data.code_id}).catch(function(e){t.$Toast({iconClass:"icon-toast icon-failed",message:"发送失败"})}):this.$Toast({message:"请输入图片验证码"})}}},d={computed:i({},(0,o.mapState)("user",["userInfo"])),methods:i({},(0,o.mapMutations)("common",["setLoginLayer"]),{checkIsLogin:function(){return!!this.userInfo||(this.setLoginLayer(!0),!1)}})},_={data:function(){return{next:null}},computed:i({},(0,o.mapState)("course",["courseInfo","curResources"])),mounted:function(){this.next=(0,r.getNextResource)(JSON.parse(JSON.stringify(this.courseInfo)),this.curResources.id)}},h={computed:i({},(0,o.mapState)("course",{courseInfo:function(t){return t.courseInfo}}),(0,o.mapGetters)("course",["cItem"])),methods:i({},(0,o.mapMutations)("course",["SET_RESOURCE"]),{continueStudy:function(){var t=this.getCurrent();if(t){var e=t.data;this.SET_RESOURCE(e);switch(e.type){case 1:this.goReader(t);break;case 3:this.goPlayer("pic",t);break;case 4:this.goPlayer("audio",t);break;case 5:this.goPlayer("video",t)}}},goPlayer:function(t,e){var n=e.ids;this.$goByName(t,{query:i({},n)})},goReader:function(t,e){var n=this,s=e.ids,r=e.data;c.default.setItem("access_code",r.access_code).then(function(){n.$goByName("reader",{query:i({book_id:r.b_id,product_id:n.courseInfo.publish_id},s)})})},getCurrent:function(){return this.courseInfo.end_speed_info?(0,r.getCurResource)(JSON.parse(JSON.stringify(this.courseInfo)),this.courseInfo.end_speed_info.course_teaching_plan_id):this.cItem[0]}})},p={computed:i({},(0,o.mapState)("course",["courseInfo"])),methods:i({},(0,o.mapMutations)("course",["SET_RESOURCE"]),{viewResource:function(t){var e=(0,a.getRelatedRescourse)(JSON.parse(JSON.stringify(this.courseInfo)),t.b_id);switch(e.data&&this.SET_RESOURCE(e.data),e.data.type){case 1:this.goReader(e);break;case 3:this.goPlayer("pic",e);break;case 4:this.goPlayer("audio",e);break;case 5:this.goPlayer("video",e)}},goPlayer:function(t,e){var n=e.ids;this.$goByName(t,{query:i({},n)})},goReader:function(t){var e=this,n=t.ids,s=t.data;c.default.setItem("access_code",s.access_code).then(function(){e.$goByName("reader",{query:i({book_id:s.b_id,product_id:e.courseInfo.publish_id},n)})})}})},v={computed:i({},(0,o.mapState)("course",["courseInfo"])),beforeMount:function(){!this.courseInfo&&this.$route.query.cid&&this.SET_COURSE_INFO(this.$route.query.cid)},methods:i({},(0,o.mapActions)("course",["SET_COURSE_INFO"]))};t.exports={code:f,user:d,inputArea:{data:function(){return{isShowTextField:!1,commentList:[],word:"",myReply:null}},methods:{showTextField:function(){var t=this;this.$refs.layer.show(),this.$nextTick(function(){t.$refs.myInput.focus()})},hideTextField:function(t){this.isShowTextField=!1,this.initState()},initState:function(){this.word="",this.myph="发表评论",this.myReply=null}}},charEll:{data:function(){return{maxLength:46}},methods:{maxSlice:function(t){return"string"==typeof t&&t.length>this.maxLength?t.slice(0,this.maxLength)+"...":t}}},nextResource:_,continueStudy:h,releateToResource:p,CourseInfo:v}},230:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.getRelatedRescourse=function(t,e){var n={ids:{},data:null};return t.course_period_list&&t.course_period_list.forEach(function(i){i.teaching_plan&&i.teaching_plan.forEach(function(s){s.teaching_plan_info&&s.teaching_plan_info.forEach(function(r){r.b_id===e&&(n.ids={course_id:t.id,course_hour_id:i.id,course_plan_id:s.id,course_plan_info_id:r.id},n.data=r)})})}),n}},498:function(t,e,n){"use strict";n.r(e);var i=n(499),s=n.n(i);for(var r in i)"default"!==r&&function(t){n.d(e,t,function(){return i[t]})}(r);e.default=s.a},499:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=l(n(5)),s=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(t[i]=n[i])}return t},r=n(6),a=l(n(224)),o=l(n(787)),c=l(n(789)),u=l(n(791));function l(t){return t&&t.__esModule?t:{default:t}}function f(t){return function(){var e=t.apply(this,arguments);return new Promise(function(t,n){return function i(s,r){try{var a=e[s](r),o=a.value}catch(t){return void n(t)}if(!a.done)return Promise.resolve(o).then(function(t){i("next",t)},function(t){i("throw",t)});t(o)}("next")})}}e.default={asyncData:function(t){var e=t.store,n=t.route.params.course_id;return e.dispatch("course/GET_PAPER_LIST",n)},data:function(){return{questions:[],single:["A","B","C","D"],info:{},list:null}},components:{Head:a.default,xtChoice:o.default,xtSub:c.default,xtJudge:u.default},mounted:function(){var t=this;return f(i.default.mark(function e(){var n;return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,t.$service.course.getExercise({id:t.$route.query.paper_id});case 3:n=e.sent,t.list=n.data,e.next=11;break;case 7:e.prev=7,e.t0=e.catch(0),t.$Toast({message:"获取试题失败"}),t.$router.go(-1);case 11:case"end":return e.stop()}},e,t,[[0,7]])}))()},computed:s({},(0,r.mapState)("course",{examList:function(t){return t.examList||[]},courseInfo:function(t){return t.courseInfo||{}}}),{intro:function(){var t=this;return this.examList&&this.examList.filter(function(e){return e.id===t.$route.query.paper_id})[0]||{}},totalScore:function(){var t=0;return this.list&&this.list.forEach(function(e){t+=e.account}),t},total:function(){return this.getTotalScore(this.list)}}),methods:{errorHandler:function(t){var e=this;return f(i.default.mark(function t(){return i.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",e.$MessageBox.confirm("获取信息错误").finally(function(){e.$router.go(-1)}));case 1:case"end":return t.stop()}},t,e)}))()},getTotalScore:function(t){return 0},sendRedoRequest:function(){var t=this;this.$service.course.rePaper({id:this.$route.query.paper_id}).then(function(e){t.$router.replace({name:"exam",query:{paper_id:e.data.id},params:{course_id:t.$route.params.course_id}})}).catch(console.warn)}}}},500:function(t,e,n){"use strict";n.r(e);var i=n(501),s=n.n(i);for(var r in i)"default"!==r&&function(t){n.d(e,t,function(){return i[t]})}(r);e.default=s.a},501:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(t[i]=n[i])}return t},s=n(6),r=n(227),a=n(229);e.default={mixins:[a.releateToResource],props:["question"],data:function(){return{single:["A","B","C","D"],resource:null}},mounted:function(){this.resource=this.courseInfo&&JSON.parse(JSON.stringify((0,r.getResource)(this.courseInfo.course_period_list,this.question.tp_constitute_info_array)))},computed:i({},(0,s.mapState)("course",["courseInfo"]),{isRight:function(){return 2===this.question.status},isError:function(){return 4===this.question.status}}),methods:{}}},502:function(t,e,n){},503:function(t,e,n){"use strict";n.r(e);var i=n(504),s=n.n(i);for(var r in i)"default"!==r&&function(t){n.d(e,t,function(){return i[t]})}(r);e.default=s.a},504:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(t[i]=n[i])}return t},s=n(6),r=n(227),a=n(229);e.default={mixins:[a.releateToResource],props:["question"],data:function(){return{resource:null}},computed:i({},(0,s.mapState)("course",["courseInfo"])),mounted:function(){this.resource=this.courseInfo&&JSON.parse(JSON.stringify((0,r.getResource)(this.courseInfo.course_period_list,this.question.tp_constitute_info_array)))},methods:{}}},505:function(t,e,n){},506:function(t,e,n){"use strict";n.r(e);var i=n(507),s=n.n(i);for(var r in i)"default"!==r&&function(t){n.d(e,t,function(){return i[t]})}(r);e.default=s.a},507:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(t[i]=n[i])}return t},s=n(6),r=n(227),a=n(229);e.default={mixins:[a.releateToResource],props:["question"],data:function(){return{single:["A","B"],resource:null}},mounted:function(){this.resource=this.courseInfo&&JSON.parse(JSON.stringify((0,r.getResource)(this.courseInfo.course_period_list,this.question.tp_constitute_info_array)))},computed:i({},(0,s.mapState)("course",["courseInfo"]),{isError:function(){return 4===this.question.status},isRight:function(){return 2===this.question.status}}),methods:{},filters:{formatAnswer:function(t){return t?"正确":"错误"}}}},508:function(t,e,n){},509:function(t,e,n){},787:function(t,e,n){"use strict";n.r(e);var i=n(874),s=n(500);for(var r in s)"default"!==r&&function(t){n.d(e,t,function(){return s[t]})}(r);n(788);var a=n(0),o=Object(a.a)(s.default,i.a,i.b,!1,null,"0ce3206e",null);e.default=o.exports},788:function(t,e,n){"use strict";var i=n(502);n.n(i).a},789:function(t,e,n){"use strict";n.r(e);var i=n(875),s=n(503);for(var r in s)"default"!==r&&function(t){n.d(e,t,function(){return s[t]})}(r);n(790);var a=n(0),o=Object(a.a)(s.default,i.a,i.b,!1,null,"8feebccc",null);e.default=o.exports},790:function(t,e,n){"use strict";var i=n(505);n.n(i).a},791:function(t,e,n){"use strict";n.r(e);var i=n(876),s=n(506);for(var r in s)"default"!==r&&function(t){n.d(e,t,function(){return s[t]})}(r);n(792);var a=n(0),o=Object(a.a)(s.default,i.a,i.b,!1,null,"745ce91c",null);e.default=o.exports},792:function(t,e,n){"use strict";var i=n(508);n.n(i).a},793:function(t,e,n){"use strict";var i=n(509);n.n(i).a},813:function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("Head",{attrs:{isSearch:"true"}},[n("p",{attrs:{slot:"center"},slot:"center"},[t._v("在线测评")])]),n("div",{staticClass:"pt88"},[n("div",{staticClass:"select-release"},[t._v("版本："),n("p",{staticClass:"select-box"},[n("select",[n("option",[t._v(t._s(t.intro.create_time))])])])]),n("h4",{staticClass:"text-center"},[t._v(t._s(t.intro.name))]),n("div",{staticClass:"test-info"},[n("p",[t._v("总分："),n("span",[t._v(t._s(t.intro.score))])]),n("p",[t._v("得分："),n("span",{staticClass:"lightOrange"},[t._v(t._s(t.totalScore))])]),n("p",[t._v("阅卷人："),n("span",[t._v(t._s(t.courseInfo.teach_user&&t.courseInfo.teach_user.nick_name))])])]),n("p",{staticClass:"test-advice"},[t._v("阅卷人留言："),n("span",[t._v(t._s(t.intro.message))])]),n("div",{staticClass:"exam-content"},t._l(t.list,function(e,i){return n("div",[n("p",{staticClass:"exam-title"},[n("span",{staticClass:"type"},[t._v(t._s(++i)+".【"+t._s(e.type_name)+"】")]),n("span",{staticClass:"score"},[t._v("("+t._s(e.score)+"分)")])]),n("p",{staticClass:"exam-title__detail",domProps:{innerHTML:t._s(e.question)}}),n("p"),"single"===e.type||"multi"===e.type?n("div",{staticClass:"exam-main"},[n("xtChoice",{attrs:{question:e}})],1):"judgment"===e.type?n("div",{staticClass:"exam-main"},[n("xtJudge",{attrs:{question:e}})],1):n("xtSub",{attrs:{question:e}})],1)}),0)]),n("p",{staticClass:"text-center redo"},[n("button",{on:{click:t.sendRedoRequest}},[t._v("重做评测")])])],1)},s=[];n.d(e,"a",function(){return i}),n.d(e,"b",function(){return s})},874:function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"cq"},[n("div",{staticClass:"cq-answer"},t._l(t.question.option,function(e,i){return n("div",{staticClass:"cq-choice"},[n("span",{staticClass:"cq-choice__item",class:{"exam-select__item-active":t.question.user_answer.indexOf(t.single[i])>-1}},[t._v(t._s(t.single[i]))]),t._v(t._s(e.title))])}),0),n("div",{staticClass:"cq-analysis"},[n("div",{staticClass:"analysis-right"},[n("p",{class:{error:t.isError}},[n("span",{staticClass:"icon",class:{"icon-error":t.isError,"icon-right":t.isRight}}),t._v(t._s(t.isRight?"选择正确":"选择错误"))]),n("p",[t._v("本题正确答案为："+t._s(t.question.answer))])]),n("div",{staticClass:"analysis-content"},[t._v("解析："),n("div",{staticClass:"gray",domProps:{innerHTML:t._s(t.question.analysis)}})]),n("div",{directives:[{name:"show",rawName:"v-show",value:t.question.tp_constitute_info_array.length,expression:"question.tp_constitute_info_array.length"}],staticClass:"analysis-link"},[t._v("课时计划链接："),t._l(t.question.tp_constitute_info_array,function(e){return n("span",{on:{click:function(n){return t.viewResource(e)}}},[t._v(t._s(e.period_info)+"/"+t._s(e.teaching_plan_info)+"/"+t._s(e.resource_name))])})],2)])])},s=[];n.d(e,"a",function(){return i}),n.d(e,"b",function(){return s})},875:function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"cq"},[n("div",{staticClass:"cq-analysis"},[n("div",{staticClass:"analysis-right"},[t._v("得分："),n("span",{staticClass:"orange"},[t._v(t._s(t.question.score)+"分")])]),n("div",{staticClass:"analysis-content"},[t._v("你的答案："),n("span",{staticClass:"normal-black"},[t._v(t._s(t.question.user_answer))])]),n("div",{staticClass:"analysis-img"},[n("img",{attrs:{src:t.question.img}})]),n("div",{directives:[{name:"show",rawName:"v-show",value:t.question.teach_answer,expression:"question.teach_answer"}],staticClass:"analysis-content"},[t._v("教师回答："),n("span",{staticClass:"normal-black"},[t._v(t._s(t.question.teach_answer))])]),n("div",{staticClass:"analysis-content"},[t._v("解析："),n("div",{staticClass:"gray",domProps:{innerHTML:t._s(t.question.analysis)}})]),n("div",{directives:[{name:"show",rawName:"v-show",value:t.question.tp_constitute_info_array.length,expression:"question.tp_constitute_info_array.length"}],staticClass:"analysis-link"},[t._v("课时计划链接："),t._l(t.question.tp_constitute_info_array,function(e){return n("span",{on:{click:function(n){return t.viewResource(e)}}},[t._v(t._s(e.period_info)+"/"+t._s(e.teaching_plan_info)+"/"+t._s(e.resource_name))])})],2)])])},s=[];n.d(e,"a",function(){return i}),n.d(e,"b",function(){return s})},876:function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"cq"},[n("div",{staticClass:"cq-answer"},[n("div",{staticClass:"cq-choice"},[n("span",{staticClass:"cq-choice__item",class:{"exam-select__item-active":t.question.user_answer===t.question.answer}},[t._v("A")]),t._v("正确")]),n("div",{staticClass:"cq-choice"},[n("span",{staticClass:"cq-choice__item",class:{"exam-select__item-active":t.question.user_answer!==t.question.answer}},[t._v("B")]),t._v("错误")])]),n("div",{staticClass:"cq-analysis"},[n("div",{staticClass:"analysis-right"},[n("p",{class:{error:t.isError}},[n("span",{staticClass:"icon",class:{"icon-error":t.isError,"icon-right":t.isRight}}),t._v(t._s(t.isRight?"选择正确":"选择错误"))]),n("p",[t._v("本题正确答案为："+t._s(t._f("formatAnswer")(t.question.answer)))])]),n("div",{staticClass:"analysis-content"},[t._v("解析："),n("div",{staticClass:"gray",domProps:{innerHTML:t._s(t.question.analysis)}})]),n("div",{directives:[{name:"show",rawName:"v-show",value:t.question.tp_constitute_info_array.length,expression:"question.tp_constitute_info_array.length"}],staticClass:"analysis-link"},[t._v("课时计划链接："),t._l(t.question.tp_constitute_info_array,function(e){return n("span",{on:{click:function(n){return t.viewResource(e)}}},[t._v(t._s(e.period_info)+"/"+t._s(e.teaching_plan_info)+"/"+t._s(e.resource_name))])})],2)])])},s=[];n.d(e,"a",function(){return i}),n.d(e,"b",function(){return s})}}]);