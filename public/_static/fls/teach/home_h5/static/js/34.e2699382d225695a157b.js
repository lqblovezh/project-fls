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
(window.webpackJsonp=window.webpackJsonp||[]).push([[34],{218:function(t,e,n){"use strict";n.r(e);var i=n(807),c=n(525);for(var r in c)"default"!==r&&function(t){n.d(e,t,function(){return c[t]})}(r);n(800);var o=n(0),a=Object(o.a)(c.default,i.a,i.b,!1,null,"74ae34c5",null);e.default=a.exports},221:function(t,e,n){"use strict";n.r(e);var i=n(222),c=n.n(i);for(var r in i)"default"!==r&&function(t){n.d(e,t,function(){return i[t]})}(r);e.default=c.a},222:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{hideBack:{},type:{},privateStyle:{},isRewrite:{type:Boolean,default:!1}},computed:{isShowSearch:function(){return!!this.isSearch},isShowBack:function(){return!this.hideBack}},methods:{goBack:function(){this.isRewrite?this.$emit("back"):this.$router.go(-1)},goSearch:function(){this.$router.push({name:"search"})},share:function(){}}}},223:function(t,e,n){},224:function(t,e,n){"use strict";n.r(e);var i=n(226),c=n(221);for(var r in c)"default"!==r&&function(t){n.d(e,t,function(){return c[t]})}(r);n(225);var o=n(0),a=Object(o.a)(c.default,i.a,i.b,!1,null,"bc7c4e9e",null);e.default=a.exports},225:function(t,e,n){"use strict";var i=n(223);n.n(i).a},226:function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"header",style:t.privateStyle},[n("div",{staticClass:"header-left"},[t._t("left",[n("span",{staticClass:"icon-go-back icon-back",on:{click:t.goBack}})])],2),n("div",{staticClass:"header-center text-center"},[t._t("center")],2),n("div",{staticClass:"header-right text-right"},[t._t("right",["share"===t.type?n("span",{staticClass:"icon-share",on:{click:t.share}}):"search"===t.type?n("span",{staticClass:"icon-search_h",on:{click:t.goSearch}}):n("span",{staticClass:"placeholder"})])],2)])},c=[];n.d(e,"a",function(){return i}),n.d(e,"b",function(){return c})},227:function(t,e,n){"use strict";function i(t){return t&&"[object Array]"===Object.prototype.toString.call(t)}Object.defineProperty(e,"__esModule",{value:!0}),e.findItem=function(t,e){return e.filter(function(e){return e.id===t||e.children.some(function(e){return e.id===t})})},e.isArray=i,e.isEmptyObj=function(t){for(var e in t)return!1;return!0},e.getResource=function(t,e){var n={};return t&&e&&e.forEach(function(e){t.forEach(function(t){t.teaching_plan.forEach(function(t){t.teaching_plan_info.forEach(function(t){t.b_id===e.b_id&&(n[e.b_id]=t)})})})}),n},e.extract=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"reply";t.forEach(function(t){!function n(c){c.forEach(function(c){i(c[e])&&c[e].length>0&&n(c[e]),c.layer>2&&t[e].push(c)})}(t[e]),t[e].sort(function(t,e){return Date.parse(e.create_time)-Date.parse(t.create_time)})})},e.getInfoOfResource=function(t,e){var n={};return n.course_id=t.id,t.course_period_list&&t.course_period_list.forEach(function(t){t.teaching_plan&&t.teaching_plan.forEach(function(i){i.teaching_plan_info&&i.teaching_plan_info.forEach(function(c){c.id===e&&(n.course_hour_id=t.id,n.course_teaching_id=i.id,n.type=c.type)})})}),n.course_teaching_plan_id=e,n},e.getNextResource=function(t,e){var n={course_teaching_plan_id:-1},i=0;return t.course_period_list&&t.course_period_list.forEach(function(t){t.teaching_plan&&t.teaching_plan.forEach(function(c){c.teaching_plan_info&&c.teaching_plan_info.forEach(function(r){1!==i&&r.id!==e||(n.type=r.type,n.course_teaching_plan_id=r.id,n.course_teaching_id=c.id,n.course_hour_id=t.id),i=r.id===e?1:0})})}),n},e.getCurResource=function(t,e){var n={ids:{},data:null};return t.course_period_list&&t.course_period_list.forEach(function(i){i.teaching_plan&&i.teaching_plan.forEach(function(c){c.teaching_plan_info&&c.teaching_plan_info.forEach(function(r){r.id===e&&(n.data=r,n.ids={course_id:t.id,course_hour_id:i.id,course_plan_id:c.id,course_plan_info_id:r.id})})})}),n}},525:function(t,e,n){"use strict";n.r(e);var i=n(526),c=n.n(i);for(var r in i)"default"!==r&&function(t){n.d(e,t,function(){return i[t]})}(r);e.default=c.a},526:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i,c=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(t[i]=n[i])}return t},r=n(6),o=n(224),a=(i=o)&&i.__esModule?i:{default:i},s=n(227);e.default={data:function(){return{isScale:!1,canDrag:!1,x0:0,y0:0,x1:0,y1:0,style:null}},computed:c({},(0,r.mapState)("course",["curResources","courseInfo"])),components:{Head:a.default},methods:{scale:function(){this.isScale=!this.isScale,this.style=null},start:function(t){1==t.touches.length&&this.isScale&&(this.canDrag=!0,this.x0=t.touches[0].clientX,this.y0=t.touches[0].clientY)},stop:function(t){this.canDrag=!1},move:function(t){if(this.canDrag){this.x1=t.touches[0].clientX,this.y1=t.touches[0].clientY;var e=this.x1-this.x0,n=this.y1-this.y0,i=this.$refs.myImg;this.style="left:"+(i.offsetLeft+e)+"px;top:"+(i.offsetTop+n)+"px",this.x0=this.x1,this.y0=this.y1}},back:function(){this.$router.go(-1)}},beforeRouteLeave:function(t,e,n){var i=(0,s.getInfoOfResource)(this.courseInfo,this.curResources.id);this.$service.course.leaveVideoPonit(c({},i,{course_time:(Date.now()-this.$parent.startTime)/1e3,resource_time:1})).then(function(t){n()}),n()}}},527:function(t,e,n){},800:function(t,e,n){"use strict";var i=n(527);n.n(i).a},807:function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("Head",[n("p",{attrs:{slot:"center"},slot:"center"},[t._v(t._s(t.curResources.name))]),n("p",{attrs:{slot:"right"},slot:"right"})]),n("div",{staticClass:"picLayer"},[n("div",{staticClass:"imgLayer",class:{scaleTo:t.isScale}},[n("img",{ref:"myImg",style:t.style,attrs:{src:t.curResources.preview_path},on:{dblclick:t.scale,touchstart:t.start,touchend:t.stop,touchmove:t.move}})])])],1)},c=[];n.d(e,"a",function(){return i}),n.d(e,"b",function(){return c})}}]);