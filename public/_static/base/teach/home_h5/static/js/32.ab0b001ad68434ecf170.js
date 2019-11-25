(window.webpackJsonp=window.webpackJsonp||[]).push([[32],{276:function(e,t,s){"use strict";s.r(t);var n=s(648),i=s(483);for(var r in i)"default"!==r&&function(e){s.d(t,e,function(){return i[e]})}(r);s(619);var a=s(20),c=Object(a.a)(i.default,n.a,n.b,!1,null,null,null);c.options.__file="Examination.vue",t.default=c.exports},286:function(e,t,s){"use strict";s.r(t);var n=s(287),i=s.n(n);for(var r in n)"default"!==r&&function(e){s.d(t,e,function(){return n[e]})}(r);t.default=i.a},287:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={props:["hideBack","isSearch","privateStyle"],methods:{goBack:function(){this.$router.go(-1)},goSearch:function(){this.$router.push({path:"search"})}},computed:{isShowSearch:function(){return!!this.isSearch},isShowBack:function(){return!this.hideBack}}}},288:function(e,t,s){},289:function(e,t,s){"use strict";s.r(t);var n=s(291),i=s(286);for(var r in i)"default"!==r&&function(e){s.d(t,e,function(){return i[e]})}(r);s(290);var a=s(20),c=Object(a.a)(i.default,n.a,n.b,!1,null,"a1350782",null);c.options.__file="index.vue",t.default=c.exports},290:function(e,t,s){"use strict";var n=s(288);s.n(n).a},291:function(e,t,s){"use strict";var n=function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"header",style:this.privateStyle},[this._t("left",[t("span",{staticClass:"icon-go-back",on:{click:this.goBack}})]),this._t("center"),this._t("right",[t("span",{staticClass:"icon-search",on:{click:this.goSearch}})])],2)},i=[];s.d(t,"a",function(){return n}),s.d(t,"b",function(){return i})},483:function(e,t,s){"use strict";s.r(t);var n=s(484),i=s.n(n);for(var r in n)"default"!==r&&function(e){s.d(t,e,function(){return n[e]})}(r);t.default=i.a},484:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n,i=s(289),r=(n=i)&&n.__esModule?n:{default:n};var a=new Map([["single",1],["multi",1],["judgment",2]]);t.default={data:function(){return{cur:1,input_type:{single:"radio",multi:"checkbox"},actions:null,tested:!1,sheetVisible:!1,list:[],cur_answer:"",my_answer:{},single:["A","B","C","D"]}},components:{Head:r.default},mounted:function(){this.getList()},computed:{cur_question:function(){var e=this.list[this.cur-1]||{};return this.exam_type=a.get(e.type),this.cur_answer=this.my_answer[e.id]||("multi"===e.type?[]:""),e}},methods:{getList:function(){var e=this;this.$service.course.getExercise({id:this.$route.query.tid}).then(function(t){e.list=t.data}).catch(console.error)},jumpTo:function(e){this.cur=e},showActionSheet:function(){this.$Toast("开发中...")},chooseByGraph:function(){this.$refs.myInput.click()},nextQuestion:function(){this.cur++>=this.list.length&&this.cur--},prevExam:function(){this.cur>1&&this.cur--},next:function(){var e=this;this.cur_answer&&(this.my_answer[this.cur_question.id]=this.cur_answer,this.cur++>=this.list.length&&this.cur--&&this.$MessageBox.confirm("确认提交试卷？").then(function(t){e.sendMyAnsewr()}).catch(console.error))},sendMyAnsewr:function(){var e=this;this.$service.course.answer({id:this.$route.query.tid,data:this.formatMyAnswer()}).then(function(t){e.$router.go(-1)}).catch(console.error)},formatMyAnswer:function(){var e=[];for(var t in this.my_answer)e.push({id:t,answer:this.my_answer[t].toString()});return e}}}},485:function(e,t,s){},619:function(e,t,s){"use strict";var n=s(485);s.n(n).a},648:function(e,t,s){"use strict";var n=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"user-wrapper"},[s("Head",{attrs:{isSearch:"true"}},[s("p",{attrs:{slot:"center"},slot:"center"},[e._v("在线测评1111111111111")])]),e.tested?e._e():s("div",{staticClass:"fix-top"},[s("ul",{staticClass:"fw-slide exam-indexs"},e._l(e.list,function(t,n){return s("li",{class:{active:e.cur==n+1},on:{click:function(t){e.jumpTo(n+1)}}},[e._v(e._s(n+1))])})),s("div",{staticClass:"exam-content"},[s("p",{staticClass:"exam-title"},[s("span",{staticClass:"type"},[e._v("【"+e._s(e.cur_question&&e.cur_question.type_name)+"】")]),e._v(e._s(e.cur_question&&e.cur_question.question)),s("span",{staticClass:"score"},[e._v("("+e._s(e.cur_question&&e.cur_question.score)+"分)")])]),1===e.exam_type?s("div",{staticClass:"exam-main top-boder"},e._l(e.cur_question.option,function(t,n){return s("div",{staticClass:"exam-choice"},[s("div",{staticClass:"checkbox"},["checkbox"===e.input_type[e.cur_question.type]?s("input",{directives:[{name:"model",rawName:"v-model",value:e.cur_answer,expression:"cur_answer"}],attrs:{name:"answer",type:"checkbox"},domProps:{value:e.single[n],checked:Array.isArray(e.cur_answer)?e._i(e.cur_answer,e.single[n])>-1:e.cur_answer},on:{change:function(t){var s=e.cur_answer,i=t.target,r=!!i.checked;if(Array.isArray(s)){var a=e.single[n],c=e._i(s,a);i.checked?c<0&&(e.cur_answer=s.concat([a])):c>-1&&(e.cur_answer=s.slice(0,c).concat(s.slice(c+1)))}else e.cur_answer=r}}}):"radio"===e.input_type[e.cur_question.type]?s("input",{directives:[{name:"model",rawName:"v-model",value:e.cur_answer,expression:"cur_answer"}],attrs:{name:"answer",type:"radio"},domProps:{value:e.single[n],checked:e._q(e.cur_answer,e.single[n])},on:{change:function(t){e.cur_answer=e.single[n]}}}):s("input",{directives:[{name:"model",rawName:"v-model",value:e.cur_answer,expression:"cur_answer"}],attrs:{name:"answer",type:e.input_type[e.cur_question.type]},domProps:{value:e.single[n],value:e.cur_answer},on:{input:function(t){t.target.composing||(e.cur_answer=t.target.value)}}}),s("label",[e._v(e._s(e.single[n]))])]),e._v(e._s(t.title))])})):2===e.exam_type?s("div",{staticClass:"exam-main top-boder"},[s("div",{staticClass:"exam-choice"},[s("div",{staticClass:"checkbox"},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.cur_answer,expression:"cur_answer"}],attrs:{type:"radio",name:"answer",value:"true"},domProps:{checked:e._q(e.cur_answer,"true")},on:{change:function(t){e.cur_answer="true"}}}),s("label",[e._v("A")])]),e._v("正确")]),s("div",{staticClass:"exam-choice"},[s("div",{staticClass:"checkbox"},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.cur_answer,expression:"cur_answer"}],attrs:{type:"radio",name:"answer",value:"false"},domProps:{checked:e._q(e.cur_answer,"false")},on:{change:function(t){e.cur_answer="false"}}}),s("label",[e._v("B")])]),e._v("错误")])]):s("div",{staticClass:"exam-main"},[s("textarea",{directives:[{name:"model",rawName:"v-model",value:e.cur_answer,expression:"cur_answer"}],attrs:{placeholder:"请输入你的答案"},domProps:{value:e.cur_answer},on:{input:function(t){t.target.composing||(e.cur_answer=t.target.value)}}}),s("p",{staticClass:"file-upload"},[s("input",{ref:"myInput",staticClass:"hide",attrs:{type:"file",accept:"image/*"}}),s("label",{on:{click:e.showActionSheet}},[e._v("上传图片")])])]),s("div",{staticClass:"btn-wrap text-center"},[s("button",{staticClass:"btn-test circle",on:{click:e.next}},[e._v("确定")])])]),s("div",{staticClass:"check-exam flex-between p3"},[s("button",{staticClass:"prev",on:{click:e.prevExam}}),s("button",{staticClass:"next-active",on:{click:e.nextQuestion}})]),s("mt-actionsheet",{attrs:{actions:e.actions},model:{value:e.sheetVisible,callback:function(t){e.sheetVisible=t},expression:"sheetVisible"}})],1)],1)},i=[];s.d(t,"a",function(){return n}),s.d(t,"b",function(){return i})}}]);