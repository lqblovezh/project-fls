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
(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{209:function(t,e,n){"use strict";n.r(e);var i=n(819),o=n(481);for(var s in o)"default"!==s&&function(t){n.d(e,t,function(){return o[t]})}(s);n(779);var r=n(0),a=Object(r.a)(o.default,i.a,i.b,!1,null,"428fb0f5",null);e.default=a.exports},227:function(t,e,n){"use strict";function i(t){return t&&"[object Array]"===Object.prototype.toString.call(t)}Object.defineProperty(e,"__esModule",{value:!0}),e.findItem=function(t,e){return e.filter(function(e){return e.id===t||e.children.some(function(e){return e.id===t})})},e.isArray=i,e.isEmptyObj=function(t){for(var e in t)return!1;return!0},e.getResource=function(t,e){var n={};return t&&e&&e.forEach(function(e){t.forEach(function(t){t.teaching_plan.forEach(function(t){t.teaching_plan_info.forEach(function(t){t.b_id===e.b_id&&(n[e.b_id]=t)})})})}),n},e.extract=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"reply";t.forEach(function(t){!function n(o){o.forEach(function(o){i(o[e])&&o[e].length>0&&n(o[e]),o.layer>2&&t[e].push(o)})}(t[e]),t[e].sort(function(t,e){return Date.parse(e.create_time)-Date.parse(t.create_time)})})},e.getInfoOfResource=function(t,e){var n={};return n.course_id=t.id,t.course_period_list&&t.course_period_list.forEach(function(t){t.teaching_plan&&t.teaching_plan.forEach(function(i){i.teaching_plan_info&&i.teaching_plan_info.forEach(function(o){o.id===e&&(n.course_hour_id=t.id,n.course_teaching_id=i.id,n.type=o.type)})})}),n.course_teaching_plan_id=e,n},e.getNextResource=function(t,e){var n={course_teaching_plan_id:-1},i=0;return t.course_period_list&&t.course_period_list.forEach(function(t){t.teaching_plan&&t.teaching_plan.forEach(function(o){o.teaching_plan_info&&o.teaching_plan_info.forEach(function(s){1!==i&&s.id!==e||(n.type=s.type,n.course_teaching_plan_id=s.id,n.course_teaching_id=o.id,n.course_hour_id=t.id),i=s.id===e?1:0})})}),n},e.getCurResource=function(t,e){var n={ids:{},data:null};return t.course_period_list&&t.course_period_list.forEach(function(i){i.teaching_plan&&i.teaching_plan.forEach(function(o){o.teaching_plan_info&&o.teaching_plan_info.forEach(function(s){s.id===e&&(n.data=s,n.ids={course_id:t.id,course_hour_id:i.id,course_plan_id:o.id,course_plan_info_id:s.id})})})}),n}},228:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(t[i]=n[i])}return t},o=n(6);e.default={beforeRouteEnter:function(t,e,n){n(function(t){t.$store.commit("common/TOGGLE_LOADING",!0)})},methods:i({},(0,o.mapMutations)("common",["TOGGLE_LOADING"]))}},229:function(t,e,n){"use strict";var i=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(t[i]=n[i])}return t},o=u(n(235)),s=n(227),r=n(230),a=n(6),c=u(n(239));function u(t){return t&&t.__esModule?t:{default:t}}var d=new o.default({phone:{required:!0,length:11,message:{required:"请输入手机号",length:"手机号码长度应为11位"}}}),l={data:function(){return{img_code:{code_id:null,code_img:null},img_code_val:null,code_tip:"发送验证码",duration:60,timer:null}},methods:{getImgCode:function(){var t=this;this.$service.user.codeImage().then(function(e){t.img_code=e.data})},validatePhone:function(){var t=d.validate({phone:this.info.phone});return!(t.length>0)||(this.$Toast({message:t[0].toString()}),!1)},setTimer:function(){var t=this;if(null===this.timer){var e=this.duration;!function n(){t.code_tip=e+"秒后再试",e-- >0?t.timer=setTimeout(n,1e3):(t.code_tip="发送验证码",t.timer=null)}()}},sendCheckCode:function(){var t=this;null!==this.img_code_val?this.validatePhone()&&!this.timer&&this.$service.user.codePhone({phone:this.info.phone,code_id_img:this.img_code.code_id,code_val_img:this.img_code_val,not_check_user_exist:1}).then(function(e){t.$Toast({message:"发送成功",iconClass:"icon-toast icon-success"}),t.setTimer(),t.info.code_id=e.data.code_id}).catch(function(e){t.$Toast({iconClass:"icon-toast icon-failed",message:"发送失败"})}):this.$Toast({message:"请输入图片验证码"})}}},f={computed:i({},(0,a.mapState)("user",["userInfo"])),methods:i({},(0,a.mapMutations)("common",["setLoginLayer"]),{checkIsLogin:function(){return!!this.userInfo||(this.setLoginLayer(!0),!1)}})},h={data:function(){return{next:null}},computed:i({},(0,a.mapState)("course",["courseInfo","curResources"])),mounted:function(){this.next=(0,s.getNextResource)(JSON.parse(JSON.stringify(this.courseInfo)),this.curResources.id)}},_={computed:i({},(0,a.mapState)("course",{courseInfo:function(t){return t.courseInfo}}),(0,a.mapGetters)("course",["cItem"])),methods:i({},(0,a.mapMutations)("course",["SET_RESOURCE"]),{continueStudy:function(){var t=this.getCurrent();if(t){var e=t.data;this.SET_RESOURCE(e);switch(e.type){case 1:this.goReader(t);break;case 3:this.goPlayer("pic",t);break;case 4:this.goPlayer("audio",t);break;case 5:this.goPlayer("video",t)}}},goPlayer:function(t,e){var n=e.ids;this.$goByName(t,{query:i({},n)})},goReader:function(t,e){var n=this,o=e.ids,s=e.data;c.default.setItem("access_code",s.access_code).then(function(){n.$goByName("reader",{query:i({book_id:s.b_id,product_id:n.courseInfo.publish_id},o)})})},getCurrent:function(){return this.courseInfo.end_speed_info?(0,s.getCurResource)(JSON.parse(JSON.stringify(this.courseInfo)),this.courseInfo.end_speed_info.course_teaching_plan_id):this.cItem[0]}})},p={computed:i({},(0,a.mapState)("course",["courseInfo"])),methods:i({},(0,a.mapMutations)("course",["SET_RESOURCE"]),{viewResource:function(t){var e=(0,r.getRelatedRescourse)(JSON.parse(JSON.stringify(this.courseInfo)),t.b_id);switch(e.data&&this.SET_RESOURCE(e.data),e.data.type){case 1:this.goReader(e);break;case 3:this.goPlayer("pic",e);break;case 4:this.goPlayer("audio",e);break;case 5:this.goPlayer("video",e)}},goPlayer:function(t,e){var n=e.ids;this.$goByName(t,{query:i({},n)})},goReader:function(t){var e=this,n=t.ids,o=t.data;c.default.setItem("access_code",o.access_code).then(function(){e.$goByName("reader",{query:i({book_id:o.b_id,product_id:e.courseInfo.publish_id},n)})})}})},m={computed:i({},(0,a.mapState)("course",["courseInfo"])),beforeMount:function(){!this.courseInfo&&this.$route.query.cid&&this.SET_COURSE_INFO(this.$route.query.cid)},methods:i({},(0,a.mapActions)("course",["SET_COURSE_INFO"]))};t.exports={code:l,user:f,inputArea:{data:function(){return{isShowTextField:!1,commentList:[],word:"",myReply:null}},methods:{showTextField:function(){var t=this;this.$refs.layer.show(),this.$nextTick(function(){t.$refs.myInput.focus()})},hideTextField:function(t){this.isShowTextField=!1,this.initState()},initState:function(){this.word="",this.myph="发表评论",this.myReply=null}}},charEll:{data:function(){return{maxLength:46}},methods:{maxSlice:function(t){return"string"==typeof t&&t.length>this.maxLength?t.slice(0,this.maxLength)+"...":t}}},nextResource:h,continueStudy:_,releateToResource:p,CourseInfo:m}},230:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.getRelatedRescourse=function(t,e){var n={ids:{},data:null};return t.course_period_list&&t.course_period_list.forEach(function(i){i.teaching_plan&&i.teaching_plan.forEach(function(o){o.teaching_plan_info&&o.teaching_plan_info.forEach(function(s){s.b_id===e&&(n.ids={course_id:t.id,course_hour_id:i.id,course_plan_id:o.id,course_plan_info_id:s.id},n.data=s)})})}),n}},231:function(t,e,n){"use strict";n.r(e);var i=n(232),o=n.n(i);for(var s in i)"default"!==s&&function(t){n.d(e,t,function(){return i[t]})}(s);e.default=o.a},232:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{hideBack:{},type:{},privateStyle:{},isRewrite:{type:Boolean,default:!1}},computed:{isShowSearch:function(){return!!this.isSearch},isShowBack:function(){return!this.hideBack}},methods:{goBack:function(){this.isRewrite?this.$emit("back"):this.$router.go(-1)},goSearch:function(){this.$router.push({name:"search"})},share:function(){}}}},233:function(t,e,n){},244:function(t,e,n){"use strict";n.r(e);var i=n(250),o=n(231);for(var s in o)"default"!==s&&function(t){n.d(e,t,function(){return o[t]})}(s);n(245);var r=n(0),a=Object(r.a)(o.default,i.a,i.b,!1,null,"4fe4bede",null);e.default=a.exports},245:function(t,e,n){"use strict";var i=n(233);n.n(i).a},246:function(t,e,n){"use strict";n.r(e);var i=n(247),o=n.n(i);for(var s in i)"default"!==s&&function(t){n.d(e,t,function(){return i[t]})}(s);e.default=o.a},247:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};e.default={props:["myProps"],data:function(){return{isShowTextField:!1,word:""}},methods:{showTextField:function(){var t=this;this.isShowTextField=!0,this.$nextTick(function(){t.$refs.myInput.focus()})},hideTextField:function(t){("symbol"==(void 0===t?"undefined":i(t))||t.target.classList.contains("layer")||t.target.classList.contains("icon-close"))&&(this.isShowTextField=!1,this.word="",this.myProps&&this.myProps.init&&this.myProps.init())},send:function(){this.$emit("sendMethod",this.word),this.hideTextField(Symbol("close"))}}}},248:function(t,e,n){},250:function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"header",style:t.privateStyle},[n("div",{staticClass:"header-left"},[t._t("left",[n("span",{staticClass:"icon-go-back icon-back",on:{click:t.goBack}})])],2),n("div",{staticClass:"header-center text-center"},[t._t("center")],2),n("div",{staticClass:"header-right text-right"},[t._t("right",["share"===t.type?n("span",{staticClass:"icon-share",on:{click:t.share}}):"search"===t.type?n("span",{staticClass:"icon-search_h",on:{click:t.goSearch}}):n("span",{staticClass:"placeholder"})])],2)])},o=[];n.d(e,"a",function(){return i}),n.d(e,"b",function(){return o})},268:function(t,e,n){"use strict";n.r(e);var i=n(273),o=n(246);for(var s in o)"default"!==s&&function(t){n.d(e,t,function(){return o[t]})}(s);n(269);var r=n(0),a=Object(r.a)(o.default,i.a,i.b,!1,null,"f9e88ada",null);e.default=a.exports},269:function(t,e,n){"use strict";var i=n(248);n.n(i).a},273:function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.isShowTextField?n("div",{staticClass:"full-layer__fixed",on:{click:function(e){return t.hideTextField(e)}}},[n("div",{staticClass:"fixed-bottom ui-textarea c-bg-f"},[n("div",{staticClass:"ui-textarea__body"},[n("p",{staticClass:"text-right"},[n("span",{staticClass:"icon-close",on:{click:function(e){return t.hideTextField(e)}}})]),n("textarea",{directives:[{name:"model",rawName:"v-model",value:t.word,expression:"word"}],ref:"myInput",attrs:{placeholder:t.myProps&&t.myProps.placeholder||"发表评论",rows:"5"},domProps:{value:t.word},on:{input:function(e){e.target.composing||(t.word=e.target.value)}}})]),n("div",{staticClass:"ui-textarea__bottom flex flex-sb"},[t._m(0),n("a",{on:{click:t.send}},[t._v("发布")])])])]):t._e()},o=[function(){var t=this.$createElement,e=this._self._c||t;return e("button",[e("span",{staticClass:"icon-img"})])}];n.d(e,"a",function(){return i}),n.d(e,"b",function(){return o})},481:function(t,e,n){"use strict";n.r(e);var i=n(482),o=n.n(i);for(var s in i)"default"!==s&&function(t){n.d(e,t,function(){return i[t]})}(s);e.default=o.a},482:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=l(n(5)),o=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(t[i]=n[i])}return t},s=n(6),r=l(n(244)),a=l(n(268)),c=n(227),u=n(229),d=l(n(228));function l(t){return t&&t.__esModule?t:{default:t}}function f(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return Array.from(t)}function h(t){return function(){var e=t.apply(this,arguments);return new Promise(function(t,n){return function i(o,s){try{var r=e[o](s),a=r.value}catch(t){return void n(t)}if(!r.done)return Promise.resolve(a).then(function(t){i("next",t)},function(t){i("throw",t)});t(a)}("next")})}}e.default={mixins:[u.CourseInfo,d.default],data:function(){return{list:[],myProps:{placeholder:"发表评论",init:this.initState},myReply:{},page:{pageStart:0,pageOffset:6}}},components:{Head:r.default,TextInput:a.default},mounted:function(){var t=this;return h(i.default.mark(function e(){return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:t.getList().finally(t.TOGGLE_LOADING(!1));case 1:case"end":return e.stop()}},e,t)}))()},computed:o({},(0,s.mapState)("user",["userInfo"]),{courseId:function(){return this.$route.params.course_id}}),methods:{getList:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:function(){};return h(i.default.mark(function n(){var s,r,a;return i.default.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,t.$service.message.getComment(o({course_id:t.courseId},t.page));case 3:if(s=n.sent,r=s.data,a=s.page,!r){n.next=14;break}(0,c.extract)(r,"reply"),t.addProperty(r),t.list=[].concat(f(t.list),f(r)),t.page.pageStart=t.list.length,e(t.list.length===a.total),n.next=15;break;case 14:throw new Error("接口返回的数据类型错误！");case 15:n.next=20;break;case 17:n.prev=17,n.t0=n.catch(0),console.error("[discuss getlist] "+n.t0.toString());case 20:return n.prev=20,t.TOGGLE_LOADING(!1),n.finish(20);case 23:case"end":return n.stop()}},n,t,[[0,17,20,23]])}))()},reset:function(){this.list=[],this.page.pageStart=0},addProperty:function(t){t.forEach(function(t){t.expand=!1})},initState:function(){this.myProps.placeholder="发表评论",this.myReply={}},replyUser:function(t){this.myProps.placeholder="回复 "+t.user_name+"：",this.myReply={pid:t.id},this.showField()},sendComment:function(t){var e=this;this.$service.message.sendComment(o({},this.myReply,{course_id:this.courseId,content:t})).then(function(t){e.reset(),e.getList(),e.$refs.myInput.hideTextField(Symbol("close"))}).catch(console.error)},delComment:function(t){var e=this;this.$MessageBox.confirm("确认删除？").then(function(n){e.$service.message.delComment({id:t}).then(function(t){e.getList(function(){},!0)}).catch(console.error)}).catch(function(t){})},giveLike:function(t){this.$service.message.giveLike({comment_id:t.id}).then(function(e){e.data.state?(++t.praise_count,t.praise_state=!0):(--t.praise_count,t.praise_state=!1)}).catch(console.error)},showField:function(){this.$refs.myInput.showTextField()},toggleRestComment:function(t){t.expand=!t.expand}}}},483:function(t,e,n){},779:function(t,e,n){"use strict";var i=n(483);n.n(i).a},819:function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("Head",{attrs:{type:"share"}},[n("p",{attrs:{slot:"center"},slot:"center"},[t._v("学习讨论")])]),n("Scroll",{attrs:{top:"0.88rem",bottom:"1rem"},on:{loadMore:t.getList}},t._l(t.list,function(e){return n("section",[n("img",{attrs:{src:e.picture}}),n("div",{staticClass:"dis-content"},[n("div",{staticClass:"dis-content__bar flex flex-center-sb"},[n("p",[t._v(t._s(e.user_name))]),n("span",{directives:[{name:"show",rawName:"v-show",value:e.user_id===t.userInfo.id,expression:"comment.user_id===userInfo.id"}],staticClass:"icon-trash__a",on:{click:function(n){return t.delComment(e.id)}}})]),n("div",{staticClass:"dis-content__detail"},[n("p",[t._v(t._s(e.content))]),n("a",{directives:[{name:"show",rawName:"v-show",value:e.reply.length>0&&!e.expand,expression:"comment.reply.length > 0 && !comment.expand"}],on:{click:function(n){return t.toggleRestComment(e)}}},[t._v("查看全部"+t._s(e.reply.length)+"条回复")])]),n("div",{staticClass:"dis-content__actions flex flex-center-sb",class:{bordered:e.expand}},[n("p",[t._v(t._s(e.create_time))]),n("p",{staticClass:"dis-content__right"},[n("span",{staticClass:"icon-comment",on:{click:function(n){return t.replyUser(e)}}}),n("span",{class:[e.praise_state?"icon-good_active":"icon-good"],on:{click:function(n){return t.giveLike(e)}}}),n("span",{staticClass:"dis-content__num"},[t._v(t._s(e.praise_count))])])]),t._l(e.reply,function(i){return e.expand?n("section",[n("img",{attrs:{src:i.picture}}),n("div",{staticClass:"dis-content"},[n("div",{staticClass:"dis-content__bar"},[t._v(t._s(i.user_name)),n("span",{staticClass:"icon-right-rect"}),t._v(t._s(i.to_user_name))]),n("div",{staticClass:"dis-content__detail"},[n("p",[t._v(t._s(i.content))])]),n("div",{staticClass:"dis-content__actions flex flex-center-sb"},[n("p",[t._v(t._s(i.create_time))]),n("p",{staticClass:"dis-content__right"},[n("span",{staticClass:"icon-comment",on:{click:function(e){return t.replyUser(i)}}}),n("span",{class:[i.praise_state?"icon-good_active":"icon-good"],on:{click:function(e){return t.giveLike(i)}}}),n("span",{staticClass:"dis-content__num"},[t._v(t._s(i.praise_count))])])])])]):t._e()}),n("a",{directives:[{name:"show",rawName:"v-show",value:e.expand,expression:"comment.expand"}],staticClass:"btn-closed",on:{click:function(n){return t.toggleRestComment(e)}}},[t._v("收起"),n("div",{staticClass:"icon icon-retract"})])],2)])}),0),n("div",{staticClass:"fixed-bottom ui-textarea c-bg-f"},[n("div",{staticClass:"xt-textarea__bottom"},[t._m(0),n("p",{staticClass:"txt",on:{click:t.showField}},[t._v("发表评论")]),n("a",[t._v("发布")])])]),n("TextInput",{ref:"myInput",attrs:{myProps:t.myProps},on:{sendMethod:t.sendComment,init:t.initState}})],1)},o=[function(){var t=this.$createElement,e=this._self._c||t;return e("button",[e("span",{staticClass:"icon-img"})])}];n.d(e,"a",function(){return i}),n.d(e,"b",function(){return o})}}]);