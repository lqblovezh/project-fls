const path = require('path')

const cloud_projects = '../../../../x-book4-cloud/js/src/projects'

module.exports = [
  {
    title: 'X-BOOK 管理系统 (外部项目)',
    projectPath: path.join(__dirname, cloud_projects, 'system'),
    type: 'system',
    admin: true,
    design: 'desktop',
    ssr: true,
    outPath: '_system/admin'
  },
  {
    title: 'X-BOOK 官网首页 (外部项目)',
    projectPath: path.join(__dirname, cloud_projects, 'system-desktop'),
    type: 'system',
    admin: false,
    design: 'desktop',
    ssr: true,
    outPath: '_system/home'
  },
  {
    title: '管理系统登录界面',
    projectPath: path.join(__dirname, 'home'),
    type: '',
    design: 'desktop',
    admin: true,
    ssr: true,
    outPath: '_static/:subApp/admin_login'
  },
  {
    title: 'X-SYSTEM 管理系统',
    projectPath: path.join(__dirname, 'x-system-mgr'),
    type: 'common',
    design: 'desktop',
    admin: true,
    ssr: true,
    outPath: '_static/:subApp/common/admin'
  },
  {
    title: 'X-PUBLISH 管理系统',
    projectPath: path.join(__dirname, 'x-publish-mgr'),
    type: 'publish',
    design: 'desktop',
    admin: true,
    ssr: false,
    outPath: '_static/:subApp/publish/admin'
  },
  {
    title: 'X-PUBLISH 书籍预览',
    projectPath: path.join(__dirname, 'x-publish-desktop'),
    type: 'publish',
    design: 'desktop',
    admin: false,
    ssr: false,
    outPath: '_static/:subApp/publish/home'
  },
  {
    title: 'X-READ 管理系统 (移动版/外部项目)',
    projectPath: path.join(__dirname, cloud_projects, 'x-read-mgr-phone'),
    type: 'read',
    design: 'phone',
    admin: true,
    ssr: false,
    outPath: '_static/:subApp/read/admin_h5'
  },
  {
    title: 'X-READ 管理系统 (外部项目)',
    projectPath: path.join(__dirname, cloud_projects, 'x-read-mgr'),
    type: 'read',
    design: 'desktop',
    admin: true,
    ssr: false,
    outPath: '_static/:subApp/read/admin'
  },
  {
    title: 'X-READ 门户网站 (移动版/外部项目)',
    projectPath: path.join(__dirname, cloud_projects, 'x-read-phone'),
    type: 'read',
    design: 'phone',
    admin: false,
    ssr: false,
    outPath: '_static/:subApp/read/home'
  },
  {
    title: 'X-LIBRARY 管理系统 (法律社)',
    projectPath: path.join(__dirname, 'x-library-mgr'),
    type: 'library',
    design: 'desktop',
    admin: true,
    ssr: false,
    outPath: '_static/:subApp/library/admin'
  },
  {
    title: 'X-LIBRARY 门户网站 (法律社/移动版)',
    projectPath: path.join(__dirname, 'x-library-phone'),
    type: 'library',
    design: 'phone',
    admin: false,
    ssr: true,
    outPath: '_static/:subApp/library/home_h5'
  },
]
