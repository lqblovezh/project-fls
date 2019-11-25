import {request_post,request_get,request_put,request_delete} from 'services/common/request'


/**
 * 我的分销
 * @param {Object} data
 * @param {String} data.book_id
 * @param {String} data.user_id
 */

export function getList(data={}){
  return request_get('/api/user/distributes',data)
}

/**
* 分销规则
* @param {Object} data
*/
export function rule(){
 return request_get('/api/distribute/setting');
}

/**
 * 提现申请
 * @param {Object} data
 * @param {String} data.account  必有字段  卡号 
 * @param {String} data.name 必有字段   支付宝名称或银行持卡人名
 * @param {String} data.Bank 可选字段   开户所在行(只有银行卡提现必填)
 * @param {String} data.pay_type 必有字段 支付方式1正常支付,2支付宝,3微信,4...
 */

 export function cashs(data={}){
   return request_post('/api/user/cashs',data);
 }

/**
 * 提现记录
 */
export function cashsHistory(data={}){
  return request_get('/api/user/cashs',data);
}

/**
 * 获取分销金额总计
 * 
 */

 export function sum(data={}){
   return request_get('/api/user/cashs/sum',data)
 }

 /**
  * 创建订单
  * @param {Object} data
  * @param {String} data.goods_id   商品id
  * @param {Array}  data.content  章节数组
  * @param {Number} data.type 类型(1 听读   2 视读  3 电子书　6 主题)  
  * @param {Number} data.pay_type 支付方式1正常支付,2支付宝,3微信,4...
  * @param {Number} data.rf_url 返回地址
  */

  export function order(data={}){
     return request_post('/api/order/order',data)
  }