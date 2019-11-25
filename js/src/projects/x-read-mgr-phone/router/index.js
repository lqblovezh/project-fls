import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/user/Login'
import Index from '@/components/user/Index'
import saleAchieve from '@/components/saleAchieve'
import productData from '@/components/productData'
import distribute from '@/components/distribute'
import statistics from '@/components/statistics'
import productDetail from '@/components/productData/productDetail'
import circleList from '@/components/bookManage/circleList'
import Comment from '@/components/bookManage/Comment'
import themeReplayLsit from '@/components/bookManage/themeReplayLsit'

// import {footerStatus} from '@/assets/js/config'
// import store from '@/store'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/index',
      component: Index
    },
    {
      path: '/circleList',
      component: circleList
    },
    {
      path: '/bookCircleList/comment',
      component: Comment
    },
    {
      path: '/bookCircleList/themeReplayLsit',
      component: themeReplayLsit
    },
    {
      path: '/saleAchieve',
      component: saleAchieve
    },
    {
      path: '/productData',
      component: productData
    },
    {
      path: '/productData/detail',
      component: productDetail
    },
    {
      path: '/distribute',
      component: distribute
    },
    {
      path: '/statistics',
      component: statistics
    }
  ]
})

router.beforeEach((to, from, next) => {
  // log("变化",to)
  // if(footerStatus[to.path]){
  //   store.commit('changeFooterStatus', true)
  // }else {
  //   store.commit('changeFooterStatus', false)
  // }

  if (to.path === '/login') {
    next()
  } else {
    try {
      let userInfo = JSON.parse(sessionStorage.userInfo)
      if (userInfo) {
        next()
      } else {
        router.push('/login')
      }
    } catch (error) {
      router.push('/login')
    }
  }
  // router.push("/login")
})

export default router
