import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const Wms = (resolve) => require(["@/components/wms"],resolve)
//首页
const Home = (resolve) => require(["@/components/wms/0-home"], resolve)
//产品管理
const Article = (resolve) => require(["@/components/wms/1-product/article"], resolve)
const Series = (resolve) => require(["@/components/wms/1-product/series"], resolve)
//前台设置
const IndexSettings = (resolve) => require(["projects/x-read-mgr/components/wms/2-settings/indexSettings"],resolve)
const Banner = (resolve) => require(["projects/x-read-mgr/components/wms/2-settings/indexSettings/banner"],resolve)
const Button = (resolve) => require(["projects/x-read-mgr/components/wms/2-settings/indexSettings/button"],resolve)
const HomeIndex = (resolve) => require(["projects/x-read-mgr/components/wms/2-settings/indexSettings/home"],resolve)
//发现设置
const FindSetting = (resolve) => require(["@/components/wms/2-frontSetting/findSetting"], resolve)
//分类设置
const Columns = (resolve) => require(["@/components/wms/3-typeSetting/column"], resolve)
const Keywords = (resolve) => require(["@/components/wms/3-typeSetting/keyword"],resolve)
const Subject = (resolve) => require(["@/components/wms/3-typeSetting/subject"],resolve)
const Case = (resolve) => require(["@/components/wms/3-typeSetting/case"],resolve)

//会员管理
const MemberList = (resolve) => require(["projects/x-read-mgr/components/wms/6-member/list"], resolve)
const MemberFb = (resolve) => require(["projects/x-read-mgr/components/wms/6-member/userMsg"], resolve)
//订单管理
const OrderManage = (resolve) => require(["projects/x-read-mgr/components/wms/4-order/index"],resolve)
// 书圈管理
const BookManage = (resolve) => require(["projects/x-read-mgr/components/wms/3-book/index"],resolve)
const BookTheme = (resolve) => require(["projects/x-read-mgr/components/wms/3-book/theme"],resolve)
const BookComment = (resolve) => require(["projects/x-read-mgr/components/wms/3-book/comment"],resolve)
// 统计分析
const ScaleInfo = (resolve) => require(["projects/x-read-mgr/components/wms/7-statistics/scaleInfo"], resolve)
const Statistics = (resolve) => require(["projects/x-read-mgr/components/wms/7-statistics"],resolve)

export default new Router({
  routes: [
		{path: '/',redirect: "/wms/article"},
    {path: '/#',component: Article},
    {
      path: "/wms/",
      component: Wms,
      children: [
				{path: "home",component: Home},
				{path: "article",component: Article},
        {path: "seriesProduct",component: Series},
				{path: "indexSettings",component: Banner},
				{path: "indexSettings/banner", component: Banner},
				{path: "indexSettings/button",component: Button},
				{path: "indexSettings/home",component: HomeIndex},
				{path: "findSetting",component: FindSetting},
				{path: "memberlist",component: MemberList},
				{path: "memberfb",component: MemberFb},
				{path: "typeSetting",component: Subject,redirect: '/wms/typeSetting/case'},
				{path: "typeSetting/subject",component: Subject},
				{path: "typeSetting/keyword",component: Keywords},
				{path: "typeSetting/column",component: Columns},
				{path: "typeSetting/case",component: Case},
				{path: "typeSetting/fagui",component: Case},
				{path: "typeSetting/xueke",component: Case},
				{path: "typeSetting/changjing",component: Case},
				{path: "typeSetting/anyou",component: Case},
				{path: "typeSetting/liucheng",component: Case},
				{path: "bookManage", component: BookManage },
				{path: "bookManage/theme", component: BookTheme },
				{path: "bookManage/comment", component: BookComment },
				{path: "orderManage", component: OrderManage },
				{path: "scaleInfo", component: ScaleInfo },
				{path: "statistics", component: Statistics },
      ]
    },
		{path: '', component: Home},
  ]
});
