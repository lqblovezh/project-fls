import * as $ from '../common/request'
import pathToRegexp from 'path-to-regexp'
let toPath = pathToRegexp.compile("/api/live/:id");
let lives = pathToRegexp.compile("/api/live/online/:id");
let state = pathToRegexp.compile("/api/live/state/:id");
/**
 * @description 直播列表
 * @param {Object} data
 * @param {String} data.title 直播名称
 * @param {String} data.time_start 开始时间
 * @param {String} data.time_end 结束时间
 * @param {String} data.online 上架状态 // 'true','false'
 * @param {String} data.state 审核状态  //'not_approve','approveing','success','fail'
 */

export function getList(data){
  log(data,'abcd')
  return $.request_get('/api/live/backstage_all', data).then(res=>{
    res.data=res.data.map(e=>{
      log(e.online)
          if(e.online == "true"){
            e.online = "已上架"
          }else{
            e.online = "未上架"
          }
          switch(e.state){
            case "not_approve" : e.state= "未审核"; break;
            case "approveing" : e.state = "审核中"; break;
            case "success" : e.state = "审核已通过" ; break;
            case "fail" : e.state = "审核未通过" ; break ;
          }
         return e
      })
     return res
  })
}

export function getListPrimery(data){
  return $.request_get('/api/live/state_list', data).then(res=>{
    res.data=res.data.map(e=>{
          if(e.state == "approveing"){
            e.state = "审核中"
          }
         return e
      })
     return res
  })
}
/**
 * @description 新增或保存
 * @param {Object} data
 * @param {String} data.id 有ID修改 无ID 新增 老师id
 * @param {String} data.url 直播地址
 * @param {String} data.title 标题
 * @param {String} data.start_time 直播开始时间
 * @param {String} data.img 直播头像
 * @param {String} data.introduce 直播简介
 */

export function save(data){
  if(data.id){
    return $.request_put(toPath(data),data)
  }
  return $.request_post("/api/live",data)
}

/**
 * @description 上线下线通知
 * @param {Object} data
 * @param {String} data.id 当前直播ID
 * @param {String} data.on
 */
export function isOnLine(data){
    return $.request_put(lives(data),data);
}

/**
 * @description 直播审核状态修改
 * @param {Object} data
 * @param {String} data.id 被提交审核的ID
 * @param {String} data.state 提交审核 此时为 approveing
 */

 export function approve(data){

   return $.request_put(state(data),data)
 }
/**
 * 删除
 * @param {Object} data
 * @param {String} data.id 删除的ID
 */
 export function del(data){
    return $.request_delete('/api/live',data)
 }

 /* 移动端直播API */
/**
 * 获取直播列表
 * @param  {Object} [data={}] [description]
 * @return {[Promise]}           [description]
 */
 export function getLiveLists(data = {}) {
	 return $.request_get('/api/live/front_all', data)
 }
