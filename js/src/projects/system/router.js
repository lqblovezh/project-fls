import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export function createRouter() {
  return new Router({
    mode: routerMode,
    routes: [
      {
        path: baseUrl, // 一切都要在baseUrl下面
        component: () => import('./App.vue'),
        children: [
          {
            path: '/',
            component: () => import('./views/login'),
          },
          {
            path: 'app',
            component: () => import('./views/layout'),
            redirect: './app/home', // 使用相对路径重定向
            children: [
              {
                path: 'home',
                component: () => import('./views/home'),
              },
              {
                path:'user',
                component: () => import('./views/user'),
              },
              {
                path: 'systemSetting',
                component: () => import('./views/systemSetting'),
              },
              {
                path: 'systemSetting/info',
                component: () => import('./views/systemSetting/info'),
              },
              {
                path: 'systemSetting/production',
                component: () => import('./views/systemSetting/production'),
              },
              {
                path: 'systemManage',
                component: () => import('./views/systemManage'),
                children: [
                  {
                    path: 'manager',
                    component: () => import('./views/systemManage/manager')
                  },
                  {
                    path: 'journal',
                    component: () => import('./views/systemManage/journal')
                  },
                  {
                    path: 'role',
                    component: () => import('./views/systemManage/role')
                  }
                ]
              },
              {
                path: 'utils/mysql_sync_config',
                component: () => import('./views/utils'),
              },
            ],
          },
        ],
      }
    ],
  })
}
