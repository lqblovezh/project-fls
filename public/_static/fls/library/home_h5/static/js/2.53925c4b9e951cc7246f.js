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
(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{1071:function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"page-circle-detail"},[n("Head",{attrs:{name:"书圈",type:"dark"}}),t.detail?n("div",{staticClass:"wrapper"},[n("ReplyBtn",{on:{goReply:t.goReply}}),t.reply.isOpen?n("Reply",{attrs:{reply:t.reply,detail:t.detail},on:{commit:t.commitReply}}):t._e(),n("div",{staticClass:"ls"},[n("Scroll",{ref:"scroll",attrs:{top:"44px",bottom:"50px",isAutoLoad:!1},on:{scroll:t.scrollHandler,loadMore:t.loadMore}},[n("DetailCard",{attrs:{detail:t.detail,name:t.detail.name,img:t.detail.img_src,author:t.detail.author,navType:t.type},on:{addCircle:t.addCircle}}),n("div",{staticClass:"util-circle-nav-top"},[n("div",{ref:"nav",staticClass:"wrap"},[n("DetailNav",{attrs:{value:t.type},on:{sort:t.sort,changeType:t.changeType}})],1)]),"圈友"!==t.type?n("div",{staticClass:"ls-content"},t._l(t.list,function(e){return n("ReplyItem",{key:e.id,attrs:{item:e},on:{goDetail:function(n){return t.goDetail(e)},like:function(n){return t.like(e)},comment:t.goDetail}})}),1):n("div",{staticClass:"ls-content"},t._l(t.person_list,function(t){return n("CirclePerson",{attrs:{item:t}})}),1)],1)],1)],1):t._e()],1)},r=[];n.d(e,"a",function(){return i}),n.d(e,"b",function(){return r})},1124:function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"comp-circle-person flex"},[n("img",{attrs:{src:t.item.picture_absolute||t.item.picture}}),n("div",{staticClass:"person-info"},[n("div",{staticClass:"person-info__nickname"},[t._v(t._s(t.item.nick_name))]),n("div",{staticClass:"person-info__summary ellipsis-2 f12"},[t._v("简介："+t._s(t.item.summary))])])])},r=[];n.d(e,"a",function(){return i}),n.d(e,"b",function(){return r})},1125:function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"comp-circle-reply-btn"},[n("div",{staticClass:"wrapper c_f f16"},[n("div",{staticClass:"left vm-all",on:{click:function(e){return t.$emit("goReply",1)}}},[n("div",{staticClass:"icon icon-write"}),n("span",[t._v("发表话题")])]),n("div",{staticClass:"right vm-all",on:{click:function(e){return t.$emit("goReply",3)}}},[n("div",{staticClass:"icon icon-write2"}),n("span",[t._v("发表书评")])])])])},r=[];n.d(e,"a",function(){return i}),n.d(e,"b",function(){return r})},1126:function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"comp-circle-detail-nav after_bd"},[n("div",{staticClass:"wrapper"},[n("div",{staticClass:"ls flex"},t._l(t.typeList,function(e){return n("div",{staticClass:"item",on:{click:function(n){return t.clickHnadler(e)}}},[n("div",{staticClass:"content",class:{after_item:!e.sort&&e.type===t.value}},[n("span",{staticClass:"name"},[t._v(t._s(e.name))]),e.sort?n("div",{staticClass:"icon icon-sort",class:{rt180:"desc"===e.sort}}):t._e()])])}),0)])])},r=[];n.d(e,"a",function(){return i}),n.d(e,"b",function(){return r})},593:function(t,e,n){"use strict";n.r(e);var i=n(1071),r=n(715);for(var a in r)"default"!==a&&function(t){n.d(e,t,function(){return r[t]})}(a);n(966);var s=n(0),c=Object(s.a)(r.default,i.a,i.b,!1,null,null,null);e.default=c.exports},640:function(t,e,n){"use strict";n.r(e);var i=n(641),r=n.n(i);for(var a in i)"default"!==a&&function(t){n.d(e,t,function(){return i[t]})}(a);e.default=r.a},641:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i,r=n(717),a=(i=r)&&i.__esModule?i:{default:i};e.default={props:{detail:"",type:{default:!1},title:{},img:{},name:{},author:{},value:{},navType:{}},components:{Score:a.default}}},642:function(t,e,n){"use strict";n.r(e);var i=n(643),r=n.n(i);for(var a in i)"default"!==a&&function(t){n.d(e,t,function(){return i[t]})}(a);e.default=r.a},643:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i,r=n(9),a=(i=r)&&i.__esModule?i:{default:i};e.default={props:{detail:{}},data:function(){return{info:{}}},computed:{socreArr:function(){if(this.info,this.info.score){var t=this.info.score;return[0,0,0,0,0].map(function(e,n){return 2*(n+1)<=t?2:2*(n+1)-1===t?1:e})}return[0,0,0,0,0]}},mounted:function(){this.getScore()},methods:{getScore:function(){var t,e=this;return(t=a.default.mark(function t(){var n;return a.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,e.$service.circle.getScore({book_id:e.detail.book_id});case 3:n=t.sent,e.info=n.data,t.next=10;break;case 7:t.prev=7,t.t0=t.catch(0),console.warn(t.t0);case 10:case"end":return t.stop()}},t,e,[[0,7]])}),function(){var e=t.apply(this,arguments);return new Promise(function(t,n){return function i(r,a){try{var s=e[r](a),c=s.value}catch(t){return void n(t)}if(!s.done)return Promise.resolve(c).then(function(t){i("next",t)},function(t){i("throw",t)});t(c)}("next")})})()}}}},644:function(t,e,n){},645:function(t,e,n){},646:function(t,e,n){"use strict";n.r(e);var i=n(647),r=n.n(i);for(var a in i)"default"!==a&&function(t){n.d(e,t,function(){return i[t]})}(a);e.default=r.a},647:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={components:{},props:{name:{},item:{}},methods:{clickHandler:function(t){var e=this.$getTarget(t);e&&e.classList.contains("like")&&this.$emit("like")}},filters:{compareTime:function(t){var e=((new Date).getTime()-new Date(t).getTime())/1e3;return e<60?e+"秒前":e<3600?parseInt(e/60)+"分钟前":e<86400?parseInt(e/3600)+"小时前":e<2592e3?parseInt(e/86400)+"天前":e<342144e3?parseInt(e/2592e3)+"个月前":""+parseInt(e/2592e3/12)}}}},648:function(t,e,n){},649:function(t,e,n){"use strict";n.r(e);var i=n(650),r=n.n(i);for(var a in i)"default"!==a&&function(t){n.d(e,t,function(){return i[t]})}(a);e.default=r.a},650:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a(n(9)),r=a(n(667));a(n(264));function a(t){return t&&t.__esModule?t:{default:t}}e.default={components:{DetailCard:r.default},props:{reply:{},detail:{}},data:function(){return{data:{title:"",value:"",files:[]},score:0}},mounted:function(){},methods:{back:function(){this.reply.isOpen=!1},dragHnadler:function(t){t.dataTransfer.setData("Text",t.target.id)},dropHandler:function(t){t.dataTransfer.setData("Text",t.target.id)},cleanImg:function(){this.data.files=[]},openImg:function(){this.$refs.fileImg.open()},commit:function(){var t,e=this;return(t=i.default.mark(function t(){var n;return i.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(1!==e.reply.type||e.data.title){t.next=3;break}return e.$Toast("请输入标题"),t.abrupt("return");case 3:if(e.data.value){t.next=6;break}return e.$Toast("请输入内容"),t.abrupt("return");case 6:return t.prev=6,t.next=9,e.$compressAndUpload(e.data.files);case 9:return n=t.sent,t.next=12,e.$service.circle.score({book_id:e.detail.book_id,score:e.score});case 12:e.$emit("commit",{type:e.reply.type,value:e.data.value,title:e.data.title,img:n}),t.next=20;break;case 15:t.prev=15,t.t0=t.catch(6),t.t0,e.$closeLoading(),e.$Toast(t.t0);case 20:case"end":return t.stop()}},t,e,[[6,15]])}),function(){var e=t.apply(this,arguments);return new Promise(function(t,n){return function i(r,a){try{var s=e[r](a),c=s.value}catch(t){return void n(t)}if(!s.done)return Promise.resolve(c).then(function(t){i("next",t)},function(t){i("throw",t)});t(c)}("next")})})()}}}},651:function(t,e,n){},667:function(t,e,n){"use strict";n.r(e);var i=n(929),r=n(640);for(var a in r)"default"!==a&&function(t){n.d(e,t,function(){return r[t]})}(a);n(719);var s=n(0),c=Object(s.a)(r.default,i.a,i.b,!1,null,null,null);e.default=c.exports},715:function(t,e,n){"use strict";n.r(e);var i=n(716),r=n.n(i);for(var a in i)"default"!==a&&function(t){n.d(e,t,function(){return i[t]})}(a);e.default=r.a},716:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=p(n(9)),r=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(t[i]=n[i])}return t},a=p(n(667)),s=p(n(960)),c=p(n(723)),o=p(n(962)),l=p(n(964)),u=p(n(731)),f=p(n(733)),d=n(15);function p(t){return t&&t.__esModule?t:{default:t}}e.default={components:{DetailCard:a.default,DetailNav:s.default,ReplyItem:c.default,ReplyBtn:o.default,Reply:u.default,CirclePerson:l.default},mixins:[f.default],asyncData:function(t){var e=t.store,n=t.route;e.dispatch("circle/getCircleDetailPageData",n.query)},computed:r({},(0,d.mapState)({detail:function(t){return t.circle.detail},list:function(t){return t.circle.detailList},person_list:function(t){return t.circle.person_list}})),data:function(){return{type:"1",isAdsorb:!1,reply:{isOpen:!1,type:""}}},beforeDestroy:function(){this.clean()},methods:{sort:function(t){},loadMore:function(t){"圈友"!==this.type?this.$store.dispatch("circle/getDetailList",r({pageStart:this.list.length,type:this.type},this.$route.query)).then(t):this.$store.dispatch("circle/getCirclePerson",{pageStart:this.person_list.length,id:this.$route.query.id}).then(t)},changeType:function(t){var e=this;this.clean(),this.type=t.type,"圈友"!==this.type?this.$store.dispatch("circle/getDetailList",r({pageStart:0,type:this.type,clean:!0},this.$route.query)).then(function(t){setTimeout(function(){e.$refs.scroll.reset()},0)}):this.$store.dispatch("circle/getCirclePerson",{id:this.$route.query.id,clean:!0})},addCircle:function(){this.$addCircle(this.detail)},goReply:function(t){this.reply.isOpen=!0,this.reply.type=t},goDetail:function(t){this.$go("/circle-reply-list",{id:this.$route.query.id,commentId:t.id,type:this.type}),localStorage.commentDetail=JSON.stringify(t),this.$store.state.circle.commentDetail=t},like:function(t){this.$like(t)},commitReply:function(t){var e,n=this;return(e=i.default.mark(function e(){return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(n.$isLogin()){e.next=3;break}return e.abrupt("return");case 3:return e.next=5,n.$service.circle.add(r({book_circle_id:n.$route.query.id},t));case 5:n.reply.isOpen=!1,n.$store.dispatch("circle/getDetailList",r({type:n.type,clean:!0},n.$route.query));case 7:case"end":return e.stop()}},e,n)}),function(){var t=e.apply(this,arguments);return new Promise(function(e,n){return function i(r,a){try{var s=t[r](a),c=s.value}catch(t){return void n(t)}if(!s.done)return Promise.resolve(c).then(function(t){i("next",t)},function(t){i("throw",t)});e(c)}("next")})})()},clean:function(){this.$store.state.circle.detailList=[]},scrollHandler:function(t){var e=t.target.scrollTop-170,n=this.$refs.nav;e>0?this.isAdsorb||(n.classList.add("true"),this.isAdsorb=!0):this.isAdsorb&&(n.classList.remove("true"),this.isAdsorb=!1)}}}},717:function(t,e,n){"use strict";n.r(e);var i=n(935),r=n(642);for(var a in r)"default"!==a&&function(t){n.d(e,t,function(){return r[t]})}(a);n(718);var s=n(0),c=Object(s.a)(r.default,i.a,i.b,!1,null,null,null);e.default=c.exports},718:function(t,e,n){"use strict";var i=n(644);n.n(i).a},719:function(t,e,n){"use strict";var i=n(645);n.n(i).a},720:function(t,e,n){"use strict";n.r(e);var i=n(721),r=n.n(i);for(var a in i)"default"!==a&&function(t){n.d(e,t,function(){return i[t]})}(a);e.default=r.a},721:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{value:{default:"1"}},data:function(){return{typeList:[{name:"话题",type:"1"},{name:"书评",type:"3"},{name:"圈友",type:"圈友"},{name:"热度",type:"time",sort:"asc"},{name:"时间",type:"hot",sort:"asc"}]}},methods:{clickHnadler:function(t){if(t.sort){var e=t.type,n=t.sort,i=JSON.stringify((s=n,(a=e)in(r={})?Object.defineProperty(r,a,{value:s,enumerable:!0,configurable:!0,writable:!0}):r[a]=s,r));this.$emit("sort",i,function(){"asc"===t.sort?t.sort="desc":t.sort="asc"})}else this.$emit("changeType",t);var r,a,s}}}},722:function(t,e,n){},723:function(t,e,n){"use strict";n.r(e);var i=n(934),r=n(646);for(var a in r)"default"!==a&&function(t){n.d(e,t,function(){return r[t]})}(a);n(724);var s=n(0),c=Object(s.a)(r.default,i.a,i.b,!1,null,null,null);e.default=c.exports},724:function(t,e,n){"use strict";var i=n(648);n.n(i).a},725:function(t,e,n){"use strict";n.r(e);var i=n(726),r=n.n(i);for(var a in i)"default"!==a&&function(t){n.d(e,t,function(){return i[t]})}(a);e.default=r.a},726:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={}},727:function(t,e,n){},728:function(t,e,n){"use strict";n.r(e);var i=n(729),r=n.n(i);for(var a in i)"default"!==a&&function(t){n.d(e,t,function(){return i[t]})}(a);e.default=r.a},729:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{item:{}}}},730:function(t,e,n){},731:function(t,e,n){"use strict";n.r(e);var i=n(933),r=n(649);for(var a in r)"default"!==a&&function(t){n.d(e,t,function(){return r[t]})}(a);n(732);var s=n(0),c=Object(s.a)(r.default,i.a,i.b,!1,null,null,null);e.default=c.exports},732:function(t,e,n){"use strict";var i=n(651);n.n(i).a},733:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={methods:{like:function(t){}}}},734:function(t,e,n){},929:function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"comp-circle-detail-card c_f"},[n("div",{staticClass:"wrapper"},[n("div",{staticClass:"main flex bg-bg-top"},[t.img?n("img",{attrs:{src:t.img}}):n("div",{staticClass:"icon-circle-bg"}),n("div",{staticClass:"right"},[n("div",{staticClass:"name f16"},[t._v(t._s(t.name))]),t.detail.author?n("div",{staticClass:"author f12"},[t._v(" "+t._s(t.author))]):t._e(),n("Star",{directives:[{name:"show",rawName:"v-show",value:"reply"===t.type&&1!==t.title,expression:"type==='reply' && title !== 1"}]}),"reply"!=t.type&&3!==Number(t.navType)?n("div",{staticClass:"add bbtn red f14",on:{click:function(e){return t.$emit("addCircle")}}},[t._v(t._s(t.detail.user_status?"退出书圈":"+ 加入书圈"))]):"reply"!=t.type?n("Score",{attrs:{detail:t.detail}}):t._e()],1)])])])},r=[];n.d(e,"a",function(){return i}),n.d(e,"b",function(){return r})},933:function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"page-circle-reply"},[n("Head",{attrs:{name:1===t.reply.type?"发布话题":"发布评论",type:"dark",isModel:!0},on:{back:t.back}}),n("div",{staticClass:"wrapper"},[n("DetailCard",{attrs:{type:"reply",detail:t.detail,title:t.reply.type,name:t.detail.name,img:t.detail.img_src,author:t.detail.author},model:{value:t.score,callback:function(e){t.score=e},expression:"score"}}),n("div",{staticClass:"main"},[1===t.reply.type?n("div",{staticClass:"inp"},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.data.title,expression:"data.title"}],attrs:{placeholder:"好的标题会更有吸引力…"},domProps:{value:t.data.title},on:{input:function(e){e.target.composing||t.$set(t.data,"title",e.target.value)}}})]):t._e(),n("div",{staticClass:"inp txt"},[n("textarea",{directives:[{name:"model",rawName:"v-model",value:t.data.value,expression:"data.value"}],attrs:{placeholder:"请输入内容…"},domProps:{value:t.data.value},on:{input:function(e){e.target.composing||t.$set(t.data,"value",e.target.value)}}})]),n("FileImg",{ref:"fileImg",attrs:{files:t.data.files},on:{cleanImg:t.cleanImg}}),n("div",{staticClass:"icon icon-take-photo",on:{click:t.openImg}}),t.data.files.length?n("div",{staticClass:"ib del fr",on:{click:t.cleanImg}},[n("div",{staticClass:"icon icon-del"}),n("span",{staticClass:"f12 c_price"},[t._v("清空图片")])]):t._e(),n("div",{staticClass:"confirm tc"},[n("div",{staticClass:"cbtn b9a",on:{click:t.commit}},[t._v("发布并等待审核")])])],1)],1)],1)},r=[];n.d(e,"a",function(){return i}),n.d(e,"b",function(){return r})},934:function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"comp-circle-reply-item"},[n("div",{staticClass:"wrapper"},[n("div",{staticClass:"content"},[n("div",{staticClass:"left"},[n("img",{attrs:{src:t.item.user_picture}})]),n("div",{staticClass:"right after_bd f14",on:{click:function(e){return t.$emit("goDetail")}}},[n("div",{staticClass:"name c_3"},[t._v(t._s(t.item.nick_name))]),n("div",{staticClass:"time c_9 f12"},[t._v(t._s(t._f("compareTime")(t.item.create_time)))]),t.item.title?n("div",{staticClass:"title c_4"},[t._v("# "+t._s(t.item.title)+" #")]):t._e(),n("div",{staticClass:"txt c_4"},[n("span",[t._v(t._s(t.item.value))])]),t.item.img_src&&t.item.img_src.length?n("div",{staticClass:"imgs"},[n("FileImg",{attrs:{type:"2",files:t.item.img_src}})],1):t._e(),n("div",{staticClass:"btns",on:{click:function(e){return e.stopPropagation(),t.clickHandler(e)}}},[n("span",{staticClass:"vm-all like target"},[n("div",{staticClass:"icon",class:t.item.is_good?"icon-like-checked":"icon-like"}),n("span",[t._v(" "+t._s(t.item.info_good_num))])]),n("span",{staticClass:"vm-all",on:{click:function(e){return e.stopPropagation(),t.$emit("goDetail")}}},[n("div",{staticClass:"icon icon-comment"}),n("span",[t._v(" "+t._s(t.item.home_theme_number))])])])])])])])},r=[];n.d(e,"a",function(){return i}),n.d(e,"b",function(){return r})},935:function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"comp-star flex"},[n("div",{staticClass:"star-list ib"},t._l(5,function(e,i){return n("div",{staticClass:"star-icon",class:{"icon-star_full":2===t.socreArr[i],"icon-star_half":1===t.socreArr[i],"icon-star_empty":0===t.socreArr[i]}})}),0),n("div",{staticClass:"tips f12"},[t._v(t._s(t.info.score)+"评分("+t._s(t.info.number)+"人评)")])])},r=[];n.d(e,"a",function(){return i}),n.d(e,"b",function(){return r})},960:function(t,e,n){"use strict";n.r(e);var i=n(1126),r=n(720);for(var a in r)"default"!==a&&function(t){n.d(e,t,function(){return r[t]})}(a);n(961);var s=n(0),c=Object(s.a)(r.default,i.a,i.b,!1,null,null,null);e.default=c.exports},961:function(t,e,n){"use strict";var i=n(722);n.n(i).a},962:function(t,e,n){"use strict";n.r(e);var i=n(1125),r=n(725);for(var a in r)"default"!==a&&function(t){n.d(e,t,function(){return r[t]})}(a);n(963);var s=n(0),c=Object(s.a)(r.default,i.a,i.b,!1,null,null,null);e.default=c.exports},963:function(t,e,n){"use strict";var i=n(727);n.n(i).a},964:function(t,e,n){"use strict";n.r(e);var i=n(1124),r=n(728);for(var a in r)"default"!==a&&function(t){n.d(e,t,function(){return r[t]})}(a);n(965);var s=n(0),c=Object(s.a)(r.default,i.a,i.b,!1,null,null,null);e.default=c.exports},965:function(t,e,n){"use strict";var i=n(730);n.n(i).a},966:function(t,e,n){"use strict";var i=n(734);n.n(i).a}}]);