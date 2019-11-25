import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export function createRouter() {
  return new Router({
    mode: routerMode,
    routes: [
      {
        path: baseUrl,
        component: () => import('./page/SecondRouter.vue'),
        children: [
          {
            path: '/',
            redirect: 'home',
          },
          {
            path: 'home',
            component: () => import('./page/home'),
          },
          {
            path: 'find',
            component: () => import('./page/bottom/Find'),
          },
          { name: 'normal-list',
            path: 'normal-list',
            component: () => import('./page/normalList'),
          },
          {
            path: 'circle',
            component: () => import('./page/circle'),
          },
          {
            path: 'circle-detail',
            component: () => import('./page/circle/Detail'),
          },
          {
            path: 'circle-reply-list',
            component: () => import('./page/circle/ReplyList'),
          },
          {
            path: 'user',
            component: () => import('./page/user'),
          },
          {
            path: 'column',
            component: () => import('./page/column'),
          },
          { name: 'column-nav',
            path: 'column-nav',
            component: () => import('./page/column/Nav'),
          },
          {
            path: 'column-bookproduct',
            component: () => import('./page/column/Bookproduct'),
          },
          {
            path: 'column-detail',
            component: () => import('./page/column/Detail'),
          },
          {
            path: 'column-keys',
            component: () => import('./page/column/Keys'),
          },
          {
            path: 'column-rules',
            component: () => import('./page/column/Rules'),
          },
          {
            path: 'column-resource',
            component: () => import('./page/column/resource'),
          },
          {
            path: 'search',
            component: () => import('./page/search/Base'),
            children: [
              {
                name: 'search',
                path: '/',
                component: () => import('./page/search/Home'),
              },
              { name: 'result',
                path: 'result',
                component: () => import('./page/search/Result'),
              },
            ],
          },
          {
            path: 'search-normal',
            component: () => import('./page/search/Normal'),
          },
          {
            path: 'search-db',
            component: () => import('./page/db/Advanced'),
            meta:{
              isFastLibrary: true
            }
          },
          {
            path: 'search-simple',
            component: () => import('./page/search/Simple'),
            meta:{
              isFastLibrary: true
            }
          },
          {
            path: 'search-advanced',
            component: () => import('./page/search/Advanced'),
          },
          {
            name: 'search-exact',
            path: 'search-exact',
            component: () => import('./page/search/keys/Base'),
            children: [
              {
                path: '/',
                component: () => import('./page/search/keys/Keys')
              },
              {
                name: 'search-exact-detail',
                path: 'detail',
                component: () => import('./page/search/keys/Detail')
              }
            ]
          },
          {
            path: 'search-adv-result',
            component: () => import('./page/search/AdvResult'),
          },
          {
            path: 'subject',
            component: () => import('./page/subject/Nav'),
          },
          {
            path: 'taoxi',
            component: () => import('./page/subject/Taoxi'),
          },
          {
            path: 'subject-detail-list',
            component: () => import('./page/subject/DetailList'),
          },
          {
            path: 'reader',
            component: () => import('./page/Reader/Reader.vue'),
          },
          {
            path: 'order',
            component: () => import('./page/user/order'),
          },
          {
            path: 'info',
            component: () => import('./page/user/info'),
          },
          {
            path: 'user-intro',
            component: () => import('./page/user/userIntro'),
          },
          {
            path: 'bookroom',
            component: () => import('./page/user/bookRoom'),
          },
          {
            path: 'note',
            component: () => import('./page/user/note'),
          },
          {
            path: 'bookmark',
            component: () => import('./page/user/bookmark'),
          },
          {
            path: 'read-history',
            component: () => import('./page/user/history'),
          },
          {
            path: 'shop-record',
            component: () => import('./page/user/record'),
          },
          {
            path: 'help',
            component: () => import('./page/user/help/'),
            children: [
              {
                path: '/',
                component: () => import('./page/user/help/help'),
              },
              {
                path: 'detail',
                component: () => import('./page/user/help/detail'),
              },
            ],
          },
          {
            path: 'message',
            component: () => import('./page/user/message'),
          },
          {
            path: 'db',
            component: () => import('./page/db/'),
            meta:{
              isFastLibrary: true
            }
          },
          {
            path: 'read',
            component: () => import('./page/db/read'),
            meta:{
              isFastLibrary: true
            }
          },
        ],
      },
    ],
  })
}
