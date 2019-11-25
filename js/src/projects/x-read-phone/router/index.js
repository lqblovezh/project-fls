import Vue from 'vue'
import Router from 'vue-router'
import Test from '@/components/test/animate'
import Index from '@/components/home/index'
import fastIndex from '@/components/fastHome'
import Search from '@/components/home/search'
import ListenRead from '@/components/home/listenRead'
import mediaList from '@/components/home/mediaList'
import BookMall from '@/components/home/bookMall'
import BookClassification from '@/components/home/bookClassification'
import bookDetail from '@/components/home/bookDetail'
import bookMedia from '@/components/home/bookMedia'
import themeBookMedia from '@/components/home/themeBookMedia'
import themeBookDetail from '@/components/home/themeBookDetail'
import themeDetail from '@/components/home/themeDetail'
import Course from '@/components/home/Course'
import themeReplayLsit from '@/components/home/bookCircle/themeReplayLsit'
import xknow from '@/components/home/xknow'
import xresult from '@/components/home/xknow/xresult'
import bookCircleList from '@/components/home/bookCircle/list'
import Comment from '@/components/home/bookCircle/Comment'
import My from '@/components/my/userInfo'
import UserInfo from '@/components/my/userInfo/info'
import Safe from '@/components/my/userInfo/safe'
import MySale from '@/components/my/userInfo/mySale'
import Rule from '@/components/my/userInfo/rule'
import Cash from '@/components/my/userInfo/cash'
import Extract from '@/components/my/userInfo/extract'
import BookMark from '@/components/my/userInfo/bookmark'
import BackMsg from '@/components/my/userInfo/backmsg'
import Msg from '@/components/my/userInfo/msg'
import FeedBack from '@/components/my/userInfo/feedback'
import BookCircle from '@/components/my/userInfo/bookcircle'
import ReadHistory from '@/components/my/userInfo/readHistory'
import ChapterHistory from '@/components/my/userInfo/chapterHistory'
import Login from '@/components/my/login'
import Registor from '@/components/my/registor'
import Find from '@/components/find'
import Book from '@/components/book'
import Reader from '@/components/reader3/Reader'
import TemplateList from '@/components/common/templateItem/List'
import TemplateListJyz from '@/components/common/templateItem/List.jyz'
import TemplateListJyz2 from '@/components/common/templateItem/List2.jyz'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/home',
      component: Index,
    },
    {
      path: '/fastHome',
      component: fastIndex,
      meta: {
        isFast: true,
      },
    },
    {
      path: '/templateList',
      component: TemplateList,
    },
    {
      path: '/listJyz',
      component: TemplateListJyz,
    },
    {
      path: '/listJyz2',
      component: TemplateListJyz2,
    },
    {
      path: '/home/listenRead',
      component: ListenRead,
    },
    {
      path: '/home/mediaList',
      component: mediaList,
    },
    {
      path: '/home/themeDetail',
      component: themeDetail,
    },
    {
      path: '/home/search',
      component: Search,
    },
    {
      path: '/home/themeBookMedia',
      component: themeBookMedia,
    },
    {
      path: '/home/themeBookDetail',
      component: themeBookDetail,
    },
    {
      path: '/home/Course',
      component: Course,
    },
    {
      path: '/home/xknow',
      component: xknow,
    },
    {
      path: '/home/xresult',
      component: xresult,
    },
    {
      path: '/bookMall',
      component: BookMall,
    },
    {
      path: '/bookClassification',
      component: BookClassification,
    },
    {
      path: '/bookDetail',
      component: bookDetail,
    },
    {
      path: '/bookMedia',
      component: bookMedia,
    },
    {
      path: '/bookCircleList',
      component: bookCircleList,
    },
    {
      path: '/bookCircleList/comment',
      component: Comment,
    },
    {
      path: '/bookCircleList/themeReplayLsit',
      component: themeReplayLsit,
    },
    {
      path: '/reader',
      component: Reader,
    },
    {
      path: '/find',
      component: Find,
    },
    {
      path: '/book',
      component: Book,
    },
    {
      path: '/my',
      component: My,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/register',
      component: Registor,
    },
    {
      path: '/user_info',
      component: UserInfo,
    },
    {
      path: '/safe',
      component: Safe,
    },
    {
      path: '/my_sale',
      component: MySale,
    },
    {
      path: '/rule',
      component: Rule,
    },
    {
      path: '/cash',
      component: Cash,
    },
    {
      path: '/extract',
      component: Extract,
    },
    {
      path: '/bookmark',
      component: BookMark,
    },
    {
      path: '/backmsg',
      component: BackMsg,
    },
    {
      path: '/msg',
      component: Msg,
    },
    {
      path: '/feedback',
      component: FeedBack,
    },
    {
      path: '/bookcircle',
      component: BookCircle,
    },
    {
      path: '/test',
      component: Test,
    },
    {
      path: '/readHistory',
      component: ReadHistory,
    },
    {
      path: '/chapterProgress',
      component: ChapterHistory,
    },
    {
      path: '/jyz',
      component: () => import('../components/common/templateItem/jyz'),
    },
    {
      path: '/jyz-list',
      component: () => import('../components/common/templateItem/jyz/list'),
    },
  ],
})

export default router
