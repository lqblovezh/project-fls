(window.webpackJsonp=window.webpackJsonp||[]).push([[34],{275:function(t,e,s){"use strict";s.r(e);var i=s(649),n=s(480);for(var a in n)"default"!==a&&function(t){s.d(e,t,function(){return n[t]})}(a);s(618);var r=s(20),u=Object(r.a)(n.default,i.a,i.b,!1,null,null,null);u.options.__file="TestOnline.vue",e.default=u.exports},286:function(t,e,s){"use strict";s.r(e);var i=s(287),n=s.n(i);for(var a in i)"default"!==a&&function(t){s.d(e,t,function(){return i[t]})}(a);e.default=n.a},287:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:["hideBack","isSearch","privateStyle"],methods:{goBack:function(){this.$router.go(-1)},goSearch:function(){this.$router.push({path:"search"})}},computed:{isShowSearch:function(){return!!this.isSearch},isShowBack:function(){return!this.hideBack}}}},288:function(t,e,s){},289:function(t,e,s){"use strict";s.r(e);var i=s(291),n=s(286);for(var a in n)"default"!==a&&function(t){s.d(e,t,function(){return n[t]})}(a);s(290);var r=s(20),u=Object(r.a)(n.default,i.a,i.b,!1,null,"a1350782",null);u.options.__file="index.vue",e.default=u.exports},290:function(t,e,s){"use strict";var i=s(288);s.n(i).a},291:function(t,e,s){"use strict";var i=function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"header",style:this.privateStyle},[this._t("left",[e("span",{staticClass:"icon-go-back",on:{click:this.goBack}})]),this._t("center"),this._t("right",[e("span",{staticClass:"icon-search",on:{click:this.goSearch}})])],2)},n=[];s.d(e,"a",function(){return i}),s.d(e,"b",function(){return n})},480:function(t,e,s){"use strict";s.r(e);var i=s(481),n=s.n(i);for(var a in i)"default"!==a&&function(t){s.d(e,t,function(){return i[t]})}(a);e.default=n.a},481:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i,n=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var s=arguments[e];for(var i in s)Object.prototype.hasOwnProperty.call(s,i)&&(t[i]=s[i])}return t},a=s(57),r=s(289),u=(i=r)&&i.__esModule?i:{default:i};e.default={data:function(){return{list:[],isTest:!1}},components:{Head:u.default},mounted:function(){this.getList()},methods:n({},(0,a.mapMutations)("course",["setExamList"]),{getList:function(){var t=this;this.$service.course.getPaper({id:this.$route.query.id}).then(function(e){t.list=e.data,t.setExamList(e.data)}).catch(console.error)},goToTest:function(t){var e="examination";"审评中"!==t.paper_status&&("查看成绩"===t.paper_status&&(e="examResult"),this.$router.push({path:e,query:{tid:t.id}}))},viewMyMistakes:function(){this.$router.push({name:"myErrorsList",params:{id:this.$route.query.id}})}})}},482:function(t,e,s){},618:function(t,e,s){"use strict";var i=s(482);s.n(i).a},649:function(t,e,s){"use strict";var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"user-wrapper"},[s("Head",{attrs:{isSearch:"true"}},[s("p",{attrs:{slot:"center"},slot:"center"},[t._v("在线测评")])]),s("div",{staticClass:"fix-top"},[s("div",{staticClass:"test-list"},t._l(t.list,function(e,i){return s("div",{staticClass:"test-item p3"},[s("div",{staticClass:"test-item__title"},[t._v(t._s(e.name))]),s("div",{staticClass:"flex-between"},[s("p",[t._v("课时"+t._s(i+1))]),s("button",{staticClass:"circle",class:{"inline-btn":!t.isTest}},[s("span",{on:{click:function(s){t.goToTest(e)}}},[t._v(t._s(e.paper_status))])])])])})),s("div",{staticClass:"line-part"}),s("div",{staticClass:"errors flex-between",on:{click:t.viewMyMistakes}},[s("p",[t._v("历史错题集")]),s("span",{staticClass:"icon-enter"})])])],1)},n=[];s.d(e,"a",function(){return i}),s.d(e,"b",function(){return n})}}]);