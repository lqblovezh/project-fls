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
(window.webpackJsonp=window.webpackJsonp||[]).push([[31],{1245:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.getList=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,n.request_get)("/api/book_info",t)},e.educe=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,n.request_get)("/api/book_info_export",t)},e.detail=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,n.request_get)("/api/book_info_all",t)},e.getOrders=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,n.request_get)("/api/book_order_info",t)},e.bookSale=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,n.request_get)("/api/book_sale",t)},e.bookSaleAchievement=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,n.request_get)("/api/sale_achievement_info",t)};var i,n=a(45),s=a(77),r=(i=s)&&i.__esModule?i:{default:i};r.default.compile("/api/messages/:id"),r.default.compile("/api/user/lock/:id")},1246:function(t,e,a){"use strict";var i=a(607);a.n(i).a},1261:function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"box"},[a("div",{staticClass:"top serachWrap"},[a("form",{attrs:{id:"mainForm"}},[a("span",{staticClass:"group-inline"},[a("el-input",{attrs:{placeholder:"输入名称搜索",name:"book_name",clearable:""},model:{value:t.where.book_name,callback:function(e){t.$set(t.where,"book_name",e)},expression:"where.book_name"}})],1),a("span",{staticClass:"group-inline"},[a("el-input",{attrs:{placeholder:"输入标签搜索",name:"tag",clearable:""},model:{value:t.where.tag,callback:function(e){t.$set(t.where,"tag",e)},expression:"where.tag"}})],1),a("span",{staticClass:"group-inline"},[a("TimePick",{attrs:{inputsName:["start_time","end_time"]}})],1),a("span",{staticClass:"group-inline"},[a("el-select",{attrs:{placeholder:"选择类型搜索",clearable:""},model:{value:t.where.type,callback:function(e){t.$set(t.where,"type",e)},expression:"where.type"}},t._l(t.roleList,function(t){return a("el-option",{key:t.value,attrs:{label:t.name,value:t.value}})}),1)],1),a("span",{staticClass:"group-inline"},[a("el-select",{attrs:{placeholder:"统计所有",clearable:""},model:{value:t.where.time,callback:function(e){t.$set(t.where,"time",e)},expression:"where.time"}},t._l(t.status,function(t){return a("el-option",{key:t.value,attrs:{label:t.name,value:t.value}})}),1)],1),a("span",{staticClass:"group-inline right"},[a("el-button",{attrs:{type:"primary",plain:"",icon:"el-icon-search"},on:{click:t.search}},[t._v("搜索")]),a("el-button",{attrs:{type:"primary",plain:""},on:{click:function(e){return t.educe()}}},[t._v("导出查询")])],1)])]),a("div",{staticClass:"content"},[a("div",{staticClass:"tableTop"},[a("div",{staticClass:"title vel-line"},[a("span",[t._v("全部 "),t.page?a("span",{staticClass:"totalNum"},[t._v("("+t._s(t.page.total)+")")]):t._e()]),a("div",{staticClass:"btns"},[a("el-button",{attrs:{type:"primary",size:"small",plain:""},on:{click:t.seeSelectData}},[t._v("合并查看数据")])],1)])]),a("table",{staticClass:"table"},[a("thead",[a("tr",[a("th",{attrs:{width:"40"}},[a("input",{attrs:{type:"checkbox"},on:{click:function(e){return t.$checkAll(e)}}})]),a("th",[t._v(" 名称")]),a("th",[t._v(" 产品类型")]),a("th",[t._v(" 标签")]),a("th",{attrs:{width:"150"}},[t._v(" 上架时间")]),a("th",[t._v(" 浏览次数")]),a("th",[t._v(" 分享次数")]),a("th",[t._v(" 销售次数")]),a("th",[t._v(" 销售金额")]),a("th",[t._v(" 分销数")]),a("th",{attrs:{width:"150"}},[t._v(" 最近成交")]),a("th",[t._v(" 操作")])])]),a("tbody",t._l(t.list,function(e,i){return a("tr",[a("td",[a("input",{ref:"ids",refInFor:!0,attrs:{type:"checkbox",name:"ids",book_name:e.book_name,img_src:e.img_src},domProps:{value:e.id}})]),a("td",[t._v(t._s(e.book_name))]),a("td",[t._v(t._s(e.type_name))]),a("td",[t._v(t._s(e.tag))]),a("td",[t._v(t._s(e.the_shelf_create_time))]),a("td",[t._v(t._s(e.browse_value))]),a("td",[t._v(t._s(e.share_value))]),a("td",[t._v(t._s(e.sale_value))]),a("td",[t._v(t._s(e.sale_money))]),a("td",[t._v(t._s(e.bution_value))]),a("td",[t._v(t._s(e.the_shelf_create_time))]),a("td",[a("el-button",{attrs:{size:"medium",type:"primary",plain:""},on:{click:function(a){return t.detail({book_id:[e.book_id],book_name:[e.book_name],img_src:[e.img_src]})}}},[t._v("详情")])],1)])}),0)]),t.page?a("div",{staticClass:"pageWrap"},[a("el-pagination",{attrs:{background:"","current-page":t.currentPage,"page-sizes":[10,50,100],"page-size":10,layout:"total, sizes, prev, pager, next, jumper",total:t.page.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1):t._e(),a("el-dialog",{staticClass:"dialog",attrs:{width:"1155px",visible:t.dialogVisible},on:{"update:visible":function(e){t.dialogVisible=e},close:t.resetOption}},[a("div",{staticClass:"header",attrs:{slot:"title"},slot:"title"},[a("el-tabs",{attrs:{value:"detail"}},[a("el-tab-pane",{attrs:{label:"趋势图",name:"detail"}})],1)],1),a("div",{staticClass:"part"},[a("div",{staticClass:"lside"},[a("div",{staticClass:"group"},t._l(t.img_src,function(t,e){return a("div",{staticClass:"imgList",style:{backgroundImage:"url("+t+")",margin:2*e+"px"}})}),0),a("ul",{staticClass:"txt"},t._l(t.book_name,function(e){return a("li",[t._v(" "+t._s(e))])}),0)]),a("div",{staticClass:"rside"},[a("el-button-group",[a("el-button",{on:{click:function(e){return t.getChartsData({type:"browse",txt:"浏览数"})}}},[t._v("浏览数")]),a("el-button",{on:{click:function(e){return t.getChartsData({type:"share",txt:"分享数"})}}},[t._v("分享数")]),a("el-button",{on:{click:function(e){return t.getChartsData({type:"sale",txt:"销售次数"})}}},[t._v("销售次数")]),a("el-button",{on:{click:function(e){return t.getChartsData({type:"sale",txt:"销售金额"})}}},[t._v("销售金额")]),a("el-button",{on:{click:function(e){return t.getChartsData({type:"sale",txt:"分销数"})}}},[t._v("分销数")]),a("span",{staticStyle:{"line-height":"40px","margin-left":"10px"}},[t._v(" "+t._s(t.scantotal))]),a("div",{staticStyle:{"margin-top":"20px"}},[a("span",{staticStyle:{"line-height":"40px",margin:"0 10px"}},[t._v("按时段")]),a("el-select",{attrs:{placeholder:"统计所有"},on:{change:t.change},model:{value:t.timeValue,callback:function(e){t.timeValue=e},expression:"timeValue"}},t._l(t.time,function(t){return a("el-option",{key:t.txt,attrs:{label:t.txt,value:t.value}})}),1),a("span",{staticStyle:{"line-height":"40px",margin:"0 20px"}},[t._v("自定义"),a("el-date-picker",{attrs:{type:"daterange",align:"right","unlink-panels":"","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期"},on:{change:t.change},model:{value:t.ctimePick,callback:function(e){t.ctimePick=e},expression:"ctimePick"}})],1)],1)],1)],1),a("div",{staticClass:"part"},[a("div",{staticClass:"echarts",staticStyle:{width:"1000px",height:"400px"},attrs:{id:"myChart"}})])]),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{type:"primary"},on:{click:function(e){t.dialogVisible=!1}}},[t._v("关闭")])],1)])],1)])},n=[];a.d(e,"a",function(){return i}),a.d(e,"b",function(){return n})},248:function(t,e,a){"use strict";a.r(e);var i=a(1261),n=a(605);for(var s in n)"default"!==s&&function(t){a.d(e,t,function(){return n[t]})}(s);a(1246);var r=a(0),o=Object(r.a)(n.default,i.a,i.b,!1,null,"7a1a8a00",null);e.default=o.exports},258:function(t,e){var a=/^(?:submit|button|image|reset|file)$/i,i=/^(?:input|select|textarea|keygen)/i,n=/(\[[^\[\]]*\])/g;function s(t,e,a){if(e.match(n)){!function t(e,a,i){if(0===a.length)return e=i;var n=a.shift(),s=n.match(/^\[(.+?)\]$/);if("[]"===n)return e=e||[],Array.isArray(e)?e.push(t(null,a,i)):(e._values=e._values||[],e._values.push(t(null,a,i))),e;if(s){var r=s[1],o=+r;isNaN(o)?(e=e||{})[r]=t(e[r],a,i):(e=e||[])[o]=t(e[o],a,i)}else e[n]=t(e[n],a,i);return e}(t,function(t){var e=[],a=new RegExp(n),i=/^([^\[\]]*)/.exec(t);for(i[1]&&e.push(i[1]);null!==(i=a.exec(t));)e.push(i[1]);return e}(e),a)}else{var i=t[e];i?(Array.isArray(i)||(t[e]=[i]),t[e].push(a)):t[e]=a}return t}function r(t,e,a){return a=a.replace(/(\r)?\n/g,"\r\n"),a=(a=encodeURIComponent(a)).replace(/%20/g,"+"),t+(t?"&":"")+encodeURIComponent(e)+"="+a}t.exports=function(t,e){"object"!=typeof e?e={hash:!!e}:void 0===e.hash&&(e.hash=!0);for(var n=e.hash?{}:"",o=e.serializer||(e.hash?s:r),l=t&&t.elements?t.elements:[],c=Object.create(null),u=0;u<l.length;++u){var h=l[u];if((e.disabled||!h.disabled)&&h.name&&i.test(h.nodeName)&&!a.test(h.type)){var p=h.name,d=h.value;if("checkbox"!==h.type&&"radio"!==h.type||h.checked||(d=void 0),e.empty){if("checkbox"!==h.type||h.checked||(d=""),"radio"===h.type&&(c[h.name]||h.checked?h.checked&&(c[h.name]=!0):c[h.name]=!1),void 0==d&&"radio"==h.type)continue}else if(!d)continue;if("select-multiple"!==h.type)n=o(n,p,d);else{d=[];for(var v=h.options,m=!1,f=0;f<v.length;++f){var _=v[f],g=e.empty&&!_.value,b=_.value||g;_.selected&&b&&(m=!0,n=e.hash&&"[]"!==p.slice(p.length-2)?o(n,p+"[]",_.value):o(n,p,_.value))}!m&&e.empty&&(n=o(n,p,""))}}}if(e.empty)for(var p in c)c[p]||(n=o(n,p,""));return n}},605:function(t,e,a){"use strict";a.r(e);var i=a(606),n=a.n(i);for(var s in i)"default"!==s&&function(t){a.d(e,t,function(){return i[t]})}(s);e.default=n.a},606:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i,n=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var a=arguments[e];for(var i in a)Object.prototype.hasOwnProperty.call(a,i)&&(t[i]=a[i])}return t},s=a(478),r=(i=s)&&i.__esModule?i:{default:i},o=function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e.default=t,e}(a(1245)),l=a(265);e.default={mixins:[l.publicMixin],data:function(){return{services:o,pickerOptions:{},ctimePick:"",list:[],currentPage:1,page:"",reset:null,option:{tooltip:{trigger:"axis",axisPointer:{}},toolbox:{feature:{}},legend:{},xAxis:[{type:"category"}],yAxis:[{type:"value",name:"浏览量",min:0,position:"left",axisLabel:{formatter:"{value}"}}],series:[]},multipleSelection:[],status:[{name:"昨天",value:"1"},{name:"3日内",value:"3"},{name:"7日内",value:"7"},{name:"30日内",value:"30"},{name:"60日内",value:"60"}],roleList:[{name:"融合发布库产品",value:"4"},{name:"主题产品",value:"2"},{name:"视读产品",value:"5"},{name:"听读产品",value:"6"},{name:"课件产品",value:"3"}],infoData:null,backMsg:"",stateValue:"",setBook:"",book_id:[],scantotal:"该时段内浏览量共 0 次",selectBook:"",bookdata:"",book_name:[],img_src:[],time:[{txt:"最近7天",value:6},{txt:"最近15天",value:14},{txt:"最近30天",value:29},{txt:"最近60天",value:59}],timeValue:"最近7天",where:{pageOffset:10,pageStart:0,tag:"",book_name:"",time:"",type:"",start_time:"",end_time:""},dialogVisible:!1,activeName2:"first"}},methods:{getList:function(t){var e=this;o.getList(t).then(function(t){e.list=t.data,e.page=t.page,log(t.data)})},addInfo:function(){this.dialogVisible=!0},del:function(t){var e=this;o.del({id:t}).then(function(t){e.getList(e.where)})},addsend:function(t){var e=this;this.$refs[t].validate(function(t){if(!t)return alert("error submit!!"),!1;o.save(e.infoAdd).then(function(t){e.getList(e.where)}),e.dialogVisible=!1,e.infoAdd={contents:"",title:"",type:""}})},search:function(){this.getList(this.where)},handleSizeChange:function(t){this.where.pageOffset=t,this.getList(this.where)},handleCurrentChange:function(t){this.where.pageStart=(t-1)*this.where.pageOffset,this.getList(this.where)},handleClick:function(){},seeSelectData:function(){var t=[],e=[],a=[];Array.from(document.querySelectorAll("input[type=checkbox]")).map(function(i){i.checked&&(t.push(i.value),e.push(i.getAttribute("book_name")),a.push(i.getAttribute("img_src")))}),0==t.length?this.$message({message:"请先选择然后查看",type:"warning"}):this.detail({book_id:t,book_name:e,img_src:a}),log(a)},detail:function(t){var e=t.book_id,a=t.book_name,i=t.img_src;log(i),this.book_id=e,this.book_name=a,this.img_src=i,this.getChartsData({type:"browse",txt:"浏览次数"}),this.dialogVisible=!0},getChartsData:function(t){var e=this;arguments.length>1&&void 0!==arguments[1]&&arguments[1];this.where.start_time?(t.start_time=this.where.start_time,t.end_time=this.where.end_time):t.time=isNaN(this.timeValue)?this.time[0].value:this.timeValue,o.detail(n({id:this.book_id},t)).then(function(a){var i=0;e.option.xAxis[0].data=[];var n=[];a.data.forEach(function(t,a){n[a]={type:"line",name:e.book_name[a],data:[]},t.forEach(function(t){0==a&&e.option.xAxis[0].data.push(t.date),n[a].data.push(t.value),i+=parseFloat(t.value)})}),e.option.legend.data=e.book_name,e.option.series=n,"销售金额"==t.txt?(e.option.yAxis[0].name="元",e.scantotal="这段时间段内总销售额为 "+i+"元"):(e.option.yAxis[0].name="次",e.scantotal="这段时间段内总浏览次数为 "+i+" 次"),log(e.option.legend.data),e.initial()})},change:function(){this.getChartsData({type:"browse",txt:"浏览数"},"")},initial:function(){var t=this;setTimeout(function(){t.myChart=r.default.init(document.querySelector("#myChart")),t.myChart.setOption(t.option)},200)},resetOption:function(){this.myChart.dispose()}},created:function(){this.reset=this.option,this.getList(this.where)},watch:{ctimePick:function(){this.where.start_time=this.ctimePick[0],this.where.end_time=this.ctimePick[1]}}}},607:function(t,e,a){}}]);