(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{1206:function(t,e,a){"use strict";var i=a(640);a.n(i).a},1256:function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"setting"},[i("div",{staticClass:"head"},[i("el-button-group",[i("el-button",{on:{click:function(e){t.$router.push({path:"/wms/setting/banner"})}}},[t._v("banner设置")]),i("el-button",{on:{click:function(e){t.$router.push({path:"/wms/setting/ad"})}}},[t._v("广告位")]),i("el-button",{on:{click:function(e){t.$router.push({path:"/wms/setting/commend"})}}},[t._v("推荐设置")]),i("el-button",{attrs:{type:"primary"},on:{click:function(e){t.$router.push({path:"/wms/setting/footer"})}}},[t._v("底部设置")])],1),i("div",{staticClass:"flat"},[i("el-radio",{attrs:{label:"outLink"},model:{value:t.toPage,callback:function(e){t.toPage=e},expression:"toPage"}},[t._v("友情链接")]),i("el-radio",{attrs:{label:"ewm"},model:{value:t.toPage,callback:function(e){t.toPage=e},expression:"toPage"}},[t._v("二维码")]),i("el-radio",{attrs:{label:"copyright"},model:{value:t.toPage,callback:function(e){t.toPage=e},expression:"toPage"}},[t._v("版权编辑")])],1)],1),i("div",{staticClass:"content"},["outLink"==t.toPage?i("div",{staticClass:"part"},[i("div",{staticClass:"title"},[t._v("友情链接 :")]),i("div",{staticClass:"list"},[t._l(t.tableData.outLink,function(e,n){return i("div",{staticClass:"item"},[i("el-input",{staticClass:"width",attrs:{placeholder:"名称",value:e.name}}),i("el-input",{staticClass:"width",attrs:{placeholder:"链接",value:e.src}}),i("el-button",{attrs:{type:"info"},on:{click:function(a){t.open(e)}}},[t._v("修改")]),i("el-button",{attrs:{type:"danger"},on:{click:function(e){t.del(n)}}},[t._v("删除")]),i("img",{staticClass:"icon up",attrs:{src:a(626),alt:"icon"},on:{click:function(e){t.up(n)}}}),i("img",{staticClass:"icon down",attrs:{src:a(627),alt:"icon"},on:{click:function(e){t.down(n)}}})],1)}),i("div",{staticClass:"add"},[i("el-button",{attrs:{type:"primary"},on:{click:function(e){t.open("")}}},[t._v("新增")])],1)],2)]):"ewm"==t.toPage?i("div",{staticClass:"part"},[i("div",{staticClass:"title"},[t._v("二维码 :")]),i("div",{staticClass:"list ewm"},t._l(t.tableData.ewm,function(e,a){return i("div",{staticClass:"item"},[i("div",[i("img",{staticClass:"thumb",attrs:{src:e.img}})]),i("el-button",{attrs:{type:"info",size:"small"},on:{click:function(a){t.open(e)}}},[t._v("修改")]),i("el-button",{attrs:{type:"danger",size:"small"},on:{click:function(e){t.del(a)}}},[t._v("删除")])],1)})),i("div",{staticClass:"add"},[i("el-button",{attrs:{type:"primary"},on:{click:function(e){t.open("")}}},[t._v("新增")])],1)]):i("div",{staticClass:"part"},[i("div",{staticClass:"title"},[t._v("版权编辑 :")]),i("div",{staticClass:"list"},[i("div",{staticClass:"item"},[i("el-input",{staticClass:"w",attrs:{type:"textarea",rows:8},model:{value:t.tableData.copyright,callback:function(e){t.$set(t.tableData,"copyright",e)},expression:"tableData.copyright"}})],1),i("el-button",{attrs:{type:"primary"},on:{click:t.save_copyright}},[t._v("保存")])],1)]),i("el-dialog",{attrs:{title:"操作",width:"500px",visible:t.dialogVisible},on:{"update:visible":function(e){t.dialogVisible=e}}},[i("el-form",{ref:"form"},["outLink"==t.toPage?i("el-form-item",{attrs:{label:"名称:"}},[i("el-input",{attrs:{placeholder:"请输入链接名称"},model:{value:t.form.name,callback:function(e){t.$set(t.form,"name",e)},expression:"form.name"}})],1):t._e(),"outLink"==t.toPage?i("el-form-item",{attrs:{label:"链接:"}},[i("el-input",{attrs:{placeholder:"请输入关联URL地址 eg:http://www.baidu.com/x-book.html"},model:{value:t.form.src,callback:function(e){t.$set(t.form,"src",e)},expression:"form.src"}})],1):t._e(),i("el-form-item",{directives:[{name:"show",rawName:"v-show",value:"ewm"==t.toPage,expression:"toPage == 'ewm' "}]},[i("img",{ref:"img",staticClass:"banner",attrs:{src:t.form.img}}),i("input",{ref:"updateImg",staticClass:"updateImg",attrs:{type:"file"},on:{change:function(e){t.update(e,"img")}}}),i("el-button",{attrs:{type:"primary",size:"small",plain:""},on:{click:function(e){t.$refs.updateImg.click()}}},[t._v("上传二维码")])],1)],1),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(e){t.dialogVisible=!1}}},[t._v("取消")]),i("el-button",{attrs:{type:"primary"},on:{click:function(e){t.sendInfo("updateImg")}}},[t._v("确定")])],1)],1)],1)])},n=[];a.d(e,"a",function(){return i}),a.d(e,"b",function(){return n})},290:function(t,e,a){"use strict";a.r(e);var i=a(1256),n=a(638);for(var s in n)"default"!==s&&function(t){a.d(e,t,function(){return n[t]})}(s);a(1206);var o=a(0),r=Object(o.a)(n.default,i.a,i.b,!1,null,"4ce1750c",null);r.options.__file="footer.vue",e.default=r.exports},308:function(t,e){var a=/^(?:submit|button|image|reset|file)$/i,i=/^(?:input|select|textarea|keygen)/i,n=/(\[[^\[\]]*\])/g;function s(t,e,a){if(e.match(n)){!function t(e,a,i){if(0===a.length)return e=i;var n=a.shift(),s=n.match(/^\[(.+?)\]$/);if("[]"===n)return e=e||[],Array.isArray(e)?e.push(t(null,a,i)):(e._values=e._values||[],e._values.push(t(null,a,i))),e;if(s){var o=s[1],r=+o;isNaN(r)?(e=e||{})[o]=t(e[o],a,i):(e=e||[])[r]=t(e[r],a,i)}else e[n]=t(e[n],a,i);return e}(t,function(t){var e=[],a=new RegExp(n),i=/^([^\[\]]*)/.exec(t);for(i[1]&&e.push(i[1]);null!==(i=a.exec(t));)e.push(i[1]);return e}(e),a)}else{var i=t[e];i?(Array.isArray(i)||(t[e]=[i]),t[e].push(a)):t[e]=a}return t}function o(t,e,a){return a=a.replace(/(\r)?\n/g,"\r\n"),a=(a=encodeURIComponent(a)).replace(/%20/g,"+"),t+(t?"&":"")+encodeURIComponent(e)+"="+a}t.exports=function(t,e){"object"!=typeof e?e={hash:!!e}:void 0===e.hash&&(e.hash=!0);for(var n=e.hash?{}:"",r=e.serializer||(e.hash?s:o),u=t&&t.elements?t.elements:[],c=Object.create(null),l=0;l<u.length;++l){var d=u[l];if((e.disabled||!d.disabled)&&d.name&&i.test(d.nodeName)&&!a.test(d.type)){var f=d.name,h=d.value;if("checkbox"!==d.type&&"radio"!==d.type||d.checked||(h=void 0),e.empty){if("checkbox"!==d.type||d.checked||(h=""),"radio"===d.type&&(c[d.name]||d.checked?d.checked&&(c[d.name]=!0):c[d.name]=!1),void 0==h&&"radio"==d.type)continue}else if(!h)continue;if("select-multiple"!==d.type)n=r(n,f,h);else{h=[];for(var p=d.options,m=!1,g=0;g<p.length;++g){var v=p[g],b=e.empty&&!v.value,A=v.value||b;v.selected&&A&&(m=!0,n=e.hash&&"[]"!==f.slice(f.length-2)?r(n,f+"[]",v.value):r(n,f,v.value))}!m&&e.empty&&(n=r(n,f,""))}}}if(e.empty)for(var f in c)c[f]||(n=r(n,f,""));return n}},309:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.main=void 0;var i,n=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var a=arguments[e];for(var i in a)Object.prototype.hasOwnProperty.call(a,i)&&(t[i]=a[i])}return t},s=a(308);(i=s)&&i.__esModule;var o={data:function(){return{tableData:[],total:0,page:{pageOffset:10,pageNum:1},ids:[],isTeacher:"",dialogVisible:!1,detailVisible:!1,detailData:[],productType:null}},created:function(){this.isTeacher=this.$config.isTeacher,this.getList(n({},this.query,this.page))},methods:{seareHandeler:function(){this.page.pageNum=1,this.getList(n({},this.query))},getList:function(t){var e=this;this.service&&this.service.getList(t).then(function(t){t&&t.status&&(e.tableData=t.data,e.total=t.page.total)})},handleSelectionChange:function(t){this.ids=t.map(function(t){return t.id}),this.multipleSelection=t},update:function(t,e){this.$refs[e].src=URL.createObjectURL(t.target.files[0])},getTime:function(t){t||(t=["",""]),this.query.time_start=t[0],this.query.time_end=t[1],this.query.start_time=t[0],this.query.end_time=t[1]},handleSizeChange:function(t){this.page.pageOffset=t,this.getList(n({},this.page,this.query))},handleCurrentChange:function(t){this.page.pageNum=t,this.getList(n({},this.page,this.query))},handleClose:function(){this.detailVisible=!1,this.dialogVisible=!1},del:function(t){var e=this;this.$confirm("你真的要删除该数据吗？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){e.service.del({id:t}).then(function(t){t&&t.status&&(e.getList(n({},e.page,e.query)),e.$message.success("删除成功"))},function(t){var a=t.payload;e.$message.error(a.message)})}).catch(function(){})},save:function(t){var e=this;t||(t=this.form),this.service.save(t).then(function(t){t.status&&(e.$message.success("保存成功"),e.getList(e.query)),e.dialogVisible=!1,e.$refs.child.dialogVisible=!1},function(t){e.$message.error(t.payload.message)})},educe:function(t){this.service.educe({id:t}).then(function(t){window.location.href=t.data.url})},detail:function(t){var e=this;this.service.detail({id:t}).then(function(t){e.detailData=t.data,log(t,"detail")}),this.$refs.child.dialogVisible=!0},showDetail:function(t,e){var a=this;log("------------"),this.service.detail({id:t}).then(function(t){log(t,"detailInfo"),a.detailData=t.data,a.productType=e,a.detailVisible=!0})}}};e.main=o},314:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.getTask=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},a=arguments[2];return t.size,t.size>=1048576?(e.is_chunk=!0,(0,i.request_post)("/common/api/files/upload_task?r="+Math.random(5)).then(function(n){if(n.status)return e.task_id=n.data.task_id,(0,i.request_file)("/common/api/files/upload",{file:t,data:e},a);throw new Error(n.messages)}).catch(function(t){throw new Error("上传失败")})):(e.is_chunk=!1,(0,i.request_file)("/common/api/files/upload",{file:t,data:e}))},e.getAppId=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,i.request_get)("/common/api/app/search_name",t).then(function(t){return n.default.app_id=t.data.id,sessionStorage.app_id=t.data.id,t})},e.getClientToken=function(){return(0,i.request_post)("/common/api/auth/token/pcclient")},e.platInfo=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,i.request_get)(r(t)).then(function(t){return n.default.app_id=t.data.id,sessionStorage.app_id=t.data.id,document.title=t.data.name,t})},e.commonPreview=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,i.request_get)(c(t))},e.commonPreviewCode=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,i.request_post)("/api/preview",t)},e.getQrcode=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,i.request_get)("/common/api/get_qrcode",t)},e.synchronization=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,i.request_get)(u(t)).then(function(t){return t})},e.getAuthor=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,i.request_get)("/api/ecommerce/author",t)},e.addAuthor=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,i.request_post)("/api/ecommerce/author",t)},e.getWeixinConfig=function(t){return(0,i.request_get)("/common/api/third/wx_js_sdk/config",t)};o(a(52));var i=a(51),n=o(a(53)),s=o(a(85));function o(t){return t&&t.__esModule?t:{default:t}}s.default.compile("/common/api/files/upload_task/:id"),s.default.compile("/common/api/manager/managers/:id"),s.default.compile("/common/api/manager/roles/:id");var r=s.default.compile("/common/api/app/apps/:id"),u=s.default.compile("/common/api/dragon_infos/:id");var c=s.default.compile("/api/preview/:id")},354:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.getList=function(t){return i.request_get("/api/setting/all",t)},e.save=function(t){if(t.id)return i.request_put(o(t),t);return i.request_post("/api/setting",t)},e.del=function(t){return i.request_delete(o(t),t)},e.files_move=function(t){return i.request_put("/api/setting/files_move",t)},e.recommend=function(t){return i.request_post("/api/recommend",t)},e.courseList=function(t){return i.request_get("/api/recommend/list",t)},e.courseDel=function(t){return i.request_delete(r({id:t.id}),t)},e.teacherList=function(){return i.request_get("/common/api/user/users/teacher")};var i=function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e.default=t,e}(a(51)),n=s(a(85));s(a(52));function s(t){return t&&t.__esModule?t:{default:t}}var o=n.default.compile("/api/setting/:id"),r=(n.default.compile("/api/live/online/:id"),n.default.compile("/api/live/state/:id"),n.default.compile("/api/recommend/:id"))},383:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.pub=void 0;var i=r(a(15)),n=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var a=arguments[e];for(var i in a)Object.prototype.hasOwnProperty.call(a,i)&&(t[i]=a[i])}return t},s=r(a(52)),o=a(314);function r(t){return t&&t.__esModule?t:{default:t}}var u={methods:{open:function(t){this.dialogVisible=!0,t?(this.form=t,this.type="update"):(this.type="add",this.form={})},getList:function(){var t=this;arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.radio;this.service.getList({key:this.radio}).then(function(e){log(e),e.data[0]?(t.id=e.data[0].id,t.tableData=Object.values(s.default.parse(e.data[0].value))):(t.id="",t.tableData=[])})},sendInfo:function(){var t,e=(t=i.default.mark(function t(e){var a,s,r=this;return i.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(a=this.$loading({text:"正在上传",background:"rgba(0, 0, 0, 0.8)"}),!this.$refs[e].files[0]){t.next=7;break}return s=void 0,t.next=5,(0,o.getTask)(this.$refs[e].files[0]).then(function(t){s=t.data.path});case 5:return t.next=7,this.service.files_move({temp:s}).then(function(t){var e=n({},r.form);e.img=t.data,"add"==r.type?(log(r.tableData,7),r.tableData.push(e)):r.form.img=t.data});case 7:a.close(),this.$refs[e].value=0,this.changeData();case 10:case"end":return t.stop()}},t,this)}),function(){var e=t.apply(this,arguments);return new Promise(function(t,a){return function i(n,s){try{var o=e[n](s),r=o.value}catch(t){return void a(t)}if(!o.done)return Promise.resolve(r).then(function(t){i("next",t)},function(t){i("throw",t)});t(r)}("next")})});return function(t){return e.apply(this,arguments)}}(),del:function(t){this.tableData.splice(t,1),this.changeData()},changeData:function(t){this.save({position:this.radio,key:this.radio,value:s.default.stringify(this.tableData),type:2,id:this.id})},up:function(t){0==t?this.tableData.push(this.tableData.shift()):this.tableData=this.swapItems(this.tableData,t,t-1),this.$message.success("上移成功"),this.changeData()},down:function(t){t==this.tableData.length-1?this.tableData.unshift(this.tableData.pop()):this.tableData=this.swapItems(this.tableData,t,t+1),this.$message.success("下移成功"),this.changeData()},swapItems:function(t,e,a){return t[e]=t.splice(a,1,t[e])[0],t}},watch:{radio:function(){log(this.radio),this.getList({key:this.radio})}}};e.pub=u},626:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAYCAYAAAD6S912AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAEkSURBVEhLY2AYBcghoFZfJKJeX55ASqgw4VJsX1/PwvSfdTFQXoEqBr78/72egZHBgxTDQGqxulCjvtSHgZGxhlTDsBqoVl+p8f8/43JyDAPpYUTWqFVfz/P3/4/jjIwMOuQYeKOxkxHFy//+/5hPrmEwB8ANVK8vKwG6N4QclyHrARuoWV/hwvCfoZ1Sw+CR8pfhvwQjIyML1Qy81di5BOjCHqoZCDJInJGjkuH//wOUGgqPlIONjX+YGP9FAl36hBJDUdIhyCCN+jKL//8ZDsPC9D8DQ+PNxs4GYi3ByHo3GrtOMDL+zyTWAHR1WPPyjcbuOcDwXECOoTiLr++MnJnA8DxDqqE4DXzY2PjjPyNDKCPD/zekGopXPaigpaqBA24YADNRSiMxf6PpAAAAAElFTkSuQmCC"},627:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAYCAYAAAD6S912AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAERSURBVEhL7dS9DsFQFAfw/2k6Gg1sRoMH8AAGg5HBZkBSs0UiwWTxBCpBSLyGxMDgMQwGD0CI41SiUVpxb5tYdOly7q/no+cC/+e5A1xHnKuoqHTFCArmDkxmzEBIRQPu0SFCXgVzYn0zvFZRIEZbFfMFpW9pKXOhgzlnyDOEBmJ8xlpKzeiANAR5SuYLxrrYIwEXvNbQlHSLOpk9n7mDXENOXv2wmDsUJiSkVDMy0BhizsAgMvA+7iRagi7Dou5QqIcLmSgLuguDev5DB5ItycrfuXJ7yuiRje63H3lbPWOEjRy2vgVe43x32bAxktInOmjg9UUnWHJ9bVXRYHCKoyxmSTI9qKIf452LNlLw59gNK0U5AOXGWm0AAAAASUVORK5CYII="},638:function(t,e,a){"use strict";a.r(e);var i=a(639),n=a.n(i);for(var s in i)"default"!==s&&function(t){a.d(e,t,function(){return i[t]})}(s);e.default=n.a},639:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=l(a(15)),n=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var a=arguments[e];for(var i in a)Object.prototype.hasOwnProperty.call(a,i)&&(t[i]=a[i])}return t},s=a(309),o=l(a(52)),r=a(383),u=a(314),c=function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e.default=t,e}(a(354));function l(t){return t&&t.__esModule?t:{default:t}}e.default={mixins:[s.main,r.pub],data:function(){return{radio:"bottom",dialogVisible:!1,service:c,tableData:{outLink:[],ewm:[],copyright:""},id:"",toPage:"outLink",type:"add",form:{src:"",name:"",img:""}}},methods:{getList:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{key:this.radio};this.service.getList(e).then(function(e){log(e),e.data[0]?(t.id=e.data[0].id,t.tableData=o.default.parse(e.data[0].value),t.tableData.outLink||(t.tableData.outLink=[]),t.tableData.ewm||(t.tableData.ewm=[])):(t.id="",t.tableData={outLink:[],ewm:[],copyright:""})})},sendInfo:function(){var t,e=(t=i.default.mark(function t(e){var a,s,o=this;return i.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(a=this.$loading({text:"正在上传",background:"rgba(0, 0, 0, 0.8)"}),!this.$refs[e].files[0]){t.next=9;break}return s=void 0,t.next=5,(0,u.getTask)(this.$refs[e].files[0]).then(function(t){s=t.data.url});case 5:return t.next=7,this.service.files_move({temp:s}).then(function(t){var e=n({},o.form);e.img=t.data,"add"==o.type?o.tableData[o.toPage].push(e):o.form.img=t.data});case 7:t.next=10;break;case 9:"add"==this.type&&this.tableData[this.toPage].push(this.form);case 10:a.close(),this.form={src:"",img:"",name:""},this.changeData();case 13:case"end":return t.stop()}},t,this)}),function(){var e=t.apply(this,arguments);return new Promise(function(t,a){return function i(n,s){try{var o=e[n](s),r=o.value}catch(t){return void a(t)}if(!o.done)return Promise.resolve(r).then(function(t){i("next",t)},function(t){i("throw",t)});t(r)}("next")})});return function(t){return e.apply(this,arguments)}}(),up:function(t){0==t?this.tableData.outLink.push(this.tableData.outLink.shift()):this.tableData.outLink=this.swapItems(this.tableData.outLink,t,t-1),this.$message.success("上移成功"),this.changeData()},down:function(t){t==this.tableData.outLink.length-1?this.tableData.outLink.unshift(this.tableData.outLink.pop()):this.tableData.outLink=this.swapItems(this.tableData.outLink,t,t+1),this.$message.success("下移成功"),this.changeData()},del:function(t){this.tableData[this.toPage].splice(t,1),this.changeData()},save_copyright:function(){this.changeData()}}}},640:function(t,e,a){}}]);