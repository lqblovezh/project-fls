(window.webpackJsonp=window.webpackJsonp||[]).push([[35],{1602:function(t,e,i){"use strict";i.r(e);var a=i(1710),n=i(881);for(var o in n)"default"!==o&&function(t){i.d(e,t,function(){return n[t]})}(o);i(1603);var s=i(0),r=Object(s.a)(n.default,a.a,a.b,!1,null,"a78f2d9c",null);e.default=r.exports},1603:function(t,e,i){"use strict";var a=i(883);i.n(a).a},1604:function(t,e,i){"use strict";var a=i(884);i.n(a).a},1677:function(t,e,i){"use strict";var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"box"},[i("div",{staticClass:"mainRight"},[i("div",{staticClass:"contentWrap"},[i("div",{staticClass:"contentLeft"},[i("div",{staticClass:"maindata"},[i("div",{staticClass:"serachWrap"},[i("div",{staticClass:"title"}),i("form",{staticClass:"clearfix",attrs:{id:"mainForm"}},[i("span",{staticClass:"group-inline"},[i("el-input",{attrs:{placeholder:"名称",name:"name",clearable:""},model:{value:t.searchQuery.name,callback:function(e){t.$set(t.searchQuery,"name",e)},expression:"searchQuery.name"}})],1),i("span",{staticClass:"group-inline"},[i("TimePick",{attrs:{inputsName:["start_time","end_time"]}})],1),i("span",{staticClass:"group-inline float-right"},[i("el-button",{attrs:{size:"mediu",type:"primary",icon:"el-icon-plus",plain:""},on:{click:t.addQrcode}},[t._v("创建")]),i("el-button",{attrs:{size:"mediu",type:"primary",icon:"el-icon-search",plain:""},on:{click:t.query}},[t._v("搜索")])],1)])]),i("div",{staticClass:"btn"},[i("el-button-group",[i("el-button",{attrs:{type:"primary",plain:""},on:{click:t.getList}},[t._v("全部")]),i("el-button",{attrs:{type:"primary",plain:""},on:{click:t.getusedList}},[t._v("已使用")]),i("el-button",{attrs:{type:"primary",plain:""},on:{click:t.getnoUseList}},[t._v("未使用")])],1)],1),i("div",{staticClass:"tableWrap"},[i("div",{staticClass:"tableTop"},[i("div",{staticClass:"title vel-line"},[i("span",[t._v("全部 "),t.page?i("span",{staticClass:"totalNum"},[t._v("("+t._s(t.page.total)+")")]):t._e()]),i("div",{staticClass:"btns"},[i("el-button",{attrs:{size:"mini",type:"primary",plain:""},on:{click:function(e){return t.educe("")}}},[t._v("导出")]),i("el-button",{attrs:{size:"mini",type:"primary",plain:""},on:{click:function(e){return t.delChoosen(!1)}}},[t._v("删除")])],1)])]),i("table",{staticClass:"table"},[i("thead",[i("tr",[i("th",{staticClass:"table-check"},[i("input",{attrs:{type:"checkbox"},on:{click:function(e){return t.$checkAll(e)}}})]),i("th",[t._v("名称")]),i("th",[t._v("印码位置")]),i("th",[t._v("简介")]),i("th",[t._v("类型")]),i("th",{attrs:{width:"150"}},[t._v("使用状态")]),i("th",[t._v("创建时间")]),i("th",{attrs:{width:"80"}},[t._v("操作")])])]),t.list?i("tbody",t._l(t.list,function(e){return i("tr",[i("th",[i("input",{ref:"ids",refInFor:!0,attrs:{type:"checkbox",name:"ids"},domProps:{value:e.id}})]),i("th",[i("img",{staticClass:"cover-photo",attrs:{src:e.img_src}}),i("div",{staticClass:"th-name bookName",attrs:{title:e.name}},[t._v(t._s(e.name))])]),i("th",[i("div",{staticClass:"th-name"},[t._v(t._s(e.position_name))])]),i("th",[i("div",{staticClass:"th-name"},[t._v(t._s(e.abs))])]),i("th",[i("div",{staticClass:"th-name"},[t._v(t._s(e.type_name))])]),i("th",[i("div",{staticClass:"th-name"},[t._v(t._s(e.product_status_name))])]),i("th",[i("div",{staticClass:"th-name"},[t._v(t._s(e.create_time))])]),i("th",[i("div",{staticClass:"btns"},[i("Icon",{attrs:{type:"icon-detail",title:"详情"},on:{click:function(i){return t.opneDetailDialog("info",e)}}}),"true"!=e.product_status?i("Icon",{attrs:{type:"icon-delete",title:"删除"},on:{click:function(i){return t.delChoosen(e.id,e)}}}):t._e(),i("Icon",{attrs:{type:"icon-export",title:"导出二维码"},on:{click:function(i){return t.educe([e.id])}}})],1)])])}),0):t._e()]),t.page?i("div",{staticClass:"pageWrap"},[i("el-pagination",{attrs:{small:!1,background:"","current-page":t.page.num,"page-sizes":[10,50,100],"page-size":t.page.offset,layout:"total, sizes,prev, pager, next, jumper",total:t.page.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1):t._e()])])])])]),i("div",{staticClass:"dialogs"},[i("el-dialog",{attrs:{center:!1,visible:t.detailDialog,"close-on-click-modal":!1,top:"50px",width:"1000px",title:"详情"},on:{"update:visible":function(e){t.detailDialog=e}}},[i("div",{staticClass:"content",attrs:{slot:"title"},slot:"title"},[t.detailDialog?i("Detail",{attrs:{detailDialog:t.detailDialog,readOnly:t.readOnly,detailData:t.detailData},on:{"update:detailDialog":function(e){t.detailDialog=e},"update:detail-dialog":function(e){t.detailDialog=e},close:t.close,saveok:t.saveok}}):t._e()],1)])],1)])},n=[];i.d(e,"a",function(){return a}),i.d(e,"b",function(){return n})},1710:function(t,e,i){"use strict";var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"div"},[t.resourceDialog?i("Resource",{attrs:{resourceDialog:t.resourceDialog,curSoucesList:[],singleElection:!1,type:"9"},on:{"update:resourceDialog":function(e){t.resourceDialog=e},"update:resource-dialog":function(e){t.resourceDialog=e},select:t.addSelect}}):t._e(),i("VaForm",{ref:"detailForm"},[i("form",{ref:"detailForm",staticClass:"detailForm"},[i("fieldset",[i("div",{staticClass:"group"},[i("div",{staticClass:"label"},[t._v("*二维码名称:")]),i("input",{directives:[{name:"va",rawName:"v-va",value:{type:"required"},expression:"{ type:'required' }"},{name:"model",rawName:"v-model",value:t.information.name,expression:"information.name"}],staticClass:"form-control",attrs:{type:"text",maxlength:"20"},domProps:{value:t.information.name},on:{input:function(e){e.target.composing||t.$set(t.information,"name",e.target.value)}}})]),i("div",{staticClass:"group"},[i("div",{staticClass:"label"},[t._v("*描述:")]),i("input",{directives:[{name:"va",rawName:"v-va",value:{type:"required"},expression:"{ type:'required' }"},{name:"model",rawName:"v-model",value:t.information.abs,expression:"information.abs"}],staticClass:"form-control",attrs:{type:"text",maxlength:"20"},domProps:{value:t.information.abs},on:{input:function(e){e.target.composing||t.$set(t.information,"abs",e.target.value)}}})]),i("div",{staticClass:"group"},[i("div",{staticClass:"label"},[t._v("*二维码类型:")]),i("el-select",{model:{value:t.information.code_type,callback:function(e){t.$set(t.information,"code_type",e)},expression:"information.code_type"}},t._l(t.codeType,function(t){return i("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})}),1)],1),"agility"!=t.information.code_type?i("div",{staticClass:"group"},[i("div",{staticClass:"label"},[t._v("固定链接地址:")]),i("input",{directives:[{name:"model",rawName:"v-model",value:t.config.value,expression:"config.value"},{name:"va",rawName:"v-va",value:{type:"required"},expression:"{ type:'required' }"}],staticClass:"form-control",staticStyle:{width:"300px"},attrs:{placeholder:"输入链接地址"},domProps:{value:t.config.value},on:{input:function(e){e.target.composing||t.$set(t.config,"value",e.target.value)}}})]):t._e(),"agility"==t.information.code_type?i("div",{staticClass:"group"},[i("div",{staticClass:"label"},[t._v("*最多消息条数:")]),i("el-select",{model:{value:t.information.msg_num,callback:function(e){t.$set(t.information,"msg_num",e)},expression:"information.msg_num"}},t._l(t.messages,function(t){return i("el-option",{key:t.value,attrs:{label:t.name,value:t.value}})}),1)],1):t._e(),i("div",{staticClass:"group"},[i("div",{staticClass:"label"},[t._v("所属图书(不必填):")]),i("input",{directives:[{name:"model",rawName:"v-model",value:t.information.books_info,expression:"information.books_info"}],staticClass:"form-control",attrs:{type:"text",maxlength:"20",disabled:""},domProps:{value:t.information.books_info},on:{input:function(e){e.target.composing||t.$set(t.information,"books_info",e.target.value)}}}),i("el-button",{staticClass:"modify",attrs:{type:"primary",size:"mini"},on:{click:function(e){t.resourceDialog=!0}}},[t._v("修改")])],1),i("div",{staticClass:"group"},[i("div",{staticClass:"label"},[t._v("二维码样式:")]),i("div",{staticClass:"left"},[t.information.config?i("vueQriousjs",{attrs:{config:t.config}}):t._e(),i("div",{staticClass:"div",staticStyle:{margin:"0 auto"}},[i("el-slider",{attrs:{max:300,min:200},model:{value:t.config.size,callback:function(e){t.$set(t.config,"size",e)},expression:"config.size"}}),i("img",{staticClass:"img_logo",attrs:{src:t.information.img_src_logo}}),i("el-button",{attrs:{type:"primary",size:"small",plain:""},on:{click:function(e){return t.$refs.treeImgInp.click()}}},[t._v("上传logo")]),i("input",{ref:"treeImgInp",staticClass:"hide",attrs:{type:"file"},on:{change:t.treeImgInpChange}}),i("el-color-picker",{model:{value:t.config.background,callback:function(e){t.$set(t.config,"background",e)},expression:"config.background"}}),i("el-color-picker",{model:{value:t.config.foreground,callback:function(e){t.$set(t.config,"foreground",e)},expression:"config.foreground"}})],1)],1),i("el-button",{staticClass:"generate",attrs:{type:"primary",plain:"",size:"mini"},on:{click:function(e){return t.getQrcode()}}},[t._v("生成")]),i("div",{staticClass:"right"},[i("img",{staticClass:"qrImg",attrs:{src:t.information.img_src}})])],1),i("div",{staticClass:"group"},[i("div",{staticClass:"label"},[t._v("*印刷位置:")]),i("el-radio-group",{model:{value:t.information.position,callback:function(e){t.$set(t.information,"position",e)},expression:"information.position"}},t._l(t.localPrinting,function(e){return i("el-radio",{key:e.position,attrs:{label:e.position}},[t._v(t._s(e.position_name))])}),1)],1),t.readOnly?t._e():i("div",{staticClass:"btn"},[i("el-button",{attrs:{type:"info"},on:{click:function(e){return t.$emit("close")}}},[t._v("取消")]),"true"!=t.information.product_status?i("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.submitInfo("detailForm")}}},[t._v("确定")]):t._e()],1)])])])],1)},n=[];i.d(e,"a",function(){return a}),i.d(e,"b",function(){return n})},260:function(t,e,i){"use strict";i.r(e);var a=i(1677),n=i(879);for(var o in n)"default"!==o&&function(t){i.d(e,t,function(){return n[t]})}(o);i(1604);var s=i(0),r=Object(s.a)(n.default,a.a,a.b,!1,null,"6bfc463f",null);e.default=r.exports},879:function(t,e,i){"use strict";i.r(e);var a=i(880),n=i.n(a);for(var o in a)"default"!==o&&function(t){i.d(e,t,function(){return a[t]})}(o);e.default=n.a},880:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var i=arguments[e];for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(t[a]=i[a])}return t},n=i(293),o=(l(i(282)),function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e.default=t,e}(i(653))),s=l(i(1602)),r=i(49);function l(t){return t&&t.__esModule?t:{default:t}}e.default={components:{Detail:s.default},mixins:[n.main],data:function(){return{services:o,detailDialog:!1,detailDialoaType:"info",detailData:{},readOnly:!1}},created:function(){},methods:a({close:function(){this.detailDialog=!1},educe:function(t){var e=this,i=null;(i=t||this.$getChecked())&&o.educe({id:i}).then(function(t){e.$message.success("任务创建成功，请前往'导入导出列表'页查看进度！")}).catch(function(t){e.$message.error("导出失败")})},opneDetailDialog:function(t,e){this.detailDialog=!0,this.detailData=e},addQrcode:function(){this.detailDialog=!0,this.detailData={}},getusedList:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.page&&this.page.num||1,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:this.page&&this.page.offset||10,i=this,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"true";this.services.getList(a({pageNum:t,pageOffset:e},n,{product_status:o})).then(function(t){i.setList(t.data),i.setPage(t.page)})},getnoUseList:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.page&&this.page.num||1,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:this.page&&this.page.offset||10,i=this,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"false";this.services.getList(a({pageNum:t,pageOffset:e},n,{product_status:o})).then(function(t){i.setList(t.data),i.setPage(t.page)})},setList:function(t){this.setSerieslist(t)},setPage:function(t){this.setSerieslistPage(t)},saveok:function(t){this.detailData.id||(this.detailData=t),this.getList()}},(0,r.mapMutations)(["setSerieslist","setSerieslistPage"])),computed:a({},(0,r.mapState)({list:function(t){return t.series.list},page:function(t){return t.series.page}}))}},881:function(t,e,i){"use strict";i.r(e);var a=i(882),n=i.n(a);for(var o in a)"default"!==o&&function(t){i.d(e,t,function(){return a[t]})}(o);e.default=n.a},882:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=c(i(15)),n=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var i=arguments[e];for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(t[a]=i[a])}return t},o=(c(i(282)),c(i(284))),s=l(i(103)),r=l(i(653));function l(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e.default=t,e}function c(t){return t&&t.__esModule?t:{default:t}}function u(t){return function(){var e=t.apply(this,arguments);return new Promise(function(t,i){return function a(n,o){try{var s=e[n](o),r=s.value}catch(t){return void i(t)}if(!s.done)return Promise.resolve(r).then(function(t){a("next",t)},function(t){a("throw",t)});t(r)}("next")})}}e.default={props:["detailData","readOnly","detailDialog"],created:function(){this.codePosition(),this.detailData.id?this.getDetail():this.information.config=this.config},components:{Resource:o.default},data:function(){return{information:{code_type:"agility",config:null},previewImgUrl:null,imgUrl:null,file:null,checkAll:!1,content:"view",resourceDialog:!1,messages:[{name:"1条",value:1},{name:"2条",value:2},{name:"3条",value:3},{name:"4条",value:4},{name:"5条",value:5},{name:"6条",value:6},{name:"7条",value:7},{name:"8条",value:8}],localPrinting:[],codeType:[{label:"固定链接地址",value:"fixed"},{label:"灵活配置",value:"agility"}],config:{background:"#fff",foreground:"#000",level:"Q",padding:0,size:255,value:""}}},methods:{codePosition:function(){var t=this;r.codePosition().then(function(e){t.localPrinting=e.data})},addRes:function(t){this.resourceDialog=!0},getDetail:function(){var t=this;r.detail({id:this.detailData.id}).then(function(e){t.information=e.data,e.data.config?(t.config=e.data.config,delete t.config.logo,t.config.size=Number(e.data.config.size)):t.information.config=t.config,t.information.code_type||t.$set(t.information,"code_type","agility")})},getQrcode:function(){var t=this;s.generate({logo:this.information.img_logo,color:this.config.foreground,bg_color:this.config.background,size:this.config.size,content:this.config.value}).then(function(e){t.$set(t.information,"img_src",e.data.url),t.$set(t.information,"img",e.data.path)})},addSelect:function(t,e){this.information.constitute_id=t[0],this.$set(this.information,"books_info",e[0].name),this.resourceDialog=!1},treeImgInpChange:function(){var t=u(a.default.mark(function t(e){var i,n;return a.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(i=e.target.files[0]){t.next=3;break}return t.abrupt("return");case 3:return t.next=5,this.$globalUpdateFile(i);case 5:n=t.sent,this.$set(this.information,"img_src_logo",n.url),this.$set(this.information,"img_logo",n.path);case 8:case"end":return t.stop()}},t,this)}));return function(e){return t.apply(this,arguments)}}(),submitInfo:function(){var t=u(a.default.mark(function t(){var e,i=this;return a.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return(e=n({id:this.detailData.id},this.information,{config:n({},this.config,{logo:this.information.img_logo}),content:"agility"!=this.information.code_type?this.config.value:null})).books_info||(e.books_info=""),t.next=4,r.save(e).then(function(t){i.$message.success("操作成功!"),i.$emit("saveok",t.data)}).catch(function(t){i.$message({message:t.message||"错误!",type:"error"})});case 4:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}()}}},883:function(t,e,i){},884:function(t,e,i){}}]);