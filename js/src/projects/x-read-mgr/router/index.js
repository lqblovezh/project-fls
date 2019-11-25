import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const Wms = (resolve) => require(["@/components/wms"],resolve)
const Home = (resolve) => require(["@/components/wms/0-home"],resolve)
const MediaBook = (resolve) => require(["@/components/wms/1-product/mediaBook"],resolve)
const Theme = (resolve) => require(["@/components/wms/1-product/theme"],resolve)
const Media = (resolve) => require(["@/components/wms/1-product/media"],resolve)
const Video = (resolve) => require(["@/components/wms/1-product/video"],resolve)
const Audio = (resolve) => require(["@/components/wms/1-product/audio"],resolve)
const OrderManage = (resolve) => require(["@/components/wms/4-order/index"],resolve)
const BookManage = (resolve) => require(["@/components/wms/3-book/index"],resolve)
const BookTheme = (resolve) => require(["@/components/wms/3-book/theme"],resolve)
const BookComment = (resolve) => require(["@/components/wms/3-book/comment"],resolve)
const IndexSettings = (resolve) => require(["@/components/wms/2-settings/indexSettings"],resolve)
const Banner = (resolve) => require(["@/components/wms/2-settings/indexSettings/banner"],resolve)
const Columns = (resolve) => require(["@/components/wms/2-settings/indexSettings/columns"],resolve)
const Button = (resolve) => require(["@/components/wms/2-settings/indexSettings/button"],resolve)
const FindSetting = (resolve) => require(["@/components/wms/2-settings/findSetting"],resolve)
const DefaultAudio = (resolve) => require(["@/components/wms/2-settings/defaultAudio"],resolve)
const BookSettings = (resolve) => require(["@/components/wms/2-settings/bookSettings"],resolve)
const Header = (resolve) => require(["@/components/wms/2-settings/bookSettings/header"],resolve)
const Sort = (resolve) => require(["@/components/wms/2-settings/bookSettings/sort"],resolve)
const RcmSettings = (resolve) => require(["@/components/wms/2-settings/rcmSettings"],resolve)
const MemberList = (resolve) => require(["@/components/wms/6-member/list"],resolve)
const MemberRole = (resolve) => require(['@/components/wms/6-member/role'],resolve)
const UserMsg = (resolve) => require(["@/components/wms/6-member/userMsg"],resolve)
const Saleslist = (resolve) => require(["@/components/wms/5-sales/list"],resolve)
const SalesCash = (resolve) => require(["@/components/wms/5-sales/cash"],resolve)
const SalesSettings = (resolve) => require(["@/components/wms/5-sales/setting"],resolve)
const Statistics = (resolve) => require(["@/components/wms/7-statistics"],resolve)
const ScaleInfo = (resolve) => require(["@/components/wms/7-statistics/scaleInfo"],resolve)
const MsgComment = (resolve) => require(["@/components/wms/6-member/msgComment"],resolve)

const Manager = (resolve) => require(['@/components/wms/6-member/jurisdiction/manager'],resolve)
const Journal = (resolve) => require(['@/components/wms/6-member/jurisdiction/journal'],resolve)
const Role = (resolve) => require(['@/components/wms/6-member/jurisdiction/role'],resolve)
const XData = (resolve) => require(['projects/x-publish-mgr/components/common/XData'],resolve)

export default new Router({
  routes: [
    {path: '/', redirect: "/wms/home"},
    {path: '/#', component: Home},
    {
      path: "/wms/",
      component: Wms,
      children: [
        { path: "mediaBook", component: MediaBook },
        { path: "home", component: Home },
        { path: "theme", component: Theme },
        { path: "media",component: Media },
        { path:'video',component:Video},
        { path:'audio',component:Audio},
        { path: "orderManage", component: OrderManage },
        { path: "bookManage", component: BookManage },
        { path: "bookManage/theme", component: BookTheme },
        { path: "bookManage/comment", component: BookComment },
        { path: "indexSettings", component: Banner },
        { path: "indexSettings/columns", component: Columns },
        { path: "indexSettings/banner", component: Banner },
        { path: "indexSettings/button", component: Button },
        { path: "bookSettings", component: Header },
        { path: "bookSettings/header", component: Header },
        { path: "bookSettings/sort", component: Sort },
        { path: "rcmSettings", component: RcmSettings },
        { path: "saleslist", component: Saleslist },
        { path: "cash", component: SalesCash },
        { path: "setting", component: SalesSettings },
        { path: "findSetting", component: FindSetting },
        { path: "defaultAudio", component: DefaultAudio },
        { path: "memberlist", component: MemberList },
        { path: "memberRole", component:MemberRole},
        { path: "userMsg", component: UserMsg },
        { path: "statistics", component: Statistics },
        { path: "scaleInfo", component: ScaleInfo },
        { path: "msgComment", component: MsgComment },
        {path: 'jurisdiction', component: Manager},
        {path: 'jurisdiction/manager', component: Manager},
        {path: 'jurisdiction/journal', component: Journal},
        {path: 'jurisdiction/role', component: Role},
        {path: 'XData', redirect: '/XData'},
      ]
    },
    {path: '/XData', component: XData},
  ]
});
