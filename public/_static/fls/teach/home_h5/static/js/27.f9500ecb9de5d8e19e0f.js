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
(window.webpackJsonp=window.webpackJsonp||[]).push([[27],{211:function(t,e,i){"use strict";i.r(e);var n=i(816),o=i(487);for(var r in o)"default"!==r&&function(t){i.d(e,t,function(){return o[t]})}(r);i(781);var s=i(0),a=Object(s.a)(o.default,n.a,n.b,!1,null,null,null);e.default=a.exports},221:function(t,e,i){"use strict";i.r(e);var n=i(222),o=i.n(n);for(var r in n)"default"!==r&&function(t){i.d(e,t,function(){return n[t]})}(r);e.default=o.a},222:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{hideBack:{},type:{},privateStyle:{},isRewrite:{type:Boolean,default:!1}},computed:{isShowSearch:function(){return!!this.isSearch},isShowBack:function(){return!this.hideBack}},methods:{goBack:function(){this.isRewrite?this.$emit("back"):this.$router.go(-1)},goSearch:function(){this.$router.push({name:"search"})},share:function(){}}}},223:function(t,e,i){},224:function(t,e,i){"use strict";i.r(e);var n=i(226),o=i(221);for(var r in o)"default"!==r&&function(t){i.d(e,t,function(){return o[t]})}(r);i(225);var s=i(0),a=Object(s.a)(o.default,n.a,n.b,!1,null,"bc7c4e9e",null);e.default=a.exports},225:function(t,e,i){"use strict";var n=i(223);i.n(n).a},226:function(t,e,i){"use strict";var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"header",style:t.privateStyle},[i("div",{staticClass:"header-left"},[t._t("left",[i("span",{staticClass:"icon-go-back icon-back",on:{click:t.goBack}})])],2),i("div",{staticClass:"header-center text-center"},[t._t("center")],2),i("div",{staticClass:"header-right text-right"},[t._t("right",["share"===t.type?i("span",{staticClass:"icon-share",on:{click:t.share}}):"search"===t.type?i("span",{staticClass:"icon-search_h",on:{click:t.goSearch}}):i("span",{staticClass:"placeholder"})])],2)])},o=[];i.d(e,"a",function(){return n}),i.d(e,"b",function(){return o})},227:function(t,e,i){"use strict";function n(t){return t&&"[object Array]"===Object.prototype.toString.call(t)}Object.defineProperty(e,"__esModule",{value:!0}),e.findItem=function(t,e){return e.filter(function(e){return e.id===t||e.children.some(function(e){return e.id===t})})},e.isArray=n,e.isEmptyObj=function(t){for(var e in t)return!1;return!0},e.getResource=function(t,e){var i={};return t&&e&&e.forEach(function(e){t.forEach(function(t){t.teaching_plan.forEach(function(t){t.teaching_plan_info.forEach(function(t){t.b_id===e.b_id&&(i[e.b_id]=t)})})})}),i},e.extract=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"reply";t.forEach(function(t){!function i(o){o.forEach(function(o){n(o[e])&&o[e].length>0&&i(o[e]),o.layer>2&&t[e].push(o)})}(t[e]),t[e].sort(function(t,e){return Date.parse(e.create_time)-Date.parse(t.create_time)})})},e.getInfoOfResource=function(t,e){var i={};return i.course_id=t.id,t.course_period_list&&t.course_period_list.forEach(function(t){t.teaching_plan&&t.teaching_plan.forEach(function(n){n.teaching_plan_info&&n.teaching_plan_info.forEach(function(o){o.id===e&&(i.course_hour_id=t.id,i.course_teaching_id=n.id,i.type=o.type)})})}),i.course_teaching_plan_id=e,i},e.getNextResource=function(t,e){var i={course_teaching_plan_id:-1},n=0;return t.course_period_list&&t.course_period_list.forEach(function(t){t.teaching_plan&&t.teaching_plan.forEach(function(o){o.teaching_plan_info&&o.teaching_plan_info.forEach(function(r){1!==n&&r.id!==e||(i.type=r.type,i.course_teaching_plan_id=r.id,i.course_teaching_id=o.id,i.course_hour_id=t.id),n=r.id===e?1:0})})}),i},e.getCurResource=function(t,e){var i={ids:{},data:null};return t.course_period_list&&t.course_period_list.forEach(function(n){n.teaching_plan&&n.teaching_plan.forEach(function(o){o.teaching_plan_info&&o.teaching_plan_info.forEach(function(r){r.id===e&&(i.data=r,i.ids={course_id:t.id,course_hour_id:n.id,course_plan_id:o.id,course_plan_info_id:r.id})})})}),i}},229:function(t,e,i){"use strict";var n=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var i=arguments[e];for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&(t[n]=i[n])}return t},o=u(i(235)),r=i(227),s=i(230),a=i(6),c=u(i(239));function u(t){return t&&t.__esModule?t:{default:t}}var d=new o.default({phone:{required:!0,length:11,message:{required:"请输入手机号",length:"手机号码长度应为11位"}}}),f={data:function(){return{img_code:{code_id:null,code_img:null},img_code_val:null,code_tip:"发送验证码",duration:60,timer:null}},methods:{getImgCode:function(){var t=this;this.$service.user.codeImage().then(function(e){t.img_code=e.data})},validatePhone:function(){var t=d.validate({phone:this.info.phone});return!(t.length>0)||(this.$Toast({message:t[0].toString()}),!1)},setTimer:function(){var t=this;if(null===this.timer){var e=this.duration;!function i(){t.code_tip=e+"秒后再试",e-- >0?t.timer=setTimeout(i,1e3):(t.code_tip="发送验证码",t.timer=null)}()}},sendCheckCode:function(){var t=this;null!==this.img_code_val?this.validatePhone()&&!this.timer&&this.$service.user.codePhone({phone:this.info.phone,code_id_img:this.img_code.code_id,code_val_img:this.img_code_val,not_check_user_exist:1}).then(function(e){t.$Toast({message:"发送成功",iconClass:"icon-toast icon-success"}),t.setTimer(),t.info.code_id=e.data.code_id}).catch(function(e){t.$Toast({iconClass:"icon-toast icon-failed",message:"发送失败"})}):this.$Toast({message:"请输入图片验证码"})}}},l={computed:n({},(0,a.mapState)("user",["userInfo"])),methods:n({},(0,a.mapMutations)("common",["setLoginLayer"]),{checkIsLogin:function(){return!!this.userInfo||(this.setLoginLayer(!0),!1)}})},h={data:function(){return{next:null}},computed:n({},(0,a.mapState)("course",["courseInfo","curResources"])),mounted:function(){this.next=(0,r.getNextResource)(JSON.parse(JSON.stringify(this.courseInfo)),this.curResources.id)}},_={computed:n({},(0,a.mapState)("course",{courseInfo:function(t){return t.courseInfo}}),(0,a.mapGetters)("course",["cItem"])),methods:n({},(0,a.mapMutations)("course",["SET_RESOURCE"]),{continueStudy:function(){var t=this.getCurrent();if(t){var e=t.data;this.SET_RESOURCE(e);switch(e.type){case 1:this.goReader(t);break;case 3:this.goPlayer("pic",t);break;case 4:this.goPlayer("audio",t);break;case 5:this.goPlayer("video",t)}}},goPlayer:function(t,e){var i=e.ids;this.$goByName(t,{query:n({},i)})},goReader:function(t,e){var i=this,o=e.ids,r=e.data;c.default.setItem("access_code",r.access_code).then(function(){i.$goByName("reader",{query:n({book_id:r.b_id,product_id:i.courseInfo.publish_id},o)})})},getCurrent:function(){return this.courseInfo.end_speed_info?(0,r.getCurResource)(JSON.parse(JSON.stringify(this.courseInfo)),this.courseInfo.end_speed_info.course_teaching_plan_id):this.cItem[0]}})},p={computed:n({},(0,a.mapState)("course",["courseInfo"])),methods:n({},(0,a.mapMutations)("course",["SET_RESOURCE"]),{viewResource:function(t){var e=(0,s.getRelatedRescourse)(JSON.parse(JSON.stringify(this.courseInfo)),t.b_id);switch(e.data&&this.SET_RESOURCE(e.data),e.data.type){case 1:this.goReader(e);break;case 3:this.goPlayer("pic",e);break;case 4:this.goPlayer("audio",e);break;case 5:this.goPlayer("video",e)}},goPlayer:function(t,e){var i=e.ids;this.$goByName(t,{query:n({},i)})},goReader:function(t){var e=this,i=t.ids,o=t.data;c.default.setItem("access_code",o.access_code).then(function(){e.$goByName("reader",{query:n({book_id:o.b_id,product_id:e.courseInfo.publish_id},i)})})}})},g={computed:n({},(0,a.mapState)("course",["courseInfo"])),beforeMount:function(){!this.courseInfo&&this.$route.query.cid&&this.SET_COURSE_INFO(this.$route.query.cid)},methods:n({},(0,a.mapActions)("course",["SET_COURSE_INFO"]))};t.exports={code:f,user:l,inputArea:{data:function(){return{isShowTextField:!1,commentList:[],word:"",myReply:null}},methods:{showTextField:function(){var t=this;this.$refs.layer.show(),this.$nextTick(function(){t.$refs.myInput.focus()})},hideTextField:function(t){this.isShowTextField=!1,this.initState()},initState:function(){this.word="",this.myph="发表评论",this.myReply=null}}},charEll:{data:function(){return{maxLength:46}},methods:{maxSlice:function(t){return"string"==typeof t&&t.length>this.maxLength?t.slice(0,this.maxLength)+"...":t}}},nextResource:h,continueStudy:_,releateToResource:p,CourseInfo:g}},230:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.getRelatedRescourse=function(t,e){var i={ids:{},data:null};return t.course_period_list&&t.course_period_list.forEach(function(n){n.teaching_plan&&n.teaching_plan.forEach(function(o){o.teaching_plan_info&&o.teaching_plan_info.forEach(function(r){r.b_id===e&&(i.ids={course_id:t.id,course_hour_id:n.id,course_plan_id:o.id,course_plan_info_id:r.id},i.data=r)})})}),i}},487:function(t,e,i){"use strict";i.r(e);var n=i(488),o=i.n(n);for(var r in n)"default"!==r&&function(t){i.d(e,t,function(){return n[t]})}(r);e.default=o.a},488:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n,o=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var i=arguments[e];for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&(t[n]=i[n])}return t},r=i(6),s=i(224),a=(n=s)&&n.__esModule?n:{default:n},c=i(229);e.default={asyncData:function(t){var e=t.store;t.route;return e.dispatch("course/GET_PAPER_LIST")},mixins:[c.CourseInfo],data:function(){return{isTest:!1}},components:{Head:a.default},computed:o({},(0,r.mapState)("course",{list:function(t){return t.examList}})),methods:o({},(0,r.mapMutations)("course",["SET_EXAM_LIST"]),{goToTest:function(t){var e="exam";"审评中"!==t.paper_status&&("查看成绩"===t.paper_status&&(e="result"),this.$router.push({path:e,query:{paper_id:t.id}}))},viewMyMistakes:function(){this.$router.push({path:"errorlist"})}})}},489:function(t,e,i){},781:function(t,e,i){"use strict";var n=i(489);i.n(n).a},816:function(t,e,i){"use strict";var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"pt88-static__vh main-color"},[i("Head",[i("p",{attrs:{slot:"center"},slot:"center"},[t._v("在线测评")])]),i("div",[i("div",{staticClass:"test-list"},t._l(t.list,function(e,n){return i("div",{staticClass:"test-item p3"},[i("div",{staticClass:"test-item__title"},[t._v(t._s(e.name))]),i("div",{staticClass:"flex flex-center-sb"},[i("p",[t._v("课时"+t._s(n+1))]),i("button",{staticClass:"circle",class:{"inline-btn":!t.isTest}},[i("span",{on:{click:function(i){return t.goToTest(e)}}},[t._v(t._s(e.paper_status))])])])])}),0),i("div",{staticClass:"line-part"}),i("div",{staticClass:"errors flex flex-center-sb",on:{click:t.viewMyMistakes}},[i("p",[t._v("历史错题集")]),i("span",{staticClass:"icon-enter"})])])],1)},o=[];i.d(e,"a",function(){return n}),i.d(e,"b",function(){return o})}}]);