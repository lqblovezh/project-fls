import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
export function createRouter() {
  return new Router({
    mode: routerMode,
    routes: [
      {
        path: baseUrl,
        component: () => import('./components/view/index'),
        children: [
          {
            path: '/',
            redirect: 'home',
            component: () => import('./components/view/home'),
          },
          {
            path: 'home',
            component: () => import('./components/view/home'),
          },
          {
            path: 'introduce',
            component: () => import('./components/view/introduce'),
          },
          {
            path: 'demo',
            component: () => import('./components/view/demo'),
          },
          {
            path: 'about',
            component: () => import('./components/view/about'),
          },
          {
            path: 'cooperate',
            component: () => import('./components/view/cooperate'),
          },
          {
            path: 'book',
            component: () => import('./components/view/book'),
            meta: {
              requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
            },
          },
          {
            path: 'course',
            component: () => import('./components/view/course'),
            meta: {
              requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
            },
          },
          {
            path: 'library',
            component: () => import('./components/view/library'),
            meta: {
              requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
            },
          },
          {
            path: 'personal',
            component: () => import('./components/view/personal'),
            meta: {
              requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
            },
          },
        ],
      },
    ],
  })
}
