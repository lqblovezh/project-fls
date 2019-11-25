import {
  request_post,
  request_get,
  request_put,
  request_delete,
} from 'services/common/request'
import pathToRegexp from 'path-to-regexp'

/**
 * 获取首页的推荐信息
 * @param  {Object} data.type ['course','teacher','live']
 * @return {[Promise]}      [description]
 */
export function getRecommendLists(data = {}) {
  return request_get('/api/recommend', data)
}

export function getLivePre(data = {}) {
  return request_get('/api/recommend/live', data)
}

/**
 * 获取首页like
 * @param  {Object} data [description]
 * @return {[Promise]}      [description]
 */
export function getLikeLists(data = {}) {
  return request_get('/api/recommend/like', data)
}
/**
 * 获取首页的relevant
 * @param  {Object} data [description]
 * @return {[Promise]}      [description]
 */
export function getRelevantLists(data = {}) {
  return request_get('/api/recommend/relevant', data)
}

/**
 * 首页轮播图
 */
export function getBanners(data = {}) {
  return request_get('/api/setting/position/banner_mobile', data)
}
/**
 *  @param  {string} data.type  banner_pc   banner_mobile  bottom
 */
export function getHomeSettings(data = {}) {
  return request_get(`/api/setting/position/${data.type}`)
}
/**
 * 获取应用信息
 * @return {[type]} [description]
 */
export function getConfig(data = {}) {
  return request_get('/api/current', data).then(res => {
    const { publisher, application } = res.data
    if(!data.isNoTitle){
      // document.title = publisher.name + '-' + application.name
      document.title = application.name  // 修改应用title
    }
    return res
  })
}

/**
 * 排行
 * @return {[type]} [description]
 */
export function getRank(data = {}) {
  return request_get('/api/courses/ranking', data)
}
