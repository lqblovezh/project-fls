(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{1190:function(t,e,i){"use strict";var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"div"},[t.readerDialog?i("Reader",{attrs:{readerDialog:t.readerDialog,currId:t.currknowledgeId,readerId:t.readerId,detailData:t.detailData,version:"production",markBtn:"锚点"},on:{"update:readerDialog":function(e){t.readerDialog=e},addAnchorSuccess:t.addAnchorSuccess}}):t._e(),i("div",{staticClass:"dialogs"},[i("el-dialog",{attrs:{center:!1,visible:t.groupDialog,"close-on-click-modal":!1,top:"50px",width:"500px","append-to-body":""},on:{"update:visible":function(e){t.groupDialog=e}}},[i("div",{staticClass:"header",attrs:{slot:"title"},slot:"title"},[i("el-tabs",{attrs:{value:"detail"}},[i("el-tab-pane",{attrs:{label:"知识点结构",name:"detail"}})],1)],1),i("VaForm",{ref:"groupFormVa"},[i("form",{ref:"groupForm"},[i("input",{staticClass:"hide",attrs:{name:"id"},domProps:{value:t.editGroup.id}}),t.groupDialog?i("div",{staticClass:"group"},[i("div",{staticClass:"label"},[t._v("名称:")]),i("input",{directives:[{name:"va",rawName:"v-va",value:{type:"required"},expression:"{ type:'required' }"}],staticClass:"form-control",attrs:{name:"name",type:"text"},domProps:{value:t.editGroup.name}})]):t._e(),i("div",{staticClass:"btns"},[i("el-button",{attrs:{size:"mediu",type:"primary"},on:{click:t.groupCommit}},[t._v("确定")]),i("el-button",{attrs:{size:"mediu",type:"info"},on:{click:function(e){t.groupDialog=!1}}},[t._v("取消")])],1)])])],1),i("el-dialog",{attrs:{center:!1,visible:t.knowledgeDialog,"close-on-click-modal":!1,top:"50px",width:"500px","append-to-body":""},on:{"update:visible":function(e){t.knowledgeDialog=e}}},[i("div",{staticClass:"header",attrs:{slot:"title"},slot:"title"},[i("el-tabs",{attrs:{value:"detail"}},[i("el-tab-pane",{attrs:{label:"知识点",name:"detail"}})],1)],1),i("VaForm",{ref:"KnowledgeFormVa"},[i("form",{ref:"KnowledgeForm"},[i("input",{staticClass:"hide",attrs:{name:"id"},domProps:{value:t.editKnowledge.id}}),t.knowledgeDialog?i("div",{staticClass:"group"},[i("div",{staticClass:"label"},[t._v("名称:")]),i("input",{directives:[{name:"va",rawName:"v-va",value:{type:"required"},expression:"{ type:'required' }"}],staticClass:"form-control",attrs:{name:"name",type:"text"},domProps:{value:t.editKnowledge.name}})]):t._e(),i("div",{staticClass:"btns"},[i("el-button",{attrs:{size:"mediu",type:"primary"},on:{click:t.KnowledgeCommit}},[t._v("确定")]),i("el-button",{attrs:{size:"mediu",type:"info"},on:{click:function(e){t.knowledgeDialog=!1}}},[t._v("取消")])],1)])])],1),i("el-dialog",{attrs:{center:!1,visible:t.addAnchorDialog,"close-on-click-modal":!1,top:"50px",width:"80%","append-to-body":"",title:"锚点添加"},on:{"update:visible":function(e){t.addAnchorDialog=e}}},[t.addAnchorDialog?i("AnchorList",{attrs:{type:t.anchorType,bookInfo:t.bookInfo,themeId:t.detailData.id,currknowledgeId:t.currknowledgeId,detailData:t.detailData},on:{anchorListCancle:t.anchorListCancle}}):t._e()],1)],1),i("div",{staticClass:"topWrap"},[t.mount&&t.mount.number>0&&100!=t.mount.number&&!t.readOnly?i("div",{staticClass:"mount"},[i("el-progress",{staticClass:"mountProgress",attrs:{"text-inside":!0,"stroke-width":18,percentage:t.mount.number}}),t.mount.number>=100?i("span",[t._v("挂载完成")]):i("span",[t._v('正在挂载"'+t._s(t.mount.name)+'"')])],1):t._e(),i("div",{staticClass:"btns"},[t.readOnly?t._e():i("el-button",{attrs:{size:"small",type:"primary",plain:""},on:{click:function(e){t.groupEdit({})}}},[t._v("新增知识结构")]),t.currGroupId&&!t.readOnly?i("el-button",{attrs:{size:"small",type:"primary",plain:""},on:{click:t.guaZai}},[t._v("一键挂载")]):t._e()],1)]),t.currGroupId?i("div",{staticClass:"content clearfix"},[i("div",{staticClass:"left"},[i("ul",t._l(t.glist,function(e){return i("div",{staticClass:"li",class:{currGroup:e.id==t.currGroupId},on:{click:function(i){t.changeGroup(e)}}},[i("span",{staticClass:"name",attrs:{title:e.name+"(100)"},domProps:{textContent:t._s(e.name+"("+e.num+")")}}),t.readOnly?t._e():i("div",{staticClass:"btns"},[i("span",{staticClass:"icon icon-publish",on:{click:function(i){i.stopPropagation(),t.groupEdit(e)}}}),i("span",{staticClass:"icon el-icon-delete",on:{click:function(i){i.stopPropagation(),t.groupDel(e)}}})])])}))]),i("div",{staticClass:"tableWrap"},[i("div",{staticClass:"nav clearfix"},[i("div",{staticClass:"name",domProps:{textContent:t._s(t.currGroup.name)}}),t.openAnchorList?i("div",{staticClass:"btns"},[i("el-button",{attrs:{size:"mini",type:"primary",plain:""},on:{click:function(e){t.openAnchorList=!1}}},[t._v("返回")]),t.isBook?t._e():i("el-button",{attrs:{size:"mini",type:"primary",plain:""},on:{click:t.addAnchor}},[t._v("增加锚点")]),!t.bookInfo||t.anchorType!=t.Anchors_chapter&&t.anchorType!=t.Anchors_content?t._e():i("el-select",{attrs:{placeholder:"书籍设置",size:"small"},on:{change:t.bookinfoChange,"visible-change":t.bookinfoBlur},model:{value:t.bookInfo.value,callback:function(e){t.$set(t.bookInfo,"value",e)},expression:"bookInfo.value"}},t._l(t.bookInfo.list,function(t){return i("el-option",{key:t.id,attrs:{label:t.name,value:t.id}})})),i("el-button",{attrs:{size:"mini",type:"primary",plain:""},on:{click:function(e){t.removeAnchor()}}},[t._v("移除")])],1):i("div",{staticClass:"btns"},[t.readOnly?t._e():i("el-button",{attrs:{size:"mini",type:"primary",plain:""},on:{click:function(e){t.KnowledgeEdit({})}}},[t._v("新增知识点")]),t.readOnly?t._e():i("el-button",{attrs:{size:"mini",type:"primary",plain:""},on:{click:t.toTop}},[t._v("置顶")]),t.readOnly?t._e():i("el-button",{attrs:{size:"mini",type:"primary",plain:""},on:{click:function(e){t.knowDel()}}},[t._v("删除")])],1)]),t.openAnchorList?t._e():i("div",{ref:"mainListWrap",staticClass:"mainListWrap"},[i("table",{staticClass:"table"},[i("thead",[i("tr",[t.readOnly?t._e():i("th",[t._v("全选"),i("input",{attrs:{type:"checkbox"},on:{click:function(e){t.checkedAllBtn(e,"checkedAll")}}})]),i("th",[t._v("名称")]),i("th",[t._v("数量")]),i("th",{attrs:{width:"160"}},[t._v("创建时间")]),t.readOnly?t._e():i("th",{staticStyle:{"text-align":"center"},attrs:{width:"250"}},[t._v("操作")])])]),i("tbody",t._l(t.list,function(e){return i("tr",[t.readOnly?t._e():i("th",[i("input",{attrs:{type:"checkbox",name:"ids"},domProps:{checked:t.checkedAll,value:e.id}})]),i("th",[t._v(t._s(e.name))]),i("th",[t._v(t._s(e.num))]),i("th",[t._v(t._s(e.create_time))]),t.readOnly?t._e():i("th",[i("div",{staticClass:"btns"},[i("el-button",{attrs:{size:"mini",type:"primary",plain:""},on:{click:function(i){t.KnowledgeEdit(e)}}},[t._v("重命名")]),i("el-button",{attrs:{size:"mini",type:"primary",plain:""},on:{click:function(i){t.setAnchor(e.id)}}},[t._v("设置锚点")]),i("el-button",{attrs:{size:"mini",type:"primary",plain:""},on:{click:function(i){t.knowDel([e.id])}}},[t._v("删除")])],1)])])}))]),t.page?i("div",{staticClass:"pageWrap"},[i("el-pagination",{attrs:{small:!1,background:"","current-page":t.page.num,"page-sizes":[10,50,100],"page-size":t.page.offset,layout:"sizes,prev, pager, next, jumper",total:t.page.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1):t._e(),i("div",{staticClass:"btns"})]),t.openAnchorList?i("div",{staticClass:"anchorListWrap"},[i("div",{staticClass:"article"},[t.openAnchorList?i("table",{ref:"anchorList",staticClass:"table"},[i("thead",[i("tr",[i("th",{attrs:{width:"50"}},[t._v("全选"),i("input",{attrs:{type:"checkbox"},on:{click:function(e){t.checkedAllBtn(e,"anchorCheckedAll")}}})]),i("th",[i("div",{staticClass:"title"},[i("span",{staticClass:"btns"},t._l(t.anchorsList,function(e,n){return e?i("span",{class:{currAnchorType:t.isShowAnchors(n)},domProps:{textContent:t._s(t.getAnchorsText(n))},on:{click:function(e){t.changeAnchorType(n)}}}):t._e()}))])]),i("th",{directives:[{name:"show",rawName:"v-show",value:t.isBook,expression:"isBook"}],attrs:{width:"180"}},[t._v("所属图书")]),i("th",{staticClass:"btns",staticStyle:{"padding-right":"30px"},attrs:{width:"50"}},[t._v("操作")])])]),i("tbody",{staticClass:"contentAnchors"},t._l(t.anchorList,function(e){return i("tr",[i("td",[i("div",{staticClass:"input"},[i("input",{attrs:{type:"checkbox",name:"ids"},domProps:{checked:t.anchorCheckedAll,value:e.id}})])]),i("td",{staticClass:"point"},[t.anchorType==t.Anchors_content?i("div",{staticClass:"div"},[t._v(t._s(e.point))]):i("div",{staticClass:"div"},[t._v(t._s(e.name))])]),t.isBook?i("td",[t._v(t._s(e.book_name))]):t._e(),i("td",[i("div",{staticClass:"btns"},[i("el-button",{attrs:{size:"mini",type:"primary",plain:""},on:{click:function(i){t.removeAnchor([e.n_info_id])}}},[t._v("移除")])],1)])])}))]):t._e()])]):t._e()])]):t._e()],1)},r=[];i.d(e,"a",function(){return n}),i.d(e,"b",function(){return r})},1191:function(t,e,i){"use strict";var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"div"},[i("div",{staticClass:"serachWrapd"},[i("div",{staticClass:"title"}),i("form",{ref:"mainForm"},[i("span",{staticClass:"group-inline"},[t.bookInfo&&"章节锚点"==t.type?i("el-select",{attrs:{placeholder:"选择所属书籍",size:"small",clearable:""},model:{value:t.bookInfo.value,callback:function(e){t.$set(t.bookInfo,"value",e)},expression:"bookInfo.value"}},t._l(t.bookInfo.list,function(t){return i("el-option",{key:t.id,attrs:{label:t.name,value:t.id}})})):t._e()],1),i("span",{staticClass:"group-inline"},[i("input",{staticClass:"form-control",attrs:{placeholder:t._f("formatHolder")(t.type),name:"name"}})]),i("span",{staticClass:"group-inline btn"},[i("el-button",{attrs:{type:"primary",size:"small",icon:"el-icon-search",plain:""},on:{click:t.seareHandeler}},[t._v("搜索")]),i("el-button",{attrs:{type:"primary",plain:"",size:"small"},on:{click:t.addAnchorCommit}},[t._v("添加选中")])],1)])]),i("div",{staticClass:"tableWrap"},[i("table",{staticClass:"table"},[i("thead",[i("tr",[i("th",[t._v("全选"),i("input",{attrs:{type:"checkbox"},on:{click:t.checkedAll}})]),i("th",[t._v("名称")]),i("th",[t._v("创建时间")])])]),i("tbody",t._l(t.list,function(e){return i("tr",[i("th",[i("input",{ref:"ids",refInFor:!0,attrs:{type:"checkbox",name:"ids"},domProps:{checked:!!t.obj[e.id],value:e.id},on:{click:function(i){t.choose(i,e)}}})]),i("th",[t._v(t._s(e.chapter_name||e.name))]),i("th",[t._v(t._s(e.create_time))])])}))]),t.page?i("div",{staticClass:"pageWrap"},[i("el-pagination",{attrs:{small:!1,background:"","current-page":t.page.num,"page-sizes":[10,50,100],"page-size":t.page.offset,layout:"total, sizes,prev, pager, next, jumper",total:t.page.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1):t._e()]),i("div",{staticClass:"btns"},[i("el-button",{attrs:{type:"info"},on:{click:function(e){t.$emit("anchorListCancle")}}},[t._v("取消")]),i("el-button",{attrs:{type:"primary"},on:{click:t.addAnchorCommit}},[t._v("确定")])],1)])},r=[];i.d(e,"a",function(){return n}),i.d(e,"b",function(){return r})},390:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.addTheme=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,r.request_post)("/api/themes",t).then(function(t){var e=t.data,i=e.id,n=e.name,r=e.type_name,a=e.abs,o=e.tag;return(0,h.addResListener)({res_id:i,res_type:r,res_name:n,res_exp:a,res_lables:[o]}),t})},e.modifyTheme=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=t.id,i=g(t,["id"]);return(0,r.request_put)(m({id:e}),i)},e.ListTheme=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,r.request_get)("/api/themes",t)},e.del=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,r.request_post)("/api/themes/delete",t)},e.modifyGroup=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=t.id,i=g(t,["id"]);return(0,r.request_put)(_({id:e}),i)},e.listGroup=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,r.request_get)("/api/themes/groups",t)},e.deleteGroup=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,r.request_post)("/api/themes/groups/delete",t)},e.addGroup=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,r.request_post)("/api/themes/groups",t)},e.moveGroup=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,r.request_put)("/api/themes/groups",t)},e.deleteThemeBook=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,r.request_post)("/api/themes/book_remove",t)},e.detailTheme=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=t.id,i=g(t,["id"]);return(0,r.request_get)(m({id:e}),i)},e.audits=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,r.request_put)("/api/themes/issuance",t).then(function(e){return(0,h.suance)({id:t.id,info:e.data}),e})},e.detailUrgent=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,r.request_put)("/api/themes/urgent",t)},e.backups=y,e._themeAdd=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=t.type,i=void 0===e?"book":e,n=g(t,["type"]);if("book"==i)return(0,a.listBooks)(n);if("audio"==i)return(0,o.listAudio)(n);if("video"==i)return(0,s.listVideo)(n);if("3d"==i)return(0,c.listContent)(n);if("ar"==i)return(0,l.listLibraries)(n);if("product"==i)return(0,d.listDigitalBook)(n);if("release"==i)return(0,p.getList)(n)},e._themeDetail=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=t.type,i=void 0===e?1:e,n=t.c_id,r=g(t,["type","c_id"]);if(1==i)return n?y(r):(0,a.detailBooks)(r);if(3==i)return(0,u.detailPicture)(r);if(4==i)return(0,o.detailAudio)(r);if(5==i)return(0,s.detailVideo)(r);if(6==i)return(0,c.detailContent)(r);if(8==i)return(0,l.detailLibraries)(r);if(10==i)return(0,d.detailDigitalBook)(r)};var n,r=i(4),a=i(404),o=i(490),s=i(408),u=i(489),c=i(512),l=i(951),d=i(379),p=i(848),h=i(83),f=i(8),v=(n=f)&&n.__esModule?n:{default:n};function g(t,e){var i={};for(var n in t)e.indexOf(n)>=0||Object.prototype.hasOwnProperty.call(t,n)&&(i[n]=t[n]);return i}var m=v.default.compile("/api/themes/:id"),_=v.default.compile("/api/themes/groups/:id"),b=(v.default.compile("/api/themes/issuance/:id"),v.default.compile("/api/themes/book/:id"));function y(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=t.id,i=g(t,["id"]);return(0,r.request_get)(b({id:e}),i)}},402:function(t,e,i){"use strict";i.r(e);var n=i(1190),r=i(737);for(var a in r)"default"!==a&&function(t){i.d(e,t,function(){return r[t]})}(a);i(950);var o=i(0),s=Object(o.a)(r.default,n.a,n.b,!1,null,"7fde9a66",null);s.options.__file="knowledge.vue",e.default=s.exports},737:function(t,e,i){"use strict";i.r(e);var n=i(738),r=i.n(n);for(var a in n)"default"!==a&&function(t){i.d(e,t,function(){return n[t]})}(a);e.default=r.a},738:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=d(i(3)),r=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var i=arguments[e];for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&(t[n]=i[n])}return t},a=d(i(82)),o=d(i(158)),s=d(i(948)),u=d(i(407)),c=l(i(511));l(i(379));function l(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e.default=t,e}function d(t){return t&&t.__esModule?t:{default:t}}function p(t){return function(){var e=t.apply(this,arguments);return new Promise(function(t,i){return function n(r,a){try{var o=e[r](a),s=o.value}catch(t){return void i(t)}if(!o.done)return Promise.resolve(s).then(function(t){n("next",t)},function(t){n("throw",t)});t(s)}("next")})}}e.default={components:{VaForm:o.default,AnchorList:s.default,Reader:u.default},props:["type","constitute","detailData","readOnly","defaultData"],created:function(){var t=p(n.default.mark(function t(){return n.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(!this.defaultData){t.next=7;break}if(this.glist=this.defaultData.knowledge,this.glist){t.next=4;break}return t.abrupt("return");case 4:this.currGroupId=this.glist[0].id,this.currGroup=this.glist[0],this.list=this.glist[0].nowledge_info;case 7:return t.prev=7,t.next=10,this.getGlist();case 10:return t.next=12,this.getProgress();case 12:t.next=16;break;case 14:t.prev=14,t.t0=t.catch(7);case 16:case"end":return t.stop()}},t,this,[[7,14]])}));return function(){return t.apply(this,arguments)}}(),data:function(){return{list:null,glist:null,anchorsList:[],page:null,Anchors_chapter:"章节锚点",Anchors_content:"内容锚点",Anchors_audio:"音频锚点",Anchors_video:"视频锚点",checkedAll:!1,currGroupId:null,currknowledgeId:null,currGroup:{},openAnchorList:!1,anchorType:"章节锚点",anchorList:null,bookInfo:{value:"",lsit:[]},groupDialog:!1,knowledgeDialog:!1,addAnchorDialog:!1,readerDialog:!1,readerId:null,editGroup:{},editKnowledge:{},anchorCheckedAll:!1,mount:{number:0}}},computed:{isBook:function(){return"章节锚点"==this.anchorType||"内容锚点"==this.anchorType}},methods:{getGlist:function(){var t=p(n.default.mark(function t(){var e=this;return n.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(this.detailData.id){t.next=2;break}return t.abrupt("return");case 2:return t.next=4,c.listGroup({id:this.detailData.id}).then(function(t){var i=t.data.findIndex(function(t){return e.currGroupId===t.id}),n=i>-1?i:0;e.glist=t.data,e.glist&&e.glist.length>0?(e.currGroupId=t.data[n].id,e.currGroup=t.data[n],e.anchorType="章节锚点",e.getList()):(e.list=e.glist=e.currGroupId=null,e.currGroup={})}).catch(function(t){var i=t.payload;for(var n in i.messages){e.$message.error(i.messages[n]);break}});case 4:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}(),getList:function(){var t=p(n.default.mark(function t(){var e,i=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,a=this,o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:10,s=arguments[2];return n.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return this.anchorCheckedAll=!1,t.next=3,c.listKnowledge(r({pageNum:i,pageOffset:o},s,{id:this.detailData.id,group_id:this.currGroupId})).then(function(t){a.list=t.data,a.page=t.page}).catch(function(t){var e=t.payload;for(var i in e.messages){a.$message.error(e.messages[i]);break}});case 3:if(e=this.$refs.mainListWrap){t.next=6;break}return t.abrupt("return");case 6:e.querySelectorAll("input[type='checkbox']").forEach(function(t){t.checked=!1});case 8:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}(),groupDel:function(t){var e=this;this.$confirm("是否删除该知识结构?").then(function(i){c.deleteGroup({id:[t.id],type:e.detailData.type_number,pid:e.detailData.id}).then(function(t){e.getGlist(),e.$emit("saveok")}).catch(function(t){for(var i in payload.messages){e.$message.error(payload.messages[i]);break}})})},groupEdit:function(t){if(!this.detailData.id)return this.$message.error("请保存产品信息后再做添加");this.editGroup=t,this.groupDialog=!0},KnowledgeEdit:function(t){this.editKnowledge=t,this.knowledgeDialog=!0},groupCommit:function(){var t=p(n.default.mark(function t(){var e,i,o=this;return n.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(this.$refs.groupFormVa.valiAll()){t.next=2;break}return t.abrupt("return");case 2:if(e=(0,a.default)(this.$refs.groupForm,{hash:!0}),t.prev=3,e.id){t.next=10;break}return e.id=this.detailData.id,t.next=8,c.addGroup(r({},e,{type:this.detailData.type_number,pid:this.detailData.id})).then(function(t){o.groupDialog=!1,o.getGlist(),o.$emit("saveok")});case 8:t.next=12;break;case 10:return t.next=12,c.modifyGroup(r({},e,{type:this.detailData.type_number,pid:this.detailData.id})).then(function(t){o.groupDialog=!1,o.getGlist(),o.$emit("saveok")});case 12:t.next=18;break;case 14:t.prev=14,t.t0=t.catch(3),i=t.t0.message,this.$message.error(i);case 18:case"end":return t.stop()}},t,this,[[3,14]])}));return function(){return t.apply(this,arguments)}}(),guaZai:function(){var t=p(n.default.mark(function t(){var e,i;return n.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,c.mount({id:this.detailData.id});case 3:return t.next=5,this.getProgress();case 5:t.next=17;break;case 7:t.prev=7,t.t0=t.catch(0),e=t.t0.payload,t.t1=n.default.keys(e.messages);case 11:if((t.t2=t.t1()).done){t.next=17;break}return i=t.t2.value,this.$message.error(e.messages[i]),t.abrupt("break",17);case 17:case"end":return t.stop()}},t,this,[[0,7]])}));return function(){return t.apply(this,arguments)}}(),getProgress:function(){var t=p(n.default.mark(function t(){var e=this;return n.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,c.mountSchedule({id:this.detailData.id},function(t){"100"==t.data.number&&e.getList(),e.mount=r({},t.data,{number:parseInt(t.data.number)})}).then(function(t){e.mount=t.data});case 2:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}(),KnowledgeCommit:function(){var t=this;if(this.$refs.KnowledgeFormVa.valiAll()){var e=(0,a.default)(this.$refs.KnowledgeForm,{hash:!0});try{e.id?c.modifyNowledges(r({},e,{type:this.detailData.type_number,pid:this.detailData.id})).then(function(e){t.knowledgeDialog=!1,t.getList(),t.$emit("saveok")}):(e.t_id=this.detailData.id,e.group_id=this.currGroupId,c.addNowledges(r({},e,{type:this.detailData.type_number,pid:this.detailData.id})).then(function(e){t.knowledgeDialog=!1,t.getGlist(),t.getList(),t.$emit("saveok")}))}catch(t){var i=t.payload;for(var n in i.messages){this.$message.error(i.messages[n]);break}}}},toTop:function(){var t=this,e=[];if(this.$refs.mainListWrap.querySelectorAll("[name='ids']:checked").forEach(function(t){e.push(t.value)}),!e.length)return this.$message.error("请确认你要置顶的内容！");c.upNowledges({id:e}).then(function(e){t.getList()}).catch(function(e){var i=e.payload;for(var n in i.messages){t.$message.error(i.messages[n]);break}})},knowDel:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],i=this.$refs.mainListWrap.querySelectorAll("[name='ids']:checked");if(e.length||i.forEach(function(t){e.push(t.value)}),!e.length)return this.$message.error("请确认你要删除的内容！");this.$confirm("是否删除选中知识点?").then(function(i){c.deleteNowledges({id:e,type:t.detailData.type_number,pid:t.detailData.id}).then(function(e){t.getGlist(),t.$emit("saveok")}).catch(function(e){var i=e.payload;for(var n in i.messages){t.$message.error(i.messages[n]);break}})})},removeAnchor:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],i=this.$refs.anchorList.querySelectorAll("[name='ids']:checked");if(e.length||i.forEach(function(t){e.push(t.value)}),!e.length)return this.$message.error("请确认你要删除的锚点！");this.$confirm("是否删除选中锚点?").then(function(i){c.delAnchor({id:e,type:t.detailData.type_number,pid:t.detailData.id}).then(function(e){t.getAnchorList(),t.$emit("saveok")}).catch(function(e){var i=e.payload;for(var n in i.messages){t.$message.error(i.messages[n]);break}})})},handleSizeChange:function(t){this.getList(1,t)},handleCurrentChange:function(t){this.getList(t,this.page.offset)},changeGroup:function(t){if(this.checkedAll=!1,this.anchorCheckedAll=!1,this.currGroupId=t.id,this.currGroup=t,this.openAnchorList=!1,this.defaultData){var e=this.glist.findIndex(function(e){return e.id===t.id});this.list=this.glist[e].nowledge_info}else this.getList()},getbookList:function(){var t=p(n.default.mark(function t(){var e=this;return n.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,c.listNowledges({id:this.detailData.id}).then(function(t){e.bookInfo.list=t.data}).catch(function(t){var i=t.payload;for(var n in i.messages){e.$message.error(i.messages[n]);break}});case 2:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}(),getBtn:function(){var t,e=this;c.nowledge_btn({id:this.detailData.id}).then((t=p(n.default.mark(function t(i){var r;return n.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:e.anchorsList=i.data,t.t0=n.default.keys(e.anchorsList);case 2:if((t.t1=t.t0()).done){t.next=9;break}if(r=t.t1.value,!e.anchorsList[r]){t.next=7;break}return e.anchorType=e["Anchors_"+r],t.abrupt("break",9);case 7:t.next=2;break;case 9:return t.next=11,e.getbookList();case 11:return t.next=13,e.getAnchorList();case 13:e.openAnchorList=!0;case 14:case"end":return t.stop()}},t,e)})),function(e){return t.apply(this,arguments)}))},addAnchor:function(){this.addAnchorDialog=!0},setAnchor:function(){var t=p(n.default.mark(function t(e){return n.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return this.currknowledgeId=e,this.anchorList=[],t.next=4,this.getBtn();case 4:case"end":return t.stop()}},t,this)}));return function(e){return t.apply(this,arguments)}}(),changeAnchorType:function(t){this.anchorType=this["Anchors_"+t],this.anchorList=[],this.getAnchorList()},getAnchorList:function(){var t=this;c.nowledge_info({type:this.anchorType,id:this.currknowledgeId}).then(function(e){t.anchorList=e.data}),this.getList()},bookinfoChange:function(t){if("内容锚点"==this.anchorType)return this.readerId=t,void(this.readerDialog=!0);this.addAnchorDialog=!0},bookinfoBlur:function(t){this.bookInfo.value&&!t&&"章节锚点"==this.anchorType?this.addAnchorDialog=!0:this.bookInfo.value&&!t&&"内容锚点"==this.anchorType&&(this.readerId||(this.readerId=this.bookInfo.value),this.readerDialog=!0)},anchorListCancle:function(){this.addAnchorDialog=!1,this.getAnchorList(),this.$emit("saveok")},addAnchorSuccess:function(){this.$message.success("添加锚点成功!"),this.getAnchorList()},isShowAnchors:function(t){return this.anchorType==this["Anchors_"+t]},getAnchorsText:function(t){return this["Anchors_"+t]},checkedAllBtn:function(t,e){this[e]=t.target.checked}}}},739:function(t,e,i){"use strict";i.r(e);var n=i(740),r=i.n(n);for(var a in n)"default"!==a&&function(t){i.d(e,t,function(){return n[t]})}(a);e.default=r.a},740:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=u(i(3)),r=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var i=arguments[e];for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&(t[n]=i[n])}return t},a=u(i(82)),o=u(i(158)),s=function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e.default=t,e}(i(511));function u(t){return t&&t.__esModule?t:{default:t}}e.default={components:{VaForm:o.default},props:["type","bookInfo","themeId","currknowledgeId","detailData"],created:function(){var t,e=(t=n.default.mark(function t(){return n.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:this.getList();case 1:case"end":return t.stop()}},t,this)}),function(){var e=t.apply(this,arguments);return new Promise(function(t,i){return function n(r,a){try{var o=e[r](a),s=o.value}catch(t){return void i(t)}if(!o.done)return Promise.resolve(s).then(function(t){n("next",t)},function(t){n("throw",t)});t(s)}("next")})});return function(){return e.apply(this,arguments)}}(),data:function(){return{list:null,page:null,query:null,obj:{}}},computed:{},methods:{getList:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.page&&this.page.num||1,e=this,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:this.page&&this.page.offset||10,n=arguments[2];return s.NowledgesList(r({pageNum:t,pageOffset:i},n,{id:"章节锚点"==this.type?this.bookInfo.value:this.themeId,type:this.type})).then(function(t){e.list=t.data,e.page=t.page})},checkedAll:function(t){var e=this;t.target.checked?this.list.forEach(function(t){e.obj[t.id]=t}):this.list.forEach(function(t){e.obj[t.id]=null}),this.$refs.ids.forEach(function(e){e.checked=t.target.checked}),log(this.obj)},choose:function(t,e){t.target.checked?this.obj[e.id]=e:this.obj[e.id]=null},addAnchorCommit:function(){var t=this,e=[];for(var i in this.obj)this.obj.hasOwnProperty(i)&&this.obj[i]&&e.push(this.obj[i]);s.addAnchor({n_id:this.currknowledgeId,b_id:"章节锚点"==this.type?e.map(function(t){return t.id}):"",c_id:"章节锚点"==this.type?[this.bookInfo.value]:e.map(function(t){return t.id}),type:this.type,name:e.map(function(t){return t.chapter_name||t.name}),ptype:this.detailData.type_number,pid:this.detailData.id}).then(function(e){t.$message.success("添加成功"),t.$emit("anchorListCancle")}).catch(function(e){var i=e.payload;for(var n in i.messages){t.$message.error(i.messages[n]);break}})},handleSizeChange:function(t){this.getList(1,t)},handleCurrentChange:function(t){this.getList(t,this.page.offset)},seareHandeler:function(){this.query=(0,a.default)(this.$refs.mainForm,{hash:!0}),log(this.query),this.getList(1,10,this.query)}},filters:{formatHolder:function(t){return t.substr(0,2)+"名称"}}}},741:function(t,e,i){},742:function(t,e,i){},848:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.getList=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,r.request_get)("/api/comproduct/list",t)},e.getDetail=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,r.request_get)("/api/comproduct",t)},e.del=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,r.request_post)("/api/comproduct/delete",t)},e.urgentDigitalBook=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,r.request_put)("/api/comproduct/urgent",t)},e.audits=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,r.request_put)("/api/comproduct/audits",t)},e.issuance=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=t.id,i=function(t,e){var i={};for(var n in t)e.indexOf(n)>=0||Object.prototype.hasOwnProperty.call(t,n)&&(i[n]=t[n]);return i}(t,["id"]);return(0,r.request_put)(c({id:e}),i).then(function(t){return(0,s.suance)({id:e,info:t.data}),t})},e.addGroup=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,r.request_post)("/api/comproduct/groups",t)},e.modifyGroup=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,r.request_put)(u(t),t)},e.deleteGroup=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,r.request_post)("/api/themes/groups/delete",t)},e.listGroup=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,r.request_get)("/api/comproduct/groups",t)},e.moveGroup=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return t.rel_id=t.id,delete t.id,(0,r.request_put)("/api/groups/comproduct",t)};var n,r=i(4),a=i(8),o=(n=a)&&n.__esModule?n:{default:n},s=i(83);o.default.compile("/api/comproduct/groups/:id");var u=o.default.compile("/api/comproduct/groups/:id"),c=o.default.compile("/api/comproduct/:id/issuance");o.default.compile("/api/comproduct/:id/audits")},948:function(t,e,i){"use strict";i.r(e);var n=i(1191),r=i(739);for(var a in r)"default"!==a&&function(t){i.d(e,t,function(){return r[t]})}(a);i(949);var o=i(0),s=Object(o.a)(r.default,n.a,n.b,!1,null,"e8921c3e",null);s.options.__file="anchorList.vue",e.default=s.exports},949:function(t,e,i){"use strict";var n=i(741);i.n(n).a},950:function(t,e,i){"use strict";var n=i(742);i.n(n).a},951:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.add=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,r.request_post)("/api/librariess",t).then(function(t){var e=t.data,i=e._id,n=e.name,r=e.abs,a=e.author,o=e.tag,u=e.type_name;return(0,s.addResListener)({res_id:i,res_type:u,res_name:n,res_exp:r,res_author:a,res_lables:[o]}),t})},e.modify=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=t.id,i=u(t,["id"]);return(0,r.request_put)(c({id:e}),i)},e.listLibraries=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,r.request_get)("/api/librariess",t)},e.educe=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,s.educeResListener)({res_url:getFullPath("/api/librariess/export"+qs.stringify(t,{addQueryPrefix:!0}))}),(0,r.request_get)("/api/librariess/export",t)},e.putin=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,r.request_post)("/api/librariess/import",t)},e.deleteLibraries=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,r.request_post)("/api/librariess/delete",t)},e.detailLibraries=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,r.request_get)(c(t))},e.modifyGroup=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=t.id,i=u(t,["id"]);return(0,r.request_put)(l({id:e}),i)},e.deleteGroup=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,r.request_post)("/api/librariess/groups/delete",t)},e.addGroup=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,r.request_post)("/api/librariess/groups",t)},e.listGroup=function(){return(0,r.request_get)("/api/librariess/groups")},e.moveGroup=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,r.request_put)("/api/librariess/groups",t)};var n,r=i(4),a=i(8),o=(n=a)&&n.__esModule?n:{default:n},s=i(83);function u(t,e){var i={};for(var n in t)e.indexOf(n)>=0||Object.prototype.hasOwnProperty.call(t,n)&&(i[n]=t[n]);return i}var c=o.default.compile("/api/librariess/:id"),l=o.default.compile("/api/librariess/groups/:id")}}]);