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
            redirect: './app/systemSetting', // 使用相对路径重定向
          },
          {
            path: 'app',
            component: () => import('./views/layout'),
            redirect: './app/systemSetting', // 使用相对路径重定向
            children: [
              { path: 'systemSetting',component: () => import('./views/systemSetting'),},
              { path: 'application',component: () => import('./views/application'),},
              {
                path: 'systemManage',
                component: () => import('./views/systemManage'),
                children: [
                  { path: 'manager', component: () => import('./views/systemManage/manager')},
                  { path: 'journal', component: () => import('./views/systemManage/journal')},
                  { path: 'role', component: () => import('./views/systemManage/role')}
                ]
              },
              { path:'memberlist',component:()=>import('./views/member')},
              { path:'message',component:() => import('./views/message')},
              { path:'member', component:() => import('./views/member')},
              { path: 'error', component: () => import('./views/error') },
            ],
          },
        ],
      }
    ],
  })
}
