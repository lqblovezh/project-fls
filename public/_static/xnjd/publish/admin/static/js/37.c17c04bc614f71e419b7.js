(window.webpackJsonp=window.webpackJsonp||[]).push([[37],{1161:function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"index"},[n("div",{staticClass:"dialogs"},[n("el-dialog",{attrs:{center:!1,visible:t.uploadDialog,"close-on-click-modal":!1,top:"100px"},on:{"update:visible":function(e){t.uploadDialog=e}}},[n("div",{staticClass:"content",attrs:{slot:"title"},slot:"title"},[n("UploadAll",{ref:"upload",on:{upload:t.importFiles}})],1)]),n("el-dialog",{staticClass:"noPadding",staticStyle:{"margin-top":"25vh"},attrs:{width:"450px",visible:t.importDialog,"append-to-body":""},on:{"update:visible":function(e){t.importDialog=e}}},[n("div",{staticClass:"swithTitle",attrs:{slot:"title"},slot:"title"},[n("div",{staticClass:"div"},[t._v(" ")])]),n("div",{staticClass:"center"},[n("a",{staticClass:"block",attrs:{href:t.TransferUrl()}},[n("el-button",{attrs:{type:"primary",size:"small",plain:""}},[t._v("点击调用转档")])],1),n("a",{staticClass:"block",attrs:{href:t.downloadUrl()}},[n("el-button",{attrs:{type:"primary",size:"small"}},[t._v("下载安装")])],1)])])],1),n("Top",{attrs:{currentPlant:"X-PUBLISH"}}),n("Menu",{attrs:{curr:"/index"}}),n("div",{staticClass:"mainRight"},[n("div",{staticClass:"headGuide"},[n("div",{staticClass:"logo"},[n("img",{attrs:{src:t.plantInfo?t.plantInfo.logo_absolute:"",alt:"alt"}})]),n("div",{staticClass:"guide"},[n("h2",[t._v(t._s(t.plantInfo?t.plantInfo.name:""))]),n("p",[t._v(t._s(t.plantInfo?t.plantInfo.exp:""))]),t.seriverTime?n("RunningTime",{attrs:{currentTime:t.seriverTime}},[n("span",[t._v("服务器当前时间：")])]):t._e()],1)]),n("div",{staticClass:"content"},[t.warehouse?n("div",{staticClass:"warehouse modular"},[n("div",{staticClass:"title"},[t._v("内容仓库")]),n("ul",{staticClass:"list"},t._l(t.warehouse,function(e){return n("li",{class:e.icon},[n("router-link",{attrs:{to:"/contentLibrary/"+e.path}},[n("p",[t._v(t._s(e.name))]),n("p",[t._v(t._s(t._f("formatNum")(e.count)))])])],1)}))]):t._e(),t.product?n("div",{staticClass:"product modular"},[n("div",{staticClass:"title"},[t._v("我的产品")]),n("ul",{staticClass:"list"},t._l(t.product,function(e){return n("li",{class:e.icon},[n("router-link",{staticClass:"body",attrs:{to:"/digitalProductLibrary/"+e.path}},[n("div",{staticClass:"left"}),n("div",{staticClass:"body"},[n("p",[t._v(t._s(e.name))]),n("p",[t._v(t._s(t._f("formatNum")(e.count)))])])])],1)}))]):t._e(),n("div",{staticClass:"channel modular"},[n("div",{staticClass:"title"},[t._v("我的发布渠道")]),n("ul",{staticClass:"list"},t._l(t.channel,function(e){return n("li",[n("router-link",{attrs:{to:"/distributed?id="+e.id}},[n("div",{class:t.getStyle(e.type)}),n("span",{domProps:{textContent:t._s(e.name)}})])],1)}))]),n("div",{staticClass:"tool modular"},[n("div",{staticClass:"title"},[t._v("我的工具")]),n("ul",{staticClass:"list"},[n("li",{staticClass:"conversionTool",on:{click:t.openSwitch}},[n("div",{staticClass:"left"}),n("div",{staticClass:"body"},[t._v("X-SWITCH智能转档系统")])]),n("li",{staticClass:"uploadAll",on:{click:function(e){t.uploadDialog=!0}}},[n("div",{staticClass:"left"}),n("div",{staticClass:"body"},[t._v("全书上传")])])])])])])],1)},a=[];n.d(e,"a",function(){return i}),n.d(e,"b",function(){return a})},1177:function(t,e,n){"use strict";var i=function(){var t=this.$createElement,e=this._self._c||t;return e("p",{staticClass:"div"},[this._t("default"),e("span",{domProps:{textContent:this._s(this.seriverTime)}})],2)},a=[];n.d(e,"a",function(){return i}),n.d(e,"b",function(){return a})},317:function(t,e,n){"use strict";n.r(e);var i=n(1161),a=n(592);for(var r in a)"default"!==r&&function(t){n.d(e,t,function(){return a[t]})}(r);n(876);var o=n(0),s=Object(o.a)(a.default,i.a,i.b,!1,null,"356b47d0",null);s.options.__file="index.vue",e.default=s.exports},592:function(t,e,n){"use strict";n.r(e);var i=n(593),a=n.n(i);for(var r in i)"default"!==r&&function(t){n.d(e,t,function(){return i[t]})}(r);e.default=a.a},593:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0});var i=m(n(3)),a=m(n(155)),r=m(n(154)),o=m(n(873)),s=n(161),u=v(s),l=n(123),c=v(n(27)),d=n(122),p=m(n(165)),f=(n(21),m(n(875)));function v(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e.default=t,e}function m(t){return t&&t.__esModule?t:{default:t}}var h=t.config;e.default={mixins:[d.getIconStyle],components:{Menu:a.default,Top:r.default,RunningTime:o.default},data:function(){return{warehouse:{},product:{},seriverTime:"",channel:null,importDialog:!1,token:{},servicesConfig:h,plantInfo:this.$config.plantInfo,uploadDialog:!1}},created:function(){this.getInfo(),this.getToken()},methods:{getInfo:function(){var t,e=(t=i.default.mark(function t(){var e,n,a=this;return i.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,(0,s.homeInfo)().then(function(t){a.seriverTime=t.data.now_time;var e=t.data.content_warehouse,n=t.data.product,i=function(t){var n=f.default.warehouse.find(function(e){return t==e.type});n&&(n.count=e[t].count)};for(var r in e)i(r);var o=function(t){var e=f.default.product.find(function(e){return t==e.type});e&&(e.count=n[t].count)};for(var r in n)o(r);a.warehouse=f.default.warehouse,a.product=f.default.product},function(t){log(t)});case 3:return t.next=5,(0,l.getDispense)().then(function(t){a.channel=t.data});case 5:t.next=19;break;case 7:if(t.prev=7,t.t0=t.catch(0),e=t.t0.payload){t.next=12;break}return t.abrupt("return");case 12:t.t1=i.default.keys(e.messages);case 13:if((t.t2=t.t1()).done){t.next=19;break}return n=t.t2.value,this.$message.error(e.messages[n]),t.abrupt("break",19);case 19:case"end":return t.stop()}},t,this,[[0,7]])}),function(){var e=t.apply(this,arguments);return new Promise(function(t,n){return function i(a,r){try{var o=e[a](r),s=o.value}catch(t){return void n(t)}if(!o.done)return Promise.resolve(s).then(function(t){i("next",t)},function(t){i("throw",t)});t(s)}("next")})});return function(){return e.apply(this,arguments)}}(),getToken:function(){var t=this;c.getClientToken().then(function(e){t.token=e.data})},openSwitch:function(){location.href=this.TransferUrl(),this.importDialog=!0},TransferUrl:function(){return"xswitch://url="+((0,p.default)(h.baseUrl,!0).host+t.restUrl)+"&token="+this.token.token},importFiles:function(t){u.sendTemp(t)},downloadUrl:function(){return t.restUrl_common+"/xswitch_Setup.exe"}},filters:{formatNum:function(t){return t>1e5?"10w+":t}}}}).call(this,n(5))},594:function(t,e,n){"use strict";n.r(e);var i=n(595),a=n.n(i);for(var r in i)"default"!==r&&function(t){n.d(e,t,function(){return i[t]})}(r);e.default=a.a},595:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{currentTime:String},data:function(){return{timmer:null,seriverTime:null}},created:function(){this.seriverTime=this.currentTime,this.time()},computed:{},methods:{time:function(){var t=this;clearInterval(this.timmer),this.timmer=setInterval(function(){t.seriverTime=t.format()},1e3)},format:function(){arguments.length>0&&void 0!==arguments[0]&&arguments[0];var t="",e={y:(t=this.currentTime?new Date(Date.parse(this.seriverTime.replace(/-/g,"/"))):"").getFullYear(),M:t.getMonth()+1,d:t.getDate(),h:t.getHours(),m:t.getMinutes(),s:t.getSeconds()+1};return t.getSeconds()>=59&&(e.s=0,e.m+=1),t.getMinutes()>=59&&(e.s=0,e.m=0,e.h+=1),e.y+"-"+this.toMax(e.M)+"-"+this.toMax(e.d)+" "+this.toMax(e.h)+":"+this.toMax(e.m)+":"+this.toMax(e.s)},toMax:function(t){return t<10?"0"+t:t}}}},596:function(t,e,n){},597:function(t,e,n){},873:function(t,e,n){"use strict";n.r(e);var i=n(1177),a=n(594);for(var r in a)"default"!==r&&function(t){n.d(e,t,function(){return a[t]})}(r);n(874);var o=n(0),s=Object(o.a)(a.default,i.a,i.b,!1,null,"a09f0a22",null);s.options.__file="runningTime.vue",e.default=s.exports},874:function(t,e,n){"use strict";var i=n(596);n.n(i).a},875:function(t){t.exports={warehouse:[{name:"电子书",type:"books",icon:"digitalLibrary",path:"digitalBook"},{name:"文章库",type:"article",icon:"articleLibrary",path:"article"},{name:"图片库",type:"picture",icon:"pictureLibrary",path:"imgs"},{name:"音频库",type:"audio",icon:"audioLibrary",path:"voices"},{name:"视频库",type:"video",icon:"videoLibrary",path:"videos"},{name:"3D内容库",type:"content",icon:"contentLibrary",path:"3D"},{name:"H5作品库",type:"library",icon:"workLibrary",path:"H5"},{name:"AR内容库",type:"AR",icon:"ARLibrary",path:"AR",count:0},{name:"VR内容库",type:"libraries",icon:"VRLibrary",path:"VR"},{name:"全景图",type:"panorama",icon:"panorama",path:"panorama",count:0}],product:[{name:"融合发布库",type:"com_product",icon:"bookLibrary",path:"release"},{name:"电子书多格式",type:"mult_books",icon:"formLibrary",path:"polymorph"},{name:"主题产品",type:"theme",icon:"topicLibrary",path:"themeLibary"},{name:"文章推送产品",type:"push_articles",icon:"pushLibrary",path:"pushArticle"},{name:"视读产品",type:"video_product",icon:"shidu",path:"video"},{name:"听读产品",type:"audio_product",icon:"tingdu",path:"audio"},{name:"课件产品",type:"course_ware",icon:"kejian",path:"media"}]}},876:function(t,e,n){"use strict";var i=n(597);n.n(i).a}}]);