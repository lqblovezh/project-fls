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
(window.webpackJsonp=window.webpackJsonp||[]).push([[54],{217:function(t,e,i){"use strict";i.r(e);var r=i(808),n=i(522);for(var u in n)"default"!==u&&function(t){i.d(e,t,function(){return n[t]})}(u);i(799);var s=i(0),a=Object(s.a)(n.default,r.a,r.b,!1,null,null,null);e.default=a.exports},522:function(t,e,i){"use strict";i.r(e);var r=i(523),n=i.n(r);for(var u in r)"default"!==u&&function(t){i.d(e,t,function(){return r[t]})}(u);e.default=n.a},523:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var i=arguments[e];for(var r in i)Object.prototype.hasOwnProperty.call(i,r)&&(t[r]=i[r])}return t},n=i(6);e.default={asyncData:function(t){var e=t.store,i=t.route;return e.dispatch("course/INIT",i.query)},data:function(){return{startTime:Date.now(),timer:null,calculate_timer:null,time:0}},computed:r({},(0,n.mapState)("course",["examList","courseInfo","ids","curResources"]),(0,n.mapGetters)("course",["courseMedia"])),mounted:function(){this.setTimer()},beforeRouteLeave:function(t,e,i){this.timer&&(clearTimeout(this.timer),this.timer=null),this.calculate_timer&&(clearTimeout(this.calculate_timer),this.calculate_timer=null),i()},methods:{setCalcuateTimer:function(){var t=this;this.calculate_timer=setTimeout(function(){t.time-- >0&&t.setCalcuateTimer()},1e3)},setTimer:function(){var t=this.courseMedia,e=t.pItem,i=t.pItemList;if(e&&i){var r=i.filter(function(t){return t.id!==e.id}),n=1e3*(e.time-e.user_time);n>0?(this.time=e.time-e.user_time,this.setCalcuateTimer()):this.time=0,r.every(function(t){return t.user_time/t.time>=1})&&n>0&&(this.timer=setTimeout(this.showDia,n))}},showDia:function(){var t=this;this.courseMedia.pItem;this.$MessageBox.confirm("已学习完，前往在线评测测试一下").then(function(e){var i=t.examList.filter(function(e){return e.period_id===t.ids.course_hour_id});i[0]&&t.goToTest(i[0])}).catch(function(){})},goToTest:function(t){this.$goByName("exam",{query:{paper_id:t.id},params:{course_id:this.courseInfo.id}})}},filters:{formatTime:function(t){if(0===t)return"已学完";var e=Math.floor(t/60),i=parseInt(t%60),r=void 0;return r=e>=1?e+"分钟":"",r+=0!==i?i+"秒":""}}}},524:function(t,e,i){},799:function(t,e,i){"use strict";var r=i(524);i.n(r).a},808:function(t,e,i){"use strict";var r=function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"page-player"},[e("div",{staticClass:"time f14"},[this._v(this._s(this._f("formatTime")(this.time)))]),e("router-view")],1)},n=[];i.d(e,"a",function(){return r}),i.d(e,"b",function(){return n})}}]);