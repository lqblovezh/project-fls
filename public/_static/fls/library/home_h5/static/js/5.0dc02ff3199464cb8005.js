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
(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{1099:function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"page-circle-reply-list"},[n("Head"),n("ReplyInput",{ref:"replyInp",on:{commit:t.commit,blur:t.blurHandler}}),n("div",{staticClass:"wrapper"},[n("div",{staticClass:"mian"},[n("Scroll",{attrs:{top:"45px"},on:{loadMore:t.loadMore}},[n("div",{staticClass:"reply-list"},[n("ReplyItem",{attrs:{item:t.commentDetail},on:{like:function(e){return t.like(t.commentDetail)},goDetail:function(e){return t.topicReply(t.commentDetail)}}})],1),t.list.length?n("div",{staticClass:"child"},t._l(t.list,function(e){return n("CommentItem",{attrs:{item:e},on:{reply:function(n){return t.replyChild(e)},like:function(n){return t.like(e)}}})}),1):t._e()])],1)])],1)},a=[];n.d(e,"a",function(){return i}),n.d(e,"b",function(){return a})},1116:function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"comp-circle-reply-input"},[n("div",{staticClass:"wrapper vm-all f14 c_6"},[t.data.files.length?n("div",{ref:"",staticClass:"del",on:{click:t.cleanImg}},[n("div",{staticClass:"icon icon-del"}),n("span",{staticClass:"f12 c_price"},[t._v("清空图片")])]):t._e(),n("FileImg",{ref:"fileImg",attrs:{files:t.data.files},on:{cleanImg:t.cleanImg}}),n("div",{staticClass:"main"},[n("div",{staticClass:"icon icon-photo",on:{click:t.openImg}}),n("input",{directives:[{name:"model",rawName:"v-model",value:t.data.value,expression:"data.value"}],ref:"inp",staticClass:"inp",attrs:{placeholder:"请输入评价内容"},domProps:{value:t.data.value},on:{blur:function(e){return t.$emit("blur")},input:function(e){e.target.composing||t.$set(t.data,"value",e.target.value)}}}),n("div",{staticClass:"ib",on:{click:t.commit}},[t._v("评价")])])],1)])},a=[];n.d(e,"a",function(){return i}),n.d(e,"b",function(){return a})},1119:function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"comp-circle-comment-item"},[n("div",{staticClass:"wrapper"},[n("div",{staticClass:"content"},[n("div",{staticClass:"left"},[n("img",{attrs:{src:t.item.user_picture}})]),n("div",{staticClass:"right after_bd f14",on:{click:t.clickHnadler}},[n("div",{staticClass:"flex"},[n("div",{staticClass:"name c_3 ellipsis"},[t._v(t._s(t.item.user_nick)),n("span",{directives:[{name:"show",rawName:"v-show",value:t.item.is_owner,expression:"item.is_owner"}],staticClass:"tc ib c_f f12 tag"},[t._v("题主")]),n("span",{staticClass:"ib c_gray1"},[t._v("回复")]),n("span",[t._v(t._s(t.item.replay_nick))])]),n("span",{ref:"like",staticClass:"ib vm-all like"},[n("div",{staticClass:"icon",class:t.item.is_good?"icon-like-checked":"icon-like"}),n("span",[t._v(t._s(t.item.info_good_num))])])]),n("div",{ref:"txt",staticClass:"txt c_4"},[n("span",[t._v(t._s(t.item.value))]),n("br"),n("span",{staticClass:"time c_9 f12"},[t._v(" "+t._s(t.item.update_time))])]),t.item.img_src.length?n("div",{staticClass:"imgs"},[n("FileImg",{attrs:{type:"2",files:t.item.img_src}})],1):t._e()])])])])},a=[];n.d(e,"a",function(){return i}),n.d(e,"b",function(){return a})},594:function(t,e,n){"use strict";n.r(e);var i=n(1099),a=n(735);for(var r in a)"default"!==r&&function(t){n.d(e,t,function(){return a[t]})}(r);n(971);var s=n(0),c=Object(s.a)(a.default,i.a,i.b,!1,null,null,null);e.default=c.exports},640:function(t,e,n){"use strict";n.r(e);var i=n(641),a=n.n(i);for(var r in i)"default"!==r&&function(t){n.d(e,t,function(){return i[t]})}(r);e.default=a.a},641:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i,a=n(717),r=(i=a)&&i.__esModule?i:{default:i};e.default={props:{detail:"",type:{default:!1},title:{},img:{},name:{},author:{},value:{},navType:{}},components:{Score:r.default}}},642:function(t,e,n){"use strict";n.r(e);var i=n(643),a=n.n(i);for(var r in i)"default"!==r&&function(t){n.d(e,t,function(){return i[t]})}(r);e.default=a.a},643:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i,a=n(9),r=(i=a)&&i.__esModule?i:{default:i};e.default={props:{detail:{}},data:function(){return{info:{}}},computed:{socreArr:function(){if(this.info,this.info.score){var t=this.info.score;return[0,0,0,0,0].map(function(e,n){return 2*(n+1)<=t?2:2*(n+1)-1===t?1:e})}return[0,0,0,0,0]}},mounted:function(){this.getScore()},methods:{getScore:function(){var t,e=this;return(t=r.default.mark(function t(){var n;return r.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,e.$service.circle.getScore({book_id:e.detail.book_id});case 3:n=t.sent,e.info=n.data,t.next=10;break;case 7:t.prev=7,t.t0=t.catch(0),console.warn(t.t0);case 10:case"end":return t.stop()}},t,e,[[0,7]])}),function(){var e=t.apply(this,arguments);return new Promise(function(t,n){return function i(a,r){try{var s=e[a](r),c=s.value}catch(t){return void n(t)}if(!s.done)return Promise.resolve(c).then(function(t){i("next",t)},function(t){i("throw",t)});t(c)}("next")})})()}}}},644:function(t,e,n){},645:function(t,e,n){},646:function(t,e,n){"use strict";n.r(e);var i=n(647),a=n.n(i);for(var r in i)"default"!==r&&function(t){n.d(e,t,function(){return i[t]})}(r);e.default=a.a},647:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={components:{},props:{name:{},item:{}},methods:{clickHandler:function(t){var e=this.$getTarget(t);e&&e.classList.contains("like")&&this.$emit("like")}},filters:{compareTime:function(t){var e=((new Date).getTime()-new Date(t).getTime())/1e3;return e<60?e+"秒前":e<3600?parseInt(e/60)+"分钟前":e<86400?parseInt(e/3600)+"小时前":e<2592e3?parseInt(e/86400)+"天前":e<342144e3?parseInt(e/2592e3)+"个月前":""+parseInt(e/2592e3/12)}}}},648:function(t,e,n){},649:function(t,e,n){"use strict";n.r(e);var i=n(650),a=n.n(i);for(var r in i)"default"!==r&&function(t){n.d(e,t,function(){return i[t]})}(r);e.default=a.a},650:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=r(n(9)),a=r(n(667));r(n(264));function r(t){return t&&t.__esModule?t:{default:t}}e.default={components:{DetailCard:a.default},props:{reply:{},detail:{}},data:function(){return{data:{title:"",value:"",files:[]},score:0}},mounted:function(){},methods:{back:function(){this.reply.isOpen=!1},dragHnadler:function(t){t.dataTransfer.setData("Text",t.target.id)},dropHandler:function(t){t.dataTransfer.setData("Text",t.target.id)},cleanImg:function(){this.data.files=[]},openImg:function(){this.$refs.fileImg.open()},commit:function(){var t,e=this;return(t=i.default.mark(function t(){var n;return i.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(1!==e.reply.type||e.data.title){t.next=3;break}return e.$Toast("请输入标题"),t.abrupt("return");case 3:if(e.data.value){t.next=6;break}return e.$Toast("请输入内容"),t.abrupt("return");case 6:return t.prev=6,t.next=9,e.$compressAndUpload(e.data.files);case 9:return n=t.sent,t.next=12,e.$service.circle.score({book_id:e.detail.book_id,score:e.score});case 12:e.$emit("commit",{type:e.reply.type,value:e.data.value,title:e.data.title,img:n}),t.next=20;break;case 15:t.prev=15,t.t0=t.catch(6),t.t0,e.$closeLoading(),e.$Toast(t.t0);case 20:case"end":return t.stop()}},t,e,[[6,15]])}),function(){var e=t.apply(this,arguments);return new Promise(function(t,n){return function i(a,r){try{var s=e[a](r),c=s.value}catch(t){return void n(t)}if(!s.done)return Promise.resolve(c).then(function(t){i("next",t)},function(t){i("throw",t)});t(c)}("next")})})()}}}},651:function(t,e,n){},667:function(t,e,n){"use strict";n.r(e);var i=n(929),a=n(640);for(var r in a)"default"!==r&&function(t){n.d(e,t,function(){return a[t]})}(r);n(719);var s=n(0),c=Object(s.a)(a.default,i.a,i.b,!1,null,null,null);e.default=c.exports},717:function(t,e,n){"use strict";n.r(e);var i=n(935),a=n(642);for(var r in a)"default"!==r&&function(t){n.d(e,t,function(){return a[t]})}(r);n(718);var s=n(0),c=Object(s.a)(a.default,i.a,i.b,!1,null,null,null);e.default=c.exports},718:function(t,e,n){"use strict";var i=n(644);n.n(i).a},719:function(t,e,n){"use strict";var i=n(645);n.n(i).a},723:function(t,e,n){"use strict";n.r(e);var i=n(934),a=n(646);for(var r in a)"default"!==r&&function(t){n.d(e,t,function(){return a[t]})}(r);n(724);var s=n(0),c=Object(s.a)(a.default,i.a,i.b,!1,null,null,null);e.default=c.exports},724:function(t,e,n){"use strict";var i=n(648);n.n(i).a},731:function(t,e,n){"use strict";n.r(e);var i=n(933),a=n(649);for(var r in a)"default"!==r&&function(t){n.d(e,t,function(){return a[t]})}(r);n(732);var s=n(0),c=Object(s.a)(a.default,i.a,i.b,!1,null,null,null);e.default=c.exports},732:function(t,e,n){"use strict";var i=n(651);n.n(i).a},733:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={methods:{like:function(t){}}}},735:function(t,e,n){"use strict";n.r(e);var i=n(736),a=n.n(i);for(var r in i)"default"!==r&&function(t){n.d(e,t,function(){return i[t]})}(r);e.default=a.a},736:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=f(n(9)),a=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(t[i]=n[i])}return t},r=f(n(723)),s=f(n(731)),c=f(n(967)),o=f(n(969)),u=f(n(733)),l=n(15);function f(t){return t&&t.__esModule?t:{default:t}}e.default={components:{ReplyItem:r.default,Reply:s.default,CommentItem:c.default,ReplyInput:o.default},mixins:[u.default],asyncData:function(t){var e=t.store,n=t.route;return e.dispatch("circle/getCommentList",{id:n.query.commentId,clean:!0})},mounted:function(){this.commentDetail=JSON.parse(localStorage.commentDetail),this.setReplyParams(),this.tempCommentId=this.$route.query.commentId,this.tempUserId=this.commentDetail.user_id},beforeDestroy:function(){this.$store.state.circle.commentList=[]},data:function(){return{tempCommentId:"",tempUserId:"",commentDetail:{}}},computed:a({},(0,l.mapState)({list:function(t){return t.circle.commentList}})),methods:{loadMore:function(t){this.$store.dispatch("circle/getCommentList",{pageStart:this.list.length,id:this.$route.query.commentId}).then(t).catch(function(e){return t(!0)})},topicReply:function(t){this.replyChild(t)},replyChild:function(t){t.id!=this.tempCommentId&&this.$refs.replyInp.clean(),this.setReplyParams(t.id,t.user_id),this.$refs.replyInp.focus()},blurHandler:function(){},setReplyParams:function(t,e){this.tempCommentId=t||this.$route.query.commentId,this.tempUserId=e||this.commentDetail.user_id},like:function(t){this.$like(t)},comment:function(t){},commit:function(t,e){var n,r=this;return(n=i.default.mark(function e(){return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(r.$isLogin()){e.next=2;break}return e.abrupt("return");case 2:return e.next=4,r.$service.circle.add(a({type:2,book_circle_comment_id:r.$route.query.commentId,book_circle_id:r.$route.query.id,replay_user_id:r.tempUserId},t));case 4:r.$Toast("评论成功!"),r.loadMore(function(t){}),r.$refs.replyInp.clean();case 7:case"end":return e.stop()}},e,r)}),function(){var t=n.apply(this,arguments);return new Promise(function(e,n){return function i(a,r){try{var s=t[a](r),c=s.value}catch(t){return void n(t)}if(!s.done)return Promise.resolve(c).then(function(t){i("next",t)},function(t){i("throw",t)});e(c)}("next")})})()}}}},737:function(t,e,n){"use strict";n.r(e);var i=n(738),a=n.n(i);for(var r in i)"default"!==r&&function(t){n.d(e,t,function(){return i[t]})}(r);e.default=a.a},738:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{name:{},item:{}},methods:{clickHandler:function(t){t.path,t.currentTarget,t.path.forEach(function(e){t.currentTarget})},reply:function(){this.$emit("reply")},like:function(){this.$emit("like")},clickHnadler:function(t){var e=this.$refs,n=e.like,i=e.txt,a=t.currentTarget,r=(this.$getEventPath(t),!0),s=!1,c=void 0;try{for(var o,u=t.path[Symbol.iterator]();!(r=(o=u.next()).done);r=!0){var l=o.value;if(l===n?this.like():l===i&&this.reply(),a===l)return}}catch(t){s=!0,c=t}finally{try{!r&&u.return&&u.return()}finally{if(s)throw c}}}}}},739:function(t,e,n){},740:function(t,e,n){"use strict";n.r(e);var i=n(741),a=n.n(i);for(var r in i)"default"!==r&&function(t){n.d(e,t,function(){return i[t]})}(r);e.default=a.a},741:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i,a=n(9),r=(i=a)&&i.__esModule?i:{default:i};e.default={components:{},data:function(){return{data:{value:"",files:[]}}},methods:{cleanImg:function(){this.data.files=[]},openImg:function(){this.$refs.fileImg.open()},focus:function(){this.$refs.inp.focus()},clickHandler:function(t){},commit:function(){var t,e=this;return(t=r.default.mark(function t(){var n;return r.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(e.data.value){t.next=3;break}return e.$Toast("请输入内容"),t.abrupt("return");case 3:return t.prev=3,t.next=6,e.$compressAndUpload(e.data.files);case 6:n=t.sent,e.$emit("commit",{value:e.data.value,img:n}),t.next=14;break;case 10:t.prev=10,t.t0=t.catch(3),e.$closeLoading(),e.$Toast("上传出错...");case 14:case"end":return t.stop()}},t,e,[[3,10]])}),function(){var e=t.apply(this,arguments);return new Promise(function(t,n){return function i(a,r){try{var s=e[a](r),c=s.value}catch(t){return void n(t)}if(!s.done)return Promise.resolve(c).then(function(t){i("next",t)},function(t){i("throw",t)});t(c)}("next")})})()},clean:function(){this.data.files=[],this.data.value=""}}}},742:function(t,e,n){},743:function(t,e,n){},929:function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"comp-circle-detail-card c_f"},[n("div",{staticClass:"wrapper"},[n("div",{staticClass:"main flex bg-bg-top"},[t.img?n("img",{attrs:{src:t.img}}):n("div",{staticClass:"icon-circle-bg"}),n("div",{staticClass:"right"},[n("div",{staticClass:"name f16"},[t._v(t._s(t.name))]),t.detail.author?n("div",{staticClass:"author f12"},[t._v(" "+t._s(t.author))]):t._e(),n("Star",{directives:[{name:"show",rawName:"v-show",value:"reply"===t.type&&1!==t.title,expression:"type==='reply' && title !== 1"}]}),"reply"!=t.type&&3!==Number(t.navType)?n("div",{staticClass:"add bbtn red f14",on:{click:function(e){return t.$emit("addCircle")}}},[t._v(t._s(t.detail.user_status?"退出书圈":"+ 加入书圈"))]):"reply"!=t.type?n("Score",{attrs:{detail:t.detail}}):t._e()],1)])])])},a=[];n.d(e,"a",function(){return i}),n.d(e,"b",function(){return a})},933:function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"page-circle-reply"},[n("Head",{attrs:{name:1===t.reply.type?"发布话题":"发布评论",type:"dark",isModel:!0},on:{back:t.back}}),n("div",{staticClass:"wrapper"},[n("DetailCard",{attrs:{type:"reply",detail:t.detail,title:t.reply.type,name:t.detail.name,img:t.detail.img_src,author:t.detail.author},model:{value:t.score,callback:function(e){t.score=e},expression:"score"}}),n("div",{staticClass:"main"},[1===t.reply.type?n("div",{staticClass:"inp"},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.data.title,expression:"data.title"}],attrs:{placeholder:"好的标题会更有吸引力…"},domProps:{value:t.data.title},on:{input:function(e){e.target.composing||t.$set(t.data,"title",e.target.value)}}})]):t._e(),n("div",{staticClass:"inp txt"},[n("textarea",{directives:[{name:"model",rawName:"v-model",value:t.data.value,expression:"data.value"}],attrs:{placeholder:"请输入内容…"},domProps:{value:t.data.value},on:{input:function(e){e.target.composing||t.$set(t.data,"value",e.target.value)}}})]),n("FileImg",{ref:"fileImg",attrs:{files:t.data.files},on:{cleanImg:t.cleanImg}}),n("div",{staticClass:"icon icon-take-photo",on:{click:t.openImg}}),t.data.files.length?n("div",{staticClass:"ib del fr",on:{click:t.cleanImg}},[n("div",{staticClass:"icon icon-del"}),n("span",{staticClass:"f12 c_price"},[t._v("清空图片")])]):t._e(),n("div",{staticClass:"confirm tc"},[n("div",{staticClass:"cbtn b9a",on:{click:t.commit}},[t._v("发布并等待审核")])])],1)],1)],1)},a=[];n.d(e,"a",function(){return i}),n.d(e,"b",function(){return a})},934:function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"comp-circle-reply-item"},[n("div",{staticClass:"wrapper"},[n("div",{staticClass:"content"},[n("div",{staticClass:"left"},[n("img",{attrs:{src:t.item.user_picture}})]),n("div",{staticClass:"right after_bd f14",on:{click:function(e){return t.$emit("goDetail")}}},[n("div",{staticClass:"name c_3"},[t._v(t._s(t.item.nick_name))]),n("div",{staticClass:"time c_9 f12"},[t._v(t._s(t._f("compareTime")(t.item.create_time)))]),t.item.title?n("div",{staticClass:"title c_4"},[t._v("# "+t._s(t.item.title)+" #")]):t._e(),n("div",{staticClass:"txt c_4"},[n("span",[t._v(t._s(t.item.value))])]),t.item.img_src&&t.item.img_src.length?n("div",{staticClass:"imgs"},[n("FileImg",{attrs:{type:"2",files:t.item.img_src}})],1):t._e(),n("div",{staticClass:"btns",on:{click:function(e){return e.stopPropagation(),t.clickHandler(e)}}},[n("span",{staticClass:"vm-all like target"},[n("div",{staticClass:"icon",class:t.item.is_good?"icon-like-checked":"icon-like"}),n("span",[t._v(" "+t._s(t.item.info_good_num))])]),n("span",{staticClass:"vm-all",on:{click:function(e){return e.stopPropagation(),t.$emit("goDetail")}}},[n("div",{staticClass:"icon icon-comment"}),n("span",[t._v(" "+t._s(t.item.home_theme_number))])])])])])])])},a=[];n.d(e,"a",function(){return i}),n.d(e,"b",function(){return a})},935:function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"comp-star flex"},[n("div",{staticClass:"star-list ib"},t._l(5,function(e,i){return n("div",{staticClass:"star-icon",class:{"icon-star_full":2===t.socreArr[i],"icon-star_half":1===t.socreArr[i],"icon-star_empty":0===t.socreArr[i]}})}),0),n("div",{staticClass:"tips f12"},[t._v(t._s(t.info.score)+"评分("+t._s(t.info.number)+"人评)")])])},a=[];n.d(e,"a",function(){return i}),n.d(e,"b",function(){return a})},967:function(t,e,n){"use strict";n.r(e);var i=n(1119),a=n(737);for(var r in a)"default"!==r&&function(t){n.d(e,t,function(){return a[t]})}(r);n(968);var s=n(0),c=Object(s.a)(a.default,i.a,i.b,!1,null,null,null);e.default=c.exports},968:function(t,e,n){"use strict";var i=n(739);n.n(i).a},969:function(t,e,n){"use strict";n.r(e);var i=n(1116),a=n(740);for(var r in a)"default"!==r&&function(t){n.d(e,t,function(){return a[t]})}(r);n(970);var s=n(0),c=Object(s.a)(a.default,i.a,i.b,!1,null,null,null);e.default=c.exports},970:function(t,e,n){"use strict";var i=n(742);n.n(i).a},971:function(t,e,n){"use strict";var i=n(743);n.n(i).a}}]);