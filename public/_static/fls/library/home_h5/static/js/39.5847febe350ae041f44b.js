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
(window.webpackJsonp=window.webpackJsonp||[]).push([[39],{1017:function(t,e,s){"use strict";var i=s(849);s.n(i).a},1073:function(t,e,s){"use strict";var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"page-order"},[s("Head",{attrs:{name:"订单支付",type:"dark"}}),s("section",{staticClass:"order-info"},[s("p",{staticClass:"title"},[t._v("商品信息")]),s("div",{staticClass:"order-item flex"},[s("div",{staticClass:"icon-good-default",staticStyle:{"background-size":"100px 80px",width:"100px"}}),s("div",{staticClass:"order-item__detail flex"},[s("div",{staticClass:"order-item__name f16 ellipsis-2"},[t._v(t._s(t.goods.name))]),s("div",{staticClass:"order-item__price f14"},[t._v("价格："),s("span",{staticClass:"f18"},[t._v("￥"+t._s(parseFloat(t.goods.price).toFixed(2)))])])])])]),s("div",{staticClass:"line-order"}),s("section",{staticClass:"pay-method"},[s("p",{staticClass:"title"},[t._v("付款方式")]),s("div",{staticClass:"pay-item flex"},[t._m(0),s("div",{staticClass:"item-radio"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.options.pay_type,expression:"options.pay_type"}],attrs:{type:"radio",name:"payMethod",value:"2"},domProps:{checked:t._q(t.options.pay_type,"2")},on:{change:function(e){return t.$set(t.options,"pay_type","2")}}})])]),s("div",{staticClass:"pay-item flex"},[t._m(1),s("div",{staticClass:"item-radio"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.options.pay_type,expression:"options.pay_type"}],attrs:{type:"radio",name:"payMethod",value:"3"},domProps:{checked:t._q(t.options.pay_type,"3")},on:{change:function(e){return t.$set(t.options,"pay_type","3")}}})])])]),s("div",{staticClass:"line-order"}),s("section",{staticClass:"afford f14"},[s("p",[t._v("总价："),s("span",{staticClass:"f18"},[t._v("￥"+t._s(t.goods.price))])]),s("button",{staticClass:"linear-btn btn-reset c_f f16",on:{click:t.payOrder}},[t._v("立即付款")])])],1)},a=[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"pay-item__left flex"},[e("div",{staticClass:"ib icon-alipay-small"}),e("span",{staticClass:"f14"},[this._v("支付宝支付")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"pay-item__left flex"},[e("div",{staticClass:"ib icon-weixin-small"}),e("span",{staticClass:"f14"},[this._v("微信支付")])])}];s.d(e,"a",function(){return i}),s.d(e,"b",function(){return a})},618:function(t,e,s){"use strict";s.r(e);var i=s(1073),a=s(847);for(var n in a)"default"!==n&&function(t){s.d(e,t,function(){return a[t]})}(n);s(1017);var o=s(0),r=Object(o.a)(a.default,i.a,i.b,!1,null,null,null);e.default=r.exports},847:function(t,e,s){"use strict";s.r(e);var i=s(848),a=s.n(i);for(var n in i)"default"!==n&&function(t){s.d(e,t,function(){return i[t]})}(n);e.default=a.a},848:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i,a=s(9),n=(i=a)&&i.__esModule?i:{default:i};e.default={data:function(){return{options:{goods_id:"",type:9,pay_type:2},goods:{}}},mounted:function(){this.init()},methods:{init:function(){try{var t=this.$user&&JSON.parse(window.localStorage.getItem("cart"))[this.$user.id]||{};this.goods=t,this.options.goods_id=t.goods_id,this.options.rf_url=this.$route.query.redirect_url+"&state=wailian"}catch(t){console.warn(t.toString)}},addToBookself:function(){return this.$service.bookShelf.add({book_id:this.goods.goods_id,type:this.goods.type})},payOrder:function(){var t,e=this;return(t=n.default.mark(function t(){var s,i;return n.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,e.addToBookself();case 3:return t.next=5,e.$service.order.addOrder(e.options);case 5:s=t.sent,i=s.data,window.location.href=i.url,t.next=13;break;case 10:t.prev=10,t.t0=t.catch(0),e.$Toast(t.t0.payload.errors[0]||"订单添加失败，请稍后再试");case 13:case"end":return t.stop()}},t,e,[[0,10]])}),function(){var e=t.apply(this,arguments);return new Promise(function(t,s){return function i(a,n){try{var o=e[a](n),r=o.value}catch(t){return void s(t)}if(!o.done)return Promise.resolve(r).then(function(t){i("next",t)},function(t){i("throw",t)});t(r)}("next")})})()}}}},849:function(t,e,s){}}]);